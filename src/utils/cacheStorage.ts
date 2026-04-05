// Utilidades para guardar y recuperar datos del Cache API del navegador

import { APP_CONFIG } from '@/config';

const CACHE_NAME = APP_CONFIG.storage.cacheName;
const COMPLETED_EXERCISES_KEY = APP_CONFIG.storage.keys.completedExercises;
const EXERCISE_CODE_KEY = APP_CONFIG.storage.keys.exerciseCode;

export const cacheStorage = {
  // Guardar ejercicios completados
  async saveCompletedExercises(exercises: Set<string>): Promise<void> {
    try {
      const cache = await caches.open(CACHE_NAME);
      const data = JSON.stringify(Array.from(exercises));
      const response = new Response(data);
      await cache.put('/completedExercises', response);
    } catch (error) {
      console.error('Error saving to cache:', error);
      // Fallback a localStorage
      localStorage.setItem(COMPLETED_EXERCISES_KEY, JSON.stringify(Array.from(exercises)));
    }
  },

  // Recuperar ejercicios completados
  async getCompletedExercises(): Promise<Set<string>> {
    try {
      const cache = await caches.open(CACHE_NAME);
      const response = await cache.match('/completedExercises');

      if (response) {
        const data = await response.text();
        return new Set<string>(JSON.parse(data) as string[]);
      }

      // Fallback a localStorage si no existe en cache
      const localData = localStorage.getItem(COMPLETED_EXERCISES_KEY);
      if (localData) {
        const exercises = new Set<string>(JSON.parse(localData) as string[]);
        // Migrar a cache
        await this.saveCompletedExercises(exercises);
        return exercises;
      }

      return new Set();
    } catch (error) {
      console.error('Error reading from cache:', error);
      // Fallback a localStorage
      const saved = localStorage.getItem(COMPLETED_EXERCISES_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
  },

  // Guardar código de ejercicios
  async saveExerciseCode(exerciseCode: Record<string, string>): Promise<void> {
    try {
      const cache = await caches.open(CACHE_NAME);
      const data = JSON.stringify(exerciseCode);
      const response = new Response(data);
      await cache.put('/exerciseCode', response);
    } catch (error) {
      console.error('Error saving code to cache:', error);
      // Fallback a localStorage
      localStorage.setItem(EXERCISE_CODE_KEY, JSON.stringify(exerciseCode));
    }
  },

  // Recuperar código de ejercicios
  async getExerciseCode(): Promise<Record<string, string>> {
    try {
      const cache = await caches.open(CACHE_NAME);
      const response = await cache.match('/exerciseCode');

      if (response) {
        const data = await response.text();
        return JSON.parse(data);
      }

      // Fallback a localStorage si no existe en cache
      const localData = localStorage.getItem(EXERCISE_CODE_KEY);
      if (localData) {
        const code = JSON.parse(localData);
        // Migrar a cache
        await this.saveExerciseCode(code);
        return code;
      }

      return {};
    } catch (error) {
      console.error('Error reading code from cache:', error);
      // Fallback a localStorage
      const saved = localStorage.getItem(EXERCISE_CODE_KEY);
      return saved ? JSON.parse(saved) : {};
    }
  },

  // Limpiar todo el cache de progreso
  async clearProgress(): Promise<void> {
    try {
      await caches.delete(CACHE_NAME);
      localStorage.removeItem(COMPLETED_EXERCISES_KEY);
      localStorage.removeItem(EXERCISE_CODE_KEY);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  },
};
