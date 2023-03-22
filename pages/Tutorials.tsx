import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

import Tutorials from '../components/Tutorials';

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.sun}>
          <Image
              src="/tutor_sun_image.svg"
              alt="sun"
              width={430}
              height={526}
              priority
          />
        </div>
        <div className={styles.Video_Editor_Tutor} style={{backgroundColor: "rgba(255, 251, 240, 1)"}}>
          <div className={styles.Tutorials_R_grid2}>
            <div>
              <video 
                src="video_preview.svg"
                poster=""
                width="500" 
                height="348" 
                autoplay="false" 
                controls="true" 
              />
            </div>
            <div>
              <Tutorials 
                title="Video Editor" 
                content="Make standard English pronunciation videos
                to help students familiarize with native speaker's pronunciation.
                Acapela Group provides digital voices with standard pronunciation
                Just a few steps and your videos will be done.
                Every one can be an EMI instructor!"
                link={process.env.NEXT_PUBLIC_Video_Editor}
                button="Create My Video"
              />
            </div>
          </div>
        </div>

        <div className={styles.Video_Editor_Tutor} style={{backgroundColor: "rgba(255, 255, 255, 1)"}}>
          <div className={styles.Tutorials_L_grid2}>
            <div>
              <Tutorials 
                title="Text-to-Speech Audio" 
                content="Acapela Group offers more than 30 languages 
                and 100 accents for users to choose.
                Multi-character materials and listening exercises
                for all accents are available."
                link={process.env.NEXT_PUBLIC_TextToSpeech_Audio}
                button="Create Text-to-Speech Audio"
              />
            </div>
            <div>
              <video 
                src="video_preview.svg"
                poster=""
                width="500" 
                height="348" 
                autoplay="false" 
                controls="true" 
              />
            </div>
          </div>
        </div>
        
        <div className={styles.Video_Editor_Tutor} style={{backgroundColor: "rgba(255, 251, 240, 1)"}}>
          <div className={styles.Tutorials_R_grid2}>
          <div>
              <video 
                src="video_preview.svg"
                poster=""
                width="500" 
                height="348" 
                autoplay="false" 
                controls="true" 
              />
            </div>
            <div>
              <Tutorials 
                title="Pop-up Quiz Setting" 
                content="Teachers are able to insert pop-up quiz at specific
                times allowing students to absorb knowledge while
                evaluating the effectiveness of their learning."
                link={process.env.NEXT_PUBLIC_Pop_up_Quiz_Setting}
                button="Insert Pop-up Quiz In My Video"
              />
            </div>
          </div>
        </div>

        <div className={styles.Video_Editor_Tutor} style={{backgroundColor: "rgba(255, 255, 255, 1)"}}>
          <div className={styles.Tutorials_L_grid2}>
            <div>
              <Tutorials 
                title="Slide Template" 
                content="A variety of slide templates for teachers to design
                their teaching materials.
                Create your own teaching style and help students
                learn better."
                link={process.env.NEXT_PUBLIC_Slide_Template}
                button="Create My Slide"
              />
            </div>
            <div>
            <video 
              src="video_preview.svg"
              poster=""
              width="575" 
              height="401" 
              autoplay="false" 
              controls="true" 
            />
            </div>
          </div>
        </div>

        <div className={styles.Video_Editor_Tutor} style={{backgroundColor: "rgba(255, 251, 240, 1)"}}>
          <div className={styles.Tutorials_R_grid2}>
          <div>
              <video 
                src="video_preview.svg"
                poster=""
                width="500" 
                height="348" 
                autoplay="false" 
                controls="true" 
              />
            </div>
            <div>
              <Tutorials 
                title="Customized Video" 
                content="Creating a video by yourself takes time and effort.
                Let us help you with it!
                Just create an account and write down your needs,
                we will customize your videos for you."
                link={process.env.NEXT_PUBLIC_Customized_Video}
                button="Customize My Video"
              />
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
