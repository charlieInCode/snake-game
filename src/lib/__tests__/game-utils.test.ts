import {
  wrapPosition,
  calculateNewPosition,
  isPositionInBounds,
  isValidDirectionChange,
  createInitialSnake,
  moveSnake,
  isPositionCollidingWithSnake,
  getSnakeHead,
  getSnakeTail,
  checkFoodCollision,
  generateFoodPosition,
  createFood,
  growSnake,
  checkWallCollision,
  checkSelfCollision,
} from "@/lib/game-utils";
import { Snake } from "@/types/game";

describe("Game Utils - Story 1.2", () => {
  describe("Position Utilities", () => {
    it("should wrap position correctly", () => {
      const gridSize = 20;

      // Test wrapping from right edge
      expect(wrapPosition({ x: 20, y: 10 }, gridSize)).toEqual({ x: 0, y: 10 });

      // Test wrapping from left edge
      expect(wrapPosition({ x: -1, y: 10 }, gridSize)).toEqual({
        x: 19,
        y: 10,
      });

      // Test wrapping from bottom edge
      expect(wrapPosition({ x: 10, y: 20 }, gridSize)).toEqual({ x: 10, y: 0 });

      // Test wrapping from top edge
      expect(wrapPosition({ x: 10, y: -1 }, gridSize)).toEqual({
        x: 10,
        y: 19,
      });

      // Test positions within bounds (no wrapping needed)
      expect(wrapPosition({ x: 10, y: 10 }, gridSize)).toEqual({
        x: 10,
        y: 10,
      });
    });

    it("should calculate new position based on direction", () => {
      const currentPosition = { x: 10, y: 10 };

      expect(calculateNewPosition(currentPosition, "UP")).toEqual({
        x: 10,
        y: 9,
      });
      expect(calculateNewPosition(currentPosition, "DOWN")).toEqual({
        x: 10,
        y: 11,
      });
      expect(calculateNewPosition(currentPosition, "LEFT")).toEqual({
        x: 9,
        y: 10,
      });
      expect(calculateNewPosition(currentPosition, "RIGHT")).toEqual({
        x: 11,
        y: 10,
      });
    });

    it("should check if position is within bounds", () => {
      const gridSize = 20;

      // Valid positions
      expect(isPositionInBounds({ x: 0, y: 0 }, gridSize)).toBe(true);
      expect(isPositionInBounds({ x: 19, y: 19 }, gridSize)).toBe(true);
      expect(isPositionInBounds({ x: 10, y: 10 }, gridSize)).toBe(true);

      // Invalid positions
      expect(isPositionInBounds({ x: -1, y: 10 }, gridSize)).toBe(false);
      expect(isPositionInBounds({ x: 20, y: 10 }, gridSize)).toBe(false);
      expect(isPositionInBounds({ x: 10, y: -1 }, gridSize)).toBe(false);
      expect(isPositionInBounds({ x: 10, y: 20 }, gridSize)).toBe(false);
    });
  });

  describe("Direction Validation", () => {
    it("should validate direction changes correctly", () => {
      // Valid changes (not 180-degree turns)
      expect(isValidDirectionChange("RIGHT", "UP")).toBe(true);
      expect(isValidDirectionChange("RIGHT", "DOWN")).toBe(true);
      expect(isValidDirectionChange("UP", "LEFT")).toBe(true);
      expect(isValidDirectionChange("UP", "RIGHT")).toBe(true);

      // Invalid changes (180-degree turns)
      expect(isValidDirectionChange("RIGHT", "LEFT")).toBe(false);
      expect(isValidDirectionChange("LEFT", "RIGHT")).toBe(false);
      expect(isValidDirectionChange("UP", "DOWN")).toBe(false);
      expect(isValidDirectionChange("DOWN", "UP")).toBe(false);

      // Same direction (valid)
      expect(isValidDirectionChange("RIGHT", "RIGHT")).toBe(true);
      expect(isValidDirectionChange("UP", "UP")).toBe(true);
    });
  });

  describe("Snake Creation", () => {
    it("should create initial snake with correct structure", () => {
      const segments = createInitialSnake(20, 3);

      expect(segments).toHaveLength(3);

      // Head should be first
      expect(segments[0].isHead).toBe(true);
      expect(segments[1].isHead).toBe(false);
      expect(segments[2].isHead).toBe(false);

      // Should be in center of grid
      expect(segments[0].position).toEqual({ x: 10, y: 10 });
      expect(segments[1].position).toEqual({ x: 9, y: 10 });
      expect(segments[2].position).toEqual({ x: 8, y: 10 });
    });

    it("should create snake with custom length", () => {
      const segments = createInitialSnake(20, 5);

      expect(segments).toHaveLength(5);
      expect(segments[0].isHead).toBe(true);
      expect(segments[4].isHead).toBe(false);
    });
  });

  describe("moveSnake", () => {
    it("should move snake in current direction", () => {
      const snake: Snake = {
        direction: "RIGHT",
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
          { position: { x: 8, y: 10 }, isHead: false },
        ],
      };

      const movedSnake = moveSnake(snake, 20);

      // Head should move right
      expect(movedSnake.segments[0].position).toEqual({ x: 11, y: 10 });
      expect(movedSnake.segments[0].isHead).toBe(true);

      // Body segments should follow
      expect(movedSnake.segments[1].position).toEqual({ x: 10, y: 10 });
      expect(movedSnake.segments[1].isHead).toBe(false);

      expect(movedSnake.segments[2].position).toEqual({ x: 9, y: 10 });
      expect(movedSnake.segments[2].isHead).toBe(false);
    });

    it("should wrap around walls as per Story 1.3", () => {
      // Test right edge wrapping
      const rightEdgeSnake: Snake = {
        direction: "RIGHT",
        segments: [
          { position: { x: 19, y: 10 }, isHead: true },
          { position: { x: 18, y: 10 }, isHead: false },
        ],
      };

      const rightWrapped = moveSnake(rightEdgeSnake, 20);
      expect(rightWrapped.segments[0].position).toEqual({ x: 0, y: 10 });

      // Test left edge wrapping
      const leftEdgeSnake: Snake = {
        direction: "LEFT",
        segments: [
          { position: { x: 0, y: 10 }, isHead: true },
          { position: { x: 1, y: 10 }, isHead: false },
        ],
      };

      const leftWrapped = moveSnake(leftEdgeSnake, 20);
      expect(leftWrapped.segments[0].position).toEqual({ x: 19, y: 10 });

      // Test top edge wrapping
      const topEdgeSnake: Snake = {
        direction: "UP",
        segments: [
          { position: { x: 10, y: 0 }, isHead: true },
          { position: { x: 10, y: 1 }, isHead: false },
        ],
      };

      const topWrapped = moveSnake(topEdgeSnake, 20);
      expect(topWrapped.segments[0].position).toEqual({ x: 10, y: 19 });

      // Test bottom edge wrapping
      const bottomEdgeSnake: Snake = {
        direction: "DOWN",
        segments: [
          { position: { x: 10, y: 19 }, isHead: true },
          { position: { x: 10, y: 18 }, isHead: false },
        ],
      };

      const bottomWrapped = moveSnake(bottomEdgeSnake, 20);
      expect(bottomWrapped.segments[0].position).toEqual({ x: 10, y: 0 });
    });

    it("should preserve immutability", () => {
      const originalSnake: Snake = {
        direction: "RIGHT",
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
          { position: { x: 8, y: 10 }, isHead: false },
        ],
      };

      const movedSnake = moveSnake(originalSnake, 20);

      // Should be different objects
      expect(movedSnake).not.toBe(originalSnake);
      expect(movedSnake.segments).not.toBe(originalSnake.segments);

      // Original should be unchanged
      expect(originalSnake.segments[0].position).toEqual({ x: 10, y: 10 });
    });
  });

  describe("Collision Detection", () => {
    it("should detect position collision with snake", () => {
      const snake: Snake = {
        direction: "RIGHT",
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
          { position: { x: 8, y: 10 }, isHead: false },
        ],
      };

      // Position on snake
      expect(isPositionCollidingWithSnake({ x: 10, y: 10 }, snake)).toBe(true);
      expect(isPositionCollidingWithSnake({ x: 9, y: 10 }, snake)).toBe(true);

      // Position not on snake
      expect(isPositionCollidingWithSnake({ x: 11, y: 10 }, snake)).toBe(false);
      expect(isPositionCollidingWithSnake({ x: 10, y: 11 }, snake)).toBe(false);
    });

    it("should detect wall collision", () => {
      const snake: Snake = {
        direction: "RIGHT",
        segments: [
          { position: { x: 20, y: 10 }, isHead: true },
          { position: { x: 19, y: 10 }, isHead: false },
        ],
      };

      expect(checkWallCollision(snake, 20)).toBe(true);
    });

    it("should not detect wall collision for valid positions", () => {
      const snake: Snake = {
        direction: "RIGHT",
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
        ],
      };

      expect(checkWallCollision(snake, 20)).toBe(false);
    });

    it("should detect self collision", () => {
      const snake: Snake = {
        direction: "RIGHT",
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
          { position: { x: 8, y: 10 }, isHead: false },
        ],
      };

      // Create a snake that collides with itself
      const collidingSnake: Snake = {
        direction: "RIGHT",
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
          { position: { x: 10, y: 10 }, isHead: false }, // Same as head
        ],
      };

      expect(checkSelfCollision(snake)).toBe(false);
      expect(checkSelfCollision(collidingSnake)).toBe(true);
    });
  });

  describe("Snake Utilities", () => {
    it("should get snake head", () => {
      const snake: Snake = {
        direction: "RIGHT",
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
        ],
      };

      expect(getSnakeHead(snake)).toEqual({ x: 10, y: 10 });
    });

    it("should get snake tail", () => {
      const snake: Snake = {
        direction: "RIGHT",
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
          { position: { x: 8, y: 10 }, isHead: false },
        ],
      };

      expect(getSnakeTail(snake)).toEqual({ x: 8, y: 10 });
    });
  });

  describe("Food Collision", () => {
    it("should detect food collision", () => {
      const snake: Snake = {
        direction: "RIGHT",
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
        ],
      };

      const food = { position: { x: 10, y: 10 } };

      expect(checkFoodCollision(snake, food)).toBe(true);
    });

    it("should not detect food collision when not colliding", () => {
      const snake: Snake = {
        direction: "RIGHT",
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
        ],
      };

      const food = { position: { x: 11, y: 10 } };

      expect(checkFoodCollision(snake, food)).toBe(false);
    });
  });

  describe("Food Generation", () => {
    it("should generate food position within bounds", () => {
      const snake: Snake = {
        direction: "RIGHT",
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
        ],
      };

      const position = generateFoodPosition(snake, 20);

      expect(position.x).toBeGreaterThanOrEqual(0);
      expect(position.x).toBeLessThan(20);
      expect(position.y).toBeGreaterThanOrEqual(0);
      expect(position.y).toBeLessThan(20);
    });

    it("should not generate food on snake", () => {
      const snake: Snake = {
        direction: "RIGHT",
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
        ],
      };

      const position = generateFoodPosition(snake, 20);

      const onSnake = snake.segments.some(
        (segment) =>
          segment.position.x === position.x && segment.position.y === position.y
      );

      expect(onSnake).toBe(false);
    });

    it("should create food with valid position", () => {
      const snake: Snake = {
        direction: "RIGHT",
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
        ],
      };

      const food = createFood(snake, 20);

      expect(food).toHaveProperty("position");
      expect(food.position).toHaveProperty("x");
      expect(food.position).toHaveProperty("y");
    });
  });

  describe("Snake Growth", () => {
    it("should grow snake by adding 2 segments at tail", () => {
      const snake: Snake = {
        direction: "RIGHT",
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
          { position: { x: 8, y: 10 }, isHead: false },
        ],
      };

      const grownSnake = growSnake(snake);

      expect(grownSnake.segments).toHaveLength(5);
      expect(grownSnake.segments[3].position).toEqual({ x: 8, y: 10 });
      expect(grownSnake.segments[3].isHead).toBe(false);
      expect(grownSnake.segments[4].position).toEqual({ x: 8, y: 10 });
      expect(grownSnake.segments[4].isHead).toBe(false);
    });

    it("should preserve immutability when growing", () => {
      const originalSnake: Snake = {
        direction: "RIGHT",
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
        ],
      };

      const grownSnake = growSnake(originalSnake);

      expect(grownSnake).not.toBe(originalSnake);
      expect(grownSnake.segments).not.toBe(originalSnake.segments);
    });
  });
});
