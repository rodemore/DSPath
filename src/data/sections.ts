import type { Section } from '../types';

// Metadata de los módulos para navegación (siempre cargado)
export const sectionsMetadata = [
  { id: 0, moduleNumber: 'Módulo 01', title: 'Variables y', titleHighlight: 'Tipos de Datos' },
  { id: 1, moduleNumber: 'Módulo 02', title: 'Operaciones', titleHighlight: 'Numéricas' },
  { id: 2, moduleNumber: 'Módulo 03', title: 'Strings:', titleHighlight: 'Cadenas de Texto' },
  { id: 3, moduleNumber: 'Módulo 04', title: 'Listas 1', titleHighlight: 'Fundamentos' },
  { id: 4, moduleNumber: 'Módulo 05', title: 'Listas 2', titleHighlight: 'Métodos' },
  { id: 5, moduleNumber: 'Módulo 06', title: 'Diccionarios:', titleHighlight: 'Datos Clave-Valor' },
];

// Funciones de carga dinámica para cada módulo (lazy loading)
const moduleLoaders: Record<number, () => Promise<{ default: Section }>> = {
  0: () => import('../modules/module01-variables/content').then(m => ({ default: m.module01 })),
  1: () => import('../modules/module02-operations/content').then(m => ({ default: m.module02 })),
  2: () => import('../modules/module03-strings/content').then(m => ({ default: m.module03 })),
  3: () => import('../modules/module04-lists-intro/content').then(m => ({ default: m.module04 })),
  4: () => import('../modules/module05-lists-methods/content').then(m => ({ default: m.module05 })),
  5: () => import('../modules/module06-dictionaries/content').then(m => ({ default: m.module06 })),
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
  // TODO: Podríamos mover esto a metadata si crece mucho
  return 3 + 4 + 5 + 2 + 3 + 4; // Total: 21 ejercicios
};
