import { useState, useEffect } from 'react';
import { usePyodide } from './hooks/usePyodide';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { ProgressBar } from './components/ProgressBar';
import { Section } from './components/Section';
import { ThemeToggle } from './components/ThemeToggle';
import { sectionsMetadata, loadModule, getTotalExercisesCount } from './data/sections';
import type { ProgressData, Section as SectionType } from './types';
import './styles/globals.css';

function App() {
  const { status, runCode } = usePyodide();
  const [activeSection, setActiveSection] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [currentSection, setCurrentSection] = useState<SectionType | null>(null);
  const [isLoadingSection, setIsLoadingSection] = useState(true);

  // Calculate total exercises
  const totalExercises = getTotalExercisesCount();

  // Load module when active section changes
  useEffect(() => {
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
  }, [activeSection]);

  // Progress data
  const progressData: ProgressData = {
    completedExercises,
    totalExercises,
    percentage: totalExercises > 0 ? (completedExercises.size / totalExercises) * 100 : 0,
  };

  // Navigation items
  const navItems = sectionsMetadata.map((section) => ({
    id: section.id,
    title: section.title.replace(':', '').replace(' y', '').trim(),
  }));

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
      <Header status={status} />
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
      <ThemeToggle />
    </div>
  );
}

export default App;
