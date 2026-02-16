// Core types for PyLab application

export interface CodeExample {
  filename: string;
  code: string;
  language?: string;
}

export interface TableRow {
  [key: string]: string | number;
}

export interface InfoTable {
  headers: string[];
  rows: TableRow[];
}

export interface TerminalCommand {
  command: string;
  description?: string;
}

export interface TheoryBlock {
  icon: string;
  title: string;
  content: string | string[];
  codeExample?: CodeExample;
  terminalCommand?: TerminalCommand;
  table?: InfoTable;
  exercises?: Exercise[];
  quizzes?: Quiz[]; // Nueva propiedad para quizzes
}

export type ValidationMode = 'exact' | 'custom';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback?: string; // Feedback específico cuando se selecciona esta opción
}

export interface Quiz {
  id: string;
  number: string;
  question: string;
  options: QuizOption[];
}

export interface Exercise {
  id: string;
  number: string;
  description: string;
  expectedOutput: string;
  initialCode?: string;
  starterCode?: string; // Código base que aparece por defecto y se mantiene al limpiar
  hints?: string[];
  validationMode?: ValidationMode;
  customValidator?: (code: string, output: string) => { isValid: boolean; message?: string };
}

export interface Section {
  id: number;
  moduleNumber: string;
  title: string;
  titleHighlight: string;
  theoryBlocks: TheoryBlock[];
  tipBox?: {
    icon: string;
    content: string;
  };
  exercises: Exercise[];
  initialCode?: string; // Código que se ejecuta antes de cada ejercicio (invisible para el estudiante)
}

export interface PyodideStatus {
  isReady: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ExerciseResult {
  isCorrect: boolean;
  output: string;
  error: string | null;
}

export interface ProgressData {
  completedExercises: Set<string>;
  totalExercises: number;
  percentage: number;
}

export interface SuperModule {
  id: number;
  title: string;
  description: string;
  icon: string; // Icon name from lucide-react
  isAvailable: boolean;
  sections: number[]; // IDs of sections that belong to this super module
  color: string; // For theming
}
