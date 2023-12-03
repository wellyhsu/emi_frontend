
var video_RID;
var Metadata_token="";
var user_RID

//打Next.js後端的程式碼
async function performSomeAsyncOperation() {
    // 執行需要等待的異步操作
    const Response = await fetch("http://34.96.232.169:30000/api/video/status");  //打API取得影片後端傳來的路徑
    const data = await Response.json();   //取得影片後端傳來的路徑資料
    
    console.log("API data=", data)
    var status = data["status"];
    var video_path = data["processed_video_path"];
    var API_video_RID = data["RID"];

    console.log("Frontend video_path=",video_path,
                "Frontend status", status,
                "Frontend API_video_RID", API_video_RID
                );
    var video_process_data={
        status: status,
        video_path: video_path,
        API_video_RID: API_video_RID,  
    }
    return(video_process_data);
}

//每間隔2秒打一次後端Next.js API 確認影片處理狀態
async function checkProcessingStatus(UserName, fileName) {
    console.log("打後端Next.js API!!");

    //GET 打後端Next.js API
    const call_API = setInterval(() => {
        var video_process_result = performSomeAsyncOperation();
        
        console.log('video_process_result=', video_process_result);
        console.log("check_call_API_timeinterval_number=", call_API);
        console.log("UserName",UserName);
        console.log("fileName",fileName);
    
        //如果使用者取消上傳
/*        if(status == "completed" && video_path == "/home/shared/processed_category_videos/" + UserName + "_" + user_RID + "/" + fileName)
        {
            console.log("CANCEL_call_API_number=", call_API);
            clearInterval(call_API);  //清除計數器
        }
*/
        //if( cancel == 0 && status == "completed" && video_RID == API_video_RID)  //若點擊了取消按鈕 不繼續打API

        if(video_process_result['status'] == "completed" && video_process_result['video_path'] == "/home/shared/processed_category_videos/" + UserName + "_" + user_RID + "/" + fileName)  //若點擊了取消按鈕 不繼續打API
        { 
            console.log('API get video_path data= ', video_process_result['video_path']);  //顯示取得的data

            var data={
                video_process: "finish",
                video_path: video_process_result['video_path'],
            }
            return(data);
        }            
    }, 2000); // 這裡模擬等待 2 秒 週期循環執行  
}


//將影片分割
const slice = (file, piece = CHUNK_SIZE) => {   //切割
    return new Promise((resolve, reject) => {
        let totalSize = file.size;  //取得檔案大小
        const chunks = [];   //宣告一個陣列存放切割下來的chunk                   //Safari 中是 blob.webkitSlice()
        const blobSlice = File.prototype.slice || File.prototype.webkitSlice; //根據瀏覽器的不同，它指向適當的切片方法。
        let start = 0;   //宣告開始切割的位址
        var end;
        end = start + piece >= totalSize ? totalSize : start + piece; //取得最後的位置

        while (start < totalSize) {
            const chunk = blobSlice.call(file, start, end);   //把fileData切割成一個一個的chunk
            chunks.push(chunk); //霸切割除來的chunk放進chunks陣列

            start = end;   //從這一次結束的位址開始下一次切割
            end = start + piece >= totalSize ? totalSize : start + piece;
        }
      
      resolve(chunks);
    });
};


