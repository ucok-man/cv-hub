# CV-Hub

AI-powered resume analyzer that provides instant feedback on your CV with ATS compatibility scoring and actionable recommendations.

**Live** : [https://cv-hub.ucokman.web.id](https://example.com)

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Next.js, Prisma, PostgreSQL
- **AI**: OpenAI GPT-4
- **Storage**: Cloudinary, PostgreSQL
- **UI**: Shadcn UI, TanStack React Query
- **API Communication**: ORPC (Open RPC)

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL

### Setup

1. **Clone & Install**

   ```bash
   git clone <repo-url>
   cd cv-hub
   npm install
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
   npm run dev
   ```

Visit `http://localhost:3000`

## 📋 Environment Variables

```env
DATABASE_URL=""
OPENAI_SECRET_KEY=""
CLOUDINARY_API_KEY=""
CLOUDINARY_SECRET=""
CLOUDINARY_CLOUD_NAME=""

```
