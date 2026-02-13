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

// Calcular total de ejercicios sin cargar módulos completos
export const getTotalExercisesCount = (): number => {
  // Hardcodeado por ahora para evitar cargar todos los módulos
  // Módulos 1-7: Python Basics
  // Módulos 8-12: Estructuras de Control y Bucles
  return 3 + 4 + 7 + 2 + 6 + 5 + 9 + 5 + 5 + 5 + 4 + 9; // Total: 64 ejercicios
};
