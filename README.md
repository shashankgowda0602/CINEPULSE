# CinePulse

A modern streaming-inspired movie platform built with React, TypeScript, Vite, and Tailwind CSS. CinePulse recreates the feel of a premium OTT experience with a cinematic hero banner, category browsing, top-10 rankings, watchlist management, search, and rich movie detail overlays.

Deployed link: https://cinepulse-d6ik.vercel.app/


## Features

- Hero banner and immersive landing screen
- Movie and TV browsing across curated rows and categories
- Top 10 ranking sections
- Search experience for titles, genres, and content discovery
- My List / watchlist functionality
- Authentication and profile selection flows
- Movie details modal with metadata and description
- Video preview modal for trailer-style playback
- Responsive, dark-theme streaming UI inspired by modern OTT platforms

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React icons
- Motion animations
- Google Generative AI integration
- Express + dotenv support for API/server setup

## Project Structure

```text
CINEPULSE/
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── types/
│   └── ...
└── public/ (if added in future)
```

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy the environment example and set your values:

```bash
cp .env.example .env
```

Then update the variables in `.env` as needed, especially `GEMINI_API_KEY` if you are using the AI-backed features.

4. Start the development server:

```bash
npm run dev
```

The app runs on port 3000 by default via the Vite config.

## Available Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run clean    # Remove build artifacts
npm run lint     # Type-check with TypeScript
```

## Environment Variables

The project includes a sample environment file:

```env
GEMINI_API_KEY="MY_GEMINI_API_KEY"
APP_URL="MY_APP_URL"
```

## Notes

This project is designed as a polished front-end streaming demo and includes integrations that may rely on environment-based configuration for AI and app URL settings.

## License

This project is currently unlicensed unless otherwise specified in the repository.
