# 16. Error Handling Strategy

- **React Error Boundaries**: A global Error Boundary component will be wrapped around the main `Game` component to catch any unexpected rendering errors and display a user-friendly message.
- **Local Storage**: All functions within the `lib/leaderboard.ts` service will be wrapped in `try...catch` blocks. On failure, they will log the error and return a state that allows the UI to degrade gracefully (e.g., hiding the leaderboard) without crashing the game.

---
