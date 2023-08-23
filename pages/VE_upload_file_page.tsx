import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Script from 'next/script'
import Cookies from 'js-cookie';
//import upload from '../components/choose_file'

var T=0;
var Next_Link = process.env.NEXT_PUBLIC_VE_Create_no_script;
var fileData;
var fileName;
var fileType;
var fileSize;//檔案的大小
var fileTime;
const SPLIT_BYTES = 100*1024; //檔案以每1MB做切割
const CHUNK_SIZE = 100*1024; //檔案以每1MKB做切割
//var start = 0; //位元組數的開頭
//var end = SPLIT_BYTES; //位元組數的結束
//var count = fileSize % SPLIT_BYTES == 0 ? fileSize / SPLIT_BYTES : Math.floor(fileSize / SPLIT_BYTES) + 1;
//上述為計算一共會切出幾份檔案 
var video_Data;
var UserName;

function select_file(e) {
    console.log("press button");
    UserName = Cookies.get('userName');
    console.log(UserName);
    UserName = UserName?.substring(1, UserName?.lastIndexOf(`"`));  //" "中間字串

    console.log("UserName=", UserName);
    var inputFile = document.getElementById('customFileInput');
     
    inputFile.addEventListener('change', function(e) {
        fileData = e.target.files[0]; // 檔案資訊
        fileName = fileData.name; // 檔案名稱
        fileType = fileData.type; // 檔案類型
        fileSize = Math.ceil(fileData.size * 0.001); // 檔案大小轉成kb (無條件進位)
        fileTime = fileData.lastModifiedDate;   

        console.log("fileData=",fileData); // 用開發人員工具可看到資料
        console.log("fileName=",fileName); // 用開發人員工具可看到資料
        console.log("fileType=",fileType); // 用開發人員工具可看到資料
        console.log("fileSize=",fileSize); // 用開發人員工具可看到資料
        console.log("fileTime=",fileTime); // 用開發人員工具可看到資料

        if (!fileData) {
            return;
        }    
        document.getElementById('file_name').value = fileName;
    
    }, false);
}  

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

async function _chunkUploadTask(chunks) {   //上傳分割好的小段影片(依據切割長度發送請求次數)
    const results = [];   //儲存每一段影片上傳後的結果(成功/失敗)
    var Chunk_Number = 1;
    var Chunk_Final = false;
    var information;
    console.log('Length=',chunks.length);

    for (let chunk of chunks) {   //
        const fd = new FormData();   //宣告fd為FormData();

        //發送影片相關資訊到後端
        const Video_Information_send =
        {
            "username": UserName,
            "file-name": fileName,
            "file-type": fileType,
            "file-size": fileSize + "KB",
            "chunk-number": String(Chunk_Number),
            "chunk-final": String(Chunk_Final),  
        }

        var Video_Information_send_json = JSON.stringify(Video_Information_send);  //轉json格式
        console.log("account_send_json is " + Video_Information_send_json);
        console.log('account_send_json is ',typeof(Video_Information_send_json));

        fd.append('information', Video_Information_send_json);
        fd.append('chunk', chunk);     //把每一個chunk插入fd中
//檢查FormData內的內容 - 方法一       
        fd.forEach((key, value) => {
            console.log("value(標題)=",value,"key(內容)=",key);
        });
//檢查FormData內的內容 - 方法二
        for (const entry of fd.entries()) {
            console.log("test=", entry[0],"內容=", entry[1]);
          }

        try {
            if(Chunk_Number < chunks.length)
            {
                Chunk_Number = Chunk_Number + 1;
                if(Chunk_Number == chunks.length)
                {
                    Chunk_Final = true;
                }
            }

            console.log("fileName==",fileName);

            const response = await fetch(process.env.NEXT_PUBLIC_API_upload_video, {   //call後端的API
                method: 'POST',
                body: fd,    //傳送到後端的內容
            });

            if (response.ok) {
                console.log("response is ok!");
                const data = await response.json();   //取得後端回傳的資料
                results.push(data);    //將後端後端傳回的資料放到results
            } 
            else {
                console.log("response not ok.");
                results.push(null);
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

function upload_file(e){
    var information;
    var id;
    var title;
    var file_type;
    var upload=0;

    var intIdentifier = 1;
    var completed = 0;
//    var xhr = new self.XMLHttpRequest();

    file_type = fileName?.substring(fileName?.indexOf(".",0));  //取得副檔名
    
    console.log("file_type=",file_type);
    if(file_type == ".mp4" || file_type == ".MOV") //如果檔案 
    {
        //發送影片
        if(fileSize*1024 > SPLIT_BYTES)
        {
            slice(fileData, SPLIT_BYTES)
            .then(chunks => {
                // 在這裡對分塊進行後續處理
                console.log(chunks); // 輸出分塊陣列
                console.log('length=',chunks.length);
                console.log('type=',typeof(chunks));

                _chunkUploadTask(chunks)
                .then(results => {
                    // 处理上传结果
                    console.log(results);
                })
                .catch(error => {
                    // 处理错误
                    console.error(error);
                });
            })
            .catch(error => {
                // 處理錯誤
                console.error(error);
            });
        }
        else
        {
            const noSlice_fd = new FormData();   //宣告fd為FormData();
            noSlice_fd.append('Data', fileData);     //把每一個chunk插入fd中
      
            //fetch(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_login, {
            fetch(NEXT_PUBLIC_API_upload_video, {
                method: 'POST',
                body: noSlice_fd,
            })
                .then((response) => {
                    information = response.json();
                    console.log('info^^',information);
                    return information;
                })
                .then((data) => {
                    var msg = data["message"];

                    console.log('msg=',msg);
                    console.log('data=',data);
                    alert(msg);
            //        document.getElementById('number').textContent = '預測結果為 : ' + S_DATA;	
                    if(msg == "Login successful")
                    {
                        window.location.replace("/");
                    }
                })
                .catch((error) => console.log("error", error));

        }
   
    }
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
}

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

export default function VE_upload_file_page() {
    return (
        <div>
{/*            <Script
                src="../components/choose_file.js"
            />
*/}            <main className={styles.main}>
                <div className={styles.Start_making}>
                    Start making
                </div>
                <div className={styles.upload_script}>
                    Please choose whether upload your script.
                </div>
                <div className={styles.transcript_block}>
                    <button id="script_button" className={styles.checkbox} onClick={choose_upload_script}></button>
                    Upload transcript
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
                        <label htmlFor="customFileInput" className={styles.upload_block} onClick={select_file}>
                            <div className={styles.no_padding_center}>
                                <div>
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
                <div className={styles.upload_file_button}>
                    <div style={{float: "right"}}>
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
            </main>
        </div>
    )
}
