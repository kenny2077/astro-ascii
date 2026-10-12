<div align="center">

# Astro ASCII

**A small universe, drawn in characters.**

Animated black holes and photo-based astronomy studies. Open a page, watch the light move, and inspect how it is made.

[![CI](https://github.com/kenny2077/astro-ascii/actions/workflows/ci.yml/badge.svg)](https://github.com/kenny2077/astro-ascii/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/code-MIT-blue.svg)](LICENSE)

[Live preview](https://kenny2077.github.io/astro-ascii/) · [Collection](#collection) · [Quick start](#quick-start) · [How it works](docs/rendering.md) · [Contributing](CONTRIBUTING.md) · [Credits](docs/credits.md)

![An amber accretion disk bending around a dark black hole, rendered in animated dots](assets/black-hole.gif)

</div>

## Collection

| Work | Medium | What moves | Open locally |
| --- | --- | --- | --- |
| **Solar system** | Nine fixed-angle portraits: Sun + eight planets | Body-specific cloud, dust, plasma, aurora, and ring dots | [Live solar system](https://kenny2077.github.io/astro-ascii/?piece=solar) |
| **Black hole** | Procedural Unicode dot art | Accretion-disk texture and starlight | [Artwork](art/black-hole/index.html) |
| **Astro photo study** | Photo-derived dot art, strict ASCII, or pixel rendering | Small brightness changes at fixed source positions | [Photo renderer](art/photo-study/index.html) |

Open the [preview website](https://kenny2077.github.io/astro-ascii/) to play the collection without downloading. GitHub repository file views only show the source and static/GIF previews. The website publishes from `main` using GitHub Pages.

![The Sun and eight planets rendered as colored character art, each framed individually](assets/solar-system.png)

The solar-system viewer includes all nine bodies, shareable body links, and pause/play. It uses one rendering style: small and large Unicode dots. Each photographic portrait stays fixed while a separate dot layer moves along authored paths: solar prominences, cloud streams, dust, aurora, or rings. These accelerated effects are artistic interpretations, not live observations. There is no whole-globe rotation, scan line, or random frame noise. Keep `textures.js` beside the HTML when copying this viewer. See [the ascii.rest motion study](docs/ascii-rest-study.md).

The collection is at an early stage. These are artistic interpretations, not scientific simulations or a published SDK. The default scenes style uses Unicode `· • ●`; the photo study also offers printable ASCII characters.

## Quick start

1. Visit the [website](https://kenny2077.github.io/astro-ascii/), or download **Code → Download ZIP** / clone for offline use.
2. Open `art/black-hole/index.html` in a modern browser. No installation or build is needed.
3. Open `art/photo-study/index.html` and choose a local astronomy photograph to compare ASCII and pixel treatments. The image stays in your browser.

The photo study includes pause/play, motion intensity, character selection, side-by-side comparison, and an original-image view. Both artworks respect reduced-motion preferences on initial load.

## Design principles

- **Recognizable subjects.** Preserve silhouette, negative space, and the source image's color relationships.
- **Quiet motion.** Prefer small, periodic light changes to arbitrary distortion.
- **Inspect the work.** Keep rendering code readable; the solar-system viewer includes a separate local texture pack.
- **Credit the source.** Record photograph rights separately from the software license.

The dot-halftone approach is inspired by [bas3line/ascii](https://github.com/bas3line/ascii). Its MIT notice is retained in [licenses](licenses/bas3line-MIT.txt).

## Development

Use Node.js 22 or newer. There are no runtime npm dependencies.

```sh
npm test
```

Checks cover inline JavaScript syntax, local Markdown links, accidentally embedded images/private paths, and black-hole frame dimensions, color bounds, motion, and loop closure. CI runs the same command. Browser visual review remains a separate check.

For GIF export, see [the export guide](docs/exporting.md). For new works, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Roadmap

- Add independently sourced nebula and galaxy works with documented image permissions.
- Expand browser checks for photo import, pause, resize, and reduced motion.
- Add more downloadable previews after visual review.

## License and image rights

Project code is MIT licensed. Third-party code retains its original notices. Solar-system maps and adapted previews use Solar System Scope / INOVE assets under **CC BY 4.0**; see [texture attribution](art/solar-system/TEXTURES.md). Source photographs are not automatically covered by the code license. The public repository does **not** include *The Quiet Predator*, its derived previews, or the local Walensee study because redistribution permission has not been established. You can use a local copy with the photo renderer. See [credits and provenance](docs/credits.md).
