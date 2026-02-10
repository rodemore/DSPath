import type { ProgressData } from '../../types';

interface ProgressBarProps {
  progress: ProgressData;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="progress-container">
      <span className="progress-label">
        {progress.completedExercises.size} / {progress.totalExercises} ejercicios
      </span>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>
    </div>
  );
};
