import { useState } from 'react';
import type { Exercise, ExerciseResult } from '../../types';
import { CodeEditor } from '../CodeEditor';
import { OutputArea } from '../OutputArea';

interface ExerciseCardProps {
  exercise: Exercise;
  onRun: (
    code: string,
    expectedOutput: string,
    customValidator?: (code: string, output: string) => { isValid: boolean; message?: string }
  ) => Promise<ExerciseResult>;
  onComplete: (exerciseId: string) => void;
}

export const ExerciseCard = ({ exercise, onRun, onComplete }: ExerciseCardProps) => {
  const [result, setResult] = useState<ExerciseResult | null>(null);
  const [showOutput, setShowOutput] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async (code: string) => {
    setIsRunning(true);
    setShowOutput(true);

    const execResult = await onRun(code, exercise.expectedOutput, exercise.customValidator);
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
    if (result?.isCorrect) className += ' success';
    else if (result && !result.isCorrect) className += ' error';
    return className;
  };

  return (
    <div className={getCardClassName()} id={exercise.id}>
      <div className="task-number">{exercise.number}</div>
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
        isRunning={isRunning}
      />
      <OutputArea result={result} show={showOutput} />
    </div>
  );
};
