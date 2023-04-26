import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import React, {useRef} from "react";
import Cookies from 'js-cookie'; 
import {useEffect, useState} from 'react';

var click_Test_button=0;
var audio_file;
var audio_URL;

export default function VE_Edit_video() {
    var information;
    const languageRef = useRef(undefined);
    const VoiceRef = useRef(undefined);
    const scriptRef = useRef(undefined);
    // 為了方便操作，建立一個array來管理這些ref
    const refArr = useRef([languageRef,VoiceRef,scriptRef]);
    const [streamData, setStreamData] = useState("null");
    const acapela_token = Cookies.get('acapela_token');

    function test(){

        const acapela_data_send =
        {
            "voice": VoiceRef.current.value,
            "text": scriptRef.current.value,
            "output": "file " 
        }
  
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
            information = response;
//            audio_file = response.arrayBuffer();
            console.log('info^^', information);
            console.log('infomation type=', typeof(information));
/*            console.log('audio_file=', audio_file);
            const audioBlob = new Blob([audio_file], {type: 'audio/mp3'});
            audio_URL = URL.createObjectURL(audioBlob);
            console.log('audioBlob=', audioBlob);
            console.log('url=', audio_URL);
*/            return information;
        })
        .then((data) => {
        //    acapela_token = data["token"];
        //    acapela_token = JSON.stringify(acapela_token);
          //  audio_file=data["body"];
 //           console.log('data["url"]=',data["url"]);
   //         console.log('data["blob"]=',data["blob"]);
     //       console.log('audio_file=',audio_file);
        })
        .catch((error) => console.log("error", error));
      }


/*            async function fetchStreamData() {
                const response = await fetch("https://www.acapela-cloud.com/api/command/", {
                    method: 'POST',
                    headers:{
                        'Authorization': 'Token ' + acapela_token,
                        'Content-Type': 'application/json'
                    },
                    body: acapela_data_send_json,
                })
                .then((response) => {
                    information = response;
                    audio_file = response.arrayBuffer();
                    console.log('info^^',information);
                    console.log('infomation type=',typeof(information));
                    return information;
                })
                .then((data) => {
                    console.log('data["url"]=',data["url"]);
                    console.log('data["blob"]=',data["blob"]);
                    console.log('audio_file=',audio_file);
                })
                .catch((error) => console.log("error", error));
                const audioData = await response.arrayBuffer();
                const audioBlob = new Blob([audioData], {type: 'audio/mp3'});
                const url = URL.createObjectURL(audioBlob);
                setStreamData(url);
            }
            fetchStreamData();
            console.log('streamData=',streamData );
*/    

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
{/**/}                  <div>
                            {
                                streamData && 
                                (
                                    <audio controls>
                                        <source src={audio_URL} type="audio/mp3" />
                                    </audio>  
                                )
                            }     
                        </div>

                        <iframe 
                            src='' 
                            width="500px" 
                            height="279px" 
                            frameBorder="0" 
                            className={styles.PPT}>
                        </iframe>
                        
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
