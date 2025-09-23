import React from 'react';

const QuizInterface = ({ currentMudra, onNext, isPracticing }) => {
  if (!currentMudra) {
    return (
      <div className="quiz-interface loading">
        <p>Loading mudra...</p>
      </div>
    );
  }

  return (
    <div className="quiz-interface">
      <div className="current-challenge">
        <h2>Current Challenge</h2>
        <div className="mudra-card">
          <div className="mudra-name">{currentMudra.mudra_name}</div>
          <div className="mudra-meaning">{currentMudra.meaning}</div>
        </div>
        
        <div className="instructions">
          <h3>Instructions:</h3>
          <ol>
            <li>Position your hands clearly in front of the camera</li>
            <li>Make sure lighting is good and hands are visible</li>
            <li>The system will automatically analyze your mudra every 3 seconds</li>
            <li>Try to match the mudra shape as accurately as possible</li>
          </ol>
        </div>
        
        <button 
          onClick={onNext} 
          className="next-btn"
          disabled={!isPracticing}
        >
          Skip to Next Mudra
        </button>
      </div>
    </div>
  );
};

export default QuizInterface;