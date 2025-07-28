import { renderHook } from '@testing-library/react';
import { useGameLoop } from '../useGameLoop';

describe('useGameLoop Hook - Story 1.1 (Fixed)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Hook Initialization', () => {
    it('should initialize without errors', () => {
      const mockOnTick = jest.fn();
      
      const { result } = renderHook(() => useGameLoop({
        isRunning: false,
        onTick: mockOnTick,
        speed: 100,
      }));

      expect(result.current.isRunning).toBe(false);
    });

    it('should return isRunning state correctly', () => {
      const mockOnTick = jest.fn();
      
      const { result } = renderHook(() => useGameLoop({
        isRunning: true,
        onTick: mockOnTick,
        speed: 100,
      }));

      expect(result.current.isRunning).toBe(true);
    });
  });

  describe('Props Handling', () => {
    it('should accept valid props', () => {
      const mockOnTick = jest.fn();
      
      expect(() => {
        renderHook(() => useGameLoop({
          isRunning: true,
          onTick: mockOnTick,
          speed: 150,
        }));
      }).not.toThrow();
    });

    it('should work with default speed when not provided', () => {
      const mockOnTick = jest.fn();
      
      expect(() => {
        renderHook(() => useGameLoop({
          isRunning: true,
          onTick: mockOnTick,
        }));
      }).not.toThrow();
    });

    it('should handle different speed values', () => {
      const mockOnTick = jest.fn();
      
      [50, 100, 200, 500].forEach(speed => {
        expect(() => {
          renderHook(() => useGameLoop({
            isRunning: true,
            onTick: mockOnTick,
            speed,
          }));
        }).not.toThrow();
      });
    });
  });

  describe('State Changes', () => {
    it('should handle isRunning state changes', () => {
      const mockOnTick = jest.fn();
      
      const { rerender } = renderHook(
        ({ isRunning }) => useGameLoop({
          isRunning,
          onTick: mockOnTick,
          speed: 100,
        }),
        { initialProps: { isRunning: false } }
      );

      expect(() => {
        rerender({ isRunning: true });
        rerender({ isRunning: false });
      }).not.toThrow();
    });

    it('should handle callback changes', () => {
      const mockOnTick1 = jest.fn();
      const mockOnTick2 = jest.fn();
      
      const { rerender } = renderHook(
        ({ onTick }) => useGameLoop({
          isRunning: true,
          onTick,
          speed: 100,
        }),
        { initialProps: { onTick: mockOnTick1 } }
      );

      expect(() => {
        rerender({ onTick: mockOnTick2 });
      }).not.toThrow();
    });
  });

  describe('Cleanup', () => {
    it('should cleanup without errors on unmount', () => {
      const mockOnTick = jest.fn();
      
      const { unmount } = renderHook(() => useGameLoop({
        isRunning: true,
        onTick: mockOnTick,
        speed: 100,
      }));

      expect(() => {
        unmount();
      }).not.toThrow();
    });
  });

  describe('Browser API Integration', () => {
    it('should call requestAnimationFrame when isRunning is true', () => {
      const mockRAF = jest.spyOn(global, 'requestAnimationFrame');
      const mockOnTick = jest.fn();
      
      renderHook(() => useGameLoop({
        isRunning: true,
        onTick: mockOnTick,
        speed: 100,
      }));

      expect(mockRAF).toHaveBeenCalled();
      mockRAF.mockRestore();
    });

    it('should not call requestAnimationFrame when isRunning is false', () => {
      const mockRAF = jest.spyOn(global, 'requestAnimationFrame');
      const mockOnTick = jest.fn();
      
      renderHook(() => useGameLoop({
        isRunning: false,
        onTick: mockOnTick,
        speed: 100,
      }));

      expect(mockRAF).not.toHaveBeenCalled();
      mockRAF.mockRestore();
    });

    it('should handle cleanup properly', () => {
      const mockOnTick = jest.fn();
      
      const { unmount } = renderHook(() => useGameLoop({
        isRunning: true,
        onTick: mockOnTick,
        speed: 100,
      }));

      expect(() => {
        unmount();
      }).not.toThrow();
    });
  });

  describe('Performance', () => {
    it('should handle rapid re-renders without errors', () => {
      const mockOnTick = jest.fn();
      
      const { rerender } = renderHook(() => useGameLoop({
        isRunning: true,
        onTick: mockOnTick,
        speed: 100,
      }));

      expect(() => {
        for (let i = 0; i < 10; i++) {
          rerender();
        }
      }).not.toThrow();
    });

    it('should handle rapid state changes without errors', () => {
      const mockOnTick = jest.fn();
      
      const { rerender } = renderHook(
        ({ isRunning }) => useGameLoop({
          isRunning,
          onTick: mockOnTick,
          speed: 100,
        }),
        { initialProps: { isRunning: false } }
      );

      expect(() => {
        for (let i = 0; i < 5; i++) {
          rerender({ isRunning: true });
          rerender({ isRunning: false });
        }
      }).not.toThrow();
    });
  });
});