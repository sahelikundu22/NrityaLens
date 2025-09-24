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
      {/* Ornamental background overlays */}
      <div className="ornament ornament-top" />
      <div className="ornament ornament-bottom" />

      <div className="container">
        <header className="page-header">
          <div className="title-wrap">
            <div className="title-ornament left" />
            <div className="title-block">
              <h1 className="title">Which Mudra is This?</h1>
              <p className="subtitle">Bharatanatyam Hasta Vinyasa Identifier</p>
            </div>
            <div className="title-ornament right" />
          </div>
          <p className="lead">
            Upload a clear image of your hand gesture and we will identify the mudra,
            share its meaning, and offer practice tips.
          </p>
        </header>

        <section className="upload-section">
          <ImageUpload onImageUpload={handleImageUpload} loading={loading} />
          {loading && (
            <div className="loading-overlay">
              <div className="loading-mandala">
                <div className="petal" />
                <div className="petal" />
                <div className="petal" />
                <div className="petal" />
              </div>
              <div className="loading-text">Analyzing your mudra…</div>
            </div>
          )}
        </section>

        {result && (
          <section aria-live="polite">
            <ResultsDisplay result={result} />
          </section>
        )}

        {!result && (
          <section className="helper-section">
            <ul className="helper-list">
              <li>
                Ensure good lighting and keep your hand centered in the frame.
              </li>
              <li>
                Keep fingers distinct; avoid overlapping with background elements.
              </li>
              <li>
                Tradition meets technology — learn the language of hands gracefully.
              </li>
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default MudraIdentifier;