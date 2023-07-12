import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import React, {useRef} from "react";
import Cookies from 'js-cookie'; 



export default function VE_Edit_video() {
    var information;

    const languageRef = useRef(undefined);
    const VoiceRef = useRef(undefined);
    const VoiceRef_English = useRef(undefined);
    const VoiceRef_British = useRef(undefined);
    const VoiceRef_Chinese = useRef(undefined);


    const scriptRef = useRef(undefined);
    const acapela_token = Cookies.get('acapela_token');
    var Voice_Select;

    function get_language()
    {
        console.log('VoiceRef=',languageRef.current.value);
        if(languageRef.current.value == "USEnglish")
        {
            document.getElementById("all").style = "display: none;";
            document.getElementById("USEnglish").style = "display: block;";
            document.getElementById("British").style = "display: none;";
            document.getElementById("MandarinChinese").style = "display: none;";
            Voice_Select = VoiceRef_English.current.value;
        }
        else if(languageRef.current.value == "British")
        {
            document.getElementById("all").style = "display: none;";
            document.getElementById("USEnglish").style = "display: none;";
            document.getElementById("British").style = "display: block;";
            document.getElementById("MandarinChinese").style = "display: none;";
            Voice_Select = VoiceRef_British.current.value;
        }
        else if(languageRef.current.value == "MandarinChinese")
        {
            document.getElementById("all").style = "display: none;";
            document.getElementById("USEnglish").style = "display: none;";
            document.getElementById("British").style = "display: none;";
            document.getElementById("MandarinChinese").style = "display: block;";
            Voice_Select = VoiceRef_Chinese.current.value;
        }
        else
        {
            document.getElementById("all").style = "display: block;";
            document.getElementById("USEnglish").style = "display: none;";
            document.getElementById("British").style = "display: none;";
            document.getElementById("MandarinChinese").style = "display: none;";
            Voice_Select = VoiceRef.current.value;
        }
    }
    function test()
    {
        if(languageRef.current.value == "USEnglish")
        {
           Voice_Select = VoiceRef_English.current.value;
        }
        else if(languageRef.current.value == "British")
        {
            Voice_Select = VoiceRef_British.current.value;
        }
        else if(languageRef.current.value == "MandarinChinese")
        {
            Voice_Select = VoiceRef_Chinese.current.value;
        }
        else
        {
            Voice_Select = VoiceRef.current.value;
        }
        
        var selectVideo = document.querySelector('video');
        console.log('currentTime=',selectVideo?.currentTime);

        const acapela_data_send =
        {
            "voice": Voice_Select,
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
        <main className={styles.main}>
            <div className={styles.Start_making}>
                Edit the script
            </div>
            <div className={styles.VE_Edit_title}>
                Please select a voice and we will merge the audio and video.
            </div>
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
                            onChange={get_language}
                        >
                            <option></option>
                            <option>USEnglish</option>
                            <option>British</option>
                            <option>MandarinChinese</option>
                        </select>
                    </div>

                    <div className={styles.Voice_part}>
                        <div className={styles.Voice}>
                            Voice
                        </div>
                        <div id="all" className={styles.all}>
                            <select
                                className={styles.select}
                                ref={VoiceRef}
                                name="Voice"
                            >
                                <option></option>
                                <optgroup label="USEnglish">
                                    <option>Darius22k_NT</option>
                                    <option>Karen22k_NT</option>
                                    <option>Laura22k_NT</option>
                                    <option>Rod22k_NT</option>
                                </optgroup>

                                <optgroup label="British">
                                    <option>Lucy22k_NT</option>
                                    <option>Peter22k_NT</option>
                                    <option>QueenElizabeth22k_NT</option>
                                    <option>Rachel22k_NT</option>
                                </optgroup>

                                <optgroup label="MandarinChinese">
                                    <option>Lulu22k_HQ</option>
                                </optgroup>
                            </select>
                        </div>
                        <div id="USEnglish" className={styles.USEnglish}>
                            <select
                                className={styles.select}
                                ref={VoiceRef_English}
                                name="Voice"
                            >
                                <option></option>
                                <optgroup label="USEnglish">
                                    <option>Darius22k_NT</option>
                                    <option>Karen22k_NT</option>
                                    <option>Laura22k_NT</option>
                                    <option>Rod22k_NT</option>
                                </optgroup>
                            </select>
                        </div>
                        <div id="British" className={styles.British}>
                            <select
                                className={styles.select}
                                ref={VoiceRef_British}
                                name="Voice"
                            >
                                <option></option>
                                <optgroup label="British">
                                    <option>Lucy22k_NT</option>
                                    <option>Peter22k_NT</option>
                                    <option>QueenElizabeth22k_NT</option>
                                    <option>Rachel22k_NT</option>
                                </optgroup>
                            </select>
                        </div>
                        <div id="MandarinChinese" className={styles.MandarinChinese}>
                            <select
                                className={styles.select}
                                ref={VoiceRef_Chinese}
                                name="Voice"
                            >
                                <option></option>
                                <optgroup label="MandarinChinese">
                                    <option>Lulu22k_HQ</option>
                                </optgroup>
                            </select>
                        </div>
                    </div>

                    <button className={styles.Test_button} onClick={test}>
                        Test
                    </button>
                </div>
            </div> 
            <div className={styles.no_padding_center}>
                <div className={styles.video_position}>
                    <video 
                        src=""//"白熊咖啡厅第三集cut.mp4"
                        poster=""
                        width="500" 
                        height="348" 
                        autoPlay={false} 
                        controls={true} 
                    />
                </div>
            </div>
            <div className={styles.upload_file_button}>                    
                <div style={{float: "right"}}>
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
            </div>
        </main>
    )
}
