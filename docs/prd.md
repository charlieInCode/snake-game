# Modern Snake Game Product Requirements Document (PRD)

_Version 1.0 (2025-07-24)_

## 1. Goals and Background Context

### Goals

- [cite_start]Demonstrate full-stack development capabilities with a modern Next.js implementation. [cite: 1350]
- Showcase skills in React, client-side persistence, and clean UI design.
- [cite_start]Provide a well-organized, portfolio-quality codebase. [cite: 543]
- Create an engaging, intuitive, and enjoyable user experience.
- Ensure the game is responsive and playable across desktop and mobile browsers.

### Background Context

This project addresses a gap in the current portfolio for a comprehensive application that is both technically robust and immediately engaging. The classic Snake game provides a familiar foundation, allowing the focus to remain on the quality of the technical implementation. The core challenge is to build a polished, performant, and responsive version of the game that also includes persistent high scores on the client-side, thereby proving proficiency in modern frontend development.

### Change Log

| Date       | Version | Description                          | Author    |
| :--------- | :------ | :----------------------------------- | :-------- |
| 2025-07-24 | 1.0     | Initial PRD draft and epic breakdown | John (PM) |

## 2. Requirements

### Functional

1.  **FR1**: The application must implement classic Snake gameplay, including arrow key/WASD controls, a growing snake that consumes food, and collision detection for both the walls and the snake's own body.
2.  **FR2**: The game must support core state management functions: starting a new game, pausing and resuming an in-progress game, handling a "game over" state, and restarting a new game from the game-over screen.
3.  **FR3**: A real-time score must be tracked and prominently displayed to the user during gameplay.
4.  **FR4**: The system will feature a persistent leaderboard that saves and displays the user's personal top 3 high scores using the browser's Local Storage.
5.  **FR5**: The game and its surrounding interface must be responsive, ensuring it is fully playable and looks clean on both desktop and common mobile devices.

### Non-Functional

1.  **NFR1**: Gameplay animations must maintain a smooth performance target of 60 frames per second on modern hardware.
2.  **NFR2**: The initial application load time, from navigation to interactive, must be under 3 seconds on a standard broadband connection.
3.  **NFR3**: The application must function correctly on the latest stable versions of modern web browsers, including Chrome, Firefox, Safari, and Edge.
4.  [cite_start]**NFR4**: The codebase must be clean, well-organized, and documented to a professional, portfolio-quality standard. [cite: 516]
5.  **NFR5**: The application should handle potential issues with Local Storage (e.g., being disabled or full) gracefully without crashing the core game.

## 3. User Interface Design Goals

### Overall UX Vision

The user experience should be immediate, intuitive, and clean. The primary goal is to create a frictionless "pick up and play" experience. The interface will be minimalist, ensuring the focus remains squarely on the game itself, while still feeling modern and polished.

### Key Interaction Paradigms

- **Desktop**: Keyboard controls (Arrow keys/WASD).
- **Mobile**: Touch-based swipe gestures.

### Core Screens and Views

1.  [cite_start]**Start Screen**: Contains the game title, a "Start Game" button, and the leaderboard. [cite: 447, 448]
2.  **Game Screen**: Contains the game canvas, score display, and a "Pause" button.
3.  **Game Over Screen**: A modal displaying the final score, the updated leaderboard, and a "Restart" button.

### Branding

The project will adopt the aesthetic and component library of **Shadcn UI**. This provides a clean, modern, and minimalist design system out of the box.

### Target Device and Platforms: Web Responsive

[cite_start]The application will be a responsive web app, designed for modern desktop and mobile browsers. [cite: 452]

## 4. Technical Assumptions

### Repository Structure: Monorepo

[cite_start]The project will be developed within a single monorepo to simplify development and dependency management. [cite: 454]

### Service Architecture

Not applicable, as the project is frontend-only. Persistence will be handled via client-side Local Storage.

### Testing Requirements

[cite_start]A balanced approach of **Unit + Integration testing** is required. [cite: 456]

