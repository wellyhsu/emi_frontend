import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import {useEffect, useState} from 'react';

var Draft_href;
export default function Home() {
  const [storageValue, setStorageValue] = useState("null");

  useEffect(() => {
      const token = JSON.stringify(localStorage.getItem('token'));
      setStorageValue(token);
  }, []) //傳遞一個空數組來保證只會被執行一次

  if(storageValue == "null")  //尚未登入
  {
    Draft_href = process.env.NEXT_PUBLIC_Log_in;
  }
  else  //已登入
  {
    Draft_href = process.env.NEXT_PUBLIC_Account_Drafts;
  }

  return (
    <>
      <main className={styles.main}>

        <div className={styles.VideoEditor_center}>
          <div style={{width: "100%", marginLeft: "-15%"}}>
            <div className={styles.Video_Editor_title}>
              Customized Video
            </div>
            <div className={styles.Video_Editor_content}>
              Creating a video by yourself takes time and effort. <br/>
              Let us help you with it! <br/>
              Just create an account and write down your needs, <br/>
              we will customize your videos for you. <br/>
          </div>
          </div>

          <div style={{width: "50%"}}>
            <div className={styles.VideoEditor_image} style={{marginLeft: "43px"}}>
              <Image
                src="/Customized_Video_image.svg"
                alt="CustomizedVideo image"
                width={240}
                height={172}
                priority
              />
            </div>
            
            <button className={styles.VideoEditor_button}>
              <Link 
                href={{
                  pathname: '/[page]',
                  query: { page: process.env.NEXT_PUBLIC_VE_Create_step2 }
                  }}
              >
                Create My Video
              </Link>
            </button>
            <button className={styles.VideoEditor_button}>
              <Link 
                href={{
                  pathname: '/[page]',
                  query: { page: Draft_href }
                  }}
              >
                Drafts
              </Link>
            </button>
          </div>
        </div>

      </main>
    </>
  )
}
