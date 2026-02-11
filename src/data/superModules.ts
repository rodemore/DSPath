import type { SuperModule } from '../types';

export const superModules: SuperModule[] = [
  {
    id: 0,
    title: 'Python Basics',
    description: 'Fundamentos de Python: variables, operaciones, strings, listas y diccionarios',
    icon: '🐍',
    isAvailable: true,
    sections: [0, 1, 2, 3, 4, 5, 6], // All current modules
    color: '#3b82f6', // Blue
  },
  {
    id: 1,
    title: 'Estructuras de Control y Bucles',
    description: 'Condicionales (if/else), bucles (for/while) y control de flujo',
    icon: '🔄',
    isAvailable: false,
    sections: [], // Will be populated later
    color: '#8b5cf6', // Purple
  },
  {
    id: 2,
    title: 'Funciones e Introducción a Librerías',
    description: 'Definición de funciones, parámetros, return y uso de librerías básicas',
    icon: '⚡',
    isAvailable: false,
    sections: [], // Will be populated later
    color: '#f59e0b', // Amber
  },
  {
    id: 3,
    title: 'Introducción a Pandas',
    description: 'Manipulación y análisis de datos con la librería Pandas',
    icon: '🐼',
    isAvailable: false,
    sections: [], // Will be populated later
    color: '#10b981', // Green
  },
];
