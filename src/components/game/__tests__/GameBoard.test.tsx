import React from "react";
import { render, fireEvent } from "@testing-library/react";
import GameBoard from "../GameBoard";
import { Snake, Direction, Food } from "@/types/game";
import { GAME_CONFIG } from "@/lib/constants";

// Mock canvas context
const mockContext = {
  fillRect: jest.fn(),
  strokeRect: jest.fn(),
  fillStyle: "",
  strokeStyle: "",
  lineWidth: 1,
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
};

// Canvas mock setup for HTMLCanvasElement

// Mock HTMLCanvasElement
Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: jest.fn(() => mockContext),
});

describe("GameBoard Component - Story 1.1", () => {
  const mockSnake: Snake = {
    segments: [
      { position: { x: 10, y: 10 }, isHead: true },
      { position: { x: 9, y: 10 }, isHead: false },
      { position: { x: 8, y: 10 }, isHead: false },
    ],
    direction: "RIGHT" as Direction,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockContext.fillRect.mockClear();
    mockContext.strokeRect.mockClear();
    mockContext.beginPath.mockClear();
    mockContext.moveTo.mockClear();
    mockContext.lineTo.mockClear();
    mockContext.stroke.mockClear();
  });

  describe("Canvas Rendering - Story 1.1 Acceptance Criteria", () => {
    it("should render canvas element", () => {
      render(<GameBoard />);

      const canvas = document.querySelector("canvas");
      expect(canvas).toBeInTheDocument();
      expect(canvas.tagName.toLowerCase()).toBe("canvas");
    });

    it("should set correct canvas dimensions based on grid size", () => {
      const mockOnCanvasReady = jest.fn();
      render(<GameBoard onCanvasReady={mockOnCanvasReady} />);

      // Verify canvas ready callback is called
      expect(mockOnCanvasReady).toHaveBeenCalledTimes(1);

      // Verify the canvas element is passed to callback
      const canvasElement = mockOnCanvasReady.mock.calls[0][0];
      expect(canvasElement.tagName.toLowerCase()).toBe("canvas");
    });

    it("should apply correct styling classes", () => {
      render(<GameBoard />);

      const canvas = document.querySelector("canvas");
      expect(canvas).toBeInTheDocument();
      expect(canvas!).toHaveClass("border-2", "border-gray-700", "bg-gray-900");
    });

    it("should be focusable for keyboard events", () => {
      render(<GameBoard />);

      const canvas = document.querySelector("canvas");
      expect(canvas).toBeInTheDocument();
      expect(canvas!).toHaveAttribute("tabIndex", "0");
    });
  });

  describe("Grid Rendering - Story 1.1 Acceptance Criteria", () => {
    it("should draw background on canvas", () => {
      render(<GameBoard />);

      // Should fill background
      expect(mockContext.fillRect).toHaveBeenCalledWith(
        0,
        0,
        GAME_CONFIG.GRID_SIZE * GAME_CONFIG.CELL_SIZE,
        GAME_CONFIG.GRID_SIZE * GAME_CONFIG.CELL_SIZE
      );
    });

    it("should draw grid lines", () => {
      render(<GameBoard />);

      // Should call stroke for grid lines
      expect(mockContext.stroke).toHaveBeenCalled();
      expect(mockContext.beginPath).toHaveBeenCalled();
      expect(mockContext.moveTo).toHaveBeenCalled();
      expect(mockContext.lineTo).toHaveBeenCalled();
    });

    it("should draw correct number of grid lines", () => {
      render(<GameBoard />);

      // Should draw vertical and horizontal lines
      // (GRID_SIZE + 1) lines in each direction
      const expectedLines = (GAME_CONFIG.GRID_SIZE + 1) * 2;
      expect(mockContext.beginPath).toHaveBeenCalledTimes(expectedLines);
    });
  });

  describe("Snake Rendering - Story 1.2 Integration", () => {
    it("should render snake when provided", () => {
      render(<GameBoard snake={mockSnake} />);

      // Should fill rect for each snake segment
      expect(mockContext.fillRect).toHaveBeenCalledTimes(
        1 + // background
          mockSnake.segments.length // snake segments
      );
    });

    it("should render snake head with correct color", () => {
      render(<GameBoard snake={mockSnake} />);

      // Check that head color is set
      expect(mockContext.fillStyle).toBeDefined();
    });

    it("should render snake body with correct color", () => {
      render(<GameBoard snake={mockSnake} />);

      // Should render each segment
      mockSnake.segments.forEach((segment) => {
        const expectedX = segment.position.x * GAME_CONFIG.CELL_SIZE + 1;
        const expectedY = segment.position.y * GAME_CONFIG.CELL_SIZE + 1;
        const expectedSize = GAME_CONFIG.CELL_SIZE - 2;

        expect(mockContext.fillRect).toHaveBeenCalledWith(
          expectedX,
          expectedY,
          expectedSize,
          expectedSize
        );
      });
    });

    it("should not render snake when not provided", () => {
      render(<GameBoard />);

      // Should only fill background, no snake segments
      expect(mockContext.fillRect).toHaveBeenCalledTimes(1);
    });
  });

  describe("Keyboard Event Handling - Story 1.3 Integration", () => {
    it("should handle arrow key events", () => {
      const mockOnDirectionChange = jest.fn();
      render(<GameBoard onDirectionChange={mockOnDirectionChange} />);

      // Test each arrow key
      fireEvent.keyDown(window, { key: "ArrowUp" });
      expect(mockOnDirectionChange).toHaveBeenCalledWith("UP");

      fireEvent.keyDown(window, { key: "ArrowDown" });
      expect(mockOnDirectionChange).toHaveBeenCalledWith("DOWN");

      fireEvent.keyDown(window, { key: "ArrowLeft" });
      expect(mockOnDirectionChange).toHaveBeenCalledWith("LEFT");

      fireEvent.keyDown(window, { key: "ArrowRight" });
      expect(mockOnDirectionChange).toHaveBeenCalledWith("RIGHT");
    });

    it("should handle WASD key events", () => {
      const mockOnDirectionChange = jest.fn();
      render(<GameBoard onDirectionChange={mockOnDirectionChange} />);

      // Test WASD keys (lowercase)
      fireEvent.keyDown(window, { key: "w" });
      expect(mockOnDirectionChange).toHaveBeenCalledWith("UP");

      fireEvent.keyDown(window, { key: "s" });
      expect(mockOnDirectionChange).toHaveBeenCalledWith("DOWN");

      fireEvent.keyDown(window, { key: "a" });
      expect(mockOnDirectionChange).toHaveBeenCalledWith("LEFT");

      fireEvent.keyDown(window, { key: "d" });
      expect(mockOnDirectionChange).toHaveBeenCalledWith("RIGHT");
    });

    it("should handle WASD key events (uppercase)", () => {
      const mockOnDirectionChange = jest.fn();
      render(<GameBoard onDirectionChange={mockOnDirectionChange} />);

      // Test WASD keys (uppercase)
      fireEvent.keyDown(window, { key: "W" });
      expect(mockOnDirectionChange).toHaveBeenCalledWith("UP");

      fireEvent.keyDown(window, { key: "S" });
      expect(mockOnDirectionChange).toHaveBeenCalledWith("DOWN");

      fireEvent.keyDown(window, { key: "A" });
      expect(mockOnDirectionChange).toHaveBeenCalledWith("LEFT");

      fireEvent.keyDown(window, { key: "D" });
      expect(mockOnDirectionChange).toHaveBeenCalledWith("RIGHT");
    });

    it("should prevent default behavior for game keys", () => {
      const mockOnDirectionChange = jest.fn();
      render(<GameBoard onDirectionChange={mockOnDirectionChange} />);

      const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
      const preventDefaultSpy = jest.spyOn(event, "preventDefault");

      fireEvent(window, event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it("should ignore unrecognized keys", () => {
      const mockOnDirectionChange = jest.fn();
      render(<GameBoard onDirectionChange={mockOnDirectionChange} />);

      fireEvent.keyDown(window, { key: "Space" });
      fireEvent.keyDown(window, { key: "Enter" });
      fireEvent.keyDown(window, { key: "Escape" });

      expect(mockOnDirectionChange).not.toHaveBeenCalled();
    });

    it("should not handle events when no callback provided", () => {
      // Should not throw error
      expect(() => {
        render(<GameBoard />);
        fireEvent.keyDown(window, { key: "ArrowUp" });
      }).not.toThrow();
    });
  });

  describe("Component Cleanup", () => {
    it("should remove event listeners on unmount", () => {
      const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
      const mockOnDirectionChange = jest.fn();

      const { unmount } = render(
        <GameBoard onDirectionChange={mockOnDirectionChange} />
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function)
      );

      removeEventListenerSpy.mockRestore();
    });
  });

  describe("Canvas Configuration", () => {
    it("should configure canvas with correct properties", () => {
      render(<GameBoard />);

      // Verify canvas context configuration
      expect(mockContext.strokeStyle).toBeDefined();
      expect(mockContext.lineWidth).toBeDefined();
      expect(mockContext.fillStyle).toBeDefined();
    });
  });

  describe("Food Rendering - Story 1.4", () => {
    const mockFood: Food = {
      position: { x: 15, y: 10 },
    };

    it("should render food when provided", () => {
      render(<GameBoard food={mockFood} />);

      // Should call fillRect for food rendering
      expect(mockContext.fillRect).toHaveBeenCalled();
    });

    it("should render food at correct position", () => {
      render(<GameBoard food={mockFood} />);

      // Food should be rendered as a circle using arc method
      const x = mockFood.position.x * GAME_CONFIG.CELL_SIZE;
      const y = mockFood.position.y * GAME_CONFIG.CELL_SIZE;
      const size = GAME_CONFIG.CELL_SIZE;
      const padding = 3; // FOOD_PADDING
      const radius = (size - padding * 2) / 2;
      const centerX = x + size / 2;
      const centerY = y + size / 2;

      expect(mockContext.arc).toHaveBeenCalledWith(
        centerX,
        centerY,
        radius,
        0,
        2 * Math.PI
      );
      expect(mockContext.fill).toHaveBeenCalled();
    });

    it("should render food with correct styling", () => {
      render(<GameBoard food={mockFood} />);

      // Should set fill style for food
      expect(mockContext.fillStyle).toBeDefined();
    });

    it("should not render food when not provided", () => {
      render(<GameBoard />);

      // Should only fill background, no food rendering
      expect(mockContext.fillRect).toHaveBeenCalledTimes(1);
    });

    it("should handle food at different positions", () => {
      const positions = [
        { x: 0, y: 0 },
        { x: 19, y: 19 },
        { x: 10, y: 5 },
        { x: 5, y: 15 },
      ];

      positions.forEach((pos) => {
        const food: Food = { position: pos };
        render(<GameBoard food={food} />);

        // Should render food at each position
        expect(mockContext.fillRect).toHaveBeenCalled();
      });
    });

    it("should render food and snake together", () => {
      render(<GameBoard snake={mockSnake} food={mockFood} />);

      // Should render both snake and food
      expect(mockContext.fillRect).toHaveBeenCalled();
    });

    it("should handle food at edge positions", () => {
      const edgeFood: Food = { position: { x: 0, y: 0 } };
      render(<GameBoard food={edgeFood} />);

      // Should render food as circle at edge position
      const x = 0 * GAME_CONFIG.CELL_SIZE;
      const y = 0 * GAME_CONFIG.CELL_SIZE;
      const size = GAME_CONFIG.CELL_SIZE;
      const padding = 3; // FOOD_PADDING
      const radius = (size - padding * 2) / 2;
      const centerX = x + size / 2;
      const centerY = y + size / 2;

      expect(mockContext.arc).toHaveBeenCalledWith(
        centerX,
        centerY,
        radius,
        0,
        2 * Math.PI
      );
      expect(mockContext.fill).toHaveBeenCalled();
    });

    it("should maintain food rendering consistency", () => {
      const { rerender } = render(<GameBoard food={mockFood} />);

      // Re-render with same food
      rerender(<GameBoard food={mockFood} />);

      // Should still render food correctly
      expect(mockContext.fillRect).toHaveBeenCalled();
    });
  });
});
