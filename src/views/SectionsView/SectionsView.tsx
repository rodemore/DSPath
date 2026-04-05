import { useTranslation } from 'react-i18next';
import { Terminal, Layers, Code2, Table2, TrendingUp, FolderKanban } from 'lucide-react';
import { Header } from '@components/Header';
import { Navigation } from '@components/Navigation';
import { ProgressBar } from '@components/ProgressBar';
import { Section } from '@components/Section';
import { LanguageSelector } from '@components/LanguageSelector';
import { superModules } from '@data/superModules';
import type { Section as SectionType, ProgressData, PyodideStatus } from '@/types';

const iconMap: Record<string, typeof Terminal> = {
  Terminal,
  Layers,
  Code2,
  Table2,
  TrendingUp,
  FolderKanban,
};

interface SectionsViewProps {
  // Pyodide status
  status: PyodideStatus;

  // Navigation state
  activeSuperModule: number | null;
  activeSection: number;
  currentSection: SectionType | null;
  isLoadingSection: boolean;

  // Navigation items
  navItems: Array<{ id: number; title: string }>;

  // Progress data
  progressData: ProgressData;

  // Next section info
  nextSection: { id: number; title: string } | null;

  // Callbacks
  onBackToSuperModules: () => void;
  onSectionChange: (sectionId: number) => void;
  onNavigateToNext: () => void;
}

export const SectionsView = ({
  status,
  activeSuperModule,
  activeSection,
  currentSection,
  isLoadingSection,
  navItems,
  progressData,
  nextSection,
  onBackToSuperModules,
  onSectionChange,
  onNavigateToNext,
}: SectionsViewProps) => {
  const { t } = useTranslation('common');

  return (
    <>
      <Header status={status} showStatus={true} />
      <div className="breadcrumb">
        <button onClick={onBackToSuperModules} className="back-button">
          ← {t('navigation.backToHome')}
        </button>
        <LanguageSelector />
        {activeSuperModule !== null &&
          (() => {
            const sm = superModules[activeSuperModule];
            const IconComponent = iconMap[sm.icon] || Terminal;
            return (
              <span className="current-super-module">
                <IconComponent size={16} style={{ color: sm.color }} />
                {sm.title}
              </span>
            );
          })()}
      </div>
      <Navigation
        sections={navItems}
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      />
      <ProgressBar progress={progressData} />
      <main className="main-content">
        {isLoadingSection ? (
          <div className="loading-section">{t('modules.loading')}</div>
        ) : currentSection ? (
          <Section
            key={currentSection.id}
            section={currentSection}
            isActive={true}
            nextSection={nextSection}
            onNavigateToNext={onNavigateToNext}
          />
        ) : null}
      </main>
    </>
  );
};
