import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import React, {useLayoutEffect, useRef, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; 
import Script from 'next/script';
import PopUpWindow from '../components/Pop_up_window';

var answer_times=0;      //用來防止學生選擇兩次答案
var Question_control=-1;  //用來防止同一時間的題目出現兩次，紀錄題目第一次出現的時間
var API=0;   //確保只取得一次有題目的時間點
var Question_time = []; //打後端API後，儲存question要出現的時間

var i;

const token = Cookies.get('token');
const videoPath = Cookies.get('video_path');
var sec=0;   //0~data長度，用來決定該出現第幾個問題

function Back_to_videos()
{
    window.location.assign(process.env.NEXT_PUBLIC_Student_videos);
}

console.log("videoPath=", videoPath);

export default function Student_view_video() {
    var information;
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState(0);  //用於顯示目前影片播放到的秒數
    const [isQuestionVisible, setIsQuestionVisible] = useState(false);  //用於決定是否顯示題目視窗
    const [Answer, ShowAnswer] = useState("");    //用於顯示回答正確或錯誤
    const [RightAnswer, setRightAnswer] = useState("");  //顯示正確答案
    const videoRef = useRef(null);        //用於取得影片相關資訊
    const [Question, setQuestion] = useState(0);  //儲存影片題目

    const [Options1, setOptions1] = useState("");  //儲存影片選項1
    const [Options2, setOptions2] = useState("");  //儲存影片選項2
    const [Options3, setOptions3] = useState("");  //儲存影片選項3
    const [Options4, setOptions4] = useState("");  //儲存影片選項4
    const [VideoPath, SetvideoPath] = useState("");

    useLayoutEffect(() => {
        const storedVideoPath = Cookies.get('video_path');

        if (storedVideoPath) 
        {
            // 如果从 Cookie 中成功获取到影片路径，将其设置到状态变量中
            SetvideoPath(storedVideoPath);
            console.log("成功！");
        }
    }, [VideoPath])        

    if(API == 0)
    {   
        console.log("Cookies= ", videoPath);

        console.log("Get Question!!");
        API = 1;                 
        //取得要插入影片的時間點資訊                                                               
        fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_quiz_sec + videoPath, {  
            method: 'GET',
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

          videoRef.current.addEventListener('loadedmetadata', function() {
            const videoDuration = Math.floor(videoRef.current.duration);  // 取得影片總長度
            console.log('Video duration:', videoDuration, 'seconds');
          });
        }
    }, []); // 仅在组件挂载和 videoRef.current 改变时添加监听器

    useEffect(() => {

        const intervalId = setInterval(() => {
            if(videoRef.current && !videoRef.current.paused)
            {
                console.log("Timer");
                console.log(Math.floor(videoRef.current.currentTime));
                console.log("Question_time[sec]=",Question_time[sec]);
    
                sec = 0;

                console.log("Question_time length=",Question_time.length);
                
                while(sec < Question_time.length)  //檢查是否為該彈出題目的時間點
                {
                    console.log("sec=",sec);
                    console.log("Question_control= ",Question_control);
                    if(Question_control != Math.floor(videoRef.current.currentTime)) //可以彈出題目
                    {
                        switch(Math.floor(videoRef.current.currentTime))  //判斷現在時間是否為要彈出題目的時間點
                        {
                            case Question_time[sec]:
                                Question_control = Math.floor(videoRef.current.currentTime);  //紀錄跳出題目的時間
                                setIsQuestionVisible(true);
                                console.log(isQuestionVisible);
                                videoRef.current.pause();

                                //取得此時間點的題目資訊                                                             
                                fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_quiz + videoPath + "/" + Question_time[sec], {  
                                    method: 'GET',
                                })
                                    .then((response) => {
                                        information = response.json();
                                        console.log('info^^',information);
                                        return information;
                                    })
                                    .then((data) => {
                                        console.log("data=",data);
                                        console.log("data[question]=",data["question"]);
                                        console.log("data[options]=",data["options"][0]);
                                        console.log("data[answer]=",data["answer"]);
                                        console.log("data[explanation]",data["explanation"]);
                                        console.log("data[video]",data["video"]);
                                        
                                        setQuestion(data["question"]);
                                        setOptions1(data["options"][0]);
                                        setOptions2(data["options"][1]);
                                        setOptions3(data["options"][2]);
                                        setOptions4(data["options"][3]);

                                        console.log("options1=",Options1);
                                        console.log("options2=",Options2);
                                        console.log("options3=",Options3);
                                        console.log("options4=",Options4);
                                        setRightAnswer(data["answer"]);

                                        console.log("Question=", Question);
                                        console.log("Options(4)=", Options1);
                                        console.log("Answer=", RightAnswer);
                                    })
                                    .catch((error) => console.log("error", error));
                                sec = Question_time.length;                                    
                            break;
                            default:
                                Question_control = -1;
                                sec++;   //看現在是否為下一個題目的時間點
                            break;
                        }
                    }
                    else
                    {
                        sec = Question_time.length;  
                    }
                }
            }
        }, 1000/videoRef.current.playbackRate);   //videoRef.current.playbackRate 影片播放速度

        return () => {
            clearInterval(intervalId); // 在组件卸载时清除定时器
        };

    },[]);


        function True_OR_False(event){
            const buttonText = event.target.textContent;   //取得學生選擇的答案
            if(answer_times == 1)   //若學生已經回答過，不反應
            {
                return false;
            }
            document.getElementById(event.target.id).style = "color: rgba(255, 255, 255, 1); background-color: #38c18a;";
        
            console.log(buttonText);
        
            if(buttonText == RightAnswer)
            {
                console.log("Answer!!");
                ShowAnswer("Right Answer!");
            }
            else
            {
                console.log("X!!");
                ShowAnswer("Wrong Answer!");
            //    document.getElementById('button_block').style = "float: none; align-items: center;";
                document.getElementById('Continuous').style = "margin-right: 1em";
                document.getElementById('back_to_video').style = "display: inline-block";
                document.getElementById('Show_Right_Answer').style = "display: inline-block";
            }
            answer_times = 1;    //將學生回答過次數改為1
        }

        function Show_Answer()
        {
            document.getElementById('True_answer_block').style = "display: inline-block";
            document.getElementById('button_block').style = "margin-top: -1em";
        }

        function Review_video()
        {
            Question_control = -1;
            console.log("Question_time=", Question_time);
            console.log("Math.ceil(videoRef.current.currentTime=", Math.floor(videoRef.current.currentTime));
            console.log("Question_time.indexOf=", Question_time.indexOf(Math.floor(videoRef.current.currentTime)));

            if(Question_time.indexOf(Math.floor(videoRef.current.currentTime)) == 0)
            {
                console.log("第一個題目");
                videoRef.current.currentTime = 0;
                answer_times = 0;   
                ShowAnswer("");   //清空使用者回答後的回覆
                setQuestion("");
                setOptions1("");
                setOptions2("");
                setOptions3("");
                setOptions4("");
    
                setIsQuestionVisible(false);
                document.getElementById("choice1").style = "color: rgba(0, 0, 0, 1); background-color: #ffffff;";
                document.getElementById("choice2").style = "color: rgba(0, 0, 0, 1); background-color: #ffffff;";
                document.getElementById("choice3").style = "color: rgba(0, 0, 0, 1); background-color: #ffffff;";
                document.getElementById("choice4").style = "color: rgba(0, 0, 0, 1); background-color: #ffffff;";
            }
            else
            {
                let Quiz_index = Question_time.indexOf(Math.floor(videoRef.current.currentTime))
                videoRef.current.currentTime =Question_time[Quiz_index-1] + 1;
                console.log("Question_time[Quiz_index-1]=", Question_time[Quiz_index-1]);
            
                answer_times = 0;   
                ShowAnswer("");   //清空使用者回答後的回覆
                setQuestion("");
                setOptions1("");
                setOptions2("");
                setOptions3("");
                setOptions4("");
    
                setIsQuestionVisible(false);
                document.getElementById("choice1").style = "color: rgba(0, 0, 0, 1); background-color: #ffffff;";
                document.getElementById("choice2").style = "color: rgba(0, 0, 0, 1); background-color: #ffffff;";
                document.getElementById("choice3").style = "color: rgba(0, 0, 0, 1); background-color: #ffffff;";
                document.getElementById("choice4").style = "color: rgba(0, 0, 0, 1); background-color: #ffffff;";
            }
        }

        const Continuous = () =>    //繼續觀看影片
        {
            answer_times = 0;   
            ShowAnswer("");   //清空使用者回答後的回覆
            setQuestion("");
            setOptions1("");
            setOptions2("");
            setOptions3("");
            setOptions4("");

            setIsQuestionVisible(false);
            document.getElementById("choice1").style = "color: rgba(0, 0, 0, 1); background-color: #ffffff;";
            document.getElementById("choice2").style = "color: rgba(0, 0, 0, 1); background-color: #ffffff;";
            document.getElementById("choice3").style = "color: rgba(0, 0, 0, 1); background-color: #ffffff;";
            document.getElementById("choice4").style = "color: rgba(0, 0, 0, 1); background-color: #ffffff;";
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
                                     {Question}
                                    </div>
                                    <div className={styles.content_title}>
                                        Choice
                                        <div>
                                            <button id="choice1" className={styles.choice_button} onClick={True_OR_False}>
                                                {Options1}
                                            </button>
                                            <button id="choice2" className={styles.choice_button} onClick={True_OR_False}>
                                                {Options2}
                                            </button>
                                            <button id="choice3" className={styles.choice_button} onClick={True_OR_False}>
                                                {Options3}
                                            </button>
                                            <button id="choice4" className={styles.choice_button} onClick={True_OR_False}>
                                                {Options4}
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.content_title}>
                                        {Answer}
                                    </div>
                                    <div id='True_answer_block' style={{display: "none",marginTop: "-1em"}} className={styles.content_title}>
                                        The answer is {RightAnswer}
                                    </div>
                                    <div id='button_block' className={styles.button_block}>
                                        <button id='back_to_video' style={{display: "none"}} className={styles.Review_video_button} onClick={Review_video}>
                                            Review video
                                        </button>
                                        <button id='Show_Right_Answer' style={{display: "none"}} className={styles.Review_video_button} onClick={Show_Answer}>
                                            Show Answer
                                        </button>
                                        <button id='Continuous' className={styles.Continuous_button} onClick={Continuous}>
                                            Continuous
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

                <div className={styles.no_padding_center}>
                    <div style={{marginTop: "2em"}}>
                        <video 
                            ref={videoRef}
                            poster=""
                            autoPlay={false}
                            controls={true} 
                            className={styles.video}
                        >
                            {VideoPath&&
                                <>
                                    <source src={`/api/video?videoPath=${encodeURIComponent(videoPath)}`} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </>
                            }
                        </video>
                    </div>
                </div>
                <button className={styles.Back_to_videos_page} onClick={Back_to_videos}>
                    back to videos            
                </button>
            </main>
        </>
    )
}
