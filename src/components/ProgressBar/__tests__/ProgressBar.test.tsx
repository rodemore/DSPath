import { describe, it, expect } from 'vitest';
import { renderWithoutRouter, screen } from '@/tests/test-utils';
import { ProgressBar } from '../ProgressBar';
import type { ProgressData } from '@/types';

describe('ProgressBar', () => {
  it('should render progress information', () => {
    const mockProgress: ProgressData = {
      completedExercises: new Set(['ex1', 'ex2']),
      completedInCurrentScope: 2,
      totalExercises: 10,
      percentage: 20,
    };

    renderWithoutRouter(<ProgressBar progress={mockProgress} />);

    expect(screen.getByText('2 / 10 ejercicios')).toBeInTheDocument();
  });

  it('should show correct progress bar width', () => {
    const mockProgress: ProgressData = {
      completedExercises: new Set(),
      completedInCurrentScope: 5,
      totalExercises: 10,
      percentage: 50,
    };

    renderWithoutRouter(<ProgressBar progress={mockProgress} />);

    const progressFill = document.querySelector('.progress-fill');
    expect(progressFill).toHaveStyle({ width: '50%' });
  });

  it('should handle 0% progress', () => {
    const mockProgress: ProgressData = {
      completedExercises: new Set(),
      completedInCurrentScope: 0,
      totalExercises: 10,
      percentage: 0,
    };

    renderWithoutRouter(<ProgressBar progress={mockProgress} />);

    const progressFill = document.querySelector('.progress-fill');
    expect(progressFill).toHaveStyle({ width: '0%' });
    expect(screen.getByText('0 / 10 ejercicios')).toBeInTheDocument();
  });

  it('should handle 100% progress', () => {
    const mockProgress: ProgressData = {
      completedExercises: new Set(),
      completedInCurrentScope: 10,
      totalExercises: 10,
      percentage: 100,
    };

    renderWithoutRouter(<ProgressBar progress={mockProgress} />);

    const progressFill = document.querySelector('.progress-fill');
    expect(progressFill).toHaveStyle({ width: '100%' });
    expect(screen.getByText('10 / 10 ejercicios')).toBeInTheDocument();
  });
});
