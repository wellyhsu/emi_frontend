import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Script from 'next/script'
import Cookies from 'js-cookie';
import { useState, useRef } from 'react';
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
var cancel = 0;

//上傳影片到資料庫後端的取消功能
function cancel_upload()
{
    var information;

    document.getElementById("uploading").style = "display: none";
    cancel = 1;

    const Cancel = new FormData();   //宣告Cancel為FormData();
    Cancel.append('username', UserName);     //把username插入fd中
    Cancel.append('video_name', fileName);     //把video_name插入fd中
    Cancel.append('user_RID', Cookies.get('user_RID'));     //把video_name插入fd中

    //檢查FormData內的內容 - 方法一
    Cancel.forEach((key, value) => {
        console.log("value(標題)=",value,"key(內容)=",key);
    });

    fetch("http://34.96.232.169:30036/api/video/cancel", {            
        method: 'POST',
        headers:{
            "Metadata-Token": Metadata_token,
        },
        body: Cancel,
    })
        .then((response) => {
            information = response.json();
            console.log('API cancel information=',information);
            return information;
        })
        .then((data) => {
            console.log('API cancel data=', data);
        })
        .catch((error) => console.log("error", error));
}

//影片進行優化處理時的取消
function cancel_video_processing()
{
    var information;

    document.getElementById("video_processing").style = "display: none";
    
    cancel = 1;   //代表不繼續上傳
    console.log("processing_cancel=", cancel);

    const Cancel = new FormData();   //宣告fd為FormData();
    Cancel.append('username', UserName);     //把每一個chunk插入fd中
    Cancel.append('video_name', fileName);     //把每一個chunk插入fd中
    Cancel.append('user_RID', Cookies.get('user_RID'));     //把video_name插入fd中

    //檢查FormData內的內容 - 方法一       
    Cancel.forEach((key, value) => {
        console.log("value(標題)=",value,"key(內容)=",key);
    });

    //打取消上傳影片的API
    fetch("http://34.96.232.169:30036/api/video/cancel", {            
        method: 'POST',
        headers:{
            "Metadata-Token": Metadata_token,
        },
        body: Cancel,
    })
        .then((response) => {
            information = response.json(); 
            console.log('API cancel information=',information);
            return information;
        })
        .then((data) => {
            console.log('API cancel data=', data);
        })
        .catch((error) => console.log("error", error));
}

//影片上傳完 優化處理也結束
function Finish()
{
    console.log("Now Cookies =", Cookies.get('video_path'))
    window.location.assign(process.env.NEXT_PUBLIC_Teacher_view_video);
}

//選擇要上傳的檔案
function select_file(e) {
    cancel = 0;
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

function small_window()
{
    console.log("縮小視窗！");
    document.getElementById('uploading').style = "display: none";
    document.getElementById('video_processing').style = "display: none";
    Cookies.set('Uploading_video', "true");
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
    
        file_type = fileName?.substring(fileName?.lastIndexOf(`.`));  //取得副檔名
        console.log("file_type=",file_type); 
    
    
        if(file_type == ".mp4" || file_type == ".MP4" || file_type == "video/mp4" || file_type == ".MOV") //如果檔案 
        {
            const worker = new Worker('/javascript/worker.js');

            console.log("執行worker 背景執行上傳任務");
            SetProgress_Number(0);
            var data={
                fileData: fileData,
                fileName: fileName,
                fileType: fileType,
                fileSize: fileSize,
                videolength: videolength,
                UserName: UserName,
                user_RID: Cookies.get('user_RID'),
                SPLIT_BYTES: SPLIT_BYTES,
                videoTitle: videoTitleRef.current.value,
            };
            worker.postMessage(data);
            // 继续执行其他代码，不会阻塞

            //Check 使用者是否點擊cancel按鈕
            let btn_upload_cancel = document.getElementById('upload_Cancel');
            let btn_process_cancel = document.getElementById('process_Cancel');            
            
            //將on-event綁定在事件上
            btn_upload_cancel.onclick = function(){
                console.log('add listening on upload cancel button.');
                cancel_upload();
                worker.postMessage({ Status: 'terminate' });
            };

            btn_process_cancel.onclick = function(){
                console.log('add listening on process cancel button.');
                cancel_video_processing();
                worker.postMessage({ Status: 'terminate' });
            };
            
            //接收worker執行完成後的結果
            worker.onmessage = function (event) {
                const type = event.data.type;

                if(type == "video_upload")
                {
                    const video_upload_progress = event.data.video_upload_progress;
                    const video_upload_status = event.data.video_upload;
                    SetProgress_Number(video_upload_progress);
                    console.log("video_upload_progress=", video_upload_progress);
                    
                //影片成功上傳至資料庫                   
                    if(video_upload_status == "finish")
                    {
                        document.getElementById('uploading').style = "display: none";
                        document.getElementById('video_processing').style = "display: inline-block";

                    }
                }
                else if(type == "video_process")
                {
                    const result = event.data.video_process;    
                    console.log("relust=", result);
                //影片完整處理完畢
                    if(result['video_process'] == "finish")
                    {
                        document.getElementById('video_processing').style = "display: none";
                        document.getElementById('finish').style = "display: flex";    
                    }
                }
            };
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

        document.getElementById('uploading').style = "display: flex";
    }

    return (
        <main className={styles.main}>
            <div id="uploading" style={{height: "100%",display: "inline-block"}}>
                <div className={styles.question_background}>
                    <div className={styles.pop_up_loading_window}>
                    <button className={styles.small_window} onClick={small_window}>
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
                                <button id="upload_Cancel" style={{marginLeft: "3em"}} className={styles.uploading_Cancel_button} onClick={cancel_upload}>
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
                        <div className={styles.upload_finish} >
                            video upload finish
                        </div>
                        <div className={styles.video_processing}>
                            video processing...
                        </div>
                        
                        <div style={{display: "flex", marginTop: "4em"}}>
                            <div style={{marginLeft: "auto", marginRight: "auto"}}>
                                <button id="process_Cancel" style={{marginLeft: "3em"}} className={styles.uploading_Cancel_button} onClick={cancel_video_processing}>
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
                        <input type="text"  readOnly="readonly" id="file_name" className={styles.file_input} style={{cursor: "not-allowed"}}>

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
