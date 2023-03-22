import { useSession, signIn, signOut } from 'next-auth/react';import Image from 'next/image'
import Link from 'next/link'
import React, {useRef} from "react";
import styles from '@/styles/Home.module.css'

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

export const Header = () => {
    const { data: session, status } = useSession();
    if (session) {
        return (
            <>
                <ul className={styles.Layerout}>
                    <li style={{marginLeft: "1em", marginTop: "0.6em"}}>
                        <Link href={process.env.NEXT_PUBLIC_Home} onClick={link_click}>
                            <Image
                            src="/Logo.svg"
                            alt="E-learning Logo"
                            width={260}
                            height={60}
                            priority
                            />
                        </Link>
                    </li>
                    <li style={{marginLeft: "9.2%"}}>
                    
                        <button id='Features' className={styles.Features_button} onClick={Feature_button}> {/**/}
                            Features
                        </button>

                        <ul id='Features_container'>
                            <li>
                                <Link href={process.env.NEXT_PUBLIC_Video_Editor} onClick={link_click}>
                                    Video Editor
                                </Link>
                            </li>
                            <li>
                                <Link href={process.env.NEXT_PUBLIC_TextToSpeech_Audio} onClick={link_click}>
                                    Text-to-Speech Audio
                                </Link>
                            </li>
                            <li>
                                <Link href={process.env.NEXT_PUBLIC_Pop_up_Quiz_Setting} onClick={link_click}>
                                    Pop-up Quiz Setting
                                </Link>
                            </li>
                            <li>
                                <Link href={process.env.NEXT_PUBLIC_Slide_Template} onClick={link_click}>
                                    Slide Template
                                </Link>
                            </li>
                            <li>
                                <Link href={process.env.NEXT_PUBLIC_Customized_Video} onClick={link_click}>
                                    Customized Video
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                    <Link href={process.env.NEXT_PUBLIC_Tutorials} className={styles.layerbutton} onClick={link_click}>
                        Tutorials
                    </Link>
                    </li>

                    <li>
                        <Link href={process.env.NEXT_PUBLIC_Pricing} className={styles.layerbutton} onClick={link_click}>
                        Pricing
                        </Link>
                    </li>

                    <li>
                        <Link href={process.env.NEXT_PUBLIC_Contact_us} className={styles.layerbutton} onClick={link_click}>
                            Contact us
                        </Link>
                    </li>

                    <li>
                        <Link href={process.env.NEXT_PUBLIC_Log_in} onClick={link_click}>
                            <button className={styles.user_button}>
                                <div className={styles.user_image}>
                                    <Image
                                        src="/user.svg"
                                        alt="user image"
                                        width={60}
                                        height={60}
                                        priority
                                    />
                                </div>
                                <div className={styles.user_button_word}>
                                    User01
                                </div>
                            </button>
                        </Link>
                    </li>
                </ul>
            </>
        )
    }

    return(
        <>
            <ul className={styles.Layerout}>
                <li style={{marginLeft: "1em", marginTop: "0.6em"}}>
                    <Link href={process.env.NEXT_PUBLIC_Home} onClick={link_click}>
                        <Image
                        src="/Logo.svg"
                        alt="E-learning Logo"
                        width={260}
                        height={60}
                        priority
                        />
                    </Link>
                </li>
                <li style={{marginLeft: "9.2%"}}>
                
                    <button id='Features' className={styles.Features_button} onClick={Feature_button}> {/**/}
                        Features
                    </button>

                    <ul id='Features_container'>
                        <li>
                            <Link href={process.env.NEXT_PUBLIC_Video_Editor} onClick={link_click}>
                                Video Editor
                            </Link>
                        </li>
                        <li>
                            <Link href={process.env.NEXT_PUBLIC_TextToSpeech_Audio} onClick={link_click}>
                                Text-to-Speech Audio
                            </Link>
                        </li>
                        <li>
                            <Link href={process.env.NEXT_PUBLIC_Pop_up_Quiz_Setting} onClick={link_click}>
                                Pop-up Quiz Setting
                            </Link>
                        </li>
                        <li>
                            <Link href={process.env.NEXT_PUBLIC_Slide_Template} onClick={link_click}>
                                Slide Template
                            </Link>
                        </li>
                        <li>
                            <Link href={process.env.NEXT_PUBLIC_Customized_Video} onClick={link_click}>
                                Customized Video
                            </Link>
                        </li>
                    </ul>
                </li>

                <li>
                <Link href={process.env.NEXT_PUBLIC_Tutorials} className={styles.layerbutton} onClick={link_click}>
                    Tutorials
                </Link>
                </li>

                <li>
                    <Link href={process.env.NEXT_PUBLIC_Pricing} className={styles.layerbutton} onClick={link_click}>
                    Pricing
                    </Link>
                </li>

                <li>
                    <Link href={process.env.NEXT_PUBLIC_Contact_us} className={styles.layerbutton} onClick={link_click}>
                        Contact us
                    </Link>
                </li>

                <li>
                    <Link href={process.env.NEXT_PUBLIC_Log_in} onClick={link_click}>
                        <button className={styles.login_button}>
                            <div style={{fontSize: "20px"}}>
                                Log in
                            </div>
                            <div style={{fontSize: "16px", lineHeight: "1.4em"}}>
                                Create an Account
                            </div>
                        </button>
          
                    </Link>
                </li>
            </ul>
        </>
    )

}
