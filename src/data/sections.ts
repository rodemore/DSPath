import type { Section } from '../types';

// Metadata de los módulos para navegación (siempre cargado)
export const sectionsMetadata = [
  { id: 0, moduleNumber: 'Módulo 01', title: 'Variables y', titleHighlight: 'Tipos de Datos' },
  { id: 1, moduleNumber: 'Módulo 02', title: 'Operaciones', titleHighlight: 'Numéricas' },
  { id: 2, moduleNumber: 'Módulo 03', title: 'Strings:', titleHighlight: 'Cadenas de Texto' },
  { id: 3, moduleNumber: 'Módulo 04', title: 'Listas 1', titleHighlight: 'Fundamentos' },
  { id: 4, moduleNumber: 'Módulo 05', title: 'Listas 2', titleHighlight: 'Métodos' },
  { id: 5, moduleNumber: 'Módulo 06', title: 'Diccionarios:', titleHighlight: 'Datos Clave-Valor' },
  { id: 6, moduleNumber: 'Módulo 07', title: 'Misceláneos:', titleHighlight: 'Desafíos Combinados' },
  { id: 7, moduleNumber: 'Módulo 08', title: 'Condicionales 1:', titleHighlight: 'Comparaciones y IF' },
  { id: 8, moduleNumber: 'Módulo 09', title: 'Condicionales 2:', titleHighlight: 'IF-ELSE e IF-ELIF-ELSE' },
  { id: 9, moduleNumber: 'Módulo 10', title: 'Bucle FOR:', titleHighlight: 'Iteración sobre Secuencias' },
  { id: 10, moduleNumber: 'Módulo 11', title: 'Bucle WHILE:', titleHighlight: 'Repetición Condicional' },
  { id: 11, moduleNumber: 'Módulo 12', title: 'Desafíos:', titleHighlight: 'Integrando Conceptos' },
  { id: 12, moduleNumber: 'Módulo 13', title: 'Intro', titleHighlight: '' },
  { id: 13, moduleNumber: 'Módulo 14', title: 'Lectura', titleHighlight: '' },
  { id: 14, moduleNumber: 'Módulo 15', title: 'Selección', titleHighlight: '' },
  { id: 15, moduleNumber: 'Módulo 16', title: 'Filtros', titleHighlight: '' },
  { id: 16, moduleNumber: 'Módulo 17', title: 'Filtros 2', titleHighlight: '' },
];

// Funciones de carga dinámica para cada módulo (lazy loading)
const moduleLoaders: Record<number, () => Promise<{ default: Section }>> = {
  0: () => import('../modules/module01-variables/content').then(m => ({ default: m.module01 })),
  1: () => import('../modules/module02-operations/content').then(m => ({ default: m.module02 })),
  2: () => import('../modules/module03-strings/content').then(m => ({ default: m.module03 })),
  3: () => import('../modules/module04-lists-intro/content').then(m => ({ default: m.module04 })),
  4: () => import('../modules/module05-lists-methods/content').then(m => ({ default: m.module05 })),
  5: () => import('../modules/module06-dictionaries/content').then(m => ({ default: m.module06 })),
  6: () => import('../modules/module07-miscellaneous/content').then(m => ({ default: m.module07 })),
  7: () => import('../modules/module08-conditionals-1/content').then(m => ({ default: m.module08 })),
  8: () => import('../modules/module09-conditionals-2/content').then(m => ({ default: m.module09 })),
  9: () => import('../modules/module10-for-loop/content').then(m => ({ default: m.module10 })),
  10: () => import('../modules/module11-while-loop/content').then(m => ({ default: m.module11 })),
  11: () => import('../modules/module12-integrative-challenges/content').then(m => ({ default: m.module12 })),
  12: () => import('../modules/module13-pandas-intro/content').then(m => ({ default: m.module13 })),
  13: () => import('../modules/module14-pandas-dataframes/content').then(m => ({ default: m.module14 })),
  14: () => import('../modules/module15-pandas-selection/content').then(m => ({ default: m.module15 })),
  15: () => import('../modules/module16-pandas-filters/content').then(m => ({ default: m.module16 })),
  16: () => import('../modules/module17-pandas-filters-advanced/content').then(m => ({ default: m.module17 })),
};

// Función para cargar un módulo específico
export const loadModule = async (moduleId: number): Promise<Section> => {
  const loader = moduleLoaders[moduleId];
  if (!loader) {
    throw new Error(`Module ${moduleId} not found`);
  }
  const module = await loader();
  return module.default;
};

// Conteo de ejercicios por módulo (hardcodeado para evitar cargar módulos completos)
const exercisesPerSection: Record<number, number> = {
  0: 3,   // Variables
  1: 4,   // Operaciones
  2: 7,   // Strings
  3: 2,   // Listas 1
  4: 6,   // Listas 2
  5: 5,   // Diccionarios
  6: 9,   // Misceláneos
  7: 6,   // Condicionales 1 (agregamos ejercicio de IN)
  8: 5,   // Condicionales 2
  9: 5,   // Bucle FOR
  10: 4,  // Bucle WHILE
  11: 9,  // Desafíos
  12: 2,  // Pandas 0 - Introducción a Pandas (2 quizzes)
  13: 3,  // Pandas 1 - Lectura de DataFrames
  14: 5,  // Pandas 2 - iloc/loc y Selección (3 ejercicios + 2 quizzes)
  15: 4,  // Pandas 3 - Filtros y Operadores Lógicos (4 ejercicios)
  16: 3,  // Pandas 4 - Filtros Avanzados (3 ejercicios: isin, between, query)
};

// Calcular total de ejercicios sin cargar módulos completos
export const getTotalExercisesCount = (): number => {
  return Object.values(exercisesPerSection).reduce((sum, count) => sum + count, 0);
};

// Calcular total de ejercicios para un supermódulo específico
export const getExercisesCountForSuperModule = (sectionIds: number[]): number => {
  return sectionIds.reduce((sum, sectionId) => {
    return sum + (exercisesPerSection[sectionId] || 0);
  }, 0);
};
