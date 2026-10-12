# Motion study: ascii.rest

Reviewed 2026-10-11: the live [Earthrise](https://ascii.rest/earthrise/) page and the local reference source at revision `1848fa567573e922caa76f95a158b3b7a19043dc`, particularly `earthrise.ts`, `aurora-fjord.ts`, and `planet.ts`.

## What matters

- Earthrise separates precomputed lunar ground from the changing Earth, cloud layer, and stars. The interesting motion has a subject, location, and direction.
- Aurora Fjord moves coherent curtains and rays, then reflects that light in water. It does not randomize every character each frame.
- The scenes use a fixed cell grid and `· • ●` halftone sizes. Palette and contrast make the dots read as a scene at a distance.
- The reference Planet rotates its globe. We deliberately keep our camera and photograph-derived portraits fixed because that is this collection's requested direction.

## Applied here

The solar viewer now caches each photographic dot portrait as a canvas plate. An independent, deterministic dot layer provides visible, body-specific motion, rather than re-rendering the whole texture or applying the same nearly invisible brightness pulse to everything.

| Body | Authored moving layer |
| --- | --- |
| Sun | Small convection paths and three prominence arcs |
| Mercury | Sparse sodium-tail interpretation outside the still surface |
| Venus | Broad, slow cloud filaments |
| Earth | Cloud filaments and a polar aurora |
| Mars | A low ochre dust stream |
| Jupiter | Alternating cloud-belt directions and a local storm swirl |
| Saturn | Particles moving around the ring plane with globe occlusion |
| Uranus | A restrained tilted atmospheric arc |
| Neptune | Fast, thin cloud streaks |

All are illustrative, accelerated visual effects, not measurements or live observations. The details should be visible within a few seconds. There is no random frame noise, whole-globe rotation, or common scanning highlight. Pause, reduced motion, and hidden-tab behavior remain supported. Only the selected artwork animates; thumbnail portraits remain still.

The reference's MIT notice remains in `licenses/bas3line-MIT.txt`. The new particle paths are original code; the separate texture license is documented in [TEXTURES.md](../art/solar-system/TEXTURES.md).

## Galaxies

The galaxies follow the same lesson, as procedural scenes in the manner of the reference's `galaxy.ts` and `earthrise.ts`. The still light is shaded once, and only the moving light is added each frame. Each motion has a subject and a direction: stars orbit on a flat rotation curve, Sculptor's starburst wind leaves along the minor axis, and Andromeda's crimson wave runs round its ring the way the disc turns. See [rendering](rendering.md#galaxies).
