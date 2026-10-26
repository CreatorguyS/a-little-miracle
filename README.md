# A Little Miracle — RANI DIDI, JIJU & BHANJI

A dreamy, responsive newborn celebration website built with Next.js, React Three Fiber, Three.js, GSAP, and Motion.

## Requirements

- Node.js 18.17+ (Node 20 LTS recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

## Deploy

The simplest option is Vercel:

1. Push this project to a Git repository.
2. Import the repository in Vercel.
3. Keep the default Next.js build settings.
4. Deploy and share the generated URL with Rani Didi and Jiju.

No database or environment variables are required. The 3D scene is generated in code; no external model assets are required. Google Fonts are loaded from Google Fonts when network access is available, with system font fallbacks.

## Notes

- The 3D scene is rendered client-side so the page can still render around it while the scene loads.
- The page respects reduced-motion preferences for its main animation sequences.
- The "Keep this little wish close" button copies a short greeting to the clipboard when browser permissions allow it.
- Replace the placeholder text only with family details you want to share. The baby's birth date and other personal details are intentionally not invented.
