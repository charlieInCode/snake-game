# Story 2.2: Implement Game State Logic

**Status**: Draft  
**Epic**: Epic 2 - Full Game Experience & Responsive UI  
**Priority**: High  
**Story Points**: 5

## Story

**As a** player,  
**I want** the game to properly start, pause, and end,  
**so that** I can manage my gameplay session effectively.

## Acceptance Criteria

1. Clicking the "Start Game" button on the Start Screen initiates the game.
2. The game can be paused (e.g., by pressing the 'P' key or a pause button) and resumed.
3. When paused, the game freezes, and a "Paused" indicator is displayed.
4. The "game over" condition (collision) correctly stops the game and triggers the "Game Over" screen.
5. Clicking the "Restart" button on the "Game Over" screen resets the game to its initial state for a new session.

## Tasks

- [ ] Implement game state transitions
- [ ] Add pause/resume functionality
- [ ] Create game reset logic
- [ ] Add pause indicator
- [ ] Integrate state logic with UI

## Subtasks

- [ ] Update `useGameLogic.ts` with state transition logic
- [ ] Add pause key handling in `GameBoard.tsx`
- [ ] Create pause indicator component
- [ ] Implement game reset functionality
- [ ] Add state validation and error handling
- [ ] Create state transition animations
- [ ] Add pause button to game UI

## Dev Notes

- State transitions: start → playing → paused → playing → game-over → start
- Pause should freeze game loop but keep state intact
- Reset should restore initial game state completely
- Consider adding pause overlay with semi-transparent background
- Follow React patterns for state management
- Ensure state transitions are atomic and consistent

## Testing

- [ ] Test start button transitions
- [ ] Verify pause/resume functionality
- [ ] Confirm game over detection works
- [ ] Test restart button resets game properly
- [ ] Validate pause indicator displays correctly
- [ ] Test state transitions under various conditions

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

- Story 2.1 (Game State Screens)
- Game state management system
- Collision detection system
