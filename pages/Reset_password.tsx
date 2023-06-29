import Image from 'next/image'
import Link from 'next/link'
import React, {useRef} from "react";
import styles from '@/styles/Home.module.css'

export default function Reset_password() {
  const Reset_passwordRef = useRef(undefined);
  const token_Ref = useRef(undefined);
  // 為了方便操作，建立一個array來管理這些ref
  const refArr = useRef([Reset_passwordRef, token_Ref]);

  function Reset_password() {    //登入按鈕
    var information;
    var detail;  //密碼重設狀態

	  console.log('press Log_in')
    console.log(Reset_passwordRef.current.name +" is "+ Reset_passwordRef.current.value);
    console.log(token_Ref.current.name +" is "+ token_Ref.current.value);

    const Reset_password_send =
    {
      "token": token_Ref.current.value,
      "password": Reset_passwordRef.current.value,
      
    }

    var Reset_password_send_json = JSON.stringify(Reset_password_send);  //轉json格式
    console.log("Reset_password_send_json is " + Reset_password_send_json);
    console.log('Reset_password_send_json is ',typeof(Reset_password_send_json));

    fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_reset_password, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: Reset_password_send_json,
    })
      .then((response) => {
        information = response.json();
        console.log('info^^',information);
        return information;
      })
      .then((data) => {
        detail = data["detail"];
        console.log('detail=',data["detail"]);

        alert(data["detail"]);
        if(data["detail"] == "Password reset successful")
        {
          window.location.replace("/" + pcocess.env.NEXT_PUBLIC_Log_in);
        }
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
                Please enter your password and the token to reset your password.
            </div> 
            <input 
              type="text" 
              placeholder="Reset your password" 
              name="Reset_password"
              ref={Reset_passwordRef}
              className={styles.Forgot_Email}
            >
            </input>
              <input 
              type="text" 
              placeholder="token" 
              name="token"
              ref={token_Ref}
              className={styles.Forgot_Email}
            >
            </input>

            <div className={styles.upload_file_button}>
              <Link 
                href={{
                    pathname: '/[page]',
                    query: { page: process.env.NEXT_PUBLIC_Forgot_password }
                    }}
              >
                <button className={styles.Reset_back_button}>
                    Back
                </button>
              </Link> 
              <button className={styles.Reset_Send_button} onClick={Reset_password}>
                  Reset password
              </button>
            </div>
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
