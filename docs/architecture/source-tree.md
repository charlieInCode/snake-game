# Source Tree Structure

## Project Overview

This document outlines the expected file and directory structure for the Snake Game web application, following Next.js 14+ conventions and the project's technical requirements.

## Root Directory Structure

```
snake-game/
├── .bmad-core/                 # BMAD framework configuration
├── .claude/                    # Claude AI configuration
├── .cursor/                    # Cursor IDE configuration
├── .git/                       # Git repository
├── .gitignore                  # Git ignore rules
├── docs/                       # Project documentation
├── web-bundles/                # Web application bundles
├── README.md                   # Project overview and requirements
└── package.json                # Node.js dependencies and scripts
```

## Web Application Structure (Expected)

```
web-bundles/
├── app/                        # Next.js 14+ App Router
│   ├── api/                    # API routes
│   │   └── leaderboard/        # Leaderboard API endpoints
│   │       ├── route.ts        # GET/POST leaderboard operations
│   │       └── [id]/           # Individual score operations
│   │           └── route.ts    # GET/PUT/DELETE specific scores
│   ├── components/             # Reusable React components
│   │   ├── ui/                 # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── game/               # Game-specific components
│   │   │   ├── GameBoard.tsx   # Main game canvas component
│   │   │   ├── GameControls.tsx # Game control buttons
│   │   │   ├── ScoreDisplay.tsx # Score and stats display
│   │   │   └── Leaderboard.tsx # Leaderboard display component
│   │   └── layout/             # Layout components
│   │       ├── Header.tsx      # Application header
│   │       └── Footer.tsx      # Application footer
│   ├── hooks/                  # Custom React hooks
│   │   ├── useGameLogic.ts     # Core game logic and state management
│   │   ├── useGameLoop.ts      # Game loop and timing
│   │   └── useLeaderboard.ts   # Leaderboard data management
│   ├── lib/                    # Utility functions and services
│   │   ├── leaderboard.ts      # Leaderboard persistence service
│   │   ├── game-utils.ts       # Game utility functions
│   │   └── constants.ts        # Game constants and configuration
│   ├── types/                  # TypeScript type definitions
│   │   ├── game.ts             # Game-related types
│   │   └── leaderboard.ts      # Leaderboard-related types
│   ├── styles/                 # Global styles
│   │   └── globals.css         # Global CSS with Tailwind imports
│   ├── layout.tsx              # Root layout component
│   ├── page.tsx                # Home page with game
│   ├── globals.css             # Global styles
│   └── favicon.ico             # Application icon
├── public/                     # Static assets
│   ├── images/                 # Image assets
│   └── icons/                  # Icon assets
├── tests/                      # Test files
│   ├── __mocks__/              # Test mocks
│   ├── components/             # Component tests
│   ├── hooks/                  # Hook tests
│   └── lib/                    # Utility tests
├── .eslintrc.json              # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── jest.config.js              # Jest test configuration
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## Key File Purposes

### Core Game Files

- **`useGameLogic.ts`**: Central game state management, collision detection, snake movement logic
- **`GameBoard.tsx`**: Canvas-based game rendering component
- **`game-utils.ts`**: Helper functions for game calculations, random food placement, etc.

### Data Management

- **`leaderboard.ts`**: Local storage service for persistent high scores
- **`useLeaderboard.ts`**: Hook for leaderboard state management
- **`Leaderboard.tsx`**: Component for displaying high scores

### Configuration Files

- **`constants.ts`**: Game settings (board size, speed, colors, etc.)
- **`types/`**: TypeScript interfaces for game state, leaderboard data, etc.

## Development Standards

### File Naming Conventions

- **Components**: PascalCase (e.g., `GameBoard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useGameLogic.ts`)
- **Utilities**: camelCase (e.g., `leaderboard.ts`)
- **Types**: camelCase (e.g., `game.ts`)

### Import Organization

1. React and Next.js imports
2. Third-party library imports
3. Internal component imports
4. Hook imports
5. Utility and type imports

### Component Structure

```typescript
// Component imports
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Type imports
import { GameState } from "@/types/game";

// Component definition
export default function ComponentName() {
  // State and hooks
  // Event handlers
  // Render logic
}
```

## Testing Structure

- **Unit tests**: Test individual functions and utilities
- **Component tests**: Test React components with React Testing Library
- **Hook tests**: Test custom hooks in isolation
- **Integration tests**: Test game flow and user interactions

## Build and Deployment

- **Development**: `npm run dev` for local development
- **Testing**: `npm run test` for test execution
- **Build**: `npm run build` for production build
- **Deployment**: Vercel for hosting and CI/CD

## Notes

- All game logic must be contained within the `useGameLogic` hook
- Styling uses Tailwind CSS utility classes exclusively
- Local storage interactions go through the dedicated leaderboard service
- Game state is treated as immutable throughout the application
