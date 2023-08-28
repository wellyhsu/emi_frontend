// pages/api/video.js
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const videoPath = req.body.video_path; // 注意字段名应该是 video_path，和前端发送的 JSON 对象中的字段名一致
  const videoStream = fs.createReadStream(videoPath);

  res.setHeader('Content-Type', 'video/mp4');
  videoStream.pipe(res);
}

/*
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

*/