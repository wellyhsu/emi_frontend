// pages/api/video.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const videoPath = req.query.videoPath;

  // 檢查 videoPath 是否存在
  if (!videoPath) 
  {
    return res.status(400).json({ error: 'Missing videoPath parameter' });
  }

  // 嘗試創建讀取流
  const videoStream = fs.createReadStream(videoPath);
   
  // 读取文件大小
  const fileSize = fs.statSync(videoPath).size;

  // 解析范围请求头
  const range = req.headers.range;
  console.log("range= ", range);

  if (range) 
  {
    const [start, end] = range.replace(/bytes=/, '').split('-');
    const partialStart = parseInt(start, 10);
    const partialEnd = end ? parseInt(end, 10) : fileSize - 1;

    // 设置 Content-Range 头
    res.setHeader('Content-Range', `bytes ${partialStart}-${partialEnd}/${fileSize}`);

    // 设置 HTTP 状态码为 206 Partial Content
    res.statusCode = 206;

    // 读取并发送文件的特定部分
    const videoStream = fs.createReadStream(videoPath, { start: partialStart, end: partialEnd });
    videoStream.pipe(res);
  }
  else
  {
    // 如果没有范围请求，正常发送整个文件
    res.setHeader('Content-Length', fileSize);
    fs.createReadStream(videoPath).pipe(res);
    videoStream.pipe(res);
  }

    // 事件監聽器 監聽error事件
    videoStream.on('error', (error) => {
      console.error('Error reading video file:', error);
      return res.status(500).json({ error: 'Error reading video file' });
    });

  // 設置 Content-Type 標頭
  res.setHeader('Content-Type', 'video/mp4');
  // 設置 Cache-Control 標頭，可根據需要進一步自訂
  res.setHeader('Cache-Control', 'max-age=31536000, must-revalidate');
  
  res.setHeader('Accept-Ranges', 'bytes');


}
