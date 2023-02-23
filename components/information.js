import React from 'react'   //用於Home.js Page  實驗室相關消息

class Information extends React.Component {
    render() { 
        return (
            <div>
                <div style={{fontSize: "1.5em" ,lineHeight: "2em"}}>
                    <b>{this.props.title}</b>
                </div>
                <div style={{color: "rgb(0,0,0)", marginLeft: "2em", textAlign: "left"}}>
                    {this.props.content}
                </div>
                <div style={{color: "rgb(90,194,155)", marginTop: "1em", marginBottom: "0.6em"}}>
                    View more --{'>'}
                </div>
            </div>
        )
    }
}

export default Information