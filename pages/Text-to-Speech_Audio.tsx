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
              <Link href="/Log_in">
              Create My Audio
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
