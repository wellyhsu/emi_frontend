import React from 'react'   
import Image from 'next/image'
import styles from '@/styles/Home.module.css'


function OK(){
    document.getElementById("preview_video").style= "display : none;" ;
}

function add_quiz(){
    window.location.replace(process.env.NEXT_PUBLIC_PoPup_Quiz_Modify_video);
}

function video_optimize(){
    window.location.replace(process.env.NEXT_PUBLIC_PoPup_Quiz_Modify_video);
}

class Archive_video extends React.Component {
    render() { 
        return (
            <>
            <div id="preview_video" className={styles.preview_video_background}>
                <div className={styles.preview_video_window}>
                    <div className={styles.preview_video}>
                        <div>
                            <video 
                                src={this.props.videoPath}
                                poster=""
                                autoPlay={false}
                                controls={true} 
                                width="500em"
                                height="auto"
                            />
                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <button id={this.props.button_id} className={styles.preview_video_button} onClick={this.props.Deletefunction}>
                            Delete 
                        </button>
                        <button className={styles.preview_video_button} onClick={add_quiz}>
                            add quiz 
                        </button>
                        <button className={styles.preview_video_button} onClick={video_optimize}>
                            Voice<br/>
                            optimization
                        </button>
                        <button className={styles.preview_video_button} onClick={OK}>
                            Ok 
                        </button>
                    </div>
                </div>
            </div>

            <button className={styles.Drafts_block} onClick={this.props.view_video}>
                <>
                    <div className={styles.Drafts_play_button}>
                        <Image
                            src="/play-button.svg"
                            alt="play-button image"
                            width={30}
                            height={30}
                            priority
                        />
                    </div>
                    <div className={styles.Drafts_title}>
                        {this.props.videoName}
                    </div>
                </>
            </button>

            </>
        )
    }
}

export default Archive_video