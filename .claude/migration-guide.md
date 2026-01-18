# Content Structure Migration Guide

## Overview

This guide helps you migrate from the current nested structure to a simplified, flatter structure.

## Current vs New Structure

### Current Structure (Complex)
```
content/
├── yurii/
│   ├── homework/
│   │   ├── index.md
│   │   ├── 2024-11-30.md
│   │   ├── 14-12-2025.md
│   │   ├── 27-12-2025.md
│   │   └── 11.01.2026.md
│   ├── themes/
│   │   └── tenses/past_simple_vs_present_perfect.md
│   └── vocabulary/
│       └── 27-12-2025.md
├── kate/
│   └── ...
└── resources/
    ├── tenses/
    │   ├── 1.present/
    │   │   ├── 1.present-simple.md
    │   │   └── ...
    │   ├── 2.past/
    │   └── 3.future/
    ├── irregular-verbs/
    │   ├── 1.verbs-1-50.md
    │   └── 2.verbs-51-100.md
    └── phrasal-verbs/
        └── ...
```

### New Structure (Simplified)
```
content/
├── index.md
├── students/
│   ├── yurii/
│   │   ├── index.md
│   │   ├── homework.md          # All homework in one file
│   │   └── vocabulary.md        # All vocabulary in one file
│   └── kate/
│       ├── index.md
│       ├── homework.md
│       └── vocabulary.md
└── library/
    ├── index.md
    ├── tenses.md                # All tenses consolidated
    ├── irregular-verbs.md       # All irregular verbs in one file
    ├── phrasal-verbs.md         # All phrasal verbs in one file
    └── grammar/
        └── {specific-topics}.md
```

## Migration Steps

### Step 1: Create New Directory Structure

```bash
# Create students directory
mkdir -p content/students/yurii
mkdir -p content/students/kate

# Create library directory
mkdir -p content/library/grammar

# Keep content/index.md as is
```

### Step 2: Migrate Student Content

#### For Yurii (repeat for Kate):

**2.1 Create homework.md:**

```bash
# Create the new consolidated homework file
touch content/students/yurii/0.homework.md
```

Add content structure:
```markdown
---
title: Homework
---

## 2026-01-11

[Copy content from content/yurii/homework/11.01.2026.md here]

## 2025-12-27 (Lesson 1)

[Copy content from content/yurii/homework/27-12-2025-1.md here]

## 2025-12-27

[Copy content from content/yurii/homework/27-12-2025.md here]

## 2025-12-14

[Copy content from content/yurii/homework/14-12-2025.md here]

## 2024-11-30

[Copy content from content/yurii/homework/2024-11-30.md here]
```

**2.2 Create vocabulary.md:**

```bash
touch content/students/yurii/vocabulary.md
```

Add content:
```markdown
---
title: Vocabulary
---

## December 2025

[Copy content from content/yurii/vocabulary/27-12-2025.md here]
```

**2.3 Copy index.md:**

```bash
# Copy and modify student index
cp content/yurii/index.md content/students/yurii/index.md
```

Update links in `content/students/yurii/index.md`:
```markdown
---
title: Yurii Rostyslav
---

# Yurii Rostyslav

## Learning Materials

- [Homework](/students/yurii/homework) - Assignments and practice
- [Vocabulary](/students/yurii/vocabulary) - Word lists and phrases

## Shared Resources

- [Tenses](/library/tenses) - Complete tenses reference
- [Irregular Verbs](/library/irregular-verbs) - Verb conjugation tables
- [Phrasal Verbs](/library/phrasal-verbs) - Common phrasal verbs
```

### Step 3: Migrate Library Content

**3.1 Create consolidated tenses.md:**

```bash
touch content/library/tenses.md
```

Structure (combine all tense files):
```markdown
---
title: English Tenses
description: Complete reference for all English tenses
---

# English Tenses

Complete guide to all 12 English tenses with Ukrainian explanations.

## Present Tenses

### Present Simple

[Copy from content/resources/tenses/1.present/1.present-simple.md]

### Present Continuous

[Copy from content/resources/tenses/1.present/2.present-continuous.md]

### Present Perfect

[Copy from content/resources/tenses/1.present/3.present-perfect.md]

### Present Perfect Continuous

[Copy from content/resources/tenses/1.present/4.present-perfect-continuous.md]

---

## Past Tenses

### Past Simple

[Copy from content/resources/tenses/2.past/5.past-simple.md]

### Past Continuous

[Continue pattern...]

---

## Future Tenses

[Continue pattern...]
```