//上傳分割好的小段影片(依據切割長度發送請求次數)
async function _chunkUploadTask(chunks, Metadata_token, UserName, videoTitle, fileName, videolength, fileSize, user_RID, progressCallback) {   
    const results = [];   //儲存每一段影片上傳後的結果(成功/失敗)
    var Chunk_Number = 1;
    var Chunk_Final = false;
    var information;
//    var transform_degree;

    console.log('Length=',chunks.length);
    console.log("fileName==",fileName);
    console.log("GET MetaDataToken", Metadata_token);

    for (let chunk of chunks) {   //
        const fd = new FormData();   //宣告fd為FormData();

        if(Chunk_Number == chunks.length)
        {
            Chunk_Final = true;
        }
        //發送影片相關資訊到後端(Golang)
        const Video_Information_send =
        {
            "username": UserName,
            "video_title": videoTitle,
            "video_name": fileName,
            "video_description": "none",
            "video_length": videolength,
            "video_size": fileSize,
            "video_format": "video/mp4",
            "chunk_number": String(Chunk_Number),
            "chunk_final": String(Chunk_Final), 
            "user_RID": user_RID, 
        }

        var Video_Information_send_json = JSON.stringify(Video_Information_send);  //轉json格式
        console.log("account_send_json is " + Video_Information_send_json);

        fd.append('information', Video_Information_send_json);
        fd.append('chunk', chunk);     //把每一個chunk插入fd中
/*檢查FormData內的內容 - 方法一       
        fd.forEach((key, value) => {
            console.log("value(標題)=",value,"key(內容)=",key);
        });
//檢查FormData內的內容 - 方法二
        for (const entry of fd.entries()) {
            console.log("test=", entry[0],"內容=", entry[1]);
            }
*/
        try 
        {    
            console.log("POST (http://34.96.232.169:30036/api/video/upload)");
            const response = await fetch("http://34.96.232.169:30036/api/video/upload"/*process.env.NEXT_PUBLIC_API_upload_video*/, {   //call後端的API
                method: 'POST',
                headers:{
                    "Metadata-Token": Metadata_token,
                },
                body: fd,    //傳送到後端的內容
            });

            if (response.ok) {
                
//                SetProgress_Number(((100/chunks.length) * Chunk_Number).toFixed(0));
                console.log("response is ok!");

                var data;
                data = await response.json();   //取得後端回傳的資料
                console.log("data=", data);
                if(Chunk_Number == chunks.length)
                {   
                    var video_RID = data['video_RID'];
                //    console.log("Video RID= ", video_RID);
                    
                    document.getElementById('video_processing').style = "display: inline-block";

                    // 開始檢查後端影片處理狀態
                    checkProcessingStatus(UserName, fileName);
                    return
                }  
                else
                {
                    Chunk_Number = Chunk_Number + 1;
                } 
                results.push(data);    //將後端後端傳回的資料放到results

/*                
                Set_transform_degree(transform_degree + 360/chunks.length);
                if(Chunk_Number <= chunks.length/2)
                {
                    document.getElementById('Circle_up_R').style = "transform: `${transform_degree}deg`; ";
        
                }
                else if(Chunk_Number > chunks.length/2)
                {
                    document.getElementById('Circle_up_R').style = "transform: 90deg; ";
                    document.getElementById('Circle_up_L').style = "transform: `${transform_degree-180}deg`; ";
                }
*/
                var video_upload_process = ((100/chunks.length) * Chunk_Number).toFixed(0);
                
                // 在每次迭代中，调用回调函数并传递更新的进度值
                progressCallback({ video_upload_process: video_upload_process });

            } 
            else {
                console.log("response not ok.");
                results.push(null);
                Chunk_Number = Chunk_Number + 1;
            }
        } 
        catch (err) {    //如果發生錯誤
            results.push(null);    //不放入資料 留空白
            console.log("error=", err);
        }
        console.log('chunknumber=',Chunk_Number);
        console.log('chunkfinal=',Chunk_Final);
    }
    return results;
}

async function sendMetadata(fileName, fileType, fileSize, videolength, UserName, user_RID)
{
    //發送metadata到後端
    const Video_metadata_send =
    {
        "video_name": fileName,
        "video_type": fileType,
        "video_size": fileSize,
        "video_length": videolength,
        "user_RID": user_RID,
        "username": UserName,
    }

    var Video_metadata_send_json = JSON.stringify(Video_metadata_send);  //轉json格式
    console.log("Video_metadata_send_json is " + Video_metadata_send_json);

    try 
    {
        //傳送metadata到後端
        const metadata_response = await fetch("http://34.96.232.169:30031/api/metadata/generate_token", {            
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: Video_metadata_send_json,
        });
            
        if(metadata_response.ok)
        {
            const data = await metadata_response.json();
            console.log('data=', data);
            console.log("data['Metadata_Token']", data['Metadata_Token']);
            
            Metadata_token = data['Metadata_Token'];

            return ({ Metadata_Verify: true, Metadata_token: Metadata_token });
        }
        else 
        {
            console.log("response not ok.");
            return ({ Metadata_Verify: false });
        }
    }  
    catch (err) {    //如果發生錯誤
        console.log("try error=", err);
    }
}