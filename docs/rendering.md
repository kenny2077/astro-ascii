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

The camera and illumination are fixed while the worlds rotate slowly under them. Texture sampling is bilinear; Earth’s land and cloud maps move at different rates. Venus and Uranus use retrograde rotation signs. Lighting depends only on the surface normal and a fixed light direction, with a readable ambient floor. It never pulses with time.

Selected natural satellites orbit independently: Earth’s Moon; Mars’s Phobos and Deimos; Io, Europa, Ganymede and Callisto at Jupiter; Titan at Saturn; Titania at Uranus; and retrograde Triton at Neptune. Mercury and Venus have no moons. Satellite sizes and orbital distances are compressed for visibility; their spheres are simple shaded visual approximations, not photographic maps. Depth checks hide satellites behind the globe and place foreground transits over it.

Saturn has a texture-mapped ring with restrained azimuthal structure. Uranus has a tipped plane with three representative narrow dark bands, not a complete census of its rings. The distant star field makes a small camera-like drift without changing the illumination of the planet. It is a compositional background, not a measured sky chart.

The complete display loop is 180 seconds. Display rotation periods are Sun 90 s, Mercury 180 s, Venus 180 s retrograde, Earth 60 s, Mars 90 s, Jupiter 45 s, Saturn 60 s, Uranus 90 s retrograde, Neptune 60 s. These periods demonstrate motion and are not physically scaled. Earth clouds complete an additional turn over the full loop. The glyphs remain on a fixed device-pixel grid; material brightness selects dot size each frame. Target rate is 15 fps. The main artwork uses a 3 CSS-pixel dot pitch and full 2K source textures. Per-system framing enlarges each globe while preserving full-orbit room for its moons and rings; the desktop canvas can occupy 78% of viewport height.

Use `?body=earth` to select a body, `&t=0` to freeze it, or `&shot` for an artwork-only view. Pause, reduced motion and offscreen suspension are supported. The texture pack remains offline-capable; see [attribution](../art/solar-system/TEXTURES.md) and [references](planet-photo-references.md).

## Black hole

The page traces rays through a simplified Schwarzschild model once, then updates disk shading on a 200 × 112 grid. Bayer dithering selects a Unicode dot size and a palette color. The drawing uses a cached glyph atlas and updates changed cells. The target rate is 15 fps, with an 18-second cycle.

The lensing-inspired model is combined with authored light, disk, planet, and color choices. This is not a validated astrophysical simulation. `?t=3` holds a frame at three seconds; `?shot&t=3` also hides the caption.

## Photo study

A local image is sampled into a 240 × 157 grid, fitted without stretching. Pixel rendering fills square cells. Character rendering uses measured glyph coverage and ordered dithering. The default `· • ●` characters are Unicode, not strict ASCII; the alternative uses printable ASCII characters.

Both modes keep source positions fixed and share the same 16-second light modulation. Star peaks are partly retained during downsampling, and a modest exposure lift improves readability. These are artistic choices. Small stars and faint structures can disappear through sampling; brightness modulation is not physical nebular motion.

Controls let you compare the source, pause, and disable or increase motion. Image files are decoded locally, never uploaded. The renderer is an independent implementation referencing ascii.rest's approach, not an installed ascii.rest package.
