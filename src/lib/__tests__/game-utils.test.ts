import {
  calculateNewPosition,
  isPositionInBounds,
  isValidDirectionChange,
  createInitialSnake,
  moveSnake,
  isPositionCollidingWithSnake,
  getSnakeHead,
  getSnakeTail,
  wrapPosition,
  checkFoodCollision,
  generateFoodPosition,
  createFood,
  growSnake,
} from "../game-utils";
import { Position, Snake, Food } from "@/types/game";

describe("Game Utils - Story 1.2", () => {
  describe("calculateNewPosition", () => {
    it("should calculate correct position for UP direction", () => {
      const position: Position = { x: 5, y: 5 };
      const result = calculateNewPosition(position, "UP");

      expect(result).toEqual({ x: 5, y: 4 });
    });

    it("should calculate correct position for DOWN direction", () => {
      const position: Position = { x: 5, y: 5 };
      const result = calculateNewPosition(position, "DOWN");

      expect(result).toEqual({ x: 5, y: 6 });
    });

    it("should calculate correct position for LEFT direction", () => {
      const position: Position = { x: 5, y: 5 };
      const result = calculateNewPosition(position, "LEFT");

      expect(result).toEqual({ x: 4, y: 5 });
    });

    it("should calculate correct position for RIGHT direction", () => {
      const position: Position = { x: 5, y: 5 };
      const result = calculateNewPosition(position, "RIGHT");

      expect(result).toEqual({ x: 6, y: 5 });
    });

    it("should handle edge positions correctly", () => {
      expect(calculateNewPosition({ x: 0, y: 0 }, "UP")).toEqual({
        x: 0,
        y: -1,
      });
      expect(calculateNewPosition({ x: 0, y: 0 }, "LEFT")).toEqual({
        x: -1,
        y: 0,
      });
    });
  });

  describe("isPositionInBounds", () => {
    const gridSize = 20;

    it("should return true for valid positions", () => {
      expect(isPositionInBounds({ x: 0, y: 0 }, gridSize)).toBe(true);
      expect(isPositionInBounds({ x: 10, y: 10 }, gridSize)).toBe(true);
      expect(isPositionInBounds({ x: 19, y: 19 }, gridSize)).toBe(true);
    });

    it("should return false for out-of-bounds positions", () => {
      expect(isPositionInBounds({ x: -1, y: 0 }, gridSize)).toBe(false);
      expect(isPositionInBounds({ x: 0, y: -1 }, gridSize)).toBe(false);
      expect(isPositionInBounds({ x: 20, y: 0 }, gridSize)).toBe(false);
      expect(isPositionInBounds({ x: 0, y: 20 }, gridSize)).toBe(false);
      expect(isPositionInBounds({ x: 25, y: 25 }, gridSize)).toBe(false);
    });

    it("should handle edge cases", () => {
      expect(isPositionInBounds({ x: 19, y: 0 }, gridSize)).toBe(true);
      expect(isPositionInBounds({ x: 0, y: 19 }, gridSize)).toBe(true);
    });
  });

  describe("isValidDirectionChange - Story 1.3 Integration", () => {
    it("should allow 90-degree turns", () => {
      expect(isValidDirectionChange("UP", "LEFT")).toBe(true);
      expect(isValidDirectionChange("UP", "RIGHT")).toBe(true);
      expect(isValidDirectionChange("DOWN", "LEFT")).toBe(true);
      expect(isValidDirectionChange("DOWN", "RIGHT")).toBe(true);
      expect(isValidDirectionChange("LEFT", "UP")).toBe(true);
      expect(isValidDirectionChange("LEFT", "DOWN")).toBe(true);
      expect(isValidDirectionChange("RIGHT", "UP")).toBe(true);
      expect(isValidDirectionChange("RIGHT", "DOWN")).toBe(true);
    });

    it("should prevent 180-degree turns (reverse direction)", () => {
      expect(isValidDirectionChange("UP", "DOWN")).toBe(false);
      expect(isValidDirectionChange("DOWN", "UP")).toBe(false);
      expect(isValidDirectionChange("LEFT", "RIGHT")).toBe(false);
      expect(isValidDirectionChange("RIGHT", "LEFT")).toBe(false);
    });

    it("should allow same direction (no change)", () => {
      expect(isValidDirectionChange("UP", "UP")).toBe(true);
      expect(isValidDirectionChange("DOWN", "DOWN")).toBe(true);
      expect(isValidDirectionChange("LEFT", "LEFT")).toBe(true);
      expect(isValidDirectionChange("RIGHT", "RIGHT")).toBe(true);
    });
  });

  describe("createInitialSnake", () => {
    it("should create snake with correct default length", () => {
      const snake = createInitialSnake(20);

      expect(snake).toHaveLength(3);
      expect(snake[0].isHead).toBe(true);
      expect(snake[1].isHead).toBe(false);
      expect(snake[2].isHead).toBe(false);
    });

    it("should create snake with custom length", () => {
      const snake = createInitialSnake(20, 5);

      expect(snake).toHaveLength(5);
      expect(snake[0].isHead).toBe(true);
      snake.slice(1).forEach((segment) => {
        expect(segment.isHead).toBe(false);
      });
    });

    it("should position snake in center of grid", () => {
      const gridSize = 20;
      const snake = createInitialSnake(gridSize);
      const head = snake[0];
      const expectedCenterX = Math.floor(gridSize / 2);
      const expectedCenterY = Math.floor(gridSize / 2);

      expect(head.position.x).toBe(expectedCenterX);
      expect(head.position.y).toBe(expectedCenterY);
    });

    it("should create snake segments going left from head", () => {
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

  describe("moveSnake", () => {
    const gridSize = 20;
    let testSnake: Snake;

    beforeEach(() => {
      testSnake = {
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
          { position: { x: 8, y: 10 }, isHead: false },
        ],
        direction: "RIGHT",
      };
    });

    it("should move snake head in the correct direction", () => {
      const movedSnake = moveSnake(testSnake, gridSize);

      expect(movedSnake.segments[0].position).toEqual({ x: 11, y: 10 });
      expect(movedSnake.segments[0].isHead).toBe(true);
    });

    it("should move body segments correctly", () => {
      const movedSnake = moveSnake(testSnake, gridSize);

      // Old head becomes body
      expect(movedSnake.segments[1].position).toEqual({ x: 10, y: 10 });
      expect(movedSnake.segments[1].isHead).toBe(false);

      // Old body segment moves up
      expect(movedSnake.segments[2].position).toEqual({ x: 9, y: 10 });
      expect(movedSnake.segments[2].isHead).toBe(false);
    });

    it("should remove tail segment (maintain same length)", () => {
      const originalLength = testSnake.segments.length;
      const movedSnake = moveSnake(testSnake, gridSize);

      expect(movedSnake.segments).toHaveLength(originalLength);
    });

    it("should handle different directions correctly", () => {
      // Test UP
      testSnake.direction = "UP";
      let movedSnake = moveSnake(testSnake, gridSize);
      expect(movedSnake.segments[0].position).toEqual({ x: 10, y: 9 });

      // Test DOWN
      testSnake.direction = "DOWN";
      movedSnake = moveSnake(testSnake, gridSize);
      expect(movedSnake.segments[0].position).toEqual({ x: 10, y: 11 });

      // Test LEFT
      testSnake.direction = "LEFT";
      movedSnake = moveSnake(testSnake, gridSize);
      expect(movedSnake.segments[0].position).toEqual({ x: 9, y: 10 });
    });

    it("should wrap around when hitting boundary", () => {
      // Position snake at right edge and move right - should wrap to left side
      testSnake.segments[0].position = { x: 19, y: 10 };
      testSnake.direction = "RIGHT";

      const movedSnake = moveSnake(testSnake, gridSize);

      // Should wrap to x=0
      expect(movedSnake.segments[0].position).toEqual({ x: 0, y: 10 });
    });

    it("should preserve immutability", () => {
      const originalSnake = { ...testSnake };
      const movedSnake = moveSnake(testSnake, gridSize);

      expect(movedSnake).not.toBe(testSnake);
      expect(movedSnake.segments).not.toBe(testSnake.segments);
      expect(testSnake.segments[0].position).toEqual(
        originalSnake.segments[0].position
      );
    });
  });

  describe("isPositionCollidingWithSnake", () => {
    const testSnake: Snake = {
      segments: [
        { position: { x: 10, y: 10 }, isHead: true },
        { position: { x: 9, y: 10 }, isHead: false },
        { position: { x: 8, y: 10 }, isHead: false },
      ],
      direction: "RIGHT",
    };

    it("should detect collision with snake head", () => {
      const result = isPositionCollidingWithSnake({ x: 10, y: 10 }, testSnake);
      expect(result).toBe(true);
    });

    it("should detect collision with snake body", () => {
      const result = isPositionCollidingWithSnake({ x: 9, y: 10 }, testSnake);
      expect(result).toBe(true);
    });

    it("should return false for non-colliding positions", () => {
      const result = isPositionCollidingWithSnake({ x: 5, y: 5 }, testSnake);
      expect(result).toBe(false);
    });

    it("should handle adjacent positions correctly", () => {
      expect(isPositionCollidingWithSnake({ x: 11, y: 10 }, testSnake)).toBe(
        false
      );
      expect(isPositionCollidingWithSnake({ x: 10, y: 11 }, testSnake)).toBe(
        false
      );
      expect(isPositionCollidingWithSnake({ x: 10, y: 9 }, testSnake)).toBe(
        false
      );
    });
  });

  describe("getSnakeHead", () => {
    it("should return the head position", () => {
      const testSnake: Snake = {
        segments: [
          { position: { x: 15, y: 8 }, isHead: true },
          { position: { x: 14, y: 8 }, isHead: false },
        ],
        direction: "RIGHT",
      };

      const head = getSnakeHead(testSnake);
      expect(head).toEqual({ x: 15, y: 8 });
    });

    it("should always return first segment position", () => {
      const testSnake: Snake = {
        segments: [
          { position: { x: 1, y: 1 }, isHead: true },
          { position: { x: 0, y: 1 }, isHead: false },
          { position: { x: 0, y: 0 }, isHead: false },
        ],
        direction: "DOWN",
      };

      const head = getSnakeHead(testSnake);
      expect(head).toEqual({ x: 1, y: 1 });
    });
  });

  describe("getSnakeTail", () => {
    it("should return the tail position", () => {
      const testSnake: Snake = {
        segments: [
          { position: { x: 15, y: 8 }, isHead: true },
          { position: { x: 14, y: 8 }, isHead: false },
          { position: { x: 13, y: 8 }, isHead: false },
        ],
        direction: "RIGHT",
      };

      const tail = getSnakeTail(testSnake);
      expect(tail).toEqual({ x: 13, y: 8 });
    });

    it("should handle single segment snake", () => {
      const testSnake: Snake = {
        segments: [{ position: { x: 10, y: 10 }, isHead: true }],
        direction: "RIGHT",
      };

      const tail = getSnakeTail(testSnake);
      expect(tail).toEqual({ x: 10, y: 10 });
    });
  });

  describe("wrapPosition - Story 1.3 Wall Wrapping", () => {
    const gridSize = 20;

    it("should wrap x position from right edge to left edge", () => {
      const position: Position = { x: 20, y: 10 };
      const wrapped = wrapPosition(position, gridSize);

      expect(wrapped).toEqual({ x: 0, y: 10 });
    });

    it("should wrap x position from left edge to right edge", () => {
      const position: Position = { x: -1, y: 10 };
      const wrapped = wrapPosition(position, gridSize);

      expect(wrapped).toEqual({ x: 19, y: 10 });
    });

    it("should wrap y position from bottom edge to top edge", () => {
      const position: Position = { x: 10, y: 20 };
      const wrapped = wrapPosition(position, gridSize);

      expect(wrapped).toEqual({ x: 10, y: 0 });
    });

    it("should wrap y position from top edge to bottom edge", () => {
      const position: Position = { x: 10, y: -1 };
      const wrapped = wrapPosition(position, gridSize);

      expect(wrapped).toEqual({ x: 10, y: 19 });
    });

    it("should not change position when within bounds", () => {
      const position: Position = { x: 10, y: 10 };
      const wrapped = wrapPosition(position, gridSize);

      expect(wrapped).toEqual({ x: 10, y: 10 });
    });

    it("should handle corner wrapping - both x and y out of bounds", () => {
      const position: Position = { x: -1, y: -1 };
      const wrapped = wrapPosition(position, gridSize);

      expect(wrapped).toEqual({ x: 19, y: 19 });
    });

    it("should handle corner wrapping - positive bounds", () => {
      const position: Position = { x: 20, y: 20 };
      const wrapped = wrapPosition(position, gridSize);

      expect(wrapped).toEqual({ x: 0, y: 0 });
    });
  });

  describe("moveSnake with wall wrapping - Story 1.3", () => {
    const gridSize = 20;
    let testSnake: Snake;

    beforeEach(() => {
      testSnake = {
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
          { position: { x: 8, y: 10 }, isHead: false },
        ],
        direction: "RIGHT",
      };
    });

    it("should wrap from right edge to left edge", () => {
      testSnake.segments[0].position = { x: 19, y: 10 };
      testSnake.direction = "RIGHT";

      const movedSnake = moveSnake(testSnake, gridSize);

      expect(movedSnake.segments[0].position).toEqual({ x: 0, y: 10 });
    });

    it("should wrap from left edge to right edge", () => {
      testSnake.segments[0].position = { x: 0, y: 10 };
      testSnake.direction = "LEFT";

      const movedSnake = moveSnake(testSnake, gridSize);

      expect(movedSnake.segments[0].position).toEqual({ x: 19, y: 10 });
    });

    it("should wrap from bottom edge to top edge", () => {
      testSnake.segments[0].position = { x: 10, y: 19 };
      testSnake.direction = "DOWN";

      const movedSnake = moveSnake(testSnake, gridSize);

      expect(movedSnake.segments[0].position).toEqual({ x: 10, y: 0 });
    });

    it("should wrap from top edge to bottom edge", () => {
      testSnake.segments[0].position = { x: 10, y: 0 };
      testSnake.direction = "UP";

      const movedSnake = moveSnake(testSnake, gridSize);

      expect(movedSnake.segments[0].position).toEqual({ x: 10, y: 19 });
    });
  });

  describe("Food and Growth - Story 1.4", () => {
    describe("checkFoodCollision", () => {
      const testSnake: Snake = {
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
          { position: { x: 8, y: 10 }, isHead: false },
        ],
        direction: "RIGHT",
      };

      it("should detect collision when snake head hits food", () => {
        const food: Food = { position: { x: 10, y: 10 } };
        const result = checkFoodCollision(testSnake, food);
        expect(result).toBe(true);
      });

      it("should not detect collision when snake head misses food", () => {
        const food: Food = { position: { x: 11, y: 10 } };
        const result = checkFoodCollision(testSnake, food);
        expect(result).toBe(false);
      });

      it("should not detect collision when snake body hits food", () => {
        const food: Food = { position: { x: 9, y: 10 } };
        const result = checkFoodCollision(testSnake, food);
        expect(result).toBe(false);
      });

      it("should handle food at different positions", () => {
        const positions = [
          { x: 5, y: 5 },
          { x: 15, y: 15 },
          { x: 0, y: 0 },
          { x: 19, y: 19 },
        ];

        positions.forEach((pos) => {
          const food: Food = { position: pos };
          const result = checkFoodCollision(testSnake, food);
          expect(typeof result).toBe("boolean");
        });
      });

      it("should handle edge case positions", () => {
        const edgePositions = [
          { x: 10, y: 9 }, // Above head
          { x: 10, y: 11 }, // Below head
          { x: 9, y: 10 }, // Left of head
          { x: 11, y: 10 }, // Right of head
        ];

        edgePositions.forEach((pos) => {
          const food: Food = { position: pos };
          const result = checkFoodCollision(testSnake, food);
          expect(result).toBe(false);
        });
      });
    });

    describe("generateFoodPosition", () => {
      const gridSize = 20;
      const testSnake: Snake = {
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
          { position: { x: 8, y: 10 }, isHead: false },
        ],
        direction: "RIGHT",
      };

      it("should generate position within grid bounds", () => {
        const position = generateFoodPosition(testSnake, gridSize);

        expect(position.x).toBeGreaterThanOrEqual(0);
        expect(position.x).toBeLessThan(gridSize);
        expect(position.y).toBeGreaterThanOrEqual(0);
        expect(position.y).toBeLessThan(gridSize);
      });

      it("should not generate position on snake body", () => {
        // Test multiple generations to ensure no collisions
        for (let i = 0; i < 10; i++) {
          const position = generateFoodPosition(testSnake, gridSize);

          // Should not collide with any snake segment
          const collidesWithSnake = testSnake.segments.some(
            (segment) =>
              segment.position.x === position.x &&
              segment.position.y === position.y
          );

          expect(collidesWithSnake).toBe(false);
        }
      });

      it("should handle snake occupying most of grid", () => {
        // Create a snake that occupies most of the grid
        const longSnake: Snake = {
          segments: [],
          direction: "RIGHT",
        };

        // Fill most of the grid with snake segments
        for (let i = 0; i < 15; i++) {
          for (let j = 0; j < 15; j++) {
            longSnake.segments.push({
              position: { x: i, y: j },
              isHead: i === 0 && j === 0,
            });
          }
        }

        const position = generateFoodPosition(longSnake, gridSize);

        // Position should still be valid
        expect(position.x).toBeGreaterThanOrEqual(0);
        expect(position.x).toBeLessThan(gridSize);
        expect(position.y).toBeGreaterThanOrEqual(0);
        expect(position.y).toBeLessThan(gridSize);
      });

      it("should generate different positions on multiple calls", () => {
        const positions = new Set<string>();

        // Generate multiple positions
        for (let i = 0; i < 20; i++) {
          const position = generateFoodPosition(testSnake, gridSize);
          positions.add(`${position.x},${position.y}`);
        }

        // Should generate at least some different positions
        // (Note: with random generation, we can't guarantee all are different)
        expect(positions.size).toBeGreaterThan(1);
      });

      it("should handle minimum grid size", () => {
        const smallSnake: Snake = {
          segments: [{ position: { x: 0, y: 0 }, isHead: true }],
          direction: "RIGHT",
        };

        const position = generateFoodPosition(smallSnake, 1);
        expect(position.x).toBe(0);
        expect(position.y).toBe(0);
      });
    });

    describe("createFood", () => {
      const gridSize = 20;
      const testSnake: Snake = {
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
        ],
        direction: "RIGHT",
      };

      it("should create food with valid position", () => {
        const food = createFood(testSnake, gridSize);

        expect(food).toHaveProperty("position");
        expect(food.position).toHaveProperty("x");
        expect(food.position).toHaveProperty("y");
        expect(typeof food.position.x).toBe("number");
        expect(typeof food.position.y).toBe("number");
      });

      it("should create food that doesn't collide with snake", () => {
        const food = createFood(testSnake, gridSize);

        const collidesWithSnake = testSnake.segments.some(
          (segment) =>
            segment.position.x === food.position.x &&
            segment.position.y === food.position.y
        );

        expect(collidesWithSnake).toBe(false);
      });

      it("should create food within grid bounds", () => {
        const food = createFood(testSnake, gridSize);

        expect(food.position.x).toBeGreaterThanOrEqual(0);
        expect(food.position.x).toBeLessThan(gridSize);
        expect(food.position.y).toBeGreaterThanOrEqual(0);
        expect(food.position.y).toBeLessThan(gridSize);
      });

      it("should handle different grid sizes", () => {
        const gridSizes = [5, 10, 15, 20];

        gridSizes.forEach((size) => {
          const food = createFood(testSnake, size);

          expect(food.position.x).toBeGreaterThanOrEqual(0);
          expect(food.position.x).toBeLessThan(size);
          expect(food.position.y).toBeGreaterThanOrEqual(0);
          expect(food.position.y).toBeLessThan(size);
        });
      });
    });

    describe("growSnake", () => {
      const testSnake: Snake = {
        segments: [
          { position: { x: 10, y: 10 }, isHead: true },
          { position: { x: 9, y: 10 }, isHead: false },
          { position: { x: 8, y: 10 }, isHead: false },
        ],
        direction: "RIGHT",
      };

      it("should increase snake length by one segment", () => {
        const originalLength = testSnake.segments.length;
        const grownSnake = growSnake(testSnake);

        expect(grownSnake.segments.length).toBe(originalLength + 1);
      });

      it("should add new segment at tail end", () => {
        const originalTail = getSnakeTail(testSnake);
        const grownSnake = growSnake(testSnake);
        const newTail = getSnakeTail(grownSnake);

        // New tail should be at the same position as old tail
        expect(newTail).toEqual(originalTail);
      });

      it("should maintain existing segments unchanged", () => {
        const grownSnake = growSnake(testSnake);

        // All original segments should remain the same
        for (let i = 0; i < testSnake.segments.length; i++) {
          expect(grownSnake.segments[i].position).toEqual(
            testSnake.segments[i].position
          );
          expect(grownSnake.segments[i].isHead).toBe(
            testSnake.segments[i].isHead
          );
        }
      });

      it("should set new segment as non-head", () => {
        const grownSnake = growSnake(testSnake);
        const newSegment = grownSnake.segments[grownSnake.segments.length - 1];

        expect(newSegment.isHead).toBe(false);
      });

      it("should maintain immutability", () => {
        const originalSnake = { ...testSnake };
        const grownSnake = growSnake(testSnake);

        expect(grownSnake).not.toBe(testSnake);
        expect(grownSnake.segments).not.toBe(testSnake.segments);
        expect(testSnake.segments).toEqual(originalSnake.segments);
      });

      it("should handle single segment snake", () => {
        const singleSegmentSnake: Snake = {
          segments: [{ position: { x: 10, y: 10 }, isHead: true }],
          direction: "RIGHT",
        };

        const grownSnake = growSnake(singleSegmentSnake);

        expect(grownSnake.segments.length).toBe(2);
        expect(grownSnake.segments[0].isHead).toBe(true);
        expect(grownSnake.segments[1].isHead).toBe(false);
        expect(grownSnake.segments[1].position).toEqual({ x: 10, y: 10 });
      });

      it("should handle multiple growth operations", () => {
        let currentSnake = { ...testSnake };
        const originalLength = currentSnake.segments.length;

        // Grow snake multiple times
        for (let i = 0; i < 5; i++) {
          currentSnake = growSnake(currentSnake);
        }

        expect(currentSnake.segments.length).toBe(originalLength + 5);
      });

      it("should preserve direction", () => {
        const grownSnake = growSnake(testSnake);

        expect(grownSnake.direction).toBe(testSnake.direction);
      });
    });

    describe("Food and Growth Integration", () => {
      const gridSize = 20;
      let testSnake: Snake;

      beforeEach(() => {
        testSnake = {
          segments: [
            { position: { x: 10, y: 10 }, isHead: true },
            { position: { x: 9, y: 10 }, isHead: false },
          ],
          direction: "RIGHT",
        };
      });

      it("should create food that snake can potentially reach", () => {
        const food = createFood(testSnake, gridSize);

        // Food should be within grid bounds
        expect(food.position.x).toBeGreaterThanOrEqual(0);
        expect(food.position.x).toBeLessThan(gridSize);
        expect(food.position.y).toBeGreaterThanOrEqual(0);
        expect(food.position.y).toBeLessThan(gridSize);

        // Food should not be on snake
        const onSnake = testSnake.segments.some(
          (segment) =>
            segment.position.x === food.position.x &&
            segment.position.y === food.position.y
        );
        expect(onSnake).toBe(false);
      });

      it("should detect collision when snake moves to food", () => {
        const food = createFood(testSnake, gridSize);

        // Move snake to food position
        testSnake.segments[0].position = food.position;

        const collision = checkFoodCollision(testSnake, food);
        expect(collision).toBe(true);
      });

      it("should grow snake after collision detection", () => {
        const food = createFood(testSnake, gridSize);
        const originalLength = testSnake.segments.length;

        // Simulate collision
        testSnake.segments[0].position = food.position;
        const collision = checkFoodCollision(testSnake, food);

        if (collision) {
          const grownSnake = growSnake(testSnake);
          expect(grownSnake.segments.length).toBe(originalLength + 1);
        }
      });

      it("should handle complete food consumption cycle", () => {
        // Create initial food
        const initialFood = createFood(testSnake, gridSize);

        // Simulate snake eating food
        testSnake.segments[0].position = initialFood.position;
        const collision = checkFoodCollision(testSnake, initialFood);

        if (collision) {
          // Grow snake
          testSnake = growSnake(testSnake);

          // Create new food
          const newFood = createFood(testSnake, gridSize);

          // New food should not be on the grown snake
          const onSnake = testSnake.segments.some(
            (segment) =>
              segment.position.x === newFood.position.x &&
              segment.position.y === newFood.position.y
          );
          expect(onSnake).toBe(false);
        }
      });
    });
  });
});
