import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

export default function How_to_Make_video() {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.Start_making}>
                    Edit the script
                </div>
                <div className={styles.upload_file_title}>
                    Please select a voice and paste your script
                </div>

                <div className={styles.Choose_voice}>
                    1.Please choose a digital voice 

                    <button className={styles.Test_button}>
                        Test
                    </button>
                </div>   

                    
                <div className={styles.Input_script}>
                    <div className={styles.Input_script_word}>
                        2.Input the script
                    </div>
                    <textarea className={styles.Input_script_block}>
                        
                    </textarea>

                </div>


                <div className={styles.upload_file_button}>
                    <Link href="/upload_file_page">
                        <button className={styles.UploadFile_Back_button}>
                            Back
                        </button>
                    </Link>
                    <Link href="upload_file_page">
                        <button className={styles.UploadFile_Next_button}>
                            Next
                        </button>
                    </Link>
                </div> 
                

            </main>
        </>
    )
}
