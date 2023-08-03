import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import {useLayoutEffect, useEffect, useState} from 'react';
import Cookies from 'js-cookie'; 
import { useRouter } from 'next/router';
import Script from 'next/script'
//import upload from '../components/choose_file'

var fileData;
var fileName;
var fileType;
var fileSize;
var fileTime;
const token =  Cookies.get('token');

export default function Preview_my_video() {
    const router = useRouter();

    useLayoutEffect(() => {

        if((token == "null") || (token == null) || (token == "undefined"))
        {
            console.log("useEffect triggered");
            router.push("/"+ process.env.NEXT_PUBLIC_Log_in);
        }
    }, [])

    return (
        <>
           <main className={styles.main}>
                <div className={styles.pop_Start_making}>
                    Preview my video
                </div>
                <div className={styles.no_padding_center}>
                    <video 
                        src="video_preview.svg"
                        poster=""
                        width="500" 
                        height="348" 
                        autoplay="false" 
                        controls="true" 
                    />
                </div>   
                <div className={styles.upload_file_button}>
                    <Link 
                        href={{
                            pathname: '/[page]',
                            query: { page: process.env.NEXT_PUBLIC_PopUpQuiz_upload_video }
                            }}
                    >
                        <button className={styles.Reselect_video}>
                            Reselect a video
                        </button>
                    </Link>
                    <Link 
                        href={{
                            pathname: '/[page]',
                            query: { page: process.env.NEXT_PUBLIC_up_Quiz_Editing_my_video }
                            }}
                    >
                        <button className={styles.Start_editing}>
                            Start editing
                        </button>
                    </Link>
                </div> 
                

            </main>
            
        </>
    )
}
