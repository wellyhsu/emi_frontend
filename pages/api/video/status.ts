// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { COOKIE_NAME_PRERENDER_BYPASS } from 'next/dist/server/api-utils';
import { waitUntilSymbol } from 'next/dist/server/web/spec-extension/fetch-event'
import Cookies from 'js-cookie';

var status;
var video_id;
var processed_video_path;


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
)
{ 
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

    if(status == "completed")
    { 
      console.log("CC_processed_video_path: ",processed_video_path);
      
      res.status(200).json({ video_id: video_id, status: status, video_path: processed_video_path });
    }
    else
      res.status(200).json({ video_id: video_id, status: status, video_path: "Still not get." });
  }
  else  //GET
  {
    try {
      // 等待異步操作完成
      while(status != "completed");

      console.log("video_id:", video_id, 
                  "status:", status, 
                  "video_path:", processed_video_path
                );

      if(status == 'completed')
        res.status(200).json({ video_id: video_id, status: status, video_path: processed_video_path });
      else
        res.status(100).json({ video_id: video_id ,status: status, video_path: "Still not get." });
    } 
    catch (error) 
    {
      res.status(500).json({ error: '發生錯誤' });
    }
  }

  console.log(
              "data==", 
              "video_id:", video_id, 
              "status:", status, 
              "video_path:", processed_video_path
            );
}