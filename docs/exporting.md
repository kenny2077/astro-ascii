# Export a GIF

The existing exporter supports the black-hole page's `// <piece>` contract. It does not support the photo-study page.

Requirements: Node.js 22+, Chrome/Chromium, and FFmpeg. On macOS the script defaults to Google Chrome's application path. On other systems set `CHROME` to the browser executable.

From the repository root:

```sh
node scripts/export-gif.mjs art/black-hole/index.html output.gif 6 15
```

Arguments are input page, output GIF, pixels per cell, and frame rate. The exporter evaluates the input page's piece block as code: only use trusted local artwork files. Export replaces the named output file.

The GIF in the README is the existing preview imported with the artwork. A fresh export requires a working browser and FFmpeg installation and is not part of CI.
