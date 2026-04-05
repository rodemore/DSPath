import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Exercise, ExerciseResult, SmartHelpFeedback } from '../../types';
import { usePyodideStore } from '@/stores/pyodideStore';
import { CodeEditor } from '../CodeEditor';
import { OutputArea } from '../OutputArea';
import { SmartFeedback } from '../SmartFeedback';
import { SmartHelpService } from '../../services/smartHelpService';
import { AttemptTracker } from '../../utils/attemptTracker';

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
  const { t } = useTranslation('exercises');
  const { runCode } = usePyodideStore();
  const [result, setResult] = useState<ExerciseResult | null>(
    isCompleted ? { isCorrect: true, output: '', error: null } : null
  );
  const [showOutput, setShowOutput] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  // Smart Help state
  const [showSmartHelp, setShowSmartHelp] = useState(false);
  const [smartHelpLoading, setSmartHelpLoading] = useState(false);
  const [smartHelpFeedback, setSmartHelpFeedback] = useState<SmartHelpFeedback | null>(null);
  const [smartHelpError, setSmartHelpError] = useState<string | null>(null);
  const [remainingRequests, setRemainingRequests] = useState<number | undefined>(undefined);
  const [shouldShowHelpButton, setShouldShowHelpButton] = useState(false);
  const [currentCode, setCurrentCode] = useState<string>('');

  // Check if should show help button on mount and when result changes
  useEffect(() => {
    const shouldShow = AttemptTracker.shouldShowSmartHelp(exercise.id);
    setShouldShowHelpButton(shouldShow);
  }, [exercise.id, result]);

  const handleRun = async (code: string) => {
    setCurrentCode(code);
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
      // Record success and reset attempts
      AttemptTracker.recordSuccessAttempt(exercise.id);
      AttemptTracker.resetAttempts(exercise.id);
      setShouldShowHelpButton(false);
      onComplete(exercise.id);
    } else {
      // Record failed attempt
      AttemptTracker.recordFailedAttempt(exercise.id);
      const shouldShow = AttemptTracker.shouldShowSmartHelp(exercise.id);
      setShouldShowHelpButton(shouldShow);
    }

    setIsRunning(false);
  };

  const handleReset = () => {
    setResult(null);
    setShowOutput(false);
  };

  const handleSmartHelp = async () => {
    setShowSmartHelp(true);
    setSmartHelpLoading(true);
    setSmartHelpError(null);
    setSmartHelpFeedback(null);

    try {
      // Strip HTML tags from description for cleaner prompt
      const cleanDescription = exercise.description.replace(/<[^>]*>/g, '');

      const response = await SmartHelpService.getSmartHelp({
        studentCode: currentCode || savedCode || exercise.initialCode || '',
        exerciseDescription: cleanDescription,
        expectedOutput: exercise.expectedOutput,
        actualOutput: result?.output,
        errorMessage: result?.error || undefined,
        studentId: 'user-' + Math.random().toString(36).substring(7), // Simple anonymous ID
      });

      if (response.success && response.feedback) {
        setSmartHelpFeedback(response.feedback);
        setRemainingRequests(response.metadata?.remainingRequests);
      } else {
        setSmartHelpError(response.error || 'Error al obtener ayuda inteligente');
      }
    } catch {
      setSmartHelpError(t('exercise.smartHelp.connectionError'));
    } finally {
      setSmartHelpLoading(false);
    }
  };

  const handleCloseSmartHelp = () => {
    setShowSmartHelp(false);
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
          <strong>{t('exercise.expectedOutput')}:</strong>
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

      {/* Smart Help Button - appears after 2 failed attempts */}
      {shouldShowHelpButton && !isCompleted && result && !result.isCorrect && (
        <div className="smart-help-button-container">
          <button
            className="smart-help-button"
            onClick={handleSmartHelp}
            disabled={smartHelpLoading}
            aria-label={
              smartHelpLoading
                ? t('exercise.smartHelp.analyzing')
                : t('exercise.smartHelp.needHelp')
            }
            aria-busy={smartHelpLoading}
          >
            <span className="button-icon" aria-hidden="true">
              🤖
            </span>
            <span className="button-text">
              {smartHelpLoading
                ? t('exercise.smartHelp.analyzing')
                : t('exercise.smartHelp.needHelp')}
            </span>
            <span className="button-badge" aria-hidden="true">
              IA
            </span>
          </button>
          <span className="help-hint">{t('exercise.smartHelp.requestHelp')}</span>
        </div>
      )}

      {/* Smart Help Modal */}
      <SmartFeedback
        feedback={smartHelpFeedback}
        isLoading={smartHelpLoading}
        error={smartHelpError}
        show={showSmartHelp}
        onClose={handleCloseSmartHelp}
        remainingRequests={remainingRequests}
      />
    </div>
  );
};
