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
var Question_title="";
const token =  Cookies.get('token');

function gap_fill_question(){  
    document.getElementById("gap_fill_question").style = "display: flex";
}
function gap_fill_close(){
    document.getElementById("gap_fill_question").style = "display: none";

    /*
    Question_type=;  //插入影片中的題目類型
    Question=;       //使用者輸入的題目內容
    Choice=;         //多選題的選項
    Answer=;         //題目答案
    Time=;           //影片播放到的時間
    */

}

function Multiple_choice_question(){  
    document.getElementById("Multiple_choice_question").style = "display: flex";
    console.log("Multiple");
}
function Multiple_choice_close(){
    document.getElementById("Multiple_choice_question").style = "display: none";
    var Question = document.getElementById("Multiple_choice_question").value;
    console.log = ("Question= ",Question);
    /*
    Question_type = "Multiple_choice";  //插入影片中的題目類型
    Question=;       //使用者輸入的題目內容
    Choice=;         //多選題的選項
    Answer=;         //題目答案
    Time=;           //影片播放到的時間
    */
}

function Scramble_task_question(){  
    document.getElementById("Scramble_task_question").style = "display: flex";
    Question_title = "Scramble task question";
}
function Scramble_task_close(){
    document.getElementById("Scramble_task_question").style = "display: none";
}

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
    const Multiple_choice_Question_Ref = useRef(undefined);
    const Multiple_choice_Choice_Ref = useRef(undefined);
    const Multiple_choice_Answer_Ref = useRef(undefined);

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
                <div id="gap_fill_question" style={{height: "100%",display: "none"}}>
                    <PopUpWindow
                        Pop_up_Question_title = "Gap fill question"
                        colse_function={gap_fill_close}
                    />
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
                                    <textarea ref={Multiple_choice_Choice_Ref} id="Choice_content" className={styles.content_input} placeholder="Please input Choice">
                                        
                                    </textarea>
                                </div>
                                <div className={styles.content_title}>
                                    Answer and explain
                                    <textarea ref={Multiple_choice_Answer_Ref} id="Answer_content" className={styles.content_input} placeholder="Please input Answer">
                                        
                                    </textarea>
                                </div>
                            </div>
                            <button className={styles.Continuous_button} onClick={Multiple_choice_close}>
                                Continuous
                            </button>
                        </div>
                    </div>
                </div>
                <div id="Scramble_task_question" style={{height: "100%",display: "none"}}>
                    <PopUpWindow
                        Pop_up_Question_title = "Scramble task question"
                        colse_function={Scramble_task_close}
                    />
                </div>
                <div className={styles.no_padding_center}>
                    <div className={styles.PopupQuiz_video_preview}>
                        <video 
                            src="video_preview.svg"
                            poster=""
                            width="847" 
                            height="466" 
                            autoPlay={false}
                            controls={true} 
                        />
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
                        <button className={styles.gap_fill_button} onClick={gap_fill_question}>
                            <Image
                                src="/Pop-up_gap_fill.svg"
                                alt="Add gap_fill question"
                                width={65}
                                height={20}
                                priority
                            />
                        </button>
                        <button className={styles.Multiple_choice_button} onClick={Multiple_choice_question}>
                            <Image
                                src="/Pop-up_Multiple_choice.svg"
                                alt="Add Multiple choice question"
                                width={30}
                                height={20}
                                priority
                            />
                        </button>
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
                    </div>
                </div> 
                
            </main>
            
        </>
    )
}
