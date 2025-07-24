# 4. Technical Assumptions

## Repository Structure: Monorepo

[cite_start]The project will be developed within a single monorepo to simplify development and dependency management. [cite: 454]

## Service Architecture

Not applicable, as the project is frontend-only. Persistence will be handled via client-side Local Storage.

## Testing Requirements

[cite_start]A balanced approach of **Unit + Integration testing** is required. [cite: 456]

## Additional Technical Assumptions and Requests

- **Language**: TypeScript
- **Framework**: Next.js 14+ with React 18+
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS
- **Game Rendering**: HTML5 Canvas
- **Persistence**: Browser Local Storage for saving high scores.
- **Deployment**: Vercel or Netlify.
