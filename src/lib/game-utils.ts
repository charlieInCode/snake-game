import { Position, Direction, SnakeSegment, Snake } from "@/types/game";
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

  // Wrap position if it goes out of bounds
  const wrappedHeadPosition = wrapPosition(newHeadPosition, gridSize);

  // Create new head segment
  const newHead: SnakeSegment = {
    position: wrappedHeadPosition,
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
