import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import React, {useLayoutEffect, useEffect, useState} from 'react';
import Cookies from 'js-cookie'; 
import { useRouter } from 'next/router';
import { Dialog } from "@headlessui/react";
import Archive_video from '../components/Archive_video'
import AlertMessage from '../components/AlertMessage'

const token =  Cookies.get('token');

export default function Account_Archive() {
  var information;
  var id;
  var title;
  var description;
  var updated_at;
  var video_file;
  const router = useRouter();

  function alert_message(){
    router.push("/"+ process.env.NEXT_PUBLIC_Log_in);
  }
  if((token == "null") || (token == null) || (token == "undefined"))
  {
    useEffect(() => {

      console.log("useEffect triggered");
    }, [])

    return(
      <button className={styles.alert_background} onClick={alert_message}>
        <div className={styles.alert_message}>
          <div style={{display: "inline-block", marginTop: "15vh",  verticalAlign: "middle"}}>
            <Image
              src="/warning-sign.png"
              alt="Add new question"
              width={70}
              height={70}
              priority
            />
          </div>
          <div className={styles.alert_content}>
            Please log in, thanks. 
          </div>
        </div>
      </button>
    )
  }
  else
  {
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
}