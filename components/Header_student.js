import Image from 'next/image'
import Link from 'next/link'
import React, {useRef} from "react";
import Cookies from 'js-cookie'; 
import {useEffect, useState} from 'react';
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';
import Script from 'next/script';

var F_button=0;

function link_click(){
  F_button=0;
  document.getElementById("Features").style = "color: white;";
  document.getElementById("Features_container").style = "display: none;";
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

                <input type="checkbox" id="menu" style={{display: "none"}}></input>
                <label htmlFor="menu" className={styles.line}>
                    <div className={styles.menu}></div>    
                </label>

                <ul className={styles.Layerout}> 

                    <li>
                        <Link
                            href={{
                                pathname: '/[page]',
                                query: { page: process.env.NEXT_PUBLIC_Log_in }
                                }}
                            onClick={link_click}
                        >
                            <button className={styles.login_button}>
                                <div>
                                    Log in
                                </div>
                                <div style={{fontSize: "1.2vw", lineHeight: "1.4em"}}>
                                    Create an Account
                                </div>
                            </button>
            
                        </Link>
                    </li>
                </ul>

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

                <input type="checkbox" id="menu" style={{display: "none"}}></input>
                <label htmlFor="menu" className={styles.line}>
                    <div className={styles.menu}></div>    
                </label>

                <ul className={styles.Layerout}>
                    <li>
                        <Link 
                            href={{
                                pathname: '/[page]',
                                query: { page: process.env.NEXT_PUBLIC_Account_Drafts }
                                }}
                            onClick={link_click}
                        >
                            <button className={styles.user_button}>
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
                        </Link>
                    </li>
                </ul>
            </header>
        )
        
    }


}
