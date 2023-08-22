
import React from 'react'  
import styles from '@/styles/Home.module.css'

class Index extends React.Component {
    render() {
      return (
            <svg className= {styles.circleBox} id="svg" width="690" height="26" viewPort="0 150 0 500" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle  id="circle" r= "0.5" cx="120" cy="25" fill="blue" transform="scale(0.5)"/>
            </svg>
      );
    }
}
export default Index
