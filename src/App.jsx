import React, { useState } from 'react';
import Gameboard from './pages/Gameboard';
import HomePage from './pages/HomePage';
import GameboardAI from './pages/GameboardAI';

const App = () => {
  const [page, setPage] = useState('home');

  const handleTransitionToGameboard = () => {
    setPage('gameboard');
  };

  const handleTransitionToGameboardAI = () => {
    setPage('gameboardAI');
  };

  const handleBackToHomePage = () => {
    setPage('home');
  };

  return (
    <div>
      {page === 'home' && <HomePage onTransitionToGameboard={handleTransitionToGameboard} onTransitionToGameboardAI={handleTransitionToGameboardAI} />}
      {page === 'gameboard' && (
        <div>
          <Gameboard />
          <div
            onClick={handleBackToHomePage}
            className='text-center text-3xl font-extrabold justify-center bg-slate-700 lg:m-8 m-11 rounded-xl hover:bg-slate-800 cursor-pointer'
          >
            Back to Homepage
          </div>
        </div>
      )}
      {page === 'gameboardAI' && (
        <div>
          <GameboardAI />
          <div
            onClick={handleBackToHomePage}
            className='text-center text-3xl font-extrabold justify-center bg-slate-700 lg:m-8 m-11 rounded-xl hover:bg-slate-800 cursor-pointer'
          >
            Back to Homepage
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
