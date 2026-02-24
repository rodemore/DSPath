// Utilidades para guardar y recuperar datos del Cache API del navegador

const CACHE_NAME = 'dspath-user-progress-v1';

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
      localStorage.setItem('completedExercises', JSON.stringify(Array.from(exercises)));
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
      const localData = localStorage.getItem('completedExercises');
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
      const saved = localStorage.getItem('completedExercises');
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
      localStorage.setItem('exerciseCode', JSON.stringify(exerciseCode));
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
      const localData = localStorage.getItem('exerciseCode');
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
      const saved = localStorage.getItem('exerciseCode');
      return saved ? JSON.parse(saved) : {};
    }
  },

  // Limpiar todo el cache de progreso
  async clearProgress(): Promise<void> {
    try {
      await caches.delete(CACHE_NAME);
      localStorage.removeItem('completedExercises');
      localStorage.removeItem('exerciseCode');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
};
