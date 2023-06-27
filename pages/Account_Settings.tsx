import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import {useEffect, useState} from 'react';
import Archive_video from '../components/Archive_video'
import User_item from '../components/User_item'
import Cookies from 'js-cookie';


export default function Account_Settings() {
  const [token, setToken] = useState('null');

  useEffect(() => {
      setToken(Cookies.get('token'))

      if(token == null || token == "null")
      {
 //       window.location.replace("/"+ process.env.NEXT_PUBLIC_Log_in);
      }
    }, []) //傳遞一個空數組來保證只會被執行一次


  function Logout(){ 
    var information;
    var success;  //description: 成功登出
    var send_userName; //取得不含""的字串  
    
    console.log('userName::',Cookies.get('userName'));
    send_userName = Cookies.get('userName')?.substring(1,(Cookies.get('userName')?.length-1));    

    console.log('press Log_out');
  
//    localStorage.removeItem('token');   //移除
//    localStorage.removeItem('userName');   //移除
    
    console.log('token',Cookies.get('token'));
    console.log('userName',Cookies.get('userName'));
    console.log('send_userName',send_userName);
    
    const Log_out_send =
    {
      "username": send_userName,
    }
  
    var Log_out_send_json = JSON.stringify(Log_out_send);  //轉json格式
    console.log("account_send_json is " + Log_out_send_json);
  
    fetch(process.env.NEXT_PUBLIC_API_URL +　process.env.NEXT_PUBLIC_API_logout, {
      method: 'POST',
      headers:{
        'Authorization': 'Token ' + Cookies.get('token'),
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        information = response.json();
        console.log('info^^',information);
        return information;
      })
      .then((data) => {
//        success = data["message"];
        success = "Logout successful";

        console.log('data=',data);
        console.log('success=',data["detail"]);

        Cookies.set('token', 'null');

        alert(success);
        if(success == "Logout successful") //成功登出 Successfully logged out.
        {
          window.location.replace("/");
        }
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <>
      <main className={styles.main} style={{height: "92vh"}}>
        <div className={styles.Account_My_Creations}>
          My Creations
            <Link 
              href={{
                pathname: '/[page]',
                query: { page: process.env.NEXT_PUBLIC_Account_Drafts }
                }}
              className={styles.Account_Drafts}
            >
              Drafts
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
              Archive
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
              <div className={styles.block}>
               
                

              </div>

              <div className={styles.item_Subscription}>
                <User_item
                  image_name="Subscription_image.svg"
                  image_alt="Subscription image"
                  title="Subscription"
                />
                <div className={styles.item_arrow}>
                  <Image
                    src="/User_arrow.svg"
                    alt="enter image"
                    width={20}
                    height={20}
                    priority
                  />
                </div>
              </div>

              <div className={styles.item}>
                <User_item
                  image_name="user_management.svg"
                  image_alt="user management image"
                  title="User management"
                />
                <div className={styles.item_arrow}>
                  <Image
                    src="/User_arrow.svg"
                    alt="enter image"
                    width={20}
                    height={20}
                    priority
                  />
                </div>
              </div>
              <button className={styles.item} onClick={Logout}>
                <User_item
                  image_name="User_log_out.svg"
                  image_alt="log out image"
                  title="Log out"
                />
                <div className={styles.item_arrow}>
                  <Image
                    src="/User_arrow.svg"
                    alt="enter image"
                    width={20}
                    height={20}
                    priority
                  />
                </div>
              </button>
            </div>
            <div>

            </div>
          </div>
        </div>

      </main>
    </>
  )
}
