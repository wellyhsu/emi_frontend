// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {    //回傳的資料
  Next_Link: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
)
{
  //process.env.NEXT_PUBLIC_VE_Create_step3="/VE_Edit_PPT"
  //process.env.NEXT_PUBLIC_VE_Create_step3_video="/VE_Edit_video"
  console.log("type=");
//req.body 傳來的全部資料, type 傳來的資料的名稱   
  if(req.body.type == "PPT")
  {
      res.status(200).json({ Next_Link: process.env.NEXT_PUBLIC_VE_Create_step3 })
  }
  else if(req.body.type == "Video")
  {
      res.status(200).json({ Next_Link: process.env.NEXT_PUBLIC_VE_Create_step3_video })
  }
  else
  {
    res.status(200).json({ Next_Link: "Error!!" })
  }
}