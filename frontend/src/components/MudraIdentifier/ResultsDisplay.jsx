import React from 'react';
import { CheckCircle2, Info, Lightbulb, Sparkles } from 'lucide-react';

const ResultsDisplay = ({ result }) => {
  return (
    <div className="results-display">
      <div className="results-card">
        <div className="results-border-top" />

        {/* Header with decorative elements */}
        <div className="results-header-decorative">
          <Sparkles className="decorative-sparkle decorative-sparkle-left" />
          <div className="mudra-title-section">
            <h2 className="mudra-name">{result.mudraName}</h2>
            {result.sanskritName && (
              <span className="sanskrit-name">{result.sanskritName}</span>
            )}
          </div>
          <Sparkles className="decorative-sparkle decorative-sparkle-right" />
        </div>

        {/* Accuracy Score - Centered */}
        <div className="accuracy-container">
          <div className="accuracy-badge">
            <CheckCircle2 className="accuracy-icon" />
            <div className="accuracy-content">
              <span className="accuracy-value">{result.accuracy}%</span>
              <span className="accuracy-label">Shape Accuracy</span>
            </div>
          </div>
        </div>

        {/* Meaning Section */}
        <div className="meaning-section">
          <div className="section-heading">
            <Info className="section-icon" />
            <h3>Meaning & Significance</h3>
          </div>
          <p>{result.meaning}</p>
        </div>

        {/* Feedback Section */}
        <div className="feedback-section">
          <div className="section-heading">
            <Lightbulb className="section-icon" />
            <h3>Feedback & Tips</h3>
          </div>
          <p>{result.feedback}</p>
        </div>

        {/* Cultural Note */}
        <div className="cultural-note">
          <p>💃 This mudra is part of the 28 single-hand gestures (Asamyuta Hastas) in Bharatanatyam</p>
        </div>

        {/* Action Button */}
        <div className="cta-row">
          <button 
            onClick={() => window.location.reload()} 
            className="analyze-another-btn"
          >
            Analyze Another Mudra
          </button>
        </div>

        <div className="results-border-bottom" />
      </div>
    </div>
  );
};

export default ResultsDisplay;