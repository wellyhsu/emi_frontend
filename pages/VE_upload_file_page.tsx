import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Script from 'next/script'
//import upload from '../components/choose_file'


function upload(e) {
    console.log("press button");
    var inputFile = document.getElementById('customFileInput');
  
    inputFile.addEventListener('change', function(e) {
    
      var fileData = e.target.files[0]; // 檔案資訊
      var fileName = fileData.name; // 檔案名稱
      var fileType = fileData.type; // 檔案類型
      var fileSize = Math.floor(fileData.size * 0.001); // 檔案大小轉成kb
      var fileTime = fileData.lastModifiedDate;
    
      console.log(fileData); // 用開發人員工具可看到資料
    
      if (!fileData) {
        return;
      }    
      document.getElementById('file_name').value = fileName;
    
    }, false);
  }  

function upload_file(){
    var file_type;
    var Next_Link;

    file_type = document.getElementById('file_name').value;
    file_type = file_type?.substring(file_type?.indexOf(".",0));  //取得副檔名
    
    console.log("file_type=",file_type);
    if(file_type == ".mp4" || file_type == ".MOV")
    {
        Next_Link = process.env.NEXT_PUBLIC_VE_Create_step3_video;  //VE_Edit_video
    }
    else if(file_type == ".ppt" || file_type == ".pptx")
    {
        Next_Link = process.env.NEXT_PUBLIC_VE_Create_step3;  //VE_Edit_PPT
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


export default function How_to_Make_video() {
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
                

            </main>
            
        </>
    )
}
