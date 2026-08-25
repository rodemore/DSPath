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
    title: 'Pandas - Lección 1: Intro y Lectura',
    description: 'Introducción a Pandas y lectura de DataFrames.',
    icon: 'Table2',
    isAvailable: true,
    sections: [12, 13], // Intro y Lectura
    color: '#10b981', // Green
  },
  {
    id: 2,
    title: 'Pandas - Lección 2: Filtros y Operaciones',
    description: 'Aprende a filtrar datos y realizar operaciones básicas con Pandas.',
    icon: 'TrendingUp',
    isAvailable: true,
    sections: [15, 16], // Filtros y Operaciones
    color: '#06b6d4', // Cyan
  },
];
