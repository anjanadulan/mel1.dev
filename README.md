# mel1.dev — Melisha Devaraj's Premium Portfolio

A state-of-the-art, interactive, single-page portfolio built for **Melisha Devaraj**, a Software Engineering student at NIBM. The website balances dark mode cyberpunk aesthetics, dynamic hardware-accelerated animations, and responsive design systems.

---

## 🚀 Live Demo & Preview

To run the local development server or build the project:
* **Local Server**: `npm run dev`
* **Production Build**: `npm run build`
* **Production Preview**: `npm run preview`

---

## ✨ Key Features

### 🌌 Immersive Background Architecture
* **Fixed Mesh Grid**: A retro-futuristic grid mesh (`.bg-grid`) and slow-sweeping vertical scanlines (`.bg-scanlines`) providing structural depth.
* **Ambient Floating Orbs**: Multi-layered glowing parallax background orbs (`.orb-1`, `.orb-2`, `.orb-3`) that drift and breathe using CSS keyframes, offset by scroll inertia.
* **Striped Matrix Overlay (`.bg-mshr-overlay`)**: A glowing diagonal stripe mesh animated using global `@property` registrations and a high-precision `repeating-linear-gradient` mask.
* **Active Tech Scroll-Blend**: A 10-layer radial gradient animation (`.bg-tech-active-effect`) that fades in smoothly as the user scrolls past the Hero section, creating an evolving color spectrum.

### ⚡ Interactive Micro-animations & Physics
* **Custom Cursor System**: A spring-loaded cursor ring (`.cursor-ring`) and cursor dot (`.cursor-dot`) with physical mouse inertia. Hovering interactive elements triggers dynamic expansion and colors morphing from electric cyan to deep lavender.
* **Button Canvas Spotlight**: An HTML5 `<canvas>` rendering loop built into interactive buttons (`.btn-canvas-interactive`) that projects a cursor-aligned radial lighting highlight on hover.
* **Infinite Project Carousel**: A custom-engineered slider track featuring:
  * Spring-like scroll alignment that centers active slides.
  * Faded, scaled-down, and blurred side slides utilizing a transparent `mask-image` linear gradient.
  * An automated loop timer that pauses during manual click navigation to prevent race-condition transitions.

### 🎴 Solid Section Cards with Animated Borders
* **Strict Glass-Free Cards**: The main feature sections (**Projects**, **About**, **Education**, **Contact**) utilize 100% solid, non-transparent `#0a0a0c` cards.
* **Layered Animated Borders**: Built using double-layered pseudo-elements:
  * `::before`: Renders the solid `#0a0a0c` card background to shield content from transparency.
  * `::after`: Positioned at `inset: -2px` with `z-index: -2` to run an animated color-shifting gradient border (`ani-section-card-border`) peaking out with a soft edge blur.

### 🖼️ Interactive Details Modal
* **Spring-Loaded Popups**: Clicking any project slide displays a detailed layout modal overlay (`#project-modal`) populated with metadata dataset attributes.
* **Smart Visibility**: Live Demo buttons automatically hide if no URL is provided in the slide data structure.
* **Esc-Key & Click-Outside Closures**: Built-in keyboard and overlay listeners manage state cleanup and scroll-locks.

---

## 🛠️ Tech Stack & Tooling

* **Core**: Semantic HTML5 & Modern CSS3.
* **Scripting**: Vanilla JavaScript (ES6+) for cursor physics, observer loops, and carousel math.
* **Build System**: [Vite](https://vite.dev/) (v5.2+) dev server and CJS-deprecated API compatibility checks.
* **Fonts**: `Space Grotesk` (for headings) & `Plus Jakarta Sans` (for readable, clean body content).

---

## 📁 Repository Structure

```bash
mel1.dev/
├── dist/                      # Compiled production-ready static assets
│   ├── assets/                # Minified CSS and bundled chunks
│   └── script.js              # Production copy of the interaction script
├── node_modules/              # Developer dependencies (Vite)
├── index.html                 # Main HTML5 semantic page markup
├── style.css                  # Custom variables, design tokens & animation cycles
├── script.js                  # Custom cursor, observer, and slider interactions
├── vite.config.js             # Vite configuration with build assets copying hooks
├── package.json               # Local scripts and dependencies manifest
└── .gitignore                 # Excludes caches, agent folders, and dependency files
```

---

## ⚙️ Local Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/anjanadulan/mel1.dev.git
   cd mel1.dev
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Launch Local Server**:
   ```bash
   npm run dev
   ```

4. **Verify Local View**:
   Open the browser to the local address outputted by the terminal (typically `http://localhost:5173/`).

---

## ♿ Accessibility (A11y) & Optimization

* **WCAG AA Contrast**: Text colors have been optimized (opacities set at `52%` for muted paragraphs and captions) to satisfy the standard 4.5:1 text-contrast ratios against `#0a0a0c`.
* **Touch Targets**: Minimized layout shifting on mobile by scaling down targets and sizing interactive elements to a minimum of `44px x 44px` for touch inputs.
* **Reduced Motion Support**: An active `@media (prefers-reduced-motion: reduce)` block immediately silences all background gradient movements, scanline translations, rotating floats, and viewport reveal transitions.
* **Smooth Rendering**: Passive scroll and resize event listeners (`{ passive: true }`) reduce main thread blocks to guarantee a smooth 60fps frame rate during scroll reveals.