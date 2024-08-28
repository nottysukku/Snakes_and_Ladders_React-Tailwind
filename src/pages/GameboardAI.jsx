import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '/src/App.css';

import dice1 from '/src/assets/dice-six-faces-1.png';
import dice2 from '/src/assets/dice-six-faces-2.png';
import dice3 from '/src/assets/dice-six-faces-3.png';
import dice4 from '/src/assets/dice-six-faces-4.png';
import dice5 from '/src/assets/dice-six-faces-5.png';
import dice6 from '/src/assets/dice-six-faces-6.png';

import ladder1 from '/src/assets/Ladders/ladder1.png';
import ladder2 from '/src/assets/Ladders/ladder2.png';
import ladder3 from '/src/assets/Ladders/ladder3.png';

import snake1 from '/src/assets/Snakes/snake1.png';
import snake2 from '/src/assets/Snakes/snake2.png';
import snake3 from '/src/assets/Snakes/snake3.png';

import player1 from '/src/assets/Players/player1.png';
import player2 from '/src/assets/Players/player2.png';

const players = [player1, player2];
const ladders = [ladder1, ladder2, ladder3];
const snakes = [snake1, snake2, snake3];
const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];
const dicerollsound = new Audio('https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');

// Define snakes and ladders
const snakesAndLadders = {
  88: 53, 64: 44, 19: 1, 80:41, 52: 32, 13: 7, 55: 26, 38: 18, // Snakes
  29: 48, 63: 84, 16: 25, 46: 67, 37: 56, 86: 96, 3: 23, 40: 59 // Ladders
};

