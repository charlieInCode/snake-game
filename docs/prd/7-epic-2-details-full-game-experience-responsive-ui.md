# 7. Epic 2 Details: Full Game Experience & Responsive UI

**Goal**: This epic takes the basic playable game from Epic 1 and transforms it into a complete, user-friendly experience. We will introduce formal game states like 'start', 'paused', and 'game over', and ensure the game is fully responsive and controllable on mobile devices. By the end of this epic, the application will feel like a finished product, ready for the final persistence feature.

## Story 2.1: Implement Game State Screens

**As a** player,
**I want** to see clear start and game-over screens,
**so that** I have a complete and understandable game loop from beginning to end.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  A "Start Screen" is displayed before the game begins, showing the game title and a "Start Game" button.
2.  A "Game Over" screen (or modal) is displayed when the snake collides with a wall or itself.
3.  The "Game Over" screen displays the player's final score.
4.  The "Game Over" screen includes a "Restart" button.
5.  These screens are built using reusable Shadcn UI components where appropriate (e.g., Button, Card).

## Story 2.2: Implement Game State Logic

**As a** player,
**I want** the game to properly start, pause, and end,
**so that** I can manage my gameplay session effectively.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  Clicking the "Start Game" button on the Start Screen initiates the game.
2.  The game can be paused (e.g., by pressing the 'P' key or a pause button) and resumed.
3.  When paused, the game freezes, and a "Paused" indicator is displayed.
4.  The "game over" condition (collision) correctly stops the game and triggers the "Game Over" screen.
5.  Clicking the "Restart" button on the "Game Over" screen resets the game to its initial state for a new session.

## Story 2.3: Implement Responsive UI Layout

**As a** player,
**I want** the game and surrounding UI to adapt to my screen size,
**so that** I can have a great experience on either desktop or mobile.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  The game canvas and UI elements (score, buttons) resize and reflow gracefully for common mobile, tablet, and desktop screen widths.
2.  The layout is visually appealing and functional on a small mobile viewport (e.g., 375px width).
3.  The layout does not break or become unusable on large desktop screens.
4.  Tailwind CSS's responsive design features (`sm:`, `md:`, `lg:`) are used to achieve responsiveness.

## Story 2.4: Add Mobile Touch Controls

**As a** player,
**I want** to control the snake on my mobile device using touch,
**so that** the game is fully playable on a touchscreen.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  Swiping up, down, left, or right on the game canvas changes the snake's direction.
2.  The touch controls are responsive and do not have significant input lag.
3.  The snake cannot be reversed into itself via a swipe, similar to the keyboard controls.
4.  Touch controls do not interfere with UI buttons outside the game canvas.
