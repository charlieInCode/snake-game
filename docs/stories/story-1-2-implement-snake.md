# Story 1.2: Implement the Snake

**Status**: Draft  
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

- [ ] Create snake data structure and types
- [ ] Implement snake rendering on canvas
- [ ] Add snake movement logic
- [ ] Integrate snake with game loop
- [ ] Create snake state management

## Subtasks

- [ ] Create `types/game.ts` with snake-related types
- [ ] Create `hooks/useGameLogic.ts` for snake state management
- [ ] Implement snake rendering in `GameBoard.tsx`
- [ ] Add movement calculation utilities in `lib/game-utils.ts`
- [ ] Update game loop to handle snake movement
- [ ] Add snake visual styling and colors

## Dev Notes

- Snake should start with 3-4 segments in the center of the grid
- Initial direction should be right (east)
- Movement should be grid-based, not pixel-based
- Snake segments should be visually distinct (different colors for head/body)
- State should be immutable - create new state objects for updates
- Follow the coding standards: all game logic in `useGameLogic` hook

## Testing

- [ ] Verify snake renders correctly on canvas
- [ ] Test snake movement in all four directions
- [ ] Confirm snake state updates properly
- [ ] Validate snake visual appearance
- [ ] Test snake boundary handling

## Dev Agent Record

### Agent Model Used

- James (Full Stack Developer)

### Debug Log References

- None yet

### Completion Notes List

- None yet

### File List

- None yet

### Change Log

- Created story file

## Dependencies

- Story 1.1 (Project Setup)
- Canvas rendering system
- Game loop implementation
