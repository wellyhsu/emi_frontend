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
              Video Editor
            </div>
            <div className={styles.Video_Editor_content}>
              Make standard English pronunciation videos <br/>
              to help students familiarize with native speaker's pronunciation. <br/>
              Acapela Group provides digital voices with standard pronunciation <br/>
              Just a few steps and your videos will be done. <br/>
              Every one can be an EMI instructor! <br/>
            </div>
          </div>

          <div style={{width: "50%"}}>
            <div className={styles.VideoEditor_image}>
              <Image
                src="/Video_Editor_image.svg"
                alt="Video Editor image"
                width={146}
                height={146}
                priority
              />
            </div>
            
            <button className={styles.VideoEditor_button}>
              <Link 
                href={{
                  pathname: '/[page]',
                  query: { page: process.env.NEXT_PUBLIC_VE_HOW }
                  }}
              >
                How to Make a video
              </Link>
            </button>
            <button className={styles.VideoEditor_button}>
              <Link 
                href={{
                  pathname: '/[page]',
                  query: { page: process.env.NEXT_PUBLIC_VE_Create }
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
