import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** GitHub project page: https://<user>.github.io/<repo>/ — same idea as Gentelella's `base: '/polygon/gentelella/'`. */
function productionBase(): string {
  const repo = process.env.GITHUB_REPOSITORY?.split("/")?.[1];
  if (repo) return `/${repo}/`;
  return "/quizzzzz-buddy/";
}

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "serve" ? "/" : productionBase(),
}));
