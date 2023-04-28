import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import People_item from '../components/People_item'
import {useEffect, useState} from 'react';
import Cookies from 'js-cookie'; 

const index_number = [];   //component的id
const remove_number = [];   //被移除掉的component的id
var repeat=0;   //用於判斷index在index_number內是否有重複
var index=0;   //用於給component 一個key值
const acapela_token = Cookies.get('acapela_token');

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
        information = response;
//            audio_file = response.arrayBuffer();
        console.log('info^^', information);
        console.log('infomation type=', typeof(information));
//            console.log('audio_file=', audio_file);
//        const audioBlob = new Blob([audio_file], {type: 'audio/mp3'});
//        audio_URL = URL.createObjectURL(audioBlob);
//        console.log('audioBlob=', audioBlob);
//        console.log('url=', audio_URL);
            return information;
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

export default function TTSA_Create_My_Audio() {
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
                    <div>
                        <div id='people_block'>
                            {components}
{/**/}                  </div>
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
                        <Image
                            src="/TTSA_Cat_image.svg"
                            alt="TTSA Cat image image"
                            width={485}
                            height={300}
                            priority
                        />
                        <div className={styles.TTSA_button_block}>
                            <button className={styles.Build_Audio_button}>
                                Build Audio
                            </button>
                            <button className={styles.Export_button}>
                                Export
                            </button>
                        </div> 
                    </div>
                </div>

                
                

            </main>
        </>
    )
}
