/**
 * Design system tokens
 * Centralizes all design constants (colors, spacing, typography, etc.)
 * Extracted from globals.css for type-safe access in JavaScript/TypeScript
 */

export const THEME_TOKENS = {
  // Color palette - Dark theme
  colors: {
    dark: {
      bgDeep: '#0a0e17',
      bgMain: '#0f1520',
      bgCard: '#151d2e',
      bgCardHover: '#1a2540',
      bgEditor: '#0b1018',
      border: '#1e2d47',
      borderActive: '#2dd4a8',
      accent: '#2dd4a8',
      accentDim: '#1a8a6e',
      accentGlow: 'rgba(45, 212, 168, 0.15)',
      accent2: '#6c5ce7',
      accent2Glow: 'rgba(108, 92, 231, 0.15)',
      text: '#e2e8f0',
      textDim: '#7a8ba7',
      textBright: '#ffffff',
      success: '#2dd4a8',
      error: '#ff6b6b',
      warning: '#feca57',
      outputBg: '#0d1117',
      scrollbar: '#1e2d47',
      scrollbarThumb: '#2a3f5f',
    },
    light: {
      bgDeep: '#f8f8f8',
      bgMain: '#ffffff',
      bgCard: '#ffffff',
      bgCardHover: '#f0f0f0',
      bgEditor: '#fafafa',
      border: '#e0e0e0',
      borderActive: '#1a8a6e',
      accent: '#1a8a6e',
      accentDim: '#15715a',
      accentGlow: 'rgba(26, 138, 110, 0.1)',
      accent2: '#5849c7',
      accent2Glow: 'rgba(88, 73, 199, 0.1)',
      text: '#2c3e50',
      textDim: '#6c757d',
      textBright: '#1a202c',
      success: '#1a8a6e',
      error: '#dc3545',
      warning: '#f39c12',
      outputBg: '#f5f5f5',
      scrollbar: '#e0e0e0',
      scrollbarThumb: '#b0b0b0',
    },
  },

  // Spacing scale (in rem)
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
    '4xl': '6rem', // 96px
  },

  // Typography
  typography: {
    fontFamily: {
      body: '"Outfit", sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.7,
      loose: 2,
    },
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.25rem', // 4px
    md: '0.5rem', // 8px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(45, 212, 168, 0.3)',
  },

  // Transitions
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
  },

  // Z-index layers
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    overlay: 30,
    modal: 40,
    popover: 50,
    tooltip: 60,
  },

  // Breakpoints (for media queries)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Scrollbar
  scrollbar: {
    width: '6px',
    borderRadius: '3px',
  },
} as const;

// Helper function to get CSS variable names
export const getCSSVar = (path: string): string => `var(--${path})`;

// Type exports
export type ThemeMode = 'dark' | 'light';
export type ThemeTokens = typeof THEME_TOKENS;
export type ColorPalette = ThemeTokens['colors']['dark']; // Same structure for both themes
