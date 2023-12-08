
//上傳影片到資料庫後端的取消功能
function cancel_upload(UserName, fileName, user_RID, Metadata_Token)
{
    var information;

    document.getElementById("uploading").style = "display: none";

    const Cancel = new FormData();   //宣告Cancel為FormData();
    Cancel.append('username', UserName);     //把username插入fd中
    Cancel.append('video_name', fileName);     //把video_name插入fd中
    Cancel.append('user_RID', Cookies.get('user_RID'));     //把video_name插入fd中

    //檢查FormData內的內容 - 方法一
    Cancel.forEach((key, value) => {
        console.log("value(標題)=",value,"key(內容)=",key);
    });

    fetch("http://34.96.232.169:30036/api/video/cancel", {            
        method: 'POST',
        headers:{
            "Metadata-Token": Metadata_Token,
        },
        body: Cancel,
    })
        .then((response) => {
            information = response.json();
            console.log('API cancel information=',information);
            return information;
        })
        .then((data) => {
            console.log('API cancel data=', data);
        })
        .catch((error) => console.log("error", error));
}

//影片進行優化處理時的取消
function cancel_video_processing(UserName, fileName, user_RID, Metadata_Token)
{
    var information;

    document.getElementById("video_processing").style = "display: none";
    
    const Cancel = new FormData();   //宣告fd為FormData();
    Cancel.append('username', UserName);     //把每一個chunk插入fd中
    Cancel.append('video_name', fileName);     //把每一個chunk插入fd中
    Cancel.append('user_RID', user_RID);     //把video_name插入fd中

    //檢查FormData內的內容 - 方法一       
    Cancel.forEach((key, value) => {
        console.log("value(標題)=",value,"key(內容)=",key);
    });

    //打取消上傳影片的API
    fetch("http://34.96.232.169:30036/api/video/cancel", {            
        method: 'POST',
        headers:{
            "Metadata-Token": Metadata_Token,
        },
        body: Cancel,
    })
        .then((response) => {
            information = response.json(); 
            console.log('API cancel information=',information);
            return information;
        })
        .then((data) => {
            console.log('API cancel data=', data);
        })
        .catch((error) => console.log("error", error));
}

//存放要在後端執行的程式碼
export function processing_worker(fileData, fileName, fileType, fileSize, videolength, UserName, user_RID, SPLIT_BYTES, videoTitle, Metadata_Token, progressCallback)
{
    const worker = new Worker('/javascript/worker.js');

    console.log("執行worker 背景執行上傳任務");

    var data={
        fileData: fileData,
        fileName: fileName,
        fileType: fileType,
        fileSize: fileSize,
        videolength: videolength,
        UserName: UserName,
        user_RID: user_RID,
        SPLIT_BYTES: SPLIT_BYTES,
        videoTitle: videoTitle,
    };

    worker.postMessage(data);
    // 继续执行其他代码，不会阻塞

    //Check 使用者是否點擊cancel按鈕
    let btn_upload_cancel = document.getElementById('upload_Cancel');
    let btn_process_cancel = document.getElementById('process_Cancel');            
    let btn_small_upload_window = document.getElementById('small_upload_window');
    let btn_small_process_window = document.getElementById('small_process_window');

    btn_small_upload_window.onclick = function(){
        console.log('縮小影片上傳視窗.');
        document.getElementById('uploading').style = "display: none";
        console.log("上傳影片小視窗出現");
        document.getElementById("upload_small_window").style = "display: flex";
//        document.getElementById('').appendChild();
    };

    btn_small_process_window.onclick = function(){
        console.log('縮小影片處理視窗.');
        document.getElementById('video_processing').style = "display: none";
        console.log("上傳影片小視窗出現");
        document.getElementById("upload_small_window").style = "display: flex";
    };

    //將on-event綁定在事件上
    btn_upload_cancel.onclick = function(){
        console.log('add listening on upload cancel button.');
        cancel_upload(UserName, fileName, user_RID, Metadata_Token);
        worker.postMessage({ Status: 'terminate' });
    };

    btn_process_cancel.onclick = function(){
        console.log('add listening on process cancel button.');
        cancel_video_processing(UserName, fileName, user_RID, Metadata_Token);
        worker.postMessage({ Status: 'terminate' });
    };

    //接收worker執行完成後的結果
    worker.onmessage = function (event) {
        const type = event.data.type;

        if(type == "video_upload")
        {
            const video_upload_progress = event.data.video_upload_progress;
            const video_upload_status = event.data.video_upload;
            
            console.log("video_upload_progress=", video_upload_progress);
            
            progressCallback({ video_upload_progress: video_upload_progress });
//            SetProgress_Number(video_upload_progress);
            
        //影片成功上傳至資料庫
            if(video_upload_status == "finish")
            {
                document.getElementById('uploading').style = "display: none";
                document.getElementById('video_processing').style = "display: inline-block";
            }
        }
        else if(type == "video_process")
        {
            const result = event.data.video_process;    
            console.log("relust=", result);
        //影片完整處理完畢
            if(result['video_process'] == "finish")
            {
                document.getElementById('video_processing').style = "display: none";
                document.getElementById('finish').style = "display: flex";    
            }
        }
    };
}