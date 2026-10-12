# Rendering

## Solar system

The viewer projects licensed Solar System Scope maps onto spheres. Mercury's craters, Earth's continents and cloud layer, Mars's surface markings, and Jupiter's cloud bands come from maps rather than procedural noise. Saturn uses an inclined ring plane sampled from the provider's ring map with geometric front/back occlusion. See [texture provenance](../art/solar-system/TEXTURES.md).

Each body holds a fixed viewing angle. The mapped portrait and glyph sizes are cached, so coastlines, clouds, rings, and the dots themselves never move during playback. Two broad, fixed light regions dim and recover smoothly on a 16-second cycle. The maximum attenuation is bounded by 7.5% for planets and 11% for the Sun; there is no added glare, random noise, or moving scan line. This is an artistic lighting treatment, not physical weather or rotation.

The dot grid adapts to the displayed canvas size at a target 12 fps. Glyphs land on whole device-pixel cells so mobile thumbnails are not fractional reductions of a dense desktop grid. Resize rebuilds the layout, including when paused. Choose a body with the navigation or `?body=saturn`; add `&t=0` for a still frame or `&shot&t=0` for artwork-only capture. There is one rendering mode, using `· • ●`. Reduced motion pauses playback, and hidden tabs do not advance animation. The bundled `textures.js` pack supports offline file opening; keep it next to `index.html`.

Near-full-phase lighting multiplies the source color by a factor at or below one. No specular component, additive white light, or channel-clipping exposure gain is used. Glyph ink retains the sampled RGB; glyph coverage supplies the dot texture. White areas can still exist in the source, such as Earth's clouds and Jupiter's pale zones.

Sizes, lighting, and viewing angles are illustrative. These maps are processed composites, not a single-date spacecraft observation. Venus is desaturated toward pale cream. The solar palette and the familiar deep-blue Neptune palette are enhanced, not calibrated natural colors. This is an art collection, not a source for measurements.

## Black hole

The page traces rays through a simplified Schwarzschild model once, then updates disk shading on a 200 × 112 grid. Bayer dithering selects a Unicode dot size and a palette color. The drawing uses a cached glyph atlas and updates changed cells. The target rate is 15 fps, with an 18-second cycle.

The lensing-inspired model is combined with authored light, disk, planet, and color choices. This is not a validated astrophysical simulation. `?t=3` holds a frame at three seconds; `?shot&t=3` also hides the caption.

## Photo study

A local image is sampled into a 240 × 157 grid, fitted without stretching. Pixel rendering fills square cells. Character rendering uses measured glyph coverage and ordered dithering. The default `· • ●` characters are Unicode, not strict ASCII; the alternative uses printable ASCII characters.

Both modes keep source positions fixed and share the same 16-second light modulation. Star peaks are partly retained during downsampling, and a modest exposure lift improves readability. These are artistic choices. Small stars and faint structures can disappear through sampling; brightness modulation is not physical nebular motion.

Controls let you compare the source, pause, and disable or increase motion. Image files are decoded locally, never uploaded. The renderer is an independent implementation referencing ascii.rest's approach, not an installed ascii.rest package.
