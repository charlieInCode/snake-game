"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import GameBoard from "@/components/game/GameBoard";
import StartScreen from "@/components/game/StartScreen";
import GameOverScreen from "@/components/game/GameOverScreen";
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
    getScreenState,
    updateSnakeDirection,
    startGame,
    resetGame,
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

  const handleStartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  const handleRestartGame = useCallback(() => {
    resetGame();
  }, [resetGame]);

  // Handle keyboard events for game over screen
  useEffect(() => {
    const handleKeyDown = () => {
      if (getScreenState() === "game-over") {
        handleRestartGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [getScreenState, handleRestartGame]);

  useGameLoop({
    isRunning: getScreenState() === "playing",
    onTick: handleGameTick,
    onSnakeMove: handleSnakeMove,
    gameSpeed: GAME_CONFIG.GAME_SPEED,
    snakeSpeed: GAME_CONFIG.SNAKE_SPEED,
  });

  const screenState = getScreenState();

  // Render appropriate screen based on game state
  if (screenState === "start") {
    return <StartScreen onStartGame={handleStartGame} />;
  }

  if (screenState === "game-over") {
    return (
      <GameOverScreen finalScore={getScore()} onRestart={handleRestartGame} />
    );
  }

  // Main game screen (playing or paused)
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
            {screenState === "paused" && (
              <p className="text-yellow-400 font-bold">Game Paused</p>
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
