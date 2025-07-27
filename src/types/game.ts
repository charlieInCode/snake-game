// Position type for grid-based coordinates
export interface Position {
  x: number;
  y: number;
}

// Direction type for snake movement
export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

// Snake segment type
export interface SnakeSegment {
  position: Position;
  isHead: boolean;
}

// Snake state type
export interface Snake {
  segments: SnakeSegment[];
  direction: Direction;
}

// Game state type
export interface GameState {
  snake: Snake;
  score: number;
  isGameOver: boolean;
}

// Game configuration type
export interface GameConfig {
  gridSize: number;
  cellSize: number;
  initialSnakeLength: number;
  gameSpeed: number;
}

// Colors for snake rendering
export interface SnakeColors {
  head: string;
  body: string;
}
