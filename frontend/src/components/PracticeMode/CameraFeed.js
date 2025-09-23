import React, { useRef, useEffect, useState, useCallback } from 'react';

const CameraFeed = ({ onCapture, isPracticing }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState('user'); // 'user' for front camera

  // Wrap functions in useCallback to prevent unnecessary recreations
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const startCamera = useCallback(async () => {
    try {
      stopCamera(); // Stop existing stream first
      
      const constraints = {
        video: { 
          facingMode,
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      };
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }, [facingMode, stopCamera]);

  const switchCamera = useCallback(() => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  }, []);

  const captureImage = useCallback(() => {
    if (!videoRef.current || !isPracticing || !stream) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to base64 for sending to API
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    onCapture(imageData);
  }, [isPracticing, stream, onCapture]);

  // Effect for starting/stopping camera when facingMode changes
  useEffect(() => {
    startCamera();
    
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera, facingMode]);

  // Auto-capture every 3 seconds when practicing
  useEffect(() => {
    let interval;
    if (isPracticing && stream) {
      interval = setInterval(captureImage, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPracticing, stream, captureImage]);

  return (
    <div className="camera-feed">
      <div className="camera-container">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline
          muted
          className="camera-video"
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
      
      <div className="camera-controls">
        <button 
          onClick={switchCamera} 
          className="camera-btn switch"
          disabled={!stream}
        >
          🔄 Switch Camera
        </button>
        <button 
          onClick={captureImage} 
          className="camera-btn capture"
          disabled={!stream || !isPracticing}
        >
          📸 Analyze Now
        </button>
      </div>
      
      {!stream && (
        <div className="camera-permission">
          <p>Please allow camera access to use practice mode</p>
          <button onClick={startCamera}>Allow Camera</button>
        </div>
      )}
    </div>
  );
};

export default CameraFeed;