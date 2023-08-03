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

var Student_Answer="";
var Time=0;
var answer_times=0;

const token =  Cookies.get('token');


export default function Student_view_video() {
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState(0);
    const [Answer, setAnswer] = useState("");
    const videoRef = useRef(null);        //影片播放到的時間
    
    useLayoutEffect(() => {

        if((token == "null") || (token == null) || (token == "undefined"))
        {
          console.log("useEffect triggered");
//          router.push("/"+ process.env.NEXT_PUBLIC_Log_in);
        }

        if(videoRef.current){
            const handleTimeUpdate = () => {
                setCurrentTime(videoRef.current.currentTime);
            };

            videoRef.current.addEventListener('timeupdate', handleTimeUpdate);

            return () => {
                videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
      }, [videoRef.current])

        if(currentTime >= 1 && currentTime <= 2)
        {
            console.log("Time");
            document.getElementById("Multiple_choice_question").style = "display: flex";
            videoRef.current.pause();
        }

        function True_OR_False(event){
            const buttonText = event.target.textContent;
            if(answer_times == 1){
                return false;
            }
            document.getElementById(event.target.id).style = "color: rgba(255, 255, 255, 1); background-color: #38c18a;";
        
            console.log(buttonText);
        
            if(buttonText == Student_Answer)
            {
                console.log("Answer!!");
                setAnswer("Right Answer!");
            }
            else
            {
                console.log("X!!");
                setAnswer("Wrong Answer!");
            }
            answer_times = 1;

        }
        function Continuous(){      
            answer_times = 0;
            document.getElementById("Multiple_choice_question").style = "display: none";
            videoRef.current.play();
        }

    return (
        <>
           <main className={styles.main}>
 
                <div id="Multiple_choice_question" style={{height: "100%",display: "none"}}>
                    <div className={styles.question_background}>
                        <div className={styles.alert_question}>
                            <div className={styles.question_title}>
                                Multiple choice question
                            </div>
                            <div style={{display: "block", marginLeft: "5vw"}}>
                                <div className={styles.content_title}>
                                    Question
                                    {}
                                </div>
                                <div className={styles.content_title}>
                                    Choice
                                    <div>
                                        <button id="choice1" className={styles.choice_button} onClick={True_OR_False}>
                                            A
                                        </button>
                                        <button id="choice2" className={styles.choice_button} onClick={True_OR_False}>
                                            B
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.content_title}>
                                    {Answer}
                                </div>
                                <button className={styles.Continuous_button} style={{float: "right"}} onClick={Continuous}>
                                    Continuous
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.no_padding_center}>
                    <div className={styles.PopupQuiz_video_preview}>
                        <video 
                            ref={videoRef}
                            poster=""
                            autoPlay={false}
                            controls={true} 
                        >
                            <source src="TEST(1min30sec).mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <p>Current Time: {currentTime.toFixed(0)} seconds</p>
            </main>
        </>
    )
}
