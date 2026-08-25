import type { ExerciseResult } from '../../types';

interface OutputAreaProps {
  result: ExerciseResult | null;
  show: boolean;
}

export const OutputArea = ({ result, show }: OutputAreaProps) => {
  if (!show || !result) return null;

  const resultMessage = result.isCorrect
    ? '¡Correcto!'
    : result.error
      ? 'Revisa las instrucciones'
      : 'La salida no coincide — sigue intentando';

  return (
    <>
      <div className="output-area show" role="log" aria-label="Salida de la consola">
        <div className="output-header">
          <span>Consola</span>
        </div>
        <div className="output-content" aria-live="polite">
          {result.error ? result.error : result.output}
        </div>
      </div>
      {result && (
        <div
          className={`result-badge show ${result.isCorrect ? 'pass' : 'fail'}`}
          role="status"
          aria-live="polite"
          aria-label={resultMessage}
        >
          {result.isCorrect
            ? '✅ ¡Correcto!'
            : result.error
              ? '💡 Revisa las instrucciones'
              : '❌ La salida no coincide — sigue intentando'}
        </div>
      )}
    </>
  );
};
