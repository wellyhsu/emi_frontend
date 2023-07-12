import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import {useEffect, useState} from 'react';
import Cookies from 'js-cookie'; 
import Archive_video from '../components/Archive_video'

var number=0;

function NO_logibn(){
  if(number==0)
  {
    alert("Please Log in, thanks!"); 
  }
  number = number + 1;
}

export default function Home() {
  var information;
  var id;
  var title;
  var description;
  var updated_at;
  var video_file;

  useEffect(() => {
    console.log("useEffect triggered");
    const token = Cookies.get('token');
    if(token == null || token == "null")
    {
      NO_logibn();
      window.location.replace("/"+ process.env.NEXT_PUBLIC_Log_in);
    }
  }, [])

  const userName = Cookies.get('userName');
  console.log("userName=",userName);

  var send_userName = userName?.substring(1,(userName?.length-1));    
  console.log("send_userName=",send_userName);


  fetch("http://127.0.0.1:8000/videos/", {
    method: 'GET',
    headers:{
        'Content-Type': 'application/json'
    },
  })
  .then((response) => {
      information = response.json();
      console.log('info^^',information);
      return information;
  })
  .then((data) => {
    id = data["id"];
    title = data["title"];
    description = data["description"];
    updated_at = data["updated_at"];
    video_file = data["video_file"];

    console.log('id=',data["id"]);
    console.log('title=',data["title"]);
    console.log('description=',data["description"]);
    console.log('updated_at=',data["updated_at"]);
    console.log('video_file=',data["video_file"]);

//            alert(data["detail"]);
  })
  .catch((error) => console.log("error", error));

  return (
    <>
      <main className={styles.main}>
        <div className={styles.Account_My_Creations}>
          My Creations
            <Link 
              href={{
                pathname: '/[page]',
                query: { page: process.env.NEXT_PUBLIC_Account_Drafts }
                }}
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
              className={styles.Account_Title_Black}
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
          <div className={styles.Account_grid4}>
            <div>
              <Archive_video
                videoName="MathClass01.mp4"
              />
            </div>
            <div>
              <Archive_video
                videoName="MathClass02.mp4"
              />
            </div>
            <div>
              <Archive_video
                videoName="MathClass03.mp4"
              />
            </div>
            <Archive_video
              videoName="MathClass04.mp4"
            />
          </div>
        </div>

      </main>
    </>
  )
}
