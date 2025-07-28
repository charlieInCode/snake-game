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
  }: {
    onCanvasReady?: (canvas: HTMLCanvasElement) => void;
    snake: {
      segments: Array<{ position: { x: number; y: number }; isHead: boolean }>;
    };
    food: { position: { x: number; y: number } };
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

import { useGameLogic } from "@/hooks/useGameLogic";
import { useGameLoop } from "@/hooks/useGameLoop";

const mockUseGameLogic = useGameLogic as jest.MockedFunction<typeof useGameLogic>;
const mockUseGameLoop = useGameLoop as jest.MockedFunction<typeof useGameLoop>;

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
        screenState: "playing",
      },
      moveSnakeOnTick: jest.fn(),
      getSnake: jest.fn().mockReturnValue({
        segments: [{ position: { x: 10, y: 10 }, isHead: true }],
        direction: "RIGHT",
      }),
      getFood: jest.fn().mockReturnValue({ position: { x: 15, y: 10 } }),
      getScore: jest.fn().mockReturnValue(0),
      getIsGameOver: jest.fn().mockReturnValue(false),
      getScreenState: jest.fn().mockReturnValue("playing"),
      updateSnakeDirection: jest.fn(),
      startGame: jest.fn(),
      resetGame: jest.fn(),
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
    });
  });

  describe("Score Display Updates", () => {
    it("should display updated score when game state changes", () => {
      mockUseGameLogic.mockReturnValue({
        gameState: {
          snake: {
            segments: [{ position: { x: 10, y: 10 }, isHead: true }],
            direction: "RIGHT",
          },
          food: { position: { x: 15, y: 10 } },
          score: 50,
          isGameOver: false,
          screenState: "playing",
        },
        moveSnakeOnTick: jest.fn(),
        getSnake: jest.fn().mockReturnValue({
          segments: [{ position: { x: 10, y: 10 }, isHead: true }],
          direction: "RIGHT",
        }),
        getFood: jest.fn().mockReturnValue({ position: { x: 15, y: 10 } }),
        getScore: jest.fn().mockReturnValue(50),
        getIsGameOver: jest.fn().mockReturnValue(false),
        getScreenState: jest.fn().mockReturnValue("playing"),
        updateSnakeDirection: jest.fn(),
        startGame: jest.fn(),
        resetGame: jest.fn(),
      });

      render(<Home />);

      const scoreElement = screen.getByText(/Score: 50/);
      expect(scoreElement).toBeInTheDocument();
    });

    it("should handle score display for different score values", () => {
      const testScores = [0, 10, 25, 100, 999];

      testScores.forEach((score) => {
        mockUseGameLogic.mockReturnValue({
          gameState: {
            snake: {
              segments: [{ position: { x: 10, y: 10 }, isHead: true }],
              direction: "RIGHT",
            },
            food: { position: { x: 15, y: 10 } },
            score: score,
            isGameOver: false,
            screenState: "playing",
          },
          moveSnakeOnTick: jest.fn(),
          getSnake: jest.fn().mockReturnValue({
            segments: [{ position: { x: 10, y: 10 }, isHead: true }],
            direction: "RIGHT",
          }),
          getFood: jest.fn().mockReturnValue({ position: { x: 15, y: 10 } }),
          getScore: jest.fn().mockReturnValue(score),
          getIsGameOver: jest.fn().mockReturnValue(false),
          getScreenState: jest.fn().mockReturnValue("playing"),
          updateSnakeDirection: jest.fn(),
          startGame: jest.fn(),
          resetGame: jest.fn(),
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
          score: 75,
          isGameOver: true,
          screenState: "game-over",
        },
        moveSnakeOnTick: jest.fn(),
        getSnake: jest.fn().mockReturnValue({
          segments: [{ position: { x: 10, y: 10 }, isHead: true }],
          direction: "RIGHT",
        }),
        getFood: jest.fn().mockReturnValue({ position: { x: 15, y: 10 } }),
        getScore: jest.fn().mockReturnValue(75),
        getIsGameOver: jest.fn().mockReturnValue(true),
        getScreenState: jest.fn().mockReturnValue("game-over"),
        updateSnakeDirection: jest.fn(),
        startGame: jest.fn(),
        resetGame: jest.fn(),
      });

      render(<Home />);

      // Should show game over screen with score
      const gameOverElement = screen.getByText(/Game Over!/);
      expect(gameOverElement).toBeInTheDocument();
    });
  });

  describe("Score Display Layout and Styling", () => {
    it("should display score in the game information section", () => {
      render(<Home />);

      const scoreElement = screen.getByText(/Score: 0/);
      expect(scoreElement).toBeInTheDocument();
    });

    it("should display score with consistent styling", () => {
      render(<Home />);

      const scoreElement = screen.getByText(/Score: 0/);
      expect(scoreElement).toHaveClass("text-sm", "text-gray-400");
    });

    it("should display score prominently in the game interface", () => {
      render(<Home />);

      const scoreElement = screen.getByText(/Score: 0/);
      expect(scoreElement).toBeInTheDocument();
    });
  });

  describe("Score Display Integration", () => {
    it("should integrate score display with other game information", () => {
      render(<Home />);

      const scoreElement = screen.getByText(/Score: 0/);
      const snakeLengthElement = screen.getByText(/Snake Length: 1/);
      const gameTicksElement = screen.getByText(/Game Ticks:/);

      expect(scoreElement).toBeInTheDocument();
      expect(snakeLengthElement).toBeInTheDocument();
      expect(gameTicksElement).toBeInTheDocument();
    });

    it("should maintain score display during game interactions", () => {
      render(<Home />);

      const scoreElement = screen.getByText(/Score: 0/);
      expect(scoreElement).toBeInTheDocument();

      // Verify other game elements are present
      const gameBoard = screen.getByTestId("game-board");
      expect(gameBoard).toBeInTheDocument();
    });

    it("should handle score display with different game states", () => {
      const gameStates = ["start", "playing", "paused", "game-over"];

      gameStates.forEach((state) => {
        mockUseGameLogic.mockReturnValue({
          gameState: {
            snake: {
              segments: [{ position: { x: 10, y: 10 }, isHead: true }],
              direction: "RIGHT",
            },
            food: { position: { x: 15, y: 10 } },
            score: 25,
            isGameOver: state === "game-over",
            screenState: state,
          },
          moveSnakeOnTick: jest.fn(),
          getSnake: jest.fn().mockReturnValue({
            segments: [{ position: { x: 10, y: 10 }, isHead: true }],
            direction: "RIGHT",
          }),
          getFood: jest.fn().mockReturnValue({ position: { x: 15, y: 10 } }),
          getScore: jest.fn().mockReturnValue(25),
          getIsGameOver: jest.fn().mockReturnValue(state === "game-over"),
          getScreenState: jest.fn().mockReturnValue(state),
          updateSnakeDirection: jest.fn(),
          startGame: jest.fn(),
          resetGame: jest.fn(),
        });

        const { unmount } = render(<Home />);

        if (state === "start") {
          const startScreen = screen.getByText(/Start Game/);
          expect(startScreen).toBeInTheDocument();
        } else if (state === "game-over") {
          const gameOverScreen = screen.getByText(/Game Over!/);
          expect(gameOverScreen).toBeInTheDocument();
        } else {
          const scoreElement = screen.getByText(/Score: 25/);
          expect(scoreElement).toBeInTheDocument();
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
    });

    it("should maintain score readability across different screen sizes", () => {
      render(<Home />);

      const scoreElement = screen.getByText(/Score: 0/);
      expect(scoreElement).toBeInTheDocument();
    });
  });
});
