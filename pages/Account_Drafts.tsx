import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Cookies from 'js-cookie';
import Archive_video from '../components/Archive_video'
import {useLayoutEffect, useEffect, useState} from 'react';
import { useRouter } from 'next/router';

const token =  Cookies.get('token');

export default function Home() {
  const router = useRouter();

  useLayoutEffect(() => {

    if((token == "null") || (token == null) || (token == "undefined"))
    {
      console.log("useEffect triggered");
      router.push("/"+ process.env.NEXT_PUBLIC_Log_in);

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
          <div className={styles.Account_grid4}>
            <div>
              <Archive_video
                videoName="dynamicsClass01.mp4"
              />
            </div>
            <div>
              <Archive_video
                videoName="dynamicsClass02.mp4"
              />
            </div>
            <div>
              <Archive_video
                videoName="EnglishListeniing01.mp4"
              />
            </div>
            <Archive_video
              videoName="EnglishListeniing02.mp4"
            />
          </div>
        </div>

      </main>
  )
}
