import React from 'react'   //用於Home.js Page  實驗室相關消息
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

class Make_Video_Steps extends React.Component {
    render() { 
        return (
            <div>
                <div style={{textAlign: "center"}}>
                    <Image
                        src={this.props.image}
                        alt={this.props.image_alt}
                        width={80}
                        height={80}
                        priority
                    />
                </div>
                <div className={styles.make_video_step_title}>
                    <b>{this.props.title}</b>
                </div>
            </div>
        )
    }
}

export default Make_Video_Steps