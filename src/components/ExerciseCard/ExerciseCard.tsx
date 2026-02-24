import { useState } from 'react';
import type { Exercise, ExerciseResult } from '../../types';
import { CodeEditor } from '../CodeEditor';
import { OutputArea } from '../OutputArea';

interface ExerciseCardProps {
  exercise: Exercise;
  onRun: (
    code: string,
    expectedOutput: string,
    customValidator?: (code: string, output: string) => { isValid: boolean; message?: string },
    initialCode?: string
  ) => Promise<ExerciseResult>;
  onComplete: (exerciseId: string) => void;
  sectionInitialCode?: string;
  savedCode?: string;
  onSaveCode?: (code: string) => void;
  isCompleted?: boolean;
}

export const ExerciseCard = ({
  exercise,
  onRun,
  onComplete,
  sectionInitialCode,
  savedCode,
  onSaveCode,
  isCompleted = false
}: ExerciseCardProps) => {
  const [result, setResult] = useState<ExerciseResult | null>(isCompleted ? { isCorrect: true, output: '', error: null } : null);
  const [showOutput, setShowOutput] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async (code: string) => {
    setIsRunning(true);
    setShowOutput(true);

    // Guardar el código antes de ejecutar
    if (onSaveCode) {
      onSaveCode(code);
    }

    const execResult = await onRun(code, exercise.expectedOutput, exercise.customValidator, sectionInitialCode);
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
    <div className={getCardClassName()} id={exercise.id}>
      <div className="task-number">
        {isCompleted ? `✓ ${exercise.number}` : exercise.number}
      </div>
      <div
        className="task-desc"
        dangerouslySetInnerHTML={{ __html: exercise.description }}
      />
      {exercise.validationMode !== 'custom' && exercise.expectedOutput && (
        <div className="expected-output">
          <strong>Salida esperada:</strong>
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
