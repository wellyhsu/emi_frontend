import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Make_Video_Steps from '../components/Make_Video_Steps'
import Link from 'next/link'

export default function How_to_Make_video() {
    return (
        <>
            <main className={styles.main}>

                <div className={styles.center}>
                    <div>
                        <div className={styles.How_make_Video_title}>
                            How to make a Video
                        </div>
                        <div className={styles.How_make_Video_content}>
                            Follow the steps below and make your video
                        </div>
                        <div className={styles.steps}>
                            <div className={styles.make_video_step} style={{marginLeft: "10px"}}>
                                <Make_Video_Steps
                                    image="/HMakeVideo_upload_image.svg"
                                    image_alt="Upload image"
                                    title="Upload the slides or videos"
                                />
                                <div className={styles.make_video_step_content}>
                                    Reminder: <br/>
                                    the sound will be removed.
                                </div>
                            </div>
                            <div className={styles.next_step_image} style={{left: "16.5em"}}>
                                <Image
                                    src="/arrow_next.svg"
                                    alt="next step ->"
                                    width={60}
                                    height={60}
                                    priority
                                />
                            </div>
                            <div className={styles.make_video_step} style={{marginLeft: "20px"}}>
                                <Make_Video_Steps
                                    image="/HMV_voice_image.svg"
                                    image_alt="voice image"
                                    title="Select a voice"
                                />
                                <div className={styles.make_video_step_content}>
                                    Select a voice you like <br/>
                                    and apply to your videos.
                                </div>
                            </div>
                            <div className={styles.next_step_image} style={{left: "30.7em"}}>
                                <Image
                                    src="/arrow_next.svg"
                                    alt="next step ->"
                                    width={60}
                                    height={60}
                                    priority
                                />
                            </div>
                            <div className={styles.make_video_step} style={{marginLeft: "-30px"}}>
                                <Make_Video_Steps
                                    image="/HMV_Edit_cript_image.svg"
                                    image_alt="Edit script image"
                                    title="Edit the script"
                                />
                                <div className={styles.make_video_step_content}>
                                    Please upload <br/>
                                    your English script.
                                </div>
                            </div>
                            <div className={styles.next_step_image} style={{left: "45em"}}>
                                <Image
                                    src="/arrow_next.svg"
                                    alt="next step ->"
                                    width={60}
                                    height={60}
                                    priority
                                />
                            </div>
                            <div className={styles.make_video_step}>
                                <Make_Video_Steps
                                    image="/HMV_Insert_audio_image.svg"
                                    image_alt="Insert audio image"
                                    title="Insert the audio into your video"
                                />
                                <div className={styles.make_video_step_content}>
                                    Find the right time frame <br/>
                                    to insert your audio.
                                </div>
                            </div>
                            <div className={styles.next_step_image} style={{left: "62em"}}>
                                <Image
                                    src="/arrow_next.svg"
                                    alt="next step ->"
                                    width={60}
                                    height={60}
                                    priority
                                />
                            </div>
                            <div className={styles.make_video_step}>
                                <Make_Video_Steps
                                    image="/HMV_Done_image.svg"
                                    image_alt="Done image"
                                    title="Done!"
                                />
                                <div className={styles.make_video_step_content}>
                                    Export the video <br/>
                                    and you are ready for class!
                                </div>
                            </div>
                        </div>
                        <Link href={process.env.NEXT_PUBLIC_VE_Create}>
                            <button className={styles.HMV_Create_video_button}>
                                Create My Video
                            </button>
                        </Link>
                    </div>
                
                </div>

            </main>
        </>
    )
}
