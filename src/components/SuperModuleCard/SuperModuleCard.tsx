import type { SuperModule } from '../../types';
import './SuperModuleCard.css';

interface SuperModuleCardProps {
  superModule: SuperModule;
  onSelect: (superModuleId: number) => void;
}

export function SuperModuleCard({ superModule, onSelect }: SuperModuleCardProps) {
  const handleClick = () => {
    if (superModule.isAvailable) {
      onSelect(superModule.id);
    }
  };

  return (
    <div
      className={`super-module-card ${!superModule.isAvailable ? 'locked' : ''}`}
      onClick={handleClick}
      style={{ '--module-color': superModule.color } as React.CSSProperties}
    >
      <div className="super-module-icon">{superModule.icon}</div>
      <h2 className="super-module-title">{superModule.title}</h2>
      <p className="super-module-description">{superModule.description}</p>

      {!superModule.isAvailable && (
        <div className="locked-overlay">
          <div className="lock-icon">🔒</div>
          <span className="locked-text">Próximamente</span>
        </div>
      )}

      {superModule.isAvailable && (
        <div className="available-badge">
          <span>Empezar Módulo</span>
          <span className="arrow">→</span>
        </div>
      )}
    </div>
  );
}
