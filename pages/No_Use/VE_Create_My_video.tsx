import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { json } from 'stream/consumers';
import { useLayoutEffect, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
//import Choose_type from '../components/Call_API'

var type = "nothing";
const token =  Cookies.get('token');

function choose_type_PPT(){

    document.getElementById("PPT_button").style = "  background-color: rgba(255,0 ,0 , 1);";
    document.getElementById("video_button").style = "  background-color: rgba(243, 241, 241, 1);";
    type = "PPT";

}

function choose_type_video(){
    document.getElementById("PPT_button").style = "  background-color: rgba(243, 241, 241, 1);";
    document.getElementById("video_button").style = "  background-color: rgba(255,0 ,0 , 1);";
    type = "Video";
}

function Choose_type() {    //選擇類型
    var back_data;
    var get_DATA;
	console.log('press type')
    console.log("type is " + type);

    if(type == "nothing")
    {
        alert("Please choose the type of upload file");
        return false;
    }

    const type_choose_send =
    {
      "type" : type,   
    };
    var type_choose_send_json = JSON.stringify(type_choose_send);  //轉json格式
    console.log("type_choose_send is " + type_choose_send_json);
    console.log('typeof(type_choose_send_json)=',typeof(type_choose_send_json));

    fetch("http://localhost:3000/api/Next_Page_Link/", {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: type_choose_send_json,
    })
      .then((response) => {
        back_data = response.json();
        console.log("back_data=",back_data);
        return back_data;
      })
      .then((data) => {
        get_DATA = data["Next_Link"];
        console.log('data',data["Next_Link"]);
        console.log('data Type',typeof(data));
      })
      .catch((error) => console.log("EError", error));
  	
      window.location.assign(process.env.NEXT_PUBLIC_VE_Create_step2);
  }

export default function How_to_Make_video() {
    const router = useRouter();

    useLayoutEffect(() => {

        if((token == "null") || (token == null) || (token == "undefined"))
        {
          console.log("useEffect triggered");
          router.push("/"+ process.env.NEXT_PUBLIC_Log_in);
        }
      }, [])
      
    return (
        <>
            <main className={styles.main}>
                <div className={styles.Choose_file_type}>
                    Choose the type of upload file
                </div>
                
                <div style={{width: "100%", height: "55vh"}}>
                    <div className={styles.CMV_upload_PPT_image_block} >
                        <div className={styles.CMV_upload_PPT_image}>
                            <Image
                                src="/CMV_upload_PPT.svg"
                                alt="upload video image"
                                fill={true}
                                priority
                            />
                        </div>
                        <div className={styles.select_content_PPT}>
                            <button id="PPT_button" className={styles.checkbox} onClick={choose_type_PPT}></button>
                            Upload PPT
                        </div>
                    </div>
                                
                    <div className={styles.CMV_upload_video_image_block}>
                        <div className={styles.CMV_upload_video_image}>
                            <Image
                                src="/CMV_upload_video.svg"
                                alt="next step ->"
                                fill={true}
                                priority
                            />
                        </div>
                        <div className={styles.select_content_video}>
                            <button id="video_button" className={styles.checkbox} onClick={choose_type_video}></button>
                            Upload video
                        </div>
                    </div>
                </div>
                <div className={styles.button_block}>
                    <button className={styles.CMV_Next_button} onClick={Choose_type}>
                        Next
                    </button>
                </div>
            </main>
        </>
    )
}
