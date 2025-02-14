# 🌍 dev-personal-site-template

A modern, performant, and feature-rich personal website template for web developers built with Astro, React, and shadcn/ui. Combines static site generation with dynamic interactivity for optimal performance and user experience.

## ✨ Features

### ⚡ Performance
- Island architecture with partial hydration
- Optimized assets and lazy-loading components
- Smooth page transitions with Viewtransitions API

### 🌐 Internationalization
- Full i18n support
- Astro files-based routing
- Content localization
- Currently supported languages: English, Italian

### 🌜 Theme Switcher
- Dark/light mode support
- Automatic system theme detection
- Smooth theme transitions

### 📝 Blog
- Minimal blog implementation
- Automatic table of contents generation
- Full MDX support

## 🛠️ Tech Stack

### Core
- Astro 5.0+
- React 19
- TypeScript
- shadcn/ui

### Styling
- Tailwind CSS

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/dev-personal-site-template.git
cd dev-personal-site-template
```
2. Install dependencies 
```bash
pnpm install
```
3. Start the development server
```bash
pnpm dev
```

### Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 🔧 Configuration

The site can be configured by modifying:

astro.config.mjs for Astro configuration
tailwind.config.mjs for Tailwind CSS customization
src/i18n/ui.ts for internationalization settings

## 🌐 Internationalization

To add a new language:

Add the language code to the i18n configuration
Create corresponding content files in the src/content directory
Add translations to the UI strings in src/i18n/ui.ts