function GameboardAI() {
  const [diceState, setDiceState] = useState({ value: 1, image: diceImages[0] });
  const [playerPositions, setPlayerPositions] = useState([95, 1]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isDiceRolling, setIsDiceRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const boardRef = useRef(null);

  useEffect(() => {
    if (playerPositions.some(pos => pos === 100)) {
      setGameOver(true);
      setWinner(currentPlayer);
    } else if (currentPlayer === 1 && !gameOver) {
      // AI player's turn
      setTimeout(() => rollDice(), 1000);
    }
  }, [playerPositions, currentPlayer, gameOver]);

  const getCoordinates = (position) => {
    const cell = document.getElementById(position);
    if (!cell) return { x: 1, y: 1 };

    const { top, left } = cell.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    // Adjust x-coordinate for desktop width
    const adjustedLeft = window.innerWidth >= 1024 ? left + 120 : left;

    return { x: adjustedLeft - boardRect.left, y: top - boardRect.top };
  };

  const rollDice = () => {
    if (isDiceRolling || isMoving || gameOver) return;

    setIsDiceRolling(true);
    dicerollsound.play();

    const rollInterval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * 6) + 1;
      setDiceState({ value: randomValue, image: diceImages[randomValue - 1] });
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);
      const finalValue = Math.floor(Math.random() * 6) + 1;
      setDiceState({ value: finalValue, image: diceImages[finalValue - 1] });
      movePlayer(finalValue);
      setIsDiceRolling(false);
    }, 1500);
  };

  const movePlayer = async (spaces) => {
    setIsMoving(true);
  
    let currentPos = playerPositions[currentPlayer];
    let targetPos = currentPos + spaces;
    let finalPos = currentPos;
  
    // Check if the move would exceed 100
    if (targetPos > 100) {
      targetPos = 100 - (targetPos - 100);
    }
  
    // Move step by step
    while (finalPos < targetPos) {
      finalPos++;
  
      setPlayerPositions(prev => {
        const newPositions = [...prev];
        newPositions[currentPlayer] = finalPos;
        return newPositions;
      });
  
      // Add a delay between each step
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  
    // Check for snakes and ladders only if we land exactly on one
    if (snakesAndLadders[finalPos]) {
      await new Promise(resolve => setTimeout(resolve, 500));
      finalPos = snakesAndLadders[finalPos];
      setPlayerPositions(prev => {
        const newPositions = [...prev];
        newPositions[currentPlayer] = finalPos;
        return newPositions;
      });
    }
  
    // Win condition check: only win if the final position is exactly 100
    if (finalPos === 100) {
      setGameOver(true);
      setWinner(currentPlayer);
    } else {
      // Switch to the next player
      setCurrentPlayer(prevPlayer => (prevPlayer + 1) % 2);
    }
  
    setIsMoving(false);
  };
  

  const resetGame = () => {
    setPlayerPositions([1, 1]);
    setCurrentPlayer(0);
    setGameOver(false);
    setWinner(null);
    setDiceState({ value: 1, image: diceImages[0] });
  };

  const generateBoardNumbers = () => {
    const numbers = [];
    for (let i = 9; i >= 0; i--) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        if (i % 2 === 0) {
          row.push(i * 10 + j + 1);
        } else {
          row.push((i + 1) * 10 - j);
        }
      }
      numbers.push(row);
    }
    return numbers;
  };

  const boardNumbers = generateBoardNumbers();

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <div ref={boardRef} className="relative w-full max-w-xl">
        <div className="relative lg:right-28 grid grid-cols-10 gap-2 lg:w-[800px] p-3 lg:p-5 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-2xl ">
          {boardNumbers.flat().map((number, index) => {
            let backgroundColor;
            let hoverColor;
            let activeColor;

            if (number === 1) {
              backgroundColor = 'green';
              hoverColor = 'green-700';
              activeColor = 'green-900';
            } else if (number === 100) {
              backgroundColor = 'red';
              hoverColor = 'red-700';
              activeColor = 'red-900';
            }

            return (
              <div
                key={index}
                id={number}
                className={`cursor-pointer text-center text-xs sm:text-xl text-black font-bold sm:h-16 sm:w-16 flex items-center justify-center border rounded-xl h-8 w-8 ${
                  number !== 1 && number !== 100 ? 'bg-blue-300 hover:bg-blue-700 active:bg-blue-900' : ''
                }`}
                style={{
                  backgroundColor: backgroundColor || 'light-blue',
                  transition: 'background-color 0.3s',
                }}
              >
                {number}
              </div>
            );
          })}

          {/* Ladders */}
          <img src={ladder1} alt="Ladder" id="ladder1" className="absolute z-10 top-[53%] right-[15%] sm:h-48 h-24 -rotate-45" />
          <img src={ladder2} alt="Ladder" id="ladder2" className="absolute z-10 top-[20%] left-[24%] sm:h-32 h-16 rotate-6" />
          <img src={ladder3} alt="Ladder" id="ladder3" className="absolute z-10 top-[72%] left-[36%] sm:h-32 h-16 rotate-15" />
          <img src={ladder1} alt="Ladder" id="ladder4" className="absolute z-10 top-[35%] left-[55%] sm:h-48 h-24 rotate-5" />
          <img src={ladder2} alt="Ladder" id="ladder5" className="absolute z-10 top-[48%] left-[35%] sm:h-32 h-16" />
          <img src={ladder3} alt="Ladder" id="ladder6" className="absolute z-10 top-[6%] left-[43%] sm:h-32 h-16 -rotate-45" />
          <img src={ladder1} alt="Ladder" id="ladder7" className="absolute z-10 top-[72%] left-[20%] sm:h-48 h-24 rotate-20" />
          <img src={ladder2} alt="Ladder" id="ladder8" className="absolute z-10 top-[47%] left-[5%] sm:h-32 h-16 rotate-9" />
          {/* Snakes */}
          <img src={snake1} alt="Snake" id="snake1" className="absolute top-[10%] right-[18%] h-32 lg:h-60 -rotate-45" />
          <img src={snake2} alt="Snake" id="snake2" className="absolute top-[35%] right-[60%] sm:h-32 h-16 -rotate-30" />
          <img src={snake3} alt="Snake" id="snake3" className="absolute top-[80%] right-[82%] sm:h-32 h-16 rotate-12" />
          <img src={snake1} alt="Snake" id="snake4" className="absolute top-[25%] right-[80%] h-32 lg:h-60 -rotate-45" />
          <img src={snake2} alt="Snake" id="snake5" className="absolute top-[50%] right-[10%] sm:h-32 h-16 -rotate-30" />
          <img src={snake3} alt="Snake" id="snake6" className="absolute top-[81%] right-[25%] sm:h-32 h-16 rotate-12" />
          <img src={snake1} alt="Snake" id="snake7" className="absolute top-[40%] right-[35%] h-32 lg:h-60 -rotate-45" />
          <img src={snake2} alt="Snake" id="snake8" className="absolute top-[65%] right-[70%] sm:h-32 h-16 -rotate-30" />

          {/* Players */}
          {[0, 1].map((playerIndex) => (
            <motion.img
              key={playerIndex}
              src={players[playerIndex]}
              alt={`Player ${playerIndex + 1}`}
              className="absolute lg:w-12 lg:h-12 w-10 h-10"
              animate={getCoordinates(playerPositions[playerIndex])}
              transition={{ type: 'spring', stiffness: 80, damping: 20 }}
              initial={{ x: 0, y: 0 }}
            />
          ))}
        </div>

        <div className="flex mt-4 justify-center">
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.img
              src={diceState.image}
              alt="Dice"
              onClick={() => currentPlayer === 0 && rollDice()}
              className={`w-20 h-20 cursor-pointer ${isDiceRolling || isMoving || gameOver || currentPlayer === 1 ? 'opacity-50' : ''}`}
              animate={{ rotate: isDiceRolling ? 360 : 0 }}
              transition={{ duration: 0.5, repeat: isDiceRolling ? Infinity : 0 }}
            />
          </motion.div>
        </div>

        {gameOver && (
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold text-black">Player {winner + 1} Wins!</h2>
            <button onClick={resetGame} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Restart Game
            </button>
          </div>
        )}

        <div className="text-center mt-4">
          <h2 className="text-xl font-bold text-white">
            {currentPlayer === 0 ? "Your turn! Click the dice to roll." : "AI's turn..."}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default GameboardAI;