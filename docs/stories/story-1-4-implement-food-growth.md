# Story 1.4: Implement Food and Snake Growth

**Status**: Draft  
**Epic**: Epic 1 - Foundational Gameplay & Core Mechanics  
**Priority**: High  
**Story Points**: 5

## Story

**As a** player,  
**I want** the snake to eat food and grow longer,  
**so that** the core game mechanic and challenge is in place.

## Acceptance Criteria

1. A single piece of food is rendered at a random, valid position on the canvas.
2. When the snake's head segment collides with the food, the snake's length increases by one segment.
3. After the food is consumed, a new piece of food appears at a new random, valid position.
4. The new food does not appear on a grid cell currently occupied by the snake.

## Tasks

- [ ] Create food data structure and rendering
- [ ] Implement collision detection system
- [ ] Add snake growth mechanics
- [ ] Create food spawning logic
- [ ] Integrate food system with game loop

## Subtasks

- [ ] Add food types to `types/game.ts`
- [ ] Create food rendering in `GameBoard.tsx`
- [ ] Implement collision detection in `lib/game-utils.ts`
- [ ] Update `useGameLogic.ts` to handle food consumption
- [ ] Add food spawning utilities in `lib/game-utils.ts`
- [ ] Create food visual styling and colors
- [ ] Add snake growth animation/visual feedback

## Dev Notes

- Food should be visually distinct from snake segments
- Collision detection should be precise (head-to-food)
- Food spawning should avoid snake body positions
- Snake growth should add segment to tail end
- Consider visual feedback when food is consumed
- Food should have consistent visual appearance

## Testing

- [ ] Verify food renders correctly on canvas
- [ ] Test collision detection accuracy
- [ ] Confirm snake grows when eating food
- [ ] Validate food spawning avoids snake body
- [ ] Test multiple food consumptions
- [ ] Verify food positioning is random but valid

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

- Story 1.3 (Player Controls)
- Snake movement system
- Game state management
