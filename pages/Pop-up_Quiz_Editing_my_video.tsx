import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import {useLayoutEffect, useRef, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; 
import Script from 'next/script';
import pop_up_question from '../components/pop_up_question';
import PopUpWindow from '../components/Pop_up_window';
//import VideoPlayer from '../components/VideoPlayer';

var ADD_button=0;  //用於點擊ADD按鈕後，展開及收起add欄位
var Question="";   //發送給後端的題目
var Choice=[];     //發送給後端的題目選項
var Answer="";     //發送給後端的答案
var Time="0";       //發送給後端的當前影片時間

var CircleNumber = 1;    //用於標記每個circle的ID
var marginLeftValue = 1;   //用於更改每個circle的位置
var selectVideo;
var playButton;
var inputItem;
//var skipButton;
var progressBarOut;
var progressBarIn;   
var conditionValue = 0.5;
var video_current_volume;
var image_Source="../istockphoto-sound.svg";
var image_sound_alt="sound"

var videoDuration;

const token =  Cookies.get('token');
const videoPath = "/home/roy/test/video/roy/uploads/test1.mp4";//Cookies.get('video_path');

/*
function gap_fill_question(){  
    document.getElementById("gap_fill_question").style = "display: flex";
}
*/
function Multiple_choice_question(){  
    document.getElementById("Multiple_choice_question").style = "display: flex";
    console.log("Multiple");
}
/*
function Scramble_task_question(){  
    document.getElementById("Scramble_task_question").style = "display: flex";
    Question_title = "Scramble task question";
}
*/

function Click_add()
{
    if(ADD_button)
    {
        console.log("none");
        document.getElementById("question_button").style = "display: none;";
        ADD_button = 0;
    }
    else
    {
        console.log("show");
        document.getElementById("question_button").style = "display: block;";
        ADD_button = 1;
    }    
}

function Delete_Question()
{
    /*
    fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_quiz + Time, {            
        method: 'Delete',
        headers:{
            'video-path': process.env.NEXT_PUBLIC_video_path,
            'Content-Type': 'application/json',
        },
        body: question_send_json,
    })
        .then((response) => {
            information = response.json();
            console.log('info^^',information);
            return information;
        })
        .then((data) => {
   
            console.log('data=', data);

        })
        .catch((error) => console.log("error", error));
*/
    document.getElementById("Multiple_choice_question_modify").style = "display: none";
}

export default function Pop_up_Quiz_Editing_my_video() {
    const router = useRouter();
    const circle=[];     //儲存要出現題目的圓球component
    var information;

    const Multiple_choice_Question_Ref = useRef(undefined);   //取得使用者輸入的Question欄位內容
    const Multiple_choice_Choice_Ref_1 = useRef(undefined);   //取得使用者輸入的第一個Choice欄位內容
    const Multiple_choice_Choice_Ref_2 = useRef(undefined);   //取得使用者輸入的第二個Choice欄位內容
    const Multiple_choice_Choice_Ref_3 = useRef(undefined);   //取得使用者輸入的第三個Choice欄位內容
    const Multiple_choice_Choice_Ref_4 = useRef(undefined);   //取得使用者輸入的第四個Choice欄位內容
    const Multiple_choice_Answer_Ref = useRef(undefined);     //取得使用者輸入的Answer欄位內容

    const Modify_Question_Ref = useRef(undefined);   //取得使用者修改後的Question欄位內容
    const Modify_Choice_Ref_1 = useRef(undefined);   //取得使用者修改後的第一個Choice欄位內容
    const Modify_Choice_Ref_2 = useRef(undefined);   //取得使用者修改後的第二個Choice欄位內容
    const Modify_Choice_Ref_3 = useRef(undefined);   //取得使用者修改後的第三個Choice欄位內容
    const Modify_Choice_Ref_4 = useRef(undefined);   //取得使用者修改後的第四個Choice欄位內容

    const Modify_Answer_Ref = useRef(undefined);  

    const [ShowCircle, setShowCircle] = useState([]);

    useLayoutEffect(() => {
        selectVideo = document.getElementById('video');
        playButton = document.getElementById('playbutton');
        inputItem = document.querySelectorAll('input');
//        skipButton = document.querySelectorAll('.player__button[data-skip]');
        progressBarOut = document.getElementById('progress');
        progressBarIn = document.getElementById('progress_fill');    
        document.getElementById('video_control').style = "width: selectVideo.videoWidth";

        console.log("selectVideo=", selectVideo);
        console.log("videoWidth=", selectVideo.videoWidth);
        console.log("playButton=", playButton);
        console.log("inputItem=", inputItem);
//        console.log("skipButton=", skipButton);
        console.log("progressBarOut=", progressBarOut);
        console.log("progressBarIn=", progressBarIn);

        //播放及暫停按鈕
        playButton.addEventListener('click', playToggle);
        selectVideo.addEventListener('click', playToggle);
       
        //調整音量  利用forEach()方法將選到的每個input元素加上監聽事件
        inputItem.forEach(function(item){
            item.addEventListener('input', changeCondition);
        });

        //將影片加上監聽事件以及觸發函示
        selectVideo.addEventListener('timeupdate', progressing);

        //監聽 當滑鼠被按下時，執行addDragProgress函式
        progressBarOut.addEventListener('mousedown', addDragProgress);
        //監聽 當滑鼠被放開時，執行removeDragProgress函式
        progressBarOut.addEventListener('mouseup', removeDragProgress);
        
}, [])

    //播放或暫停按鍵
    function playToggle() {
        //當影片狀態為暫停的時候
        if (selectVideo.paused) {
            //播放影片
            selectVideo.play();
            //將播放鈕圖示改為暫停鈕圖示                     
            playButton.innerHTML = '❚ ❚';
        //當影片是播放的時候                         
        } else {
            //暫停影片
            selectVideo.pause();
            //將暫停鈕圖示改為播放鈕圖示     
            playButton.innerHTML = '►';
        };
    };

    //調整音量
    function changeCondition (event) {
        //取得觸發事件的input元素
        let changeInput = event.target;
        //取得input元素的name屬性
        let conditionName = changeInput.name;
        //取得input元素的值   
        conditionValue = changeInput.value;
        //將影片屬性值改為input元素的值
        selectVideo[conditionName] = conditionValue; 
        if(conditionValue != 0)
            video_current_volume = conditionValue;
        else
            video_current_volume = 0.1;        
        //將畫面上的音量軸調到正確位置
        changeInput.value = conditionValue;
    };

    //影片播放時的時間軸
    function progressing() {
        //取得影片時間總長度
        videoDuration = selectVideo.duration;
        //取得影片目前時間長度
        let currentTime = selectVideo.currentTime;
        console.log("P_currentTime= ", currentTime);
        //換算成比例
        let currentPosition = (currentTime / videoDuration) * 100;
        console.log("currentPosition=",currentPosition);
        //將算出來的比例加到該元素的CSS屬性上
        progressBarIn.style.flexBasis = `${currentPosition}%`;
    };

    //處理影片進度條(滑鼠點擊或移動)
    function addDragProgress (e) {
        //當函示被執行時，新增監聽 mousedown以及mousemove事件
        progressBarOut.addEventListener('mousedown', dragProgressBar);
        progressBarOut.addEventListener('mousemove', dragProgressBar);
    };
    //處理影片進度條(滑鼠放開)
    function removeDragProgress () {
        //當函示被執行時，移除此次監聽mousemove事件
        progressBarOut.removeEventListener('mousemove', dragProgressBar);
    };
    
    function dragProgressBar (e) {
        //取得影片總長度
        videoDuration = selectVideo.duration;
        //取得按下按鍵時的滑鼠在該元素的X軸座標
        let mouseX = e.offsetX;
        console.log("mouseX=", mouseX);
        //取得時間軸背景元素總長度
        let progressBarWidth = progressBarOut.offsetWidth;
        console.log("progressBarWidth=", progressBarWidth);
        //換算成長度比例
        let videoProgress = mouseX / progressBarWidth;
        console.log("videoProgress=", videoProgress*100);
        
        //換算成影片時間  (計算出影片目前的時間)
        let newPosition = videoDuration * videoProgress;
        console.log("newPosition=", newPosition);
        
        //將計算出來的影片時間指定為目前播放時間
        selectVideo.currentTime = newPosition;
        console.log("selectVideo.currentTime=",selectVideo.currentTime);
    };

    function mute_control()
    {
        if(selectVideo[conditionName] != 0)
        {
            video_current_volume = selectVideo[conditionName];
            selectVideo[conditionName] = 0;
            image_Source="/istockphoto-mute.jpg";
        }
        else
        {
            selectVideo[conditionName] = video_current_volume;
            image_Source="/istockphoto-sound.svg";
        }
    }



    function Click_Circle()   //Modify Question -> 顯示題目
    {
        var information;
        console.log("GET!");
        document.getElementById("Multiple_choice_question_modify").style = "display: flex";
                                                                                        
        fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_quiz + videoPath + "/" + Time, {            
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
                console.log("data[options]=",data["options"]);
                console.log("data[answer]=",data["answer"]);
                console.log("data[explanation]",data["explanation"]);
                console.log("data[video]",data["video"]);
                
                document.getElementById("Modify_Question").value = data["question"];
                document.getElementById("Modify_Choice_1").value = data["options"][0];
                document.getElementById("Modify_Choice_2").value = data["options"][1];
                document.getElementById("Modify_Choice_3").value = data["options"][2];
                document.getElementById("Modify_Choice_4").value = data["options"][3];
                document.getElementById("Modify_Answer").value = data["answer"];

            })
            .catch((error) => console.log("error", error));
    }

    function Close_Question()  //Modify Question -> 關閉並且保存修改
    {   var information;

        Choice = [];
        Question = Modify_Question_Ref.current.value;
        Choice.push(Modify_Choice_Ref_1.current.value);
        Choice.push(Modify_Choice_Ref_2.current.value);
        Choice.push(Modify_Choice_Ref_3.current.value);
        Choice.push(Modify_Choice_Ref_4.current.value);
        Answer = Modify_Answer_Ref.current.value;
        
        const modify_question_send =
        {
            "question": Question,
            "options": Choice,  
            "answer": Answer,
            "explanation": "none",
            'video-path': '/home/roy/test/video/roy/uploads/',
        }
        
        var modify_question_send_json = JSON.stringify(modify_question_send);  //轉json格式
        console.log("send data=",modify_question_send_json);
                                                                                        
        fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_quiz + videoPath + "/" + Time, {            
            method: 'PUT',
            headers:{
                'video-path': process.env.NEXT_PUBLIC_video_path,
                'Content-Type': 'application/json',
            },
            body: modify_question_send_json,
        })
            .then((response) => {
                information = response.json();
                console.log('info^^',information);
                return information;
            })
            .then((data) => {
    
                console.log('data=', data);

            })
            .catch((error) => console.log("error", error));
        document.getElementById("Multiple_choice_question_modify").style = "display: none";

    }

    function Multiple_choice_close(){
        var information;

        var selectVideo = document.querySelector('video');
        console.log("video length= ",Math.floor(selectVideo.duration));  //影片總長度
        
        marginLeftValue = 13 + (selectVideo.currentTime * ((710.98)/Math.floor(selectVideo.duration)));
        marginLeftValue = parseInt(marginLeftValue.toFixed(2));
        console.log("marginLeftValue= ", marginLeftValue);  //circle需位移距離

        const circleElement = (
            <div
                key={"Circle" + String(CircleNumber)}
                id={"Circle" + String(CircleNumber)}
                className={styles.circle}
                style={{marginLeft: String(marginLeftValue)+"px"}}
                onClick={Click_Circle}
            >
                
            </div>
        );
                
        const send_circle = [...ShowCircle];    //用於建立副本，渲染畫面
        send_circle.push(circleElement);

        setShowCircle(send_circle);
        console.log("send_circle=",send_circle);
        console.log("CircleNumber=",CircleNumber);
        console.log('ShowCircle:', ShowCircle);

        CircleNumber++;

        document.getElementById("Multiple_choice_question").style = "display: none";

        Question = Multiple_choice_Question_Ref.current.value;   //使用者輸入的題目內容
        Choice.push(Multiple_choice_Choice_Ref_1.current.value);      //多選題的選項
        Choice.push(Multiple_choice_Choice_Ref_2.current.value);      //多選題的選項
        Choice.push(Multiple_choice_Choice_Ref_3.current.value);      //多選題的選項
        Choice.push(Multiple_choice_Choice_Ref_4.current.value);      //多選題的選項
        Answer = Multiple_choice_Answer_Ref.current.value;         //題目答案
        Time = String(Math.floor(selectVideo.currentTime));           //影片播放到的時間

        console.log("Question= ", Question);
        console.log("Choice= ", Choice);
        console.log("Answer= ", Answer);
        console.log("Time= ", Time);   //String

        const question_send =    //新增題目
        {
            "question": Question,
            "options": Choice,  
            "answer": Answer,
            "explanation": "none",
            'video-path': '/home/roy/test/video/test/uploads/',
        }
        
        var question_send_json = JSON.stringify(question_send);  //轉json格式           
        fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_quiz + videoPath + "/" + Time, {            
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: question_send_json,
        })
            .then((response) => {
                information = response.json();
                console.log('info^^',information);
                return information;
            })
            .then((data) => {
       
                console.log('data=', data);
                console.log("data['error']=", data['error']);
                if(data['error'] == "Quiz with same quiz_time already exists.")
                {
                    alert(data['error']);
                }

            })
            .catch((error) => console.log("error", error));


        Multiple_choice_Question_Ref.current.value = "";   //使用者輸入的題目內容
        Multiple_choice_Choice_Ref_1.current.value = "";      //多選題的選項
        Multiple_choice_Choice_Ref_2.current.value = "";      //多選題的選項
        Multiple_choice_Choice_Ref_3.current.value = "";      //多選題的選項
        Multiple_choice_Choice_Ref_4.current.value = "";      //多選題的選項
        Multiple_choice_Answer_Ref.current.value = "";         //題目答案
        Choice = [];
    }

    function Multiple_choice_ClearClose(){
        document.getElementById("Multiple_choice_question").style = "display: none";

        Multiple_choice_Question_Ref.current.value = "";   //使用者輸入的題目內容
        Multiple_choice_Choice_Ref_1.current.value = "";      //多選題的選項
        Multiple_choice_Choice_Ref_2.current.value = "";      //多選題的選項
        Multiple_choice_Choice_Ref_3.current.value = "";      //多選題的選項
        Multiple_choice_Choice_Ref_4.current.value = "";      //多選題的選項

        Multiple_choice_Answer_Ref.current.value = "";         //題目答案

        console.log("Question= ", Question);
        console.log("Choice= ", Choice);
        console.log("Answer= ", Answer);
    }

    useLayoutEffect(() => {

        if((token == "null") || (token == null) || (token == "undefined"))
        {
          console.log("useEffect triggered");
//          router.push("/"+ process.env.NEXT_PUBLIC_Log_in);
        }

      }, [])

    return (
        <>
            <main className={styles.main}>
                <div id="Multiple_choice_question_modify" className={styles.Modify_Question} style={{height: "100%",display: "none"}}>
                    <div className={styles.question_background}>
                        <div className={styles.alert_question}>
                            <div className={styles.question_title}>
                                Multiple choice question
                            </div>
                            <div style={{display: "block", marginLeft: "5vw"}}>
                                <div className={styles.content_title}>
                                    Question
                                    <textarea ref={Modify_Question_Ref} id="Modify_Question" className={styles.content_input} placeholder="Please input Question">

                                    </textarea>
                                </div>
                                <div className={styles.content_title}>
                                    Choice
                                    <textarea ref={Modify_Choice_Ref_1} id="Modify_Choice_1" style={{marginBottom: "2vh"}} className={styles.content_input} placeholder="Please input Choice">
                                        
                                    </textarea>
                                    <textarea ref={Modify_Choice_Ref_2} id="Modify_Choice_2" style={{marginBottom: "2vh"}} className={styles.content_input} placeholder="Please input Choice">
                                        
                                    </textarea>
                                    <textarea ref={Modify_Choice_Ref_3} id="Modify_Choice_3" style={{marginBottom: "2vh"}} className={styles.content_input} placeholder="Please input Choice">
                                        
                                    </textarea>
                                    <textarea ref={Modify_Choice_Ref_4} id="Modify_Choice_4" className={styles.content_input} placeholder="Please input Choice">
                                        
                                    </textarea>
                                </div>
                                <div className={styles.content_title}>
                                    Answer and explain
                                    <textarea ref={Modify_Answer_Ref} id="Modify_Answer" className={styles.content_input} placeholder="Please input Answer">
                                        
                                    </textarea>
                                </div>
                            </div>
                            <div style={{float: "right", marginBottom: "5vh"}}>
                                <button className={styles.Cancel_button} onClick={Delete_Question}>
                                    Delete
                                </button>
                                <button className={styles.Continuous_button} onClick={Close_Question}>
                                    Continuous
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

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
                                    <textarea ref={Multiple_choice_Choice_Ref_1} id="Choice_content_1" style={{marginBottom: "2vh"}} className={styles.content_input} placeholder="Please input Choice">
                                        
                                    </textarea>
                                    <textarea ref={Multiple_choice_Choice_Ref_2} id="Choice_content_2" style={{marginBottom: "2vh"}} className={styles.content_input} placeholder="Please input Choice">
                                        
                                    </textarea>
                                    <textarea ref={Multiple_choice_Choice_Ref_3} id="Choice_content_3" style={{marginBottom: "2vh"}} className={styles.content_input} placeholder="Please input Choice">
                                        
                                    </textarea>
                                    <textarea ref={Multiple_choice_Choice_Ref_4} id="Choice_content_4" className={styles.content_input} placeholder="Please input Choice">
                                        
                                    </textarea>
                                </div>
                                <div className={styles.content_title}>
                                    Answer and explain
                                    <textarea ref={Multiple_choice_Answer_Ref} id="Answer_content" className={styles.content_input} placeholder="Please input Answer">
                                        
                                    </textarea>
                                </div>
                            </div>
                            <div style={{float: "right", marginBottom: "5vh"}}>
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

                <div className={styles.no_padding_center}>
                    <div className={styles.PopupQuiz_video_preview}>
                        <div style={{ height: "100%",width: "100%"}}>
                            <video 
                                id='video'
                                poster=""
                                autoPlay={false}
                                controls={false} 
                                className={styles.video}
                            >
                                <source src={`/api/video?videoPath=${encodeURIComponent(videoPath)}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        
                            <div id="video_control" className={styles.video_control}>
                                <div id='progress' className={styles.video_control_progress}>
                                    <div id='progress_fill' className={styles.video_control_progress_fill}>

                                    </div>
                                </div>
                                <div style={{display: "flex", marginTop: "0.3em" }}>
                                    <button id="playbutton" className={styles.video_control_play_button}>
                                        ►
                                    </button>
                                    <button id="mute_Control" className={styles.video_control_mute_button} onClick={mute_control}>
                                        <Image
                                            src={image_Source}
                                            alt={image_sound_alt}
                                            fill={true}
                                            priority
                                        />
                                    </button>
                                    <input 
                                        id="input"
                                        type="range" 
                                        name="volume" 
                                        className={styles.video_control_volume_slide} 
                                        min="0" max="1" 
                                        step="0.05" 
                                        value={conditionValue}
                                    >
                                    </input>
                                </div>
                            </div>
                            {ShowCircle}
                        </div>
                        <div className={styles.Popup_add_block} >
                            <button className={styles.Popup_add_button} onClick={Click_add}>
                                <Image
                                    src="/Pop-upQuiz_add.svg"
                                    alt="Add new question"
                                    width={70}
                                    height={70}
                                    priority
                                />
                            </button>
                            <div id="question_button" className={styles.question_button}>
                                <button className={styles.Multiple_choice_button} onClick={Multiple_choice_question}>
                                    <Image
                                        src="/Pop-up_Multiple_choice.svg"
                                        alt="Add Multiple choice question"
                                        width={30}
                                        height={20}
                                        priority
                                    />
                                </button>
                            </div>
                        </div> 
                    </div>
                </div>   
            </main>
        </>
    )
}
