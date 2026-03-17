import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Terminal, Layers, Code2, Table2, TrendingUp, FolderKanban } from 'lucide-react';
import { usePyodide } from './hooks/usePyodide';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { ProgressBar } from './components/ProgressBar';
import { Section } from './components/Section';
import { ThemeToggle } from './components/ThemeToggle';
import { SuperModuleCard } from './components/SuperModuleCard';
import { sectionsMetadata, loadModule, getTotalExercisesCount, getExercisesCountForSuperModule } from './data/sections';
import { superModules } from './data/superModules';
import { cacheStorage } from './utils/cacheStorage';
import type { ProgressData, Section as SectionType } from './types';
import './styles/globals.css';

const iconMap: Record<string, typeof Terminal> = {
  Terminal, Layers, Code2, Table2, TrendingUp, FolderKanban,
};

type ViewMode = 'super-modules' | 'sections';

function App() {
  const { status, runCode } = usePyodide();
  const navigate = useNavigate();
  const params = useParams();

  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [savedCode, setSavedCode] = useState<Record<string, string>>({});
  const [currentSection, setCurrentSection] = useState<SectionType | null>(null);
  const [isLoadingSection, setIsLoadingSection] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Cargar datos del cache al iniciar
  useEffect(() => {
    const loadCachedData = async () => {
      const exercises = await cacheStorage.getCompletedExercises();
      const code = await cacheStorage.getExerciseCode();
      setCompletedExercises(exercises);
      setSavedCode(code);
      setIsDataLoaded(true);
    };
    loadCachedData();
  }, []);

  // Guardar ejercicios completados en cache
  useEffect(() => {
    if (isDataLoaded) {
      cacheStorage.saveCompletedExercises(completedExercises);
    }
  }, [completedExercises, isDataLoaded]);

  // Guardar código de ejercicios en cache
  useEffect(() => {
    if (isDataLoaded) {
      cacheStorage.saveExerciseCode(savedCode);
    }
  }, [savedCode, isDataLoaded]);

  // Parse URL params
  const superModuleIdFromUrl = params.superModuleId ? parseInt(params.superModuleId) : null;
  const sectionIdFromUrl = params.sectionId ? parseInt(params.sectionId) : null;

  const viewMode: ViewMode = superModuleIdFromUrl !== null ? 'sections' : 'super-modules';
  const activeSuperModule = superModuleIdFromUrl;
  const activeSection = sectionIdFromUrl ?? (activeSuperModule !== null ? superModules[activeSuperModule]?.sections[0] ?? 0 : 0);

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

  // Progress data - solo para el supermódulo actual
  const currentSuperModuleExercises = activeSuperModule !== null
    ? getExercisesCountForSuperModule(superModules[activeSuperModule].sections)
    : totalExercises;

  // Contar ejercicios completados solo del supermódulo actual
  const completedInCurrentSuperModule = activeSuperModule !== null
    ? Array.from(completedExercises).filter(exerciseId => {
        // El exerciseId tiene formato: "section-X-exercise-Y"
        const sectionId = parseInt(exerciseId.split('-')[1]);
        return superModules[activeSuperModule].sections.includes(sectionId);
      }).length
    : completedExercises.size;

  const progressData: ProgressData = {
    completedExercises,
    completedInCurrentScope: completedInCurrentSuperModule,
    totalExercises: currentSuperModuleExercises,
    percentage: currentSuperModuleExercises > 0
      ? (completedInCurrentSuperModule / currentSuperModuleExercises) * 100
      : 0,
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
    const firstSection = superModules[superModuleId].sections[0] || 0;
    const newPath = `/module/${superModuleId}/section/${firstSection}`;
    console.log('Navigating to:', newPath);
    navigate(newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSuperModules = () => {
    navigate('/');
    setCurrentSection(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionChange = (sectionId: number) => {
    if (activeSuperModule !== null) {
      navigate(`/module/${activeSuperModule}/section/${sectionId}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExerciseComplete = (exerciseId: string) => {
    setCompletedExercises((prev) => {
      const newSet = new Set(prev);
      newSet.add(exerciseId);
      return newSet;
    });
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
    const nextSectionMetadata = sectionsMetadata.find(s => s.id === nextSectionId);

    if (!nextSectionMetadata) return null;

    return {
      id: nextSectionId,
      title: `${nextSectionMetadata.title} ${nextSectionMetadata.titleHighlight}`.trim()
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
                <a href="/" className="nav-link active">Cursos</a>
                <a href="#" className="nav-link disabled">Proyectos</a>
                <a href="/guides" className="nav-link">Guías</a>
              </div>
            </div>
          </nav>
          <div className="super-modules-header">
            <h1 className="super-modules-title">
              Curso Completo de <span className="highlight-python">Python</span>
            </h1>
            <p className="super-modules-subtitle">
              Acompaña tu camino a aprender Python desde cero con ejercicios interactivos y casos de uso reales.
            </p>
          </div>
          <div className="modules-section">
            <div className="modules-section-header">
              <h2 className="modules-section-title">
                <span className="section-icon">📖</span> Módulos del Curso
              </h2>
              <div className="progress-indicator">
                {Math.round((completedExercises.size / totalExercises) * 100)}% Completado
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
              ← Volver al inicio
            </button>
            {activeSuperModule !== null && (() => {
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
              <div className="loading-section">Cargando módulo...</div>
            ) : currentSection ? (
              <Section
                key={currentSection.id}
                section={currentSection}
                isActive={true}
                onRunCode={runCode}
                onExerciseComplete={handleExerciseComplete}
                nextSection={getNextSection()}
                onNavigateToNext={handleNavigateToNextSection}
                savedCode={savedCode}
                onSaveCode={setSavedCode}
                completedExercises={completedExercises}
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
