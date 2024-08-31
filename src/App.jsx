import React, { useState } from 'react';
import Gameboard from './pages/Gameboard';
import HomePage from './pages/HomePage';
import GameboardAI from './pages/GameboardAI';

const App = () => {
  const [page, setPage] = useState('home');
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  const handleTransitionToGameboard = (name1, name2) => {
    setPlayer1Name(name1);
    setPlayer2Name(name2);
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
      {page === 'home' && (
        <HomePage 
          onTransitionToGameboard={handleTransitionToGameboard} 
          onTransitionToGameboardAI={handleTransitionToGameboardAI} 
        />
      )}
      {page === 'gameboard' && (
        <div>
          <Gameboard player1Name={player1Name} player2Name={player2Name} />
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
