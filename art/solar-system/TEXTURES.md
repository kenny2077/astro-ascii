# Texture attribution

Planet maps by **Solar System Scope / INOVE**, used under **Creative Commons Attribution 4.0 International (CC BY 4.0)**.

- Source and license statement: https://www.solarsystemscope.com/textures/
- License: https://creativecommons.org/licenses/by/4.0/
- Retrieved: 2026-10-11.

The provider describes these maps as based on NASA imagery/elevation data, color-adjusted against spacecraft photographs. Some gaps contain fictional terrain; colors are somewhat enhanced. These are processed composite maps, not raw mission photographs, and do not depict one observation date. The Sun texture is a colored visualization. Neptune uses the familiar enhanced-blue map rather than claiming calibrated true color.

## Files

Download prefix: `https://www.solarsystemscope.com/textures/download/`

| Pack key | Original download |
| --- | --- |
| sun | `2k_sun.jpg` |
| mercury | `2k_mercury.jpg` |
| venus | `2k_venus_atmosphere.jpg` |
| earth | `2k_earth_daymap.jpg` |
| earth_clouds | `2k_earth_clouds.jpg` |
| mars | `2k_mars.jpg` |
| jupiter | `2k_jupiter.jpg` |
| saturn | `2k_saturn.jpg` |
| saturn_ring | `2k_saturn_ring_alpha.png` |
| uranus | `2k_uranus.jpg` |
| neptune | `2k_neptune.jpg` |

`textures.js` packages the unchanged downloaded image bytes as data URLs to support local offline rendering without canvas cross-origin restrictions. To rebuild, save the listed files in a local directory with the `2k_` prefix removed, then run `node scripts/build-solar-textures.mjs <directory>`.

Runtime modifications: downsampling to a 1024-pixel-wide texture buffer, spherical projection, bilinear sampling, lighting that only attenuates source channels, Earth cloud compositing, and Unicode dot rendering. All worlds rotate under a fixed light. Earth clouds have independent longitude motion; gas-giant cloud bands deform locally. Saturn ring geometry stays fixed with mild azimuthal material variation. Selected moon spheres and representative Uranus ring bands are procedural additions. Venus saturation is reduced toward pale cream and Mars saturation toward the Viking reference. No emissive particle layer, specular highlight, or clipped exposure boost is added. Preview images are adaptations of these maps and retain the same attribution requirements.

The MIT code license does not replace this image license. No endorsement by Solar System Scope, INOVE, or NASA is implied.
