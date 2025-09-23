import React from 'react';

const FeedbackDisplay = ({ feedback, targetMudra, onContinue }) => {
  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 80) return '#4CAF50';
    if (accuracy >= 60) return '#FF9800';
    return '#F44336';
  };

  return (
    <div className="feedback-display">
      <h2>Analysis Result</h2>
      
      <div className="accuracy-meter">
        <div className="accuracy-value" style={{ color: getAccuracyColor(feedback.accuracy) }}>
          {feedback.accuracy}% Accuracy
        </div>
        <div className="accuracy-bar">
          <div 
            className="accuracy-fill"
            style={{ 
              width: `${feedback.accuracy}%`,
              backgroundColor: getAccuracyColor(feedback.accuracy)
            }}
          ></div>
        </div>
      </div>

      <div className="feedback-message">
        <p>{feedback.feedback}</p>
        {feedback.correct ? (
          <div className="result correct">✅ Correct! Well done!</div>
        ) : (
          <div className="result incorrect">❌ Keep practicing!</div>
        )}
      </div>

      <div className="target-info">
        <h4>Target Mudra: {targetMudra?.mudra_name}</h4>
        <p>{targetMudra?.meaning}</p>
      </div>

      <button onClick={onContinue} className="continue-btn">
        Continue Practice
      </button>
    </div>
  );
};

export default FeedbackDisplay;