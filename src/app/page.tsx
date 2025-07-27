"use client";

import { useCallback, useRef, useState } from "react";
import GameBoard from "@/components/game/GameBoard";
import { useGameLoop } from "@/hooks/useGameLoop";
import { GAME_CONFIG } from "@/lib/constants";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [frameCount, setFrameCount] = useState(0);

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas;
  }, []);

  const handleGameTick = useCallback(() => {
    setFrameCount((prev) => prev + 1);

    // For now, just clear and redraw the canvas
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas
    ctx.fillStyle = GAME_CONFIG.GRID_BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Redraw the grid
    ctx.strokeStyle = GAME_CONFIG.GRID_COLOR;
    ctx.lineWidth = GAME_CONFIG.GRID_LINE_WIDTH;

    const canvasSize = GAME_CONFIG.GRID_SIZE * GAME_CONFIG.CELL_SIZE;

    // Draw vertical lines
    for (let x = 0; x <= GAME_CONFIG.GRID_SIZE; x++) {
      ctx.beginPath();
      ctx.moveTo(x * GAME_CONFIG.CELL_SIZE, 0);
      ctx.lineTo(x * GAME_CONFIG.CELL_SIZE, canvasSize);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= GAME_CONFIG.GRID_SIZE; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * GAME_CONFIG.CELL_SIZE);
      ctx.lineTo(canvasSize, y * GAME_CONFIG.CELL_SIZE);
      ctx.stroke();
    }
  }, []);

  useGameLoop({
    isRunning: true,
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
          </div>

          <GameBoard onCanvasReady={handleCanvasReady} />

          <div className="mt-8 text-center">
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
