// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { COOKIE_NAME_PRERENDER_BYPASS } from 'next/dist/server/api-utils';
import { waitUntilSymbol } from 'next/dist/server/web/spec-extension/fetch-event'
import Cookies from 'js-cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
)
{ 
  var status;  //影片處理狀態
  var video_id;  //影片ID
  var processed_video_path;

  if (req.method === 'POST') 
  {   
    status = req.body.status;  //影片處理狀態
    video_id = req.body.video_id;  //影片ID
    processed_video_path = req.body.processed_video_path;

     console.log(
                "PPvideo_id:", video_id, 
                "status:", status, 
                "video_path:", processed_video_path
              );

    if(status == 'completed')
    { 
      Cookies.set('Get_video_path', "true");
      console.log("CC_processed_video_path: ",processed_video_path);

      Cookies.set('video_path' , processed_video_path);
      console.log('Get_video_path=', Cookies.get('Get_video_path'));
      console.log('back_Cookies=', Cookies.get('video_path'));

      res.status(200).json({ video_id: video_id, status: status, video_path: processed_video_path });
    }
    else
      res.status(200).json({ video_id: video_id, status: status, video_path: "Still not get." });
  }
/*  else  //GET
  {
    try {
      // 等待異步操作完成
      const result = await performSomeAsyncOperation();
      console.log("video_id:", video_id, 
                  "status:", status, 
                  "video_path:", processed_video_path
                );

      if(result == 'completed')
        res.status(200).json({ video_id: video_id, status: status, video_path: processed_video_path });
      else
        res.status(100).json({ video_id: video_id ,status: status, video_path: "Still not get." });
    } 
    catch (error) 
    {
      res.status(500).json({ error: '發生錯誤' });
    }
  }
*/
  console.log(
              "data==", 
              "video_id:", video_id, 
              "status:", status, 
              "video_path:", processed_video_path
            );
}
