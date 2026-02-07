# ClinixSummary – Website

The official website for **ClinixSummary**, the AI medical scribe foundation for modern clinicians.

## Overview

ClinixSummary turns every consultation into structured, billing-ready documentation — in seconds — so clinicians can reclaim their time for patients, not paperwork.

## Tech Stack

- **Single-page application** (SPA) with hash-based routing
- **Vanilla HTML / CSS / JavaScript** — no build step required
- Google Fonts (Inter + Merriweather)
- Google Material Symbols (icons)

## Project Structure

```
├── index.html              # HTML structure (navbar, footer, main shell)
├── css/
│   └── styles.css          # All styles (layout, components, responsive)
├── js/
│   └── app.js              # SPA router, page templates, calculator logic
├── images/                 # Local image assets (see setup)
│   └── README.md           # Image manifest
├── download-images.sh      # Script to fetch all images
├── .gitignore
└── README.md
```

## Getting Started

### 1. Download Images

The repo ships with local image paths but you need to fetch them once:

```bash
chmod +x download-images.sh
./download-images.sh
```

### 2. Local Development

Simply open `index.html` in a browser, or use any local server:

```bash
# Python
python3 -m http.server 8000

# Node.js (npx)
npx serve .
```

Then visit `http://localhost:8000`.

### Deployment

This is a static site — deploy to any static hosting provider:

- **GitHub Pages**: Push to `main` branch → Settings → Pages → Deploy from branch
- **Netlify / Vercel**: Connect the repo and deploy — zero config needed
- **Custom server**: Serve `index.html` from your web root

## Pages / Routes

| Route              | Page                  |
| ------------------ | --------------------- |
| `#home`            | Home (landing page)   |
| `#clinicians`      | For Clinicians        |
| `#organizations`   | For Organizations     |
| `#insurers`        | For Insurers          |
| `#security`        | Security & Compliance |
| `#publications`    | Publications          |
| `#news`            | News & Events         |
| `#blog`            | Blog & Podcasts       |
| `#story`           | Our Story             |
| `#pricing`         | Pricing (anchor)      |
| `#roi-calculator`  | ROI Calculator        |

## License

© 2025 GATMEDI. All rights reserved.
