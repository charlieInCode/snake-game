# 14. Testing Strategy

### **Testing Pyramid**

Our approach will focus heavily on unit and component tests. End-to-end (E2E) tests are out of scope for the MVP.

```plaintext
      /      \
     /________\    Integration Tests (Component Interactions)
    /          \
   /____________\  Unit Tests (Hooks, Utils) & Component Tests (UI Rendering)
```

### **Test Organization**

Test files (`*.test.tsx`) will be co-located with the components and logic they are testing, following standard Next.js and Jest conventions.

### **Frontend Component Test (Conceptual Example)**

```typescript
import { render, screen } from "@testing-library/react";
import ScoreDisplay from "./components/ui/ScoreDisplay";

describe("ScoreDisplay", () => {
  it("should render the score correctly", () => {
    // Arrange
    const score = 120;
    render(<ScoreDisplay currentScore={score} />);

    // Act
    const scoreElement = screen.getByText(/Score: 120/i);

    // Assert
    expect(scoreElement).toBeInTheDocument();
  });
});
```

---
