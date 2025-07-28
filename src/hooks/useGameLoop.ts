import { useCallback, useEffect, useRef } from "react";

/**
 * Options for configuring the game loop timing
 */
interface UseGameLoopOptions {
  /** Whether the game loop should be running */
  isRunning: boolean;
  /** Callback for visual updates (called at gameSpeed intervals) */
  onTick: () => void;
  /** Optional callback for snake movement (called at snakeSpeed intervals) */
  onSnakeMove?: () => void;
  /** Game loop speed in milliseconds (default: 16ms for ~60 FPS) */
  gameSpeed?: number;
  /** Snake movement speed in milliseconds (default: 150ms) */
  snakeSpeed?: number;
}

/**
 * Custom hook for managing game loop timing with separate visual and gameplay speeds
 *
 * This hook provides independent control over visual update frequency and gameplay
 * mechanics timing, allowing for smooth 60 FPS visuals while maintaining
 * appropriate gameplay speed.
 *
 * @param options - Configuration options for the game loop
 * @returns Object containing current running state
 */
export function useGameLoop({
  isRunning,
  onTick,
  onSnakeMove,
  gameSpeed = 16, // Default to ~60 FPS
  snakeSpeed = 150, // Default snake movement speed
}: UseGameLoopOptions) {
  // Validate input parameters
  const validatedGameSpeed = Math.max(1, gameSpeed); // Minimum 1ms
  const validatedSnakeSpeed = Math.max(1, snakeSpeed); // Minimum 1ms

  const frameRef = useRef<number | undefined>(undefined);
  const lastGameTimeRef = useRef<number>(0);
  const lastSnakeTimeRef = useRef<number>(0);

  const gameLoop = useCallback(
    (currentTime: number) => {
      if (!isRunning) return;

      // Game loop tick (for visual updates)
      if (currentTime - lastGameTimeRef.current >= validatedGameSpeed) {
        onTick();
        lastGameTimeRef.current = currentTime;
      }

      // Snake movement tick (independent of game loop)
      if (
        onSnakeMove &&
        currentTime - lastSnakeTimeRef.current >= validatedSnakeSpeed
      ) {
        onSnakeMove();
        lastSnakeTimeRef.current = currentTime;
      }

      frameRef.current = requestAnimationFrame((time) => gameLoop(time));
    },
    [isRunning, onTick, onSnakeMove, gameSpeed, snakeSpeed]
  );

  useEffect(() => {
    if (isRunning) {
      frameRef.current = requestAnimationFrame((time) => gameLoop(time));
    } else {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isRunning, gameLoop]);

  return {
    isRunning,
    // Expose timing info for debugging/monitoring
    getTimingInfo: () => ({
      gameSpeed: validatedGameSpeed,
      snakeSpeed: validatedSnakeSpeed,
      lastGameTime: lastGameTimeRef.current,
      lastSnakeTime: lastSnakeTimeRef.current,
    }),
  };
}
