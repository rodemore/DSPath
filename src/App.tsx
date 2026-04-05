import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Terminal, Layers, Code2, Table2, TrendingUp, FolderKanban } from 'lucide-react';
import { usePyodide } from './hooks/usePyodide';
import { useProgressStore } from './stores/progressStore';
import { useNavigationStore } from './stores/navigationStore';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { ProgressBar } from './components/ProgressBar';
import { Section } from './components/Section';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageSelector } from './components/LanguageSelector';
import { SuperModuleCard } from './components/SuperModuleCard';
import { ErrorBoundary, SectionErrorFallback } from './components/ErrorBoundary';
import {
  sectionsMetadata,
  loadModule,
  getTotalExercisesCount,
  getExercisesCountForSuperModule,
} from './data/sections';
import { superModules } from './data/superModules';
import type { ProgressData } from './types';
import './styles/globals.css';

const iconMap: Record<string, typeof Terminal> = {
  Terminal,
  Layers,
  Code2,
  Table2,
  TrendingUp,
  FolderKanban,
};

function App() {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const params = useParams();

  // Progress store
  const { completedExercises, loadProgress } = useProgressStore();

  // Navigation store
  const {
    viewMode,
    activeSuperModule,
    activeSection,
    currentSection,
    isLoadingSection,
    setActiveSuperModule,
    setActiveSection,
    setCurrentSection,
    setIsLoadingSection,
  } = useNavigationStore();

  // Initialize Pyodide (has built-in initialization guard to prevent multiple loads)
  const { status } = usePyodide();

  // Load progress on mount
  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // Sync URL params with navigation store
  useEffect(() => {
    const superModuleId = params.superModuleId ? parseInt(params.superModuleId) : null;
    const sectionId = params.sectionId ? parseInt(params.sectionId) : null;

    if (superModuleId !== null) {
      setActiveSuperModule(superModuleId);
      const defaultSection = sectionId ?? superModules[superModuleId]?.sections[0] ?? 0;
      setActiveSection(defaultSection);
    } else {
      setActiveSuperModule(null);
      setActiveSection(0);
    }
  }, [params.superModuleId, params.sectionId, setActiveSuperModule, setActiveSection]);

  // Calculate total exercises
  const totalExercises = getTotalExercisesCount();

  // Load module when active section changes
  useEffect(() => {
    if (viewMode === 'sections' && activeSuperModule !== null) {
      const loadCurrentModule = async () => {
        setIsLoadingSection(true);
        try {
          const module = await loadModule(activeSection);
          setCurrentSection(module);
        } catch (error) {
          console.error('Error loading module:', error);
        } finally {
          setIsLoadingSection(false);
        }
      };
      loadCurrentModule();
    }
  }, [activeSection, viewMode, activeSuperModule, setIsLoadingSection, setCurrentSection]);

  // Progress data - solo para el supermódulo actual
  const currentSuperModuleExercises =
    activeSuperModule !== null
      ? getExercisesCountForSuperModule(superModules[activeSuperModule].sections)
      : totalExercises;

  // Contar ejercicios completados solo del supermódulo actual
  const completedInCurrentSuperModule =
    activeSuperModule !== null
      ? Array.from(completedExercises).filter((exerciseId) => {
          // El exerciseId tiene formato: "section-X-exercise-Y"
          const sectionId = parseInt(exerciseId.split('-')[1]);
          return superModules[activeSuperModule].sections.includes(sectionId);
        }).length
      : completedExercises.size;

  const progressData: ProgressData = {
    completedExercises,
    completedInCurrentScope: completedInCurrentSuperModule,
    totalExercises: currentSuperModuleExercises,
    percentage:
      currentSuperModuleExercises > 0
        ? (completedInCurrentSuperModule / currentSuperModuleExercises) * 100
        : 0,
  };

  // Navigation items (filter by active super module)
  const navItems =
    activeSuperModule !== null
      ? sectionsMetadata
          .filter((section) => superModules[activeSuperModule].sections.includes(section.id))
          .map((section) => ({
            id: section.id,
            title: section.title.replace(':', '').replace(' y', '').trim(),
          }))
      : [];

  const handleSuperModuleSelect = (superModuleId: number) => {
    const firstSection = superModules[superModuleId].sections[0] || 0;
    const newPath = `/module/${superModuleId}/section/${firstSection}`;
    console.log('Navigating to:', newPath);
    navigate(newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSuperModules = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionChange = (sectionId: number) => {
    if (activeSuperModule !== null) {
      navigate(`/module/${activeSuperModule}/section/${sectionId}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calculate next section
  const getNextSection = () => {
    if (activeSuperModule === null) return null;

    const currentSuperModuleSections = superModules[activeSuperModule].sections;
    const currentIndex = currentSuperModuleSections.indexOf(activeSection);

    if (currentIndex === -1 || currentIndex >= currentSuperModuleSections.length - 1) {
      return null; // No hay siguiente sección en este supermódulo
    }

    const nextSectionId = currentSuperModuleSections[currentIndex + 1];
    const nextSectionMetadata = sectionsMetadata.find((s) => s.id === nextSectionId);

    if (!nextSectionMetadata) return null;

    return {
      id: nextSectionId,
      title: `${nextSectionMetadata.title} ${nextSectionMetadata.titleHighlight}`.trim(),
    };
  };

  const handleNavigateToNextSection = () => {
    const nextSection = getNextSection();
    if (nextSection) {
      handleSectionChange(nextSection.id);
    }
  };

  return (
    <div className="app">
      {viewMode === 'super-modules' ? (
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
                  percent: Math.round((completedExercises.size / totalExercises) * 100),
                })}
              </div>
            </div>
            <main className="super-modules-grid">
              {superModules.map((superModule) => (
                <SuperModuleCard
                  key={superModule.id}
                  superModule={superModule}
                  onSelect={handleSuperModuleSelect}
                />
              ))}
            </main>
          </div>
        </>
      ) : (
        <>
          <Header status={status} showStatus={viewMode === 'sections'} />
          <div className="breadcrumb">
            <button onClick={handleBackToSuperModules} className="back-button">
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
            onSectionChange={handleSectionChange}
          />
          <ProgressBar progress={progressData} />
          <main className="main-content">
            {isLoadingSection ? (
              <div className="loading-section">{t('modules.loading')}</div>
            ) : currentSection ? (
              <ErrorBoundary
                key={`error-boundary-${currentSection.id}`}
                fallback={<SectionErrorFallback />}
              >
                <Section
                  key={currentSection.id}
                  section={currentSection}
                  isActive={true}
                  nextSection={getNextSection()}
                  onNavigateToNext={handleNavigateToNextSection}
                />
              </ErrorBoundary>
            ) : null}
          </main>
        </>
      )}
      <ThemeToggle />
    </div>
  );
}

export default App;
