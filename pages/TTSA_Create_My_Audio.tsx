import Image from 'next/image'
import Link from 'next/link'
import { useLayoutEffect, useEffect, useState} from 'react';
import styles from '@/styles/Home.module.css'
import People_item from '../components/People_item'
import Cookies from 'js-cookie'; 
import { useRouter } from 'next/router';

const index_number = [];   //component的id
const remove_number = [];   //被移除掉的component的id
var repeat=0;   //用於判斷index在index_number內是否有重複
var index=0;   //用於給component 一個key值
var Download_as=0;
var Format=0;
var Quality=0;
var Channel=0;

const acapela_token = Cookies.get('acapela_token');
const token =  Cookies.get('token');

const closed_Download_windows = ()=>{
    document.getElementById("Download_window").style="display: none;";
}

const Single_file = () =>{
    document.getElementById("Single_file").style=" background-color: rgba(217, 217, 217, 1);";
    document.getElementById("Split_by_blocks").style=" background-color: rgba(255, 255, 255, 1);";
    Download_as=0;
}
const Split_by_blocks = () =>{
    document.getElementById("Single_file").style=" background-color: rgba(255, 255, 255, 1);";
    document.getElementById("Split_by_blocks").style=" background-color: rgba(217, 217, 217, 1);";
    Download_as=1;
}
const mp3 = () =>{
    document.getElementById("mp3").style=" background-color: rgba(217, 217, 217, 1);";
    document.getElementById("WAV").style=" background-color: rgba(255, 255, 255, 1);";
    document.getElementById("FLAC").style=" background-color: rgba(255, 255, 255, 1);";
    Format=0;
}
const WAV = () =>{
    document.getElementById("mp3").style=" background-color: rgba(255, 255, 255, 1);";
    document.getElementById("WAV").style=" background-color: rgba(217, 217, 217, 1);";
    document.getElementById("FLAC").style=" background-color: rgba(255, 255, 255, 1);";
    Format=1;
}
const FLAC = () =>{
    document.getElementById("mp3").style=" background-color: rgba(255, 255, 255, 1);";
    document.getElementById("WAV").style=" background-color: rgba(255, 255, 255, 1);";
    document.getElementById("FLAC").style=" background-color: rgba(217, 217, 217, 1);";
    Format=2;
}
const LOW = () =>{
    document.getElementById("LOW").style=" background-color: rgba(217, 217, 217, 1);";
    document.getElementById("Medium").style=" background-color: rgba(255, 255, 255, 1);";
    document.getElementById("High").style=" background-color: rgba(255, 255, 255, 1);";
    Quality=0;
}
const Medium = () =>{
    document.getElementById("LOW").style=" background-color: rgba(255, 255, 255, 1);";
    document.getElementById("Medium").style=" background-color: rgba(217, 217, 217, 1);";
    document.getElementById("High").style=" background-color: rgba(255, 255, 255, 1);";
    Quality=1;
}
const High = () =>{
    document.getElementById("LOW").style=" background-color: rgba(255, 255, 255, 1);";
    document.getElementById("Medium").style=" background-color: rgba(255, 255, 255, 1);";
    document.getElementById("High").style=" background-color: rgba(217, 217, 217, 1);";
    Quality=2;
}
const Stereo = () =>{
    document.getElementById("Stereo").style=" background-color: rgba(217, 217, 217, 1);";
    document.getElementById("Mono").style=" background-color: rgba(255, 255, 255, 1);";
    Channel=0;
}
const Mono = () =>{
    document.getElementById("Stereo").style=" background-color: rgba(255, 255, 255, 1);";
    document.getElementById("Mono").style=" background-color: rgba(217, 217, 217, 1);";
    Channel=1;
}

