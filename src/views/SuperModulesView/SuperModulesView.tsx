import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '@components/LanguageSelector';
import { SuperModuleCard } from '@components/SuperModuleCard';
import { superModules } from '@data/superModules';
import { getTotalExercisesCount } from '@data/sections';

interface SuperModulesViewProps {
  onSuperModuleSelect: (superModuleId: number) => void;
  completedExercisesCount: number;
}

export const SuperModulesView = ({
  onSuperModuleSelect,
  completedExercisesCount,
}: SuperModulesViewProps) => {
  const { t } = useTranslation('common');
  const totalExercises = getTotalExercisesCount();

  return (
    <>
      <nav className="landing-nav">
        <div className="nav-content">
          <div className="logo">
            <span className="py">DS</span>
            <span className="lab">Path</span>
          </div>
          <div className="nav-links">
            <a href="/" className="nav-link active">
              {t('navigation.courses')}
            </a>
            <a href="#" className="nav-link disabled">
              {t('navigation.projects')}
            </a>
            <a href="/guides" className="nav-link">
              {t('navigation.guides')}
            </a>
            <LanguageSelector />
          </div>
        </div>
      </nav>
      <div className="super-modules-header">
        <h1 className="super-modules-title">
          {t('app.tagline', { language: '' })}{' '}
          <span className="highlight-python">{t('languages.python')}</span>
        </h1>
        <p className="super-modules-subtitle">{t('app.subtitle')}</p>
      </div>
      <div className="modules-section">
        <div className="modules-section-header">
          <h2 className="modules-section-title">
            <span className="section-icon">📖</span> {t('modules.title')}
          </h2>
          <div className="progress-indicator">
            {t('modules.progressComplete', {
              percent: Math.round((completedExercisesCount / totalExercises) * 100),
            })}
          </div>
        </div>
        <main className="super-modules-grid">
          {superModules.map((superModule) => (
            <SuperModuleCard
              key={superModule.id}
              superModule={superModule}
              onSelect={onSuperModuleSelect}
            />
          ))}
        </main>
      </div>
    </>
  );
};
