# Accessibility Requirements

## Compliance Target

**Standard:** WCAG 2.1 AA - Demonstrates professional accessibility knowledge and ensures inclusive design practices appropriate for portfolio presentation.

## Key Requirements

### Visual

**Color contrast ratios:** All text meets WCAG AA standards with minimum 4.5:1 contrast ratio for normal text and 3:1 for large text. Shadcn/ui default palette provides compliant contrast ratios out of the box.

**Focus indicators:** All interactive elements display clear focus rings using Shadcn/ui's built-in focus-visible utilities. Custom focus styles maintain 2px minimum outline width with high contrast colors.

**Text sizing:** Responsive typography scales appropriately from 14px minimum on mobile to 16px+ on desktop. All text remains readable when zoomed to 200% without horizontal scrolling.

### Interaction

**Keyboard navigation:** Complete game functionality accessible via keyboard:

- Arrow keys and WASD for snake movement
- Space bar for pause/resume functionality
- Tab navigation through all UI controls
- Enter/Space activation for buttons
- Escape key to close modals and return focus appropriately

**Screen reader support:** All interactive elements include proper ARIA labels and roles:

- Game canvas has aria-label describing current game state
- Live score updates announced via aria-live regions
- Modal dialogs properly trap focus and announce content
- Button purposes clearly communicated through accessible names

**Touch targets:** All interactive elements meet 44px minimum size requirement:

- Shadcn Button components default to appropriate sizing
- Mobile touch controls designed with 48px targets for comfortable interaction
- Adequate spacing between touch targets to prevent accidental activation

### Content

**Alternative text:** All meaningful images and icons include descriptive alt text:

- Decorative icons marked with aria-hidden="true"
- Game state communicated through text announcements
- Score changes and game events announced to screen readers

**Heading structure:** Logical heading hierarchy maintains document outline:

- H1 for main game title
- H2 for major sections (Score, Leaderboard)
- H3 for subsections within modals
- No skipped heading levels throughout interface

**Form labels:** All interactive controls properly labeled:

- Buttons have clear, descriptive text or aria-label attributes
- Game controls include instructions and current state information
- Error messages clearly associated with relevant controls

## Testing Strategy

**Automated Testing:** Integration with accessibility testing tools during development:

- @axe-core/react for runtime accessibility checking
- Playwright accessibility assertions for E2E testing
- ESLint jsx-a11y plugin for development-time accessibility linting

**Manual Testing Procedures:**

- Keyboard-only navigation testing for all user flows
- Screen reader testing with NVDA/JAWS for Windows, VoiceOver for macOS
- High contrast mode testing to ensure visual elements remain distinguishable
- Zoom testing up to 200% for text scaling compliance

**Key Testing Scenarios:**

- Complete game session using only keyboard navigation
- Screen reader announcement testing for score changes and game state transitions
- Mobile touch navigation testing with assistive touch enabled
- Color blindness simulation testing for game element distinction

**Performance Accessibility:**

- Reduced motion preferences respected for game animations
- No auto-playing content that could trigger vestibular disorders
- Sufficient time provided for all user interactions without time pressure
