import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'


var Next_Link="/VE_Editor_PPT";
/*
function Next_Page(){
    if( == )  //if choose PPT
        Next_Link="/VE_Editor_PPT"
    else  if()     //if choose video
        Next_Link="/VE_Editor_video"
}
*/


export default function How_to_Make_video() {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.Start_making}>
                    Start making
                </div>
                <div className={styles.upload_file_title}>
                    Please upload your teaching material. (It might take a few minutes.)
                </div>
                <div className={styles.no_padding_center}>
                    <div className={styles.file_Name}>
                        Name:
                        <input type="text" className={styles.file_input}>

                        </input>

                    </div>
                </div>   
                <div className={styles.no_padding_center}>
                    <div className={styles.file}>
                        file:                            
                    </div>
                    <div className={styles.file_upload}>
                        <div className={styles.upload_block}>
                            <div className={styles.no_padding_center}>
                                <div style={{display: "inline", marginTop: "10%"}}>
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
                        </div>

                    </div>
                </div>
                <div className={styles.upload_file_button}>
                    <Link href="/VE_Create_My_video">
                        <button className={styles.UploadFile_Back_button}>
                            Back
                        </button>
                    </Link>
                    <Link href={Next_Link}>
                        <button className={styles.UploadFile_Next_button}>
                            Next
                        </button>
                    </Link>
                </div> 
                

            </main>
        </>
    )
}
