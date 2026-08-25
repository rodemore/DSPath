/**
 * Environment configuration with validation
 * Centralizes all environment variable access
 */

interface EnvConfig {
  // Environment
  mode: 'development' | 'production' | 'test';
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;

  // API URLs
  smartHelpApiUrl: string;

  // Feature flags from environment
  enableAnalytics: boolean;
  enableSmartHelp: boolean;
}

/**
 * Validates that required environment variables are present
 * @throws Error if required variables are missing
 */
function validateEnv(): void {
  const errors: string[] = [];

  // Check required variables
  if (!import.meta.env.MODE) {
    errors.push('MODE is not defined');
  }

  // Smart Help API URL is optional in development (falls back to localhost)
  // but should be required in production
  if (import.meta.env.MODE === 'production' && !import.meta.env.VITE_SMART_HELP_API_URL) {
    errors.push('VITE_SMART_HELP_API_URL is required in production (add to .env.production)');
  }

  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  }
}

/**
 * Loads and validates environment configuration
 */
function loadEnv(): EnvConfig {
  validateEnv();

  const mode = import.meta.env.MODE as EnvConfig['mode'];

  return {
    // Environment
    mode,
    isDevelopment: mode === 'development',
    isProduction: mode === 'production',
    isTest: mode === 'test',

    // API URLs with sensible defaults
    smartHelpApiUrl: import.meta.env.VITE_SMART_HELP_API_URL || 'http://localhost:3001',

    // Feature flags (defaults to false if not set)
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableSmartHelp: import.meta.env.VITE_ENABLE_SMART_HELP !== 'false', // Enabled by default
  };
}

// Export singleton instance
export const ENV = loadEnv();

// Log configuration in development
if (ENV.isDevelopment) {
  console.log('🔧 Environment Configuration:', {
    mode: ENV.mode,
    smartHelpApiUrl: ENV.smartHelpApiUrl,
    enableSmartHelp: ENV.enableSmartHelp,
    enableAnalytics: ENV.enableAnalytics,
  });
}
