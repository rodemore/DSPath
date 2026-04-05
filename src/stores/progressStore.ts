import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cacheStorage } from '@utils/cacheStorage';

interface ProgressState {
  // State
  completedExercises: Set<string>;
  savedCode: Record<string, string>;
  isDataLoaded: boolean;

  // Actions
  addCompletedExercise: (exerciseId: string) => void;
  saveCode: (exerciseId: string, code: string) => void;
  setSavedCode: (code: Record<string, string>) => void;
  loadProgress: () => Promise<void>;
  clearProgress: () => Promise<void>;
  setIsDataLoaded: (loaded: boolean) => void;
}

/**
 * Progress Store
 * Manages exercise completion status and saved code
 * Persisted to localStorage and Cache API
 */
export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      // Initial state
      completedExercises: new Set<string>(),
      savedCode: {},
      isDataLoaded: false,

      // Load progress from cache
      loadProgress: async () => {
        try {
          const exercises = await cacheStorage.getCompletedExercises();
          const code = await cacheStorage.getExerciseCode();

          set({
            completedExercises: exercises,
            savedCode: code,
            isDataLoaded: true,
          });
        } catch (error) {
          console.error('Error loading progress:', error);
          set({ isDataLoaded: true });
        }
      },

      // Add a completed exercise
      addCompletedExercise: (exerciseId: string) => {
        const { completedExercises } = get();
        const newSet = new Set(completedExercises);
        newSet.add(exerciseId);

        set({ completedExercises: newSet });

        // Persist to cache
        if (get().isDataLoaded) {
          cacheStorage.saveCompletedExercises(newSet);
        }
      },

      // Save code for a specific exercise
      saveCode: (exerciseId: string, code: string) => {
        const { savedCode } = get();
        const newSavedCode = { ...savedCode, [exerciseId]: code };

        set({ savedCode: newSavedCode });

        // Persist to cache
        if (get().isDataLoaded) {
          cacheStorage.saveExerciseCode(newSavedCode);
        }
      },

      // Set all saved code at once
      setSavedCode: (code: Record<string, string>) => {
        set({ savedCode: code });

        // Persist to cache
        if (get().isDataLoaded) {
          cacheStorage.saveExerciseCode(code);
        }
      },

      // Clear all progress
      clearProgress: async () => {
        await cacheStorage.clearProgress();
        set({
          completedExercises: new Set(),
          savedCode: {},
          isDataLoaded: true,
        });
      },

      // Set data loaded flag
      setIsDataLoaded: (loaded: boolean) => {
        set({ isDataLoaded: loaded });
      },
    }),
    {
      name: 'progress-storage',
      // Custom storage to handle Set serialization
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;

          try {
            const { state } = JSON.parse(str);
            // Convert array back to Set
            if (state.completedExercises && Array.isArray(state.completedExercises)) {
              state.completedExercises = new Set(state.completedExercises);
            }
            return { state };
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          const { state } = value;
          // Convert Set to array for serialization
          const serializable = {
            ...state,
            completedExercises: Array.from(state.completedExercises),
          };
          localStorage.setItem(name, JSON.stringify({ state: serializable }));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
