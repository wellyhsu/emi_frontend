import React from 'react'   //用於Home.js Page  實驗室相關消息
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

class People_item extends React.Component {
    render() { 
        return (
            <div className={styles.CreateMyAudio_voice_block}>
                <div className={styles.CreateMyAudio_people_image}>
                    <Image
                        src={this.props.people_image}
                        alt={this.props.item_alt}
                        width={40}
                        height={40}
                        priority
                    />
                    <div className={styles.CreateMyAudio_people_Name}>
                        {this.props.people_Name}
                    </div>
                </div>
                <textarea id={this.props.id} className={styles.CreateMyAudio_input} placeholder='Please enter text here'>
                
                </textarea>
                <button className={styles.TTSA_Delete} onClick={this.props.function}>
                    <Image
                        src="/TTSA_Delete_image.svg"
                        alt={this.props.Delete_id}//"Delete image"
                        width={25}
                        height={25}
                        priority
                    />
                </button>
                <button className={styles.TTSA_Try_listening} onClick={this.props.play_function}>
                    <Image
                        src="/TTSA_try_listening.svg"
                        alt={this.props.Delete_id}
                        width={25}
                        height={25}
                        priority
                    />
                </button>
                <audio autoplay>
                    <source type="audio/mp3" />
                </audio>
            </div>
        )
    }
}

export default People_item