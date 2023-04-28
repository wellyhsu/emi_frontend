import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import React, {useRef} from "react";
import Cookies from 'js-cookie'; 

export default function VE_Edit_video() {
    var information;
    const languageRef = useRef(undefined);
    const VoiceRef = useRef(undefined);
    const scriptRef = useRef(undefined);
    const acapela_token = Cookies.get('acapela_token');

    function test(){

        const acapela_data_send =
        {
            "voice": VoiceRef.current.value,
            "text": scriptRef.current.value,
            "output": "file" 
        };
  
        var acapela_data_send_json = JSON.stringify(acapela_data_send);  //轉json格式
        console.log("account_send_json is " + acapela_data_send_json);
        console.log("Token + ",acapela_token);

        fetch("https://www.acapela-cloud.com/api/command/", {
            method: 'POST',
            headers:{
                'Authorization': 'Token ' + acapela_token,
                'Content-Type': 'application/json',
            },
            body: acapela_data_send_json,
        })
        .then((response) => {
            response.blob()   //同步 異步 問題
            .then(blob => {
                const audio = document.querySelector('audio');
                const source = document.querySelector('source');

                const url = URL.createObjectURL(blob);  // 使用Blob創建URL
                source.src = url;  // 設定audio的src屬性為創建的URL
                audio.load();
                audio.play();

                const download = document.getElementById('download');
                download.setAttribute('href', url);
                download.setAttribute('download', 'audio.mp3');
            })
            .catch(error => console.error(error));
            console.log('info^^', information);
        })
        .catch((error) => console.log("error", error));
      }
 

    return (
        <>
            <main className={styles.main}>
                <div className={styles.Edit_grid2}>
                    <div className={styles.Edit_left_part}>
                        <div className={styles.Start_making}>
                            Edit the script
                        </div>
                        <div>
                            
                        </div>
                        <div className={styles.upload_file_title}>
                            Please select a voice and paste your script
                        </div>
                        <video>
                            
                        </video>
                        <div>
                            <audio controls>
                                <source type="audio/mp3" />
                            </audio>   
                        </div>
                        <a id="download" href="#" download>下載語音檔</a>
                        
                    </div>

                    <div className={styles.Edit_right_part}>
                        <div className={styles.Choose_voice}>
                            1.Please choose a digital voice 
                            <div>
                                <div className={styles.language_part}>
                                    <div className={styles.language}>
                                        language
                                    </div>
                                    <select 
                                        className={styles.select} 
                                        ref={languageRef}
                                        name="language"
                                    >
                                        <option></option>
                                        <option>English (Australia)</option>
                                        <option>USEnglish</option>
                                        <option>British</option>
                                        <option>Chineese</option>
                                    </select>
                                </div>

                                <div className={styles.Voice_part}>
                                    <div className={styles.Voice}>
                                        Voice
                                    </div>
                                    <select
                                        className={styles.select}
                                        ref={VoiceRef}
                                        name="Voice"
                                    >
                                        <option></option>
                                        <option>Lucy22k_NT</option>
                                        <option>Peter22k_NT</option>
                                        <option>Lulu22k_HQ</option>
                                        <option>QueenElizabeth22k_NT</option>
                                        <option>Rachel22k_NT</option>
                                    </select>
                                </div>

                                <button className={styles.Test_button} onClick={test}>
                                    Test
                                </button>
                            </div>
                        </div>   

                        <div className={styles.Input_script}>
                            <div className={styles.Input_script_word}>
                                2.Input the script
                            </div>
                            <textarea
                                ref={scriptRef}
                                name="script"
                                className={styles.Input_script_block}
                            >
                                
                            </textarea>
                        </div>
                    </div>
                </div>

                <div className={styles.upload_file_button}>
                    <Link 
                        href={{
                            pathname: '/[page]',
                            query: { page: process.env.NEXT_PUBLIC_VE_Create_step2 }
                            }}
                    >
                        <button className={styles.UploadFile_Back_button}>
                            Back
                        </button>
                    </Link>
                    <Link 
                        href="upload_file_page"
                    >
                        <button className={styles.UploadFile_Next_button}>
                            Next
                        </button>
                    </Link>
                </div> 
                

            </main>
        </>
    )
}
