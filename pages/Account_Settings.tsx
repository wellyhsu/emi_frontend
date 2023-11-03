import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { useLayoutEffect, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import Archive_video from '../components/Archive_video'
import User_item from '../components/User_item'


const token =  Cookies.get('token');


export default function Account_Settings() {
  const router = useRouter();

  function Logout(){ 
    var information;
    var success;  //description: 成功登出
    var send_Token; //取得不含""的字串  
    
    send_Token = Cookies.get('token')?.substring(1,(Cookies.get('token')?.length-1));    
    
    console.log('press Log_out');
    console.log('token',send_Token);

    fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_logout, {
      method: 'POST',
      headers:{
        'Authorization': 'Token ' + send_Token,
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        information = response.json();
        console.log('info^^',information);
        return information;
      })
      .then((data) => {
       success = data["message"];

        console.log('data=',data);
        console.log('success=',data["detail"]);


        alert(success);
        if(success == "Logout successful") //成功登出 Successfully logged out.
        {
          Cookies.set('token', "null");
          window.location.assign("/");
        }
      })
      .catch((error) => console.log("error", error));
  }

  useLayoutEffect(() => { // 使用 useLayoutEffect 替代 useEffect
    if((token == "null") || (token == null) || (token == "undefined"))
    {
    
      console.log("useEffect triggered");
      router.push("/"+ process.env.NEXT_PUBLIC_Log_in);

    }
  }, [])
  
    return (
      <>
        <main className={styles.main}>
          <div className={styles.Account_My_Creations}>
            My Creations
              <Link 
                href={{
                  pathname: '/[page]',
                  query: { page: process.env.NEXT_PUBLIC_Account_Drafts }
                  }}
                className={styles.Account_Drafts}
              >
                Add quiz
              </Link>
              <div className={styles.Account_dash}>
                |
              </div>
              <Link 
                href={{
                  pathname: '/[page]',
                  query: { page: process.env.NEXT_PUBLIC_Account_Archive }
                  }}
                className={styles.Account_Title_Gray}
              >
                View Archive videos
              </Link> 
              <div className={styles.Account_dash}>
                |
              </div>
              <Link 
                href={{
                  pathname: '/[page]',
                  query: { page: process.env.NEXT_PUBLIC_Account_Settings }
                  }}
                style={{color: "rgba(0, 0, 0, 1)"}} 
                className={styles.Account_Title_Gray}
              >
                Settings
              </Link> 
          </div>
          
          <div className={styles.Account_grid}>
            <div className={styles.Account_grid2}>
              <div>
                <div className={styles.item_Subscription}>
                  <User_item
                    image_name="Subscription_image.svg"
                    image_alt="Subscription image"
                    title="Subscription"
                  />
                </div>

                <div className={styles.item}>
                  <User_item
                    image_name="user_management.svg"
                    image_alt="user management image"
                    title="User management"
                  />
                </div>
                <button className={styles.item} onClick={Logout}>
                  <User_item
                    image_name="User_log_out.svg"
                    image_alt="log out image"
                    title="Log out"
                  />
                </button>
              </div>

            </div>
          </div>
        </main>
      </>
    )

}
