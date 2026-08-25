/**
 * Error Logger Service
 * Logs errors to console in development and can be extended to send to monitoring service
 */

interface ErrorContext {
  componentStack?: string;
  type?: string;
  url?: string;
  userAgent?: string;
  timestamp?: string;
  [key: string]: unknown;
}

interface ErrorLog {
  message: string;
  stack?: string;
  context: ErrorContext;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

class ErrorLoggerService {
  private isDevelopment = import.meta.env.DEV;
  private errorQueue: ErrorLog[] = [];
  private maxQueueSize = 50;

  /**
   * Log an error with context
   */
  logError(
    error: Error | string,
    context: ErrorContext = {},
    severity: ErrorLog['severity'] = 'medium'
  ): void {
    const errorMessage = typeof error === 'string' ? error : error.message;
    const errorStack = typeof error === 'string' ? undefined : error.stack;

    const errorLog: ErrorLog = {
      message: errorMessage,
      stack: errorStack,
      context: {
        ...context,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
      severity,
    };

    // Add to queue
    this.errorQueue.push(errorLog);
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift(); // Remove oldest error
    }

    // Log to console in development
    if (this.isDevelopment) {
      this.logToConsole(errorLog);
    }

    // In production, you could send to a monitoring service like Sentry
    // this.sendToMonitoringService(errorLog);
  }

  /**
   * Log warning (non-critical error)
   */
  logWarning(message: string, context: ErrorContext = {}): void {
    this.logError(message, { ...context, type: 'warning' }, 'low');
  }

  /**
   * Log info message
   */
  logInfo(message: string, context: ErrorContext = {}): void {
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, context);
    }
  }

  /**
   * Log critical error
   */
  logCritical(error: Error | string, context: ErrorContext = {}): void {
    this.logError(error, context, 'critical');
  }

  /**
   * Get all logged errors
   */
  getErrors(): ErrorLog[] {
    return [...this.errorQueue];
  }

  /**
   * Clear error queue
   */
  clearErrors(): void {
    this.errorQueue = [];
  }

  /**
   * Log to console with formatting
   */
  private logToConsole(errorLog: ErrorLog): void {
    const emoji = this.getSeverityEmoji(errorLog.severity);
    const style = this.getSeverityStyle(errorLog.severity);

    console.group(`${emoji} Error Log [${errorLog.severity.toUpperCase()}]`);
    console.log('%c' + errorLog.message, style);

    if (errorLog.stack) {
      console.log('Stack:', errorLog.stack);
    }

    if (Object.keys(errorLog.context).length > 0) {
      console.log('Context:', errorLog.context);
    }

    console.log('Timestamp:', errorLog.timestamp);
    console.groupEnd();
  }

  /**
   * Get emoji for severity level
   */
  private getSeverityEmoji(severity: ErrorLog['severity']): string {
    const emojiMap = {
      low: '⚠️',
      medium: '❗',
      high: '🔴',
      critical: '🚨',
    };
    return emojiMap[severity];
  }

  /**
   * Get console style for severity level
   */
  private getSeverityStyle(severity: ErrorLog['severity']): string {
    const styleMap = {
      low: 'color: #ffa500; font-weight: bold;',
      medium: 'color: #ff6b6b; font-weight: bold;',
      high: 'color: #ff0000; font-weight: bold;',
      critical: 'color: #ff0000; font-weight: bold; font-size: 16px;',
    };
    return styleMap[severity];
  }

  /**
   * Send to monitoring service (placeholder for future implementation)
   */
  // private sendToMonitoringService(errorLog: ErrorLog): void {
  //   // Example: Send to Sentry, LogRocket, or custom backend
  //   // fetch('/api/errors', {
  //   //   method: 'POST',
  //   //   headers: { 'Content-Type': 'application/json' },
  //   //   body: JSON.stringify(errorLog),
  //   // });
  // }
}

// Export singleton instance
export const ErrorLogger = new ErrorLoggerService();
