import Image from 'next/image'
import React, {useRef} from "react";
import styles from '@/styles/Home.module.css'

export default function Forgot_password() {
  const EmailRef = useRef(undefined);
  // 為了方便操作，建立一個array來管理這些ref
  const refArr = useRef([EmailRef]);

  function Request_Reset_password() {    //登入按鈕
    var information;
    var token_DATA; //存取權杖
    var user;  //使用者名稱

	  console.log('press Log_in')
    console.log(EmailRef.current.name +" is "+ EmailRef.current.value);

    const Request_Reset_password_send =
    {
      "email": EmailRef.current.value,
    }

    var Request_Reset_password_send_json = JSON.stringify(Request_Reset_password_send);  //轉json格式
    console.log("account_send_json is " + Request_Reset_password_send_json);
    console.log('account_send_json is ',typeof(Request_Reset_password_send_json));

    fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_forget_password_request, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: Request_Reset_password_send_json,
    })
      .then((response) => {
        information = response.json();
        console.log('info^^',information);
        return information;
      })
      .then((data) => {
        token_DATA = data["token"];
        user = data["user"];
   
        console.log('token_DATA=',data["token"]);
        console.log('user=',data["user"]);
        prompt("your token is" , data["token"]);  
              
        window.location.replace("/" + process.env.NEXT_PUBLIC_Reset_password);
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <>
      <main className={styles.main}>

        <div className={styles.center}>
          <div style={{paddingLeft: "5em", marginTop: "-15em", width: "800px"}}>
            <div className={styles.Reset_password}>
                Reset your password
            </div>
            <div className={styles.Reset_content}>
                Please enter your Email and we will send you a token to reset your password.
            </div>
            <input 
              type="text" 
              placeholder="E-mail" 
              name="E-mail"
              ref={EmailRef}
              className={styles.Forgot_Email}
            >
              </input>
            <button className={styles.Forgot_Send_button} onClick={Request_Reset_password}>
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
