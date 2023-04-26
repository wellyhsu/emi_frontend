import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Script from 'next/script'
//import upload from '../components/choose_file'
var fileData;
var fileName;
var fileType;
var fileSize;
var fileTime;


var ADD_button=0;

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
                <div className={styles.Start_making}>
                    <button className={styles.Popup_add_button} onClick={Click_add}>
                        <Image
                            src="/Pop-upQuiz_add.svg"
                            alt="Add new question"
                            width={70}
                            height={70}
                            priority
                        />
                    </button>
                </div>
                <div id="question_button" className={styles.question_button}>
                    <button className={styles.gap_fill_button}>
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

                
                

            </main>
            
        </>
    )
}