**3.2 Create consolidated irregular-verbs.md:**

```bash
touch content/library/irregular-verbs.md
```

Combine all verb lists:
```markdown
---
title: Irregular Verbs
description: Complete list of English irregular verbs
---

# Irregular Verbs

Complete list of irregular verbs with Ukrainian translations.

## Most Common Verbs (1-50)

[Copy table from content/resources/irregular-verbs/1.verbs-1-50.md]

## Additional Verbs (51-100)

[Copy table from content/resources/irregular-verbs/2.verbs-51-100.md]

## More Verbs (101-150)

[Copy table from content/resources/irregular-verbs/3.verbs-101-150.md]
```

**3.3 Create consolidated phrasal-verbs.md:**

```bash
touch content/library/phrasal-verbs.md
```

**3.4 Create library index:**

```bash
touch content/library/index.md
```

Content:
```markdown
---
title: Library
---

# Learning Library

Shared resources available to all students.

## Quick Reference

- [Tenses](/library/tenses) - Complete guide to all 12 English tenses
- [Irregular Verbs](/library/irregular-verbs) - Comprehensive verb conjugation tables
- [Phrasal Verbs](/library/phrasal-verbs) - Common phrasal verbs with examples

## Grammar Topics

- [Articles](/library/grammar/articles)
- [Modal Verbs](/library/grammar/modals)
- [Conditionals](/library/grammar/conditionals)
```

### Step 4: Update Root Index

Update `content/index.md`:
```markdown
---
title: English Learning Portal
---

# English Learning Portal

Welcome to the English learning platform.

## Students

- [Yurii](/students/yurii)
- [Kate](/students/kate)

## Learning Library

Browse our comprehensive [Learning Library](/library) with grammar references, vocabulary lists, and exercises.
```

### Step 5: Clean Up Old Structure

**⚠️ Only after verifying new structure works:**

```bash
# Backup first!
cp -r content content-backup-$(date +%Y%m%d)

# Remove old directories
rm -rf content/yurii
rm -rf content/kate
rm -rf content/resources
```

### Step 6: Verify and Test

```bash
# Start dev server
yarn dev

# Check all these URLs work:
# - http://localhost:3000
# - http://localhost:3000/students/yurii
# - http://localhost:3000/students/yurii/homework
# - http://localhost:3000/students/yurii/vocabulary
# - http://localhost:3000/library
# - http://localhost:3000/library/tenses
# - http://localhost:3000/library/irregular-verbs
```

## Manual Tasks

After migration, you need to:

1. **Fix internal links:** Search and replace old paths:
   - `/yurii/` → `/students/yurii/`
   - `/resources/` → `/library/`
   - `/yurii-rostyslav/` → `/students/yurii/`

2. **Update CLAUDE.md** to reflect new structure

3. **Check navigation** renders correctly

## Automated Migration Script

You can create a script to automate parts of this:

```bash
#!/bin/bash

# Create new structure
mkdir -p content/students/{yurii,kate}
mkdir -p content/library/grammar

echo "New directories created. Manual content consolidation required."
echo "Follow the steps in migration-guide.md"
```

## Rollback Plan

If migration fails:

```bash
# Restore from backup
rm -rf content
mv content-backup-YYYYMMDD content

# Restart dev server
yarn dev
```

## Benefits After Migration

1. **Shorter URLs:** `/library/tenses` vs `/resources/tenses/1.present/1.present-simple`
2. **Easier navigation:** 2-3 levels max vs 4-5 levels
3. **Better findability:** One tenses reference instead of 14 separate files
4. **Clearer organization:** `students/` and `library/` are self-explanatory
5. **Less maintenance:** Update one file instead of many
6. **Faster loading:** Fewer file reads, better caching

## Questions?

- Is student content too consolidated? Consider keeping themes separate if you have many
- Need more granular sections in library? You can split `library/grammar/` further
- Want different structure? Discuss before migrating
