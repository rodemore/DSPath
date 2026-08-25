import { create } from 'zustand';
import type { Section } from '@/types';

type ViewMode = 'super-modules' | 'sections';

interface NavigationState {
  // State
  viewMode: ViewMode;
  activeSuperModule: number | null;
  activeSection: number;
  currentSection: Section | null;
  isLoadingSection: boolean;

  // Actions
  setViewMode: (mode: ViewMode) => void;
  setActiveSuperModule: (id: number | null) => void;
  setActiveSection: (id: number) => void;
  setCurrentSection: (section: Section | null) => void;
  setIsLoadingSection: (loading: boolean) => void;
  resetNavigation: () => void;
}

/**
 * Navigation Store
 * Manages current view mode, active super module, and active section
 */
export const useNavigationStore = create<NavigationState>()((set) => ({
  // Initial state
  viewMode: 'super-modules',
  activeSuperModule: null,
  activeSection: 0,
  currentSection: null,
  isLoadingSection: false,

  // Set view mode (super-modules or sections)
  setViewMode: (mode) => set({ viewMode: mode }),

  // Set active super module
  setActiveSuperModule: (id) =>
    set({
      activeSuperModule: id,
      viewMode: id !== null ? 'sections' : 'super-modules',
    }),

  // Set active section
  setActiveSection: (id) => set({ activeSection: id }),

  // Set current section data
  setCurrentSection: (section) => set({ currentSection: section }),

  // Set loading state
  setIsLoadingSection: (loading) => set({ isLoadingSection: loading }),

  // Reset to initial state
  resetNavigation: () =>
    set({
      viewMode: 'super-modules',
      activeSuperModule: null,
      activeSection: 0,
      currentSection: null,
      isLoadingSection: false,
    }),
}));
