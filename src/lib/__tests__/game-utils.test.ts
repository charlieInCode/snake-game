import {
  calculateNewPosition,
  isPositionInBounds,
  isValidDirectionChange,
  createInitialSnake,
  moveSnake,
  isPositionCollidingWithSnake,
  getSnakeHead,
  getSnakeTail,
} from '../game-utils';
import { Position, Direction, Snake, SnakeSegment } from '@/types/game';

describe('Game Utils - Story 1.2', () => {
  describe('calculateNewPosition', () => {
    it('should calculate correct position for UP direction', () => {
      const position: Position = { x: 5, y: 5 };
      const result = calculateNewPosition(position, 'UP');
      
      expect(result).toEqual({ x: 5, y: 4 });
    });

    it('should calculate correct position for DOWN direction', () => {
      const position: Position = { x: 5, y: 5 };
      const result = calculateNewPosition(position, 'DOWN');
      
      expect(result).toEqual({ x: 5, y: 6 });
    });

    it('should calculate correct position for LEFT direction', () => {
      const position: Position = { x: 5, y: 5 };
      const result = calculateNewPosition(position, 'LEFT');
      
      expect(result).toEqual({ x: 4, y: 5 });
    });

    it('should calculate correct position for RIGHT direction', () => {
      const position: Position = { x: 5, y: 5 };
      const result = calculateNewPosition(position, 'RIGHT');
      
      expect(result).toEqual({ x: 6, y: 5 });
    });

    it('should handle edge positions correctly', () => {
      expect(calculateNewPosition({ x: 0, y: 0 }, 'UP')).toEqual({ x: 0, y: -1 });
      expect(calculateNewPosition({ x: 0, y: 0 }, 'LEFT')).toEqual({ x: -1, y: 0 });
    });
  });

  describe('isPositionInBounds', () => {
    const gridSize = 20;

    it('should return true for valid positions', () => {
      expect(isPositionInBounds({ x: 0, y: 0 }, gridSize)).toBe(true);
      expect(isPositionInBounds({ x: 10, y: 10 }, gridSize)).toBe(true);
      expect(isPositionInBounds({ x: 19, y: 19 }, gridSize)).toBe(true);
    });

    it('should return false for out-of-bounds positions', () => {
      expect(isPositionInBounds({ x: -1, y: 0 }, gridSize)).toBe(false);
      expect(isPositionInBounds({ x: 0, y: -1 }, gridSize)).toBe(false);
      expect(isPositionInBounds({ x: 20, y: 0 }, gridSize)).toBe(false);
      expect(isPositionInBounds({ x: 0, y: 20 }, gridSize)).toBe(false);
      expect(isPositionInBounds({ x: 25, y: 25 }, gridSize)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isPositionInBounds({ x: 19, y: 0 }, gridSize)).toBe(true);
      expect(isPositionInBounds({ x: 0, y: 19 }, gridSize)).toBe(true);
    });
  });

  describe('isValidDirectionChange - Story 1.3 Integration', () => {
    it('should allow 90-degree turns', () => {
      expect(isValidDirectionChange('UP', 'LEFT')).toBe(true);
      expect(isValidDirectionChange('UP', 'RIGHT')).toBe(true);
      expect(isValidDirectionChange('DOWN', 'LEFT')).toBe(true);
      expect(isValidDirectionChange('DOWN', 'RIGHT')).toBe(true);
      expect(isValidDirectionChange('LEFT', 'UP')).toBe(true);
      expect(isValidDirectionChange('LEFT', 'DOWN')).toBe(true);
      expect(isValidDirectionChange('RIGHT', 'UP')).toBe(true);
      expect(isValidDirectionChange('RIGHT', 'DOWN')).toBe(true);
    });

    it('should prevent 180-degree turns (reverse direction)', () => {
      expect(isValidDirectionChange('UP', 'DOWN')).toBe(false);
      expect(isValidDirectionChange('DOWN', 'UP')).toBe(false);
      expect(isValidDirectionChange('LEFT', 'RIGHT')).toBe(false);
      expect(isValidDirectionChange('RIGHT', 'LEFT')).toBe(false);
    });

    it('should allow same direction (no change)', () => {
      expect(isValidDirectionChange('UP', 'UP')).toBe(true);
      expect(isValidDirectionChange('DOWN', 'DOWN')).toBe(true);
      expect(isValidDirectionChange('LEFT', 'LEFT')).toBe(true);
      expect(isValidDirectionChange('RIGHT', 'RIGHT')).toBe(true);
    });
  });

  describe('createInitialSnake', () => {
    it('should create snake with correct default length', () => {
      const snake = createInitialSnake(20);
      
      expect(snake).toHaveLength(3);
      expect(snake[0].isHead).toBe(true);
      expect(snake[1].isHead).toBe(false);
      expect(snake[2].isHead).toBe(false);
    });

    it('should create snake with custom length', () => {
      const snake = createInitialSnake(20, 5);
      
      expect(snake).toHaveLength(5);
      expect(snake[0].isHead).toBe(true);
      snake.slice(1).forEach(segment => {
        expect(segment.isHead).toBe(false);
      });
    });

    it('should position snake in center of grid', () => {
      const gridSize = 20;
      const snake = createInitialSnake(gridSize);
      const head = snake[0];
      const expectedCenterX = Math.floor(gridSize / 2);
      const expectedCenterY = Math.floor(gridSize / 2);
      
      expect(head.position.x).toBe(expectedCenterX);
      expect(head.position.y).toBe(expectedCenterY);
    });

    it('should create snake segments going left from head', () => {
      const snake = createInitialSnake(20, 4);
      
      // Head at center
      expect(snake[0].position.x).toBe(10);
      expect(snake[0].position.y).toBe(10);
      
      // Body segments going left
      expect(snake[1].position.x).toBe(9);
      expect(snake[1].position.y).toBe(10);
      
      expect(snake[2].position.x).toBe(8);
      expect(snake[2].position.y).toBe(10);
      
      expect(snake[3].position.x).toBe(7);
      expect(snake[3].position.y).toBe(10);
    });
  });

  describe('moveSnake', () => {
    const gridSize = 20;
    let testSnake: Snake;

    beforeEach(() => {
      testSnake = {
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
          { position: { x: 8, y: 10 }, isHead: false },
        ],
        direction: 'RIGHT',
      };
    });

    it('should move snake head in the correct direction', () => {
      const movedSnake = moveSnake(testSnake, gridSize);
      
      expect(movedSnake.segments[0].position).toEqual({ x: 11, y: 10 });
      expect(movedSnake.segments[0].isHead).toBe(true);
    });

    it('should move body segments correctly', () => {
      const movedSnake = moveSnake(testSnake, gridSize);
      
      // Old head becomes body
      expect(movedSnake.segments[1].position).toEqual({ x: 10, y: 10 });
      expect(movedSnake.segments[1].isHead).toBe(false);
      
      // Old body segment moves up
      expect(movedSnake.segments[2].position).toEqual({ x: 9, y: 10 });
      expect(movedSnake.segments[2].isHead).toBe(false);
    });

    it('should remove tail segment (maintain same length)', () => {
      const originalLength = testSnake.segments.length;
      const movedSnake = moveSnake(testSnake, gridSize);
      
      expect(movedSnake.segments).toHaveLength(originalLength);
    });

    it('should handle different directions correctly', () => {
      // Test UP
      testSnake.direction = 'UP';
      let movedSnake = moveSnake(testSnake, gridSize);
      expect(movedSnake.segments[0].position).toEqual({ x: 10, y: 9 });

      // Test DOWN
      testSnake.direction = 'DOWN';
      movedSnake = moveSnake(testSnake, gridSize);
      expect(movedSnake.segments[0].position).toEqual({ x: 10, y: 11 });

      // Test LEFT
      testSnake.direction = 'LEFT';
      movedSnake = moveSnake(testSnake, gridSize);
      expect(movedSnake.segments[0].position).toEqual({ x: 9, y: 10 });
    });

    it('should not move when hitting boundary', () => {
      // Position snake at right edge
      testSnake.segments[0].position = { x: 19, y: 10 };
      testSnake.direction = 'RIGHT';
      
      const movedSnake = moveSnake(testSnake, gridSize);
      
      // Should remain unchanged
      expect(movedSnake.segments[0].position).toEqual({ x: 19, y: 10 });
    });

    it('should preserve immutability', () => {
      const originalSnake = { ...testSnake };
      const movedSnake = moveSnake(testSnake, gridSize);
      
      expect(movedSnake).not.toBe(testSnake);
      expect(movedSnake.segments).not.toBe(testSnake.segments);
      expect(testSnake.segments[0].position).toEqual(originalSnake.segments[0].position);
    });
  });

  describe('isPositionCollidingWithSnake', () => {
    const testSnake: Snake = {
      segments: [
        { position: { x: 10, y: 10 }, isHead: true },
        { position: { x: 9, y: 10 }, isHead: false },
        { position: { x: 8, y: 10 }, isHead: false },
      ],
      direction: 'RIGHT',
    };

    it('should detect collision with snake head', () => {
      const result = isPositionCollidingWithSnake({ x: 10, y: 10 }, testSnake);
      expect(result).toBe(true);
    });

    it('should detect collision with snake body', () => {
      const result = isPositionCollidingWithSnake({ x: 9, y: 10 }, testSnake);
      expect(result).toBe(true);
    });

    it('should return false for non-colliding positions', () => {
      const result = isPositionCollidingWithSnake({ x: 5, y: 5 }, testSnake);
      expect(result).toBe(false);
    });

    it('should handle adjacent positions correctly', () => {
      expect(isPositionCollidingWithSnake({ x: 11, y: 10 }, testSnake)).toBe(false);
      expect(isPositionCollidingWithSnake({ x: 10, y: 11 }, testSnake)).toBe(false);
      expect(isPositionCollidingWithSnake({ x: 10, y: 9 }, testSnake)).toBe(false);
    });
  });

  describe('getSnakeHead', () => {
    it('should return the head position', () => {
      const testSnake: Snake = {
        segments: [
          { position: { x: 15, y: 8 }, isHead: true },
          { position: { x: 14, y: 8 }, isHead: false },
        ],
        direction: 'RIGHT',
      };

      const head = getSnakeHead(testSnake);
      expect(head).toEqual({ x: 15, y: 8 });
    });

    it('should always return first segment position', () => {
      const testSnake: Snake = {
        segments: [
          { position: { x: 1, y: 1 }, isHead: true },
          { position: { x: 0, y: 1 }, isHead: false },
          { position: { x: 0, y: 0 }, isHead: false },
        ],
        direction: 'DOWN',
      };

      const head = getSnakeHead(testSnake);
      expect(head).toEqual({ x: 1, y: 1 });
    });
  });

  describe('getSnakeTail', () => {
    it('should return the tail position', () => {
      const testSnake: Snake = {
        segments: [
          { position: { x: 15, y: 8 }, isHead: true },
          { position: { x: 14, y: 8 }, isHead: false },
          { position: { x: 13, y: 8 }, isHead: false },
        ],
        direction: 'RIGHT',
      };

      const tail = getSnakeTail(testSnake);
      expect(tail).toEqual({ x: 13, y: 8 });
    });

    it('should handle single segment snake', () => {
      const testSnake: Snake = {
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
        ],
        direction: 'RIGHT',
      };

      const tail = getSnakeTail(testSnake);
      expect(tail).toEqual({ x: 10, y: 10 });
    });
  });
});