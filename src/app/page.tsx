"use client";

import { useCallback, useRef, useState } from "react";
import GameBoard from "@/components/game/GameBoard";
import { useGameLoop } from "@/hooks/useGameLoop";
import { useGameLogic } from "@/hooks/useGameLogic";
import { GAME_CONFIG } from "@/lib/constants";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [frameCount, setFrameCount] = useState(0);

  // Use game logic hook
  const { moveSnakeOnTick, getSnake, getScore, getIsGameOver } = useGameLogic();

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas;
  }, []);

  const handleGameTick = useCallback(() => {
    setFrameCount((prev) => prev + 1);

    // Move the snake
    moveSnakeOnTick();
  }, [moveSnakeOnTick]);

  useGameLoop({
    isRunning: !getIsGameOver(),
    onTick: handleGameTick,
    speed: GAME_CONFIG.GAME_SPEED,
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
              Frame Count: {frameCount} | FPS: ~
              {Math.round(1000 / GAME_CONFIG.GAME_SPEED)}
            </p>
            <p className="text-sm text-gray-400">
              Score: {getScore()} | Snake Length: {getSnake().segments.length}
            </p>
            {getIsGameOver() && (
              <p className="text-red-400 font-bold">Game Over!</p>
            )}
          </div>

          <GameBoard onCanvasReady={handleCanvasReady} snake={getSnake()} />

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Snake is moving automatically to the right
            </p>
            <p className="text-sm text-gray-500">
              Game loop is running at{" "}
              {Math.round(1000 / GAME_CONFIG.GAME_SPEED)} FPS
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
