# 15. Coding Standards

### **Critical Rules**

- **State Logic in Hooks**: All core game logic **must** reside within the `useGameLogic` custom hook. React components should remain "dumb".
- **Centralized Persistence**: All interactions with Local Storage **must** go through the dedicated service file (`lib/leaderboard.ts`).
- **Styling System**: All styling **must** be done using Tailwind CSS utility classes and Shadcn UI components.
- **State Immutability**: The game state object **must** be treated as immutable.

### **Naming Conventions**

| Element        | Convention              | Example           |
| :------------- | :---------------------- | :---------------- |
| **Components** | PascalCase              | `GameBoard.tsx`   |
| **Hooks**      | camelCase, `use` prefix | `useGameLogic.ts` |
| **Utilities**  | camelCase               | `leaderboard.ts`  |

---
