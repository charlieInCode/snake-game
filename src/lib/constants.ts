// Game Configuration Constants
export const GAME_CONFIG = {
  // Grid dimensions
  GRID_SIZE: 20,
  CELL_SIZE: 20,

  // Game speed (milliseconds between frames)
  GAME_SPEED: 150, // ~6.67 FPS for initial development, can be adjusted

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
