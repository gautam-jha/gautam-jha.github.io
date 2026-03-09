'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw } from 'lucide-react';

export function CanvasGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      const saved = localStorage.getItem('breakout_highscore');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [gameOver, setGameOver] = useState(false);
  
  // Game constants
  const PADDLE_WIDTH = 100;
  const PADDLE_HEIGHT = 10;
  const BALL_RADIUS = 6;
  const BRICK_ROW_COUNT = 5;
  const BRICK_COLUMN_COUNT = 8;
  const BRICK_WIDTH = 65;
  const BRICK_HEIGHT = 20;
  const BRICK_PADDING = 10;
  const BRICK_OFFSET_TOP = 40;
  const BRICK_OFFSET_LEFT = 20;

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      try {
        localStorage.setItem('breakout_highscore', score.toString());
      } catch {}
    }
  }, [score, highScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    // Game state variables
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 3;
    let dy = -3;
    let paddleX = (canvas.width - PADDLE_WIDTH) / 2;
    let rightPressed = false;
    let leftPressed = false;
    let currentScore = 0;
    let isGameOver = false;

    // Bricks initialization
    const bricks: { x: number, y: number, status: number, color: string }[][] = [];
    const colors = ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#8b5cf6'];
    
    for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
      bricks[c] = [];
      for (let r = 0; r < BRICK_ROW_COUNT; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1, color: colors[r] };
      }
    }

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') rightPressed = true;
      else if (e.key === 'Left' || e.key === 'ArrowLeft') leftPressed = true;
    };

    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') rightPressed = false;
      else if (e.key === 'Left' || e.key === 'ArrowLeft') leftPressed = false;
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      const relativeX = e.clientX - canvas.getBoundingClientRect().left;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - PADDLE_WIDTH / 2;
      }
    };

    if (isPlaying && !gameOver) {
      document.addEventListener('keydown', keyDownHandler, false);
      document.addEventListener('keyup', keyUpHandler, false);
      canvas.addEventListener('mousemove', mouseMoveHandler, false);
    }

    const collisionDetection = () => {
      for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
        for (let r = 0; r < BRICK_ROW_COUNT; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            if (x > b.x && x < b.x + BRICK_WIDTH && y > b.y && y < b.y + BRICK_HEIGHT) {
              dy = -dy;
              b.status = 0;
              currentScore++;
              setScore(currentScore);
              
              if (currentScore === BRICK_ROW_COUNT * BRICK_COLUMN_COUNT) {
                isGameOver = true;
                setGameOver(true);
                setIsPlaying(false);
              }
            }
          }
        }
      }
    };

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ef4444'; // Red blaster bolt glow
      ctx.fill();
      ctx.shadowBlur = 0; // Reset
      ctx.closePath();
    };

    const drawPaddle = () => {
      const handleWidth = 20;
      const bladeWidth = PADDLE_WIDTH - handleWidth;
      const h = PADDLE_HEIGHT;
      const py = canvas.height - PADDLE_HEIGHT - 10;

      // Lightsaber Handle
      ctx.beginPath();
      ctx.roundRect(paddleX, py, handleWidth, h, [5, 0, 0, 5]);
      ctx.fillStyle = '#64748b'; // Metallic
      ctx.fill();
      ctx.closePath();

      // Lightsaber Blade
      ctx.beginPath();
      ctx.roundRect(paddleX + handleWidth, py + 2, bladeWidth, h - 4, [0, 5, 5, 0]);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#3b82f6'; // Jedi Blue glow
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.closePath();
    };

    const drawBricks = () => {
      for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
        for (let r = 0; r < BRICK_ROW_COUNT; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
            const brickY = r * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            
            ctx.beginPath();
            ctx.roundRect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT, [4]);
            ctx.fillStyle = bricks[c][r].color;
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawBall();
      drawPaddle();
      collisionDetection();

      if (x + dx > canvas.width - BALL_RADIUS || x + dx < BALL_RADIUS) {
        dx = -dx;
      }
      if (y + dy < BALL_RADIUS) {
        dy = -dy;
      } else if (y + dy > canvas.height - BALL_RADIUS - 10) {
        if (x > paddleX && x < paddleX + PADDLE_WIDTH) {
          dy = -dy;
          // Add some english based on where it hit the paddle
          dx = 4 * ((x - (paddleX + PADDLE_WIDTH / 2)) / PADDLE_WIDTH);
        } else if (y + dy > canvas.height - BALL_RADIUS) {
          isGameOver = true;
          setGameOver(true);
          setIsPlaying(false);
          return;
        }
      }

      if (rightPressed && paddleX < canvas.width - PADDLE_WIDTH) {
        paddleX += 7;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
      }

      x += dx;
      y += dy;

      if (!isGameOver && isPlaying) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    if (isPlaying) {
      draw();
    } else {
      // Draw initial state
      drawBricks();
      drawBall();
      drawPaddle();
    }

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
      canvas.removeEventListener('mousemove', mouseMoveHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, gameOver]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900/50 backdrop-blur-xl shadow-2xl shadow-indigo-500/10 max-w-[640px] w-full aspect-[4/3]">
        <div className="absolute top-0 left-0 w-full h-8 bg-slate-800/80 border-b border-slate-700 flex items-center px-4 justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs font-mono text-slate-400">jedi_training_holo.exe</div>
          <div className="text-xs font-mono text-cyan-400">
            <span className="text-slate-500 mr-2">HI: {highScore}</span>
            Score: {score}
          </div>
        </div>
        
        <div className="w-full h-full pt-8 relative">
          <canvas
            ref={canvasRef}
            width={620}
            height={440}
            className="w-full h-full cursor-none"
          />
          
          {(!isPlaying || gameOver) && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center z-10"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                {gameOver ? (score === 40 ? 'The Force is strong with you! 🎉' : 'Game Over') : 'Jedi Training Demo'}
              </h3>
              <p className="text-slate-300 mb-6 font-mono text-sm">
                Use arrows or mouse to move
              </p>
              <button
                onClick={() => {
                  setGameOver(false);
                  setScore(0);
                  setIsPlaying(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full font-medium text-white hover:from-cyan-400 hover:to-indigo-400 transition-all shadow-lg shadow-cyan-500/25"
              >
                {gameOver ? <RotateCcw size={18} /> : <Play size={18} />}
                {gameOver ? 'Play Again' : 'Start Game'}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
