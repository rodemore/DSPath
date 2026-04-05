# Module Translation Guide

This guide explains how to translate module content from Spanish to English (or any other language) in the DSPath application.

## Overview

The DSPath application currently has 26 modules with content in Spanish. The i18n infrastructure is fully set up and ready for bilingual support, but module content needs to be translated manually.

## Current i18n Setup

✅ **What's Already Done:**
- i18next configured with Spanish (es) and English (en)
- Language detection from browser/localStorage
- UI translations complete (buttons, labels, messages)
- Language selector integrated into Header
- Automatic language switching

❌ **What Needs Translation:**
- 26 module content files (theory blocks, exercises, quizzes)
- Module titles and descriptions
- Exercise descriptions and hints
- Quiz questions and options

## Module Content Structure

Each module has a `content.ts` file located in `src/modules/moduleXX-name/`:

```typescript
export const moduleXX: Section = {
  id: X,
  moduleNumber: 'Módulo XX',  // ← Translate
  title: 'Title in',           // ← Translate
  titleHighlight: 'Spanish',   // ← Translate
  theoryBlocks: [              // ← Translate each block
    {
      icon: '📚',
      title: 'Spanish Title',  // ← Translate
      content: 'Spanish text...',  // ← Translate
      codeExample: {
        filename: 'example.py',
        code: '# Comments in Spanish',  // ← Translate comments
      },
      table: {
        headers: ['Header1', 'Header2'],  // ← Translate
        rows: [
          { Header1: 'Value', Header2: 'Value' }  // ← Translate
        ]
      }
    }
  ],
  exercises: [                 // ← Translate each exercise
    {
      id: 'exercise-id',
      number: '1',
      description: 'Exercise in Spanish',  // ← Translate
      expectedOutput: 'output',
      initialCode: '# Code comments',  // ← Translate comments
      starterCode: ''
    }
  ],
  quizzes: [                   // ← Translate each quiz
    {
      id: 'quiz-id',
      number: '1',
      question: 'Question in Spanish?',  // ← Translate
      options: [
        {
          id: 'a',
          text: 'Option text',  // ← Translate
          isCorrect: true,
          feedback: 'Feedback text'  // ← Translate
        }
      ]
    }
  ]
};
```

## Translation Workflow

### Recommended Approach

**Option 1: Manual Translation (Best Quality)**
1. Open a module content file
2. Copy the entire file
3. Translate all Spanish text to English
4. Preserve all code examples and Python syntax
5. Test the translated content

**Option 2: AI-Assisted Translation (Faster)**
1. Use ChatGPT/Claude to translate sections
2. Prompt: "Translate this TypeScript module content from Spanish to English. Preserve all code, types, and structure. Only translate user-facing text."
3. Review and adjust translations
4. Ensure technical accuracy

**Option 3: Incremental Translation**
1. Start with the most popular modules
2. Translate one module per day
3. Test as you go
4. Get user feedback

### Step-by-Step Example

**Before (Spanish):**
```typescript
{
  icon: '📦',
  title: '¿Qué es una variable?',
  content: 'Una variable es un <strong>nombre</strong> que apunta a un valor almacenado en memoria.',
  codeExample: {
    filename: 'ejemplo.py',
    code: `<span class="comment"># Asignación de variables</span>
<span class="identifier">nombre</span> = <span class="string">"Ana"</span>`
  }
}
```

**After (English):**
```typescript
{
  icon: '📦',
  title: 'What is a variable?',
  content: 'A variable is a <strong>name</strong> that points to a value stored in memory.',
  codeExample: {
    filename: 'example.py',
    code: `<span class="comment"># Variable assignment</span>
<span class="identifier">name</span> = <span class="string">"Ana"</span>`
  }
}
```

## Implementation Strategy

### Phase 1: Create Bilingual Structure

For each module, create a language-specific version:

```
src/modules/
├── module01-variables/
│   ├── content.ts          # Current Spanish version
│   ├── content.en.ts       # NEW: English version
│   ├── content.es.ts       # NEW: Spanish version (copy of content.ts)
│   └── validators.ts       # Shared (no translation needed)
```

### Phase 2: Update Module Loader

Modify the module loading logic to select based on language:

```typescript
// src/utils/moduleLoader.ts (NEW FILE)
import { useTranslation } from 'react-i18next';

export const useModuleContent = (moduleId: number) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // Dynamic import based on language
  const module = await import(`./modules/module${moduleId}/content.${lang}.ts`);
  return module.default;
};
```

### Phase 3: Translate Content

1. **Priority Modules** (Translate First):
   - Module 01: Variables (most accessed)
   - Module 08: Conditionals
   - Module 10: For Loop
   - Module 13: Pandas Intro

2. **Medium Priority:**
   - Modules 02-07 (Python basics)
   - Modules 11-12 (Loops and challenges)

3. **Lower Priority:**
   - Modules 14-26 (Advanced pandas)

## Translation Checklist

For each module, ensure you translate:

