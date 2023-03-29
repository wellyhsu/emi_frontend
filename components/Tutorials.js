import React from 'react'   //用於Home.js Page  實驗室相關消息
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

class Tutorials extends React.Component {
    render() { 
        return (
            <div>
                <div className={styles.tutor_introduction_title}>
                    <b>{this.props.title}</b>
                </div>
                <div className={styles.tutor_introduction_content}>
                    {this.props.content}
                </div>
                <div>
                    <button className={styles.Tutor_button}>
                        <Link 
                            href={{
                                pathname: '/[page]',
                                query: { page: this.props.link }
                                }}
                        >
                            {this.props.button}
                        </Link>
                    </button>
                    <div className={styles.Tutor_acapela_Logo}>
                        <Image
                            src="/acapela_Logo.svg"
                            alt="acapela Logo"
                            width={144}
                            height={43}
                            priority
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Tutorials