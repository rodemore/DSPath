import type { Section as SectionType } from '../../types';
import { useTranslation } from 'react-i18next';
import { sectionsMetadata } from '@data/sections';
import { useProgressStore } from '@/stores/progressStore';
import { TheoryBlock } from '../TheoryBlock';
import { ExerciseCard } from '../ExerciseCard';
import { QuizCard } from '../QuizCard';

interface SectionProps {
  section: SectionType;
  isActive: boolean;
  nextSection?: { id: number; title: string } | null;
  onNavigateToNext?: () => void;
}

export const Section = ({ section, isActive, nextSection, onNavigateToNext }: SectionProps) => {
  const { t } = useTranslation('exercises');
  const { completedExercises, savedCode, addCompletedExercise, setSavedCode } = useProgressStore();

  if (!isActive) return null;

  // Get metadata for this section
  const sectionMeta = sectionsMetadata.find((meta) => meta.id === section.id);
  const exerciseAreaTitle = sectionMeta?.exerciseAreaTitle || 'Pon a prueba lo aprendido';

  const handleExerciseComplete = (exerciseId: string) => {
    addCompletedExercise(exerciseId);
  };

  const handleSaveCode = (exerciseId: string, code: string) => {
    setSavedCode({ ...savedCode, [exerciseId]: code });
  };

  return (
    <div className="section active">
      <div className="section-header">
        <div className="section-number">{section.moduleNumber}</div>
        <h2 className="section-title">
          {section.title} <span className="highlight">{section.titleHighlight}</span>
        </h2>
      </div>

      {section.theoryBlocks.map((block, index) => (
        <div key={index}>
          <TheoryBlock block={block} />
          {block.quizzes && block.quizzes.length > 0 && (
            <div className="quiz-area inline-quizzes">
              {block.quizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onComplete={handleExerciseComplete}
                  isCompleted={completedExercises.has(quiz.id)}
                />
              ))}
            </div>
          )}
          {block.exercises && block.exercises.length > 0 && (
            <div className="exercise-area inline-exercises">
              {block.exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  onComplete={handleExerciseComplete}
                  sectionInitialCode={section.initialCode}
                  savedCode={savedCode[exercise.id]}
                  onSaveCode={(code) => handleSaveCode(exercise.id, code)}
                  isCompleted={completedExercises.has(exercise.id)}
                />
              ))}
            </div>
          )}
        </div>
      ))}

      {section.tipBox && (
        <div className="tip-box">
          <span className="tip-icon">{section.tipBox.icon}</span>
          <p dangerouslySetInnerHTML={{ __html: section.tipBox.content }} />
        </div>
      )}

      {section.exercises && section.exercises.length > 0 && (
        <div className="exercise-area">
          <div className="exercise-label">🧪 {t('exercise.practice')}</div>
          <div className="exercise-title">{exerciseAreaTitle}</div>

          {section.exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onComplete={handleExerciseComplete}
              sectionInitialCode={section.initialCode}
              savedCode={savedCode[exercise.id]}
              onSaveCode={(code) => handleSaveCode(exercise.id, code)}
              isCompleted={completedExercises.has(exercise.id)}
            />
          ))}
        </div>
      )}

      {nextSection && onNavigateToNext && (
        <div className="next-section-container">
          <button className="next-section-button" onClick={onNavigateToNext}>
            <span className="next-section-text">{t('exercise.nextSection')}</span>
            <span className="next-section-title">{nextSection.title}</span>
            <span className="next-section-arrow">→</span>
          </button>
        </div>
      )}
    </div>
  );
};
