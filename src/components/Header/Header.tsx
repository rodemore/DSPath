import type { PyodideStatus } from '../../types';
import { APP_TEXTS } from '../../constants/texts';

interface HeaderProps {
  status: PyodideStatus;
  showStatus?: boolean;
}

export const Header = ({ status, showStatus = true }: HeaderProps) => {
  const getStatusText = () => {
    if (status.error) return APP_TEXTS.pyodide.error;
    if (status.isLoading) return APP_TEXTS.pyodide.loading;
    if (status.isReady) return APP_TEXTS.pyodide.ready;
    return APP_TEXTS.pyodide.initializing;
  };

  const getStatusDotClass = () => {
    return status.isReady ? 'status-dot ready' : 'status-dot';
  };

  return (
    <header className="hero">
      <div className="hero-content">
        <div className="logo">
          <div className="py">avo</div>
          <span className="lab">Code Lab</span>
        </div>
        <div className="header-actions">
          {showStatus && (
            <div className="status-bar">
              <span className={getStatusDotClass()} />
              <span>{getStatusText()}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
