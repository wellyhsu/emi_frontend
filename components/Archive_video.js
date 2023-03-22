import React from 'react'   
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

class Archive_video extends React.Component {
    render() { 
        return (
            <div className={styles.Drafts_block}>
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
            </div>
        )
    }
}

export default Archive_video