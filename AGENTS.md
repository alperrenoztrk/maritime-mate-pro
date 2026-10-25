# Architecture rules

- RouteMotionFrame owns route push/pop motion; keep layout, stacking and opaque page surfaces outside animated variants so transitions only animate transform and opacity.
- Home instruments keep calibrated photos and live overlays in a fixed-aspect visual region, separate from headers and readouts, so readable text never obscures the instrument scale.