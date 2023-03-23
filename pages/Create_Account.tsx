import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

export default function Home() {
  console.log("TToken~", localStorage.getItem('token'));

  return (
    <>
      <main className={styles.main}>
        
        <div className={styles.center}>
          <div style={{marginLeft: "0em"}}>
            <Image
              src="/Create_Account_image.svg"
              alt="Create Account image"
              width={742}
              height={383}
              priority
            />
          </div>
          
          <div>
            <input type="text" placeholder="Name" className={styles.Name}></input>
            <input type="text" placeholder="E-mail" className={styles.Name}></input>
            <input type="password" placeholder="Password" className={styles.password}></input>
            <input type="password" placeholder="Comfirm password" className={styles.password}></input>

            <button className={styles.CreateAccount_button}>
              Create an account
            </button>
            <Link href={process.env.NEXT_PUBLIC_Log_in} className={styles.LoginLink}>
              Log in
            </Link>
              
          </div>
      
          
        </div>

      

      </main>
    </>
  )
}
