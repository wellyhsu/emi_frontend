import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import {useLayoutEffect, useRef, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; 
import Script from 'next/script';
import pop_up_question from '../components/pop_up_question';
import PopUpWindow from '../components/Pop_up_window';

var fileData;
var fileName;
var fileType;
var fileSize;
var fileTime;

var ADD_button=0;
var Question_type="";
var Question="";
var Choice="";
var Answer="";
var Time=0;


const token =  Cookies.get('token');


export default function Student_view_video() {
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState(0);
    const videoRef = useRef(null);        //影片播放到的時間

    useLayoutEffect(() => {

        if((token == "null") || (token == null) || (token == "undefined"))
        {
          console.log("useEffect triggered");
//          router.push("/"+ process.env.NEXT_PUBLIC_Log_in);
        }
        const video = videoRef.current;

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
        };

        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
          video.removeEventListener('timeupdate', handleTimeUpdate);
        };
        
      }, [])

        if(currentTime >= 1 && currentTime <= 2)
        {
            console.log("Time");
        }

        const video = videoRef.current;
    
        const handleTimeUpdate = () => {
          setCurrentTime(video.currentTime);
        };



    return (
        <>
           <main className={styles.main}>
{/* 
                <div id="Multiple_choice_question" style={{height: "100%",display: "none"}}>
                    <div className={styles.question_background}>
                        <div className={styles.alert_question}>
                            <div className={styles.question_title}>
                                Multiple choice question
                            </div>
                            <div style={{display: "block", marginLeft: "5vw"}}>
                                <div className={styles.content_title}>
                                    Question
                                    <textarea ref={Multiple_choice_Question_Ref} id="Question_content" className={styles.content_input} placeholder="Please input Question">

                                    </textarea>
                                </div>
                                <div className={styles.content_title}>
                                    Choice
                                    <textarea ref={Multiple_choice_Choice_Ref} id="Choice_content" className={styles.content_input} placeholder="Please input Choice">
                                        
                                    </textarea>
                                </div>
                                <div className={styles.content_title}>
                                    Answer and explain
                                    <textarea ref={Multiple_choice_Answer_Ref} id="Answer_content" className={styles.content_input} placeholder="Please input Answer">
                                        
                                    </textarea>
                                </div>
                            </div>
                            <div style={{float: "right"}}>
                                <button className={styles.Cancel_button} onClick={Multiple_choice_ClearClose}>
                                    Cancel
                                </button>
                                <button className={styles.Continuous_button} onClick={Multiple_choice_close}>
                                    Continuous
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
*/}
                <div className={styles.no_padding_center}>
                    <div className={styles.PopupQuiz_video_preview}>
                        <video 
                            ref={videoRef}
                            poster=""
                            autoPlay={false}
                            controls={true} 
                        >
                            <source src="TEST.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <p>Current Time: {currentTime.toFixed(2)} seconds</p>
            </main>
        </>
    )
}
