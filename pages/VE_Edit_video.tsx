import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

export default function VE_Edit_video() {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.Edit_grid2}>
                    <div className={styles.Edit_left_part}>
                        <div className={styles.Start_making}>
                            Edit the script
                        </div>
                        <div className={styles.upload_file_title}>
                            Please select a voice and paste your script
                        </div>

                        
                        <iframe 
                            src='' 
                            width="500px" 
                            height="279px" 
                            frameBorder="0" 
                            className={styles.PPT}>
                        </iframe>
                        
                    </div>

                    <div className={styles.Edit_right_part}>
                        <div className={styles.Choose_voice}>
                            1.Please choose a digital voice 
                            <div>
                                <div className={styles.language_part}>
                                    <div className={styles.language}>
                                        language
                                    </div>
                                    <select className={styles.select}>
                                        <option></option>
                                        <option>English (Australia)</option>
                                        <option>English (India)</option>
                                        <option>Chineese</option>
                                    </select>
                                </div>

                                <div className={styles.Voice_part}>
                                    <div className={styles.Voice}>
                                        Voice
                                    </div>
                                    <select className={styles.select}>
                                        <option></option>
                                        <option>English</option>
                                        <option>Chineese</option>
                                    </select>
                                </div>

                                <button className={styles.Test_button}>
                                    Test
                                </button>
                            </div>
                        </div>   

                        <div className={styles.Input_script}>
                            <div className={styles.Input_script_word}>
                                2.Input the script
                            </div>
                            <textarea className={styles.Input_script_block}>
                                
                            </textarea>
                        </div>
                    </div>
                </div>

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
                

            </main>
        </>
    )
}
