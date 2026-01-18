# Claude Code Rules for English Learning Portal

## Content Structure Guidelines

### Folder Organization

The content follows a simplified two-level structure:

```
content/
├── index.md                           # Portal home
├── students/                          # Student-specific content
│   ├── {student-name}/
│   │   ├── index.md                  # Student overview
│   │   ├── homework.md               # All homework assignments
│   │   └── vocabulary.md             # Personal vocabulary list
│   └── ...
└── library/                           # Shared learning resources
    ├── index.md                       # Library overview
    ├── tenses/                        # Grammar: All 12 English tenses
    │   ├── index.md
    │   ├── present-simple.md
    │   ├── present-continuous.md
    │   ├── present-perfect.md
    │   ├── present-perfect-continuous.md
    │   ├── past-simple.md
    │   ├── past-continuous.md
    │   ├── past-perfect.md
    │   ├── past-perfect-continuous.md
    │   ├── future-simple.md
    │   ├── future-continuous.md
    │   ├── future-perfect.md
    │   ├── future-perfect-continuous.md
    │   ├── going-to-future.md
    │   └── future-in-the-past.md
    ├── grammar/                       # Other grammar structures
    │   └── used-to.md
    ├── irregular-verbs/               # Irregular verbs
    │   └── index.md
    └── vocabulary/                    # Vocabulary and phrases
        ├── phrasal-verbs.md
        ├── put-phrasal-verbs.md
        └── education-vocabulary.md
```

### Content File Rules

1. **NO numbered prefixes** (e.g., `1.present-simple.md` → `present-simple.md`)
   - Use frontmatter for ordering if needed:
     ```yaml
     ---
     title: Present Simple
     order: 1
     ---
     ```

2. **Use kebab-case** for all filenames: `present-simple.md`, `irregular-verbs.md`

3. **Consolidate related content** into single files rather than multiple small files:
   - ✅ `homework.md` with dated sections
   - ❌ `2024-11-30.md`, `2024-12-01.md`, etc.

4. **Date format**: Use ISO format `YYYY-MM-DD` in content (e.g., headings, sections)

### File Structure Standards

#### Student Content Files

**homework.md structure:**
```markdown
---
title: Homework
---

## 2026-01-15

### Exercise 1
...

### Exercise 2
...

## 2026-01-10

...
```

**vocabulary.md structure:**
```markdown
---
title: Vocabulary
---

## Week 2026-01-13

| English | Ukrainian | Example |
|---------|-----------|---------|
| acquire | отримувати | I acquired new skills |

## Week 2026-01-06

...
```

#### Library Content Files

**tenses.md structure:**
```markdown
---
title: English Tenses
---

## Present Tenses

### Present Simple

**Formula:**
- ✅ Affirmative: Subject + V1/V1+s
- ❌ Negative: Subject + do/does not + V1
- ❓ Question: Do/Does + subject + V1?

**Usage:**
1. Permanent facts: *The sun rises in the east*
2. Habits: *I drink coffee every morning*

**Time markers:** always, usually, often, every day, never

**Common mistakes:**
- ❌ He go to school
- ✅ He goes to school

---

### Present Continuous

...

## Past Tenses

### Past Simple

...
```

### Content Management Commands

When adding/editing content:

1. **Adding new student:**
   ```bash
   mkdir -p content/students/{name}
   # Create: index.md, 0.homework.md, vocabulary.md
   ```

2. **Adding homework:**
   - Edit `content/students/{name}/homework.md`
   - Add new date section at the top (newest first)

3. **Adding library content:**
   - Edit existing file if topic exists
   - Create new file only if it's a distinct topic
   - Use `content/library/{topic}.md` for simple topics
   - Use `content/library/{category}/{topic}.md` for grouped topics

### Navigation Best Practices

1. **Keep paths short and memorable:**
   - ✅ `/students/yurii/homework`
   - ❌ `/yurii-rostyslav/homework/index`

2. **Use descriptive titles** in frontmatter for navigation display

3. **Index files should overview their section**, not duplicate content

### Markdown Conventions

1. **Headers:**
   - H1 (`#`) - Page title (matches frontmatter title)
   - H2 (`##`) - Major sections
   - H3 (`###`) - Subsections

2. **Tables** for structured data (vocabulary, verb forms, etc.)

3. **Callouts** using blockquotes with emoji:
   ```markdown
   > 💡 **Tip:** Remember to use Present Simple for habits!

   > ⚠️ **Common mistake:** Don't forget the 's' in third person!
   ```

4. **Examples** with checkmarks:
   ```markdown
   - ✅ Correct: She plays tennis
   - ❌ Wrong: She play tennis
   ```

### TypeScript and Component Guidelines

1. **Navigation** is auto-generated from content structure via `queryCollectionNavigation("content")`

2. **Routing** uses catch-all `[...slug].vue` with `queryCollection("content").path(route.path).first()`

3. **When modifying content structure:**
   - Update `content.config.ts` if changing collection behavior
   - Navigation updates automatically on content changes
   - No manual route configuration needed

### Development Workflow

1. **Before adding content:** Check if it can be added to an existing file
2. **After adding content:** Verify navigation updates correctly
3. **For new sections:** Create index.md to introduce the section
4. **For references:** Link to library content from student content

### Migration from Old Structure

When restructuring existing content:

1. Move student folders to `students/` subdirectory
2. Consolidate dated homework files into single `homework.md`
3. Remove numbered prefixes from filenames
4. Move `resources/` to `library/`
5. Consolidate tense files into single `tenses.md`
6. Update all internal links in markdown files

## Code Quality

1. **Always run ESLint** before committing: `yarn lint`
2. **Use TypeScript** for all new components
3. **Follow Nuxt 4 patterns:** Use `app/` directory, not `pages/` or `components/` at root
4. **Component naming:** PascalCase for Vue components, kebab-case for files

## Commands Reference

```bash
yarn dev              # Start dev server (http://localhost:3000)
yarn build            # Production build
yarn preview          # Preview production build
yarn lint             # Run ESLint
yarn postinstall      # Regenerate TypeScript types
```