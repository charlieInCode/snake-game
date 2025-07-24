# Animation & Micro-interactions

## Motion Principles

**Subtle and Purposeful**: All animations serve functional purposes - providing feedback, guiding attention, or communicating state changes. Motion design should enhance the portfolio demonstration without distracting from core gameplay.

**Performance-Conscious**: All animations designed to maintain 60fps gameplay performance using CSS transforms and GPU acceleration. Leverages Shadcn/ui's built-in transition utilities for consistency.

**Accessible**: Respects `prefers-reduced-motion` settings and provides disable options for users sensitive to motion. Critical information never conveyed through animation alone.

## Key Animations

**Game State Transitions**: Smooth fade-in/fade-out for game over modal using Shadcn Dialog component animations (Duration: 200ms, Easing: ease-in-out)

**Score Updates**: Gentle scale animation when score increases to provide positive feedback (Duration: 150ms, Easing: ease-out)

**Button Interactions**: Shadcn Button hover and active states with subtle scale and shadow changes (Duration: 100ms, Easing: ease-in-out)

**Snake Movement**: Canvas-based smooth interpolation between grid positions for fluid 60fps movement (Duration: Frame-based, Easing: linear)

**Food Consumption**: Brief pulse animation when snake consumes food providing satisfying feedback (Duration: 200ms, Easing: ease-out)

**Modal Entrance**: Shadcn Dialog slide-up animation with backdrop fade for professional modal presentation (Duration: 250ms, Easing: ease-out)

**Focus Indicators**: Smooth focus ring transitions using Shadcn focus utilities for keyboard navigation (Duration: 150ms, Easing: ease-in-out)

**Loading States**: Shadcn Skeleton component animations for graceful loading experiences (Duration: 1500ms, Easing: ease-in-out infinite)
