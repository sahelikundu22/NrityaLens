import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import ResultsDisplay from './ResultsDisplay';
import './MudraIdentifier.css';

const MudraIdentifier = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (imageFile) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResult({
        mudraName: "Pataka",
        accuracy: 85,
        meaning: "Flag - Represents the beginning of dance, clouds, forest",
        feedback: "Good form! Try to keep fingers closer together."
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="mudra-identifier">
      <div className="container">
        <h1>Which Mudra is This?</h1>
        <p>Upload an image of your hand gesture to identify the Bharatanatyam mudra</p>
        
        <ImageUpload onImageUpload={handleImageUpload} loading={loading} />
        
        {result && <ResultsDisplay result={result} />}
      </div>
    </div>
  );
};

export default MudraIdentifier;