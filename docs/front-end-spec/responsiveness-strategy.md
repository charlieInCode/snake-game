# Responsiveness Strategy

## Breakpoints

| Breakpoint | Min Width | Max Width | Target Devices                             |
| ---------- | --------- | --------- | ------------------------------------------ |
| Mobile     | `0px`     | `639px`   | Smartphones, small mobile devices          |
| Tablet     | `640px`   | `1023px`  | Tablets, large phones in landscape         |
| Desktop    | `1024px`  | `1535px`  | Laptops, desktop monitors                  |
| Wide       | `1536px`  | `-`       | Large desktop monitors, ultrawide displays |

**Note:** Following Tailwind CSS default breakpoints for consistency with Shadcn/ui responsive patterns.

## Adaptation Patterns

### Layout Changes

**Mobile (< 640px):**

- Single column layout with game canvas taking full container width
- Shadcn Card component uses minimal padding (`p-4` instead of `p-6`)
- Score display positioned above canvas for thumb accessibility
- Touch controls overlay positioned at bottom of screen
- Modal dialogs use nearly full screen width with minimal margins

**Tablet (640px - 1023px):**

- Game canvas maintains aspect ratio with centered positioning
- Side-by-side layout for score and controls when space permits
- Hybrid input support (both touch and potential keyboard)
- Modal dialogs use comfortable mid-size dimensions

**Desktop (1024px+):**

- Optimal game canvas size with comfortable surrounding whitespace
- Horizontal layout with score and controls positioned around canvas
- Full keyboard navigation prominence with visible focus indicators
- Modal dialogs use constrained widths for comfortable reading

### Navigation Changes

**Mobile Navigation:**

- Touch-first interaction with virtual directional pad
- Swipe gesture support for secondary actions
- Shadcn Button components sized larger (`size="lg"`) for touch accessibility
- Game controls grouped in bottom panel for thumb reach

**Tablet Navigation:**

- Hybrid approach supporting both touch and keyboard input
- Touch controls available but less prominent than mobile
- Keyboard shortcuts displayed when hardware keyboard detected
- Flexible button sizing based on input method detection

**Desktop Navigation:**

- Keyboard-first interaction with clear focus management
- Mouse hover states fully utilized on Shadcn components
- Keyboard shortcuts prominently displayed
- Touch controls completely hidden using `hidden` utilities

### Content Priority

**Mobile Content Hierarchy:**

1. Game canvas (primary focus, largest viewport allocation)
2. Current score (immediately visible above canvas)
3. Essential controls (Start/Pause/Restart)
4. Secondary actions (Leaderboard access via floating action button)

**Tablet Content Adaptation:**

- Game canvas remains primary but allows for peripheral content
- Score and controls positioned to not interfere with gameplay
- Leaderboard accessible via prominent button placement
- Instructions and help text become visible when space permits

**Desktop Content Expansion:**

- Full interface layout with all elements comfortably visible
- Comprehensive control instructions displayed permanently
- Leaderboard and game statistics can be shown in sidebar if desired
- Room for enhanced visual polish and micro-animations

### Interaction Changes

**Mobile Interaction Patterns:**

- Touch controls overlay using fixed positioning
- Tap targets minimum 44px (achieved through Shadcn Button sizing)
- Swipe gestures for directional input as alternative to virtual buttons
- Modal interactions optimized for thumb navigation

**Tablet Interaction Flexibility:**

- Auto-detection of input method (touch vs keyboard) where possible
- Graceful degradation between touch and pointer interactions
- Shadcn components adapt hover states based on capability detection
- Focus management accounts for both input paradigms

**Desktop Interaction Optimization:**

- Full keyboard shortcut support with visual indicators
- Mouse hover enhancements on all interactive Shadcn components
- Focus trapping and management optimized for keyboard navigation
- Precise click targets with subtle hover feedback

**Game-Specific Responsive Considerations:**

- Canvas size scales proportionally while maintaining playable area
- Game speed and difficulty remain constant across devices
- Score font sizing adapts to screen real estate while maintaining readability
- Pause functionality accounts for different interaction contexts (accidental touches vs intentional breaks)
