import React from 'react'  

class pop_up_question extends React.Component {
    render() { 
        return(
            <button className={styles.question_background}>
                <div className={styles.alert_question}>
                    <div style={{display: "inline-block", marginTop: "15vh",  verticalAlign: "middle"}}>
                    <Image
                        src="/warning-sign.png"
                        alt="Add new question"
                        width={70}
                        height={70}
                        priority
                    />
                    </div>
                    <div className={styles.alert_content}>
                    Please log in, thanks. 
                    </div>
                </div>
            </button>
        )
    }
}
export default pop_up_question