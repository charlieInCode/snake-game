# 4\. Data Models

## Model: LeaderboardEntry

- **Purpose**: To represent a single high score entry.
- **Key Attributes**: `score: number`, `date: string`.
- **TypeScript Interface**:
  ```typescript
  interface LeaderboardEntry {
    score: number;
    date: string;
  }
  ```

The full leaderboard will be stored as an array: `LeaderboardEntry[]`.
