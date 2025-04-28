import React, { useRef } from "react";

const VideoComponent = ({ src, loop = true, autoPlay = true, muted = true }) => {
  const videoRef = useRef(null);

  return (
    <video
      ref={videoRef}
      src={src}
      loop={loop}
      autoPlay={autoPlay}
      muted={muted}
      style={{ 
        position: "absolute", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%", 
        objectFit: "cover", 
        zIndex: -1 // Ensure the video is behind other content
      }} 
    />
  );
};

export default VideoComponent;
