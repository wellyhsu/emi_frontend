import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Cookies from 'js-cookie'; 
import { useLayoutEffect, useEffect } from 'react';
import { useRouter } from 'next/router';

var fileData;
var fileName;
var fileType;
var fileSize;
var fileTime;
var videolength;
var Metadata_token; 
const SPLIT_BYTES = 100*1024; //檔案以每100KB做切割
const CHUNK_SIZE = 100*1024; //檔案以每100KB做切割
//var start = 0; //位元組數的開頭
//var end = SPLIT_BYTES; //位元組數的結束
//var count = fileSize % SPLIT_BYTES == 0 ? fileSize / SPLIT_BYTES : Math.floor(fileSize / SPLIT_BYTES) + 1;
//上述為計算一共會切出幾份檔案 
var UserName;
UserName = Cookies.get('userName');
UserName = UserName?.substring(1, UserName?.lastIndexOf(`"`));  //" "中間字串

var cancel = 0;

const token =  Cookies.get('token');

function cancel_upload()
{
    var information;

    document.getElementById("uploading").style = "display: none";
    cancel = 1;

    const Cancel = new FormData();   //宣告fd為FormData();
    Cancel.append('cancel', "true");
    Cancel.append('username', UserName);     //把每一個chunk插入fd中
    Cancel.append('video_name', fileName);     //把每一個chunk插入fd中

    //檢查FormData內的內容 - 方法一       
    Cancel.forEach((key, value) => {
        console.log("value(標題)=",value,"key(內容)=",key);
    });

    fetch("http://34.142.145.187:30036/api/video/cancel"/*process.env.NEXT_Cancel_upload*/, {            
        method: 'POST',
        headers:{
            "Metadata-Token": Metadata_token,
        },
        body: Cancel,
    })
        .then((response) => {
            information = response.text();
            console.log('info^^',information);
            return information;
        })
        .then((data) => {
            console.log('data=', data);
            console.log('data[message"]=', data["message"]);
        })
        .catch((error) => console.log("error", error));

}

function select_file(e) {
    cancel = 0;
    console.log("press button");

    console.log("UserName=", UserName);
    var inputFile = document.getElementById('customFileInput');
     
    inputFile.addEventListener('change', function(e) {
        fileData = e.target.files[0]; // 檔案資訊
        if (!fileData) {
            return;
        }  
        fileName = fileData.name; // 檔案名稱
        fileType = fileData.type; // 檔案類型
        fileSize = Math.ceil(fileData.size * 0.001); // 檔案大小轉成kb (無條件進位)
        fileTime = fileData.lastModifiedDate;   

        console.log("fileData=",fileData); // 用開發人員工具可看到資料
        console.log("fileName=",fileName); // 用開發人員工具可看到資料
        console.log("fileType=",fileType); // 用開發人員工具可看到資料
        console.log("fileSize=",fileSize); // 用開發人員工具可看到資料
        console.log("fileTime=",fileTime); // 用開發人員工具可看到資料

        document.getElementById('file_name').value = fileName;
        document.getElementById("video").src=URL.createObjectURL(fileData);    

    }, false);

    document.getElementById("video").addEventListener('loadedmetadata', function () {
        videolength = Math.floor(document.getElementById("video").duration);
        console.log("video length: ", videolength);
    })   
}  

