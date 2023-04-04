import React from 'react'   //用於Home.js Page  實驗室相關消息
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

class User_item extends React.Component {
    render() { 
        return (
            <div>
                <div className={styles.item_image}>
                  <Image
                    src={this.props.image_name}
                    alt={this.props.image_alt}
                    width={15}
                    height={15}
                    priority
                  />
                </div>
                <div className={styles.item_word}>
                    {this.props.title}                    
                </div>
            </div>
        )
    }
}

export default User_item