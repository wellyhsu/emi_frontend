import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Script from 'next/script'
import Cookies from 'js-cookie';
import { useState, useRef } from 'react';
import { processing_worker } from '../public/javascript/processing_worker';
//import upload from '../components/choose_file'

var T=0;
var Next_Link = process.env.NEXT_PUBLIC_VE_Create_no_script;
var fileData;
var fileName="";
var fileType;
var fileSize;//檔案的大小
var fileTime;
var videolength=0;
var Metadata_token=""; 
const SPLIT_BYTES = 100*1024; //檔案以每100KB做切割
const CHUNK_SIZE = 100*1024; //檔案以每100KB做切割
//var start = 0; //位元組數的開頭
//var end = SPLIT_BYTES; //位元組數的結束
//var count = fileSize % SPLIT_BYTES == 0 ? fileSize / SPLIT_BYTES : Math.floor(fileSize / SPLIT_BYTES) + 1;
//上述為計算一共會切出幾份檔案 

var UserName="";
UserName = Cookies.get('userName');

//影片上傳完 優化處理也結束
function Finish()
{
    console.log("Now Cookies =", Cookies.get('video_path'))
    window.location.assign(process.env.NEXT_PUBLIC_Teacher_view_video);
}

//選擇要上傳的檔案
function select_file(e) {
    console.log("press button");

    console.log("UserName=", UserName);
    var inputFile = document.getElementById('customFileInput');
     
    inputFile.addEventListener('change', function(e) {
        fileData = e.target.files[0]; // 檔案資訊
        if (!fileData) {
            return;
        }  
        fileName = fileData.name; // 檔案名稱
        fileType = fileData.type; // 檔案類型
        fileSize = Math.ceil(fileData.size * 0.001); // 檔案大小轉成kb (無條件進位)
        fileTime = fileData.lastModifiedDate;   

        console.log("fileData=",fileData); // 用開發人員工具可看到資料
        console.log("fileName=",fileName); // 用開發人員工具可看到資料
        console.log("fileType=",fileType); // 用開發人員工具可看到資料
        console.log("fileSize=",fileSize); // 用開發人員工具可看到資料
        console.log("fileTime=",fileTime); // 用開發人員工具可看到資料

        document.getElementById('file_name').value = fileName;
        document.getElementById("video").src=URL.createObjectURL(fileData);    

    }, false);

    document.getElementById("video").addEventListener('loadedmetadata', function () {
        videolength = Math.floor(document.getElementById("video").duration);
        console.log("video length: ", videolength);
    })   
}  

/*
//選擇是否上傳文字腳本檔
function choose_upload_script(){
    if(T==0)
    {
        T=1;
        document.getElementById("script_button").style = "  background-color: rgba(255,0 ,0 , 1);";
        Next_Link = process.env.NEXT_PUBLIC_VE_Create_step3_video;  //VE_Edit_video
    }
    else
    {
        T=0;
        document.getElementById("script_button").style = "  background-color: rgba(243, 241, 241, 1);";
        Next_Link = process.env.NEXT_PUBLIC_VE_Create_no_script;  //VE_Edit_video
    }
    console.log("T=",T);
}
*/

