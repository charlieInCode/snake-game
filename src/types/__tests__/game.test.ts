import { Position, Direction, SnakeSegment, Snake, GameState } from '../game';

describe('Game Types - Story 1.2 Type Safety', () => {
  describe('Position Type', () => {
    it('should accept valid position objects', () => {
      const position: Position = { x: 5, y: 10 };
      
      expect(position.x).toBe(5);
      expect(position.y).toBe(10);
    });

    it('should work with edge values', () => {
      const positions: Position[] = [
        { x: 0, y: 0 },
        { x: -1, y: -1 },
        { x: 999, y: 999 },
      ];
      
      positions.forEach(pos => {
        expect(typeof pos.x).toBe('number');
        expect(typeof pos.y).toBe('number');
      });
    });
  });

  describe('Direction Type', () => {
    it('should accept all valid direction values', () => {
      const directions: Direction[] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
      
      directions.forEach(direction => {
        expect(typeof direction).toBe('string');
        expect(['UP', 'DOWN', 'LEFT', 'RIGHT']).toContain(direction);
      });
    });

    it('should be compatible with switch statements', () => {
      const testDirection = (dir: Direction): string => {
        switch (dir) {
          case 'UP':
            return 'north';
          case 'DOWN':
            return 'south';
          case 'LEFT':
            return 'west';
          case 'RIGHT':
            return 'east';
          default:
            return 'unknown';
        }
      };

      expect(testDirection('UP')).toBe('north');
      expect(testDirection('DOWN')).toBe('south');
      expect(testDirection('LEFT')).toBe('west');
      expect(testDirection('RIGHT')).toBe('east');
    });
  });

  describe('SnakeSegment Type', () => {
    it('should accept valid snake segment objects', () => {
      const head: SnakeSegment = {
        position: { x: 10, y: 10 },
        isHead: true,
      };

      const body: SnakeSegment = {
        position: { x: 9, y: 10 },
        isHead: false,
      };

      expect(head.position.x).toBe(10);
      expect(head.position.y).toBe(10);
      expect(head.isHead).toBe(true);

      expect(body.position.x).toBe(9);
      expect(body.position.y).toBe(10);
      expect(body.isHead).toBe(false);
    });

    it('should work in arrays', () => {
      const segments: SnakeSegment[] = [
        { position: { x: 10, y: 10 }, isHead: true },
        { position: { x: 9, y: 10 }, isHead: false },
        { position: { x: 8, y: 10 }, isHead: false },
      ];

      expect(segments).toHaveLength(3);
      expect(segments[0].isHead).toBe(true);
      expect(segments[1].isHead).toBe(false);
      expect(segments[2].isHead).toBe(false);
    });
  });

  describe('Snake Type', () => {
    it('should accept valid snake objects', () => {
      const snake: Snake = {
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
          { position: { x: 8, y: 10 }, isHead: false },
        ],
        direction: 'RIGHT',
      };

      expect(snake.segments).toHaveLength(3);
      expect(snake.direction).toBe('RIGHT');
      expect(snake.segments[0].isHead).toBe(true);
    });

    it('should work with different directions', () => {
      const directions: Direction[] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
      
      directions.forEach(direction => {
        const snake: Snake = {
          segments: [{ position: { x: 0, y: 0 }, isHead: true }],
          direction,
        };

        expect(snake.direction).toBe(direction);
      });
    });

    it('should handle single segment snake', () => {
      const singleSegmentSnake: Snake = {
        segments: [{ position: { x: 5, y: 5 }, isHead: true }],
        direction: 'UP',
      };

      expect(singleSegmentSnake.segments).toHaveLength(1);
      expect(singleSegmentSnake.segments[0].isHead).toBe(true);
    });

    it('should handle long snake', () => {
      const longSnake: Snake = {
        segments: Array.from({ length: 20 }, (_, i) => ({
          position: { x: 10 - i, y: 10 },
          isHead: i === 0,
        })),
        direction: 'RIGHT',
      };

      expect(longSnake.segments).toHaveLength(20);
      expect(longSnake.segments[0].isHead).toBe(true);
      expect(longSnake.segments[19].isHead).toBe(false);
    });
  });

  describe('GameState Type', () => {
    it('should accept valid game state objects', () => {
      const gameState: GameState = {
        snake: {
          segments: [
            { position: { x: 10, y: 10 }, isHead: true },
            { position: { x: 9, y: 10 }, isHead: false },
          ],
          direction: 'RIGHT',
        },
        score: 100,
        isGameOver: false,
      };

      expect(gameState.snake.segments).toHaveLength(2);
      expect(gameState.score).toBe(100);
      expect(gameState.isGameOver).toBe(false);
    });

    it('should work with game over state', () => {
      const gameOverState: GameState = {
        snake: {
          segments: [{ position: { x: 0, y: 0 }, isHead: true }],
          direction: 'UP',
        },
        score: 50,
        isGameOver: true,
      };

      expect(gameOverState.isGameOver).toBe(true);
      expect(gameOverState.score).toBe(50);
    });

    it('should work with initial state', () => {
      const initialState: GameState = {
        snake: {
          segments: [
            { position: { x: 10, y: 10 }, isHead: true },
            { position: { x: 9, y: 10 }, isHead: false },
            { position: { x: 8, y: 10 }, isHead: false },
          ],
          direction: 'RIGHT',
        },
        score: 0,
        isGameOver: false,
      };

      expect(initialState.score).toBe(0);
      expect(initialState.isGameOver).toBe(false);
      expect(initialState.snake.segments).toHaveLength(3);
      expect(initialState.snake.direction).toBe('RIGHT');
    });

    it('should handle different score values', () => {
      const scores = [0, 10, 100, 999, 10000];
      
      scores.forEach(score => {
        const gameState: GameState = {
          snake: {
            segments: [{ position: { x: 0, y: 0 }, isHead: true }],
            direction: 'UP',
          },
          score,
          isGameOver: false,
        };

        expect(gameState.score).toBe(score);
        expect(typeof gameState.score).toBe('number');
      });
    });
  });

  describe('Type Compatibility', () => {
    it('should work with utility functions that accept these types', () => {
      const getSnakeHead = (snake: Snake): Position => {
        return snake.segments[0].position;
      };

      const isGameActive = (gameState: GameState): boolean => {
        return !gameState.isGameOver;
      };

      const snake: Snake = {
        segments: [{ position: { x: 5, y: 5 }, isHead: true }],
        direction: 'UP',
      };

      const gameState: GameState = {
        snake,
        score: 0,
        isGameOver: false,
      };

      expect(getSnakeHead(snake)).toEqual({ x: 5, y: 5 });
      expect(isGameActive(gameState)).toBe(true);
    });

    it('should work with array operations', () => {
      const snake: Snake = {
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
          { position: { x: 8, y: 10 }, isHead: false },
        ],
        direction: 'RIGHT',
      };

      // Array operations should work
      const head = snake.segments[0];
      const tail = snake.segments[snake.segments.length - 1];
      const bodySegments = snake.segments.slice(1);

      expect(head.isHead).toBe(true);
      expect(tail.isHead).toBe(false);
      expect(bodySegments).toHaveLength(2);
      expect(bodySegments.every(segment => !segment.isHead)).toBe(true);
    });

    it('should work with object destructuring', () => {
      const gameState: GameState = {
        snake: {
          segments: [{ position: { x: 1, y: 2 }, isHead: true }],
          direction: 'LEFT',
        },
        score: 42,
        isGameOver: true,
      };

      const { snake, score, isGameOver } = gameState;
      const { segments, direction } = snake;
      const [{ position }] = segments;
      const { x, y } = position;

      expect(direction).toBe('LEFT');
      expect(score).toBe(42);
      expect(isGameOver).toBe(true);
      expect(x).toBe(1);
      expect(y).toBe(2);
    });
  });

  describe('Type Immutability', () => {
    it('should support creating new objects for state updates', () => {
      const originalGameState: GameState = {
        snake: {
          segments: [{ position: { x: 5, y: 5 }, isHead: true }],
          direction: 'UP',
        },
        score: 10,
        isGameOver: false,
      };

      // Creating new state (simulating immutable update)
      const newGameState: GameState = {
        ...originalGameState,
        score: originalGameState.score + 10,
        snake: {
          ...originalGameState.snake,
          direction: 'RIGHT',
        },
      };

      expect(originalGameState.score).toBe(10);
      expect(newGameState.score).toBe(20);
      expect(originalGameState.snake.direction).toBe('UP');
      expect(newGameState.snake.direction).toBe('RIGHT');
    });

    it('should support array operations for snake segments', () => {
      const originalSnake: Snake = {
        segments: [
          { position: { x: 3, y: 3 }, isHead: true },
          { position: { x: 2, y: 3 }, isHead: false },
        ],
        direction: 'RIGHT',
      };

      // Adding new head (simulating movement)
      const newSnake: Snake = {
        ...originalSnake,
        segments: [
          { position: { x: 4, y: 3 }, isHead: true },
          { ...originalSnake.segments[0], isHead: false },
          ...originalSnake.segments.slice(1, -1),
        ],
      };

      expect(originalSnake.segments).toHaveLength(2);
      expect(newSnake.segments).toHaveLength(2);
      expect(originalSnake.segments[0].position.x).toBe(3);
      expect(newSnake.segments[0].position.x).toBe(4);
    });
  });
});