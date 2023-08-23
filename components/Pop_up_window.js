import React from 'react'   //用於Home.js Page  實驗室相關消息
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

const Continuous = () => {   //繼續觀看影片
    answer_times = 0;     
    document.getElementById("Multiple_choice_question").style = "display: none;";
    document.getElementById("choice1").style = "color: rgba(0, 0, 0, 1); background-color: #ffffff;";
    document.getElementById("choice2").style = "color: rgba(0, 0, 0, 1); background-color: #ffffff;";
    videoRef.current.play();
};

class Pop_up_window extends React.Component {
    render() { 
        return (
            <div id="Multiple_choice_question" style={{ display: "flex", height: "100%" }}>
                        <div className={styles.question_background}>
                            <div className={styles.alert_question}>
                                <div className={styles.question_title}>
                                    Multiple choice question
                                </div>
                                <div style={{display: "block", marginLeft: "5vw"}}>
                                    <div className={styles.content_title}>
                                        Question
                                    </div>
                                    <div className={styles.content_title} style={{paddingLeft: "1.5vw"}}>
                                        {this.props.Question}
                                    </div>
                                    <div className={styles.content_title}>
                                        Choice
                                        <div>
                                            <button id="choice1" className={styles.choice_button} onClick={this.props.choice_button}>
                                                {this.props.Options1}
                                            </button>
                                            <button id="choice2" className={styles.choice_button} onClick={this.props.choice_button}>
                                                {this.props.Options2}
                                            </button>
                                            <button id="choice3" className={styles.choice_button} onClick={this.props.choice_button}>
                                                {this.props.Options3}
                                            </button>
                                            <button id="choice4" className={styles.choice_button} onClick={this.props.choice_button}>
                                                {this.props.Options4}
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.content_title}>
                                        {this.props.Answer}
                                    </div>
                                    <button className={styles.Continuous_button} style={{float: "right"}} onClick={Continuous}>
                                        Continuous
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
        )
    }
}

export default Pop_up_window