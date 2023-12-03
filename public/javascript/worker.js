//import {sendMetadata} from './video_upload';
importScripts('./video_upload.js');



self.onmessage = function (event) {
    const videoFile = event.data;
    console.log("videoFile=", videoFile);
  
    // 在这里执行上传任务，例如使用fetch
    // ...
    if (event.data === 'terminate') //使用者取消上傳影片
    {
      // 收到终止请求，执行终止操作
      self.postMessage({ result: '终止完成' });
      self.close(); // 关闭 Worker
    } 
    else
    {
      var Metadata_data = sendMetadata(fileName, fileType, fileSize, videolength, UserName, user_RID);    //發送MetaData到後端
      var Metadata_Verify = Metadata_data['Metadata_Verify'];
      var Metadata_token = Metadata_data['Metadata_token'];

      if(Metadata_Verify == true)
      {
        if(fileSize*1024 > SPLIT_BYTES)
        {
            console.log('Slice video.');
            slice(fileData, SPLIT_BYTES)
            .then(chunks => {
                // 在這裡對分塊進行後續處理
                console.log('chunks=', chunks); // 輸出分塊陣列
                console.log('length=',chunks.length);
                console.log('type=',typeof(chunks));

                _chunkUploadTask(chunks, Metadata_token, UserName, videoTitle, fileName, videolength, fileSize, user_RID)
                .then((results, video_upload_process) => {
                    // 处理上传结果
                    console.log("_chunkUploadTask result: ",results);
                    console.log("video_upload_process=",video_upload_process);
                    return (video_upload_process);
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
            noSlice_fd.append('Data', fileData);     //把每一個chunk插入fd中
    
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
      console.log("send to frontend video_upload_process=", video_upload_process);
      // 向主线程发送消息，通知上传完成
      self.postMessage({ result: '上传完成' });
    }
  };