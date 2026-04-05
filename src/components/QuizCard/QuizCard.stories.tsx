import type { Meta, StoryObj } from '@storybook/react-vite';
import { QuizCard } from './QuizCard';
import type { Quiz } from '../../types';

/**
 * QuizCard component displays multiple-choice questions with instant feedback.
 */
const meta = {
  title: 'Components/QuizCard',
  component: QuizCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An interactive quiz component that allows users to select answers and receive immediate feedback.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onComplete: { action: 'quiz completed' },
    isCompleted: {
      control: 'boolean',
      description: 'Whether the quiz has been completed',
    },
  },
  args: {
    onComplete: () => {},
  },
} satisfies Meta<typeof QuizCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleQuiz: Quiz = {
  id: 'quiz-1',
  number: '1',
  question: '¿Qué es una variable en Python?',
  options: [
    {
      id: 'a',
      text: 'Un tipo de dato',
      isCorrect: false,
      feedback: 'No exactamente. Una variable almacena datos, pero no es un tipo de dato.',
    },
    {
      id: 'b',
      text: 'Un contenedor que almacena valores',
      isCorrect: true,
      feedback: '¡Exacto! Una variable es un contenedor que guarda valores en memoria.',
    },
    {
      id: 'c',
      text: 'Una función especial',
      isCorrect: false,
      feedback: 'Incorrecto. Las funciones son diferentes de las variables.',
    },
    {
      id: 'd',
      text: 'Un operador matemático',
      isCorrect: false,
      feedback: 'No. Los operadores realizan operaciones, las variables almacenan valores.',
    },
  ],
};

/**
 * Default quiz state - not yet completed
 */
export const Default: Story = {
  args: {
    quiz: sampleQuiz,
    isCompleted: false,
  },
};

/**
 * Quiz that has already been completed
 */
export const Completed: Story = {
  args: {
    quiz: sampleQuiz,
    isCompleted: true,
  },
};

/**
 * Quiz about Python data types
 */
export const DataTypesQuiz: Story = {
  args: {
    quiz: {
      id: 'quiz-2',
      number: '2',
      question: '¿Cuál de estos NO es un tipo de dato primitivo en Python?',
      options: [
        {
          id: 'a',
          text: 'int',
          isCorrect: false,
          feedback: 'int es un tipo primitivo para números enteros.',
        },
        {
          id: 'b',
          text: 'array',
          isCorrect: true,
          feedback: '¡Correcto! array no es un tipo primitivo. Python usa list en su lugar.',
        },
        {
          id: 'c',
          text: 'str',
          isCorrect: false,
          feedback: 'str es un tipo primitivo para cadenas de texto.',
        },
        {
          id: 'd',
          text: 'bool',
          isCorrect: false,
          feedback: 'bool es un tipo primitivo para valores booleanos.',
        },
      ],
    },
    isCompleted: false,
  },
};

/**
 * Quiz about operators
 */
export const OperatorsQuiz: Story = {
  args: {
    quiz: {
      id: 'quiz-3',
      number: '3',
      question: '¿Qué operador se usa para exponenciación en Python?',
      options: [
        {
          id: 'a',
          text: '^',
          isCorrect: false,
          feedback: 'En Python, ^ es el operador XOR, no exponenciación.',
        },
        {
          id: 'b',
          text: '**',
          isCorrect: true,
          feedback: '¡Perfecto! ** es el operador de exponenciación. Por ejemplo: 2**3 = 8',
        },
        {
          id: 'c',
          text: 'exp()',
          isCorrect: false,
          feedback: 'exp() es una función matemática, no un operador.',
        },
        {
          id: 'd',
          text: 'pow',
          isCorrect: false,
          feedback: 'pow() es una función, pero ** es el operador de exponenciación.',
        },
      ],
    },
    isCompleted: false,
  },
};

/**
 * Quiz with long question and answers
 */
export const LongContent: Story = {
  args: {
    quiz: {
      id: 'quiz-4',
      number: '4',
      question:
        'Si tienes una lista `numeros = [1, 2, 3, 4, 5]` y quieres obtener los primeros tres elementos, ¿qué expresión deberías usar?',
      options: [
        {
          id: 'a',
          text: 'numeros[0:3]',
          isCorrect: true,
          feedback:
            '¡Correcto! El slicing numeros[0:3] retorna los elementos en los índices 0, 1 y 2 (el 3 no se incluye).',
        },
        {
          id: 'b',
          text: 'numeros[1:3]',
          isCorrect: false,
          feedback: 'Esto retornaría [2, 3], solo dos elementos comenzando desde el índice 1.',
        },
        {
          id: 'c',
          text: 'numeros[:2]',
          isCorrect: false,
          feedback: 'Esto retornaría [1, 2], solo los primeros dos elementos.',
        },
        {
          id: 'd',
          text: 'numeros[0-3]',
          isCorrect: false,
          feedback: 'Esta no es una sintaxis válida en Python.',
        },
      ],
    },
    isCompleted: false,
  },
};

/**
 * Simple true/false quiz
 */
export const TrueFalseQuiz: Story = {
  args: {
    quiz: {
      id: 'quiz-5',
      number: '5',
      question: 'Python es un lenguaje de programación compilado.',
      options: [
        {
          id: 'a',
          text: 'Verdadero',
          isCorrect: false,
          feedback:
            'Incorrecto. Python es un lenguaje interpretado, aunque puede ser compilado a bytecode.',
        },
        {
          id: 'b',
          text: 'Falso',
          isCorrect: true,
          feedback:
            '¡Correcto! Python es principalmente un lenguaje interpretado, lo que lo hace más flexible.',
        },
      ],
    },
    isCompleted: false,
  },
};
