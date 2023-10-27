// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) 
{
  const status = req.query.status;  //影片處理狀態
  const video_id = req.query.video_id;  //影片ID
  const processed_video_path = req.query.processed_video_path;

  if(status == 'completed')
    res.status(200).json({ video_id: 'video_id', status: status, video_path: 'videoPath' });
/*  else
    res.status(200).json({ video_id: 'video_id' ,status: status});
*/  }
