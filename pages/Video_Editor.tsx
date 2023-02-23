import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

export default function Home() {
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
              <Link href="/How_to_Make_video">
                How to Make a video
              </Link>
            </button>
            <button className={styles.VideoEditor_button}>
              <Link href="/Create_My_video">
                Create My Video
              </Link>
            </button>
            <button className={styles.VideoEditor_button}>
              <Link href="/Log_in">
                Drafts
              </Link>
            </button> 
          </div>
        </div>

      </main>
    </>
  )
}
