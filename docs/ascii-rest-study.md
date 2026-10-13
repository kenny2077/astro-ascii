# Motion study: ascii.rest

Reviewed 2026-10-11: the live [Earthrise](https://ascii.rest/earthrise/) page and the local reference source at revision `1848fa567573e922caa76f95a158b3b7a19043dc`, particularly `earthrise.ts`, `aurora-fjord.ts`, and `planet.ts`.

## What matters

- Earthrise separates precomputed lunar ground from the changing Earth, cloud layer, and stars. The interesting motion has a subject, location, and direction.
- Aurora Fjord moves coherent curtains and rays, then reflects that light in water. It does not randomize every character each frame.
- The scenes use a fixed cell grid and `· • ●` halftone sizes. Palette and contrast make the dots read as a scene at a distance.
- The reference Planet rotates its globe. We deliberately keep our camera and photograph-derived portraits fixed because that is this collection's requested direction.

## Applied here

Updated 2026-10-13 after the user explicitly selected slow natural rotation with stable lighting and separate cloud, ring, and satellite motion. The reference’s sphere projection and independently animated scene materials guide the implementation. The previous changing-light phase sweep is removed.

Each world turns beneath a stable light. Earth uses independent land and cloud coordinates. Satellite spheres have depth and occlusion; they are not luminous particle trails. Saturn’s mapped ring and Uranus’s narrow dark bands have different structures. Mercury and Venus have no invented moons. The distant background drifts slightly to give the surrounding scene continuity. Brightness is derived from texture and stable shading, never a global pulse.

The earlier glow-particle overlay and static-portrait experiments have been replaced. See [current rendering](rendering.md#solar-system) for periods, dimensions, and limitations. The upstream MIT notice and separate CC BY texture attribution remain intact.

## Galaxies

The galaxies follow the same lesson, as procedural scenes in the manner of the reference's `galaxy.ts` and `earthrise.ts`. The still light is shaded once, and only the moving light is added each frame. Each motion has a subject and a direction: stars orbit on a flat rotation curve, Sculptor's starburst wind leaves along the minor axis, and Andromeda's crimson wave runs round its ring the way the disc turns. See [rendering](rendering.md#galaxies).
