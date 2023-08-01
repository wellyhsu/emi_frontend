import React from 'react'   //用於Home.js Page  實驗室相關消息
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

class Pop_up_window extends React.Component {
    render() { 
        return (
            <div className={styles.question_background}>
                <div className={styles.alert_question}>
                    <div className={styles.question_title}>
                        {this.props.Pop_up_Question_title}
                    </div>
                    <div style={{display: "block", marginLeft: "5vw"}}>
                        <div className={styles.content_title}>
                            Question
                            <textarea id="Question_content" className={styles.content_input} placeholder="Please input Question">

                            </textarea>
                        </div>
                        <div className={styles.content_title}>
                            Choice
                            <textarea id="Choice_content" className={styles.content_input} placeholder="Please input Choice">
                                
                            </textarea>
                        </div>
                        <div className={styles.content_title}>
                            Answer and explain
                            <textarea id="Answer_content" className={styles.content_input} placeholder="Please input Answer">
                                
                            </textarea>
                        </div>
                    </div>
                    <button className={styles.Continuous_button} onClick={this.props.colse_function}>
                        Continuous
                    </button>
                </div>
            </div>
        )
    }
}

export default Pop_up_window