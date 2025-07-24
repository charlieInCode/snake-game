# Branding & Style Guide

## Visual Identity

**Brand Guidelines:** Modern, clean aesthetic leveraging Shadcn/ui's default design system with minimal customization to maintain professional portfolio presentation while showcasing effective design system implementation.

## Color Palette

| Color Type | Hex Code                 | Usage                                                   |
| ---------- | ------------------------ | ------------------------------------------------------- |
| Primary    | `hsl(222.2 84% 4.9%)`    | Primary buttons, focus states, active game elements     |
| Secondary  | `hsl(210 40% 96%)`       | Secondary buttons, inactive states, background elements |
| Accent     | `hsl(221.2 83.2% 53.3%)` | Interactive highlights, score emphasis, new records     |
| Success    | `hsl(142.1 76.2% 36.3%)` | Positive feedback, successful actions, high scores      |
| Warning    | `hsl(38.4 92.1% 50.4%)`  | Cautions, pause states, important notices               |
| Error      | `hsl(0 84.2% 60.2%)`     | Game over states, destructive actions, error messages   |
| Neutral    | `hsl(210 40% 98%)`       | Text, borders, subtle backgrounds, game canvas border   |

**Note:** These colors follow Shadcn/ui's default palette using CSS custom properties, ensuring consistency with the design system and easy maintenance.

## Typography

### Font Families

- **Primary:** `Inter` (Shadcn/ui default) - Clean, modern sans-serif for all interface text
- **Secondary:** `system-ui` fallback - Ensures consistent rendering across platforms
- **Monospace:** `ui-monospace` - For score displays requiring fixed-width alignment

### Type Scale

| Element | Size               | Weight                | Line Height       |
| ------- | ------------------ | --------------------- | ----------------- |
| H1      | `text-4xl` (36px)  | `font-bold` (700)     | `leading-tight`   |
| H2      | `text-2xl` (24px)  | `font-semibold` (600) | `leading-tight`   |
| H3      | `text-xl` (20px)   | `font-semibold` (600) | `leading-snug`    |
| Body    | `text-base` (16px) | `font-normal` (400)   | `leading-relaxed` |
| Small   | `text-sm` (14px)   | `font-normal` (400)   | `leading-normal`  |

**Usage Examples:**

- **Game Over Modal Title:** H1 with primary color for maximum impact
- **Live Score Display:** H2 with monospace font for consistent number width
- **Control Instructions:** Body text with muted foreground color
- **Leaderboard Rankings:** H3 for score values, Small for timestamps

## Iconography

**Icon Library:** Lucide React (integrated with Shadcn/ui ecosystem)

**Usage Guidelines:** Consistent 16px (w-4 h-4) icons for buttons, 24px (w-6 h-6) for prominent actions, maintaining visual hierarchy and touch target accessibility.

**Key Icons:**

- **Play:** `Play` icon for start/resume actions
- **Pause:** `Pause` icon for game pause functionality
- **RotateCcw:** `RotateCcw` icon for restart actions
- **Trophy:** `Trophy` icon for leaderboard and high scores
- **ChevronUp/Down/Left/Right:** Directional icons for mobile touch controls

## Spacing & Layout

**Grid System:** Tailwind CSS utilities with Shadcn/ui component spacing

**Base Spacing Unit:** 4px (Tailwind's default)

**Layout Spacing:**

- **Component Padding:** `p-6` (24px) for cards and containers
- **Button Spacing:** `px-4 py-2` for standard buttons, `px-6 py-3` for primary actions
- **Section Gaps:** `gap-4` (16px) between related elements, `gap-8` (32px) between sections
- **Canvas Margins:** `m-4` (16px) minimum margin around game canvas for breathing room

**Responsive Breakpoints:** Following Tailwind's default breakpoints

- **Mobile:** `< 640px` - Compact layout with larger touch targets
- **Tablet:** `640px - 1024px` - Intermediate spacing and component sizing
- **Desktop:** `> 1024px` - Full component spacing and optimal game canvas size

**Game-Specific Spacing:**

- **Canvas Container:** `aspect-square` or `aspect-[4/3]` maintaining consistent game area
- **Score Display:** `mb-4` separation from game canvas for clear hierarchy
- **Control Buttons:** `space-x-2` horizontal spacing for logical grouping
