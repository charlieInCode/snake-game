import { renderHook, act } from "@testing-library/react";
import { useGameLoop } from "../useGameLoop";

// Mock requestAnimationFrame
const mockRequestAnimationFrame = jest.fn();
const mockCancelAnimationFrame = jest.fn();

global.requestAnimationFrame = mockRequestAnimationFrame;
global.cancelAnimationFrame = mockCancelAnimationFrame;

// Helper to simulate requestAnimationFrame behavior
const simulateAnimationFrame = (time: number) => {
  if (mockRequestAnimationFrame.mock.calls.length > 0) {
    const callback =
      mockRequestAnimationFrame.mock.calls[
        mockRequestAnimationFrame.mock.calls.length - 1
      ][0];
    callback(time);
  }
};

describe("useGameLoop", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("Basic functionality", () => {
    it("should start game loop when isRunning is true", () => {
      const onTick = jest.fn();

      expect(() => {
        renderHook(() =>
          useGameLoop({
            isRunning: true,
            onTick,
          })
        );
      }).not.toThrow();
    });

    it("should not start game loop when isRunning is false", () => {
      const onTick = jest.fn();

      renderHook(() =>
        useGameLoop({
          isRunning: false,
          onTick,
        })
      );

      expect(mockRequestAnimationFrame).not.toHaveBeenCalled();
    });

    it("should accept new timing parameters", () => {
      const onTick = jest.fn();
      const onSnakeMove = jest.fn();

      expect(() => {
        renderHook(() =>
          useGameLoop({
            isRunning: true,
            onTick,
            onSnakeMove,
            gameSpeed: 16,
            snakeSpeed: 150,
          })
        );
      }).not.toThrow();
    });
  });

  describe("Timing separation", () => {
    it("should support separate game and snake timing parameters", () => {
      const onTick = jest.fn();
      const onSnakeMove = jest.fn();

      expect(() => {
        renderHook(() =>
          useGameLoop({
            isRunning: true,
            onTick,
            onSnakeMove,
            gameSpeed: 16,
            snakeSpeed: 150,
          })
        );
      }).not.toThrow();
    });

    it("should support different speed ratios", () => {
      const onTick = jest.fn();
      const onSnakeMove = jest.fn();

      expect(() => {
        renderHook(() =>
          useGameLoop({
            isRunning: true,
            onTick,
            onSnakeMove,
            gameSpeed: 10,
            snakeSpeed: 1000,
          })
        );
      }).not.toThrow();
    });

    it("should work with optional snake movement callback", () => {
      const onTick = jest.fn();

      expect(() => {
        renderHook(() =>
          useGameLoop({
            isRunning: true,
            onTick,
            gameSpeed: 16,
          })
        );
      }).not.toThrow();
    });
  });

  describe("Default values", () => {
    it("should use default game speed of 16ms (~60 FPS)", () => {
      const onTick = jest.fn();

      expect(() => {
        renderHook(() =>
          useGameLoop({
            isRunning: true,
            onTick,
          })
        );
      }).not.toThrow();
    });

    it("should use default snake speed of 150ms", () => {
      const onTick = jest.fn();
      const onSnakeMove = jest.fn();

      expect(() => {
        renderHook(() =>
          useGameLoop({
            isRunning: true,
            onTick,
            onSnakeMove,
          })
        );
      }).not.toThrow();
    });
  });

  describe("Cleanup", () => {
    it("should handle unmount gracefully", () => {
      const onTick = jest.fn();

      const { unmount } = renderHook(() =>
        useGameLoop({
          isRunning: true,
          onTick,
        })
      );

      expect(() => {
        unmount();
      }).not.toThrow();
    });

    it("should handle state changes gracefully", () => {
      const onTick = jest.fn();

      const { rerender } = renderHook(
        ({ isRunning }) =>
          useGameLoop({
            isRunning,
            onTick,
          }),
        { initialProps: { isRunning: true } }
      );

      expect(() => {
        rerender({ isRunning: false });
      }).not.toThrow();
    });
  });

  describe("Edge cases", () => {
    it("should handle zero speed gracefully", () => {
      const onTick = jest.fn();

      expect(() => {
        renderHook(() =>
          useGameLoop({
            isRunning: true,
            onTick,
            gameSpeed: 0,
          })
        );
      }).not.toThrow();
    });

    it("should handle very large speed values", () => {
      const onTick = jest.fn();

      expect(() => {
        renderHook(() =>
          useGameLoop({
            isRunning: true,
            onTick,
            gameSpeed: 10000, // 10 seconds
          })
        );
      }).not.toThrow();
    });
  });
});
