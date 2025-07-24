# 6. Epic 1 Details: Foundational Gameplay & Core Mechanics

**Goal**: This epic focuses on creating the absolute core of the game. By the end of this epic, we will have a playable, albeit simple, version of Snake running on a desktop browser. It will establish the game's foundational logic, including the game loop, player controls, the primary food/growth mechanic, and basic scorekeeping.

## Story 1.1: Set Up Project and Game Canvas

**As a** developer,
**I want** to set up the Next.js project and render a basic game canvas,
**so that** I have a foundational structure and a visible area to build the game within.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  A new Next.js project is initialized with TypeScript and Tailwind CSS.
2.  An HTML5 `<canvas>` element is rendered on the main page.
3.  The canvas has a visible border and a fixed grid-based dimension (e.g., 20x20 cells).
4.  A basic game loop is running, clearing and redrawing the canvas on each frame (e.g., at 60fps).

## Story 1.2: Implement the Snake

**As a** player,
**I want** to see a snake on the game board that moves automatically,
**so that** the primary game character is present and functional.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  A snake, composed of one or more segments, is rendered on the canvas at a starting position.
2.  The snake moves automatically in a single direction (e.g., right) at a constant speed, one grid cell at a time.
3.  The snake's position is correctly updated within the game's state on each movement tick.

## Story 1.3: Add Player Controls

**As a** player,
**I want** to control the snake's direction using the keyboard,
**so that** I can navigate the game board and interact with the game.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  Pressing the Arrow Keys (Up, Down, Left, Right) or WASD keys changes the snake's direction of movement.
2.  The snake cannot immediately reverse its direction (e.g., if moving right, the left key is ignored).
3.  The control inputs are responsive and accurately reflected in the snake's next movement.

## Story 1.4: Implement Food and Snake Growth

**As a** player,
**I want** the snake to eat food and grow longer,
**so that** the core game mechanic and challenge is in place.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  A single piece of food is rendered at a random, valid position on the canvas.
2.  When the snake's head segment collides with the food, the snake's length increases by one segment.
3.  After the food is consumed, a new piece of food appears at a new random, valid position.
4.  The new food does not appear on a grid cell currently occupied by the snake.

## Story 1.5: Implement Score Tracking

**As a** player,
**I want** to see my score increase as I eat food,
**so that** I have a clear goal and can track my progress.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  The game starts with a score of 0.
2.  The score is visibly displayed on the screen outside of the game canvas.
3.  Each time the snake consumes a piece of food, the score increments by a fixed amount (e.g., 10 points).
4.  The displayed score updates in real-time.
