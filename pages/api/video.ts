// pages/api/video.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const videoPath = req.query.videoPath;
  const videoStream = fs.createReadStream(videoPath);
 
  // 使用CORS中间件来处理CORS策略
  //cors(req, res);
  
  console.log("req.body=", req.body);
 
  res.setHeader('Content-Type', 'video/mp4',"Cache-Control","max-age=31536000, must-revalidate");
  videoStream.pipe(res);
}
