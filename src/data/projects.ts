export type ProjectStatus = "In Development" | "Active" | "Experimental" | "Prototype";
export type VisualKind = "ide" | "os" | "terminal" | "browser" | "modeler" | "agents" | "game" | "lang";

export interface ArchLayer {
  name: string;
  detail: string;
}

export interface TimelineEntry {
  label: string;
  text: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  featured: boolean;
  visual: VisualKind;
  stack: string[];
  github?: string;
  demo?: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: ArchLayer[];
  challenges: { title: string; text: string }[];
  features: string[];
  timeline: TimelineEntry[];
  roadmap: string[];
}

const gh = (repo: string) => `https://github.com/noahkhetani/${repo}`;

export const projects: Project[] = [
  {
    slug: "forge-ide",
    name: "Forge IDE",
    tagline: "An AI-first IDE built to compete with modern development environments.",
    status: "In Development",
    featured: false,
    visual: "ide",
    stack: ["TypeScript", "React", "Electron", "AI"],
    overview:
      "Forge is the most ambitious thing I'm working on: a full IDE where AI is part of the design from day one, not a plugin bolted on later. The goals are AI-assisted coding, multi-model workflows, workspace intelligence, an extensible architecture, and a clean developer experience.",
    problem:
      "Most AI coding tools are extensions living inside editors that were never designed for them. The AI can't see the whole workspace, every provider needs its own plugin, and the experience feels stitched together.",
    solution:
      "Build the editor around the AI layer instead. Forge has one workspace model that both the editor and the AI read from, and a model layer that can route work to different AI models depending on the task.",
    architecture: [
      { name: "React UI", detail: "The editor shell: panels, tabs, and the command surface." },
      { name: "Editor Core", detail: "Documents, editing state, and workspace navigation." },
      { name: "Extensions", detail: "An extensible architecture so the editor can grow without bloating the core." },
      { name: "AI Layer", detail: "Multi-model workflows. Different models for different jobs, sharing the same context." },
      { name: "Workspace", detail: "Files, search, and project context. The single source of truth everything reads from." },
    ],
    challenges: [
      {
        title: "Keeping the editor fast with AI in the loop",
        text: "Typing can never wait on a model. Everything AI does in Forge is async and additive, so the editor stays responsive even when a slow model is thinking.",
      },
      {
        title: "Context is everything",
        text: "An AI that only sees the open file gives shallow answers. Getting the right amount of workspace context to the model, without blowing past limits, is the hardest ongoing problem.",
      },
      {
        title: "Scope",
        text: "An IDE is huge. The real skill I'm learning on Forge is deciding what not to build yet.",
      },
    ],
    features: [
      "AI-assisted coding built into the editor, not bolted on",
      "Multi-model workflows",
      "Workspace intelligence instead of single-file context",
      "Extensible architecture",
      "A clean, uncluttered developer experience",
    ],
    timeline: [
      { label: "Concept", text: "Wrote down what an editor looks like if AI is assumed from the start." },
      { label: "Shell", text: "Editor UI, panels, and the command surface." },
      { label: "Now", text: "The AI layer and workspace context. This is where most of my time goes." },
    ],
    roadmap: ["Local model support", "Extension API", "A public preview build"],
  },
  {
    slug: "ember-ide",
    name: "Ember IDE",
    tagline: "A local-first code editor focused on speed, simplicity, and low resource usage.",
    status: "In Development",
    featured: true,
    visual: "ide",
    stack: ["TypeScript", "Electron", "React", "CodeMirror"],
    github: gh("ember-ide"),
    overview:
      "Ember is a local-first code editor built with Electron, React, and CodeMirror. Where Forge asks how much an editor can do, Ember asks how little it needs. Fast startup, minimal overhead, clean UI, and it gets out of the way.",
    problem:
      "Editors keep getting heavier. For quick edits and focused work, most of what a big IDE loads is dead weight you still pay for in startup time and memory.",
    solution:
      "Ship less on purpose. Ember is built on CodeMirror for fast, responsive editing, keeps everything local-first, and only adds a feature when it earns its cost.",
    architecture: [
      { name: "Electron Shell", detail: "The desktop app: windows, menus, and file system access." },
      { name: "React UI", detail: "A clean, minimal interface that stays out of the way." },
      { name: "CodeMirror Editor", detail: "The editing core. Fast, proven, and responsive on big files." },
      { name: "Local Workspace", detail: "Local-first by design. Your files, on your machine, no account needed." },
    ],
    challenges: [
      {
        title: "Electron without the bloat",
        text: "Electron has a reputation for heavy apps. Keeping Ember light means being strict about dependencies and lazy-loading everything that isn't the editor itself.",
      },
      {
        title: "Saying no",
        text: "Every feature request sounds reasonable on its own. The hard part is remembering that the whole point of Ember is what it doesn't have.",
      },
    ],
    features: [
      "Fast startup",
      "Local-first, no account, no cloud",
      "CodeMirror-based editing that stays responsive",
      "Clean UI with minimal overhead",
      "Gets out of the way while you work",
    ],
    timeline: [
      { label: "Core", text: "Electron shell, React UI, and CodeMirror wired together." },
      { label: "Editing", text: "File handling, tabs, and search." },
      { label: "Now", text: "Polish, performance passes, and workspace features." },
    ],
    roadmap: ["Syntax support for more languages", "Split views", "Themes"],
  },
  {
    slug: "specter",
    name: "Specter",
    tagline: "A from-scratch tactical 5v5 FPS running entirely in the browser.",
    status: "Active",
    featured: true,
    visual: "game",
    stack: ["JavaScript", "Three.js", "Game AI"],
    github: gh("specter"),
    overview:
      "Specter is a tactical 5v5 first-person shooter built from scratch in Three.js. Spike attack and defend rounds, a buy economy, 18 weapons, 5 agents with abilities and ultimates, and bot AI to fill the lobby. No game engine, just the browser.",
    problem:
      "Tactical shooters are some of the most complex games to build: round logic, an economy, abilities, weapon feel, and AI that can actually play the objective. Most people reach for a full game engine. I wanted to know if I could do it with Three.js and raw JavaScript.",
    solution:
      "Build every system myself. Rendering through Three.js, and everything else from scratch: the game loop, weapon handling, the buy economy, agent abilities, and bots that attack, defend, and plant the spike.",
    architecture: [
      { name: "Three.js Renderer", detail: "Maps, weapon models, and effects rendered in WebGL." },
      { name: "Game Loop", detail: "Movement, shooting, hit detection, and round state." },
      { name: "Weapons & Agents", detail: "18 weapons and 5 agents, each with abilities and an ultimate." },
      { name: "Bot AI", detail: "Bots that navigate the map, take fights, and play the spike objective." },
      { name: "Match Logic", detail: "Attack and defend rounds, the buy economy, and win conditions." },
    ],
    challenges: [
      {
        title: "Making bots feel like players",
        text: "A bot that aims perfectly is unfair and a bot that wanders is useless. Tuning reaction time, accuracy, and decision making so bots feel fun to play against took a lot of iteration.",
      },
      {
        title: "Weapon feel",
        text: "The difference between a shooter that feels good and one that feels flat is a hundred small details: recoil, sound timing, hit feedback. Most of them you only find by playtesting.",
      },
      {
        title: "Performance in the browser",
        text: "A 10-player match with abilities and effects has to hold a stable frame rate in a browser tab. That meant being careful with draw calls, object pooling, and effect lifetimes.",
      },
    ],
    features: [
      "5v5 spike attack and defend",
      "Buy economy between rounds",
      "18 weapons",
      "5 agents with abilities and ultimates",
      "Bot AI for full lobbies",
      "Runs in the browser, no install",
    ],
    timeline: [
      { label: "Core", text: "Three.js scene, movement, and shooting." },
      { label: "Systems", text: "Rounds, economy, weapons, and agents." },
      { label: "Bots", text: "AI that can navigate, fight, and play the objective." },
      { label: "Now", text: "Balance, polish, and more content." },
    ],
    roadmap: ["More maps", "More agents", "Multiplayer experiments"],
  },
  {
    slug: "genesis",
    name: "Genesis",
    tagline: "A large-scale civilization and ecosystem simulation where autonomous agents evolve and survive.",
    status: "Active",
    featured: true,
    visual: "agents",
    stack: ["JavaScript", "Simulation", "Procedural Generation"],
    github: gh("Genesis"),
    overview:
      "Genesis is a browser-based civilization and ecosystem simulation. Autonomous agents evolve, compete, expand, and survive inside a procedurally generated world. You don't play it so much as watch it: set the world in motion and see what emerges.",
    problem:
      "Emergent behavior is the most interesting thing in games and the hardest to build. Scripted worlds do what you told them to. I wanted a world where the interesting stuff happens on its own.",
    solution:
      "Give every agent simple rules: find food, avoid danger, reproduce, claim territory. Then generate a world with limited resources and let thousands of agents loose in it. Civilizations, competition, and collapse all emerge from the rules interacting.",
    architecture: [
      { name: "World Generator", detail: "Procedurally generated terrain, resources, and biomes." },
      { name: "Agents", detail: "Autonomous agents with simple survival rules and traits that evolve." },
      { name: "Ecosystem", detail: "Food, territory, and competition. The pressures that shape behavior." },
      { name: "Simulation Loop", detail: "Ticks thousands of agents per frame without dropping the frame rate." },
      { name: "Renderer", detail: "Draws the world and lets you watch any part of it up close." },
    ],
    challenges: [
      {
        title: "Simulating thousands of agents at 60fps",
        text: "Every agent thinks every tick. Keeping that fast in JavaScript meant spatial partitioning, cheap decision rules, and being ruthless about what actually needs to update each frame.",
      },
      {
        title: "Emergence you can't predict but can explain",
        text: "The goal is behavior that surprises you and still makes sense afterwards. That balance lives entirely in tuning: resource scarcity, reproduction cost, and how traits pass on.",
      },
    ],
    features: [
      "Procedurally generated worlds",
      "Autonomous agents that evolve over generations",
      "Emergent civilizations, expansion, and collapse",
      "Runs entirely in the browser",
    ],
    timeline: [
      { label: "World", text: "Procedural generation and the resource map." },
      { label: "Agents", text: "Survival rules, traits, and reproduction." },
      { label: "Now", text: "Bigger worlds and smarter agent behavior." },
    ],
    roadmap: ["Agent memory and simple cultures", "Save and share worlds", "Time-lapse replays"],
  },
  {
    slug: "browseros-lite",
    name: "BrowserOS Lite",
    tagline: "A desktop environment that runs in a browser tab.",
    status: "Active",
    featured: false,
    visual: "browser",
    stack: ["JavaScript", "HTML", "CSS"],
    github: gh("BrowserOS"),
    overview:
      "BrowserOS Lite is a browser-based desktop environment built with plain HTML, CSS, and JavaScript. Draggable windows, a taskbar, desktop apps, a terminal emulator, and theme customization. No frameworks, just the web platform.",
    problem:
      "Window managers look simple until you build one. Focus, stacking order, dragging, resizing: it's a decade of interaction design decisions that are invisible until you have to make them all yourself.",
    solution:
      "Write it all by hand in vanilla JavaScript. A window manager, a taskbar, built-in apps including a terminal emulator, and a theming system, with no framework doing the hard parts for me.",
    architecture: [
      { name: "Desktop Shell", detail: "The desktop, taskbar, and app launcher." },
      { name: "Window Manager", detail: "Dragging, resizing, focus, and stacking, written from scratch." },
      { name: "Apps", detail: "Built-in apps including a working terminal emulator." },
      { name: "Themes", detail: "Theme customization so the whole desktop can change its look." },
    ],
    challenges: [
      {
        title: "Window state is sneaky",
        text: "Focus, z-order, and drag state interact in hostile ways. Half the bugs in a window manager are three features being true at the same time when they shouldn't be.",
      },
      {
        title: "No framework safety net",
        text: "In vanilla JS there's no component model cleaning up after you. Every event listener and DOM node is your problem. It taught me more about the browser than any framework ever did.",
      },
    ],
    features: [
      "Draggable, resizable windows",
      "Taskbar and desktop apps",
      "Terminal emulator",
      "Theme customization",
      "Zero frameworks, zero build step",
    ],
    timeline: [
      { label: "Shell", text: "Desktop, windows, and the taskbar." },
      { label: "Apps", text: "Terminal emulator and the built-in apps." },
      { label: "Now", text: "More apps and polish." },
    ],
    roadmap: ["A file system that persists", "More built-in apps"],
  },
  {
    slug: "windstrike-arena",
    name: "WindStrike Arena",
    tagline: "A fast-paced 2D Minecraft-inspired PvP game with mace combat.",
    status: "Active",
    featured: false,
    visual: "game",
    stack: ["TypeScript", "Canvas", "Game Dev"],
    github: gh("2D-Minecraft-Mace-PVP"),
    overview:
      "WindStrike Arena is a fast-paced 2D Minecraft-inspired PvP game built in TypeScript. Mace combat, axes, shields, wind charges, golden apples, and ender pearls. It's the Minecraft mace meta, distilled into a 2D arena.",
    problem:
      "Minecraft's mace combat is one of the most fun PvP mechanics ever added to a game, but it lives inside a huge game. I wanted just that: the wind charge jump, the falling mace hit, the clutch, in a game small enough to build myself.",
    solution:
      "A 2D arena with the whole kit: maces that deal damage based on fall distance, wind charges to launch yourself, shields to block, ender pearls to escape, and golden apples to survive.",
    architecture: [
      { name: "Canvas Renderer", detail: "2D rendering with sprites and effects." },
      { name: "Game Loop", detail: "Physics, movement, and fall-distance tracking for mace damage." },
      { name: "Combat", detail: "Maces, axes, shields, wind charges, pearls, and gapples." },
      { name: "Arena", detail: "The stage, spawns, and round flow." },
    ],
    challenges: [
      {
        title: "Getting mace damage right",
        text: "The whole mechanic depends on fall distance mattering. Tracking airtime cleanly through wind charge launches and pearl teleports took real care.",
      },
      {
        title: "Fast combat that stays readable",
        text: "When both players are flying around with wind charges, the game can turn into noise. Effects and hit feedback had to make every exchange readable at speed.",
      },
    ],
    features: [
      "Mace combat with fall-distance damage",
      "Wind charges, ender pearls, and golden apples",
      "Axes and shields",
      "Fast rounds built for repeat matches",
    ],
    timeline: [
      { label: "Core", text: "Movement, physics, and the arena." },
      { label: "Combat", text: "The full mace kit, item by item." },
      { label: "Now", text: "Balance and game feel." },
    ],
    roadmap: ["More arenas", "Online matches"],
  },
  {
    slug: "ai-agent-studio",
    name: "AI Agent Studio",
    tagline: "Create and customize multiple AI agents with unique personalities, memory, and models.",
    status: "Active",
    featured: true,
    visual: "agents",
    stack: ["Python", "LLMs", "UI"],
    github: gh("AI-Agent-Studio"),
    overview:
      "AI Agent Studio lets you create and customize multiple AI agents, each with its own personality, memory, and model, all inside a clean chat interface. Build an agent for coding help, another for brainstorming, another that's just fun to talk to, and switch between them.",
    problem:
      "Most AI chat apps give you one assistant with one personality and no memory of who you are. If you want different agents for different jobs, you end up re-explaining yourself in every conversation.",
    solution:
      "Make agents a first-class thing. Each agent has a personality you define, memory that persists across conversations, and a model you pick per agent, so a lightweight model can run the fun agents while a stronger one handles the serious work.",
    architecture: [
      { name: "Chat UI", detail: "A clean interface for talking to agents and switching between them." },
      { name: "Agent Manager", detail: "Create, customize, and organize agents with unique personalities." },
      { name: "Memory", detail: "Per-agent memory that persists, so agents remember past conversations." },
      { name: "Model Layer", detail: "Each agent runs on the model you choose for it." },
    ],
    challenges: [
      {
        title: "Memory that helps instead of hurts",
        text: "Dumping full history into every prompt makes agents slow and weird. Deciding what an agent should remember, and what it should forget, matters more than how much it stores.",
      },
      {
        title: "Personalities that hold up",
        text: "A personality defined in one system prompt drifts over a long chat. Keeping agents consistent took structure, not just better prompt wording.",
      },
    ],
    features: [
      "Multiple agents, each with a unique personality",
      "Per-agent persistent memory",
      "Choose a different model for each agent",
      "A clean chat interface for all of them",
    ],
    timeline: [
      { label: "Core", text: "Chat interface and the first agents." },
      { label: "Agents", text: "Personalities, memory, and per-agent models." },
      { label: "Now", text: "Better memory and more customization." },
    ],
    roadmap: ["Agent-to-agent conversations", "Sharing agent presets"],
  },
  {
    slug: "minimal-modeler",
    name: "Minimal Modeler",
    tagline: "A small 3D modeling tool that fits in your head.",
    status: "Prototype",
    featured: false,
    visual: "modeler",
    stack: ["TypeScript", "3D", "Geometry"],
    github: gh("Minimal-Modeler"),
    overview:
      "Minimal Modeler is a small 3D modeling tool written in TypeScript. Professional 3D software is amazing and enormous. This is the opposite: a viewport, a mesh, and a few tools that do exactly what they say.",
    problem:
      "For simple modeling, blockouts, and quick spatial thinking, big 3D suites are overkill. And from the engineering side, mesh editing is a genuinely interesting problem hidden behind those giant interfaces.",
    solution:
      "Build a small editor around the basics done well: a 3D viewport, mesh editing operations, and undo for everything.",
    architecture: [
      { name: "Viewport", detail: "The 3D view with a grid and selection." },
      { name: "Mesh Core", detail: "The mesh data structure and editing operations." },
      { name: "Tools", detail: "Modeling tools with a shared undo stack." },
    ],
    challenges: [
      {
        title: "Mesh editing breaks quietly",
        text: "One wrong connection in the mesh data and things corrupt silently, three operations later. Validating the mesh after every edit turned mystery bugs into instant failures.",
      },
    ],
    features: [
      "3D viewport with selection",
      "Mesh editing operations",
      "Undo and redo on everything",
      "Small enough to fully understand",
    ],
    timeline: [
      { label: "Core", text: "Viewport and the mesh structure." },
      { label: "Now", text: "More editing tools." },
    ],
    roadmap: ["OBJ export", "More mesh operations"],
  },
  {
    slug: "forgeos",
    name: "ForgeOS",
    tagline: "An operating system experiment, started from the bootloader.",
    status: "Experimental",
    featured: false,
    visual: "os",
    stack: ["Assembly", "C", "Low-Level"],
    overview:
      "ForgeOS is my long-running experiment in answering the question under everything else I build: what is actually happening below the runtime? It's an OS started from the bootloader up. It exists to be learned from, not shipped.",
    problem:
      "You can read about how operating systems work forever and still not really know. Page tables, interrupts, and schedulers only become real when your own code triple-faults because you got one bit wrong.",
    solution:
      "Build the layers by hand, slowly, and understand each one before moving on: the boot sequence, then interrupts, then memory, with QEMU and a serial cable as the whole debug setup.",
    architecture: [
      { name: "Bootloader", detail: "The hand-written path from power-on to running kernel code." },
      { name: "Kernel", detail: "Interrupts, exceptions, and the very beginnings of a kernel." },
      { name: "Memory", detail: "Physical memory management and paging experiments." },
      { name: "Drivers", detail: "Keyboard, timer, and a text console." },
    ],
    challenges: [
      {
        title: "Debugging with nothing",
        text: "When the kernel crashes there's no stack trace, just a reboot. Serial port logging and QEMU's tracing are the entire toolbox, and learning to use them well was half the project.",
      },
      {
        title: "Everything depends on everything",
        text: "You can't have a scheduler without memory management, or memory management without interrupts working. OS dev forces you to learn the layers in the right order.",
      },
    ],
    features: [
      "Boots in QEMU from a hand-written boot sequence",
      "Interrupt handling",
      "Early memory management",
      "A text console and keyboard input",
    ],
    timeline: [
      { label: "Boot", text: "Getting from power-on to my own code running." },
      { label: "Kernel", text: "Interrupts and the console." },
      { label: "Now", text: "Memory management, slowly and carefully." },
    ],
    roadmap: ["Proper paging", "A tiny shell", "Maybe multitasking one day"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
