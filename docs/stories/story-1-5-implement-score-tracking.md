# Story 1.5: Implement Score Tracking

**Status**: Draft  
**Epic**: Epic 1 - Foundational Gameplay & Core Mechanics  
**Priority**: Medium  
**Story Points**: 2

## Story

**As a** player,  
**I want** to see my score increase as I eat food,  
**so that** I have a clear goal and can track my progress.

## Acceptance Criteria

1. The game starts with a score of 0.
2. The score is visibly displayed on the screen outside of the game canvas.
3. Each time the snake consumes a piece of food, the score increments by a fixed amount (e.g., 10 points).
4. The displayed score updates in real-time.

## Tasks

- [ ] Create score state management
- [ ] Implement score display component
- [ ] Add score increment logic
- [ ] Integrate score with food consumption
- [ ] Style score display

## Subtasks

- [ ] Add score to game state in `useGameLogic.ts`
- [ ] Create `components/game/ScoreDisplay.tsx` component
- [ ] Update food consumption to increment score
- [ ] Add score display to main game page
- [ ] Style score display with Tailwind CSS
- [ ] Add score animation/visual feedback

## Dev Notes

- Score should start at 0 and increment by 10 per food
- Score display should be prominent and easy to read
- Consider adding score animation when it increases
- Score should be part of the game state object
- Follow the coding standards for state management
- Score display should be responsive across screen sizes

## Testing

- [ ] Verify score starts at 0
- [ ] Test score increment when eating food
- [ ] Confirm score display updates in real-time
- [ ] Validate score display styling
- [ ] Test score across multiple food consumptions
- [ ] Verify score display responsiveness

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

- Story 1.4 (Food and Growth)
- Food consumption system
- Game state management
