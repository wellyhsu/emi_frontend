import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import React, {useRef} from "react";
import Cookies from 'js-cookie'; 



export default function VE_Edit_video() {
    var information;
    const acapela_token = Cookies.get('acapela_token');

    return (
        <>
            <main className={styles.main}>
                <div className={styles.Start_making}>
                    Edit the script
                </div>
                <div className={styles.upload_file_title}>
                    Please select a voice and paste your script
                </div>
                <div className={styles.no_padding_center}>
                    <video 
                        src=""//"白熊咖啡厅第三集cut.mp4"
                        poster=""
                        width="500" 
                        height="348" 
                        autoPlay={false} 
                        controls={true} 
                    />
                </div>
                <div style={{height: "8vh",backgroundColor:"white",marginBottom: "20px"}}>
                    <div className={styles.upload_file_button}>                    
                        <Link 
                            href={{
                                pathname: '/[page]',
                                query: { page: process.env.NEXT_PUBLIC_VE_Create_step2 }
                                }}
                        >
                            <button className={styles.UploadFile_Back_button}>
                                Back
                            </button>
                        </Link>
                        <Link 
                            href="upload_file_page"
                        >
                            <button className={styles.UploadFile_Next_button}>
                                Next
                            </button>
                        </Link>
                    </div> 
                
                </div>
            </main>
        </>
    )
}
