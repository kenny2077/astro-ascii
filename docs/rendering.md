# Rendering

## Solar system

One self-contained page renders the Sun and eight planets on shaded spheres using procedural surface functions. Mercury uses overlapping crater profiles; Venus uses subdued cloud bands; Earth uses coarse hand-authored continent polygons, ice, and clouds; Mars uses rust-colored terrain; Jupiter uses latitude bands and an oval storm. Saturn adds an inclined ring plane with front/back occlusion and a dark division. Uranus and Neptune use restrained cyan and blue-green atmospheres. The Sun is self-lit, with warm granulation, authored dark spots, and a faint corona.

The display uses a 200 × 150 character grid at a target 12 fps. All texture phases repeat after 24 seconds. Choose a body with the navigation or `?body=saturn`; add `&t=0` for a fixed frame or `&shot&t=0` for artwork-only capture. The default glyphs are Unicode dots; the alternate uses printable ASCII. Reduced motion pauses playback, and hidden tabs do not advance animation.

Sizes, spin periods, lighting, and tilts are illustrative. Earth coastlines and the cloud patterns are approximations. Glyph ink is brightened to compensate for the unpainted space between characters. This is a procedural art collection, not a simulation or a source for measurements.

## Black hole

The page traces rays through a simplified Schwarzschild model once, then updates disk shading on a 200 × 112 grid. Bayer dithering selects a Unicode dot size and a palette color. The drawing uses a cached glyph atlas and updates changed cells. The target rate is 15 fps, with an 18-second cycle.

The lensing-inspired model is combined with authored light, disk, planet, and color choices. This is not a validated astrophysical simulation. `?t=3` holds a frame at three seconds; `?shot&t=3` also hides the caption.

## Photo study

A local image is sampled into a 240 × 157 grid, fitted without stretching. Pixel rendering fills square cells. Character rendering uses measured glyph coverage and ordered dithering. The default `· • ●` characters are Unicode, not strict ASCII; the alternative uses printable ASCII characters.

Both modes keep source positions fixed and share the same 16-second light modulation. Star peaks are partly retained during downsampling, and a modest exposure lift improves readability. These are artistic choices. Small stars and faint structures can disappear through sampling; brightness modulation is not physical nebular motion.

Controls let you compare the source, pause, and disable or increase motion. Image files are decoded locally, never uploaded. The renderer is an independent implementation referencing ascii.rest's approach, not an installed ascii.rest package.
