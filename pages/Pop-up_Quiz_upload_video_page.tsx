import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

/*
function choose_type_PPT(){
    document.getElementById("PPT_button").style = "  background-color: rgba(255,0 ,0 , 1);";
    document.getElementById("video_button").style = "  background-color: rgba(243, 241, 241, 1);";
}
*/

export default function How_to_Make_video() {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.upload_file_title}>
                    Please paste the link of a Youtube video or upload your video. (It might take a few minutes.)
                </div>
                <div className={styles.no_padding_center}>
                    <div>
                        <input type="text" placeholder='Please paste the link of a Youtube video' className={styles.Youtube_link_input}>

                        </input>

                    </div>
                </div>    
                <Link 
                    href={{
                        pathname: '/[page]',
                        query: { page: "/" }
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
