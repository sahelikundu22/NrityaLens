import React, { useRef } from 'react';

const ImageUpload = ({ onImageUpload, loading }) => {
  const fileInputRef = useRef();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div 
      className="image-upload-area"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => fileInputRef.current.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: 'none' }}
      />
      
      {loading ? (
        <div className="loading-spinner">Analyzing Mudra...</div>
      ) : (
        <>
          <div className="upload-icon">📸</div>
          <p>Click to upload or drag and drop an image</p>
          <small>Supported formats: JPG, PNG, WebP</small>
        </>
      )}
    </div>
  );
};

export default ImageUpload;