import type { SuperModule } from '../types';

export const superModules: SuperModule[] = [
  {
    id: 0,
    title: 'Python Basics',
    description: 'Fundamentos de Python: variables, operaciones, strings, listas y diccionarios.',
    icon: 'Terminal',
    isAvailable: true,
    sections: [0, 1, 2, 3, 4, 5, 6],
    color: '#3b82f6', // Blue
  },
  {
    id: 1,
    title: 'Pandas - Fundamentos',
    description: 'Introducción a Pandas: lectura, selección, filtros y operaciones con DataFrames.',
    icon: 'Table2',
    isAvailable: true,
    sections: [12, 13, 14, 15, 16], // Intro, Lectura, Selección, Filtros, Operaciones
    color: '#10b981', // Green
  },
];
