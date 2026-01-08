// After routed SmoothScoll & ScrollTrigger disabled fix
FadeDownUp wraps the smoother

GSAP ScrollSmoother must control the scroll container directly
If FadeDownUp animates layout / opacity / transform, it can:

Break scroll calculations

Cause jitter

Offset ScrollTrigger markers

Cause route-change glitches