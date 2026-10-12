# Planetary photographic references

Reviewed 2026-10-12 against the actual NASA images, not only their captions. These photographs guide feature selection, hue, shading, and framing. The viewer still samples licensed Solar System Scope maps; it does not claim to reproduce the exact NASA exposure or observation date. Each body links to its reference page in the viewer.

| Body | Reference | Feature retained | Processing / motion limit |
| --- | --- | --- | --- |
| Sun | [NASA Sunspots](https://science.nasa.gov/sun/sunspots/) | Active-region texture and local surface structure | The displayed warm map is enhanced color; local deformation is illustrative, not a measured solar time series |
| Mercury | [MESSENGER: Mercury in Color](https://science.nasa.gov/image-detail/amf-pia11406/) | Gray craters and bright ejecta rays | The left reference image approximates true color; the right is enhanced color. Our rocky surface holds still |
| Venus | [Mariner 10, PIA23791](https://science.nasa.gov/photojournal/venus-from-mariner-10/) | Continuous cloud cover and faint curved cloud markings | Orange/UV-filter composite with a synthesized green channel, not calibrated natural color. Motion stays inside the cloud texture |
| Earth | [Blue Marble 2002](https://science.nasa.gov/resource/blue-marble-2002/) | Recognizable continents, deep oceans, cloud systems | A satellite-data composite. The independent cloud map moves; land and viewing angle stay fixed |
| Mars | [Viking: Valles Marineris Hemisphere, PIA00003](https://science.nasa.gov/photojournal/valles-marineris-hemisphere/) | Valles Marineris, dark terrain, ochre plains | A 102-frame mosaic with enhanced color and normalized brightness. The displayed longitude now places the canyon system in view; terrain holds still |
| Jupiter | [Cassini Jupiter Portrait, PIA04866](https://science.nasa.gov/photojournal/cassini-jupiter-portrait/) | Great Red Spot, folded cloud belts, small eddies | True-color mosaic from 2000-12-29. Local cloud shifts are accelerated, bounded interpretations; no bright tracers are added |
| Saturn | [NASA Saturn imagery](https://science.nasa.gov/saturn/) | Broad icy rings, ring divisions, muted gold globe | Cassini's farewell image is used for ring and shading comparison. Rings hold still; only small cloud-band changes animate |
| Uranus | [Voyager 2: Final Image, PIA00143](https://science.nasa.gov/resource/uranus-final-image/) | Pale blue-green hue and a quiet haze-covered disk | The reference is a crescent view; it guides color and haze, not our full-disk geometry. No invented visible aurora or weather is added |
| Neptune | [Voyager 2: Clouds on the Dark Spot, PIA02222](https://science.nasa.gov/photojournal/neptune-clouds-on-the-dark-spot/) | Existing high-altitude cloud texture | A methane-wavelength image is useful for cloud morphology, not color calibration. Our familiar blue map remains an enhanced-color treatment |

NASA image credits remain on the linked pages: NASA/JPL, NASA/JPL-Caltech, NASA/JPL/USGS, NASA/JPL/Space Science Institute, or NASA Earth Observatory as listed. Local research copies are outside the public repository. These credits do not replace the [CC BY 4.0 texture attribution](../art/solar-system/TEXTURES.md).

## Relation to ascii.rest

The relevant technique is its scenes' material-first rendering: continuous cloud or water fields change, and the resulting light is converted into a restrained halftone. Our dot grid and source geography stay fixed. Only supported material regions undergo small, continuous coordinate deformations. Source ink is never turned into an unrelated particle or emissive highlight. See [the source study](ascii-rest-study.md).

This deliberately allows a still portrait when visible-light imagery does not justify animated weather. All material cycles are artistic loops, not physical forecasts or motion measurements.
