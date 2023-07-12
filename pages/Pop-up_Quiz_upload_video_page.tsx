import Image from 'next/image'
import Link from 'next/link'
import Cookies from 'js-cookie'; 
import { useEffect } from 'react';
import styles from '@/styles/Home.module.css'

var fileData;
var fileName;
var fileType;
var fileSize;
var fileTime;
var number=0;

function NO_logibn(){
  if(number==0)
  {
    alert("Please Log in, thanks!"); 
  }
  number = number + 1;
}

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
      document.getElementById('file_Name_or_link').value = fileName;
      
    }, false);
}  

export default function How_to_Make_video() {
    
    useEffect(() => {
        console.log("useEffect triggered");
        const token = Cookies.get('token');
        console.log("cookies=",token);
        if(token == null || token == "null")
        {
          NO_logibn();
          window.location.replace("/"+ process.env.NEXT_PUBLIC_Log_in);
        }
      }, [])

    return (
        <>
            <main className={styles.main}>
                <div className={styles.upload_file_title}>
                    Please paste the link of a Youtube video or upload your video. (It might take a few minutes.)
                </div>
                <div className={styles.no_padding_center}>
                    <div >
                        <input type="text" id="file_Name_or_link"  placeholder='Please paste the link of a Youtube video' className={styles.Youtube_link_input}>

                        </input>
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
                </div>    
                <Link 
                    href={{
                        pathname: '/[page]',
                        query: { page: process.env.NEXT_PUBLIC_PopUpQuiz_Preview_my_video }
                        }}
                >
                    <button className={styles.CMV_Next_button}>
                        Next
                    </button>
                </Link>

            </main>
        </>
    )
}
