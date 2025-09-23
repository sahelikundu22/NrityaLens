import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import MudraIdentifier from './components/MudraIdentifier/MudraIdentifier';
import PracticeMode from './components/PracticeMode/PracticeMode';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/identify" element={<MudraIdentifier />} />
          <Route path="/practice" element={<PracticeMode />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;