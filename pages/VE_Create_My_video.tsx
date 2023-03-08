import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { json } from 'stream/consumers';


var type = "nothing";

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


function Choose_type() {    //上傳圖片按鈕
	console.log('press type')
    console.log("type is " + type);

    if(type == "nothing")
    {
        alert("Please choose the type of upload file");
        return false;
    }

    var type_choose_send =
    {
      "type" : type,   
    };
    var type_choose_send_json = JSON.stringify(type_choose_send);  //轉json格式
    console.log("type_choose_send is " + type_choose_send_json);
    console.log('type_choose_send is ',typeof(type_choose_send_json));

    fetch("http://localhost:3000/upload_file_page", {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: type_choose_send_json,
    })
      .then((response) => {
/*        information = response.json();
        console.log('info^^',information);
        return information;
*/      })
      .then((data) => {
/*        S_DATA = data["Prediction"]
        console.log('data',data["Prediction"]);
        console.log('data Type',typeof(data));*/
//        document.getElementById('number').textContent = '預測結果為 : ' + S_DATA;	
      })
      .catch((error) => console.log("error", error));
  	
      window.location.assign("./upload_file_page");
  }


export default function How_to_Make_video() {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.Choose_file_type}>
                    Choose the type of upload file
                </div>
                        
                <div className={styles.CMV_upload_PPT_image} >
                    <Image
                        src="/CMV_upload_PPT.svg"
                        alt="upload video image"
                        width={312}
                        height={300}
                        priority
                    />
                    <div className={styles.select_content_PPT}>
                        <button id="PPT_button" className={styles.checkbox} onClick={choose_type_PPT}></button>
                        Upload PPT
                    </div>
                </div>
                            
                <div className={styles.CMV_upload_video_image}>
                    <Image
                        src="/CMV_upload_video.svg"
                        alt="next step ->"
                        width={250}
                        height={250}
                        priority
                    />
                    <div className={styles.select_content_video}>
                        <button id="video_button" className={styles.checkbox} onClick={choose_type_video}></button>
                        Upload video
                    </div>
                </div>
                <button className={styles.CMV_Next_button} onClick={Choose_type}>
                    Next
                </button>

            </main>
        </>
    )
}
