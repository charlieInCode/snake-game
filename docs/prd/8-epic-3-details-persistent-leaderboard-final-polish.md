# 8. Epic 3 Details: Persistent Leaderboard & Final Polish

**Goal**: This is the final epic to complete our MVP. It focuses on the last core feature: making high scores persistent. We will implement the logic to save and retrieve scores from the browser's Local Storage and display them in a leaderboard. This epic concludes with a final polish of the entire application to ensure it meets the portfolio-quality standard we've set.

## Story 3.1: Save High Score to Local Storage

**As a** player,
**I want** my high score to be saved when my game ends,
**so that** my best achievements are remembered for future sessions.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  When a game ends, the final score is compared against the list of high scores stored in Local Storage.
2.  If Local Storage contains fewer than 3 scores, the new score is added to the list.
3.  If the new score is higher than any of the existing top 3 scores, it replaces the lowest score in the list.
4.  The high score list in Local Storage is correctly sorted, with the highest score first.
5.  The data is stored in a structured format (e.g., JSON) in Local Storage under a clear key (e.g., `snake-leaderboard`).

## Story 3.2: Read and Display Leaderboard

**As a** player,
**I want** to see the list of high scores,
**so that** I can see what I am aiming to beat.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  When the application first loads, it checks Local Storage for any saved high scores.
2.  The retrieved high scores are displayed on the "Start Screen".
3.  The updated leaderboard, including the player's most recent score if it's a new high score, is displayed on the "Game Over" screen.
4.  If no scores are present in Local Storage, the leaderboard displays a default message (e.g., "No high scores yet!").

## Story 3.3: Final Polish and Refinement

**As a** developer,
**I want** to perform a final review and cleanup of the application,
**so that** the final product is bug-free, visually polished, and the code is clean for portfolio review.

[cite_start]**Acceptance Criteria:** [cite: 477]

1.  All UI components are visually aligned and consistent with the Shadcn UI aesthetic across all game states and screen sizes.
2.  Any known minor bugs or visual glitches are resolved.
3.  Code is reviewed for clarity, commented where necessary, and unused code is removed.
4.  The project's `README.md` file is updated with instructions on how to run and play the game.
