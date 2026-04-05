import { useState, memo } from 'react';
import type { Quiz, QuizOption } from '../../types';
import './QuizCard.css';

interface QuizCardProps {
  quiz: Quiz;
  onComplete: (quizId: string) => void;
  isCompleted?: boolean;
}

export const QuizCard = memo(function QuizCard({
  quiz,
  onComplete,
  isCompleted = false,
}: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleOptionSelect = (optionId: string) => {
    if (!isSubmitted) {
      setSelectedOption(optionId);
    }
  };

  const handleSubmit = () => {
    if (!selectedOption) return;

    setIsSubmitted(true);
    const selected = quiz.options.find((opt) => opt.id === selectedOption);

    if (selected) {
      if (selected.isCorrect) {
        setFeedback('¡Correcto! ' + (selected.feedback || ''));
        onComplete(quiz.id);
      } else {
        setFeedback(selected.feedback || 'Incorrecto. Intenta de nuevo.');
      }
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setFeedback(null);
  };

  const getCardClassName = () => {
    let className = 'quiz-card';
    if (isCompleted) className += ' completed';
    if (isSubmitted && selectedOption) {
      const selected = quiz.options.find((opt) => opt.id === selectedOption);
      if (selected?.isCorrect) {
        className += ' success';
      } else {
        className += ' error';
      }
    }
    return className;
  };

  const getOptionClassName = (option: QuizOption) => {
    let className = 'quiz-option';

    if (selectedOption === option.id) {
      className += ' selected';
    }

    if (isSubmitted && selectedOption === option.id) {
      if (option.isCorrect) {
        className += ' correct';
      } else {
        className += ' incorrect';
      }
    }

    if (isSubmitted) {
      className += ' disabled';
    }

    return className;
  };

  const handleKeyDown = (optionId: string, event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOptionSelect(optionId);
    }
  };

  return (
    <div
      className={getCardClassName()}
      id={quiz.id}
      role="region"
      aria-labelledby={`quiz-question-${quiz.id}`}
    >
      <div className="quiz-number" aria-hidden="true">
        {isCompleted ? `✓ ${quiz.number}` : quiz.number}
      </div>
      <div className="quiz-question" id={`quiz-question-${quiz.id}`}>
        {quiz.question}
      </div>

      <div className="quiz-options" role="radiogroup" aria-labelledby={`quiz-question-${quiz.id}`}>
        {quiz.options.map((option) => (
          <div
            key={option.id}
            className={getOptionClassName(option)}
            onClick={() => handleOptionSelect(option.id)}
            onKeyDown={(e) => handleKeyDown(option.id, e)}
            role="radio"
            aria-checked={selectedOption === option.id}
            aria-disabled={isSubmitted}
            tabIndex={isSubmitted ? -1 : 0}
          >
            <div className="quiz-option-radio" aria-hidden="true">
              {selectedOption === option.id && <div className="quiz-option-radio-selected"></div>}
            </div>
            <div className="quiz-option-text">{option.text}</div>
          </div>
        ))}
      </div>

      {feedback && (
        <div
          className={`quiz-feedback ${quiz.options.find((opt) => opt.id === selectedOption)?.isCorrect ? 'success' : 'error'}`}
          role="alert"
          aria-live="polite"
        >
          {feedback}
        </div>
      )}

      <div className="quiz-actions">
        <button
          className="btn btn-submit"
          onClick={handleSubmit}
          disabled={!selectedOption || isSubmitted}
          aria-label={`Verificar respuesta para la pregunta ${quiz.number}`}
        >
          ✓ Verificar
        </button>
        {isSubmitted && !quiz.options.find((opt) => opt.id === selectedOption)?.isCorrect && (
          <button className="btn btn-reset" onClick={handleReset} aria-label="Intentar de nuevo">
            ↺ Intentar de nuevo
          </button>
        )}
      </div>
    </div>
  );
});
