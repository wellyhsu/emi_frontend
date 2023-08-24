// pages/api/video.js
import fs from 'fs';
import path from 'path';
/*
export default function handler(req, res) {
//  const videoPath = process.env.NEXT_PUBLIC_video_path;
  const videoPath = req.body;
  const videoStream = fs.createReadStream(videoPath);
 
  console.log("req.body=", req.body);
 
  res.setHeader('Content-Type', 'video/mp4');
  videoStream.pipe(res);
}
*/
async function fetchData() {
  try {
    const response = await fetch('your-backend-api-url');
    const data = await response.json();
    console.log('Data from backend:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// 在适当的地方调用 fetchData 函数
async function yourFunction() {
  try {
    const data = await fetchData();
    // 在这里使用获取到的数据
  } catch (error) {
    // 处理错误
  }
}

