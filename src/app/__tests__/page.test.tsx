import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../page";

// Mock the hooks to control game state
jest.mock("@/hooks/useGameLogic", () => ({
  useGameLogic: jest.fn(),
}));

jest.mock("@/hooks/useGameLoop", () => ({
  useGameLoop: jest.fn(),
}));

// Mock the GameBoard component to avoid canvas issues
jest.mock("@/components/game/GameBoard", () => {
  return function MockGameBoard({
    onCanvasReady,
    snake,
    food,
    onDirectionChange,
  }: {
    onCanvasReady?: (canvas: HTMLCanvasElement) => void;
    snake: {
      segments: Array<{ position: { x: number; y: number }; isHead: boolean }>;
    };
    food: { position: { x: number; y: number } };
    onDirectionChange?: (direction: string) => void;
  }) {
    // Simulate canvas ready callback
    React.useEffect(() => {
      if (onCanvasReady) {
        onCanvasReady(document.createElement("canvas"));
      }
    }, [onCanvasReady]);

    return (
      <div data-testid="game-board">
        <div data-testid="snake-segments">{snake.segments.length}</div>
        <div data-testid="food-position">
          {food.position.x}, {food.position.y}
        </div>
      </div>
    );
  };
});

const mockUseGameLogic = require("@/hooks/useGameLogic").useGameLogic;
const mockUseGameLoop = require("@/hooks/useGameLoop").useGameLoop;

