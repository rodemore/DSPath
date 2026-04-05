import './ErrorBoundary.css';

interface SectionErrorFallbackProps {
  onReset?: () => void;
}

export const SectionErrorFallback = ({ onReset }: SectionErrorFallbackProps) => {
  return (
    <div className="section-error-fallback">
      <div className="section-error-content">
        <div className="error-icon-small">⚠️</div>
        <h3 className="error-subtitle">Error al cargar la sección</h3>
        <p className="error-text">
          Ocurrió un problema al cargar este contenido. Por favor, intenta de nuevo.
        </p>
        <div className="section-error-actions">
          {onReset && (
            <button onClick={onReset} className="error-button-small error-button-primary">
              Reintentar
            </button>
          )}
          <button
            onClick={() => (window.location.href = '/')}
            className="error-button-small error-button-secondary"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};
