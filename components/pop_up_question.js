import React from 'react'  

class pop_up_question extends React.Component {
    render() { 
        return(
            <button className={styles.alert_background} onClick={alert_message}>
                <div className={styles.alert_message}>
                    <div style={{display: "inline-block", marginTop: "15vh",  verticalAlign: "middle"}}>
                    123
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