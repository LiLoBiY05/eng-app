# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 4 application for an English learning portal, built with Vue 3, TypeScript, and Tailwind CSS. The app uses Nuxt Content for markdown-based content management and shadcn-nuxt/Reka UI for component design.

## Commands

### Development
```bash
yarn dev              # Start development server on http://localhost:3000
yarn build            # Build for production
yarn preview          # Preview production build locally
yarn install          # Install dependencies
```

### Linting
The project uses ESLint with Nuxt's configuration (`@nuxt/eslint`). The config is in `eslint.config.mjs`.

## Architecture

### Content-Driven Structure
The application is built around Nuxt Content v3 with a dynamic catch-all routing system:

- **Content Files**: All content lives in `content/**/*.md` organized in a student-centric structure
- **Content Config**: Defined in `content.config.ts` using the collections API with a single "content" collection
- **Dynamic Routing**: The `app/pages/[...slug].vue` catch-all route handles all content pages, querying content via `queryCollection("content").path(route.path).first()`

#### Content Organization
The content folder is organized by student, with each student having their own learning materials:

```
content/
├── index.md                           # Portal home page
├── yurii-rostyslav/                   # Student folder
│   ├── index.md                       # Student overview
│   ├── themes/                        # Grammar lessons and topics
│   │   ├── index.md
│   │   └── tenses/
│   │       └── past_simple_vs_present_perfect.md
│   ├── homework/                      # Assignments (date-based naming)
│   │   ├── index.md
│   │   └── 2024-11-30.md
│   └── vocabulary/                    # Word lists
│       └── index.md
├── kate/                              # Another student folder
│   ├── index.md
│   ├── themes/
│   ├── homework/
│   └── vocabulary/
└── resources/                          # Shared global resources
    ├── grammar-rules/
    ├── exercises/
    └── tips/
```

**Key principles:**
- Each student has their own isolated learning space
- Homework files use date format: `YYYY-MM-DD.md`
- Themes can be organized by subtopic (e.g., `themes/tenses/`, `themes/modals/`)
- Global resources are shared across all students

### Navigation System
The Navigation component (`app/components/Navigation.vue`) auto-generates from content structure:
- Uses `queryCollectionNavigation("content")` to build hierarchical navigation
- Supports nested items with collapsible `<details>` elements
- Active route highlighting based on path matching

### Layout Architecture
The main app layout (`app/app.vue`) uses a two-column grid:
- Left sidebar: Navigation component (300px on sm+ screens)
- Right content: `<NuxtPage />` for dynamic route content
- Wrapped in `<NuxtLayout>` for extensibility

### Content Surroundings
The Surrounding component (`app/components/Surrounding.vue`) provides prev/next navigation:
- Uses `queryCollectionItemSurroundings("content", route.path)` to find adjacent content items
- Displays buttons at the bottom of content pages for sequential navigation

### UI Components
The project uses shadcn-nuxt (configured in `components.json`):
- Components are in `app/components/ui/` following the shadcn structure
- Utilities in `app/lib/utils.ts` with the standard `cn()` helper for Tailwind class merging
- Icon library: Lucide icons via `lucide-vue-next`
- Style: "new-york" variant with neutral base color and CSS variables

### Styling
- **Tailwind CSS 4**: Configured via `@tailwindcss/vite` plugin in `nuxt.config.ts`
- **Main CSS**: `app/assets/css/main.css` contains Tailwind directives and custom styles
- **Typography**: Uses `@tailwindcss/typography` for prose styling in content rendering
- **Animations**: `tw-animate-css` for additional animation utilities

### Plugins
- **SSR Width Plugin** (`app/plugins/ssr-width.ts`): Provides SSR-compatible width detection via VueUse's `provideSSRWidth(1024)` to prevent hydration mismatches

### Modules
Key Nuxt modules in use:
- `@nuxt/content`: Content management system
- `@nuxt/ui`: Nuxt UI framework
- `shadcn-nuxt`: shadcn-vue integration
- `@nuxt/image`: Image optimization
- `@nuxt/eslint`: Linting integration
- `@nuxt/scripts`: Script loading optimization
- `@nuxt/hints`: Development hints

## Content Management

### Adding New Content

**For student-specific content:**
1. Navigate to the student's folder (e.g., `content/yurii-rostyslav/`)
2. Choose the appropriate subfolder:
   - `themes/` for grammar lessons and learning topics
   - `homework/` for assignments (use `YYYY-MM-DD.md` naming)
   - `vocabulary/` for word lists
3. Create a `.md` file with appropriate frontmatter
4. Update the corresponding `index.md` file to link to the new content

**For shared resources:**
1. Add content to `content/resources/` in the appropriate subfolder
2. These are accessible to all students

**Examples:**
- New homework: `content/yurii-rostyslav/homework/2024-12-08.md`
- New theme: `content/kate/themes/modals/modal-verbs.md`
- Shared exercise: `content/resources/exercises/tense-practice.md`

### Content Frontmatter
All markdown files should include frontmatter with at least a `title` field:

```yaml
---
title: Past Simple vs Present Perfect
---
```

The `title` field is used in navigation items and page headings.

## TypeScript Configuration
The project uses TypeScript with Nuxt's auto-generated types. After making configuration changes, run `yarn postinstall` (or `nuxt prepare`) to regenerate types.
