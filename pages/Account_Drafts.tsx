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
var Video_Name_array=[];
var Video_array=[];

var i=0;


export default function Home() {
  const router = useRouter();
  const [video_number, setVideo_Number] = useState(0);
  const [video_name_array, setVideoNameArray] = useState([]);
  const [video_array, setVideoArray] = useState([]);

  useLayoutEffect(() => {

    if((token == "null") || (token == null) || (token == "undefined"))
    {
      console.log("useEffect triggered");
      router.push("/"+ process.env.NEXT_PUBLIC_Log_in);

    }

    console.log("API=",API);
    if(API == 0)
    {   
      API = 1;  
      console.log("Get Video path!!");
      UserName = Cookies.get('userName');
      UserName = UserName?.substring(1, UserName?.lastIndexOf(`"`));  //" "中間字串
      console.log("username!!", UserName);

      //取得使用者影片總數
      fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_quiz + UserName + "/number", { 
        method: 'GET',
      })
        .then((response) => {
            console.log('response=',response);
            var information = response.text();
            console.log('info^^',information);
            return information;
        })
        .then((data) => {
          console.log("data=",typeof(data));  
          setVideo_Number(parseInt(data));
          console.log("video_number=", video_number);  
        })
        .catch((error) => console.log("error", error));
    }
  }, [])

  useLayoutEffect(() => {
    console.log("video_number=", video_number);
    //取得使用者影片路徑、檔名
    fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_quiz + UserName, {  
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
          Video_array.push(
            <div>
              <Archive_video
                videoName={Video_Name_array[i]}
                videoPath={`/api/video?videoPath=${encodeURIComponent(data[i])}`}
                key={i}
              />
            </div>
          )
        }
        const send_Video_Name = [...video_name_array];    //用於建立副本，渲染畫面
        send_Video_Name.push(Video_Name_array);
        setVideoNameArray(send_Video_Name);

        const send_Video = [...video_array];    //用於建立副本，渲染畫面
        send_Video.push(Video_array);
        setVideoArray(send_Video);

        console.log("F_Video_Name=", video_name_array);
        console.log("F_video_array=", video_array);

      })
      .catch((error) => console.log("error", error));
  }, [video_number]);

  console.log("video_array=", video_array);
  

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
            {video_array}
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