const Download = () =>{
    var text;
    var total_text="";
    var type;
    
    for(var i=0; i<index_number.length;i++)
    {
        text = document.getElementById(String(index_number[i])).value;
        total_text=total_text + text + ". ";
    }
    console.log("text=",total_text);
    
    if(Format == 0)
    {
        type="mp3"
    }
    else if(Format == 1)
    {
        type="wav"
    }
    else if(Format == 2)
    {
        type="flac"
    }

    const acapela_data_send =
    {
        "voice": "Lucy22k_NT",
        "text": total_text,
        "output": "file", 
        "type": type
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
            audio.loop=false;
/*
            hidden_a.href = window.URL.createObjectURL(new Blob([results.data]));
            hidden_a.setAttribute('download', 'download_image.jpg');
            document.body.appendChild(hidden_a);
            hidden_a.click();
*/
            let hidden_a = document.createElement('a');
            hidden_a.href = "#";
//            const download = document.getElementById('download');
            hidden_a.setAttribute('href', url);
            console.log("Format=",Format);
            if(Format == 0)
            {
                hidden_a.setAttribute('download', 'audio.mp3');
            }
            else if(Format == 1)
            {
                hidden_a.setAttribute('download', 'audio.wav');
            }
            else if (Format ==2)
            {
                hidden_a.setAttribute('download', 'audio.flac');
            }
            document.body.appendChild(hidden_a);
            hidden_a.click();
        })
        .catch(error => console.error(error));
        console.log('info^^', information);
    })
    .catch((error) => console.log("error", error));
}

const Build_Audio = () =>{
    var text;
    var total_text="";
    for(var i=0; i<index_number.length;i++)
    {
        text = document.getElementById(String(index_number[i])).value;
        total_text=total_text + text + ". ";
    }
    console.log("text=",total_text);    

    const acapela_data_send =
    {
        "voice": "Lucy22k_NT",
        "text": total_text,
        "output": "file", 
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
            audio.loop=false;
        })
        .catch(error => console.error(error));
    })
    .catch((error) => console.log("error", error));
}

const Export = () => {
    document.getElementById("Download_window").style="display: block;";
}

const play_audio = (key) => {
    var text;
    var information;
    console.log("key.target.alt=",key.target.alt);
    text = document.getElementById(key.target.alt).value;
    console.log("text=",text);

    const acapela_data_send =
    {
        "voice": "Lucy22k_NT",
        "text": text,
        "output": "file" 
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
        response.blob()   //同步 異步 問題
        .then(blob => {
            const audio = document.querySelector('audio');
            const source = document.querySelector('source');

            const url = URL.createObjectURL(blob);  // 使用Blob創建URL
            source.src = url;  // 設定audio的src屬性為創建的URL
            audio.load();
            audio.play();
        })
        .catch(error => console.error(error));
        console.log('info^^', information);
    })
    .catch((error) => console.log("error", error));

}

