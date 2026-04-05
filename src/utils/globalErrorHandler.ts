import { ErrorLogger } from '@/services/errorLogger';

/**
 * Global Error Handler
 * Catches uncaught errors and unhandled promise rejections
 */
export class GlobalErrorHandler {
  private static isInitialized = false;

  /**
   * Initialize global error handlers
   */
  static initialize(): void {
    if (this.isInitialized) {
      return;
    }

    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      ErrorLogger.logCritical(event.error || new Error(event.message), {
        type: 'uncaught-error',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });

      // Prevent default browser error handling in production
      if (!import.meta.env.DEV) {
        event.preventDefault();
      }
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));

      ErrorLogger.logCritical(error, {
        type: 'unhandled-promise-rejection',
        reason: event.reason,
      });

      // Prevent default browser error handling in production
      if (!import.meta.env.DEV) {
        event.preventDefault();
      }
    });

    this.isInitialized = true;
    ErrorLogger.logInfo('Global error handler initialized');
  }

  /**
   * Remove global error handlers
   */
  static cleanup(): void {
    // In most cases, cleanup isn't necessary as the app will reload
    // But this can be useful for testing
    this.isInitialized = false;
  }
}
