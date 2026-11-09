// Select by primary input, never viewport width: resizing/zooming a computer
// must not switch it to the separate mobile page. Touch-first phones/tablets
// use the simple page even in landscape; touch laptops can still use desktop.
// Reduced motion changes animations inside the desktop page, not the page itself.
// Keep the server first-paint query in ResponsiveExperience.module.css in sync.
export const DESKTOP_EXPERIENCE_QUERY =
  "(hover: hover) and (pointer: fine)";
