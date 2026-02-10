import type { ExerciseResult } from '../../types';

interface OutputAreaProps {
  result: ExerciseResult | null;
  show: boolean;
}

export const OutputArea = ({ result, show }: OutputAreaProps) => {
  if (!show || !result) return null;

  return (
    <>
      <div className="output-area show">
        <div className="output-header">
          <span>Consola</span>
        </div>
        <div className="output-content">
          {result.error ? result.error : result.output}
        </div>
      </div>
      {result && (
        <div className={`result-badge show ${result.isCorrect ? 'pass' : 'fail'}`}>
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
