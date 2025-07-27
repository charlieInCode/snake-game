# Story 1.1: Set Up Project and Game Canvas

**Status**: Ready for Review  
**Epic**: Epic 1 - Foundational Gameplay & Core Mechanics  
**Priority**: High  
**Story Points**: 3

## Story

**As a** developer,  
**I want** to set up the Next.js project and render a basic game canvas,  
**so that** I have a foundational structure and a visible area to build the game within.

## Acceptance Criteria

1. A new Next.js project is initialized with TypeScript and Tailwind CSS.
2. An HTML5 `<canvas>` element is rendered on the main page.
3. The canvas has a visible border and a fixed grid-based dimension (e.g., 20x20 cells).
4. A basic game loop is running, clearing and redrawing the canvas on each frame (e.g., at 60fps).

## Tasks

- [x] Initialize Next.js project with TypeScript
- [x] Install and configure Tailwind CSS
- [x] Create basic app layout structure
- [x] Implement game canvas component
- [x] Set up basic game loop with requestAnimationFrame
- [x] Add canvas styling and grid visualization

## Subtasks

- [x] Create `app/layout.tsx` with proper metadata
- [x] Create `app/page.tsx` as main game page
- [x] Create `components/game/GameBoard.tsx` component
- [x] Create `hooks/useGameLoop.ts` for game loop management
- [x] Create `lib/constants.ts` for game configuration
- [x] Add basic Tailwind CSS styling

## Dev Notes

- Use Next.js 14+ App Router structure
- Canvas should be responsive but maintain aspect ratio
- Game loop should run at 60fps for smooth animation
- Grid should be visible for development purposes
- Follow the source tree structure defined in architecture docs

## Testing

- [x] Verify Next.js project starts without errors
- [x] Confirm canvas renders correctly
- [x] Test game loop performance (60fps)
- [x] Validate responsive behavior
- [x] Check TypeScript compilation

## Dev Agent Record

### Agent Model Used

- James (Full Stack Developer)

### Debug Log References

- None yet

### Completion Notes List

- None yet

### File List

- `src/app/layout.tsx` - Updated with proper metadata for Snake Game
- `src/app/page.tsx` - Main game page with canvas and game loop
- `src/components/game/GameBoard.tsx` - Canvas component with grid rendering
- `src/hooks/useGameLoop.ts` - Game loop hook with requestAnimationFrame
- `src/lib/constants.ts` - Game configuration constants
- `package.json` - Next.js project with TypeScript and Tailwind CSS
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `next.config.ts` - Next.js configuration

### Change Log

- Created story file
- Initialized Next.js project with TypeScript and Tailwind CSS
- Created game canvas component with grid visualization
- Implemented basic game loop with requestAnimationFrame
- Added game constants and configuration
- Set up responsive layout with Tailwind CSS
- Fixed TypeScript compilation errors
- Verified development server runs successfully

## Dependencies

- Next.js 14+
- TypeScript 5.4+
- Tailwind CSS 3.4+
- React 18+
