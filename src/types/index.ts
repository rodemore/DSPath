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

export interface TheoryBlock {
  icon: string;
  title: string;
  content: string | string[];
  codeExample?: CodeExample;
  table?: InfoTable;
  exercises?: Exercise[];
}

export type ValidationMode = 'exact' | 'custom';

export interface Exercise {
  id: string;
  number: string;
  description: string;
  expectedOutput: string;
  initialCode?: string;
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
  icon: string;
  isAvailable: boolean;
  sections: number[]; // IDs of sections that belong to this super module
  color: string; // For theming
}
