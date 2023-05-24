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

function upload(e) {
    console.log("press button");
    var inputFile = document.getElementById('customFileInput');
  
    inputFile.addEventListener('change', function(e) {
    
      fileData = e.target.files[0]; // 檔案資訊
      fileName = fileData.name; // 檔案名稱
      fileType = fileData.type; // 檔案類型
      fileSize = Math.floor(fileData.size * 0.001); // 檔案大小轉成kb
      fileTime = fileData.lastModifiedDate;
    
      console.log("fileData=",fileData); // 用開發人員工具可看到資料
      console.log("fileName=",fileName); // 用開發人員工具可看到資料
      console.log("fileType=",fileType); // 用開發人員工具可看到資料
      console.log("fileSize",fileSize); // 用開發人員工具可看到資料
      console.log("fileTime",fileTime); // 用開發人員工具可看到資料
      
      if (!fileData) {
        return;
      }    
      document.getElementById('file_name').value = fileName;
    
    }, false);
}  

function upload_file(){
    var information;
    var id;
    var title;
    var description;
    var updated_at;
    var video_file;
    var file;

    var file_type;
    var Next_Link;

    file_type = fileName?.substring(fileName?.indexOf(".",0));  //取得副檔名
    
    console.log("file_type=",file_type);
    if(file_type == ".mp4" || file_type == ".MOV")
    {
        Next_Link = process.env.NEXT_PUBLIC_VE_Create_step3_video;  //VE_Edit_video
        
        const upload_videos_send =
        {
            "title": fileName,
            "description": "影片描述",
            "video_file": fileData,
        }

        var upload_videos_send_json = JSON.stringify(upload_videos_send);  //轉json格式
        console.log("upload_videos_send_json is " + upload_videos_send_json);
        console.log('upload_videos_send_json is ',typeof(upload_videos_send_json));
/*
        fetch("http://127.0.0.1:8000/videos/upload/", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: upload_videos_send_json,
        })
        .then((response) => {
            information = response.json();
            console.log('info^^',information);
            return information;
        })
        .then((data) => {
            id = data["id"];
            title = data["title"];
            description = data["description"];
            updated_at = data["updated_at"];
            video_file = data["video_file"];

            console.log('id=',data["id"]);
            console.log('title=',data["title"]);
            console.log('description=',data["description"]);
            console.log('updated_at=',data["updated_at"]);
            console.log('video_file=',data["video_file"]);

//            alert(data["detail"]);
        })
        .catch((error) => console.log("error", error));
    */    }
    else if(file_type == ".ppt" || file_type == ".pptx")
    {
        Next_Link = process.env.NEXT_PUBLIC_VE_Create_step3;  //VE_Edit_PPT
        const upload_ppts_send =
        {
            "title": fileName,
            "description": "影片描述",
            "file": fileData,
        }

        var upload_ppts_send_json = JSON.stringify(upload_ppts_send);  //轉json格式
        console.log("upload_ppts_send_json is " + upload_ppts_send_json);
        console.log('upload_ppts_send_json is ',typeof(upload_ppts_send_json));
/*
        fetch("http://127.0.0.1:8000/ppts/", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: upload_ppts_send_json,
        })
        .then((response) => {
            information = response.json();
            console.log('info^^',information);
            return information;
        })
        .then((data) => {
            id = data["id"];
            title = data["title"];
            file = data["file"];

            console.log('id=',data["id"]);
            console.log('title=',data["title"]);
            console.log('file=',data["file"]);

//            alert(data["detail"]);
        })
        .catch((error) => console.log("error", error));
    */
    }
    else if(file_type == "")
    {
        alert("Please choose a file.");
        return false
    }
    else
    {
        alert("The file type uncorrect!");
        return false
    }
    window.location.replace("/" + Next_Link);
}


export default function VE_upload_file_page() {
    return (
        <>
{/*            <Script
                src="../components/choose_file.js"
            />
*/}            <main className={styles.main}>
                <div className={styles.Start_making}>
                    Start making
                </div>
                <div className={styles.upload_file_title}>
                    Please upload your teaching material. (It might take a few minutes.)
                </div>
                <div className={styles.no_padding_center}>
                    <div className={styles.file_Name}>
                        Name:
                        <input type="text" id="file_name" className={styles.file_input}>

                        </input>

                    </div>
                </div>   
                <div className={styles.no_padding_center}>
                    <div className={styles.file}>
                        file:                            
                    </div>
                        <input id="customFileInput" className={styles.choose_file} type="file" accept="*.ppt, *.pptx, video/*"></input>
                        <label htmlFor="customFileInput" className={styles.upload_block} onClick={upload}>
                            <div className={styles.no_padding_center}>
                                <div>
                                    <div className={styles.upload_image}>
                                        <Image
                                            src="/Upload_cloud_image.svg"
                                            alt="Upload cloud image"
                                            width={115}
                                            height={115}
                                            priority
                                        />
                                    </div>
                                      Click here to upload or drag your file here to upload file
                                </div>
                            </div>
                        </label>
                </div>
                <div className={styles.upload_file_button}>
                    <button className={styles.UploadFile_Next_button} onClick={upload_file}>
                        Next
                    </button>
                    <Link 
                        href={{
                            pathname: '/[page]',
                            query: { page: process.env.NEXT_PUBLIC_VE_Create }
                            }}
                    >
                        <button className={styles.UploadFile_Back_button}>
                            Back
                        </button>
                    </Link>
                    
                </div> 
                

            </main>
            
        </>
    )
}
