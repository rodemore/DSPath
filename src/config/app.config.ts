/**
 * Application-wide configuration constants
 * Single source of truth for all app settings
 */

export const APP_CONFIG = {
  // App metadata
  name: 'DSPath',
  version: '0.0.0',
  description: 'Interactive Python Learning Platform',

  // Python/Pyodide configuration
  pyodide: {
    version: '0.29.3',
    packages: ['pandas', 'numpy'],
  },

  // Smart Help feature
  smartHelp: {
    failedAttemptsThreshold: 2, // Show help after N failed attempts
    requestsPerHour: 10, // Rate limit
    requestTimeout: 30000, // 30 seconds
  },

  // Storage configuration
  storage: {
    cacheName: 'dspath-user-progress-v1',
    keys: {
      theme: 'pylab-theme',
      completedExercises: 'completedExercises',
      exerciseCode: 'exerciseCode',
      attempts: 'dspath_exercise_attempts',
    },
  },

  // UI configuration
  ui: {
    scrollBehavior: 'smooth' as const,
    animationDuration: 300, // milliseconds
    toastDuration: 3000, // milliseconds
  },

  // Route paths
  routes: {
    home: '/',
    guides: '/guides',
    colabGuide: '/guides/colab',
    copilotGuide: '/guides/copilot',
    geniaGuide: '/guides/genia',
  },

  // Feature flags (for future use)
  features: {
    smartHelp: true,
    darkMode: true,
    analytics: false, // To be implemented in Phase 6
    i18n: true, // Enabled in Phase 2 ✅
  },
} as const;

// Type-safe config access
export type AppConfig = typeof APP_CONFIG;
