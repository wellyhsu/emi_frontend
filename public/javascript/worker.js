
importScripts('./video_upload.js');

// 定义回调函数，在每次迭代中获取更新值
function updateProgress(value) {
  //取得目前影片上傳進度
  console.log("Current Progress:", value.video_upload_process);
  console.log("video_upload_status:", value.video_upload);
  self.postMessage({ type: "video_upload" , video_upload_progress: value.video_upload_process });
  if(value.video_upload == "finish")
  {
    self.postMessage({ type: "video_upload" , video_upload: "finish" });
  }
}

self.onmessage = function (event) {
    const videoFile = event.data;
    console.log("videoFile=", videoFile);
    console.log("videoFile['fileName']=", videoFile['fileName']);

    // 在这里执行上传任务，例如使用fetch
    // ...
    if (event.data.Status === 'terminate') //使用者取消上傳影片
    {
      // 收到终止请求，执行终止操作
      console.log("terminate worker");

      self.postMessage({ result: '终止完成' });
      self.close(); // 关闭 Worker
    } 
    else
    {
      const Metadata_data = sendMetadata(videoFile['fileName'], videoFile['fileType'], videoFile['fileSize'], videoFile['videolength'], videoFile['UserName'], videoFile['user_RID']);    //發送MetaData到後端
      var Metadata_Verify;
      var Metadata_token;

      Metadata_data.then(result => {
        // 访问 Metadata_Verify 的值
        console.log('result=', result);
        Metadata_Verify = result['Metadata_Verify'];
        Metadata_token = result['Metadata_token'];
      
        console.log("Metadata_Verify=",Metadata_Verify);
        console.log("Metadata_token=",Metadata_token);
     
        if(Metadata_Verify == true) //true
        {
          console.log("Metadata_Verify OK.");
          if(videoFile['fileSize']*1024 > videoFile['SPLIT_BYTES'])
          {
              console.log('Slice video.');
              slice(videoFile['fileData'], videoFile['SPLIT_BYTES'])
              .then(chunks => {
                  // 在這裡對分塊進行後續處理
                  console.log('chunks=', chunks); // 輸出分塊陣列
                  console.log('length=',chunks.length);
                  console.log('type=',typeof(chunks));

                  _chunkUploadTask(chunks, Metadata_token, videoFile['UserName'], videoFile['videoTitle'], videoFile['fileName'], videoFile['videolength'], videoFile['fileSize'], videoFile['user_RID'], updateProgress)
                  .then((results) => {
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
          else //處理影片大小不到100kB的影片
          {
              console.log('Not Slice video.');
              const noSlice_fd = new FormData();   //宣告fd為FormData();
              noSlice_fd.append('Data', videoFile['fileData']);     //把每一個chunk插入fd中
      
              //fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_login, {
              fetch(NEXT_PUBLIC_API_upload_video, {
                  method: 'POST',
                  body: noSlice_fd,
              })
                  .then((response) => {
                      information = response.json();
                      console.log('no slice upload information=',information);
                      return information;
                  })
                  .then((data) => {
                      console.log('data=',data);
                  })
                  .catch((error) => console.log("error", error));
          }
        }
        else
        {
          console.log("Metadata response not ok");
        }
      }); 

      console.log("send to frontend video_upload_process=", video_upload_process);
      // 向主线程发送消息，通知上传完成
      self.postMessage({ result: '上传完成' });
    }
  };