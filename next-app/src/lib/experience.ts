// Select only by viewport width: large screens use desktop even when touch
// is available or emulated. Smaller screens use the separate mobile page.
// Reduced motion changes animations inside the desktop page, not the page itself.
// Keep the server first-paint query in ResponsiveExperience.module.css in sync.
export const DESKTOP_EXPERIENCE_QUERY =
  "(min-width: 1024px)";
