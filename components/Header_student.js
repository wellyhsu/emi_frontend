import Image from 'next/image'
import Link from 'next/link'
import React, {useRef} from "react";
import Cookies from 'js-cookie'; 
import {useEffect, useState} from 'react';
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';
import Script from 'next/script';

var Logout=0;

function link_click(){
  F_button=0;
  document.getElementById("Features").style = "color: white;";
  document.getElementById("Features_container").style = "display: none;";
}
  
function go_to_acount(){
    //console.log("useRouter= ", router.route);
    if(Logout == 0)
    {
        Logout = 1;
        document.getElementById('student_log_out').style = "display: flex";
    }
    else
    {
        Logout = 0;
        document.getElementById('student_log_out').style = "display: none";
    }
    //window.location.assign("/" + process.env.NEXT_PUBLIC_Student_videos);
}

function Log_out()
{
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
    
    window.location.assign("/" + process.env.NEXT_PUBLIC_Log_in);
}

function go_to_LogIn(){
   // console.log("useRouter= ", router.route);
    window.location.assign("/" + process.env.NEXT_PUBLIC_Log_in);
}

export const Header_student = () => {
    const router = useRouter();
    const [token, setToken] = useState('null');
    const [User, setUser] = useState('null');

    useEffect(() => {
        console.log("Header Trigger");
        setToken(Cookies.get('token'));                   //" "中間字串
        setUser(Cookies.get('userName')?.substring(1, Cookies.get('userName').lastIndexOf(`"`))); 
    },[])

    console.log("~~token~~", Cookies.get('token'));
    console.log("~~User~~", Cookies.get('userName'));
    console.log("storedToken ->", token);

    if ((token == "null") || (token == null) || (token == "undefined")){    //未登入
        console.log("router.pathname=",router.pathname);
        console.log("還沒login!!");
        return(
            <header style={{position: "relative",zIndex: "4"}}>
                <li className={styles.Home_Logo}>
                    <Link
                        href="/"
                        onClick={link_click}
                    >
                        <Image
                            src="/Logo.svg"
                            alt="E-learning Logo"
                            fill={true}
                            priority
                        />
                    </Link>
                </li>

                <div className={styles.Student_Layerout}> 
                    <button className={styles.student_button} onClick={go_to_LogIn}>
                        <div>
                            Log in
                        </div>
                        <div style={{fontSize: "1.2vw", lineHeight: "1.4em"}}>
                            Create an Account
                        </div>
                    </button>
                </div>
            </header>
        )   
    }
    else {
        console.log("login!!");
        console.log("~~User~~", User);
        return (
            <header style={{position: "relative",zIndex: "4"}}>
                <li className={styles.Home_Logo}>
                    <Link 
                        href="/"
                        onClick={link_click}
                    >
                        <Image
                        src="/Logo.svg"
                        alt="E-learning Logo"
                        width={260}
                        height={60}
                        priority
                        />
                    </Link>
                </li>

                <div className={styles.Student_Layerout}>
                    <button className={styles.student_button} onClick={go_to_acount}>
                        <div className={styles.user_image}>
                            <Image
                                src="/user.svg"
                                alt="user image"
                                fill={true}
                                priority
                            />
                        </div>
                        <div id="UserName" className={styles.user_button_word}>
                            {User}
                        </div>                             
                    </button>
                    <button id='student_log_out' className={styles.student_log_out} onClick={Log_out}>
                        Log out
                    </button>
                </div>
            </header>
        )
        
    }


}
