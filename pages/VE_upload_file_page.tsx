import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Script from 'next/script'
import Cookies from 'js-cookie';
import { useState, useRef } from 'react';
import { CLIENT_STATIC_FILES_PATH } from 'next/dist/shared/lib/constants';
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

var status="";
var video_path="";
var video_id;
var video_RID;
var API_video_RID;

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

    fetch("http://34.173.16.63:30036/api/video/cancel", {            
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
    fetch("http://34.173.16.63:30036/api/video/cancel", {            
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

//將影片分割
export const slice = (file, piece = CHUNK_SIZE) => {   //切割
    return new Promise((resolve, reject) => {
        let totalSize = file.size;  //取得檔案大小
        const chunks = [];   //宣告一個陣列存放切割下來的chunk                   //Safari 中是 blob.webkitSlice()
        const blobSlice = File.prototype.slice || File.prototype.webkitSlice; //根據瀏覽器的不同，它指向適當的切片方法。
        let start = 0;   //宣告開始切割的位址
        var end;
        end = start + piece >= totalSize ? totalSize : start + piece; //取得最後的位置

        while (start < totalSize) {
            const chunk = blobSlice.call(file, start, end);   //把fileData切割成一個一個的chunk
            chunks.push(chunk); //霸切割除來的chunk放進chunks陣列

            start = end;   //從這一次結束的位址開始下一次切割
            end = start + piece >= totalSize ? totalSize : start + piece;
        }
      
      resolve(chunks);
    });
};

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

    //每兩秒打一次後端 看後端任務結束了嗎？
    async function performSomeAsyncOperation() {
        // 執行需要等待的異步操作
        console.log("Cancel =",cancel);
        const Response = await fetch("http://34.173.16.63:30000/api/video/status");  //打API取得影片後端傳來的路徑
        const data = await Response.json();   //取得影片後端傳來的路徑資料
        
        console.log("API data=", data)
        status = data["status"];
        video_path = data["processed_video_path"];
        API_video_RID = data["RID"];

        console.log("Frontend video_path=",video_path,
                    "Frontend status", status,
                    "Frontend API_video_RID", API_video_RID
                    );
                    
        console.log("UserName",UserName);
        console.log("fileName",fileName);
    }

    async function checkProcessingStatus() {
        console.log("打後端Next.js API!!");
        document.getElementById('uploading').style = "display: none";

        //GET 打後端Next.js API

        const call_API = setInterval(() => {
            performSomeAsyncOperation();
            console.log("check_call_API_timeinterval_number=", call_API);

            if( cancel == 1 || (status == "completed" && video_path == "/home/shared/processed_category_videos/" + UserName + "_" + Cookies.get('user_RID') + "/" + fileName) )
            {
                console.log("CANCEL_call_API_number=", call_API);
                clearInterval(call_API);  //清除計數器
            }
    //        if( cancel == 0 && status == "completed" && video_RID == API_video_RID)  //若點擊了取消按鈕 不繼續打API

            if( cancel == 0 && status == "completed" && video_path == "/home/shared/processed_category_videos/" + UserName + "_" + Cookies.get('user_RID') + "/" + fileName)  //若點擊了取消按鈕 不繼續打API
            {
                document.getElementById('video_processing').style = "display: none";
                document.getElementById('finish').style = "display: flex";

                console.log('API get video_path data= ', video_path);  //顯示取得的data

                Cookies.set('video_path', video_path);
                console.log('Cookies video_path=', Cookies.get('video_path'));
            }            
        }, 2000); // 這裡模擬等待 2 秒 週期循環執行  

        

    }

    //上傳分割好的小段影片(依據切割長度發送請求次數)
    async function _chunkUploadTask(chunks) {   
        const results = [];   //儲存每一段影片上傳後的結果(成功/失敗)
        var Chunk_Number = 1;
        var Chunk_Final = false;
        var information;
    //    var transform_degree;
    
        console.log('Length=',chunks.length);
        console.log("fileName==",fileName);
        console.log("GET MetaDataToken", JSON.stringify(Metadata_token));
        SetProgress_Number(0);
    
        for (let chunk of chunks) {   //
            const fd = new FormData();   //宣告fd為FormData();
    
            if(Chunk_Number == chunks.length)
            {
                Chunk_Final = true;
            }
            //發送影片相關資訊到後端(Golang)
            const Video_Information_send =
            {
                "username": UserName,
                "video_title": videoTitleRef.current.value,
                "video_name": fileName,
                "video_description": "none",
                "video_length": videolength,
                "video_size": fileSize,
                "video_format": "video/mp4",
                "chunk_number": String(Chunk_Number),
                "chunk_final": String(Chunk_Final), 
                "user_RID": Cookies.get('user_RID'), 
            }
    
            var Video_Information_send_json = JSON.stringify(Video_Information_send);  //轉json格式
            console.log("account_send_json is " + Video_Information_send_json);
    
            fd.append('information', Video_Information_send_json);
            fd.append('chunk', chunk);     //把每一個chunk插入fd中
    /*檢查FormData內的內容 - 方法一       
            fd.forEach((key, value) => {
                console.log("value(標題)=",value,"key(內容)=",key);
            });
    //檢查FormData內的內容 - 方法二
            for (const entry of fd.entries()) {
                console.log("test=", entry[0],"內容=", entry[1]);
              }
    */
            try 
            {    
                if(cancel == 0)
                {
                    console.log("POST (http://34.173.16.63:30036/api/video/upload)");
                    const response = await fetch("http://34.173.16.63:30036/api/video/upload"/*process.env.NEXT_PUBLIC_API_upload_video*/, {   //call後端的API
                        method: 'POST',
                        headers:{
                            "Metadata-Token": Metadata_token,
                        },
                        body: fd,    //傳送到後端的內容
                    });
    
                    if (response.ok) {
                        SetProgress_Number(((100/chunks.length) * Chunk_Number).toFixed(0));
                        console.log("response is ok!");
        
                        var data;
                        data = await response.json();   //取得後端回傳的資料
                        console.log("data=", data);
                        if(Chunk_Number == chunks.length)
                        {   
                            video_RID = data['video_RID'];
                        //    console.log("Video RID= ", video_RID);
                            
                            document.getElementById('video_processing').style = "display: inline-block";

                            // 開始檢查後端影片處理狀態
                            checkProcessingStatus();
                        }  
                        else
                        {
                            Chunk_Number = Chunk_Number + 1;
                        } 
                        results.push(data);    //將後端後端傳回的資料放到results
    
                        Set_transform_degree(transform_degree + 360/chunks.length);
                        if(Chunk_Number <= chunks.length/2)
                        {
                            document.getElementById('Circle_up_R').style = "transform: `${transform_degree}deg`; ";
                
                        }
                        else if(Chunk_Number > chunks.length/2)
                        {
                            document.getElementById('Circle_up_R').style = "transform: 90deg; ";
                            document.getElementById('Circle_up_L').style = "transform: `${transform_degree-180}deg`; ";
                        }
    
                    } 
                    else {
                        console.log("response not ok.");
                        results.push(null);
                        Chunk_Number = Chunk_Number + 1;
                    }

                }
                else    //cancel =1 代表取消
                {
                    console.log("cancel", Chunk_Number-1, "chumk uplaod!");
                    video_RID="";
                    break;
                }
      
            } 
            catch (err) {    //如果發生錯誤
                results.push(null);    //不放入資料 留空白
                console.log("error=", err);
            }
            console.log('chunknumber=',Chunk_Number);
            console.log('chunkfinal=',Chunk_Final);
        }
        return results;
    }
    
    async function sendMetadata()
    {
        //發送metadata到後端
        const Video_metadata_send =
        {
            "video_name": fileName,
            "video_type": fileType,
            "video_length": videolength,
            "video_size": fileSize,
            "user_RID": Cookies.get('user_RID'),
            "username": UserName,
        }
    
        var Video_metadata_send_json = JSON.stringify(Video_metadata_send);  //轉json格式
        console.log("Video_metadata_send_json is " + Video_metadata_send_json);
    
        try 
        {
            //傳送metadata到後端
            const metadata_response = await fetch("http://34.173.16.63:30031/api/metadata/generate_token", {            
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: Video_metadata_send_json,
            });
                
            if(metadata_response.ok)
            {
                const data = await metadata_response.json();
                console.log('data=', data);
                console.log("data['Metadata_Token']",data['Metadata_Token']);
                Cookies.set('Metadata_Token',data['Metadata_Token']);
                Metadata_token = Cookies.get('Metadata_Token');
                console.log("SET Cookies Metadata_token-> ", Metadata_token);
    
                if(fileSize*1024 > SPLIT_BYTES)
                {
                    console.log('Slice video.');
                    slice(fileData, SPLIT_BYTES)
                    .then(chunks => {
                        // 在這裡對分塊進行後續處理
                        console.log('chunks=', chunks); // 輸出分塊陣列
                        console.log('length=',chunks.length);
                        console.log('type=',typeof(chunks));
    
                        _chunkUploadTask(chunks)
                        .then(results => {
                            // 处理上传结果
                            console.log("_chunkUploadTask result: ",results);
                        })
                        .catch(error => {
                            // 处理错误
                            console.error("_chunkUploadTask error", error);
                        });
                    })
                    .catch(error => {
                        // 處理錯誤
                        console.error("slice error", error);
                    });
                }
                else
                {
                    console.log('Not Slice video.');
                    const noSlice_fd = new FormData();   //宣告fd為FormData();
                    noSlice_fd.append('Data', fileData);     //把每一個chunk插入fd中
            
                    //fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_login, {
                    fetch(NEXT_PUBLIC_API_upload_video, {
                        method: 'POST',
                        body: noSlice_fd,
                    })
                        .then((response) => {
                            information = response.json();
                            console.log('no slice upload information=',information);
                            return information;
                        })
                        .then((data) => {
                            console.log('data=',data);
                        })
                        .catch((error) => console.log("error", error));
                }
            }
            else 
            {
                console.log("response not ok.");
            }
    
            console.log("Metadata_Token=", Metadata_token);
        }  
        catch (err) {    //如果發生錯誤
            console.log("try error=", err);
        }
    }
    
    function upload_file(e){
        var information;
        var id;
        var title;
        var file_type;
        var upload=0;
/*  TEST
        checkProcessingStatus();
        const call_API = setInterval(() => {
            performSomeAsyncOperation();
        }, 2000); // 這裡模擬等待 2 秒  

    TEST    
*/

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
            sendMetadata();    //發送MetaData到後端
        }
/*        else if(file_type == ".ppt" || file_type == ".pptx")
        {
            Next_Link = process.env.NEXT_PUBLIC_VE_Create_step3;  //VE_Edit_PPT
            
    
            fetch("http://127.0.0.1:8000/ppts/", {
    
        
        }
*/        
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
            <div id="uploading" style={{height: "100%",display: "none"}}>
                <div className={styles.question_background}>
                    <div className={styles.pop_up_loading_window}>
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
                                <button style={{marginLeft: "3em"}} className={styles.uploading_Cancel_button} onClick={cancel_upload}>
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
                                <button style={{marginLeft: "3em"}} className={styles.uploading_Cancel_button} onClick={cancel_video_processing}>
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
                        <input type="text"  readonly="readonly" id="file_name" className={styles.file_input} style={{cursor: "not-allowed"}}>

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
