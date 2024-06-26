import Image from 'next/image'
import Link from 'next/link'
import React, {useRef} from "react";
import Cookies from 'js-cookie'; 
import {useEffect, useState} from 'react';
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';
import Script from 'next/script';

var F_button=0;

function Feature_button(){
  if(F_button)
  {
    document.getElementById("Features").style = "color: white;";
    document.getElementById("Features_container").style = "display: none;";

    F_button=0;
  }
  else
  {
    document.getElementById("Features").style = "color: black; text-decoration: underline;";
    document.getElementById("Features_container").style = "display: block;";
    F_button=1;
  }
}

function link_click(){
  F_button=0;
  document.getElementById("Features").style = "color: white;";
  document.getElementById("Features_container").style = "display: none;";
}

function go_to_acount(){
//    console.log("useRouter= ", router.route);
    window.location.assign("/" + process.env.NEXT_PUBLIC_Account_Drafts);
}

function go_to_LogIn(){
//    console.log("useRouter= ", router.route);
    window.location.assign("/" + process.env.NEXT_PUBLIC_Log_in);
}

export const Header = () => {
    const router = useRouter();
    const [token, setToken] = useState('null');
    const [User, setUser] = useState('null');



    useEffect(() => {
        console.log("Header Trigger");
        setToken(Cookies.get('token'));                   //" "中間字串
        setUser(Cookies.get('userName')); 
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

                <ul className={styles.Layerout} > 
                    <div className={styles.Feature_Button_block} style={{ float: "right"}}>
                        <li className={styles.Li_Feature}>
                            <button id='Features' className={styles.Features_button} onClick={Feature_button}> {/**/}
                                Features
                            </button>

                            <ul id='Features_container'>
                                <li>
                                    <Link
                                        href={{
                                            pathname: '/[page]',
                                            query: { page: process.env.NEXT_PUBLIC_Video_Editor }
                                            }}
                                        onClick={link_click}
                                    >
                                        Video Editor
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={{
                                            pathname: '/[page]',
                                            query: { page: process.env.NEXT_PUBLIC_TextToSpeech_Audio }
                                            }}
                                        onClick={link_click}
                                    >
                                        Text-to-Speech Audio
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={{
                                            pathname: '/[page]',
                                            query: { page: process.env.NEXT_PUBLIC_Pop_up_Quiz_Setting }
                                            }}
                                        onClick={link_click}
                                    >
                                        Pop-up Quiz Setting
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={{
                                            pathname: '/[page]',
                                            query: { page: process.env.NEXT_PUBLIC_Customized_Video }
                                            }}
                                        onClick={link_click}
                                    >
                                        Customized Video
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                        <Link
                            href={{
                                pathname: '/[page]',
                                query: { page: process.env.NEXT_PUBLIC_Tutorials }
                                }}
                            className={styles.layerbutton}
                            onClick={link_click}
                        >
                            Tutorials
                        </Link>
                        </li>

                        <li>
                            <Link
                                href={{
                                    pathname: '/[page]',
                                    query: { page: process.env.NEXT_PUBLIC_Pricing }
                                    }}
                                className={styles.layerbutton}
                                onClick={link_click}
                            >
                                Pricing
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={{
                                    pathname: '/[page]',
                                    query: { page: process.env.NEXT_PUBLIC_Contact_us }
                                    }}
                                className={styles.layerbutton}
                                onClick={link_click}
                            >
                                Contact us
                            </Link>
                        </li>

                        <li>
                            <button className={styles.login_button} onClick={go_to_LogIn}>
                                <div>
                                    Log in
                                </div>
                                <div style={{fontSize: "0.8em", lineHeight: "1.4em"}}>
                                    Create an Account
                                </div>
                            </button>
                        </li>
                    </div>
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
                    <div className={styles.Feature_Button_block} style={{ float: "right"}}>
                        <li className={styles.Li_Feature}>
                        
                            <button id='Features' className={styles.Features_button} onClick={Feature_button}> 
                                Features
                            </button>

                            <ul id='Features_container'>
                                <li>
                                    <Link
                                        href={{
                                            pathname: '/[page]',
                                            query: { page: process.env.NEXT_PUBLIC_Video_Editor }
                                            }}
                                        onClick={link_click}
                                    >
                                        Video Editor
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={{
                                            pathname: '/[page]',
                                            query: { page: process.env.NEXT_PUBLIC_TextToSpeech_Audio }
                                            }}
                                        onClick={link_click}
                                    >
                                        Text-to-Speech Audio
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={{
                                            pathname: '/[page]',
                                            query: { page: process.env.NEXT_PUBLIC_Pop_up_Quiz_Setting }
                                            }}
                                        onClick={link_click}
                                    >
                                        Pop-up Quiz Setting
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={{
                                            pathname: '/[page]',
                                            query: { page: process.env.NEXT_PUBLIC_Slide_Template }
                                            }}
                                        onClick={link_click}
                                    >
                                        Slide Template
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={{
                                            pathname: '/[page]',
                                            query: { page: process.env.NEXT_PUBLIC_Customized_Video }
                                            }}
                                        onClick={link_click}
                                    >
                                        Customized Video
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                        <Link
                            href={{
                                pathname: '/[page]',
                                query: { page: process.env.NEXT_PUBLIC_Tutorials }
                                }}
                            className={styles.layerbutton}
                            onClick={link_click}
                        >
                            Tutorials
                        </Link>
                        </li>

                        <li>
                            <Link
                                href={{
                                    pathname: '/[page]',
                                    query: { page: process.env.NEXT_PUBLIC_Pricing }
                                    }}
                                className={styles.layerbutton}
                                onClick={link_click}
                            >
                                Pricing
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={{
                                    pathname: '/[page]',
                                    query: { page: process.env.NEXT_PUBLIC_Contact_us }
                                    }}
                                className={styles.layerbutton}
                                onClick={link_click}
                            >
                                Contact us
                            </Link>
                        </li>

                        <li>
                            <button className={styles.user_button} onClick={go_to_acount}>
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
                        </li>
                    </div>
                </ul>
            </header>
        )
        
    }


}
