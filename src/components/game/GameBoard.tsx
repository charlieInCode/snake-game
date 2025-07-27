"use client";

import { useEffect, useRef } from "react";
import { GAME_CONFIG } from "@/lib/constants";
import { Snake } from "@/types/game";

interface GameBoardProps {
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
  snake?: Snake;
}

export default function GameBoard({ onCanvasReady, snake }: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size based on grid
    const canvasSize = GAME_CONFIG.GRID_SIZE * GAME_CONFIG.CELL_SIZE;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Draw background
    ctx.fillStyle = GAME_CONFIG.GRID_BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Draw grid
    ctx.strokeStyle = GAME_CONFIG.GRID_COLOR;
    ctx.lineWidth = GAME_CONFIG.GRID_LINE_WIDTH;

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

    // Draw snake if provided
    if (snake) {
      snake.segments.forEach((segment) => {
        const x = segment.position.x * GAME_CONFIG.CELL_SIZE;
        const y = segment.position.y * GAME_CONFIG.CELL_SIZE;
        const size = GAME_CONFIG.CELL_SIZE;

        // Choose color based on whether it's the head or body
        if (segment.isHead) {
          ctx.fillStyle = "#10B981"; // emerald-500 for head
        } else {
          ctx.fillStyle = "#059669"; // emerald-600 for body
        }

        // Draw snake segment with some padding
        const padding = 1;
        ctx.fillRect(
          x + padding,
          y + padding,
          size - padding * 2,
          size - padding * 2
        );

        // Add a border for better visibility
        ctx.strokeStyle = "#047857"; // emerald-700
        ctx.lineWidth = 1;
        ctx.strokeRect(
          x + padding,
          y + padding,
          size - padding * 2,
          size - padding * 2
        );
      });
    }

    // Notify parent that canvas is ready
    if (onCanvasReady) {
      onCanvasReady(canvas);
    }
  }, [onCanvasReady, snake]);

  return (
    <div className="flex justify-center items-center p-4">
      <canvas
        ref={canvasRef}
        className="border-2 border-gray-700 bg-gray-900"
        style={{
          borderWidth: GAME_CONFIG.CANVAS_BORDER_WIDTH,
          borderColor: GAME_CONFIG.CANVAS_BORDER_COLOR,
          backgroundColor: GAME_CONFIG.GRID_BACKGROUND_COLOR,
        }}
      />
    </div>
  );
}
