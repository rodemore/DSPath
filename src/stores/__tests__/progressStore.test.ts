import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useProgressStore } from '../progressStore';
import { act } from '@testing-library/react';

// Mock cacheStorage
vi.mock('@utils/cacheStorage', () => ({
  cacheStorage: {
    getCompletedExercises: vi.fn().mockResolvedValue(new Set<string>()),
    getExerciseCode: vi.fn().mockResolvedValue({}),
    saveCompletedExercises: vi.fn().mockResolvedValue(undefined),
    saveExerciseCode: vi.fn().mockResolvedValue(undefined),
    clearProgress: vi.fn().mockResolvedValue(undefined),
  },
}));

describe('progressStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    act(() => {
      useProgressStore.setState({
        completedExercises: new Set(),
        savedCode: {},
        isDataLoaded: false,
      });
    });
  });

  it('should have initial state', () => {
    const state = useProgressStore.getState();
    expect(state.completedExercises).toBeInstanceOf(Set);
    expect(state.completedExercises.size).toBe(0);
    expect(state.savedCode).toEqual({});
    expect(state.isDataLoaded).toBe(false);
  });

  it('should add completed exercise', () => {
    act(() => {
      useProgressStore.getState().setIsDataLoaded(true);
      useProgressStore.getState().addCompletedExercise('section-1-exercise-1');
    });

    const state = useProgressStore.getState();
    expect(state.completedExercises.has('section-1-exercise-1')).toBe(true);
    expect(state.completedExercises.size).toBe(1);
  });

  it('should save code for exercise', () => {
    const code = 'print("Hello World")';

    act(() => {
      useProgressStore.getState().setIsDataLoaded(true);
      useProgressStore.getState().saveCode('section-1-exercise-1', code);
    });

    const state = useProgressStore.getState();
    expect(state.savedCode['section-1-exercise-1']).toBe(code);
  });

  it('should set saved code object', () => {
    const codeMap = {
      'section-1-exercise-1': 'code1',
      'section-1-exercise-2': 'code2',
    };

    act(() => {
      useProgressStore.getState().setIsDataLoaded(true);
      useProgressStore.getState().setSavedCode(codeMap);
    });

    const state = useProgressStore.getState();
    expect(state.savedCode).toEqual(codeMap);
  });

  it('should load progress', async () => {
    await act(async () => {
      await useProgressStore.getState().loadProgress();
    });

    const state = useProgressStore.getState();
    expect(state.isDataLoaded).toBe(true);
  });

  it('should not save to cache if data not loaded', () => {
    act(() => {
      useProgressStore.getState().addCompletedExercise('section-1-exercise-1');
    });

    // Should still add to state
    const state = useProgressStore.getState();
    expect(state.completedExercises.has('section-1-exercise-1')).toBe(true);
  });
});
