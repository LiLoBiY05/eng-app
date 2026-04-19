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
The content folder is split into two main sections — student-specific content and a shared library:

```
content/
├── index.md                           # Portal home page
├── students/
│   ├── yurii/                         # Student folder
│   │   ├── index.md                   # Student overview
│   │   ├── homework/                  # Assignments (numbered prefix + date)
│   │   │   ├── 1.homework-18.01.md
│   │   │   └── 9.homework-19.04.md
│   │   └── vocabulary/                # Personal word lists (topic-based files)
│   │       ├── index.md
│   │       ├── 1.education.md
│   │       ├── 2.memory.md
│   │       ├── 3.work-career.md
│   │       ├── 4.general.md
│   │       ├── 5.emotions-personality.md
│   │       ├── 6.phrases-idioms.md
│   │       ├── 7.body-language.md
│   │       └── 8.urban-city.md
│   └── kate/                          # Another student folder
│       ├── index.md
│       ├── homework.md
│       └── vocabulary.md
└── library/                           # Shared reference library (all students)
    ├── index.md
    ├── tenses/                        # All 14 English tenses
    │   ├── index.md
    │   ├── 1.present-simple.md ✅
    │   ├── 2.present-continuous.md
    │   └── ...
    ├── irregular-verbs/
    │   └── index.md
    ├── grammar/                       # Grammar topics
    │   ├── articles-a-an-the.md
    │   ├── passive-voice.md
    │   ├── prepositions-in-on-at.md
    │   ├── relative-clauses.md
    │   ├── used-to.md
    │   ├── word-formation-prefixes-suffixes.md
    │   └── infinitive-gerund/         # Multi-file topic (decision tree, patterns, etc.)
    └── vocabulary/                    # Reference vocabulary by topic
        ├── phrasal-verbs.md           # Index + guide
        ├── phrasal-verbs-1-50.md
        ├── phrasal-verbs-51-100.md
        ├── common-phrasal-verbs.md
        ├── put-phrasal-verbs.md
        ├── emotions-feelings.md
        ├── education-vocabulary.md
        ├── studying-academic-vocabulary.md
        ├── memory-brain-vocabulary.md
        ├── housing-vocabulary.md
        └── health-idioms.md
```

**Key principles:**
- Each student has their own isolated space under `students/`
- Homework files use numbered prefix + lesson date: `N.homework-DD.MM.md`
- Vocabulary files use numbered prefixes for topic ordering (e.g., `1.education.md`, `5.emotions-personality.md`)
- The `library/` folder contains reference material shared across all students
- Numbered prefixes (1., 2., 3.) control nav ordering — Nuxt automatically removes them from URLs

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

**For student homework:**
1. Navigate to `content/students/yurii/homework/`
2. Name the file with a numbered prefix + lesson date: `N.homework-DD.MM.md`
   - Example: `9.homework-19.04.md` (lesson 9, April 19)
3. Add frontmatter with at least a `title` field

**For student vocabulary:**
1. Navigate to `content/students/yurii/vocabulary/`
2. Add new words to the appropriate topic file (e.g., `8.urban-city.md`)
3. To create a new topic, add a new numbered file (e.g., `9.new-topic.md`) and link it in `index.md`
4. Each vocabulary table uses columns: `#`, `Word/Phrase`, `Part of Speech`, `Ukrainian`, `Definition`, `Example`

**For shared library content:**
- Grammar topics → `content/library/grammar/`
- Vocabulary reference → `content/library/vocabulary/`
- Tenses → `content/library/tenses/`
- These are accessible to all students

**Examples:**
- New homework: `content/students/yurii/homework/10.homework-26.04.md`
- New vocabulary topic: `content/students/yurii/vocabulary/9.science.md`
- New grammar topic: `content/library/grammar/conditionals.md`
- New phrasal verb set: `content/library/vocabulary/phrasal-verbs-101-150.md`

### Content Frontmatter
All markdown files should include frontmatter with at least a `title` field:

```yaml
---
title: Past Simple vs Present Perfect
---
```

The `title` field is used in navigation items and page headings.

### File Ordering with Numbered Prefixes

Files and folders use numbered prefixes for ordering (e.g., `1.present-simple.md`, `2.past/`). Nuxt Content automatically strips these numbers from URLs:

**File:** `content/resources/tenses/1.present/1.present-simple.md`
**URL:** `/resources/tenses/present/present-simple`

This approach provides:
- Consistent ordering in navigation and file system
- Clean, semantic URLs for users
- Easy reordering by changing numbers

## Library Structure (`content/library/`)

The library contains reference material shared across all students. Content is written in English with Ukrainian explanations.

### Tenses (`content/library/tenses/`)

All 14 English tenses as individual numbered files (flat structure, no subfolders).

**When adding/editing tense content**, follow the structure of completed tenses:
- Introduction (Що це таке?)
- Formula tables (стверджувальна, заперечна, питальна форми)
- Usage cases with examples (Коли використовувати?)
- Time markers table
- Common mistakes section with ❌/✅ examples
- Practice exercises with answers
- Useful tips

Include both Ukrainian explanations and English examples throughout.

### Grammar (`content/library/grammar/`)

Individual grammar topic files. Multi-part topics use a subfolder with numbered files (see `infinitive-gerund/` as the pattern).

### Vocabulary (`content/library/vocabulary/`)

Reference vocabulary organized by topic. Each file covers one topic with overview tables, detailed breakdowns, collocations, common mistakes, and exercises with answers.

**Phrasal verbs are split across files:**
- `phrasal-verbs.md` — index and guide to types
- `phrasal-verbs-1-50.md` — 50 most common
- `phrasal-verbs-51-100.md` — education/work focused
- `common-phrasal-verbs.md` — 19 high-frequency verbs with full breakdowns
- `put-phrasal-verbs.md` — all meanings of PUT

**When adding a new vocabulary file**, include:
1. Overview table (word, Ukrainian, example)
2. Detailed breakdown per word/phrase
3. Common mistakes (❌/✅)
4. Practice exercises with answers

### Irregular Verbs (`content/library/irregular-verbs/`)

Currently has `index.md` only — verbs to be added in groups of 50 following V1/V2/V3 table format with Ukrainian translations and examples.

## TypeScript Configuration
The project uses TypeScript with Nuxt's auto-generated types. After making configuration changes, run `yarn postinstall` (or `nuxt prepare`) to regenerate types.
