import React from 'react';
import Footer from './components/Footer';

const HomePage = ({ onTransitionToGameboard, onTransitionToGameboardAI }) => {
  const handleGameAI = () => {
    onTransitionToGameboardAI();
  };

  const handleGo = () => {
    window.location.href = 'https://game-site-orpin.vercel.app/';
  };

  return (
    <div className='flex h-fit justify-center items-center sm:gap-96'>
      <div className='w-3/5 h-screen flex flex-col text-white font-extrabold lg:text-5xl text-sm bg-slate-900'>
        <div className='text-center'>Snakes and Ladders</div>
        <img src='src/assets/snakesandladders.png' className='h-44 mt-10 w-1/2 m-auto lg:h-96' alt='' />
        <div className='flex flex-col h-full mt-5 '>
          <div
            onClick={handleGameAI}
            className='text-center justify-center bg-slate-700 lg:m-8 m-11 rounded-xl hover:bg-slate-800 cursor-pointer'
          >
            Single Player Vs AI
          </div>
          <div
            onClick={onTransitionToGameboard}
            className='text-center justify-center bg-slate-700 lg:m-8 m-11 rounded-xl hover:bg-slate-800 cursor-pointer'
          >
            Player 1 Vs Player 2 (Couch-Mode)
          </div>
          <div className='text-center justify-center bg-slate-700 lg:m-8 m-11 rounded-xl hover:bg-slate-800 cursor-pointer'>
            Online Multiplayer
          </div>
          <div
            onClick={handleGo}
            className='text-center justify-center bg-blue-700 rounded-xl hover:bg-blue-800 m-8 cursor-pointer'
          >
            Back Home?
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
