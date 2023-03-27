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
              Pop-up Quiz Setting
            </div>
            <div className={styles.Video_Editor_content}>
              Teachers are able to insert pop-up quiz at specific <br/>
              times allowing students to absorb knowledge while <br/>
              evaluating the effectiveness of their learning. <br/>
            </div>
          </div>

          <div style={{width: "50%"}}>
            <div className={styles.VideoEditor_image}>
              <Image
                src="/Pop-up_Quiz_image.svg"
                alt="Pop-up Quiz image"
                width={146}
                height={146}
                priority
              />
            </div>
            
            <button className={styles.VideoEditor_button}>
              <Link
                href={{
                  pathname: '/[page]',
                  query: { page: process.env.NEXT_PUBLIC_PopUpQuiz_upload_video }
                  }}
              >
                Create My Quiz
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
