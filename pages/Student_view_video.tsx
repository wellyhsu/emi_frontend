import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import React, {useLayoutEffect, useRef, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; 
import Script from 'next/script';
import PopUpWindow from '../components/Pop_up_window';

var fileData;
var fileName;
var fileType;
var fileSize;
var fileTime;

var Right_Answer="7";   //正確答案
var answer_times=0;      //用來防止學生選擇兩次答案
var Question_control=0;  //用來記錄此題目是否出現過
var API=0;
var Question_time = [];
var i;
const token =  Cookies.get('token');
var sec=0;   //0~data長度，用來決定該出現第幾個問題

export default function Student_view_video() {
    var information;
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState(0);  //用於顯示目前影片播放到的秒數
    const [isQuestionVisible, setIsQuestionVisible] = useState(false);
    const [Answer, setAnswer] = useState("");    //用於顯示回答正確或錯誤
    const videoRef = useRef(null);        //用於取得影片相關資訊

    
    if(API == 0)
    {
        API = 1;
        fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_quiz_sec, {  //取得要插入影片的時間點資訊
            method: 'GET',
            headers:{
                'video-path': '/video/test/test',
            },
        })
            .then((response) => {
                console.log('response=',response);
                information = response.json();
                console.log('info^^',information);
                return information;
            })
            .then((data) => {
                console.log("data=",data);
                console.log("data.length=",data.length);
                for(i=0; i<data.length; i++)
                {
                    Question_time.push(data[i]);
                    console.log('Question_time=',Question_time[i]);
                    console.log('Question_time type=',typeof(Question_time[i])); //parseInt() 字串轉數字
                }
                    
            })
            .catch((error) => console.log("error", error));
    }
    

    useLayoutEffect(() => {

        if((token == "null") || (token == null) || (token == "undefined"))
        {
          console.log("useEffect triggered");
//          router.push("/"+ process.env.NEXT_PUBLIC_Log_in);
        }
        
    }, [])

    useEffect(() => {
        if (videoRef.current) 
        {
          videoRef.current.addEventListener('timeupdate', () => {
            setCurrentTime(videoRef.current.currentTime); // 更新当前播放时间
          });
        }
    }, []); // 仅在组件挂载和 videoRef.current 改变时添加监听器

    useEffect(() => {

        const intervalId = setInterval(() => {
            if(videoRef.current)
            {
                console.log("Timer");
                console.log(Math.floor(videoRef.current.currentTime));
                console.log("Question_time[0]=",Question_time[0]);
                if(sec == Question_time.length - 1)
                {
                    sec=0;   //歸零
                }
                else if(Math.floor(videoRef.current.currentTime) > Question_time[sec])
                {
                    sec++;  //換顯示下一個問題
                }
                switch(Math.floor(videoRef.current.currentTime))
                {
                    case Question_time[sec]:
                        Question_control = 1;   //回答過了
                        setIsQuestionVisible(true);
                        console.log(isQuestionVisible);
                        videoRef.current.pause();
                    break;
                    default:
                        Question_control = 0;   //沒有回答過
                    break;
                }
            }
        }, 1000/videoRef.current.playbackRate);   //videoRef.current.playbackRate 影片播放速度

        return () => {
            clearInterval(intervalId); // 在组件卸载时清除定时器
        };

    },[]);


        function True_OR_False(event){
            const buttonText = event.target.textContent;   //取得學生選擇的答案
            if(answer_times == 1){   //若學生已經回答過，不反應
                return false;
            }
            document.getElementById(event.target.id).style = "color: rgba(255, 255, 255, 1); background-color: #38c18a;";
        
            console.log(buttonText);
        
            if(buttonText == Right_Answer)
            {
                console.log("Answer!!");
                setAnswer("Right Answer!");
            }
            else
            {
                console.log("X!!");
                setAnswer("Wrong Answer!");
            }
            answer_times = 1;    //將學生回答過次數改為1
        }

        const Continuous = () => {   //繼續觀看影片
            answer_times = 0;   
            setAnswer("");  
            setIsQuestionVisible(false);
            document.getElementById("choice1").style = "color: rgba(0, 0, 0, 1); background-color: #ffffff;";
            document.getElementById("choice2").style = "color: rgba(0, 0, 0, 1); background-color: #ffffff;";
            videoRef.current.play();
        };

    return (
        <>
           <main className={styles.main}>
              {isQuestionVisible && (
                <div>
                    <div id="Multiple_choice_question" style={{ display: "flex", height: "100%" }}>
                        <div className={styles.question_background}>
                            <div className={styles.alert_question}>
                                <div className={styles.question_title}>
                                    Multiple choice question
                                </div>
                                <div style={{display: "block", marginLeft: "5vw"}}>
                                    <div className={styles.content_title}>
                                        Question
                                    </div>
                                    <div className={styles.content_title} style={{paddingLeft: "1.5vw"}}>
                                        2+5=?
                                    </div>
                                    <div className={styles.content_title}>
                                        Choice
                                        <div>
                                            <button id="choice1" className={styles.choice_button} onClick={True_OR_False}>
                                                7
                                            </button>
                                            <button id="choice2" className={styles.choice_button} onClick={True_OR_False}>
                                                5
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
                </div>
            )}
{/*
                <div id="Gap_fill_question" style={{height: "100%",display: "none"}}>
                    <div className={styles.question_background}>
                        <div className={styles.alert_question}>
                            <div className={styles.question_title}>
                                Gap fill question
                            </div>
                            <div style={{display: "block", marginLeft: "5vw"}}>
                                <div className={styles.content_title}>
                                    Question
                                    {}
                                </div>
                                <div className={styles.content_title}>
                                    Answer
                                    <textarea className={styles.gap_fill_student_answer}>

                                    </textarea>
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
*/}
                <div className={styles.no_padding_center}>
                    <div className={styles.PopupQuiz_video_preview}>
                        <video 
                            ref={videoRef}
                            poster=""
                            autoPlay={false}
                            controls={true} 
                        >
                            <source src="/api/video" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <p>Current Time: {currentTime.toFixed(2)} seconds</p>
            </main>
        </>
    )
}
