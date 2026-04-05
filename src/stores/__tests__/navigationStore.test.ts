import { describe, it, expect, beforeEach } from 'vitest';
import { useNavigationStore } from '../navigationStore';
import { act } from '@testing-library/react';
import { mockSection } from '@/tests/mockData/mockSection';

describe('navigationStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    act(() => {
      useNavigationStore.getState().resetNavigation();
    });
  });

  it('should have initial state', () => {
    const state = useNavigationStore.getState();
    expect(state.viewMode).toBe('super-modules');
    expect(state.activeSuperModule).toBe(null);
    expect(state.activeSection).toBe(0);
    expect(state.currentSection).toBe(null);
    expect(state.isLoadingSection).toBe(false);
  });

  it('should set view mode', () => {
    act(() => {
      useNavigationStore.getState().setViewMode('sections');
    });

    const state = useNavigationStore.getState();
    expect(state.viewMode).toBe('sections');
  });

  it('should set active super module and switch to sections view', () => {
    act(() => {
      useNavigationStore.getState().setActiveSuperModule(1);
    });

    const state = useNavigationStore.getState();
    expect(state.activeSuperModule).toBe(1);
    expect(state.viewMode).toBe('sections');
  });

  it('should reset to super-modules view when setting null super module', () => {
    act(() => {
      useNavigationStore.getState().setActiveSuperModule(1);
      useNavigationStore.getState().setActiveSuperModule(null);
    });

    const state = useNavigationStore.getState();
    expect(state.activeSuperModule).toBe(null);
    expect(state.viewMode).toBe('super-modules');
  });

  it('should set active section', () => {
    act(() => {
      useNavigationStore.getState().setActiveSection(5);
    });

    const state = useNavigationStore.getState();
    expect(state.activeSection).toBe(5);
  });

  it('should set current section', () => {
    act(() => {
      useNavigationStore.getState().setCurrentSection(mockSection);
    });

    const state = useNavigationStore.getState();
    expect(state.currentSection).toEqual(mockSection);
  });

  it('should set loading state', () => {
    act(() => {
      useNavigationStore.getState().setIsLoadingSection(true);
    });

    const state = useNavigationStore.getState();
    expect(state.isLoadingSection).toBe(true);

    act(() => {
      useNavigationStore.getState().setIsLoadingSection(false);
    });

    expect(useNavigationStore.getState().isLoadingSection).toBe(false);
  });

  it('should reset navigation to initial state', () => {
    act(() => {
      useNavigationStore.getState().setActiveSuperModule(1);
      useNavigationStore.getState().setActiveSection(5);
      useNavigationStore.getState().setCurrentSection(mockSection);
      useNavigationStore.getState().setIsLoadingSection(true);
    });

    act(() => {
      useNavigationStore.getState().resetNavigation();
    });

    const state = useNavigationStore.getState();
    expect(state.viewMode).toBe('super-modules');
    expect(state.activeSuperModule).toBe(null);
    expect(state.activeSection).toBe(0);
    expect(state.currentSection).toBe(null);
    expect(state.isLoadingSection).toBe(false);
  });
});
