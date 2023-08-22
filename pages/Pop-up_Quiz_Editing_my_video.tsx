import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import {useLayoutEffect, useRef, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; 
import Script from 'next/script';
import pop_up_question from '../components/pop_up_question';
import PopUpWindow from '../components/Pop_up_window';
import Index from '../components/Progress_bar';

var ADD_button=0;  //用於點擊ADD按鈕後，展開及收起add欄位
var Question="";   //發送給後端的題目
var Choice=[];     //發送給後端的題目選項
var Answer="";     //發送給後端的答案
var Time="";       //發送給後端的當前影片時間

const token =  Cookies.get('token');

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

export default function Pop_up_Quiz_Editing_my_video() {
    const router = useRouter();
/*
    const Gap_fill_Question_Question_Ref = useRef(undefined);
    const Gap_fill_Question_Answer_Ref = useRef(undefined);
*/
    const Multiple_choice_Question_Ref = useRef(undefined);   //取得使用者輸入的Question欄位內容
    const Multiple_choice_Choice_Ref_1 = useRef(undefined);   //取得使用者輸入的第一個Choice欄位內容
    const Multiple_choice_Choice_Ref_2 = useRef(undefined);   //取得使用者輸入的第二個Choice欄位內容
    const Multiple_choice_Choice_Ref_3 = useRef(undefined);   //取得使用者輸入的第三個Choice欄位內容
    const Multiple_choice_Choice_Ref_4 = useRef(undefined);   //取得使用者輸入的第四個Choice欄位內容

    const Multiple_choice_Answer_Ref = useRef(undefined);     //取得使用者輸入的Answer欄位內容
/*
    const Scramble_task_Question_Ref = useRef(undefined);
    const Scramble_task_Choice_Ref = useRef(undefined);
    const Scramble_task_Answer_Ref = useRef(undefined);

    function gap_fill_close(){
        var information;
        var selectVideo = document.querySelector('video');

        document.getElementById("gap_fill_question").style = "display: none";

        Question_type = "Gap fill";  //插入影片中的題目類型
        Question = Gap_fill_Question_Question_Ref.current.value;   //使用者輸入的題目內容
        Answer = Gap_fill_Question_Answer_Ref.current.value;         //題目答案
        Time = String(Math.floor(selectVideo.currentTime));           //影片播放到的時間

        console.log("Question= ", Question);
        console.log("Choice= ", Choice);
        console.log("Answer= ", Answer);
        console.log("Time= ", Time);

        const question_send =
        {
            "Question_type": "Multiple_choice",
            "Question": Question,
            "Choice": "",  
            "Answer": Answer,
            "Time": Time,
        }
        
        var question_send_json = JSON.stringify(question_send);  //轉json格式
        fetch(process.env.NEXT_PUBLIC_API_URL, {            
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: question_send_json,
        })
            .then((response) => {
                information = response.json();
                console.log('info^^',information);
                return information;
            })
            .then((data) => {
            })
            .catch((error) => console.log("error", error));


        Gap_fill_Question_Question_Ref.current.value = "";   //使用者輸入的題目內容
        Gap_fill_Question_Answer_Ref.current.value = "";         //題目答案
    }
    function gap_fill_ClearClose(){
        document.getElementById("gap_fill_question").style = "display: none";

        Gap_fill_Question_Question_Ref.current.value = "";   //使用者輸入的題目內容
        Gap_fill_Question_Answer_Ref.current.value = "";         //題目答案

        console.log("Question= ", Question);
        console.log("Choice= ", Choice);
        console.log("Answer= ", Answer);
    }
*/

    function Multiple_choice_close(){
        var information;
        var selectVideo = document.querySelector('video');
        
        document.getElementById("Multiple_choice_question").style = "display: none";

        Question_type = "Multiple_choice";  //插入影片中的題目類型
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

        const question_send =
        {
            "question": Question,
            "options": Choice,  
            "answer": Answer,
            "explanation": "none",
            'video-path': '/home/roy/test/video/test/uploads/',
        }
        
        var question_send_json = JSON.stringify(question_send);  //轉json格式
        fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_get_quiz + Time, {            
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
        Multiple_choice_Choice_Ref.current.value = "";      //多選題的選項
        Multiple_choice_Answer_Ref.current.value = "";         //題目答案

        console.log("Question= ", Question);
        console.log("Choice= ", Choice);
        console.log("Answer= ", Answer);
    }
/*
    function Scramble_task_close(){
        document.getElementById("Scramble_task_question").style = "display: none";
    }
    function Scramble_task_ClearClose(){
        document.getElementById("Scramble_task_question").style = "display: none";

        Gap_fill_Question_Question_Ref.current.value = "";   //使用者輸入的題目內容
        Gap_fill_Question_Answer_Ref.current.value = "";         //題目答案

        console.log("Question= ", Question);
        console.log("Choice= ", Choice);
        console.log("Answer= ", Answer);
    }
*/
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
{/*
                <div id="gap_fill_question" style={{height: "100%",display: "none"}}>
                    <div className={styles.question_background}>
                        <div className={styles.alert_question}>
                            <div className={styles.question_title}>
                                Gap fill question
                            </div>
                            <div style={{display: "block", marginLeft: "5vw"}}>
                                <div className={styles.content_title}>
                                    Question
                                    <textarea ref={Gap_fill_Question_Question_Ref} id="Question_content" className={styles.content_input} placeholder="Please input Question">

                                    </textarea>
                                </div>
                                <div className={styles.content_title}>
                                    Answer and explain
                                    <textarea ref={Gap_fill_Question_Answer_Ref} id="Answer_content" className={styles.content_input} placeholder="Please input Answer">
                                        
                                    </textarea>
                                </div>
                            </div>
                            <div style={{float: "right"}}>
                                <button className={styles.Cancel_button} onClick={gap_fill_ClearClose}>
                                    Cancel
                                </button>
                                <button className={styles.Continuous_button} onClick={gap_fill_close}>
                                    Continuous
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
*/} 
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
{/* 
                <div id="Scramble_task_question" style={{height: "100%",display: "none"}}>
                    <div className={styles.question_background}>
                        <div className={styles.alert_question}>
                            <div className={styles.question_title}>
                                Scramble task question
                            </div>
                            <div style={{display: "block", marginLeft: "5vw"}}>
                                <div className={styles.content_title}>
                                    Question
                                    <textarea ref={Gap_fill_Question_Question_Ref} id="Question_content" className={styles.content_input} placeholder="Please input Question">

                                    </textarea>
                                </div>
                                <div className={styles.content_title}>
                                    Answer and explain
                                    <textarea ref={Gap_fill_Question_Answer_Ref} id="Answer_content" className={styles.content_input} placeholder="Please input Answer">
                                        
                                    </textarea>
                                </div>
                            </div>
                            <div style={{float: "right"}}>
                                <button className={styles.Cancel_button} onClick={Scramble_task_ClearClose}>
                                    Cancel
                                </button>
                                <button className={styles.Continuous_button} onClick={Scramble_task_close}>
                                    Continuous
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
*/}
                <div className={styles.no_padding_center}>
                    <div>
                        <div className={styles.PopupQuiz_video_preview}>
                            <video 
                                poster=""
                                autoPlay={false}
                                controls={true} 
                            >
                                <source src="TEST(1min30sec).mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div className= {styles.circle}>
                            </div>
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
{/*
                                <button className={styles.gap_fill_button} onClick={gap_fill_question}>
                                    <Image
                                        src="/Pop-up_gap_fill.svg"
                                        alt="Add gap_fill question"
                                        width={65}
                                        height={20}
                                        priority
                                    />
                                </button>
*/} 
                                <button className={styles.Multiple_choice_button} onClick={Multiple_choice_question}>
                                    <Image
                                        src="/Pop-up_Multiple_choice.svg"
                                        alt="Add Multiple choice question"
                                        width={30}
                                        height={20}
                                        priority
                                    />
                                </button>
{/*
                                <button className={styles.Multiple_choice_button} onClick={Scramble_task_question}>
                                    <Image
                                        src="/Pop-up_Scramble_task.svg"
                                        alt="Add Scramble task question"
                                        width={40}
                                        height={17}
                                        priority
                                    />
                                </button>

                                <button className={styles.Multiple_choice_button}>
                                    <Image
                                        src="/Pop-up_cut_video.svg"
                                        alt="Cut video"
                                        width={20}
                                        height={20}
                                        priority
                                    />
                                </button>
*/}
                            </div>
                        </div> 
                    </div>
                </div> 
                
                
                
            </main>
            
        </>
    )
}
