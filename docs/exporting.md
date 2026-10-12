# Export a GIF

The exporter supports the black-hole page's `// <piece>` block and the galaxies page's `// <galaxy-engine>` block. It does not support the photo-study or solar-system pages.

Requirements: Node.js 22+, Chrome/Chromium, and FFmpeg. On macOS the script defaults to Google Chrome's application path. On other systems set `CHROME` to the browser executable.

From the repository root:

```sh
node scripts/export-gif.mjs art/black-hole/index.html output.gif 6 15
```

For one galaxy, name it in `PIECE`:

```sh
PIECE=andromeda node scripts/export-gif.mjs art/galaxies/index.html andromeda.gif 4 10
```

A galaxy's loop is two minutes long, so its GIF holds 1,200 frames at 10 fps and runs to several megabytes.

Arguments are input page, output GIF, pixels per cell, and frame rate. The exporter evaluates the input page's piece block as code: only use trusted local artwork files. Export replaces the named output file.

The GIF in the README is the existing preview imported with the artwork. A fresh export requires a working browser and FFmpeg installation and is not part of CI.
