import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import {useEffect, useState} from 'react';

export default function Home() {
//  console.log("TToken~", localStorage.getItem('token'));
  const [Value, setValue] = useState("null");

  useEffect(() => {
    const L_token = JSON.stringify(localStorage.getItem('token'));
    console.log("L_token~", L_token);
    setValue(L_token);   //把storageValue設定為L_token
  }, []) //傳遞一個空數組來保證只會被執行一次

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
            <Link 
              href={{
              pathname: '/[page]',
              query: {page: process.env.NEXT_PUBLIC_Log_in}
              }}
              className={styles.LoginLink}
            >
              Log in
            </Link>
              
          </div>
      
          
        </div>

      

      </main>
    </>
  )
}
