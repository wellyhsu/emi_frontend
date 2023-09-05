/*
import React, { useRef, useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css'

class VideoPlayer extends React.Component {
  render() { 
    var selectVideo = document.querySelector('video');
    var playButton = document.querySelector('.toggle');
    var inputItem = document.querySelectorAll('input');
    var skipButton = document.querySelectorAll('.player__button[data-skip]');
    var progressBarOut = document.querySelector('.progress');
    var progressBarIn = document.querySelector('.progress__filled');
    

    console.log("video=",selectVideo);
    console.log("PlayButton=",playButton);
    console.log("inputItem=",inputItem);
    console.log("skipButton=",skipButton);
    console.log("progressBarOut=",progressBarOut);
    console.log("progressBarIn=",progressBarIn);

    //選取影片及按鈕元素並加上監聽事件與執行函示
    playButton.addEventListener('click', playToggle);
    selectVideo.addEventListener('click', playToggle);

    function playToggle() 
    {
        //當影片狀態為暫停的時候
        if (selectVideo.paused)
        {
            //播放影片
            selectVideo.play();
            //將播放鈕圖示改為暫停鈕圖示                     
            playButton.innerHTML = '❚ ❚';
        //當影片是播放的時候                         
        }
        else
        {
            //暫停影片
            selectVideo.pause();
            //將暫停鈕圖示改為播放鈕圖示     
            playButton.innerHTML = '►';
        }
    }

      //調整音量及播放速度
    //利用forEach()方法將選到的每個input元素加上監聽事件
    inputItem.forEach(
      function(item)
      {
        item.addEventListener('input', changeCondition);
      }
    )

    function changeCondition (event)
    {
      //取得觸發事件的input元素
      let changeInput = event.target;
      //取得input元素的name屬性
      let conditionName = changeInput.name;
      //取得input元素的值   
      let conditionValue = changeInput.value;
      //將影片屬性值改為input元素的值
      selectVideo[conditionName] = conditionValue;   
    }

    //快轉or倒帶
    function skipVideo(event) 
    {
      let changeTime = parseInt(event.target.dataset.skip);
      selectVideo.currentTime += changeTime;
    }

    //影片進度條
    //將影片加上監聽事件以及觸發函示
    selectVideo.addEventListener('timeupdate', progressing);

    function progressing() 
    {
        //取得影片時間總長度
        let videoDuration = selectVideo.duration;
        //取得影片目前時間長度
        let currentPosition = selectVideo.currentTime;
        //換算成比例
        currentProgress = currentPosition / videoDuration * 100;
        //將算出來的比例加到該元素的CSS屬性上
        progressBarIn.style.flexBasis = `${currentProgress}%`;
    }

    //當滑鼠被按下時，執行addDragProgress函式
    progressBarOut.addEventListener('mousedown', addDragProgress);
    //當滑鼠被放開時，執行removeDragProgress函式
    progressBarOut.addEventListener('mouseup', removeDragProgress);

    function addDragProgress (e) 
    {
        //當函示被執行時，新增監聽mousedown以及mousemove事件
        progressBarOut.addEventListener('mousedown', dragProgressBar);
        progressBarOut.addEventListener('mousemove', dragProgressBar);
    }

    function removeDragProgress () 
    {
        //當函示被執行時，移除監聽mousemove事件
        progressBarOut.removeEventListener('mousemove', dragProgressBar);
    }

    function dragProgressBar (e) 
    {
      //取得影片總長度
      let videoDuration = selectVideo.duration;
      //取得按下按鍵時的滑鼠在該元素的X軸座標
      let mouseX = e.offsetX;
      //取得時間軸背景元素總長度
      let progressBarWidth = progressBarOut.offsetWidth;
      //換算成長度比例
      let videoProgress = mouseX / progressBarWidth;
      //換算成影片時間
      let newPosition = videoDuration * videoProgress;
      //將計算出來的影片時間指定為目前播放時間
      selectVideo.currentTime = newPosition;
    }



    return (
      <>
        <video 
          id='video'
          poster=""
          autoPlay={false}
          controls={false} 
        >
          <source src={`/api/video?videoPath=${encodeURIComponent(this.props.videoPath)}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </>

    )
  }
}

export default VideoPlayer

*/