- [ ] `moduleNumber` field
- [ ] `title` field
- [ ] `titleHighlight` field
- [ ] All theory block `title` fields
- [ ] All theory block `content` fields
- [ ] Code example comments
- [ ] Table headers
- [ ] Table row values
- [ ] All exercise `description` fields
- [ ] Exercise `initialCode` comments
- [ ] Exercise `starterCode` comments
- [ ] All quiz `question` fields
- [ ] All quiz option `text` fields
- [ ] All quiz option `feedback` fields

## Testing Translations

After translating a module:

1. **Change Language:**
   - Click the language selector in the header
   - Switch to English

2. **Navigate to Module:**
   - Open the translated module
   - Verify all text appears in English

3. **Test Exercises:**
   - Run code examples
   - Complete exercises
   - Verify feedback messages

4. **Test Quizzes:**
   - Read questions in English
   - Select answers
   - Verify feedback

## Important Notes

### DO Translate:
- ✅ User-facing text
- ✅ Instructions and descriptions
- ✅ Code comments
- ✅ Error messages
- ✅ Feedback messages
- ✅ Quiz questions and answers

### DO NOT Translate:
- ❌ Python keywords (`if`, `for`, `while`, etc.)
- ❌ Variable names in code examples (optional)
- ❌ Function names (`print`, `len`, `range`, etc.)
- ❌ Module IDs and technical identifiers
- ❌ File names (unless contextually appropriate)
- ❌ HTML/CSS class names
- ❌ TypeScript types and interfaces

### Code Example Guidelines

**Spanish Comments:**
```python
# Crear una lista de números
numeros = [1, 2, 3, 4, 5]
```

**English Comments:**
```python
# Create a list of numbers
numbers = [1, 2, 3, 4, 5]
```

**Note:** You can also translate variable names for clarity, but keep them consistent within each language version.

## Module Translation Status

| Module | Spanish | English | Priority |
|--------|---------|---------|----------|
| 01 - Variables | ✅ | ❌ | High |
| 02 - Operations | ✅ | ❌ | High |
| 03 - Strings | ✅ | ❌ | High |
| 04 - Lists Intro | ✅ | ❌ | High |
| 05 - Lists Methods | ✅ | ❌ | High |
| 06 - Dictionaries | ✅ | ❌ | High |
| 07 - Miscellaneous | ✅ | ❌ | Medium |
| 08 - Conditionals 1 | ✅ | ❌ | High |
| 09 - Conditionals 2 | ✅ | ❌ | High |
| 10 - For Loop | ✅ | ❌ | High |
| 11 - While Loop | ✅ | ❌ | High |
| 12 - Challenges | ✅ | ❌ | Medium |
| 13 - Pandas Intro | ✅ | ❌ | High |
| 14 - Pandas DataFrames | ✅ | ❌ | Medium |
| 15 - Pandas Selection | ✅ | ❌ | Medium |
| 16 - Pandas Filters | ✅ | ❌ | Medium |
| 17 - Pandas New Columns | ✅ | ❌ | Medium |
| 18 - Pandas Str | ✅ | ❌ | Low |
| 19 - Pandas Aggregations | ✅ | ❌ | Medium |
| 20 - Pandas Filters Advanced | ✅ | ❌ | Low |
| 21 - Pandas GroupBy | ✅ | ❌ | Medium |
| 22 - Pandas GroupBy Agg | ✅ | ❌ | Low |
| 23 - Pandas Sort Top | ✅ | ❌ | Low |
| 24 - Pandas Concat Merge | ✅ | ❌ | Medium |
| 25 - Pandas Apply | ✅ | ❌ | Low |
| 26 - Pandas Apply Columns | ✅ | ❌ | Low |

## Estimated Effort

- **Per Module:** 2-4 hours (manual) or 30-60 minutes (AI-assisted)
- **Total for 26 Modules:** 52-104 hours (manual) or 13-26 hours (AI-assisted)
- **Recommended:** Start with 5 high-priority modules (10-20 hours)

## Next Steps

1. **Choose your translation approach** (manual, AI-assisted, or incremental)
2. **Set up the bilingual structure** (create `.en.ts` and `.es.ts` files)
3. **Create the module loader** to select content by language
4. **Translate high-priority modules first**
5. **Test thoroughly** with the language selector
6. **Get user feedback** and iterate

## Resources

- **i18n Config:** `src/i18n/config.ts`
- **Translation Files:** `src/i18n/locales/[lang]/`
- **Language Selector:** `src/components/LanguageSelector/`
- **Module Files:** `src/modules/moduleXX-name/content.ts`

## Questions?

If you need help with translations:
1. Check existing English translations in `src/i18n/locales/en/`
2. Reference similar educational content in English
3. Test with native English speakers for naturalness
4. Prioritize clarity over literal translation

---

**Note:** The i18n infrastructure is fully ready. This guide focuses on the content translation workflow. Once modules are translated, the language selector will automatically switch all content seamlessly!
