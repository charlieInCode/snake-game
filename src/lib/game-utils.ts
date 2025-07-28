import { Position, Direction, SnakeSegment, Snake, Food } from "@/types/game";
import { DIRECTIONS } from "@/lib/constants";

// Wrap position to opposite side when hitting boundaries
export function wrapPosition(position: Position, gridSize: number): Position {
  return {
    x: position.x < 0 ? gridSize - 1 : position.x >= gridSize ? 0 : position.x,
    y: position.y < 0 ? gridSize - 1 : position.y >= gridSize ? 0 : position.y,
  };
}

// Calculate new position based on current position and direction
export function calculateNewPosition(
  currentPosition: Position,
  direction: Direction
): Position {
  const directionVector = DIRECTIONS[direction];
  return {
    x: currentPosition.x + directionVector.x,
    y: currentPosition.y + directionVector.y,
  };
}

// Check if position is within grid bounds
export function isPositionInBounds(
  position: Position,
  gridSize: number
): boolean {
  return (
    position.x >= 0 &&
    position.x < gridSize &&
    position.y >= 0 &&
    position.y < gridSize
  );
}

// Check if a direction change is valid (not a 180-degree turn)
export function isValidDirectionChange(
  currentDirection: Direction,
  newDirection: Direction
): boolean {
  const isOppositeDirection =
    (currentDirection === "UP" && newDirection === "DOWN") ||
    (currentDirection === "DOWN" && newDirection === "UP") ||
    (currentDirection === "LEFT" && newDirection === "RIGHT") ||
    (currentDirection === "RIGHT" && newDirection === "LEFT");

  return !isOppositeDirection;
}

// Create initial snake segments
export function createInitialSnake(
  gridSize: number,
  initialLength: number = 3
): SnakeSegment[] {
  const centerX = Math.floor(gridSize / 2);
  const centerY = Math.floor(gridSize / 2);

  const segments: SnakeSegment[] = [];

  // Create snake segments starting from the center, going right
  for (let i = 0; i < initialLength; i++) {
    segments.push({
      position: { x: centerX - i, y: centerY },
      isHead: i === 0, // First segment is the head
    });
  }

  return segments;
}

// Move snake in current direction
export function moveSnake(snake: Snake, gridSize: number): Snake {
  const head = snake.segments[0];
  const newHeadPosition = calculateNewPosition(head.position, snake.direction);

  // Use wall wrapping as per Story 1.3 requirements
  const headPosition = wrapPosition(newHeadPosition, gridSize);

  // Create new head segment
  const newHead: SnakeSegment = {
    position: headPosition,
    isHead: true,
  };

  // Update existing segments (remove tail, make previous head a body segment)
  const newBodySegments = snake.segments.slice(0, -1).map((segment) => ({
    ...segment,
    isHead: false,
  }));

  // Create new snake with updated segments
  return {
    ...snake,
    segments: [newHead, ...newBodySegments],
  };
}

// Check if position collides with snake
export function isPositionCollidingWithSnake(
  position: Position,
  snake: Snake
): boolean {
  return snake.segments.some(
    (segment) =>
      segment.position.x === position.x && segment.position.y === position.y
  );
}

// Get snake head position
export function getSnakeHead(snake: Snake): Position {
  return snake.segments[0].position;
}

// Get snake tail position
export function getSnakeTail(snake: Snake): Position {
  return snake.segments[snake.segments.length - 1].position;
}

// Check if snake head collides with food
export function checkFoodCollision(snake: Snake, food: Food): boolean {
  const head = getSnakeHead(snake);
  return head.x === food.position.x && head.y === food.position.y;
}

// Generate random food position that doesn't collide with snake
export function generateFoodPosition(snake: Snake, gridSize: number): Position {
  let position: Position;
  let attempts = 0;
  const maxAttempts = gridSize * gridSize; // Prevent infinite loop

  do {
    position = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
    attempts++;
  } while (
    isPositionCollidingWithSnake(position, snake) &&
    attempts < maxAttempts
  );

  return position;
}

// Create food at a safe position
export function createFood(snake: Snake, gridSize: number): Food {
  return {
    position: generateFoodPosition(snake, gridSize),
  };
}

// Grow snake by adding 2 segments at the tail
export function growSnake(snake: Snake): Snake {
  const tail = getSnakeTail(snake);
  const newTailSegment1: SnakeSegment = {
    position: { ...tail },
    isHead: false,
  };
  const newTailSegment2: SnakeSegment = {
    position: { ...tail },
    isHead: false,
  };

  return {
    ...snake,
    segments: [...snake.segments, newTailSegment1, newTailSegment2],
  };
}

// Check if snake head collides with walls
export function checkWallCollision(snake: Snake, gridSize: number): boolean {
  const head = getSnakeHead(snake);
  return !isPositionInBounds(head, gridSize);
}

// Check if snake head collides with its own body
export function checkSelfCollision(snake: Snake): boolean {
  const head = getSnakeHead(snake);
  // Check collision with all body segments (skip the head itself)
  return snake.segments
    .slice(1)
    .some(
      (segment) =>
        segment.position.x === head.x && segment.position.y === head.y
    );
}
