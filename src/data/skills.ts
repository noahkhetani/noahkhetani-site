export interface SkillGroup {
  title: string;
  note: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    note: "From low-level to the browser",
    items: ["TypeScript", "JavaScript", "Python", "C", "C++", "Rust", "Assembly", "C#", "PHP", "Kotlin", "HTML", "CSS"],
  },
  {
    title: "Developer Tools",
    note: "Tools that build tools",
    items: ["Electron", "CodeMirror", "React", "Git", "Vite", "Build Systems"],
  },
  {
    title: "Games & Graphics",
    note: "If it renders, I'll build it",
    items: ["Three.js", "Canvas 2D", "Game Loops", "Game AI", "Physics", "Procedural Generation"],
  },
  {
    title: "AI",
    note: "Agents, models, and memory",
    items: ["LLM Integration", "AI Agents", "Multi-Model Setups", "Prompting", "Agent Memory"],
  },
  {
    title: "Systems",
    note: "The layer underneath",
    items: ["OS Experiments", "Memory Management", "Networking", "Performance", "QEMU"],
  },
  {
    title: "Web & Desktop",
    note: "Apps people actually use",
    items: ["React", "Vanilla JS", "Desktop Apps", "UI Design", "Local-First Apps"],
  },
];
