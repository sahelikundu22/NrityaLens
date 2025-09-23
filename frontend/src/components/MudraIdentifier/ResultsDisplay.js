import React from 'react';

const ResultsDisplay = ({ result }) => {
  return (
    <div className="results-display">
      <div className="mudra-result">
        <h2 className="mudra-name">{result.mudraName}</h2>
        
        <div className="accuracy-score">
          Shape Accuracy: <span className="accuracy-value">{result.accuracy}%</span>
        </div>

        <div className="meaning-section">
          <h3>Meaning & Significance</h3>
          <p>{result.meaning}</p>
        </div>

        <div className="feedback-section">
          <h3>Feedback & Tips</h3>
          <p>{result.feedback}</p>
        </div>

        <button 
          onClick={() => window.location.reload()} 
          className="analyze-another-btn"
        >
          Analyze Another Mudra
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;