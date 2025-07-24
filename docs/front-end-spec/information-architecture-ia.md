# Information Architecture (IA)

## Site Map / Screen Inventory

```mermaid
graph TD
    A[Game App] --> B[Main Game Interface]
    A --> C[Game Over Modal]
    A --> D[Leaderboard View]

    B --> B1[Game Canvas]
    B --> B2[Live Score Display]
    B --> B3[Control Instructions]
    B --> B4[Game Controls Panel]

    B4 --> B4a[Start/Pause Button]
    B4 --> B4b[Restart Button]
    B4 --> B4c[Show Leaderboard Button]

    C --> C1[Final Score Display]
    C --> C2[Leaderboard Placement]
    C --> C3[Play Again Button]
    C --> C4[View Leaderboard Button]

    D --> D1[Top 3 Scores Table]
    D --> D2[Close/Back Button]
    D --> D3[Clear Scores Option]
```

## Navigation Structure

**Primary Navigation:** Single-page application with modal/overlay patterns for secondary views

- Main game screen serves as the primary interface
- Game Over modal appears contextually after gameplay ends
- Leaderboard accessible via button from main screen or game over modal

**Secondary Navigation:** Action-based navigation through Shadcn/ui buttons and modals

- Start/Pause/Restart controls within main interface
- Modal-based overlay for leaderboard (non-disruptive to game state)
- Clear navigation back to main game from all secondary views

**Breadcrumb Strategy:** Not applicable - simple single-level navigation with clear context

The navigation remains intentionally minimal to focus attention on the game while providing easy access to leaderboard functionality that demonstrates data persistence capabilities.
