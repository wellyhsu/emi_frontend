import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import {useEffect, useState} from 'react';
import Cookies from 'js-cookie'; 

var Draft_href;

export default function Home() {

  useEffect(() => {
    console.log("useEffect triggered");
    const token = Cookies.get('token');

    if(token == null ||  token == "null")
    {
      Draft_href = process.env.NEXT_PUBLIC_Log_in;
    }
    else
    {
      Draft_href = process.env.NEXT_PUBLIC_Account_Drafts;
    }

  }, []) //傳遞一個空數組來保證只會被執行一次


  return (
    <>
      <main className={styles.main}>

        <div className={styles.VideoEditor_center}>
          <div style={{width: "100%", marginLeft: "-15%"}}>
            <div className={styles.Video_Editor_title}>
              Text-to-Speech Audio
            </div>
            <div className={styles.Video_Editor_content}>
              Acapela Group offers more than 30 languages <br/>
              and 100 accents for users to choose. <br/>
              Multi-character materials and listening exercises <br/>
              for all accents are available. <br/>
            </div>
          </div>

          <div style={{width: "50%"}}>
            <div className={styles.VideoEditor_image}>
              <Image
                src="/Text-to-speech_image.svg"
                alt="Text-to-speech image"
                width={146}
                height={146}
                priority
              />
            </div>
            
            <button className={styles.VideoEditor_button}>
              <Link 
                href={{
                  pathname: '/[page]',
                  query: { page: process.env.NEXT_PUBLIC_TTSA_Create }
                  }}
              >
              Create My Audio
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