export const slice = (file, piece = CHUNK_SIZE) => {   //切割
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

function choose_upload_script(){
    if(T==0)
    {
        T=1;
        document.getElementById("script_button").style = "  background-color: rgba(255,0 ,0 , 1);";
        Next_Link = process.env.NEXT_PUBLIC_VE_Create_step3_video;  //VE_Edit_video
    }
    else
    {
        T=0;
        document.getElementById("script_button").style = "  background-color: rgba(243, 241, 241, 1);";
        Next_Link = process.env.NEXT_PUBLIC_VE_Create_no_script;  //VE_Edit_video
    }
    console.log("T=",T);
}

export default function Popup_Quiz_upload_video_page() {
    const router = useRouter();

    async function _chunkUploadTask(chunks) {   //上傳分割好的小段影片(依據切割長度發送請求次數)
        const results = [];   //儲存每一段影片上傳後的結果(成功/失敗)
        var Chunk_Number = 1;
        var Chunk_Final = false;
        var information;
    //    var transform_degree;
    
        console.log('Length=',chunks.length);
        console.log("fileName==",fileName);
        console.log("GET MetaDataToken", JSON.stringify(Metadata_token));
    
    
        for (let chunk of chunks) {   //
            const fd = new FormData();   //宣告fd為FormData();
    
            //發送影片相關資訊到後端(Golang)
            const Video_Information_send =
            {
                "username": UserName,
                "video_name": fileName,
                "video_description": "none",
                "video_length": videolength,
                "video_size": fileSize,
                "video_format": "video/mp4",
                "chunk_number": String(Chunk_Number),
                "chunk_final": String(Chunk_Final),  
            }
    
            var Video_Information_send_json = JSON.stringify(Video_Information_send);  //轉json格式
            console.log("account_send_json is " + Video_Information_send_json);
            console.log('account_send_json is ',typeof(Video_Information_send_json));
    
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
                if(Chunk_Number < chunks.length)
                {
                    Chunk_Number = Chunk_Number + 1;
                    if(Chunk_Number == chunks.length)
                    {
                        Chunk_Final = true;
                    }
                }
    
                if(cancel == 0)
                {
                    console.log("POST !!");
                    const response = await fetch(process.env.NEXT_PUBLIC_API_upload_video, {   //call後端的API
                        method: 'POST',
                        headers:{
                            "Metadata-Token": Metadata_token,
                        },
                        body: fd,    //傳送到後端的內容
                    });
    
                    if (response.ok) {
                        console.log("response is ok!");
                        //const data = await response.json();   //取得後端回傳的資料
                        const data = await response.text();   //取得後端回傳的資料
        
                        results.push(data);    //將後端後端傳回的資料放到results
                        if(Chunk_Number == chunks.length)
                        {                                  //取得video_path
                            Cookies.set('video_path' ,data?.substring(12, data?.lastIndexOf("W")));
                            console.log("video_path=", Cookies.get('video_path'));
                        }   
    
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
    
                    } 
                    else {
                        console.log("response not ok.");
                        results.push(null);
                    }
                }
                else
                {
                    console.log("cancel", Chunk_Number-1, "chumk uplaod!");
                    break;
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
    
    async function sendMetadata()
    {
        //發送metadata到後端
        const Video_metadata_send =
        {
            "username": UserName,
            "video_type": fileType,
            "video_size": fileSize,
            "video_length": videolength,
        }
    
        var Video_metadata_send_json = JSON.stringify(Video_metadata_send);  //轉json格式
        console.log("Video_metadata_send_json is " + Video_metadata_send_json);
    
        try 
        {
            //傳送metadata到後端
            const metadata_response = await fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_Metadata_video, {            
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: Video_metadata_send_json,
            });
                
            if(metadata_response.ok)
            {
                const data = await metadata_response.text();
                console.log('data=', data);
                console.log("data['message']",JSON.parse(data).message);
                console.log("data['Metadata_Token']",JSON.parse(data).Metadata_Token);
                Cookies.set('Metadata_Token',JSON.parse(data).Metadata_Token);
                Metadata_token = Cookies.get('Metadata_Token');
                console.log("SET Cookies-> ", Metadata_token);
    
                if(fileSize*1024 > SPLIT_BYTES)
                {
                    slice(fileData, SPLIT_BYTES)
                    .then(chunks => {
                        // 在這裡對分塊進行後續處理
                        console.log(chunks); // 輸出分塊陣列
                        console.log('length=',chunks.length);
                        console.log('type=',typeof(chunks));
    
                        _chunkUploadTask(chunks)
                        .then(results => {
                            // 处理上传结果
                            console.log("_chunkUploadTask result: ",results);
                        })
                        .catch(error => {
                            // 处理错误
                            console.error("_chunkUploadTask error", error);
                        });
                    })
                    .catch(error => {
                        // 處理錯誤
                        console.error("slice error", error);
                    });
                }
                else
                {
                    const noSlice_fd = new FormData();   //宣告fd為FormData();
                    noSlice_fd.append('Data', fileData);     //把每一個chunk插入fd中
            
                    //fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_login, {
                    fetch(NEXT_PUBLIC_API_upload_video, {
                        method: 'POST',
                        body: noSlice_fd,
                    })
                        .then((response) => {
                            information = response.json();
                            console.log('info^^',information);
                            return information;
                        })
                        .then((data) => {
                            var msg = data["message"];
    
                            console.log('msg=',msg);
                            console.log('data=',data);
                            alert(msg);
                    //        document.getElementById('number').textContent = '預測結果為 : ' + S_DATA;	
                            if(msg == "Login successful")
                            {
                                window.location.replace("/");
                            }
                        })
                        .catch((error) => console.log("error", error));
    
                }
            }
            else 
            {
                console.log("response not ok.");
            }
    
            console.log("Metadata_Token=", Metadata_token);
        }  
        catch (err) {    //如果發生錯誤
            console.log("try error=", err);
        }
    }
    
    function upload_file(e){
        var information;
        var id;
        var title;
        var file_type;
        var upload=0;
    
    
        document.getElementById('uploading').style = "display: flex";
    
        file_type = fileName?.substring(fileName?.indexOf(".",0));  //取得副檔名
        console.log("file_type=",file_type); 
    
    
        if(file_type == ".mp4" || file_type == ".MOV") //如果檔案 
        {
            sendMetadata();    //發送MetaData到後端
        }
        else if(file_type == ".ppt" || file_type == ".pptx")
        {
            Next_Link = process.env.NEXT_PUBLIC_VE_Create_step3;  //VE_Edit_PPT
            
    /*
            fetch("http://127.0.0.1:8000/ppts/", {
    
        */
        }
        else if(file_type == "")
        {
            alert("Please choose a file.");
            return false
        }
        else
        {
            alert("The file type uncorrect!");
            return false
        }
    }

    return (
        <>
            <main className={styles.main}>
                <div id="uploading" style={{height: "100%",display: "none"}}>
                    <div className={styles.question_background}>
                        <div className={styles.pop_up_loading_window}>
                            <div className={styles.uploading_text} >
                                uploading...
                            </div>
                            <div className={styles.Circle_bottom}>
                            </div>
                            
                            <div className={styles.right}>
                                <div id='Circle_up_R' className={styles.Circle_up_R}>
                                </div>
                            </div>
                            <div className={styles.left}>
                                <div className={styles.Circle_up_L}>
                                </div>
                            </div>
                            <div style={{float: "right", marginBottom: "5vh"}}>
                                <button className={styles.uploading_Cancel_button} onClick={cancel_upload}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.pop_upload_file_title}>
                    Please paste the link of a Youtube video or upload your video. (It might take a few minutes.)
                </div>
                <div className={styles.no_padding_center}>
                    <div >
                        <input type="text" id="file_name"  placeholder='Please paste the link of a Youtube video' className={styles.Youtube_link_input}>

                        </input>
                        <input id="customFileInput" className={styles.choose_file} type="file" accept="*.ppt, *.pptx, video/*"></input>
                        <label htmlFor="customFileInput" className={styles.pop_upload_block} onClick={select_file}>
                            <div className={styles.no_padding_center}>
                                <div>
                                    <div>
                                        <video 
                                            id="video"
                                            poster=""
                                            autoPlay={false}
                                            controls={true} 
                                            style={{display: "none"}}
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <div className={styles.upload_image}>
                                        <Image
                                            src="/Upload_cloud_image.svg"
                                            alt="Upload cloud image"
                                            width={115}
                                            height={115}
                                            priority
                                        />
                                    </div>
                                      Click here {/*to upload or drag your file here*/} to upload your file
                                </div>
                            </div>
                        </label>
                    </div>
                </div>   
                <div className={styles.clearfix}>
                    <button className={styles.CMV_Next_button} onClick={upload_file}>
                        Next
                    </button>
                </div>                 
            </main>
        </>
    )
}
