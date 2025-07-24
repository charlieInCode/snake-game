# Wireframes & Mockups

## Design Files

**Primary Design Files:** To be created using Figma or similar tool based on these specifications. For a portfolio project, wireframes and component specifications provided here may be sufficient for implementation.

## Key Screen Layouts

### Main Game Screen

**Purpose:** Primary gameplay interface showcasing clean design and functional game controls

**Key Elements:**

- Shadcn Card component as main container with subtle border and padding
- HTML5 Canvas centered within the card for game area
- Shadcn Typography components for score display and instructions
- Shadcn Button components for game controls (Start, Pause, Restart)
- Responsive grid layout using Tailwind classes for mobile adaptation

**Interaction Notes:** All interactive elements use Shadcn focus styles and hover states. Canvas maintains aspect ratio across screen sizes with Tailwind responsive utilities.

**Design File Reference:** Main game interface showing desktop and mobile layouts with Shadcn component specifications

### Game Over Modal

**Purpose:** Contextual overlay displaying game results and next actions without losing game state

**Key Elements:**

- Shadcn Dialog component with proper backdrop and focus management
- Shadcn Typography for score display with emphasized final score using proper text hierarchy
- Shadcn Badge components for leaderboard position indicators (1st, 2nd, 3rd)
- Shadcn Button variants (primary for "Play Again", secondary for "View Leaderboard")
- Responsive modal sizing that works on mobile devices

**Interaction Notes:** Modal appears with smooth animation using Shadcn transitions. Keyboard navigation trapped within modal. Clear close affordances with escape key support.

**Design File Reference:** Game over modal showing score presentation and leaderboard integration patterns

### Leaderboard View

**Purpose:** Display persistent high scores demonstrating local storage integration

**Key Elements:**

- Shadcn Dialog component for modal presentation (or Card if inline)
- Shadcn Table component for clean score presentation with proper column headers
- Shadcn Badge components for ranking indicators with appropriate color variants
- Empty state using Shadcn Typography and subtle iconography when no scores exist
- Shadcn Button for clear scores functionality with destructive variant styling

**Interaction Notes:** Table rows highlight current session score if applicable. Clear scores function includes confirmation dialog using nested Shadcn AlertDialog component.

**Design File Reference:** Leaderboard layout showing both populated and empty states with proper component hierarchy

### Mobile Touch Controls Layout

**Purpose:** Adaptive interface for mobile gameplay without compromising desktop experience

**Key Elements:**

- Shadcn Card component repositioned for thumb accessibility
- Virtual directional buttons using Shadcn Button with appropriate icons from Lucide React
- Larger touch targets meeting accessibility standards (44px minimum)
- Condensed score display using smaller Shadcn Typography variants
- Swipe gesture support for secondary actions

**Interaction Notes:** Touch controls appear only on mobile breakpoints using Tailwind responsive classes. Haptic feedback through vibration API where supported.

**Design File Reference:** Mobile-specific layout showing touch control placement and responsive adaptations
