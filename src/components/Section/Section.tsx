import type { Section as SectionType, ExerciseResult } from '../../types';
import { TheoryBlock } from '../TheoryBlock';
import { ExerciseCard } from '../ExerciseCard';

interface SectionProps {
  section: SectionType;
  isActive: boolean;
  onRunCode: (
    code: string,
    expectedOutput: string,
    customValidator?: (code: string, output: string) => { isValid: boolean; message?: string }
  ) => Promise<ExerciseResult>;
  onExerciseComplete: (exerciseId: string) => void;
}

export const Section = ({ section, isActive, onRunCode, onExerciseComplete }: SectionProps) => {
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
        <TheoryBlock key={index} block={block} />
      ))}

      {section.tipBox && (
        <div className="tip-box">
          <span className="tip-icon">{section.tipBox.icon}</span>
          <p dangerouslySetInnerHTML={{ __html: section.tipBox.content }} />
        </div>
      )}

      <div className="exercise-area">
        <div className="exercise-label">🧪 Práctica</div>
        <div className="exercise-title">
          {section.id === 6 ? 'Crea tus propias funciones' :
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
          />
        ))}
      </div>
    </div>
  );
};
