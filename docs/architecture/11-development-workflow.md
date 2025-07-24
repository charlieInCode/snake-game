# 11. Development Workflow

### **Local Development Setup**

#### **Prerequisites**

- Node.js (LTS version, e.g., 20.x)
- npm, yarn, or pnpm

#### **Initial Setup**

1.  **Create the Next.js project:**
    ```bash
    npx create-next-app@latest snake-game-portfolio
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd snake-game-portfolio
    ```
3.  **Initialize Shadcn UI:**
    ```bash
    npx shadcn-ui@latest init
    ```
4.  **Install necessary Shadcn components:**
    ```bash
    npx shadcn-ui@latest add button card dialog table badge
    ```

#### **Development Commands**

- **Start the development server:** `npm run dev`
- **Create a production build:** `npm run build`
- **Run the production build locally:** `npm run start`
- **Run tests:** `npm run test`

### **Environment Configuration**

For the MVP, no environment variables (`.env` file) are required, as there are no backend API keys or secrets to manage.

---
