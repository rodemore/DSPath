import type { SmartHelpFeedback } from '../../types';
import './SmartFeedback.css';

interface SmartFeedbackProps {
  feedback: SmartHelpFeedback | null;
  isLoading: boolean;
  error: string | null;
  show: boolean;
  onClose: () => void;
  remainingRequests?: number;
}

export const SmartFeedback = ({
  feedback,
  isLoading,
  error,
  show,
  onClose,
  remainingRequests,
}: SmartFeedbackProps) => {
  if (!show) return null;

  return (
    <div className="smart-feedback-overlay" onClick={onClose}>
      <div className="smart-feedback-card" onClick={(e) => e.stopPropagation()}>
        <div className="smart-feedback-header">
          <div className="header-content">
            <span className="ai-icon">🤖</span>
            <span className="header-title">Ayuda Inteligente</span>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>

        {isLoading && (
          <div className="smart-feedback-loading">
            <div className="loading-spinner"></div>
            <p>Analizando tu código...</p>
          </div>
        )}

        {error && (
          <div className="smart-feedback-error">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {feedback && !isLoading && !error && (
          <div className="smart-feedback-content">
            <div className="feedback-section diagnosis">
              <h3>📋 Diagnóstico</h3>
              <p>{feedback.diagnosis}</p>
            </div>

            {feedback.syntaxErrors && feedback.syntaxErrors.length > 0 && (
              <div className="feedback-section syntax-errors">
                <h3>🔴 Errores de sintaxis</h3>
                <ul>
                  {feedback.syntaxErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="feedback-section hint">
              <h3>💡 Pista</h3>
              <p>{feedback.hint}</p>
            </div>

            <div className="feedback-section encouragement">
              <h3>🌟 Motivación</h3>
              <p>{feedback.encouragement}</p>
            </div>

            {remainingRequests !== undefined && (
              <div className="feedback-footer">
                <small>
                  Te quedan <strong>{remainingRequests}</strong> ayudas inteligentes esta hora
                </small>
              </div>
            )}
          </div>
        )}

        <div className="smart-feedback-actions">
          <button className="action-button primary" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
