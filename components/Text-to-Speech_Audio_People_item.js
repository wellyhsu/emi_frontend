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
                <textarea className={styles.CreateMyAudio_input} placeholder='Please enter text here'>
                </textarea>
                <button className={styles.TTSA_Delete}>
                    <Image
                        src="/TTSA_Delete_image.svg"
                        alt="Delete image"
                        width={25}
                        height={25}
                        priority
                    />
                </button>
                <button className={styles.TTSA_Try_listening}>
                    <Image
                        src="/TTSA_try_listening.svg"
                        alt="Try listening image"
                        width={25}
                        height={25}
                        priority
                    />
                </button>
                
            </div>
        )
    }
}

export default People_item