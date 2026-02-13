import { Lock, Terminal, Layers, Code2, Database, FolderKanban, ChevronRight } from 'lucide-react';
import type { SuperModule } from '../../types';
import './SuperModuleCard.css';

interface SuperModuleCardProps {
  superModule: SuperModule;
  onSelect: (superModuleId: number) => void;
}

const iconMap: Record<string, typeof Terminal> = {
  Terminal,
  Layers,
  Code2,
  Database,
  FolderKanban,
};

export function SuperModuleCard({ superModule, onSelect }: SuperModuleCardProps) {
  const handleClick = () => {
    if (superModule.isAvailable) {
      onSelect(superModule.id);
    }
  };

  const IconComponent = iconMap[superModule.icon] || Terminal;

  return (
    <div
      className={`super-module-card ${!superModule.isAvailable ? 'locked' : ''}`}
      onClick={handleClick}
      style={{
        '--module-color': superModule.color,
        '--module-color-light': `${superModule.color}15`
      } as React.CSSProperties}
    >
      <div className="super-module-card-header">
        <div className="super-module-icon-container">
          <IconComponent
            size={32}
            className="super-module-icon"
            style={{ color: superModule.isAvailable ? superModule.color : '#9ca3af' }}
          />
        </div>
        {!superModule.isAvailable && (
          <div className="locked-badge">
            <Lock size={12} />
            <span>Bloqueado</span>
          </div>
        )}
      </div>

      <h2 className="super-module-title">{superModule.title}</h2>
      <p className="super-module-description">{superModule.description}</p>

      {superModule.isAvailable ? (
        <button className="available-badge">
          <span>Empezar Módulo</span>
          <ChevronRight size={18} className="arrow" />
        </button>
      ) : (
        <button className="disabled-badge" disabled>
          Próximamente
        </button>
      )}
    </div>
  );
}
