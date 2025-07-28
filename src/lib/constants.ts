/**
 * Core game configuration constants
 *
 * This object contains all the fundamental game settings including
 * timing, dimensions, and visual properties. The timing configuration
 * supports independent control of visual updates and gameplay mechanics.
 */
export const GAME_CONFIG = {
  // Grid dimensions
  GRID_SIZE: 20,
  CELL_SIZE: 20,

  // Game loop speed (milliseconds between visual updates)
  // Set to 16ms for ~60 FPS smooth visual updates
  GAME_SPEED: 16,

  // Snake movement speed (milliseconds between snake moves)
  // Set to 150ms for balanced gameplay - ~6.7 moves per second
  SNAKE_SPEED: 150,

  // Canvas styling
  CANVAS_BORDER_WIDTH: 2,
  CANVAS_BORDER_COLOR: "#374151", // gray-700

  // Grid styling
  GRID_COLOR: "#6B7280", // gray-500
  GRID_LINE_WIDTH: 1,

  // Colors for development
  BACKGROUND_COLOR: "#1F2937", // gray-800
  GRID_BACKGROUND_COLOR: "#111827", // gray-900
} as const;

// Game state constants
export const GAME_STATES = {
  START: "start",
  PLAYING: "playing",
  PAUSED: "paused",
  GAME_OVER: "game-over",
} as const;

// Direction constants
export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
} as const;

// Score constants
export const SCORE_CONFIG = {
  POINTS_PER_FOOD: 10,
  INITIAL_SCORE: 0,
} as const;

// Game element colors
export const GAME_COLORS = {
  SNAKE_HEAD: "#10B981", // emerald-500
  SNAKE_BODY: "#059669", // emerald-600
  SNAKE_BORDER: "#047857", // emerald-700
  FOOD_FILL: "#EF4444", // red-500
  FOOD_BORDER: "#DC2626", // red-600
} as const;

// Input timing configuration
export const INPUT_CONFIG = {
  // Debounce ratio: how much of snake speed to use for input debouncing
  // 0.33 = responsive but prevents rapid-fire inputs
  // 0.5 = balanced for most gameplay speeds
  // 0.6 = more restrictive, good for very fast games
  DEBOUNCE_RATIO: 0.6,

  // Calculated debounce time based on current snake speed
  get DEBOUNCE_MS() {
    return Math.round(GAME_CONFIG.SNAKE_SPEED * this.DEBOUNCE_RATIO);
  },

  // Minimum debounce to prevent input spam regardless of snake speed
  MIN_DEBOUNCE_MS: 16, // ~60fps input limit

  // Maximum debounce to maintain responsiveness
  MAX_DEBOUNCE_MS: 100,

  // Final debounce value with bounds checking
  get INPUT_DEBOUNCE_MS() {
    const calculated = this.DEBOUNCE_MS;
    return Math.max(
      this.MIN_DEBOUNCE_MS,
      Math.min(calculated, this.MAX_DEBOUNCE_MS)
    );
  },
} as const;

// Game element dimensions
export const GAME_DIMENSIONS = {
  SNAKE_PADDING: 1,
  FOOD_PADDING: 3,
} as const;
