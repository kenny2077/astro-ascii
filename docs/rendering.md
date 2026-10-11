# Rendering

## Black hole

The page traces rays through a simplified Schwarzschild model once, then updates disk shading on a 200 × 112 grid. Bayer dithering selects a Unicode dot size and a palette color. The drawing uses a cached glyph atlas and updates changed cells. The target rate is 15 fps, with an 18-second cycle.

The lensing-inspired model is combined with authored light, disk, planet, and color choices. This is not a validated astrophysical simulation. `?t=3` holds a frame at three seconds; `?shot&t=3` also hides the caption.

## Photo study

A local image is sampled into a 240 × 157 grid, fitted without stretching. Pixel rendering fills square cells. Character rendering uses measured glyph coverage and ordered dithering. The default `· • ●` characters are Unicode, not strict ASCII; the alternative uses printable ASCII characters.

Both modes keep source positions fixed and share the same 16-second light modulation. Star peaks are partly retained during downsampling, and a modest exposure lift improves readability. These are artistic choices. Small stars and faint structures can disappear through sampling; brightness modulation is not physical nebular motion.

Controls let you compare the source, pause, and disable or increase motion. Image files are decoded locally, never uploaded. The renderer is an independent implementation referencing ascii.rest's approach, not an installed ascii.rest package.
