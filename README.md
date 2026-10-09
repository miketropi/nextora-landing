# Nextora landing page

Next.js App Router, TypeScript, React, and Tailwind CSS v4 implementation of the Nextora WordPress/WooCommerce theme landing-page design.

![Nextora landing page preview](https://pub-0645c3b9d3674132af6b362484df0f3c.r2.dev/Nextora/landing/nextora-landing-thumb.webp)

## Run

```sh
npm install
npm run dev
```

Development: http://localhost:3000

```sh
npm run build
npm run start
npm run lint
```

## Implementation

- `app/page.tsx`: server-rendered content and section composition.
- `app/globals.css`: original OKLCH tokens, fluid typography, and composition styling; Tailwind theme and utility layers without a layout-changing reset.
- `components/site-header.tsx`: mobile/tablet menu, Escape dismissal, and anchor focus management.
- `components/gallery.tsx`, `testimonials.tsx`, `walkthroughs.tsx`: React-owned interactive state and keyboard controls.
- `components/notice-button.tsx`: native modal dialogs with backdrop dismissal and focus restoration.
- `components/page-motion.tsx`: GSAP hero, scroll, hover, and FAQ motion with reduced-motion handling and cleanup.
- `components/architecture-story.tsx`: five remotely hosted product demos; only the selected video is mounted, muted playback advances on completion, and visibility/reduced-motion/error states preserve manual controls.
- `components/block-scene.tsx`: module-based Three.js sculpture with resize, visibility, and disposal handling.

Design source: project `36b74e5a-9b07-4c6b-9157-44d74236b0c3`, `nextora-landing.html`. The design handoff was obtained from the agent in `w3`; implementation was divided among foundation, interactions, and motion agents, with lead integration and browser verification.

## Source content limitations

The hero product demonstrations are supplied H.264 MP4 recordings hosted on the Nextora R2 origin. Their adjacent descriptions are limited to filename-supported capabilities. The remaining labelled placeholders do not claim released screenshots, verified testimonial content, or a theme ZIP/download endpoint; release buttons display the supplied release notice.

Fonts follow the design's local system stacks: Iowan Old Style/Charter/Baskerville/Times New Roman for display and Avenir Next/system sans-serif for body. Rendering varies on operating systems without those fonts.

Product performance and accessibility claims in the design copy describe the WordPress theme; they are not independently certified measurements of this Next.js page.

## Verification

Production build and ESLint; actual Chromium desktop/mobile render; responsive overflow checks at 320, 390, 600, 768, 920, 1024, 1280, and 1440px; carousel wrapping and rapid clicks; walkthrough selection; FAQ interaction; dialog focus restoration; menu keyboard dismissal; reduced-motion switching; and WebGL canvas rendering.

Walkthrough rows use decorative SVG play icons. Hover-label cleanup waits until click dispatch finishes so clicks on animated numbers, titles, and subtitles reach React's selection handler. Browser regression coverage exercises each row target, keyboard activation, mobile selection, and the selected walkthrough's release dialog.
