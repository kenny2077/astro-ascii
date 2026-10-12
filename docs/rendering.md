# Rendering

## Galaxies

Each galaxy is a model on a 240 × 135 grid of square cells. The disc is tilted and turned on screen by its inclination and position angle. It holds a bulge, an exponential disc, logarithmic spiral arms broken up by noise, and dust. The dust dims blue light more than red, so thin dust reads brown and thick dust dark. Knots of star formation are strung along the arms. Andromeda adds its companions M32 and M110. The disc is shaded once into a map of its own plane. Each frame turns that map and samples it twice a cell, which keeps a steep disc's thin lanes. The bulge, Andromeda's companions and the sky are shaded once on screen and hold still. Each frame then adds the moving light and draws the cells as `· • ●` by brightness, Bayer dithered, in the nearest of 60 palette colours. Only changed cells are redrawn, at 20 fps.

| Galaxy | Its own motion |
| --- | --- |
| Triangulum (M33) | Pink nebulae glitter; light runs along threads of grey Milky Way cirrus |
| Sculptor (NGC 253) | A starburst wind blows out of the core along the minor axis; the core flickers |
| Andromeda (M31) | A crimson wave runs round the ring of nebulae, in the direction of rotation |
| Pinwheel (M101) | Seen face on, the turning reads most clearly; blue clusters flicker |

In all four, the arm pattern turns once every two minutes, as a spiral density wave turns as one. Its knots ride round with it. Stars orbit faster than the pattern, all at one speed along their orbits (a flat rotation curve), so the inner ones lap the outer. Arms trail the rotation. Each spark takes the colour of the disc beneath it, and dust in front still hides it. Foreground stars twinkle, and the bright ones carry four-pointed diffraction spikes. Every motion runs a whole number of times in the two-minute loop, so the loop closes exactly. The speeds are greatly accelerated: a real orbit takes hundreds of millions of years.

Choose a galaxy with `?galaxy=triangulum|sculptor|andromeda|pinwheel`. `&t=6` holds a frame, and `&shot` shows the artwork alone. Reduced motion holds the frame still and skips the reveal that plays when a galaxy is chosen.

## Solar system

The viewer projects licensed Solar System Scope maps onto spheres. Mercury's craters, Earth's continents and cloud layer, Mars's surface markings, and Jupiter's cloud bands come from maps rather than procedural noise. Saturn uses an inclined ring plane sampled from the provider's ring map with geometric front/back occlusion. See [texture provenance](../art/solar-system/TEXTURES.md).

Each body holds a fixed viewing angle. The photograph-derived portrait and its glyph sizes are cached into a canvas plate. A separate dot layer adds body-specific motion without moving the underlying geography or rotating the whole globe. Sun convection and prominence arcs, Mercury's sparse tail, Venus's cloud filaments, Earth's weather and aurora, Mars dust, Jupiter belts and storm, Saturn ring particles, Uranus's tilted arc, and Neptune streaks use deterministic paths and smooth opacity envelopes. See [the motion study](ascii-rest-study.md). These are accelerated artistic effects, not observed weather or physical simulation.

The base dot grid adapts to the displayed canvas size. The selected artwork animates at a target 30 fps by copying its cached plate and drawing the moving dots; the static photo is not resampled each frame. The paths repeat after 16 seconds. Resize rebuilds the plate, including when paused. Choose a body with the navigation or `?body=saturn`; add `&t=0` for a still frame or `&shot&t=0` for artwork-only capture. There is one dot rendering mode. Reduced motion pauses playback, and hidden tabs do not advance animation. Thumbnails remain still. The bundled `textures.js` supports offline file opening; keep it next to `index.html`.

Near-full-phase lighting on the base portrait only attenuates the source color. No specular hotspot or channel-clipping exposure gain is used. The moving dot layer uses restrained colors appropriate to each effect and occupies a small part of the frame. White areas can exist in the source, such as Earth's clouds and Jupiter's pale zones.

Sizes, lighting, and viewing angles are illustrative. These maps are processed composites, not a single-date spacecraft observation. Venus is desaturated toward pale cream. The solar palette and the familiar deep-blue Neptune palette are enhanced, not calibrated natural colors. This is an art collection, not a source for measurements.

## Black hole

The page traces rays through a simplified Schwarzschild model once, then updates disk shading on a 200 × 112 grid. Bayer dithering selects a Unicode dot size and a palette color. The drawing uses a cached glyph atlas and updates changed cells. The target rate is 15 fps, with an 18-second cycle.

The lensing-inspired model is combined with authored light, disk, planet, and color choices. This is not a validated astrophysical simulation. `?t=3` holds a frame at three seconds; `?shot&t=3` also hides the caption.

## Photo study

A local image is sampled into a 240 × 157 grid, fitted without stretching. Pixel rendering fills square cells. Character rendering uses measured glyph coverage and ordered dithering. The default `· • ●` characters are Unicode, not strict ASCII; the alternative uses printable ASCII characters.

Both modes keep source positions fixed and share the same 16-second light modulation. Star peaks are partly retained during downsampling, and a modest exposure lift improves readability. These are artistic choices. Small stars and faint structures can disappear through sampling; brightness modulation is not physical nebular motion.

Controls let you compare the source, pause, and disable or increase motion. Image files are decoded locally, never uploaded. The renderer is an independent implementation referencing ascii.rest's approach, not an installed ascii.rest package.
