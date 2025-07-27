# Story 3.1: Save High Score to Local Storage

**Status**: Draft  
**Epic**: Epic 3 - Persistent Leaderboard & Final Polish  
**Priority**: High  
**Story Points**: 3

## Story

**As a** player,  
**I want** my high score to be saved when my game ends,  
**so that** my best achievements are remembered for future sessions.

## Acceptance Criteria

1. When a game ends, the final score is compared against the list of high scores stored in Local Storage.
2. If Local Storage contains fewer than 3 scores, the new score is added to the list.
3. If the new score is higher than any of the existing top 3 scores, it replaces the lowest score in the list.
4. The high score list in Local Storage is correctly sorted, with the highest score first.
5. The data is stored in a structured format (e.g., JSON) in Local Storage under a clear key (e.g., `snake-leaderboard`).

## Tasks

- [ ] Create leaderboard data structure
- [ ] Implement local storage service
- [ ] Add score comparison logic
- [ ] Create score saving functionality
- [ ] Integrate with game over flow

## Subtasks

- [ ] Create `types/leaderboard.ts` with score types
- [ ] Create `lib/leaderboard.ts` service
- [ ] Add score comparison utilities
- [ ] Update game over logic to save scores
- [ ] Implement local storage error handling
- [ ] Add score validation and sanitization
- [ ] Create score sorting functionality

## Dev Notes

- Store top 3 scores in Local Storage
- Use JSON format for data structure
- Handle Local Storage errors gracefully
- Validate scores before saving
- Sort scores in descending order
- Follow coding standards: all Local Storage through dedicated service
- Consider adding timestamps to scores

## Testing

- [ ] Test saving first score to empty leaderboard
- [ ] Verify score comparison and replacement logic
- [ ] Confirm leaderboard sorting works correctly
- [ ] Test Local Storage error handling
- [ ] Validate score data structure
- [ ] Test multiple score updates

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

- Story 2.2 (Game State Logic)
- Local Storage API
- Game over detection system
