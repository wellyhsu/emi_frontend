import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Cookies from 'js-cookie';
import Archive_video from '../components/Archive_video'
import {useLayoutEffect, useEffect, useState} from 'react';
import { useRouter } from 'next/router';

const token =  Cookies.get('token');
var API=0;
var UserName;
var data_video_name;
var Video_Name_array = [];
var video = [];
var i=0;


export default function Home() {
  const router = useRouter();
  const [Video_name, setVideo_name] = useState([]); 
  const [video_number, setVideo_Number] = useState(1);
  
  useLayoutEffect(() => {

    if((token == "null") || (token == null) || (token == "undefined"))
    {
      console.log("useEffect triggered");
      router.push("/"+ process.env.NEXT_PUBLIC_Log_in);

    }

    console.log("API=",API);
    if(API == 0)
    {   
      console.log("Get Video path!!");
      UserName = Cookies.get('userName');
      UserName = UserName?.substring(1, UserName?.lastIndexOf(`"`));  //" "中間字串
      console.log("username!!", UserName);

      //取得使用者影片總數
      fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_quiz + UserName + "/number", {  //取得要插入影片的時間點資訊
        method: 'GET',
      })
        .then((response) => {
            console.log('response=',response);
            var information = response.text();
            console.log('info^^',information);
            return information;
        })
        .then((data) => {
          console.log("data=",data);  
          data = String(data);
      //    setVideo_Number(data);
          console.log(data);
          console.log("video_number=", video_number);  
        })
        .catch((error) => console.log("error", error));

/*
    //取得使用者影片路徑、檔名
    API = 1;                                                                                
    fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_quiz + UserName, {  //取得要插入影片的時間點資訊
        method: 'GET',
    })
      .then((response) => {
          console.log('response=',response);
          var information = response.json();
          console.log('info^^',information);
          return information;
      })
      .then((data) => {
        console.log("data=",data[0]);  
        for(i=0; i<video_number; i++)    
        {
          data_video_name = String(data[i])?.substring(String(data[i])?.lastIndexOf(`/`)+1);
          Video_Name_array.push(data_video_name);
          video.push(
            <div>
              <Archive_video
                videoName={Video_name[i]}
                videoPath={`/api/video?videoPath=${encodeURIComponent(data[i])}`}
                key={i}
              />
            </div>
          )
        }
        setVideo_name(Video_Name_array);  //把影片名字儲存起來
        console.log("Video_Name=", Video_name);
        
      
      })
      .catch((error) => console.log("error", error));
*/
    }

  }, [])

  

  return (
      <main className={styles.main}>
        <div className={styles.Account_My_Creations}>
          My Creations
            <Link 
              href={{
                pathname: '/[page]',
                query: { page: process.env.NEXT_PUBLIC_Account_Drafts }
                }}
              style={{color: "rgba(0, 0, 0, 1)"}}
              className={styles.Account_Drafts}
            >
              Drafts
            </Link>
            <div className={styles.Account_dash}>
              |
            </div>
            <Link 
              href={{
                pathname: '/[page]',
                query: { page: process.env.NEXT_PUBLIC_Account_Archive }
                }}
              className={styles.Account_Title_Gray}
            >
              Archive
            </Link> 
            <div className={styles.Account_dash}>
              |
            </div>
            <Link 
              href={{
                pathname: '/[page]',
                query: { page: process.env.NEXT_PUBLIC_Account_Settings }
                }}
              className={styles.Account_Title_Gray}
            >
              Settings
            </Link> 
        </div>
        

        <div className={styles.Account_grid}>
            {video}
            <div>
              <Archive_video
                videoName="dynamicsClass02.mp4"
                videoPath={`/api/video?videoPath=${encodeURIComponent("/home/roy/test/video/roy/uploads/test1.mp4")}`}
              />
            </div>

        </div>

      </main>
  )
}
