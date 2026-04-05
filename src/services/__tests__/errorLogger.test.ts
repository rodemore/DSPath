import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ErrorLogger } from '../errorLogger';

describe('ErrorLogger', () => {
  beforeEach(() => {
    // Clear error queue before each test
    ErrorLogger.clearErrors();
    // Mock console methods
    vi.spyOn(console, 'group').mockImplementation(() => {});
    vi.spyOn(console, 'groupEnd').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
  });

  it('should log error with context', () => {
    const error = new Error('Test error');
    const context = { type: 'test-error', customField: 'value' };

    ErrorLogger.logError(error, context);

    const errors = ErrorLogger.getErrors();
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe('Test error');
    expect(errors[0].context.type).toBe('test-error');
    expect(errors[0].context.customField).toBe('value');
  });

  it('should log string errors', () => {
    ErrorLogger.logError('String error message');

    const errors = ErrorLogger.getErrors();
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe('String error message');
  });

  it('should set severity levels', () => {
    ErrorLogger.logError('Low severity', {}, 'low');
    ErrorLogger.logError('High severity', {}, 'high');

    const errors = ErrorLogger.getErrors();
    expect(errors[0].severity).toBe('low');
    expect(errors[1].severity).toBe('high');
  });

  it('should log warnings', () => {
    ErrorLogger.logWarning('Warning message', { source: 'test' });

    const errors = ErrorLogger.getErrors();
    expect(errors).toHaveLength(1);
    expect(errors[0].severity).toBe('low');
    expect(errors[0].context.type).toBe('warning');
  });

  it('should log critical errors', () => {
    ErrorLogger.logCritical(new Error('Critical error'));

    const errors = ErrorLogger.getErrors();
    expect(errors).toHaveLength(1);
    expect(errors[0].severity).toBe('critical');
  });

  it('should maintain error queue with max size', () => {
    // Log 60 errors (max is 50)
    for (let i = 0; i < 60; i++) {
      ErrorLogger.logError(`Error ${i}`);
    }

    const errors = ErrorLogger.getErrors();
    expect(errors).toHaveLength(50);
    // Should have removed oldest errors
    expect(errors[0].message).toBe('Error 10');
    expect(errors[49].message).toBe('Error 59');
  });

  it('should clear all errors', () => {
    ErrorLogger.logError('Error 1');
    ErrorLogger.logError('Error 2');
    expect(ErrorLogger.getErrors()).toHaveLength(2);

    ErrorLogger.clearErrors();
    expect(ErrorLogger.getErrors()).toHaveLength(0);
  });

  it('should include timestamp and context metadata', () => {
    ErrorLogger.logError('Test error');

    const errors = ErrorLogger.getErrors();
    expect(errors[0].timestamp).toBeDefined();
    expect(errors[0].context.url).toBeDefined();
    expect(errors[0].context.userAgent).toBeDefined();
    expect(errors[0].context.timestamp).toBeDefined();
  });

  it('should log info in development mode', () => {
    ErrorLogger.logInfo('Info message', { detail: 'test' });

    // In test mode (DEV), should log to console
    expect(console.info).toHaveBeenCalled();
  });
});
