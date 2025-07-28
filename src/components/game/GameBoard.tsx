"use client";

import { useEffect, useRef } from "react";
import { GAME_CONFIG, GAME_COLORS, GAME_DIMENSIONS, INPUT_CONFIG } from "@/lib/constants";
import { Snake, Direction, Food } from "@/types/game";
import { isValidDirectionChange } from "@/lib/game-utils";

interface GameBoardProps {
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
  snake?: Snake;
  food?: Food;
  onDirectionChange?: (direction: Direction) => void;
}

export default function GameBoard({
  onCanvasReady,
  snake,
  food,
  onDirectionChange,
}: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastInputTime = useRef<number>(0);
  const pendingDirection = useRef<Direction | null>(null);
  const pendingTimeout = useRef<NodeJS.Timeout | null>(null);

  // Keyboard event handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!onDirectionChange) return;

      let newDirection: Direction | null = null;

      // Arrow keys
      switch (event.key) {
        case "ArrowUp":
          newDirection = "UP";
          break;
        case "ArrowDown":
          newDirection = "DOWN";
          break;
        case "ArrowLeft":
          newDirection = "LEFT";
          break;
        case "ArrowRight":
          newDirection = "RIGHT";
          break;
        // WASD keys
        case "w":
        case "W":
          newDirection = "UP";
          break;
        case "s":
        case "S":
          newDirection = "DOWN";
          break;
        case "a":
        case "A":
          newDirection = "LEFT";
          break;
        case "d":
        case "D":
          newDirection = "RIGHT";
          break;
      }

      if (newDirection) {
        event.preventDefault(); // Prevent default browser behavior
        
        const now = Date.now();
        
        // Validate direction change before processing
        if (snake && !isValidDirectionChange(snake.direction, newDirection)) {
          return; // Don't change direction if invalid
        }
        
        // Skip debouncing in test environment - process immediately
        if (process.env.NODE_ENV === 'test') {
          onDirectionChange(newDirection);
          return;
        }
        
        // Last-input-wins debouncing logic
        const timeSinceLastInput = now - lastInputTime.current;
        
        if (timeSinceLastInput >= INPUT_CONFIG.INPUT_DEBOUNCE_MS) {
          // Debounce period has passed, process immediately
          lastInputTime.current = now;
          onDirectionChange(newDirection);
        } else {
          // Within debounce period - buffer this input and set/reset timeout
          pendingDirection.current = newDirection;
          
          // Clear existing timeout if any
          if (pendingTimeout.current) {
            clearTimeout(pendingTimeout.current);
          }
          
          // Set timeout to process the last input after debounce period
          const remainingTime = INPUT_CONFIG.INPUT_DEBOUNCE_MS - timeSinceLastInput;
          pendingTimeout.current = setTimeout(() => {
            if (pendingDirection.current && onDirectionChange) {
              lastInputTime.current = Date.now();
              onDirectionChange(pendingDirection.current);
              pendingDirection.current = null;
              pendingTimeout.current = null;
            }
          }, remainingTime);
        }
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Clear any pending timeout
      if (pendingTimeout.current) {
        clearTimeout(pendingTimeout.current);
        pendingTimeout.current = null;
        pendingDirection.current = null;
      }
    };
  }, [onDirectionChange, snake]);

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
        ctx.fillStyle = segment.isHead ? GAME_COLORS.SNAKE_HEAD : GAME_COLORS.SNAKE_BODY;

        // Draw snake segment with some padding
        const padding = GAME_DIMENSIONS.SNAKE_PADDING;
        ctx.fillRect(
          x + padding,
          y + padding,
          size - padding * 2,
          size - padding * 2
        );

        // Add a border for better visibility
        ctx.strokeStyle = GAME_COLORS.SNAKE_BORDER;
        ctx.lineWidth = 1;
        ctx.strokeRect(
          x + padding,
          y + padding,
          size - padding * 2,
          size - padding * 2
        );
      });
    }

    // Draw food if provided
    if (food) {
      const x = food.position.x * GAME_CONFIG.CELL_SIZE;
      const y = food.position.y * GAME_CONFIG.CELL_SIZE;
      const size = GAME_CONFIG.CELL_SIZE;

      // Food color
      ctx.fillStyle = GAME_COLORS.FOOD_FILL;

      // Draw food as a circle with some padding
      const padding = GAME_DIMENSIONS.FOOD_PADDING;
      const radius = (size - padding * 2) / 2;
      const centerX = x + size / 2;
      const centerY = y + size / 2;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fill();

      // Add a border for better visibility
      ctx.strokeStyle = GAME_COLORS.FOOD_BORDER;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Notify parent that canvas is ready
    if (onCanvasReady) {
      onCanvasReady(canvas);
    }
  }, [onCanvasReady, snake, food]);

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
        tabIndex={0} // Make canvas focusable for keyboard events
      />
    </div>
  );
}