export default function VE_upload_file_page() {
    const [transform_degree, Set_transform_degree] = useState(0);
    const [Progress_Number, SetProgress_Number] = useState(0);
    const videoTitleRef = useRef(undefined);

    function updateProgress(value) {
        //取得目前影片上傳進度
        console.log("Current Progress:", value.video_upload_progress);
        SetProgress_Number(value.video_upload_progress);
    }

    function upload_file(e){
        var information;
        var id;
        var title;
        var file_type;
        var upload=0;

        if(videoTitleRef.current.value == "")
        {
            alert("Please input the Video title.");
            return false;
        }

        Cookies.set('Get_video_path', "false");
        console.log("file_type=",fileType); 
        
        if(fileType == ".mp4" || fileType == ".MP4" || fileType == "video/mp4" || fileType == ".MOV") //如果檔案 
        {
            SetProgress_Number(0);
            processing_worker(fileData, fileName, fileType, fileSize, videolength, Cookies.get('userName'), Cookies.get('user_RID'), SPLIT_BYTES, videoTitleRef.current.value, Metadata_token, updateProgress);
        }
        else if(fileType == "")
        {
            alert("Please choose a file.");
            return false
        }
        else
        {
            alert("The file type uncorrect!");
            return false
        }
        document.getElementById('uploading').style = "display: flex";
    }

    return (
        <main className={styles.main}>
            <div id="uploading" style={{height: "100%",display: "none"}}>
                <div className={styles.question_background}>
                    <div className={styles.pop_up_loading_window}>
                        <button id="small_upload_window" className={styles.small_window}>
                            _
                        </button>
                        <div className={styles.uploading_text} >
                            uploading...
                        </div>
                        <div className={styles.Circle_bottom}>
                            <div className={styles.Number}>
                                {Progress_Number}%
                            </div>
                        </div>
                        
                        <div className={styles.right}>
                            <div id='Circle_up_R' className={styles.Circle_up_R}>
                            </div>
                        </div>
                        <div className={styles.left}>
                            <div id='Circle_up_L' className={styles.Circle_up_L}>
                            </div>
                        </div>
                        <div style={{display: "flex", marginTop: "1em"}}>
                            <div style={{marginLeft: "auto", marginRight: "auto"}}>
                                <button id="upload_Cancel" style={{marginLeft: "3em"}} className={styles.uploading_Cancel_button}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="video_processing" style={{height: "100%",display: "none"}}>
                <div className={styles.question_background}>
                    <div className={styles.pop_up_loading_window}>
                        <button id="small_process_window" className={styles.small_window}>
                            _
                        </button>
                        <div className={styles.upload_finish} >
                            video upload finish
                        </div>
                        <div className={styles.video_processing}>
                            video processing...
                        </div>
                        
                        <div style={{display: "flex", marginTop: "4em"}}>
                            <div style={{marginLeft: "auto", marginRight: "auto"}}>
                                <button id="process_Cancel" style={{marginLeft: "3em"}} className={styles.uploading_Cancel_button}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="finish" style={{height: "100%",display: "none"}}>
                <div className={styles.question_background}>
                    <div className={styles.pop_up_loading_window}>
                        <div className={styles.process_finish} >
                            Video process finish !!
                        </div>
                        
                        <div style={{display: "flex", marginTop: "4em"}}>
                            <div style={{marginLeft: "auto", marginRight: "auto"}}>
                                <button id="Finish" className={styles.uploading_Finish_button} onClick={Finish}>
                                    Finish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className={styles.no_padding_center}>
                <div style={{marginLeft: "-4em"}}>
                    <div className={styles.Start_making}>
                        Start making
                    </div>
{/*                    
                    <div className={styles.upload_script}>
                        Please choose whether upload your script.
                    </div>
                    <div className={styles.transcript_block}>
                        <button id="script_button" className={styles.checkbox} onClick={choose_upload_script}></button>
                        Upload transcript
                    </div>
*/} 
                    <div className={styles.upload_file_title}>
                        Please upload your teaching material. (It might take a few minutes.)
                    </div>
                    <div className={styles.file_Name} style={{marginLeft: "6em"}}>
                        Video Title:
                        <input type="text" id="video_name" ref={videoTitleRef} className={styles.file_input}>

                        </input>
                    </div>
                    <div className={styles.file_Name}>
                        File Name:
                        <input type="text"  readOnly="readOnly" id="file_name" className={styles.file_input} style={{cursor: "not-allowed"}}>

                        </input>
                    </div>
 
                    <div style={{marginLeft: "15em"}}/* className={styles.no_padding_center}*/  > 
                        <div className={styles.file}>
                            file:                            
                        </div>  
                        <input id="customFileInput" className={styles.choose_file} type="file" accept="*.ppt, *.pptx, video/*"></input>
                        <label htmlFor="customFileInput" className={styles.upload_block} onClick={select_file}>
                            <div className={styles.no_padding_center}>
                                <div>
                                    <div>
                                        <video 
                                            id="video"
                                            poster=""
                                            autoPlay={false}
                                            controls={true} 
                                            style={{display: "none"}}
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <div className={styles.upload_image}>
                                        <Image
                                            src="/Upload_cloud_image.svg"
                                            alt="Upload cloud image"
                                            fill={true}
                                            priority
                                        />
                                    </div>
                                    Click here to upload your file 
                                </div>
                            </div>
                        </label>
                    </div>  
                </div>
            </div>
            <div className={styles.upload_file_button}>
                <div style={{display: "flex", width: "100%"}}>
                    <div style={{marginLeft: "auto", marginRight: "auto"}}>
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
                        <button className={styles.UploadFile_Next_button} onClick={upload_file}>
                            Next
                        </button>
                    </div>
                </div>
            </div>  
        </main>
    )
}
