import { useState } from 'react';
import type { Quiz, QuizOption } from '../../types';
import './QuizCard.css';

interface QuizCardProps {
  quiz: Quiz;
  onComplete: (quizId: string) => void;
}

export const QuizCard = ({ quiz, onComplete }: QuizCardProps) => {
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
    const selected = quiz.options.find(opt => opt.id === selectedOption);

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
    if (isSubmitted && selectedOption) {
      const selected = quiz.options.find(opt => opt.id === selectedOption);
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

  return (
    <div className={getCardClassName()} id={quiz.id}>
      <div className="quiz-number">{quiz.number}</div>
      <div className="quiz-question">{quiz.question}</div>

      <div className="quiz-options">
        {quiz.options.map((option) => (
          <div
            key={option.id}
            className={getOptionClassName(option)}
            onClick={() => handleOptionSelect(option.id)}
          >
            <div className="quiz-option-radio">
              {selectedOption === option.id && <div className="quiz-option-radio-selected"></div>}
            </div>
            <div className="quiz-option-text">{option.text}</div>
          </div>
        ))}
      </div>

      {feedback && (
        <div className={`quiz-feedback ${quiz.options.find(opt => opt.id === selectedOption)?.isCorrect ? 'success' : 'error'}`}>
          {feedback}
        </div>
      )}

      <div className="quiz-actions">
        <button
          className="btn btn-submit"
          onClick={handleSubmit}
          disabled={!selectedOption || isSubmitted}
        >
          ✓ Verificar
        </button>
        {isSubmitted && !quiz.options.find(opt => opt.id === selectedOption)?.isCorrect && (
          <button className="btn btn-reset" onClick={handleReset}>
            ↺ Intentar de nuevo
          </button>
        )}
      </div>
    </div>
  );
};
