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
  checkSelfCollision,
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
    screenState: "start",
  };
};

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState);

  // Update snake direction
  const updateSnakeDirection = useCallback((newDirection: Direction) => {
    setGameState((prevState) => {
      // Only allow direction changes when playing
      if (prevState.screenState !== "playing") {
        return prevState;
      }

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

  // Start game
  const startGame = useCallback(() => {
    setGameState((prevState) => ({
      ...prevState,
      screenState: "playing",
    }));
  }, []);

  // Pause game
  const pauseGame = useCallback(() => {
    setGameState((prevState) => ({
      ...prevState,
      screenState: "paused",
    }));
  }, []);

  // Resume game
  const resumeGame = useCallback(() => {
    setGameState((prevState) => ({
      ...prevState,
      screenState: "playing",
    }));
  }, []);

  // Game over
  const setGameOver = useCallback(() => {
    setGameState((prevState) => ({
      ...prevState,
      isGameOver: true,
      screenState: "game-over",
    }));
  }, []);

  // Game tick (called on each visual update)
  const onGameTick = useCallback(() => {
    // This function is called for visual updates
    // Snake movement is handled separately by moveSnakeOnTick
  }, []);

  // Move snake (called on snake movement intervals)
  const moveSnakeOnTick = useCallback(() => {
    setGameState((prevState) => {
      // Only move snake when playing
      if (prevState.screenState !== "playing") {
        return prevState;
      }

      const newSnake = moveSnake(prevState.snake, GAME_CONFIG.GRID_SIZE);

      // Check for self collision (wall wrapping is handled in moveSnake)
      if (checkSelfCollision(newSnake)) {
        return {
          ...prevState,
          isGameOver: true,
          screenState: "game-over",
        };
      }

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

  // Get current screen state
  const getScreenState = useCallback(() => {
    return gameState.screenState;
  }, [gameState.screenState]);

  return {
    gameState,
    updateSnakeDirection,
    onGameTick,
    moveSnakeOnTick,
    resetGame,
    startGame,
    pauseGame,
    resumeGame,
    setGameOver,
    getSnake,
    getFood,
    getScore,
    getIsGameOver,
    getScreenState,
  };
}
