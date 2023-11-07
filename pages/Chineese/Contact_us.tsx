import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

import Contact_us from '../components/Contact_us';

export default function Home() {
  
  return (
    <>
      <main className={styles.main}>
        <div className={styles.Contact_us_title}>
          Contact us
        </div>
        <div className={styles.Contact_us_grid}>
          <div className={styles.Contact_us_grid3}>
            <a
              href={process.env.NEXT_PUBLIC_Email_us}
              rel="noopener noreferrer"
            >
              <div className={styles.Contact_us_information}>
                <Contact_us 
                  image="/Contact_E-mail_image.svg"
                  image_alt="Contact E-mail image"
                  title="E-mail" 
                />
                <div className={styles.Contact_us_introduction_content}>
                  Please fill out the form to give < br/>
                  us some feedback.< br/>
                  We will reach out to you during < br/>
                  weekdays.< br/>
                </div>
              </div>
              </a>
            <div className={styles.Contact_us_information}>
              <Contact_us 
                image="/Contact_Customer_Service_image.svg"
                image_alt="Contact Customer Service image"
                title="Customer Service" 
              />
              <div className={styles.Contact_us_introduction_content}>
                Provide immediate service< br/>
                -Website usage< br/>
                -Acoount issues< br/>
                < br/>
                Avaliable time< br/>
                Mandarin: 06:00-24:00< br/>
                English: 09:00-22:00 (GMT+8)< br/>
              </div>
            </div>
            <div className={styles.Contact_us_information}>
              <Contact_us 
                image="/Contact_Hotline_image.svg"
                image_alt="Contact Hotline image"
                title="Hotline" 
              />
              <div className={styles.Contact_us_introduction_content}>
                02-0857988 < br/>
                Avaliable time: 08:00-22:00< br/>
                < br/>
                The phone call will be charged < br/>
                according to the local< br/>
                and mobile phone rates< br/>
              </div>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
