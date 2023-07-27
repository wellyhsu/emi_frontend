import React from 'react'   
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

function preview_video(){
    document.getElementById("preview_video").style= "display : flex;" ;
}

function OK(){
    document.getElementById("preview_video").style= "display : none;" ;
}

function Delete(){
    document.getElementById("preview_video").style= "display : none;" ;
}

class Archive_video extends React.Component {
    render() { 
        return (
            <>
            <div id="preview_video" className={styles.preview_video_background}>
                <div className={styles.preview_video_window}>
                    <div className={styles.preview_video}>
                        <video 
                            src="video_preview.svg"
                            poster=""
                            autoplay="false" 
                            controls="true" 
                        />
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <botton id={this.props.button_id} className={styles.preview_video_button} onClick={this.props.Deletefunction}>
                            Delete 
                        </botton>
                        <botton className={styles.preview_video_button} onClick={OK}>
                            Ok 
                        </botton>
                    </div>
                </div>
            </div>
            <button className={styles.Drafts_block} onClick={preview_video}>
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
            </button>
            </>
        )
    }
}

export default Archive_video