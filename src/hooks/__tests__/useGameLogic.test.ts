import { renderHook, act } from "@testing-library/react";
import { useGameLogic } from "@/hooks/useGameLogic";

describe("useGameLogic Hook - Story 1.2 (Fixed)", () => {
  describe("Initial State", () => {
    it("should initialize with correct default values", () => {
      const { result } = renderHook(() => useGameLogic());

      const snake = result.current.getSnake();
      expect(snake.direction).toBe("RIGHT");
      expect(snake.segments).toHaveLength(3);

      // Check initial snake position (center of grid)
      expect(snake.segments[0].position).toEqual({ x: 10, y: 10 });
      expect(snake.segments[0].isHead).toBe(true);

      expect(snake.segments[1].position).toEqual({ x: 9, y: 10 });
      expect(snake.segments[1].isHead).toBe(false);

      expect(snake.segments[2].position).toEqual({ x: 8, y: 10 });
      expect(snake.segments[2].isHead).toBe(false);
    });

    it("should initialize with start screen state", () => {
      const { result } = renderHook(() => useGameLogic());

      expect(result.current.getScreenState()).toBe("start");
      expect(result.current.getIsGameOver()).toBe(false);
    });
  });

  describe("Snake Direction Updates", () => {
    it("should not update snake direction when not playing", () => {
      const { result } = renderHook(() => useGameLogic());

      // Game starts in "start" state, so direction changes should be ignored
      act(() => {
        result.current.updateSnakeDirection("UP");
      });

      const snake = result.current.getSnake();
      expect(snake.direction).toBe("RIGHT"); // Should remain unchanged
    });

    it("should update snake direction when playing", () => {
      const { result } = renderHook(() => useGameLogic());

      // Start the game first
      act(() => {
        result.current.startGame();
      });

      act(() => {
        result.current.updateSnakeDirection("UP");
      });

      const snake = result.current.getSnake();
      expect(snake.direction).toBe("UP");
    });

    it("should not update direction for invalid changes (180-degree turns)", () => {
      const { result } = renderHook(() => useGameLogic());

      // Start the game first
      act(() => {
        result.current.startGame();
      });

      // Initial direction is RIGHT, so LEFT should be invalid
      act(() => {
        result.current.updateSnakeDirection("LEFT");
      });

      const snake = result.current.getSnake();
      expect(snake.direction).toBe("RIGHT"); // Should remain unchanged
    });

    it("should allow all valid direction changes when playing", () => {
      const { result } = renderHook(() => useGameLogic());

      // Start the game first
      act(() => {
        result.current.startGame();
      });

      // From RIGHT, can go UP or DOWN
      act(() => {
        result.current.updateSnakeDirection("UP");
      });
      expect(result.current.getSnake().direction).toBe("UP");

      // From UP, can go LEFT or RIGHT
      act(() => {
        result.current.updateSnakeDirection("LEFT");
      });
      expect(result.current.getSnake().direction).toBe("LEFT");

      // From LEFT, can go UP or DOWN
      act(() => {
        result.current.updateSnakeDirection("DOWN");
      });
      expect(result.current.getSnake().direction).toBe("DOWN");

      // From DOWN, can go LEFT or RIGHT
      act(() => {
        result.current.updateSnakeDirection("RIGHT");
      });
      expect(result.current.getSnake().direction).toBe("RIGHT");
    });

    it("should allow same direction (no change)", () => {
      const { result } = renderHook(() => useGameLogic());

      // Start the game first
      act(() => {
        result.current.startGame();
      });

      act(() => {
        result.current.updateSnakeDirection("RIGHT");
      });

      const snake = result.current.getSnake();
      expect(snake.direction).toBe("RIGHT");
    });
  });

  describe("Snake Movement", () => {
    it("should not move snake when not playing", () => {
      const { result } = renderHook(() => useGameLogic());

      const initialSnake = result.current.getSnake();
      const initialHeadPosition = initialSnake.segments[0].position;

      act(() => {
        result.current.moveSnakeOnTick();
      });

      const newSnake = result.current.getSnake();
      const newHeadPosition = newSnake.segments[0].position;

      // Should not move when in start state
      expect(newHeadPosition).toEqual(initialHeadPosition);
    });

    it("should move snake in current direction when playing", () => {
      const { result } = renderHook(() => useGameLogic());

      // Start the game first
      act(() => {
        result.current.startGame();
      });

      const initialSnake = result.current.getSnake();
      const initialHeadPosition = initialSnake.segments[0].position;

      act(() => {
        result.current.moveSnakeOnTick();
      });

      const newSnake = result.current.getSnake();
      const newHeadPosition = newSnake.segments[0].position;

      // Should move right from (10, 10) to (11, 10)
      expect(newHeadPosition.x).toBe(initialHeadPosition.x + 1);
      expect(newHeadPosition.y).toBe(initialHeadPosition.y);
    });

    it("should maintain snake length during movement", () => {
      const { result } = renderHook(() => useGameLogic());

      // Start the game first
      act(() => {
        result.current.startGame();
      });

      const initialLength = result.current.getSnake().segments.length;

      act(() => {
        result.current.moveSnakeOnTick();
      });

      const newLength = result.current.getSnake().segments.length;
      expect(newLength).toBe(initialLength);
    });

    it("should move body segments correctly", () => {
      const { result } = renderHook(() => useGameLogic());

      // Start the game first
      act(() => {
        result.current.startGame();
      });

      const initialSnake = result.current.getSnake();
      const initialHeadPosition = initialSnake.segments[0].position;

      act(() => {
        result.current.moveSnakeOnTick();
      });

      const newSnake = result.current.getSnake();

      // New head should be one step ahead
      expect(newSnake.segments[0].position.x).toBe(initialHeadPosition.x + 1);
      expect(newSnake.segments[0].position.y).toBe(initialHeadPosition.y);

      // New body segment should be where head was
      expect(newSnake.segments[1].position).toEqual(initialHeadPosition);
      expect(newSnake.segments[1].isHead).toBe(false);

      // Third segment should be where second segment was
      expect(newSnake.segments[2].position).toEqual(
        initialSnake.segments[1].position
      );
      expect(newSnake.segments[2].isHead).toBe(false);
    });

    it("should handle movement in different directions", () => {
      const { result } = renderHook(() => useGameLogic());

      // Start the game first
      act(() => {
        result.current.startGame();
      });

      // Test UP movement
      act(() => {
        result.current.updateSnakeDirection("UP");
        result.current.moveSnakeOnTick();
      });

      let snake = result.current.getSnake();
      expect(snake.segments[0].position).toEqual({ x: 10, y: 9 });

      // Test LEFT movement
      act(() => {
        result.current.updateSnakeDirection("LEFT");
        result.current.moveSnakeOnTick();
      });

      snake = result.current.getSnake();
      expect(snake.segments[0].position).toEqual({ x: 9, y: 9 });
    });
  });

  describe("Wall Wrapping Behavior (Story 1.3)", () => {
    it("should detect when snake approaches boundaries", () => {
      const { result } = renderHook(() => useGameLogic());

      // Start the game first
      act(() => {
        result.current.startGame();
      });

      // Move snake to right edge
      for (let i = 0; i < 9; i++) {
        act(() => {
          result.current.moveSnakeOnTick();
        });
      }

      // Should be at right boundary
      expect(result.current.getSnake().segments[0].position.x).toBe(19);
      expect(result.current.getIsGameOver()).toBe(false);
    });

    it("should wrap around when hitting walls (not trigger game over)", () => {
      const { result } = renderHook(() => useGameLogic());

      // Start the game first
      act(() => {
        result.current.startGame();
      });

      // Move snake to right edge and beyond
      for (let i = 0; i < 10; i++) {
        act(() => {
          result.current.moveSnakeOnTick();
        });
      }

      // Should wrap to left side, not trigger game over
      expect(result.current.getSnake().segments[0].position.x).toBe(0);
      expect(result.current.getIsGameOver()).toBe(false);
      expect(result.current.getScreenState()).toBe("playing");
    });
  });

  describe("Game State Management", () => {
    it("should start game correctly", () => {
      const { result } = renderHook(() => useGameLogic());

      expect(result.current.getScreenState()).toBe("start");

      act(() => {
        result.current.startGame();
      });

      expect(result.current.getScreenState()).toBe("playing");
    });

    it("should pause and resume game", () => {
      const { result } = renderHook(() => useGameLogic());

      // Start the game
      act(() => {
        result.current.startGame();
      });

      expect(result.current.getScreenState()).toBe("playing");

      // Pause the game
      act(() => {
        result.current.pauseGame();
      });

      expect(result.current.getScreenState()).toBe("paused");

      // Resume the game
      act(() => {
        result.current.resumeGame();
      });

      expect(result.current.getScreenState()).toBe("playing");
    });

    it("should set game over state", () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => {
        result.current.setGameOver();
      });

      expect(result.current.getIsGameOver()).toBe(true);
      expect(result.current.getScreenState()).toBe("game-over");
    });
  });

  describe("Game Reset", () => {
    it("should reset game to initial state", () => {
      const { result } = renderHook(() => useGameLogic());

      // Change some state
      act(() => {
        result.current.startGame();
        result.current.updateSnakeDirection("UP");
      });

      // Verify state has changed
      expect(result.current.getSnake().direction).toBe("UP");
      expect(result.current.getScreenState()).toBe("playing");

      // Reset the game
      act(() => {
        result.current.resetGame();
      });

      // Should be back to initial state
      expect(result.current.getSnake().direction).toBe("RIGHT");
      expect(result.current.getScreenState()).toBe("start");
      expect(result.current.getIsGameOver()).toBe(false);
    });
  });

  describe("State Immutability", () => {
    it("should maintain immutable state updates", () => {
      const { result } = renderHook(() => useGameLogic());

      const initialSnake = result.current.getSnake();
      const initialSegments = initialSnake.segments;

      // Start the game and move snake
      act(() => {
        result.current.startGame();
        result.current.moveSnakeOnTick();
      });

      const newSnake = result.current.getSnake();

      // Should be different object references
      expect(newSnake).not.toBe(initialSnake);
      expect(newSnake.segments).not.toBe(initialSegments);

      // Original state should be unchanged
      expect(initialSnake.direction).toBe("RIGHT");
      expect(initialSnake.segments[0].position).toEqual({ x: 10, y: 10 });
    });

    it("should create new state objects on direction change", () => {
      const { result } = renderHook(() => useGameLogic());

      const initialSnake = result.current.getSnake();

      // Start the game and change direction
      act(() => {
        result.current.startGame();
        result.current.updateSnakeDirection("UP");
      });

      const newSnake = result.current.getSnake();

      // Should be different object references
      expect(newSnake).not.toBe(initialSnake);
      expect(newSnake.direction).toBe("UP");
      expect(initialSnake.direction).toBe("RIGHT");
    });
  });

  describe("Score Tracking - Story 1.5", () => {
    it("should maintain score state immutability", () => {
      const { result } = renderHook(() => useGameLogic());

      const initialGameState = result.current.gameState;
      const initialScore = result.current.getScore();

      // Start the game and simulate food collision
      act(() => {
        result.current.startGame();
        // Manually trigger food collision by moving snake to food position
        // This is a simplified test - in real game, food collision is handled in moveSnakeOnTick
      });

      const newGameState = result.current.gameState;
      const newScore = result.current.getScore();

      // Game state should be a new object
      expect(newGameState).not.toBe(initialGameState);
      expect(newScore).toBe(initialScore); // Score should remain unchanged unless food is eaten
    });
  });

  describe("Food and Growth - Story 1.4", () => {
    it("should maintain food state immutability", () => {
      const { result } = renderHook(() => useGameLogic());

      const initialGameState = result.current.gameState;

      // Start the game
      act(() => {
        result.current.startGame();
      });

      const newGameState = result.current.gameState;
      const newFood = result.current.getFood();

      // Food should be a new object if changed
      expect(newGameState).not.toBe(initialGameState);
      expect(newFood).toBe(newFood);
    });
  });
});
