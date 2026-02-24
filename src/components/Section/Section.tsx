import type { Section as SectionType, ExerciseResult } from '../../types';
import { TheoryBlock } from '../TheoryBlock';
import { ExerciseCard } from '../ExerciseCard';
import { QuizCard } from '../QuizCard';

interface SectionProps {
  section: SectionType;
  isActive: boolean;
  onRunCode: (
    code: string,
    expectedOutput: string,
    customValidator?: (code: string, output: string) => { isValid: boolean; message?: string },
    initialCode?: string
  ) => Promise<ExerciseResult>;
  onExerciseComplete: (exerciseId: string) => void;
  nextSection?: { id: number; title: string } | null;
  onNavigateToNext?: () => void;
  savedCode: Record<string, string>;
  onSaveCode: (code: Record<string, string>) => void;
  completedExercises: Set<string>;
}

export const Section = ({
  section,
  isActive,
  onRunCode,
  onExerciseComplete,
  nextSection,
  onNavigateToNext,
  savedCode,
  onSaveCode,
  completedExercises
}: SectionProps) => {
  if (!isActive) return null;

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
                  onComplete={onExerciseComplete}
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
                  onRun={onRunCode}
                  onComplete={onExerciseComplete}
                  sectionInitialCode={section.initialCode}
                  savedCode={savedCode[exercise.id]}
                  onSaveCode={(code) => onSaveCode({ ...savedCode, [exercise.id]: code })}
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
          <div className="exercise-label">🧪 Práctica</div>
          <div className="exercise-title">
            {section.id === 6 ? 'Desafíos combinados' :
             section.id === 5 ? 'Usa diccionarios' :
             section.id === 4 ? 'Manipula listas' :
             section.id === 3 ? 'Trabaja con listas' :
             section.id === 2 ? 'Manipula cadenas de texto' :
             section.id === 1 ? 'Calcula con Python' :
             'Pon a prueba lo aprendido'}
          </div>

          {section.exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onRun={onRunCode}
              onComplete={onExerciseComplete}
              sectionInitialCode={section.initialCode}
              savedCode={savedCode[exercise.id]}
              onSaveCode={(code) => onSaveCode({ ...savedCode, [exercise.id]: code })}
              isCompleted={completedExercises.has(exercise.id)}
            />
          ))}
        </div>
      )}

      {nextSection && onNavigateToNext && (
        <div className="next-section-container">
          <button
            className="next-section-button"
            onClick={onNavigateToNext}
          >
            <span className="next-section-text">Siguiente sección</span>
            <span className="next-section-title">{nextSection.title}</span>
            <span className="next-section-arrow">→</span>
          </button>
        </div>
      )}
    </div>
  );
};
