import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import {useEffect, useState} from 'react';
import Cookies from 'js-cookie'; 
import Script from 'next/script';
import pop_up_question from '../components/pop_up_question';

var fileData;
var fileName;
var fileType;
var fileSize;
var fileTime;

var ADD_button=0;
var number=0;

function gap_fill_question(){
    return(
        <button className={styles.alert_background}>
          <div className={styles.alert_message}>
            <div style={{display: "inline-block", marginTop: "15vh",  verticalAlign: "middle"}}>
              <Image
                src="/warning-sign.png"
                alt="Add new question"
                width={70}
                height={70}
                priority
              />
            </div>
            <div className={styles.alert_content}>
              Please log in, thanks. 
            </div>
          </div>
        </button>
      )
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



    return (
        <>
           <main className={styles.main}>
                <div className={styles.no_padding_center}>
                    <div className={styles.PopupQuiz_video_preview}>
                        <video 
                            src="video_preview.svg"
                            poster=""
                            width="847" 
                            height="466" 
                            autoplay="false" 
                            controls="true" 
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
                        <button className={styles.Multiple_choice_button}>
                            <Image
                                src="/Pop-up_Multiple_choice.svg"
                                alt="Add Multiple choice question"
                                width={30}
                                height={20}
                                priority
                            />
                        </button>
                        <button className={styles.Multiple_choice_button}>
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
