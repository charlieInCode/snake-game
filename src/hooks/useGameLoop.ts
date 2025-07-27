import { useCallback, useEffect, useRef } from "react";

interface UseGameLoopOptions {
  isRunning: boolean;
  onTick: () => void;
  speed?: number;
}

export function useGameLoop({
  isRunning,
  onTick,
  speed = 150,
}: UseGameLoopOptions) {
  const frameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);

  const gameLoop = useCallback(
    (currentTime: number) => {
      if (!isRunning) return;

      if (currentTime - lastTimeRef.current >= speed) {
        onTick();
        lastTimeRef.current = currentTime;
      }

      frameRef.current = requestAnimationFrame((time) => gameLoop(time));
    },
    [isRunning, onTick, speed]
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
  };
}
