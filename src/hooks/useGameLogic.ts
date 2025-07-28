import { useState, useCallback } from "react";
import { GameState, Snake, Direction } from "@/types/game";
import { GAME_CONFIG } from "@/lib/constants";
import {
  createInitialSnake,
  moveSnake,
  isValidDirectionChange,
} from "@/lib/game-utils";

// Initial game state
const createInitialGameState = (): GameState => {
  const initialSnake: Snake = {
    segments: createInitialSnake(GAME_CONFIG.GRID_SIZE, 3),
    direction: "RIGHT",
  };

  return {
    snake: initialSnake,
    score: 0,
    isGameOver: false,
  };
};

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState);

  // Update snake direction
  const updateSnakeDirection = useCallback((newDirection: Direction) => {
    setGameState((prevState) => {
      // Use validation utility to check if direction change is valid
      if (!isValidDirectionChange(prevState.snake.direction, newDirection)) {
        return prevState; // Don't change direction if invalid
      }

      return {
        ...prevState,
        snake: {
          ...prevState.snake,
          direction: newDirection,
        },
      };
    });
  }, []);

  // Move snake (called on each game tick)
  const moveSnakeOnTick = useCallback(() => {
    setGameState((prevState) => {
      if (prevState.isGameOver) {
        return prevState;
      }

      const newSnake = moveSnake(prevState.snake, GAME_CONFIG.GRID_SIZE);

      // Check if snake hit the boundary (game over condition)
      const head = newSnake.segments[0];
      const isOutOfBounds =
        head.position.x < 0 ||
        head.position.x >= GAME_CONFIG.GRID_SIZE ||
        head.position.y < 0 ||
        head.position.y >= GAME_CONFIG.GRID_SIZE;

      if (isOutOfBounds) {
        return {
          ...prevState,
          isGameOver: true,
        };
      }

      return {
        ...prevState,
        snake: newSnake,
      };
    });
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    setGameState(createInitialGameState());
  }, []);

  // Get current snake
  const getSnake = useCallback(() => {
    return gameState.snake;
  }, [gameState.snake]);

  // Get current score
  const getScore = useCallback(() => {
    return gameState.score;
  }, [gameState.score]);

  // Get game over state
  const getIsGameOver = useCallback(() => {
    return gameState.isGameOver;
  }, [gameState.isGameOver]);

  return {
    gameState,
    updateSnakeDirection,
    moveSnakeOnTick,
    resetGame,
    getSnake,
    getScore,
    getIsGameOver,
  };
}
