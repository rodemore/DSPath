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
    title: 'Estructuras de Control y Bucles',
    description: 'Condicionales (if/else), bucles (for/while) y control de flujo avanzado.',
    icon: 'Layers',
    isAvailable: true,
    sections: [7, 8, 9, 10, 11],
    color: '#8b5cf6', // Purple
  },
  {
    id: 2,
    title: 'Funciones e Introducción a Librerías',
    description: 'Definición de funciones, parámetros, return y uso de librerías básicas.',
    icon: 'Code2',
    isAvailable: false,
    sections: [], // Will be populated later
    color: '#f59e0b', // Amber
  },
  {
    id: 3,
    title: 'Introducción a Pandas',
    description: 'Manipulación y análisis de datos con la librería líder en Data Science.',
    icon: 'Database',
    isAvailable: true,
    sections: [12, 13, 14, 15, 16], // Módulo 13-17: Intro, Lectura, Selección, Filtros, Filtros Avanzados
    color: '#10b981', // Green
  },
  {
    id: 4,
    title: 'Proyectos Prácticos',
    description: 'Desarrolla proyectos reales aplicando todos los conocimientos adquiridos.',
    icon: 'FolderKanban',
    isAvailable: false,
    sections: [], // Will be populated later
    color: '#ec4899', // Pink
  },
];
