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
var Explain="";     //發送給後端的答案詳解

var Time="0";       //發送給後端的當前影片時間
var Circle_Time;    //儲存該圓點的題目時間

var marginLeftValue = 1;   //用於更改每個circle的位置
var selectVideo;
var playButton;
var inputItem;
//var skipButton;
var progressBarOut;
var progressBarIn;   

var currentPosition;   //影片進度條的位置
var conditionValue = 0.5;   //影片初始音量大小
var video_current_volume;  //紀錄靜音前的音量

var changeInput;    //取得觸發事件的input元素
var conditionName;  //取得input元素的name屬性
var image_sound_alt="sound"

var videoDuration;

var API=0;  //確保只取得一次有題目的時間點
var Question_time = []; //打後端API後，儲存question要出現的時間
var Circle_ID;
var Circle_index = 1;   //用於標記每個circle的ID
var circleID_array=[];    //儲存題目的ID
var circleID_index;       //儲存被點擊的圓點在circleID_array的index

var i;

const token =  Cookies.get('token');
const videoPath = Cookies.get('video_path');

console.log("!!!video_path=", Cookies.get('video_path'));
 

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


export default function Pop_up_Quiz_Editing_my_video({ cookieData }) {
    const router = useRouter();
    const circle=[];     //儲存要出現題目的圓球component
    var information;

    const Multiple_choice_Question_Ref = useRef("");   //取得使用者輸入的Question欄位內容
    const Multiple_choice_Choice_Ref_1 = useRef("");   //取得使用者輸入的第一個Choice欄位內容
    const Multiple_choice_Choice_Ref_2 = useRef("");   //取得使用者輸入的第二個Choice欄位內容
    const Multiple_choice_Choice_Ref_3 = useRef("");   //取得使用者輸入的第三個Choice欄位內容
    const Multiple_choice_Choice_Ref_4 = useRef("");   //取得使用者輸入的第四個Choice欄位內容
    const Multiple_choice_Answer_Ref = useRef("");     //取得使用者輸入的Answer欄位內容
    const Multiple_choice_Explain_Ref = useRef("");     //取得使用者輸入的Answer欄位內容


    const Modify_Question_Ref = useRef("");   //取得使用者修改後的Question欄位內容
    const Modify_Choice_Ref_1 = useRef("");   //取得使用者修改後的第一個Choice欄位內容
    const Modify_Choice_Ref_2 = useRef("");   //取得使用者修改後的第二個Choice欄位內容
    const Modify_Choice_Ref_3 = useRef("");   //取得使用者修改後的第三個Choice欄位內容
    const Modify_Choice_Ref_4 = useRef("");   //取得使用者修改後的第四個Choice欄位內容

    const Modify_Answer_Ref = useRef("");  
    const Modify_Explain_Ref = useRef("");

    const [ShowCircle, setShowCircle] = useState([]);
    const [Sound_image_path, setSound_image_path] = useState("/istockphoto_sound.png");


    useLayoutEffect(() => {

            // 如果从 Cookie 中成功获取到影片路径，将其设置到状态变量中
            console.log("Cookies.get('video_path')=", Cookies.get('video_path'));

            const sourceElement = document.createElement('source');
            sourceElement.src = `/api/video?videoPath=${encodeURIComponent(Cookies.get('video_path'))}`;
            sourceElement.type = 'video/mp4';

            console.log("成功！");

            selectVideo = document.getElementById('video');
            selectVideo?.appendChild(sourceElement);

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

    useLayoutEffect(() => {
        if(API == 0)
        {   
            console.log("Cookies= ", Cookies.get('video_path'));
            console.log("Get Question!!");

            selectVideo.addEventListener('loadedmetadata', () => {
                videoDuration = selectVideo.duration;
                console.log("video length= ", selectVideo.duration);  //影片總長度console.log('Video width:', selectVideo.videoWidth);

                API = 1;     
                        
                //取得要插入影片的時間點資訊  
                console.log("取得要插入影片的時間點資訊 -",videoPath);
                                                                
                fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_quiz_sec + Cookies.get('video_path'), {  
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
                        console.log("data.length=", data.length);
                        
                        const send_circle = [...ShowCircle];    //用於建立副本，渲染畫面

                        for(i=0; i<data.length; i++)
                        {
                            Question_time.push(data[i]);
                            console.log('Question_time=',Question_time[i]);
                        
                            const circleElement = (
                                <div
                                    key={"Modify_Circle" + String(Circle_index)}
                                    id={"Circle" + String(Circle_index)}
                                    className={styles.circle}                 //circle需位移距離
                                    style={{marginLeft: String((Question_time[i]/ videoDuration) * 100 *(98/100))+"%"}}
                                    onClick={Click_Circle}
                                >
                                        
                                </div>
                            );
                            send_circle.push(circleElement); 
                            circleID_array.push(Circle_index);

                            Circle_index++; //用於給圓點編號
                        }
                        setShowCircle(send_circle);
                        console.log("send_circle=",send_circle);
                        console.log("ShowCircle=", ShowCircle);
                    })
                    .catch((error) => console.log("error", error));
            });
        } 

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

    //調整音量滑軸
    function changeCondition (event) {
        //取得觸發事件的input元素
        changeInput = event.target;
        //取得input元素的name屬性
        conditionName = changeInput.name;
        //取得input元素的值   
        conditionValue = changeInput.value;
        //將影片屬性值改為input元素的值
        selectVideo[conditionName] = conditionValue; 

        if(conditionValue != 0)
        {
            video_current_volume = conditionValue;
            setSound_image_path("/istockphoto_sound.png");
            console.log("image_Source=",Sound_image_path);
        }
        else
        { 
            setSound_image_path("/istockphoto_mute.png");
            console.log("image_Source=",Sound_image_path);
        }
        //將畫面上的音量軸調到正確位置
        changeInput.value = conditionValue;
        console.log("changeInput.value= ",changeInput.value);
    };

    //影片播放時的時間軸
    function progressing() {
        //取得影片時間總長度
        videoDuration = selectVideo.duration;
        //取得影片目前時間長度
        let currentTime = selectVideo.currentTime;
        console.log("P_currentTime= ", currentTime);
        //換算成比例
        currentPosition = (currentTime / videoDuration) * 100;
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
        console.log("videoDuration= ",videoDuration);
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
        document.getElementById('video').currentTime = newPosition;
        console.log("selectVideo= ",selectVideo);
        console.log("selectVideo.currentTime=",selectVideo.currentTime);
    };

    function mute_control()
    {
        console.log("mute_coontrol");
        if(document.getElementById('input').value != 0)  //執行靜音動作
        {
            console.log("mute!"); 
            setSound_image_path("/istockphoto_mute.png");

            //紀錄靜音前的音量大小
            video_current_volume = document.getElementById('input').value;  
            
            //音量歸零
            var ZERO=0;
            selectVideo[document.getElementById('input').name] = ZERO;

            //將畫面上的音量軸調到正確位置
            document.getElementById('input').value = ZERO;   //音量歸零
    
            console.log("input= ",document.getElementById('input').value);
            setSound_image_path("/istockphoto_mute.png");

        }
        else  //回復靜音前的音量
        {
            console.log("sound!!");
            setSound_image_path("/istockphoto_sound.png");

            //回復靜音前的音量
            selectVideo[document.getElementById('input').name] = video_current_volume;
            //將畫面上的音量軸調到正確位置
            document.getElementById('input').value = video_current_volume;   //音量回歸


            console.log("input= ",document.getElementById('input').value);
        }
    }

    function Click_Circle()   //Modify Question -> 顯示題目
    {
        var information;

        console.log("GET!");
        console.log("event=", event);
        console.log("event.key=", event.target.id); //取得該物件ID再送進Qtime然後取得時間       
        console.log("ShowCircle=", ShowCircle);
        console.log("CC_send_circle=", circleID_array);

        Circle_ID = String(event.target.id);   //把ID轉成字串
        Circle_ID = Circle_ID.substring(Circle_ID.lastIndexOf("e")+1);  //取得ID數字的部分
        circleID_index = circleID_array.indexOf(parseInt(Circle_ID));

        console.log("circleID=", Circle_ID); //String
        console.log("circleID_array==", circleID_array);        
        console.log("circleID_index", circleID_index);

        Circle_Time = Question_time[circleID_index];
        
        console.log("C_Circle_Time=", Circle_Time);
        document.getElementById("Multiple_choice_question_modify").style = "display: flex";
            
        //取得該點的題目
        console.log("取得該點的題目-",videoPath);
        fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_quiz + Cookies.get('video_path') + "/" + Circle_Time, {            
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
        Explain = Modify_Explain_Ref.current.value;
        
        const modify_question_send =
        {
            "question": Question,
            "options": Choice,  
            "answer": Answer,
            "explanation": Explain,
            'video-path': videoPath?.substring(0, videoPath?.lastIndexOf("/")+1),
        }
        
        var modify_question_send_json = JSON.stringify(modify_question_send);  //轉json格式
        console.log("send data=",modify_question_send_json);
                      
        console.log('fetch=',videoPath,"/",Circle_Time);
        //儲存修改之後的題目
        fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_quiz + videoPath + "/" + Circle_Time, {            
            method: 'PUT',
            headers:{
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

    function Delete_Question()  //Modify Question -> 刪除該時間點的題目
    {
        //點擊圓點後就會得到該點的時間 Circle_Time
        console.log("D_circleID=", Circle_ID);
        console.log("D_circleID_index=", circleID_index);
        document.getElementById("Multiple_choice_question_modify").style = "display: none";
    
        const send_circle = [...ShowCircle];    //用於建立副本，渲染畫面
        console.log("copy_send_circle=",send_circle);

        var Delete = circleID_index;  //取得要刪除的點的ID並轉成字串
        send_circle.splice(Delete, 1);   //將數字ID轉換成數字格式
        circleID_array.splice(Delete, 1);   //將數字ID轉換成數字格式
        
        console.log("Delete_index=", Delete);

        setShowCircle(send_circle);
        console.log("D_send_circle=",send_circle);
        console.log("D_ShowCircle=", ShowCircle);
        console.log("D_circleID_array=",circleID_array);
    
        //通知後端刪除此題目
        fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_quiz + videoPath + "/" + Circle_Time, {            
            method: 'Delete',
            headers:{
                'Content-Type': 'application/json',
            },
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

    }

    //新增題目
    function Multiple_choice_close()
    {
        var information;

        var selectVideo = document.querySelector('video');
        console.log("video length= ",Math.floor(selectVideo.duration));  //影片總長度
        
        const circleElement = (
            <div
                key={"Circle" + String(Circle_index)}
                id={"Circle" + String(Circle_index)}
                className={styles.circle}                 //circle需位移距離
                style={{marginLeft: String(currentPosition*(98/100))+"%"}}
                onClick={Click_Circle}
            >   
            </div>
        );
                
        const send_circle = [...ShowCircle];    //用於建立副本，渲染畫面
        send_circle.push(circleElement);
        circleID_array.push(Circle_index);   //將新增的圓點ID放入陣列
        Question_time.push(String(Math.floor(selectVideo.currentTime)));   //將此點時間點加入 儲存出現題目的時間陣列

        setShowCircle(send_circle);
        console.log("send_circle=",send_circle);
        console.log('ShowCircle:', ShowCircle);

        Circle_index++;  //Circle編號 + 1

        document.getElementById("Multiple_choice_question").style = "display: none";

        Question = Multiple_choice_Question_Ref.current.value;   //使用者輸入的題目內容
        Choice.push(Multiple_choice_Choice_Ref_1.current.value);      //多選題的選項
        Choice.push(Multiple_choice_Choice_Ref_2.current.value);      //多選題的選項
        Choice.push(Multiple_choice_Choice_Ref_3.current.value);      //多選題的選項
        Choice.push(Multiple_choice_Choice_Ref_4.current.value);      //多選題的選項
        Answer = Multiple_choice_Answer_Ref.current.value;         //題目答案
        Explain = Multiple_choice_Explain_Ref.current.value;
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
        Multiple_choice_Explain_Ref.current.value = "";        //題目的詳解
        Choice = [];
    }

    //點擊取消後 刪除所有內容
    function Multiple_choice_ClearClose()
    {
        document.getElementById("Multiple_choice_question").style = "display: none";

        Multiple_choice_Question_Ref.current.value = "";   //使用者輸入的題目內容
        Multiple_choice_Choice_Ref_1.current.value = "";      //多選題的選項
        Multiple_choice_Choice_Ref_2.current.value = "";      //多選題的選項
        Multiple_choice_Choice_Ref_3.current.value = "";      //多選題的選項
        Multiple_choice_Choice_Ref_4.current.value = "";      //多選題的選項

        Multiple_choice_Answer_Ref.current.value = "";         //題目答案
        Multiple_choice_Explain_Ref.current.value = "";        //題目的詳解

        console.log("Question= ", Question);
        console.log("Choice= ", Choice);
        console.log("Answer= ", Answer);
    }

    useLayoutEffect(() => {

        if((token == "null") || (token == null) || (token == "undefined"))
        {
          console.log("useEffect triggered");
          router.push("/"+ process.env.NEXT_PUBLIC_Log_in); //無法返回上一頁
        }

      }, [])

    console.log('E_ShowCircle:', ShowCircle);
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
                                    Answer
                                    <textarea ref={Modify_Answer_Ref} id="Modify_Answer" className={styles.content_input} placeholder="Please input Answer">
                                        
                                    </textarea>
                                </div>
                                <div className={styles.content_title}>
                                    Explain
                                    <textarea ref={Modify_Explain_Ref} id="Modify_Answer" className={styles.content_input} placeholder="Please input Answer">
                                        
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
                                    Answer
                                    <textarea ref={Multiple_choice_Answer_Ref} id="Answer_content" className={styles.content_input} placeholder="Please input Answer">
                                        
                                    </textarea>
                                </div>
                                <div className={styles.content_title}>
                                    Explain
                                    <textarea ref={Multiple_choice_Explain_Ref} id="Modify_Answer" className={styles.content_input} placeholder="Please input Answer">
                                        
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
                        <div style={{ height: "100%",width: "100%", justifyContent: "center"}}>
                            <video 
                                id='video'
                                poster=""
                                autoPlay={false}
                                controls={false} 
                                className={styles.video}
                            >
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
                                            src={Sound_image_path}
                                            alt={image_sound_alt}
                                            //fill={true}
                                            width= {20}
                                            height= {20}
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
                                        onChange={changeCondition}
                                    >
                                    </input>
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
                </div>   
            </main>
        </>
    )
}
