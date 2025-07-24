# 9. Frontend Architecture

This section provides the critical next layer of detail for implementation. It establishes clear, modern patterns for file organization, a template for creating React components, a defined shape for our game's state, and a dedicated service for handling all Local Storage interactions.

### **Component Architecture**

#### **Component Organization**

The project will follow the standard Next.js App Router structure. All reusable components will be co-located within a `/components` directory, subdivided by feature or type.

```plaintext
app/
├── components/
│   ├── game/
│   │   ├── GameBoard.tsx
│   │   └── GameControls.tsx
│   └── ui/
│       ├── ScoreDisplay.tsx
│       └── Leaderboard.tsx
├── lib/
│   ├── hooks/
│   │   └── useGameLogic.ts
│   └── leaderboard.ts
└── page.tsx      (The main Game component will live here)
```

#### **Component Template**

All new React components must follow this basic functional component template with TypeScript props.

```typescript
import React from "react";

type MyComponentProps = {
  // Define component props here
  title: string;
};

const MyComponent = ({ title }: MyComponentProps) => {
  return (
    <div>
      <h1>{title}</h1>
      {/* Component JSX goes here */}
    </div>
  );
};

export default MyComponent;
```

### **State Management Architecture**

#### **State Structure**

The core game state, managed within the `useGameLogic` hook, will adhere to a defined interface for type safety.

```typescript
interface GameState {
  snake: { x: number; y: number }[];
  food: { x: number; y: number };
  score: number;
  direction: "UP" | "DOWN" | "LEFT" | "RIGHT";
  isPaused: boolean;
  isGameOver: boolean;
}
```

#### **State Management Patterns**

- The primary state object (`GameState`) will be managed by a `useReducer` hook within `useGameLogic.ts` for predictable state transitions.
- Simple UI state (e.g., modal visibility) can be handled by `useState` hooks within individual components.

### **Routing Architecture**

This is a single-page application. All primary UI will be rendered within the root route: `app/page.tsx`. No complex routing is required for the MVP.

### **Local Storage Service**

To keep Local Storage interactions clean and isolated, we will use a dedicated utility file.

#### **Service Definition (`lib/leaderboard.ts`)**

This file will contain all functions for interacting with the leaderboard data in Local Storage.

```typescript
import { LeaderboardEntry } from "./types"; // Assuming types are defined

const LEADERBOARD_KEY = "snake-leaderboard";

export const getScores = (): LeaderboardEntry[] => {
  const data = localStorage.getItem(LEADERBOARD_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveScore = (newScore: number): void => {
  const scores = getScores();
  // Logic to add new score and keep only top 3
  const updatedScores = [
    ...scores,
    { score: newScore, date: new Date().toISOString() },
  ]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedScores));
};
```

---
