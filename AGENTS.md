# Architecture rules

- RouteMotionFrame owns route push/pop motion; keep layout, stacking and opaque page surfaces outside animated variants so transitions only animate transform and opacity.