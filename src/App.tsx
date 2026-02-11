import { useState, useEffect } from 'react';
import { usePyodide } from './hooks/usePyodide';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { ProgressBar } from './components/ProgressBar';
import { Section } from './components/Section';
import { ThemeToggle } from './components/ThemeToggle';
import { SuperModuleCard } from './components/SuperModuleCard';
import { sectionsMetadata, loadModule, getTotalExercisesCount } from './data/sections';
import { superModules } from './data/superModules';
import type { ProgressData, Section as SectionType } from './types';
import './styles/globals.css';

type ViewMode = 'super-modules' | 'sections';

function App() {
  const { status, runCode } = usePyodide();
  const [viewMode, setViewMode] = useState<ViewMode>('super-modules');
  const [activeSuperModule, setActiveSuperModule] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [currentSection, setCurrentSection] = useState<SectionType | null>(null);
  const [isLoadingSection, setIsLoadingSection] = useState(false);

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
  }, [activeSection, viewMode, activeSuperModule]);

  // Progress data
  const progressData: ProgressData = {
    completedExercises,
    totalExercises,
    percentage: totalExercises > 0 ? (completedExercises.size / totalExercises) * 100 : 0,
  };

  // Navigation items (filter by active super module)
  const navItems = activeSuperModule !== null
    ? sectionsMetadata
        .filter(section => superModules[activeSuperModule].sections.includes(section.id))
        .map((section) => ({
          id: section.id,
          title: section.title.replace(':', '').replace(' y', '').trim(),
        }))
    : [];

  const handleSuperModuleSelect = (superModuleId: number) => {
    setActiveSuperModule(superModuleId);
    setActiveSection(superModules[superModuleId].sections[0] || 0);
    setViewMode('sections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSuperModules = () => {
    setViewMode('super-modules');
    setActiveSuperModule(null);
    setCurrentSection(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionChange = (sectionId: number) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExerciseComplete = (exerciseId: string) => {
    setCompletedExercises((prev) => {
      const newSet = new Set(prev);
      newSet.add(exerciseId);
      return newSet;
    });
  };

  return (
    <div className="app">
      <Header status={status} showStatus={viewMode === 'sections'} />

      {viewMode === 'super-modules' ? (
        <>
          <div className="super-modules-header">
            <h1 className="super-modules-title">Curso Completo de Python</h1>
            <p className="super-modules-subtitle">
              Acompaña tu camino a aprender Python
            </p>
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
        </>
      ) : (
        <>
          <div className="breadcrumb">
            <button onClick={handleBackToSuperModules} className="back-button">
              ← Volver al inicio
            </button>
            {activeSuperModule !== null && (
              <span className="current-super-module">
                {superModules[activeSuperModule].icon} {superModules[activeSuperModule].title}
              </span>
            )}
          </div>
          <Navigation
            sections={navItems}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
          <ProgressBar progress={progressData} />
          <main className="main-content">
            {isLoadingSection ? (
              <div className="loading-section">Cargando módulo...</div>
            ) : currentSection ? (
              <Section
                key={currentSection.id}
                section={currentSection}
                isActive={true}
                onRunCode={runCode}
                onExerciseComplete={handleExerciseComplete}
              />
            ) : null}
          </main>
        </>
      )}
      <ThemeToggle />
    </div>
  );
}

export default App;
