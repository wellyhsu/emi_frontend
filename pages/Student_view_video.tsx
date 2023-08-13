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

var Right_Answer="7";   //正確答案
var answer_times=0;      //用來防止學生選擇兩次答案

const token =  Cookies.get('token');


export default function Student_view_video() {
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState(0);  //用於顯示目前影片播放到的秒數
    const [isQuestionVisible, setIsQuestionVisible] = useState(false);
    const [Answer, setAnswer] = useState("");    //用於顯示回答正確或錯誤
    const videoRef = useRef(null);        //用於取得影片相關資訊
    var Question_time = [];

/*
    fetch("process.env.NEXT_PUBLIC_API_upload_video", {  //取得要插入影片的時間點資訊
        method: 'GET',
        body: "",
    })
        .then((response) => {
            information = response.json();
            console.log('info^^',information);
            return information;
        })
        .then((data) => {
            var msg = data["message"];

            console.log('msg=',msg);
            console.log('data=',data);
            alert(msg);
    //        document.getElementById('number').textContent = '預測結果為 : ' + S_DATA;	
        })
        .catch((error) => console.log("error", error));
*/
    useLayoutEffect(() => {

        if((token == "null") || (token == null) || (token == "undefined"))
        {
          console.log("useEffect triggered");
//          router.push("/"+ process.env.NEXT_PUBLIC_Log_in);
        }
      
        const intervalId = setInterval(() => {  //用於在一定的時間間隔内重複执行指定的函數
            if(videoRef.current && !videoRef.current.paused)
            {  
                console.log("currentTime=",videoRef.current.currentTime); 

                if (videoRef.current.currentTime >= 1 && videoRef.current.currentTime <= 2)  //假設題目彈出的時間為1秒的時候
                {
                    setIsQuestionVisible(true);
                    console.log(isQuestionVisible);  //true or false
                    videoRef.current.pause();
                }
                
                return () => {
                    clearInterval(intervalId); // 清除定时器
                };
            }
            while(videoRef.current.paused)
            {
                console.log("wait");
            }
        }, 1000);


        return () => {
            clearInterval(intervalId); // 清除定时器
        };
    }, [])


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
                            <source src="TEST(1min30sec).mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <p>Current Time: {currentTime.toFixed(2)} seconds</p>
            </main>
        </>
    )
}
