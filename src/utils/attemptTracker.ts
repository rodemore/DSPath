/**
 * Tracks failed attempts per exercise to determine when to show smart help
 */

import { APP_CONFIG } from '@/config';

const STORAGE_KEY = APP_CONFIG.storage.keys.attempts;
const FAILED_ATTEMPTS_THRESHOLD = APP_CONFIG.smartHelp.failedAttemptsThreshold;

interface ExerciseAttempts {
  [exerciseId: string]: {
    failedAttempts: number;
    lastAttempt: number; // timestamp
    totalAttempts: number;
  };
}

export class AttemptTracker {
  /**
   * Loads attempt data from localStorage
   */
  private static loadAttempts(): ExerciseAttempts {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error loading attempt data:', error);
      return {};
    }
  }

  /**
   * Saves attempt data to localStorage
   */
  private static saveAttempts(attempts: ExerciseAttempts): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
    } catch (error) {
      console.error('Error saving attempt data:', error);
    }
  }

  /**
   * Records a failed attempt for an exercise
   */
  static recordFailedAttempt(exerciseId: string): void {
    const attempts = this.loadAttempts();

    if (!attempts[exerciseId]) {
      attempts[exerciseId] = {
        failedAttempts: 0,
        lastAttempt: Date.now(),
        totalAttempts: 0,
      };
    }

    attempts[exerciseId].failedAttempts += 1;
    attempts[exerciseId].totalAttempts += 1;
    attempts[exerciseId].lastAttempt = Date.now();

    this.saveAttempts(attempts);
  }

  /**
   * Records a successful attempt for an exercise
   */
  static recordSuccessAttempt(exerciseId: string): void {
    const attempts = this.loadAttempts();

    if (!attempts[exerciseId]) {
      attempts[exerciseId] = {
        failedAttempts: 0,
        lastAttempt: Date.now(),
        totalAttempts: 0,
      };
    }

    attempts[exerciseId].totalAttempts += 1;
    attempts[exerciseId].lastAttempt = Date.now();
    // Don't increment failedAttempts on success

    this.saveAttempts(attempts);
  }

  /**
   * Gets the number of failed attempts for an exercise
   */
  static getFailedAttempts(exerciseId: string): number {
    const attempts = this.loadAttempts();
    return attempts[exerciseId]?.failedAttempts || 0;
  }

  /**
   * Gets the total attempts for an exercise
   */
  static getTotalAttempts(exerciseId: string): number {
    const attempts = this.loadAttempts();
    return attempts[exerciseId]?.totalAttempts || 0;
  }

  /**
   * Checks if smart help should be shown for an exercise
   */
  static shouldShowSmartHelp(exerciseId: string): boolean {
    const failedAttempts = this.getFailedAttempts(exerciseId);
    return failedAttempts >= FAILED_ATTEMPTS_THRESHOLD;
  }

  /**
   * Resets attempts for an exercise (when completed or reset)
   */
  static resetAttempts(exerciseId: string): void {
    const attempts = this.loadAttempts();
    delete attempts[exerciseId];
    this.saveAttempts(attempts);
  }

  /**
   * Clears all attempt data
   */
  static clearAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing attempt data:', error);
    }
  }

  /**
   * Gets statistics for debugging/analytics
   */
  static getStats(exerciseId: string) {
    const attempts = this.loadAttempts();
    const data = attempts[exerciseId];

    if (!data) {
      return {
        failedAttempts: 0,
        totalAttempts: 0,
        lastAttempt: null,
        shouldShowHelp: false,
      };
    }

    return {
      failedAttempts: data.failedAttempts,
      totalAttempts: data.totalAttempts,
      lastAttempt: new Date(data.lastAttempt),
      shouldShowHelp: data.failedAttempts >= FAILED_ATTEMPTS_THRESHOLD,
    };
  }
}
