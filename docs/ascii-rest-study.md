# Motion study: ascii.rest

Reviewed 2026-10-11: the live [Earthrise](https://ascii.rest/earthrise/) page and the local reference source at revision `1848fa567573e922caa76f95a158b3b7a19043dc`, particularly `earthrise.ts`, `aurora-fjord.ts`, and `planet.ts`.

## What matters

- Earthrise separates precomputed lunar ground from the changing Earth, cloud layer, and stars. The interesting motion has a subject, location, and direction.
- Aurora Fjord moves coherent curtains and rays, then reflects that light in water. It does not randomize every character each frame.
- The scenes use a fixed cell grid and `· • ●` halftone sizes. Palette and contrast make the dots read as a scene at a distance.
- The reference Planet rotates its globe. We deliberately keep our camera and photograph-derived portraits fixed because that is this collection's requested direction.

## Applied here

Updated 2026-10-12 after reviewing NASA planetary photographs. The first attempt added luminous paths on top of a still image and was rejected. That layer has been removed.

Earthrise and Night Coast are the useful references: their clouds are continuous density fields that are sampled at changing material coordinates; the shaded frame is then converted into glyphs. Our solar viewer follows this order. An atmosphere's own texture moves locally, then the result is drawn into the fixed dot grid. The planet's camera and whole-globe longitude remain fixed.

| Body | Image feature and treatment |
| --- | --- |
| Sun | Existing active-region texture deforms locally |
| Mercury | Crater rays and impact terrain hold still |
| Venus | Existing cloud detail shifts subtly |
| Earth | Separate cloud map drifts above unchanged continents |
| Mars | Valles Marineris and the ochre terrain hold still |
| Jupiter | Existing cloud belts undergo opposing local shifts |
| Saturn | Cloud bands shift slightly; rings stay fixed |
| Uranus | Quiet cyan atmosphere holds still |
| Neptune | Existing atmospheric texture shifts locally |

No invented sodium tail, polar light arc, dust stream, prominence particle, or ring glitter is added. Source photographs guide feature selection and framing; the textures still use the separately credited Solar System Scope maps. [Photo references](planet-photo-references.md) record mission, processing and color caveats.

The reference's MIT notice remains in `licenses/bas3line-MIT.txt`. The material-coordinate code is original. The image license is documented in [TEXTURES.md](../art/solar-system/TEXTURES.md).

## Galaxies

The galaxies follow the same lesson, as procedural scenes in the manner of the reference's `galaxy.ts` and `earthrise.ts`. The still light is shaded once, and only the moving light is added each frame. Each motion has a subject and a direction: stars orbit on a flat rotation curve, Sculptor's starburst wind leaves along the minor axis, and Andromeda's crimson wave runs round its ring the way the disc turns. See [rendering](rendering.md#galaxies).
