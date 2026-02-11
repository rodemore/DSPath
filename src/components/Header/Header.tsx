import type { PyodideStatus } from '../../types';

interface HeaderProps {
  status: PyodideStatus;
  showStatus?: boolean;
}

export const Header = ({ status, showStatus = true }: HeaderProps) => {
  const getStatusText = () => {
    if (status.error) return 'Error al cargar Python';
    if (status.isLoading) return 'Cargando Python...';
    if (status.isReady) return 'Python listo ✓';
    return 'Inicializando...';
  };

  const getStatusDotClass = () => {
    return status.isReady ? 'status-dot ready' : 'status-dot';
  };

  return (
    <header className="hero">
      <div className="hero-content">
        <div className="logo">
          <span className="py">DS</span>
          <span className="lab">Path</span>
        </div>
        <p className="tagline">
          Aprende Python desde cero con ejercicios interactivos
        </p>
        {showStatus && (
          <div className="status-bar">
            <span className={getStatusDotClass()} />
            <span>{getStatusText()}</span>
          </div>
        )}
      </div>
    </header>
  );
};