export default function TTSA_Create_My_Audio() {
    const router = useRouter();

    useLayoutEffect(() => {

        if((token == "null") || (token == null) || (token == "undefined"))
        {
          console.log("useEffect triggered");
          router.push("/"+ process.env.NEXT_PUBLIC_Log_in);
        }
    }, [])

    const [people_num_block, set_people_num_block] = useState(1);
//    const [Click_key, set_Click_key] = useState(null);
    const components = [];   //畫面上的component

    const add_people_block = () => {        
        set_people_num_block(people_num_block+1);
        index++;   //用於編component的id
    };

    const delete_people_block = (key) => {
        set_people_num_block(people_num_block-1);

        let remove_index = key.target.alt;  //components.indexOf(Click_key);   
        remove_number.push(remove_index);  //把要移除的component id放入remove_number

        console.log("remove_index=",remove_index);
        console.log("key=",key);
        console.log("key.target.alt=",key.target.alt);
        console.log("remove_number=",remove_number);
        console.log("index_number_r_index",index_number.indexOf(remove_index));

        index_number.splice(index_number.indexOf(remove_index), 1); //找到要移除的component id位址，並從index_number中移除
        console.log("index_number=", index_number);

        if (remove_index > -1) 
        {
            console.log("remove~");
            components.splice(index_number.indexOf(remove_index), 1);  //index: 要移除的元素的index ,1: The number of elements to remove.
            console.log("components=",components);
        }
    }
    console.log("F-index_number=", index_number);
/*
    components.push(
        <People_item
            people_image="/Sally.svg"
            item_alt="Sally image"
            people_Name="Sally"
            function={delete_people_block}
            key={0}
        />
    );
*/
    console.log("remove_number=",remove_number);
    for(var i=0; i< people_num_block; i++)
    {       
        repeat = 0;
        for(var j=0; j<index_number.length; j++)
        {                                      // remove_number.indexOf(index) == -1  代表remove_number內沒有index這個項目
            if(index == index_number[j] || remove_number.indexOf(index_number[j]) != -1)  //若i在index_number陣列內
            {
                repeat++;  //表示重複了
            }
        }
        if(repeat == 0 )
        {
            index_number.push(String(index));
            console.log("add~");
        }
        console.log("repeat=",repeat);
        console.log("index_number type=!",typeof(index_number[0]));
        console.log("index_number=!",index_number);
        components.push(
            <People_item
                people_image="/Tom.svg"
                item_alt="Tom image"
                people_Name="Tom"
                function={delete_people_block}
                play_function={play_audio}
                Delete_id={String(index_number[i])}
                id={index_number[i]}
                key={index_number[i]}
            />
        );
        console.log("key=",index_number[i]);
        console.log("index_number:",index_number[i]);
    }
    console.log("final:",index_number);

    return (
        <>
            <main className={styles.main}>
                <div className={styles.TTSA_Create_My_Audio_grid2}>
                    <div className={styles.edit_block}>
                        <div id='people_block'>
                            {components}
                        </div>
                        <div id="button_block" className={styles.TTSA_button_center}>
                            <button className={styles.Add_more_Audios_button} onClick={add_people_block}>
                                <Image
                                    src="/add_more_audios_image.svg"
                                    alt="Add more Audios image"
                                    width={30}
                                    height={30}
                                    priority
                                />
                            </button>
                        </div>
                        <div className={styles.Add_more_Audios}>
                            Add more Audios
                        </div>
                    </div>

                    <div className={styles.TTSA_right_part}>
                        <div className={styles.TTSA_image}>
                            <Image
                                src="/TTSA_Cat_image.svg"
                                alt="TTSA Cat image image"
                                fill={true}
                                priority
                            />
                            <div className={styles.play_audio} style={{display: "none"}}>
                                <audio controls>
                                    <source type="audio/mp3" />
                                </audio>
                            </div>
                        </div>
                        <div className={styles.TTSA_button_block}>
                            <button className={styles.Build_Audio_button} onClick={Build_Audio}>
                                Build Audio
                            </button>
                            <button className={styles.Export_button} onClick={Export}>
                                Export
                            </button>
                        </div> 
                    </div>
                </div>
                <div id="Download_window" className={styles.Download_block}>
                    <button className={styles.X} onClick={closed_Download_windows}>
                        <Image
                            src="/X.svg"
                            alt="close download windows"
                            width={12}
                            height={12}
                            priority
                        />
                    </button>
                    <div className={styles.Download}>
                        Download
                    </div>
                    <div className={styles.Download_word}>
                        Download as
                    </div>
                    <div>
                        <button id="Single_file" className={styles.Single_file} onClick={Single_file}>
                            Single file
                        </button>
                        <button id="Split_by_blocks" className={styles.Split_by_blocks} onClick={Split_by_blocks}>
                            Split by blocks
                        </button>
                    </div>
                    <div className={styles.Download_word}>
                        Format
                    </div>
                    <div>
                        <button id="mp3" className={styles.mp3} onClick={mp3}>
                            .mp3
                        </button>
                        <button id="WAV" className={styles.WAV} onClick={WAV}>
                            .WAV
                        </button>
                        <button id="FLAC" className={styles.FLAC} onClick={FLAC}>
                            .FLAC
                        </button>
                    </div>
                    <div className={styles.Download_word}>
                        Quality
                    </div>
                    <div>
                        <button id="LOW" className={styles.LOW} onClick={LOW}>
                            LOW
                        </button>
                        <button id="Medium" className={styles.Medium} onClick={Medium}>
                            Medium
                        </button>
                        <button id="High" className={styles.High} onClick={High}>
                            High
                        </button>
                        <div className={styles.Quality_text}>
                            (48kHz, 16bit)
                        </div>
                    </div>
                    <div className={styles.Download_word}>
                        Channel
                    </div>
                    <div>
                        <button id="Stereo" className={styles.Stereo} onClick={Stereo}>
                            Stereo
                        </button>
                        <button id="Mono" className={styles.Mono} onClick={Mono}>
                            Mono
                        </button>
                    </div>
                        <button className={styles.Download_Button} onClick={Download}>
                            Download
                        </button>
                </div>

                
                

            </main>
        </>
    )
}
