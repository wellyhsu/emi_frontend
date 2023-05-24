import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

function choose_type_PPT(){
    document.getElementById("PPT_button").style = "  background-color: rgba(255,0 ,0 , 1);";
    document.getElementById("video_button").style = "  background-color: rgba(243, 241, 241, 1);";
}

function choose_type_video(){
    document.getElementById("PPT_button").style = "  background-color: rgba(243, 241, 241, 1);";
    document.getElementById("video_button").style = "  background-color: rgba(255,0 ,0 , 1);";
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
                <Link href="/upload_file_page">
                    <button className={styles.CMV_Next_button}>
                        Next
                    </button>
                </Link>

            </main>
        </>
    )
}
