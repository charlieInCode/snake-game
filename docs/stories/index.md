# Stories Index

This directory contains all development stories for the Snake Game project, organized by epic.

## Epic 1: Foundational Gameplay & Core Mechanics

**Goal**: Create the core, playable snake game on a desktop browser, including player controls, movement, food consumption, and score tracking.

### Stories

1. **[Story 1.1: Set Up Project and Game Canvas](story-1-1-setup-project-game-canvas.md)**

   - Status: Complete
   - Story Points: 3
   - Priority: High
   - Initialize Next.js project with TypeScript and Tailwind CSS, create game canvas

2. **[Story 1.2: Implement the Snake](story-1-2-implement-snake.md)**

   - Status: Complete
   - Story Points: 5
   - Priority: High
   - Create snake character with automatic movement

3. **[Story 1.3: Add Player Controls](story-1-3-add-player-controls.md)**

   - Status: Complete
   - Story Points: 3
   - Priority: High
   - Implement keyboard controls (Arrow Keys/WASD)

4. **[Story 1.4: Implement Food and Snake Growth](story-1-4-implement-food-growth.md)**

   - Status: Complete
   - Story Points: 5
   - Priority: High
   - Add food mechanics and snake growth

5. **[Story 1.5: Implement Score Tracking](story-1-5-implement-score-tracking.md)**
   - Status: Complete
   - Story Points: 2
   - Priority: Medium
   - Add score display and tracking

6. **[Story 1.6: Separate Game Speed and Snake Speed](story-1-6-separate-game-snake-speed.md)**
   - Status: Complete
   - Story Points: 3
   - Priority: Medium
   - Decouple game loop timing from snake movement speed

## Epic 2: Full Game Experience & Responsive UI

**Goal**: Build a complete and polished user experience around the core game, including state management and responsive design.

### Stories

7. **[Story 2.1: Implement Game State Screens](story-2-1-game-state-screens.md)**

   - Status: Complete
   - Story Points: 5
   - Priority: High
   - Create start and game over screens

8. **[Story 2.2: Implement Game State Logic](story-2-2-game-state-logic.md)**

   - Status: Draft
   - Story Points: 5
   - Priority: High
   - Add game state management (start, pause, game over)

9. **[Story 2.3: Implement Responsive UI Layout](story-2-3-responsive-ui-layout.md)**

   - Status: Draft
   - Story Points: 4
   - Priority: Medium
   - Make UI responsive across devices

10. **[Story 2.4: Add Mobile Touch Controls](story-2-4-mobile-touch-controls.md)**
    - Status: Draft
    - Story Points: 4
    - Priority: Medium
    - Implement touch controls for mobile

11. **[Story 2.5: Progressive Difficulty Speed Enhancement](story-2-5-progressive-difficulty.md)**
    - Status: Draft
    - Story Points: 3
    - Priority: Medium
    - Increase snake speed and growth rate based on food consumption

## Epic 3: Persistent Leaderboard & Final Polish

**Goal**: Add high score persistence and perform final polish for portfolio-quality application.

### Stories

12. **[Story 3.1: Save High Score to Local Storage](story-3-1-save-high-score.md)**

    - Status: Draft
    - Story Points: 3
    - Priority: High
    - Implement Local Storage for high scores

13. **[Story 3.2: Read and Display Leaderboard](story-3-2-display-leaderboard.md)**

    - Status: Draft
    - Story Points: 3
    - Priority: Medium
    - Display leaderboard on start and game over screens

14. **[Story 3.3: Final Polish and Refinement](story-3-3-final-polish.md)**
    - Status: Draft
    - Story Points: 5
    - Priority: Medium
    - Final code review, bug fixes, and documentation

## Story Status Legend

- **Draft**: Story created, ready for development
- **In Progress**: Currently being implemented
- **Ready for Review**: Implementation complete, ready for review
- **Complete**: Story finished and approved

## Total Story Points: 53

- Epic 1: 21 points
- Epic 2: 21 points
- Epic 3: 11 points

## Development Workflow

1. Stories should be implemented in order within each epic
2. Each story must be completed before moving to the next
3. All acceptance criteria must be met
4. Code must follow established coding standards
5. Tests must be written and passing
6. Stories must be marked as "Ready for Review" when complete
