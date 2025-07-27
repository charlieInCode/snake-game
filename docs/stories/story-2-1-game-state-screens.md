# Story 2.1: Implement Game State Screens

**Status**: Draft  
**Epic**: Epic 2 - Full Game Experience & Responsive UI  
**Priority**: High  
**Story Points**: 5

## Story

**As a** player,  
**I want** to see clear start and game-over screens,  
**so that** I have a complete and understandable game loop from beginning to end.

## Acceptance Criteria

1. A "Start Screen" is displayed before the game begins, showing the game title and a "Start Game" button.
2. A "Game Over" screen (or modal) is displayed when the snake collides with a wall or itself.
3. The "Game Over" screen displays the player's final score.
4. The "Game Over" screen includes a "Restart" button.
5. These screens are built using reusable Shadcn UI components where appropriate (e.g., Button, Card).

## Tasks

- [ ] Create game state management system
- [ ] Implement start screen component
- [ ] Implement game over screen component
- [ ] Add collision detection for game over
- [ ] Integrate screens with game flow

## Subtasks

- [ ] Add game state types to `types/game.ts`
- [ ] Create `components/game/StartScreen.tsx`
- [ ] Create `components/game/GameOverScreen.tsx`
- [ ] Update `useGameLogic.ts` to handle game states
- [ ] Add collision detection for walls and self
- [ ] Integrate Shadcn UI components (Button, Card)
- [ ] Add screen transitions and animations

## Dev Notes

- Game states: 'start', 'playing', 'paused', 'game-over'
- Use Shadcn UI components for consistent styling
- Screens should be responsive and centered
- Consider adding game title and branding
- Game over should show final score prominently
- Follow the coding standards for component structure

## Testing

- [ ] Verify start screen displays correctly
- [ ] Test start button functionality
- [ ] Confirm game over screen shows on collision
- [ ] Validate restart button works
- [ ] Test screen responsiveness
- [ ] Verify Shadcn UI components render properly

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

- Story 1.5 (Score Tracking)
- Shadcn UI components
- Game state management system
