export interface Milestone {
  period: string;
  title: string;
  text: string;
  future?: boolean;
}

export const milestones: Milestone[] = [
  {
    period: "The beginning",
    title: "First lines of code",
    text: "Started programming because I wanted to know how the stuff I used every day actually worked. Never really stopped asking that question.",
  },
  {
    period: "Games first",
    title: "Building things to play",
    text: "Browser games, a Paper Minecraft clone, a 2D flight simulator. Games are the best way to learn to code because you can't fake it: either it's fun or it isn't.",
  },
  {
    period: "BrowserOS Lite",
    title: "A desktop inside a browser tab",
    text: "Built a whole desktop environment in vanilla JavaScript. Windows, a taskbar, a terminal emulator. It taught me more about the browser than any framework did.",
  },
  {
    period: "Specter",
    title: "A 5v5 FPS from scratch",
    text: "A tactical shooter in Three.js with 18 weapons, agents with abilities, a buy economy, and bot AI. No engine. The biggest thing I'd built at that point.",
  },
  {
    period: "Going deeper",
    title: "Python tools and low-level curiosity",
    text: "Security tool GUIs, AI Agent Studio, and the start of ForgeOS experiments. The projects started splitting into two threads: useful tools and understanding the machine.",
  },
  {
    period: "Ember & Forge",
    title: "Building my own editors",
    text: "The tools thread became the main quest. Ember is the small, fast, local-first editor. Forge is the ambitious AI-first one. Both in progress right now.",
  },
  {
    period: "Ahead",
    title: "Shipping them",
    text: "Get Forge and Ember into other people's hands and see what breaks.",
    future: true,
  },
  {
    period: "Further",
    title: "Keep building",
    text: "More tools, bigger projects, and eventually turning this from a portfolio into a product.",
    future: true,
  },
];
