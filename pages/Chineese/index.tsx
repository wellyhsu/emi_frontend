import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

import Information from '../../components/information';

function try_it()
{
  window.location.assign("/" + process.env.NEXT_PUBLIC_VE_Create_step2);
}

export default function Home() {
  return (
    <div>
      <main className={styles.main}>

        <div className={styles.center}>
          <div className={styles.homepage_grid2}>
            <div>
              <div className={styles.introduction}>
                Hi! We're
              </div>
              <div className={styles.Elearning}>
                E-learning
              </div>
              <div className={styles.introduction_content}>
                E-learning provides various tools to help you prepare <br/>
                your lessons easily and diversely. <br/>
                Standard pronunciation and pop-up quiz <br/>
                will make your teaching materials professional and interactive.
              </div>
              <div>
                {/*<a href="#Bpart">*/}
                <button className={styles.View_more} onClick={try_it}>
                  Try it !
                </button>
                {/*</a>  */}
              </div>
            </div>

            <div className={styles.homepage_picture}>
              <Image
                src="/E-learning_image.svg"
                alt="E-learning Logo"
                fill={true}
                priority
              />
            </div>

          </div>
        </div>

        <div className={styles.Bpartword} > {/*id="Bpart"*/}
          <div className={styles.Bpartword_title}>
            Diverse tools provided
          </div>
          <div className={styles.fivefeatures_introduce}>
            E-learning, turns creativity into reality. Boost students' learning effectiveness.
          </div>
        </div>
        

        <div className={styles.grid}>
          <div className={styles.grid3}>
            <a
              href={process.env.NEXT_PUBLIC_Video_Editor}
              className={styles.card}
              rel="noopener noreferrer"
            >
              <div className={styles.Information}>
                <div className={styles.information_picture}>
                  <Image
                    src="/video-editing.svg"
                    alt="video-editing image"
                    fill={true}
                    priority
                  />
                </div>
                <Information 
                  title={'Video Editor'} 
                  content={"Make standard English pronunciation videos to help students familiarize with native speaker's pronunciation."} 
                />
              </div>
            </a>

            <a
              href={process.env.NEXT_PUBLIC_TextToSpeech_Audio}
              className={styles.card}
              rel="noopener noreferrer"
            >
              <div className={styles.Information}>
                <div className={styles.information_picture}>
                  <div className={styles.B_part_picture}>
                    <Image
                      src="/voice-message.svg"
                      alt="Text-to-Speech_Audio image"
                      fill={true}
                      priority
                    />
                  </div>
                </div>
                <Information 
                  title={'Text-to-Speech Audio'}
                  content={'Download the audio files to create multi-character teaching videos or listening comprehension questions.'} 
                />
              </div>
            </a>

            <a
              href={process.env.NEXT_PUBLIC_Pop_up_Quiz_Setting}
              className={styles.card}
              rel="noopener noreferrer"
            >
              <div className={styles.Information}>
                <div className={styles.information_picture}>
                  <Image
                    src="/desktop-computer.svg"
                    alt="Pop-up Quiz Setting image"
                    fill={true}
                    priority
                  />
                </div>
                <Information 
                  title={'Pop-up Quiz Setting'}
                  content={"Insert pop-up quiz in your teaching videos to assess student's understanding."} />
              </div>
            </a>
          </div>
        </div>

        <div className={styles.AboutUs}>
          <div className={styles.AboutUsTitle}>
            About us
          </div>
          <div className={styles.AboutUsContent}>
            Technology brings convenience to the society, shortens the distance between people. <br/>
            The gap that used to existed can be bridged by integrating technology in it. <br/>
            We aim at improving digital teaching materials, assisting users to simplify <br/>
            the process of lesson preparation and diversify the learning scenarios with 30+ languages and 100+ voices. <br/>
          </div>
          <div className={styles.Aboutus_picture}>
            <Image
                src="/About_us_image.svg"
                alt="About_us_image image"
                fill={true}
                priority
              />
          </div>
        </div>

        <div className={styles.Cpart}>
          <div className={styles.Cpart_word}>
            只要你有需要，我們就會關心 <br/>
            We care whenever you need us <br/>

            <Link 
              href={{
                pathname: '/[page]',
                query: { page: process.env.NEXT_PUBLIC_Pricing }
                }}
            >
              <button className={styles.Subscribe_button}>
                Subscribe
              </button>
            </Link>
            <Link
              href={{
                pathname: '/[page]',
                query: { page: process.env.NEXT_PUBLIC_Contact_us }
                }}
            >
              <button  className={styles.Contact_us_button}>
                Contact us
              </button>
            </Link>
          </div>
        </div>

      </main>
    </div>
  )
}
