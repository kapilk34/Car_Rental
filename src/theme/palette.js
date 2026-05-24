export const palette = {
  primary: "#2563EB",      // Professional Blue
  secondary: "#111111",    // Deep black
  background: "#0F0F0F",
  surface: "#1C1C1C",
  card: "#242424",
  textPrimary: "#FFFFFF",
  textSecondary: "#B3B3B3",
  accent: "#F4A261",       // Premium gold touch
  border: "#2F2F2F",
};

// Utility function to get colors with opacity
export const withOpacity = (color, opacity) => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Shadow utilities for premium feel
export const shadows = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.3)",
  md: "0 4px 6px rgba(0, 0, 0, 0.4)",
  lg: "0 10px 15px rgba(37, 99, 235, 0.1)",
  xl: "0 20px 25px rgba(0, 0, 0, 0.5)",
  glow: `0 0 20px ${withOpacity(palette.primary, 0.3)}`,
};
