import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <main className={styles.main}>

        <div className={styles.center}>
          <div style={{paddingLeft: "5em", marginTop: "-15em", width: "800px"}}>
            <div className={styles.Reset_password}>
                Reset your password
            </div>
            <div className={styles.Reset_content}>
                Please enter your Email and we will send you a link to reset your password.
            </div>
            <input type="text" placeholder="E-mail" className={styles.Forgot_Email}></input>
            <button className={styles.Forgot_Send_button}>
                Send
            </button>
          </div>

          <div className={styles.Forgot_image}>
            <Image
            src="/Forget_password_image.svg"
            alt="Log in image"
            width={485}
            height={340}
            priority
            />
          </div>
          
        </div>

      </main>
    </>
  )
}
