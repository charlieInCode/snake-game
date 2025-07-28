import { useState, useCallback } from "react";
import { GameState, Snake, Direction } from "@/types/game";
import { GAME_CONFIG, SCORE_CONFIG } from "@/lib/constants";
import {
  createInitialSnake,
  moveSnake,
  isValidDirectionChange,
  createFood,
  checkFoodCollision,
  growSnake,
} from "@/lib/game-utils";

// Initial game state
const createInitialGameState = (): GameState => {
  const initialSnake: Snake = {
    segments: createInitialSnake(GAME_CONFIG.GRID_SIZE, 3),
    direction: "RIGHT",
  };

  const initialFood = createFood(initialSnake, GAME_CONFIG.GRID_SIZE);

  return {
    snake: initialSnake,
    food: initialFood,
    score: SCORE_CONFIG.INITIAL_SCORE,
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

  // Game tick (called on each visual update)
  const onGameTick = useCallback(() => {
    // This function is called for visual updates
    // Snake movement is handled separately by moveSnakeOnTick
  }, []);

  // Move snake (called on snake movement intervals)
  const moveSnakeOnTick = useCallback(() => {
    setGameState((prevState) => {
      if (prevState.isGameOver) {
        return prevState;
      }

      const newSnake = moveSnake(prevState.snake, GAME_CONFIG.GRID_SIZE);

      // Check for food collision
      const foodCollision = checkFoodCollision(newSnake, prevState.food);

      if (foodCollision) {
        // Grow snake, create new food, and increase score
        const grownSnake = growSnake(newSnake);
        const newFood = createFood(grownSnake, GAME_CONFIG.GRID_SIZE);

        return {
          ...prevState,
          snake: grownSnake,
          food: newFood,
          score: prevState.score + SCORE_CONFIG.POINTS_PER_FOOD,
        };
      }

      // Wall wrapping is now handled in moveSnake function
      // No game over condition for wall collisions
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

  // Get current food
  const getFood = useCallback(() => {
    return gameState.food;
  }, [gameState.food]);

  return {
    gameState,
    updateSnakeDirection,
    onGameTick,
    moveSnakeOnTick,
    resetGame,
    getSnake,
    getFood,
    getScore,
    getIsGameOver,
  };
}
