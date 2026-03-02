# UTKARSH — AI Systems Engineer Portfolio

A futuristic, production-grade personal portfolio built with React, Three.js, and TypeScript. The "Neural Forge" design features animated 3D neural networks, glitch effects, holographic cards, and a CRT scanline overlay — designed to feel like you're inside an AI's mind.

## Tech Stack

- **React** (Vite) + **TypeScript** — strict mode
- **Three.js** + @react-three/fiber + @react-three/drei — 3D neural network, skill constellation, icosahedron
- **Framer Motion** — section animations, staggered reveals, page transitions
- **Tailwind CSS** — utility-first styling with custom theme
- **React Router v6** — SPA navigation + secret admin route
- **Supabase** (optional) — dynamic project management
- **Vercel** — deployment

## Screenshots

> _Add screenshots or a demo GIF here_

## Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start dev server
npm run dev
```

The app runs at `http://localhost:5173`.

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `VITE_ADMIN_USER` | Admin panel username | Yes (for /admin) |
| `VITE_ADMIN_PASS` | Admin panel password | Yes (for /admin) |
| `VITE_SUPABASE_URL` | Supabase project URL | No |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key | No |

## Adding a New Project

### Option A: Edit config file

Edit `src/config/projects.config.ts` and add an entry:

```typescript
{
  id: "5",
  title: "My New Project",
  description: "Description of the project...",
  techTags: ["Python", "LangGraph", "FastAPI"],
  projectUrl: "https://example.com",
  githubUrl: "https://github.com/user/repo",
  visible: true,
}
```

### Option B: Admin panel

Navigate to `/admin`, log in with your credentials, and use the dashboard to add/edit/toggle/delete projects.

## Deployment

### Vercel

1. Push code to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Set environment variables in Vercel project settings:
   - `VITE_ADMIN_USER`
   - `VITE_ADMIN_PASS`
   - `VITE_SUPABASE_URL` (optional)
   - `VITE_SUPABASE_ANON_KEY` (optional)
4. Deploy — Vercel auto-detects Vite

### Supabase Setup (Optional)

1. Create a Supabase project
2. Run the migration to create the `projects` table with RLS policies
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your `.env`
4. The admin panel will automatically use Supabase for CRUD operations

## Project Structure

```
src/
  components/
    three/          — Three.js 3D scenes (neural network, skills, icosahedron)
    ui/             — Reusable UI components (glitch text, cursor, cards)
    sections/       — Page sections (Hero, About, Skills, Projects, etc.)
    admin/          — Admin panel components
    layout/         — Navbar
  config/           — Project data and social links
  hooks/            — Custom React hooks
  lib/              — Supabase client
  routes/           — Route guards
  styles/           — Global CSS with CRT overlay, glitch keyframes
```

## License

MIT
