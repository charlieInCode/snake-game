# 12. Deployment Architecture

### **Deployment Strategy**

We will use a **Git-based deployment workflow**. The project's GitHub repository will be linked to a Vercel project. Vercel will automatically build and deploy the application upon every push to the repository.

- **Production Deployment**: Every push or merge to the `main` branch will automatically trigger a build and deploy to the production URL.
- **Preview Deployment**: Every push to any other branch or any new pull request will automatically trigger a build and deploy to a unique preview URL.

### **CI/CD Pipeline**

We will use **Vercel's built-in CI/CD pipeline**. No separate configuration file is required. Vercel automatically detects the Next.js framework and runs the standard `npm run build` command, along with optimizations.

### **Environments**

| Environment     | Frontend URL                                 | Purpose                                           |
| :-------------- | :------------------------------------------- | :------------------------------------------------ |
| **Production**  | `snake-game-portfolio.vercel.app` (Example)  | Live application, connected to the `main` branch. |
| **Preview**     | `[branch-name]-project.vercel.app` (Example) | Staging environment for testing new features.     |
| **Development** | `localhost:3000`                             | Local machine for active development.             |

---
