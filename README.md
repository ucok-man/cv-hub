# CV-Hub

AI-powered resume analyzer that provides instant feedback on your CV with ATS compatibility scoring and actionable recommendations.

**Live** : [https://cv-hub.ucokman.web.id](https://cv-hub.ucokman.web.id)

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL
- PNPM

### Setup

1. **Clone & Install**

   ```bash
   git clone <repo-url>
   cd cv-hub
   pnpm install
   ```

2. **Configure Environment**

   ```bash
   cp .env.example .env.local
   # Fill in your credentials
   ```

3. **Setup Database**

   ```bash
   npx prisma migrate dev
   ```

4. **Run Dev Server**
   ```bash
   pnpm run dev
   ```

Visit `http://localhost:3000`
