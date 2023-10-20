import Image from 'next/image'
import Link from 'next/link'
import React, {useRef} from "react";
import Cookies from 'js-cookie'; 
import styles from '@/styles/Home.module.css'

export default function Home() {
  const nameRef = useRef(undefined);
  const passwordRef = useRef(undefined);
  // 為了方便操作，建立一個array來管理這些ref
  const refArr = useRef([nameRef,passwordRef]);


  function Log_in() {    //登入按鈕
    
    var information;
    var token_DATA;
    var status_code;
    var msg;
    var identity;
    var userName;

	  console.log('press Log_in')
    console.log(nameRef.current.name +" is "+ nameRef.current.value);
    console.log(passwordRef.current.name +" is "+ passwordRef.current.value);

    const account_send =
    {
      "username": nameRef.current.value,
      "password": passwordRef.current.value,  
    }

    var account_send_json = JSON.stringify(account_send);  //轉json格式
    console.log("account_send_json is " + account_send_json);
    console.log('account_send_json is ',typeof(account_send_json));
/*
    msg='Login successful';
    alert(msg);
//        document.getElementById('number').textContent = '預測結果為 : ' + S_DATA;	
    if(msg == "Login successful")
    {
      window.location.replace("/");
    }
*/  // http://34.81.60.252:30031/user/login/
console.log("URL=",process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_login);
 
fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_login, {
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
        token_DATA = data["token"];
        status_code = data["code"];
        msg = data["message"];
        identity = data["is_stuff"];

        token_DATA = JSON.stringify(token_DATA);
        userName = JSON.stringify(nameRef.current.value);
        
        Cookies.set('token', token_DATA);
        Cookies.set('userName', userName);
        
        console.log('token_DATA=', Cookies.get('token'));
        console.log('userName=', Cookies.get('userName'));
        console.log("data=", data);
        console.log('msg=',msg);
        alert(msg);
//        document.getElementById('number').textContent = '預測結果為 : ' + S_DATA;	
        if(msg == "Login successful")
        {
          if(identity == true)
          {
            window.location.replace("/");
          }
          else
          {
            window.location.replace("/" + process.env.NEXT_PUBLIC_Student_videos);
          }
        }
      })
      .catch((error) => console.log("error", error));
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
              name='Name'
              placeholder="Name" 
              ref={nameRef}
              className={styles.Name}
            />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              ref={passwordRef}
              className={styles.password}
            />

            <Link 
              href={{
                pathname: '/[page]',
                query: { page: process.env.NEXT_PUBLIC_Forgot_password }
                }}
              className={styles.ForgotPassword_link}
            >
              Forgot password
            </Link>
            <button 
              className={styles.rigister_button}
              onClick={Log_in}
            >
              Log in
            </button>
            <Link 
              href={{
                pathname: '/[page]',
                query: { page: process.env.NEXT_PUBLIC_Create_Account }
                }}
              className={styles.CreateAccountLink}
            >
              Create an account
            </Link>
              
          </div>
        </div>
      </main>
    </>
  )
}
