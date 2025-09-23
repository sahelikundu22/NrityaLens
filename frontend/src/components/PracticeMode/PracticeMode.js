import React, { useState, useEffect } from 'react';
import CameraFeed from './CameraFeed';
import QuizInterface from './QuizInterface';
import FeedbackDisplay from './FeedbackDisplay';
import { apiService } from '../../services/api';
import './PracticeMode.css';

const PracticeMode = () => {
  const [currentMudra, setCurrentMudra] = useState(null);
  const [isPracticing, setIsPracticing] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const startPractice = async () => {
    try {
      const mudra = await apiService.getRandomMudra();
      setCurrentMudra(mudra);
      setIsPracticing(true);
      setFeedback(null);
    } catch (error) {
      console.error('Error starting practice:', error);
    }
  };

  const analyzeAttempt = async (imageData) => {
    if (!currentMudra) return;

    try {
      const result = await apiService.analyzePractice(currentMudra.mudra_name, imageData);
      setFeedback(result);
      setAttempts(prev => prev + 1);
      
      if (result.correct) {
        setScore(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error analyzing attempt:', error);
    }
  };

  const nextMudra = async () => {
    await startPractice();
  };

  useEffect(() => {
    startPractice();
  }, []);

  return (
    <div className="practice-mode">
      <div className="container">
        <h1>Mudra Practice Mode</h1>
        <p>Test your skills! Perform the mudra shown below using your camera.</p>
        
        <div className="practice-stats">
          <div className="stat">
            <span className="stat-label">Score:</span>
            <span className="stat-value">{score}/{attempts}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Accuracy:</span>
            <span className="stat-value">
              {attempts > 0 ? Math.round((score / attempts) * 100) : 0}%
            </span>
          </div>
        </div>

        <QuizInterface 
          currentMudra={currentMudra} 
          onNext={nextMudra}
          isPracticing={isPracticing}
        />

        <CameraFeed 
          onCapture={analyzeAttempt}
          isPracticing={isPracticing}
        />

        {feedback && (
          <FeedbackDisplay 
            feedback={feedback}
            targetMudra={currentMudra}
            onContinue={nextMudra}
          />
        )}
      </div>
    </div>
  );
};

export default PracticeMode;