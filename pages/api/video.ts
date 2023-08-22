// pages/api/video.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const videoPath = '/home/roy/test/video/test/uploads/TEST.mp4';
//  const videoPath = '/home/welly/emi_frontend/public/TEST(1min30sec).mp4';
  const videoStream = fs.createReadStream(videoPath);
  
  res.setHeader('Content-Type', 'video/mp4');
  videoStream.pipe(res);
}
