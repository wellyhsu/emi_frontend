import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Cookies from 'js-cookie';

var Draft_href;
export default function Home() {

  const token = Cookies.get('token');

  if(token == "null" || token == "undefined")  //尚未登入
  {
    Draft_href = process.env.NEXT_PUBLIC_Log_in;
  }
  else  //已登入
  {
    console.log("token=",token);
    Draft_href = process.env.NEXT_PUBLIC_Account_Drafts;
  }

  return (
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
                fill={true}
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
                  query: { page: Draft_href }
                  }}
              >
                view the upload videos
              </Link>
            </button> 
            <div className={styles.message_word} >
              Still no have videos? Upload one and try it !!
            </div>
            <button className={styles.VideoEditor_button}>
              <Link 
                href={{
                  pathname: '/[page]',
                  query: { page: process.env.NEXT_PUBLIC_VE_Create_step2 }
                  }}
              >
                upload video and <br/>
                optimize pronounce
              </Link>
            </button>
            
          </div>
        </div>

      </main>

  )
}
