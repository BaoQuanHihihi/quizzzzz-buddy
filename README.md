# Quiz Practice

A static, production-style quiz web app for practicing multiple-choice questions. Subjects are **JavaScript modules** auto-discovered from a folder — add a file, refresh, and it shows up. No backend, database, or login.

## Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- Framer Motion
- React Router (`HashRouter` for easy GitHub Pages hosting)

## Install & run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build & preview

```bash
npm run build
npm run preview
```

Output is in `dist/`, suitable for **GitHub Pages**, **Vercel**, **Netlify**, or any static host.

### GitHub Pages

This project uses `HashRouter` (URLs like `/#/subject/...`), so it works with GitHub Pages without SPA rewrite rules. Set `base` in `vite.config.ts` if you deploy to a project page URL (e.g. `https://user.github.io/repo-name/`); for a project subpath you may need:

```ts
base: "/your-repo-name/",
```

Then build and deploy the `dist` folder.

## Add a new subject

1. Create a new **`.js` file** under `src/data/subjects/`.
2. Export exactly:
   - `SUBJECT_NAME` — non-empty string  
   - `ALL_QUESTIONS` — array of questions  

3. Restart dev server if it does not hot-reload the new glob entry (Vite usually picks up new files).

**Do not** register the file in React manually — the app uses `import.meta.glob` to load every `*.js` in that folder.

## Subject file format

Each file must be a JavaScript module with this shape:

```js
export const SUBJECT_NAME = "Kỹ năng mềm - ED3220";

export const ALL_QUESTIONS = [
  {
    text: "Đến họp đúng giờ thể hiện cá nhân có:",
    options: ["Giao tiếp tốt", "Hợp tác tốt", "Có trách nhiệm"],
    answer: [2],
  },
  {
    text: "Hỏi kỹ lại khi không hiểu rõ ý người trình bày thể hiện cá nhân có:",
    options: ["Có trách nhiệm", "Hợp tác tốt", "Giao tiếp tốt"],
    answer: [2],
  },
];
```

### Rules

- **`text`**: non-empty string.  
- **`options`**: array of at least **2** non-empty strings.  
- **`answer`**: array of at least **1** integer, **0-based** indexes into `options`.  
- **Multiple correct answers**: use more than one index, e.g. `answer: [0, 2]`. The UI uses checkboxes; scoring requires an **exact match** of the selected set and the correct set.

Invalid questions are skipped per file; invalid files are skipped with a **console warning** (`[quiz-practice]`).

## How auto-discovery works

- `src/lib/loadSubjects.ts` calls:

  `import.meta.glob("../data/subjects/*.js", { eager: true })`

- Each module is validated in `src/lib/validateSubject.ts`.  
- Valid subjects are sorted by name and shown on the home page.

If a file exports via `default` an object with `SUBJECT_NAME` and `ALL_QUESTIONS`, that is also resolved when named exports are absent.

## Project layout

```
src/
  components/     # UI pieces (cards, progress, navigator, options)
  pages/          # Home, setup, quiz, results
  hooks/          # Timer, subjects
  context/        # Quiz session + results
  lib/            # Load/validate subjects, scoring, shuffle, storage, drafts
  types/          # Shared TypeScript types
  data/subjects/  # One .js file per subject (your content)
```

## Optional features included

- Last quiz settings (question count, time limit) in `localStorage`
- Recent attempts summary stored locally
- Practice count per subject on cards
- Resume unfinished quiz from the setup screen (draft in `localStorage`)

---

Built for focused exam practice: smooth UI, timed mode, per-section review, and resilient loading when a data file is wrong.
