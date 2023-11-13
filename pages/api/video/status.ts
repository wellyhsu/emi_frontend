// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { COOKIE_NAME_PRERENDER_BYPASS } from 'next/dist/server/api-utils';
import { waitUntilSymbol } from 'next/dist/server/web/spec-extension/fetch-event'
import Cookies from 'js-cookie';

var status;
var video_id;
var processed_video_path;
var RID;  //紀錄影片(唯一性)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
)
{ 
  if (req.method === 'POST') 
  {   
    console.log("POST API");
    status = req.body.status;  //影片處理狀態
    video_id = req.body.video_id;  //影片ID
    processed_video_path = req.body.processed_video_path;
    RID = req.body.RID;

    console.log(
                "PPvideo_id:", video_id, 
                "status:", status, 
                "processed_video_path:", processed_video_path,
                "RID= ", RID
              );

    if(status == "completed")
    { 
      console.log("CC_processed_video_path: ",processed_video_path);
      
      res.status(200).json({ 
        video_id: video_id, 
        status: status, 
        processed_video_path: processed_video_path, 
        RID: RID 
      });
    }
    else
      res.status(200).json({ 
        video_id: video_id, 
        status: status, 
        processed_video_path: "Still not get.", 
        RID: RID 
      });
  }
  else  //GET
  {
    try {
      // 等待異步操作完成
      console.log("GET status=", status);        

      console.log("video_id:", video_id, 
                  "status:", status, 
                  "processed_video_path:", processed_video_path,
                  "RID", RID
                  );

      if(status == 'completed')
        res.status(200).json({ 
            video_id: video_id, 
            status: status, 
            processed_video_path: processed_video_path,
            RID: RID
        });
      else
        res.status(200).json({ 
            video_id: video_id, 
            status: status, 
            processed_video_path: "Still not get." 
            RID: RID  
        });
    } 
    catch (error) 
    {
      res.status(500).json({ error: '發生錯誤' });
    }
  }
}
