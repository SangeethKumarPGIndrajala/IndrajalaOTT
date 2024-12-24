import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TrailerPage.css';

const TrailerPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [adUrl, setAdUrl] = useState(null);
  const [isAdPlaying, setIsAdPlaying] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [progress, setProgress] = useState(0); // Track the progress for the ad
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [error, setError] = useState(null);

  const videoRef = useRef(null);
  const adVideoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const viewIdT = localStorage.getItem('viewIdT');

    const fetchTrailer = async () => {
      try {
        const response = await fetch(`https://api.indrajala.in/api/user/PlayTrailer/${viewIdT}`);
        if (!response.ok) {
          throw new Error('Failed to fetch trailer');
        }
        const data = await response.json();
        const fullTrailerUrl = `https://api.indrajala.in/public${data.trailerVideo}`;
        setTrailerUrl(fullTrailerUrl);
      } catch (error) {
        setError('Error fetching trailer: ' + error.message);
      }
    };

    const fetchAds = async () => {
      try {
        const response = await fetch('https://api.indrajala.in/api/admin/get-random-trailer-video');
        if (!response.ok) {
          throw new Error('Failed to fetch ad');
        }
        const data = await response.json();
        const adPath = 'https://api.indrajala.in/public' + data?.randomTrailerAd?.adURL;
        setAdUrl(adPath);
      } catch (error) {
        setError('Error fetching ad: ' + error.message);
      }
    };

    if (viewIdT) {
      fetchAds();
      fetchTrailer();
    }
  }, [movieId]);

  useEffect(() => {
    if (adUrl && isAdPlaying && adVideoRef.current) {
      adVideoRef.current.src = adUrl;
      adVideoRef.current.play().catch((error) => console.error('Error playing ad:', error));
    }
  }, [adUrl, isAdPlaying]);

  const handleAdEnd = () => {
    setIsAdPlaying(false);
    setAdUrl(null); // Reset ad URL
    setIsPlaying(true); // Start the trailer
  };

  const handlePlay = ()=>{
    if(isPlaying){
      videoRef.current.src = trailerUrl;
      videoRef.current.play().catch((error) => console.error('Error playing trailer:', error));
    }
  }

  useEffect(()=>{
    if(isPlaying){
      handlePlay();
    }
  }, [isPlaying]);

  const updateAdProgress = () => {
    if (adVideoRef.current) {
      const progressValue = (adVideoRef.current.currentTime / adVideoRef.current.duration) * 100;
      setProgress(progressValue);
      setCurrentTime(formatTime(adVideoRef.current.currentTime));
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const updateProgress = () => {
    if (videoRef.current) {
      const progressValue = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setCurrentTime(formatTime(videoRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(formatTime(videoRef.current.duration));
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const ControlPanel = () => (
    <div className={`controls ${controlsVisible ? 'visible' : 'hidden'}`}>
      <div className="progress-bar-container">
        <input
          type="range"
          min="0"
          max="100"
          value={(videoRef.current?.currentTime / videoRef.current?.duration) * 100 || 0}
          onChange={(e) => videoRef.current && (videoRef.current.currentTime = (e.target.value / 100) * videoRef.current.duration)}
          className="progress-bar"
        />
      </div>
      <div className="button-container">
        <span className="time-display">{currentTime} / {duration}</span>
        <button onClick={handlePlayPause} className="play-pause">{isPlaying ? '❚❚' : '▶'}</button>
        <button onClick={handleMute} className="mute">{isMuted ? '🔇' : '🔊'}</button>
        <button onClick={handleFullScreen} className="fullscreen">{isFullScreen ? '⤓' : '⤢'}</button>
      </div>
    </div>
  );

  return (
    <div className="container" ref={containerRef}>
      {adUrl && isAdPlaying ? (
        <div className="video-container">
          <video
            ref={adVideoRef}
            onEnded={handleAdEnd}
            muted
            onTimeUpdate={updateAdProgress} // Update progress of the ad
            className="video-element"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
          />
          <div className="ad-progress-bar-container">
            <p>Advertisement</p>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              className="progress-bar"
              disabled
            />
          </div>
        </div>
      ) : trailerUrl ? (
        <div className="video-container" onClick={() => setControlsVisible(true)}>
          <video
            ref={videoRef}
            src={trailerUrl}
            onError={(e) => setError('Error loading video: ' + e.target.error.message)}
            onTimeUpdate={updateProgress}
            onLoadedMetadata={handleLoadedMetadata}
            controls={false}
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            className="video-element"
          />
          <ControlPanel />
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
};

export default TrailerPage;
