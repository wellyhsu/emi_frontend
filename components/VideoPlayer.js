import React, { useRef, useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css'

const VideoPlayer = () => {
    const videoRef = useRef(null);
    const progressRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
  
    useEffect(() => {
      const video = videoRef.current;
      const progress = progressRef.current;
  
      video.addEventListener('timeupdate', handleTimeUpdate);
    }, []);
  
    const handlePlayPause = () => {
      const video = videoRef.current;
  
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    };
  
    const handleTimeUpdate = () => {
      const video = videoRef.current;
      const progress = progressRef.current;
  
      const progressPercentage = (video.currentTime / video.duration) * 100;
      progress.style.width = `${progressPercentage}%`;
    };

    return (
        <div className="video-player">
            <video 
                poster=""
                autoPlay={false}
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                <source src={`/api/video?videoPath=${encodeURIComponent(videoPath)}`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="controls">
                <button className="play-button" onClick={handlePlayPause}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>
            <div className="progress-bar">
                <div ref={progressRef} className="progress" />
            </div>
            {ShowCircle}
        </div>
      );

}