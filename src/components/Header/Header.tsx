import type { PyodideStatus } from '../../types';

interface HeaderProps {
  status: PyodideStatus;
}

export const Header = ({ status }: HeaderProps) => {
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
          <span className="py">Py</span>
          <span className="lab">Lab</span>
        </div>
        <p className="tagline">
          Aprende Python desde cero con ejercicios interactivos que se ejecutan en tu navegador
        </p>
        <div className="status-bar">
          <span className={getStatusDotClass()} />
          <span>{getStatusText()}</span>
        </div>
      </div>
    </header>
  );
};
