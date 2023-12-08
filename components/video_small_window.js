import React from 'react'  

class video_small_window extends React.Component {
    render() { 
        return (
            <button className={styles.upload_videos}>
                {this.props.vidoe_title} {/*{this.props.vidoe_progress}*/}
            </button>
        )
    }
}

export default video_small_window

