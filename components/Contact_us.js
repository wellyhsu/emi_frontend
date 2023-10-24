import React from 'react'   //用於Home.js Page  實驗室相關消息
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

class Contact_us extends React.Component {
    render() { 
        return (
            <div>
                <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
                    <div className={styles.Contact_us_image}>
                        <Image
                            src={this.props.image}
                            alt={this.props.image_alt}
                            fill={true}
                            priority
                        />
                    </div>
                </div>
                <div className={styles.Contact_us_introduction_title}>
                    <b>{this.props.title}</b>
                </div>
{/*                <div className={styles.Contact_us_introduction_content}>
                    {this.props.content}
                </div>
*/  }              
            </div>
        )
    }
}

export default Contact_us