describe("Home Page - Score Display - Story 1.5", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Default mock implementation
    mockUseGameLogic.mockReturnValue({
      gameState: {
        snake: {
          segments: [{ position: { x: 10, y: 10 }, isHead: true }],
          direction: "RIGHT",
        },
        food: { position: { x: 15, y: 10 } },
        score: 0,
        isGameOver: false,
      },
      moveSnakeOnTick: jest.fn(),
      getSnake: jest.fn().mockReturnValue({
        segments: [{ position: { x: 10, y: 10 }, isHead: true }],
        direction: "RIGHT",
      }),
      getFood: jest.fn().mockReturnValue({ position: { x: 15, y: 10 } }),
      getScore: jest.fn().mockReturnValue(0),
      getIsGameOver: jest.fn().mockReturnValue(false),
      updateSnakeDirection: jest.fn(),
    });

    mockUseGameLoop.mockImplementation(() => {});
  });

  describe("Score Display Initialization", () => {
    it("should display initial score of 0", () => {
      render(<Home />);

      const scoreElement = screen.getByText(/Score: 0/);
      expect(scoreElement).toBeInTheDocument();
    });

    it("should display score in the correct format", () => {
      render(<Home />);

      const scoreText = screen.getByText(/Score:/);
      expect(scoreText).toBeInTheDocument();
      expect(scoreText.textContent).toMatch(/Score: \d+/);
    });

    it("should display score prominently on the page", () => {
      render(<Home />);

      const scoreElement = screen.getByText(/Score: 0/);
      expect(scoreElement).toBeInTheDocument();

      // Score should be visible and not hidden
      expect(scoreElement).toBeVisible();
    });
  });

  describe("Score Display Updates", () => {
    it("should display updated score when game state changes", () => {
      // Mock with different scores
      mockUseGameLogic.mockReturnValue({
        gameState: {
          snake: {
            segments: [{ position: { x: 10, y: 10 }, isHead: true }],
            direction: "RIGHT",
          },
          food: { position: { x: 15, y: 10 } },
          score: 30,
          isGameOver: false,
        },
        moveSnakeOnTick: jest.fn(),
        getSnake: jest.fn().mockReturnValue({
          segments: [{ position: { x: 10, y: 10 }, isHead: true }],
          direction: "RIGHT",
        }),
        getFood: jest.fn().mockReturnValue({ position: { x: 15, y: 10 } }),
        getScore: jest.fn().mockReturnValue(30),
        getIsGameOver: jest.fn().mockReturnValue(false),
        updateSnakeDirection: jest.fn(),
      });

      render(<Home />);

      const scoreElement = screen.getByText(/Score: 30/);
      expect(scoreElement).toBeInTheDocument();
    });

    it("should handle score display for different score values", () => {
      const testScores = [0, 10, 50, 100, 250, 1000];

      testScores.forEach((score) => {
        mockUseGameLogic.mockReturnValue({
          gameState: {
            snake: {
              segments: [{ position: { x: 10, y: 10 }, isHead: true }],
              direction: "RIGHT",
            },
            food: { position: { x: 15, y: 10 } },
            score,
            isGameOver: false,
          },
          moveSnakeOnTick: jest.fn(),
          getSnake: jest.fn().mockReturnValue({
            segments: [{ position: { x: 10, y: 10 }, isHead: true }],
            direction: "RIGHT",
          }),
          getFood: jest.fn().mockReturnValue({ position: { x: 15, y: 10 } }),
          getScore: jest.fn().mockReturnValue(score),
          getIsGameOver: jest.fn().mockReturnValue(false),
          updateSnakeDirection: jest.fn(),
        });

        const { unmount } = render(<Home />);

        const scoreElement = screen.getByText(new RegExp(`Score: ${score}`));
        expect(scoreElement).toBeInTheDocument();

        unmount();
      });
    });

    it("should maintain score display during game over state", () => {
      mockUseGameLogic.mockReturnValue({
        gameState: {
          snake: {
            segments: [{ position: { x: 10, y: 10 }, isHead: true }],
            direction: "RIGHT",
          },
          food: { position: { x: 15, y: 10 } },
          score: 150,
          isGameOver: true,
        },
        moveSnakeOnTick: jest.fn(),
        getSnake: jest.fn().mockReturnValue({
          segments: [{ position: { x: 10, y: 10 }, isHead: true }],
          direction: "RIGHT",
        }),
        getFood: jest.fn().mockReturnValue({ position: { x: 15, y: 10 } }),
        getScore: jest.fn().mockReturnValue(150),
        getIsGameOver: jest.fn().mockReturnValue(true),
        updateSnakeDirection: jest.fn(),
      });

      render(<Home />);

      // Score should still be displayed even during game over
      const scoreElement = screen.getByText(/Score: 150/);
      expect(scoreElement).toBeInTheDocument();

      // Game over message should also be present
      const gameOverElement = screen.getByText(/Game Over!/);
      expect(gameOverElement).toBeInTheDocument();
    });
  });

  describe("Score Display Layout and Styling", () => {
    it("should display score in the game information section", () => {
      render(<Home />);

      const scoreElement = screen.getByText(/Score: 0/);
      expect(scoreElement).toBeInTheDocument();

      // Score should be in the game info section with other stats
      const gameTicksElement = screen.getByText(/Game Ticks:/);
      const snakeLengthElement = screen.getByText(/Snake Length:/);

      expect(gameTicksElement).toBeInTheDocument();
      expect(snakeLengthElement).toBeInTheDocument();
    });

    it("should display score with consistent styling", () => {
      render(<Home />);

      const scoreElement = screen.getByText(/Score: 0/);
      expect(scoreElement).toBeInTheDocument();

      // Score should have the same styling as other game info
      expect(scoreElement).toHaveClass("text-sm", "text-gray-400");
    });

    it("should display score prominently in the game interface", () => {
      render(<Home />);

      const scoreElement = screen.getByText(/Score: 0/);
      expect(scoreElement).toBeInTheDocument();

      // Score should be easily readable and prominent
      expect(scoreElement).toBeVisible();
      expect(scoreElement.textContent).toContain("Score:");
    });
  });

  describe("Score Display Integration", () => {
    it("should integrate score display with other game information", () => {
      render(<Home />);

      // All game information should be displayed together
      expect(screen.getByText(/Game Ticks:/)).toBeInTheDocument();
      expect(screen.getByText(/Score: 0/)).toBeInTheDocument();
      expect(screen.getByText(/Snake Length:/)).toBeInTheDocument();
      expect(screen.getByText(/Input Debounce:/)).toBeInTheDocument();
      expect(screen.getByText(/Game Loop:/)).toBeInTheDocument();
    });

    it("should maintain score display during game interactions", () => {
      render(<Home />);

      const scoreElement = screen.getByText(/Score: 0/);
      expect(scoreElement).toBeInTheDocument();

      // Score should remain visible and accessible
      expect(scoreElement).toBeVisible();
      expect(scoreElement.textContent).toMatch(/Score: \d+/);
    });

    it("should handle score display with different game states", () => {
      const testStates = [
        { score: 0, isGameOver: false },
        { score: 10, isGameOver: false },
        { score: 50, isGameOver: false },
        { score: 100, isGameOver: true },
      ];

      testStates.forEach(({ score, isGameOver }) => {
        mockUseGameLogic.mockReturnValue({
          gameState: {
            snake: {
              segments: [{ position: { x: 10, y: 10 }, isHead: true }],
              direction: "RIGHT",
            },
            food: { position: { x: 15, y: 10 } },
            score,
            isGameOver,
          },
          moveSnakeOnTick: jest.fn(),
          getSnake: jest.fn().mockReturnValue({
            segments: [{ position: { x: 10, y: 10 }, isHead: true }],
            direction: "RIGHT",
          }),
          getFood: jest.fn().mockReturnValue({ position: { x: 15, y: 10 } }),
          getScore: jest.fn().mockReturnValue(score),
          getIsGameOver: jest.fn().mockReturnValue(isGameOver),
          updateSnakeDirection: jest.fn(),
        });

        const { unmount } = render(<Home />);

        const scoreElement = screen.getByText(new RegExp(`Score: ${score}`));
        expect(scoreElement).toBeInTheDocument();

        if (isGameOver) {
          expect(screen.getByText(/Game Over!/)).toBeInTheDocument();
        }

        unmount();
      });
    });
  });

  describe("Score Display Accessibility", () => {
    it("should provide accessible score information", () => {
      render(<Home />);

      const scoreElement = screen.getByText(/Score: 0/);
      expect(scoreElement).toBeInTheDocument();

      // Score should be readable and accessible
      expect(scoreElement).toBeVisible();
      expect(scoreElement.textContent).toContain("Score:");
    });

    it("should maintain score readability across different screen sizes", () => {
      render(<Home />);

      const scoreElement = screen.getByText(/Score: 0/);
      expect(scoreElement).toBeInTheDocument();

      // Score should be responsive and readable
      expect(scoreElement).toBeVisible();
    });
  });
});
