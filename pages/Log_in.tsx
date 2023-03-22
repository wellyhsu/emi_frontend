import Image from 'next/image'
import Link from 'next/link'
import React, {useRef} from "react";
import styles from '@/styles/Home.module.css'
import { signIn, signOut, useSession } from "next-auth/client";


export default function Home() {
  const accountRef = useRef(undefined);
  const passwordRef = useRef(undefined);
  // 為了方便操作，建立一個array來管理這些ref
  const refArr = useRef([accountRef,passwordRef]);



  function Log_in() {    //登入按鈕
    const [session, loading] = useSession();
    
    var information;
    var S_DATA;
	  console.log('press Log_in')
    console.log(accountRef.current.name +" is "+ accountRef.current.value);
    console.log(passwordRef.current.name +" is "+ passwordRef.current.value);

    const account_send =
    {
      "email": accountRef.current.value,
      "password": passwordRef.current.value,  //轉json格式
    }

    var account_send_json = JSON.stringify(account_send);  //轉json格式
    console.log("account_send_json is " + account_send_json);
    console.log('account_send_json is ',typeof(account_send_json));

    fetch("http://localhost:3000/api/Next_Page_Link/", {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: account_send_json,
    })
      .then((response) => {
        information = response.json();
        console.log('info^^',information);
        return information;
      })
      .then((data) => {
        S_DATA = data["token"]
        console.log('data',data["token"]);
        console.log('data Type',typeof(data));
//        document.getElementById('number').textContent = '預測結果為 : ' + S_DATA;	
      })
      .catch((error) => console.log("error", error));
  //	window.location.replace("./home.html");
  }

  return (
    <>
      <main className={styles.main}>

        <div className={styles.center}>
          <div style={{marginLeft: "0em"}}>
            <Image
              src="/Log_in_image.svg"
              alt="Log in image"
              width={742}
              height={383}
              priority
            />
          </div>
          
          <div>
            <input 
              type="text" 
              name='E-mail'
              placeholder="E-mail" 
              ref={accountRef}
              className={styles.Name}
            />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              ref={passwordRef}
              className={styles.password}
            />

            <Link href={process.env.NEXT_PUBLIC_Forgot_password} className={styles.ForgotPassword_link}>
              Forgot password
            </Link>
            <button 
              className={styles.rigister_button}
              onClick={Log_in}
            >
              Log in
            </button>
            <Link href={process.env.NEXT_PUBLIC_Create_Account} className={styles.CreateAccountLink}>
              Create an account
            </Link>
              
          </div>
        </div>
      </main>
    </>
  )
}
