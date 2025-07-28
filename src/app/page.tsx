"use client";

import { useCallback, useRef, useState } from "react";
import GameBoard from "@/components/game/GameBoard";
import { useGameLoop } from "@/hooks/useGameLoop";
import { useGameLogic } from "@/hooks/useGameLogic";
import { GAME_CONFIG, INPUT_CONFIG } from "@/lib/constants";
import { Direction } from "@/types/game";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [frameCount, setFrameCount] = useState(0);

  // Use game logic hook
  const {
    onGameTick,
    moveSnakeOnTick,
    getSnake,
    getFood,
    getScore,
    getIsGameOver,
    updateSnakeDirection,
  } = useGameLogic();

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas;
  }, []);

  const handleDirectionChange = useCallback(
    (direction: Direction) => {
      updateSnakeDirection(direction);
    },
    [updateSnakeDirection]
  );

  const handleGameTick = useCallback(() => {
    setFrameCount((prev) => prev + 1);
    onGameTick();
  }, [onGameTick]);

  const handleSnakeMove = useCallback(() => {
    moveSnakeOnTick();
  }, [moveSnakeOnTick]);

  useGameLoop({
    isRunning: !getIsGameOver(),
    onTick: handleGameTick,
    onSnakeMove: handleSnakeMove,
    gameSpeed: GAME_CONFIG.GAME_SPEED,
    snakeSpeed: GAME_CONFIG.SNAKE_SPEED,
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Snake Game</h1>
          <p className="text-gray-400">A modern web-based implementation</p>
        </header>

        <main className="flex flex-col items-center">
          <div className="mb-4 text-center">
            <p className="text-sm text-gray-400">
              Game Ticks: {frameCount} | Visual Updates: ~
              {Math.round(1000 / GAME_CONFIG.GAME_SPEED)} FPS
            </p>
            <p className="text-sm text-gray-400">
              Score: {getScore()} | Snake Length: {getSnake().segments.length}
            </p>
            <p className="text-sm text-gray-400">
              Snake Speed: ~{Math.round(1000 / GAME_CONFIG.SNAKE_SPEED)}{" "}
              moves/sec
            </p>
            <p className="text-sm text-gray-500">
              Input Debounce: {INPUT_CONFIG.INPUT_DEBOUNCE_MS}ms | Game Loop:{" "}
              {GAME_CONFIG.GAME_SPEED}ms | Snake Move: {GAME_CONFIG.SNAKE_SPEED}
              ms
            </p>
            {getIsGameOver() && (
              <p className="text-red-400 font-bold">Game Over!</p>
            )}
          </div>

          <GameBoard
            onCanvasReady={handleCanvasReady}
            snake={getSnake()}
            food={getFood()}
            onDirectionChange={handleDirectionChange}
          />

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Use Arrow Keys or WASD to control the snake
            </p>
            <p className="text-sm text-gray-500">
              Visual updates: {GAME_CONFIG.GAME_SPEED}ms (~
              {Math.round(1000 / GAME_CONFIG.GAME_SPEED)} FPS) | Snake moves:{" "}
              {GAME_CONFIG.SNAKE_SPEED}ms (~
              {Math.round(1000 / GAME_CONFIG.SNAKE_SPEED)} moves/sec)
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