### Additional Technical Assumptions and Requests

- **Language**: TypeScript
- **Framework**: Next.js 14+ with React 18+
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS
- **Game Rendering**: HTML5 Canvas
- **Persistence**: Browser Local Storage for saving high scores.
- **Deployment**: Vercel or Netlify.

## 5. Epic List

- [cite_start]**Epic 1: Foundational Gameplay & Core Mechanics**: To implement the core, playable snake game on a desktop browser, including player controls, movement, food consumption, and score tracking. [cite: 467]
- **Epic 2: Full Game Experience & Responsive UI**: To build a complete and polished user experience around the core game, including state management (start, pause, game over), and to ensure the entire application is fully responsive and playable on mobile devices.
- **Epic 3: Persistent Leaderboard & Final Polish**: To add the high score persistence feature using Local Storage, allowing users to see their personal top scores, and to perform a final polish of the complete application.

## 6. Epic 1 Details: Foundational Gameplay & Core Mechanics

**Goal**: This epic focuses on creating the absolute core of the game. By the end of this epic, we will have a playable, albeit simple, version of Snake running on a desktop browser. It will establish the game's foundational logic, including the game loop, player controls, the primary food/growth mechanic, and basic scorekeeping.

### Story 1.1: Set Up Project and Game Canvas

**As a** developer,
**I want** to set up the Next.js project and render a basic game canvas,
**so that** I have a foundational structure and a visible area to build the game within.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  A new Next.js project is initialized with TypeScript and Tailwind CSS.
2.  An HTML5 `<canvas>` element is rendered on the main page.
3.  The canvas has a visible border and a fixed grid-based dimension (e.g., 20x20 cells).
4.  A basic game loop is running, clearing and redrawing the canvas on each frame (e.g., at 60fps).

### Story 1.2: Implement the Snake

**As a** player,
**I want** to see a snake on the game board that moves automatically,
**so that** the primary game character is present and functional.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  A snake, composed of one or more segments, is rendered on the canvas at a starting position.
2.  The snake moves automatically in a single direction (e.g., right) at a constant speed, one grid cell at a time.
3.  The snake's position is correctly updated within the game's state on each movement tick.

### Story 1.3: Add Player Controls

**As a** player,
**I want** to control the snake's direction using the keyboard,
**so that** I can navigate the game board and interact with the game.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  Pressing the Arrow Keys (Up, Down, Left, Right) or WASD keys changes the snake's direction of movement.
2.  The snake cannot immediately reverse its direction (e.g., if moving right, the left key is ignored).
3.  The control inputs are responsive and accurately reflected in the snake's next movement.

### Story 1.4: Implement Food and Snake Growth

**As a** player,
**I want** the snake to eat food and grow longer,
**so that** the core game mechanic and challenge is in place.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  A single piece of food is rendered at a random, valid position on the canvas.
2.  When the snake's head segment collides with the food, the snake's length increases by one segment.
3.  After the food is consumed, a new piece of food appears at a new random, valid position.
4.  The new food does not appear on a grid cell currently occupied by the snake.

### Story 1.5: Implement Score Tracking

**As a** player,
**I want** to see my score increase as I eat food,
**so that** I have a clear goal and can track my progress.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  The game starts with a score of 0.
2.  The score is visibly displayed on the screen outside of the game canvas.
3.  Each time the snake consumes a piece of food, the score increments by a fixed amount (e.g., 10 points).
4.  The displayed score updates in real-time.

## 7. Epic 2 Details: Full Game Experience & Responsive UI

**Goal**: This epic takes the basic playable game from Epic 1 and transforms it into a complete, user-friendly experience. We will introduce formal game states like 'start', 'paused', and 'game over', and ensure the game is fully responsive and controllable on mobile devices. By the end of this epic, the application will feel like a finished product, ready for the final persistence feature.

### Story 2.1: Implement Game State Screens

