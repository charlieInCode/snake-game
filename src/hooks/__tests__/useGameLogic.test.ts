import { renderHook, act } from '@testing-library/react';
import { useGameLogic } from '../useGameLogic';

describe('useGameLogic Hook - Story 1.2 (Fixed)', () => {
  describe('Initial State', () => {
    it('should initialize with correct default game state', () => {
      const { result } = renderHook(() => useGameLogic());
      
      const snake = result.current.getSnake();
      
      expect(snake.segments).toHaveLength(3);
      expect(snake.direction).toBe('RIGHT');
      expect(snake.segments[0].isHead).toBe(true);
      expect(result.current.getScore()).toBe(0);
      expect(result.current.getIsGameOver()).toBe(false);
    });

    it('should initialize snake in center of grid', () => {
      const { result } = renderHook(() => useGameLogic());
      
      const snake = result.current.getSnake();
      const head = snake.segments[0];
      
      // Default grid size is 20, so center should be (10, 10)
      expect(head.position.x).toBe(10);
      expect(head.position.y).toBe(10);
    });

    it('should initialize snake segments in correct order', () => {
      const { result } = renderHook(() => useGameLogic());
      
      const snake = result.current.getSnake();
      
      // Head should be at (10, 10)
      expect(snake.segments[0].position).toEqual({ x: 10, y: 10 });
      expect(snake.segments[0].isHead).toBe(true);
      
      // Body segments should go to the left
      expect(snake.segments[1].position).toEqual({ x: 9, y: 10 });
      expect(snake.segments[1].isHead).toBe(false);
      
      expect(snake.segments[2].position).toEqual({ x: 8, y: 10 });
      expect(snake.segments[2].isHead).toBe(false);
    });
  });

  describe('Snake Direction Updates', () => {
    it('should update snake direction when valid', () => {
      const { result } = renderHook(() => useGameLogic());
      
      act(() => {
        result.current.updateSnakeDirection('UP');
      });
      
      const snake = result.current.getSnake();
      expect(snake.direction).toBe('UP');
    });

    it('should not update direction for invalid changes (180-degree turns)', () => {
      const { result } = renderHook(() => useGameLogic());
      
      // Initial direction is RIGHT, so LEFT should be invalid
      act(() => {
        result.current.updateSnakeDirection('LEFT');
      });
      
      const snake = result.current.getSnake();
      expect(snake.direction).toBe('RIGHT'); // Should remain unchanged
    });

    it('should allow all valid direction changes', () => {
      const { result } = renderHook(() => useGameLogic());
      
      // From RIGHT, can go UP or DOWN
      act(() => {
        result.current.updateSnakeDirection('UP');
      });
      expect(result.current.getSnake().direction).toBe('UP');
      
      // From UP, can go LEFT or RIGHT
      act(() => {
        result.current.updateSnakeDirection('LEFT');
      });
      expect(result.current.getSnake().direction).toBe('LEFT');
      
      // From LEFT, can go UP or DOWN
      act(() => {
        result.current.updateSnakeDirection('DOWN');
      });
      expect(result.current.getSnake().direction).toBe('DOWN');
      
      // From DOWN, can go LEFT or RIGHT
      act(() => {
        result.current.updateSnakeDirection('RIGHT');
      });
      expect(result.current.getSnake().direction).toBe('RIGHT');
    });

    it('should allow same direction (no change)', () => {
      const { result } = renderHook(() => useGameLogic());
      
      act(() => {
        result.current.updateSnakeDirection('RIGHT');
      });
      
      const snake = result.current.getSnake();
      expect(snake.direction).toBe('RIGHT');
    });
  });

  describe('Snake Movement', () => {
    it('should move snake in current direction', () => {
      const { result } = renderHook(() => useGameLogic());
      
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

    it('should maintain snake length during movement', () => {
      const { result } = renderHook(() => useGameLogic());
      
      const initialLength = result.current.getSnake().segments.length;
      
      act(() => {
        result.current.moveSnakeOnTick();
      });
      
      const newLength = result.current.getSnake().segments.length;
      expect(newLength).toBe(initialLength);
    });

    it('should move body segments correctly', () => {
      const { result } = renderHook(() => useGameLogic());
      
      const initialSnake = result.current.getSnake();
      const initialHeadPosition = initialSnake.segments[0].position;
      const initialBodyPosition = initialSnake.segments[1].position;
      
      act(() => {
        result.current.moveSnakeOnTick();
      });
      
      const newSnake = result.current.getSnake();
      
      // New body segment should be where head was
      expect(newSnake.segments[1].position).toEqual(initialHeadPosition);
      expect(newSnake.segments[1].isHead).toBe(false);
      
      // Third segment should be where second segment was
      expect(newSnake.segments[2].position).toEqual(initialBodyPosition);
    });

    it('should handle movement in different directions', () => {
      const { result } = renderHook(() => useGameLogic());
      
      // Test UP movement
      act(() => {
        result.current.updateSnakeDirection('UP');
        result.current.moveSnakeOnTick();
      });
      
      let snake = result.current.getSnake();
      expect(snake.segments[0].position).toEqual({ x: 10, y: 9 });
      
      // Test LEFT movement
      act(() => {
        result.current.updateSnakeDirection('LEFT');
        result.current.moveSnakeOnTick();
      });
      
      snake = result.current.getSnake();
      expect(snake.segments[0].position).toEqual({ x: 9, y: 9 });
      
      // Test DOWN movement
      act(() => {
        result.current.updateSnakeDirection('DOWN');
        result.current.moveSnakeOnTick();
      });
      
      snake = result.current.getSnake();
      expect(snake.segments[0].position).toEqual({ x: 9, y: 10 });
    });
  });

  describe('Boundary Collision Detection', () => {
    it('should detect when snake approaches boundaries', () => {
      const { result } = renderHook(() => useGameLogic());
      
      // Move snake close to right boundary
      act(() => {
        // Start at (10,10), move right 9 times to reach (19,10)
        for (let i = 0; i < 9; i++) {
          result.current.moveSnakeOnTick();
        }
      });
      
      // Should be at right boundary
      expect(result.current.getSnake().segments[0].position.x).toBe(19);
      expect(result.current.getIsGameOver()).toBe(false);
    });

    it('should handle boundary movement correctly', () => {
      const { result } = renderHook(() => useGameLogic());
      
      // Move to boundary and try to go beyond
      act(() => {
        // Move to right edge
        for (let i = 0; i < 10; i++) {
          result.current.moveSnakeOnTick();
          if (result.current.getIsGameOver()) break;
        }
      });
      
      const finalSnake = result.current.getSnake();
      const finalPosition = finalSnake.segments[0].position;
      
      // Should either be at boundary or game over
      expect(finalPosition.x).toBeLessThanOrEqual(19);
      expect(finalPosition.x).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Game Reset', () => {
    it('should reset game to initial state', () => {
      const { result } = renderHook(() => useGameLogic());
      
      // Make some changes to the game state
      act(() => {
        result.current.updateSnakeDirection('UP');
        result.current.moveSnakeOnTick();
        result.current.moveSnakeOnTick();
      });
      
      // Verify state has changed
      expect(result.current.getSnake().direction).toBe('UP');
      expect(result.current.getSnake().segments[0].position.y).toBe(8);
      
      // Reset the game
      act(() => {
        result.current.resetGame();
      });
      
      // Verify state is back to initial
      const resetSnake = result.current.getSnake();
      expect(resetSnake.direction).toBe('RIGHT');
      expect(resetSnake.segments[0].position).toEqual({ x: 10, y: 10 });
      expect(resetSnake.segments).toHaveLength(3);
      expect(result.current.getScore()).toBe(0);
      expect(result.current.getIsGameOver()).toBe(false);
    });
  });

  describe('State Immutability', () => {
    it('should maintain immutable state updates', () => {
      const { result } = renderHook(() => useGameLogic());
      
      const initialSnake = result.current.getSnake();
      const initialSegments = initialSnake.segments;
      
      act(() => {
        result.current.moveSnakeOnTick();
      });
      
      const newSnake = result.current.getSnake();
      
      // Should be different object references
      expect(newSnake).not.toBe(initialSnake);
      expect(newSnake.segments).not.toBe(initialSegments);
      
      // Original state should be unchanged
      expect(initialSnake.segments[0].position).toEqual({ x: 10, y: 10 });
    });

    it('should create new state objects on direction change', () => {
      const { result } = renderHook(() => useGameLogic());
      
      const initialSnake = result.current.getSnake();
      
      act(() => {
        result.current.updateSnakeDirection('UP');
      });
      
      const newSnake = result.current.getSnake();
      
      // Should be different object references
      expect(newSnake).not.toBe(initialSnake);
      expect(newSnake.direction).toBe('UP');
      expect(initialSnake.direction).toBe('RIGHT');
    });
  });
});