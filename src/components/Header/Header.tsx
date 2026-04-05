import { useTranslation } from 'react-i18next';
import type { PyodideStatus } from '../../types';
import { LanguageSelector } from '../LanguageSelector';

interface HeaderProps {
  status: PyodideStatus;
  showStatus?: boolean;
}

export const Header = ({ status, showStatus = true }: HeaderProps) => {
  const { t } = useTranslation('common');

  const getStatusText = () => {
    if (status.error) return t('pyodide.error');
    if (status.isLoading) return t('pyodide.loading');
    if (status.isReady) return t('pyodide.ready');
    return t('pyodide.initializing');
  };

  const getStatusDotClass = () => {
    return status.isReady ? 'status-dot ready' : 'status-dot';
  };

  return (
    <header className="hero">
      <div className="hero-content">
        <div className="logo">
          <div className="py">DS</div>
          <span className="lab">Path</span>
        </div>
        <div className="header-actions">
          {showStatus && (
            <div className="status-bar">
              <span className={getStatusDotClass()} />
              <span>{getStatusText()}</span>
            </div>
          )}
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};
