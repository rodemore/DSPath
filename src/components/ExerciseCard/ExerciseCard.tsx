import { useState } from 'react';
import type { Exercise, ExerciseResult } from '../../types';
import { usePyodideStore } from '@/stores/pyodideStore';
import { CodeEditor } from '../CodeEditor';
import { OutputArea } from '../OutputArea';
import { APP_TEXTS } from '../../constants/texts';

interface ExerciseCardProps {
  exercise: Exercise;
  onComplete: (exerciseId: string) => void;
  sectionInitialCode?: string;
  savedCode?: string;
  onSaveCode?: (code: string) => void;
  isCompleted?: boolean;
}

export const ExerciseCard = ({
  exercise,
  onComplete,
  sectionInitialCode,
  savedCode,
  onSaveCode,
  isCompleted = false,
}: ExerciseCardProps) => {
  const { runCode } = usePyodideStore();
  const [result, setResult] = useState<ExerciseResult | null>(
    isCompleted ? { isCorrect: true, output: '', error: null } : null
  );
  const [showOutput, setShowOutput] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async (code: string) => {
    setIsRunning(true);
    setShowOutput(true);

    // Guardar el código antes de ejecutar
    if (onSaveCode) {
      onSaveCode(code);
    }

    const execResult = await runCode(
      code,
      exercise.expectedOutput,
      exercise.customValidator,
      sectionInitialCode
    );
    setResult(execResult);

    if (execResult.isCorrect) {
      onComplete(exercise.id);
    }

    setIsRunning(false);
  };

  const handleReset = () => {
    setResult(null);
    setShowOutput(false);
  };

  const getCardClassName = () => {
    let className = 'exercise-card';
    if (isCompleted) className += ' completed';
    if (result?.isCorrect) className += ' success';
    else if (result && !result.isCorrect) className += ' error';
    return className;
  };

  return (
    <div
      className={getCardClassName()}
      id={exercise.id}
      role="region"
      aria-labelledby={`exercise-desc-${exercise.id}`}
    >
      <div className="task-number" aria-hidden="true">
        {isCompleted ? `✓ ${exercise.number}` : exercise.number}
      </div>
      <div
        className="task-desc"
        id={`exercise-desc-${exercise.id}`}
        dangerouslySetInnerHTML={{ __html: exercise.description }}
      />
      {exercise.validationMode !== 'custom' && exercise.expectedOutput && (
        <div className="expected-output" aria-label="Salida esperada">
          <strong>{APP_TEXTS.exercise.expectedOutput}:</strong>
          <br />
          {exercise.expectedOutput.split('\\n').map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </div>
      )}
      <CodeEditor
        onRun={handleRun}
        onReset={handleReset}
        initialCode={exercise.initialCode}
        starterCode={exercise.starterCode}
        isRunning={isRunning}
        savedCode={savedCode}
      />
      <OutputArea result={result} show={showOutput} />
    </div>
  );
};