**As a** player,
**I want** to see clear start and game-over screens,
**so that** I have a complete and understandable game loop from beginning to end.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  A "Start Screen" is displayed before the game begins, showing the game title and a "Start Game" button.
2.  A "Game Over" screen (or modal) is displayed when the snake collides with a wall or itself.
3.  The "Game Over" screen displays the player's final score.
4.  The "Game Over" screen includes a "Restart" button.
5.  These screens are built using reusable Shadcn UI components where appropriate (e.g., Button, Card).

### Story 2.2: Implement Game State Logic

**As a** player,
**I want** the game to properly start, pause, and end,
**so that** I can manage my gameplay session effectively.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  Clicking the "Start Game" button on the Start Screen initiates the game.
2.  The game can be paused (e.g., by pressing the 'P' key or a pause button) and resumed.
3.  When paused, the game freezes, and a "Paused" indicator is displayed.
4.  The "game over" condition (collision) correctly stops the game and triggers the "Game Over" screen.
5.  Clicking the "Restart" button on the "Game Over" screen resets the game to its initial state for a new session.

### Story 2.3: Implement Responsive UI Layout

**As a** player,
**I want** the game and surrounding UI to adapt to my screen size,
**so that** I can have a great experience on either desktop or mobile.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  The game canvas and UI elements (score, buttons) resize and reflow gracefully for common mobile, tablet, and desktop screen widths.
2.  The layout is visually appealing and functional on a small mobile viewport (e.g., 375px width).
3.  The layout does not break or become unusable on large desktop screens.
4.  Tailwind CSS's responsive design features (`sm:`, `md:`, `lg:`) are used to achieve responsiveness.

### Story 2.4: Add Mobile Touch Controls

**As a** player,
**I want** to control the snake on my mobile device using touch,
**so that** the game is fully playable on a touchscreen.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  Swiping up, down, left, or right on the game canvas changes the snake's direction.
2.  The touch controls are responsive and do not have significant input lag.
3.  The snake cannot be reversed into itself via a swipe, similar to the keyboard controls.
4.  Touch controls do not interfere with UI buttons outside the game canvas.

## 8. Epic 3 Details: Persistent Leaderboard & Final Polish

**Goal**: This is the final epic to complete our MVP. It focuses on the last core feature: making high scores persistent. We will implement the logic to save and retrieve scores from the browser's Local Storage and display them in a leaderboard. This epic concludes with a final polish of the entire application to ensure it meets the portfolio-quality standard we've set.

### Story 3.1: Save High Score to Local Storage

**As a** player,
**I want** my high score to be saved when my game ends,
**so that** my best achievements are remembered for future sessions.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  When a game ends, the final score is compared against the list of high scores stored in Local Storage.
2.  If Local Storage contains fewer than 3 scores, the new score is added to the list.
3.  If the new score is higher than any of the existing top 3 scores, it replaces the lowest score in the list.
4.  The high score list in Local Storage is correctly sorted, with the highest score first.
5.  The data is stored in a structured format (e.g., JSON) in Local Storage under a clear key (e.g., `snake-leaderboard`).

### Story 3.2: Read and Display Leaderboard

**As a** player,
**I want** to see the list of high scores,
**so that** I can see what I am aiming to beat.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  When the application first loads, it checks Local Storage for any saved high scores.
2.  The retrieved high scores are displayed on the "Start Screen".
3.  The updated leaderboard, including the player's most recent score if it's a new high score, is displayed on the "Game Over" screen.
4.  If no scores are present in Local Storage, the leaderboard displays a default message (e.g., "No high scores yet!").

### Story 3.3: Final Polish and Refinement

**As a** developer,
**I want** to perform a final review and cleanup of the application,
**so that** the final product is bug-free, visually polished, and the code is clean for portfolio review.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  All UI components are visually aligned and consistent with the Shadcn UI aesthetic across all game states and screen sizes.
2.  Any known minor bugs or visual glitches are resolved.
3.  Code is reviewed for clarity, commented where necessary, and unused code is removed.
4.  The project's `README.md` file is updated with instructions on how to run and play the game.
