import React from 'react'   
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

class Archive_View_video extends React.Component {
    render() { 
        return (
            <>
                <button id={this.props.button_id} className={styles.Drafts_block} onClick={this.props.view_video}>
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

export default Archive_View_video