import React, { useState } from 'react';
import Footer from './components/Footer';

const HomePage = ({ onTransitionToGameboard, onTransitionToGameboardAI }) => {
  const [showForm, setShowForm] = useState(false);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  const handleGameAI = () => {
    onTransitionToGameboardAI();
  };

  const handleGo = () => {
    window.location.href = 'https://game-site-orpin.vercel.app/';
  };

  const handleStartGame = () => {
    // Handle starting the game with player names
    onTransitionToGameboard(player1Name, player2Name);
  };

  return (
    <div className='flex h-fit justify-center items-center sm:gap-96'>
      {showForm ? (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-8 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold mb-4'>Enter Player Names</h2>
            <input
              type='text'
              placeholder='Player 1 Name'
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              className='block w-full mb-4 p-2 border border-gray-300 rounded'
            />
            <input
              type='text'
              placeholder='Player 2 Name'
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              className='block w-full mb-4 p-2 border border-gray-300 rounded'
            />
            <button
              onClick={handleStartGame}
              className='w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
              disabled={!player1Name || !player2Name}
            >
              Start Game
            </button>
            <button
              onClick={() => setShowForm(false)}
              className='w-full mt-4 p-2 bg-gray-500 text-white rounded hover:bg-gray-600'
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className='w-3/5 h-screen flex flex-col text-white font-extrabold lg:text-5xl text-sm bg-slate-900'>
          <div className='text-center'>Snakes and Ladders</div>
          <img src='https://i.postimg.cc/VNb6vCck/snakesandladders.png' className='h-44 mt-10 w-1/2 m-auto lg:h-96' alt='' />
          <div className='flex flex-col h-full mt-5 '>
            <div
              onClick={handleGameAI} // Ensure this function is correctly connected
              className='text-center justify-center bg-slate-700 lg:m-8 m-11 rounded-xl hover:bg-slate-800 cursor-pointer p-3 lg:p-0'
            >
              Single Player Vs AI
            </div>
            <div
              onClick={() => setShowForm(true)}
              className='text-center justify-center bg-slate-700 lg:m-8 m-11 rounded-xl hover:bg-slate-800 cursor-pointer p-3 lg:p-0'
            >
              Player 1 Vs Player 2 (Couch-Mode)
            </div>
            <div className='text-center justify-center bg-slate-700 lg:m-8 m-11 rounded-xl hover:bg-slate-800 cursor-pointer p-3 lg:p-0'>
              Online Multiplayer
            </div>
            <div
              onClick={handleGo}
              className='text-center justify-center bg-blue-700 rounded-xl hover:bg-blue-800 m-8 cursor-pointer p-3 lg:p-0'
            >
              Back Home?
            </div>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
