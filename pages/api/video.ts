// pages/api/video.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
//  const videoPath = process.env.NEXT_PUBLIC_video_path;
  const videoPath = req.body;
  const videoStream = fs.createReadStream(videoPath);
 
  console.log("req.body=", req.body);
 
  res.setHeader('Content-Type', 'video/mp4');
  videoStream.pipe(res);
}
