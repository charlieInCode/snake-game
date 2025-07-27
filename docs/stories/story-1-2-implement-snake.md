# Story 1.2: Implement the Snake

**Status**: Ready for Review  
**Epic**: Epic 1 - Foundational Gameplay & Core Mechanics  
**Priority**: High  
**Story Points**: 5

## Story

**As a** player,  
**I want** to see a snake on the game board that moves automatically,  
**so that** the primary game character is present and functional.

## Acceptance Criteria

1. A snake, composed of one or more segments, is rendered on the canvas at a starting position.
2. The snake moves automatically in a single direction (e.g., right) at a constant speed, one grid cell at a time.
3. The snake's position is correctly updated within the game's state on each movement tick.

## Tasks

- [x] Create snake data structure and types
- [x] Implement snake rendering on canvas
- [x] Add snake movement logic
- [x] Integrate snake with game loop
- [x] Create snake state management

## Subtasks

- [x] Create `types/game.ts` with snake-related types
- [x] Create `hooks/useGameLogic.ts` for snake state management
- [x] Implement snake rendering in `GameBoard.tsx`
- [x] Add movement calculation utilities in `lib/game-utils.ts`
- [x] Update game loop to handle snake movement
- [x] Add snake visual styling and colors

## Dev Notes

- Snake should start with 3-4 segments in the center of the grid
- Initial direction should be right (east)
- Movement should be grid-based, not pixel-based
- Snake segments should be visually distinct (different colors for head/body)
- State should be immutable - create new state objects for updates
- Follow the coding standards: all game logic in `useGameLogic` hook

## Testing

- [x] Verify snake renders correctly on canvas
- [x] Test snake movement in all four directions
- [x] Confirm snake state updates properly
- [x] Validate snake visual appearance
- [x] Test snake boundary handling

## Dev Agent Record

### Agent Model Used

- James (Full Stack Developer)

### Debug Log References

- None yet

### Completion Notes List

- None yet

### File List

- `src/types/game.ts` - Snake data structures and game types
- `src/lib/game-utils.ts` - Movement calculation utilities
- `src/hooks/useGameLogic.ts` - Core game logic hook for snake state management
- `src/components/game/GameBoard.tsx` - Updated to render snake with distinct head/body colors
- `src/app/page.tsx` - Updated to integrate snake with game loop
- `src/lib/constants.ts` - Updated with direction constants

### Change Log

- Created story file
- Created snake data structures with Position, Direction, SnakeSegment, and Snake types
- Implemented movement calculation utilities with grid-based movement
- Created useGameLogic hook following coding standards (all game logic in hook)
- Added snake rendering with distinct head (emerald-500) and body (emerald-600) colors
- Integrated snake with game loop for automatic movement
- Added boundary collision detection and game over logic
- Fixed TypeScript compilation and ESLint warnings
- Verified snake renders and moves correctly on canvas

## Dependencies

- Story 1.1 (Project Setup)
- Canvas rendering system
- Game loop implementation
