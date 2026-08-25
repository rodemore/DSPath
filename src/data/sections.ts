import type { Section } from '../types';

// Metadata de los módulos para navegación (siempre cargado)
export const sectionsMetadata = [
  {
    id: 0,
    moduleNumber: 'Módulo 01',
    title: 'Variables y',
    titleHighlight: 'Tipos de Datos',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
  {
    id: 1,
    moduleNumber: 'Módulo 02',
    title: 'Operaciones',
    titleHighlight: 'Numéricas',
    exerciseAreaTitle: 'Calcula con Python',
  },
  {
    id: 2,
    moduleNumber: 'Módulo 03',
    title: 'Strings:',
    titleHighlight: 'Cadenas de Texto',
    exerciseAreaTitle: 'Manipula cadenas de texto',
  },
  {
    id: 3,
    moduleNumber: 'Módulo 04',
    title: 'Listas 1',
    titleHighlight: 'Fundamentos',
    exerciseAreaTitle: 'Trabaja con listas',
  },
  {
    id: 4,
    moduleNumber: 'Módulo 05',
    title: 'Listas 2',
    titleHighlight: 'Métodos',
    exerciseAreaTitle: 'Manipula listas',
  },
  {
    id: 5,
    moduleNumber: 'Módulo 06',
    title: 'Diccionarios:',
    titleHighlight: 'Datos Clave-Valor',
    exerciseAreaTitle: 'Usa diccionarios',
  },
  {
    id: 6,
    moduleNumber: 'Módulo 07',
    title: 'Misceláneos:',
    titleHighlight: 'Desafíos Combinados',
    exerciseAreaTitle: 'Desafíos combinados',
  },
  {
    id: 7,
    moduleNumber: 'Módulo 08',
    title: 'Condicionales 1:',
    titleHighlight: 'Comparaciones y IF',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
  {
    id: 8,
    moduleNumber: 'Módulo 09',
    title: 'Condicionales 2:',
    titleHighlight: 'IF-ELSE e IF-ELIF-ELSE',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
  {
    id: 9,
    moduleNumber: 'Módulo 10',
    title: 'Bucle FOR:',
    titleHighlight: 'Iteración sobre Secuencias',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
  {
    id: 10,
    moduleNumber: 'Módulo 11',
    title: 'Bucle WHILE:',
    titleHighlight: 'Repetición Condicional',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
  {
    id: 11,
    moduleNumber: 'Módulo 12',
    title: 'Desafíos:',
    titleHighlight: 'Integrando Conceptos',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
  {
    id: 12,
    moduleNumber: 'Módulo 13',
    title: 'Intro',
    titleHighlight: '',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
  {
    id: 13,
    moduleNumber: 'Módulo 14',
    title: 'Lectura',
    titleHighlight: '',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
  {
    id: 14,
    moduleNumber: 'Módulo 15',
    title: 'Selección',
    titleHighlight: '',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
  {
    id: 15,
    moduleNumber: 'Módulo 16',
    title: 'Filtros',
    titleHighlight: '',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
  {
    id: 16,
    moduleNumber: 'Módulo 17',
    title: 'Operaciones',
    titleHighlight: '',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
  {
    id: 17,
    moduleNumber: 'Módulo 18',
    title: '.str',
    titleHighlight: '',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
  {
    id: 18,
    moduleNumber: 'Módulo 19',
    title: 'Agregaciones',
    titleHighlight: '',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
  {
    id: 19,
    moduleNumber: 'Módulo 20',
    title: 'Filtros 2',
    titleHighlight: '',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
  {
    id: 20,
    moduleNumber: 'Módulo 21',
    title: 'GroupBy',
    titleHighlight: '',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
  {
    id: 21,
    moduleNumber: 'Módulo 22',
    title: 'GroupBy + Agg',
    titleHighlight: '',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
  {
    id: 22,
    moduleNumber: 'Módulo 23',
    title: 'Sort & Top',
    titleHighlight: '',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
  {
    id: 23,
    moduleNumber: 'Módulo 24',
    title: 'Concat & Merge',
    titleHighlight: '',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
  {
    id: 24,
    moduleNumber: 'Módulo 25',
    title: 'Apply',
    titleHighlight: '',
    exerciseAreaTitle: 'Pon a prueba lo aprendido',
  },
];

// Funciones de carga dinámica para cada módulo (lazy loading)
const moduleLoaders: Record<number, () => Promise<{ default: Section }>> = {
  0: () => import('../modules/module01-variables/content').then((m) => ({ default: m.module01 })),
  1: () => import('../modules/module02-operations/content').then((m) => ({ default: m.module02 })),
  2: () => import('../modules/module03-strings/content').then((m) => ({ default: m.module03 })),
  3: () => import('../modules/module04-lists-intro/content').then((m) => ({ default: m.module04 })),
  4: () =>
    import('../modules/module05-lists-methods/content').then((m) => ({ default: m.module05 })),
  5: () =>
    import('../modules/module06-dictionaries/content').then((m) => ({ default: m.module06 })),
  6: () =>
    import('../modules/module07-miscellaneous/content').then((m) => ({ default: m.module07 })),
  7: () =>
    import('../modules/module08-conditionals-1/content').then((m) => ({ default: m.module08 })),
  8: () =>
    import('../modules/module09-conditionals-2/content').then((m) => ({ default: m.module09 })),
  9: () => import('../modules/module10-for-loop/content').then((m) => ({ default: m.module10 })),
  10: () => import('../modules/module11-while-loop/content').then((m) => ({ default: m.module11 })),
  11: () =>
    import('../modules/module12-integrative-challenges/content').then((m) => ({
      default: m.module12,
    })),
  12: () =>
    import('../modules/module13-pandas-intro/content').then((m) => ({ default: m.module13 })),
  13: () =>
    import('../modules/module14-pandas-dataframes/content').then((m) => ({ default: m.module14 })),
  14: () =>
    import('../modules/module15-pandas-selection/content').then((m) => ({ default: m.module15 })),
  15: () =>
    import('../modules/module16-pandas-filters/content').then((m) => ({ default: m.module16 })),
  16: () =>
    import('../modules/module17-pandas-new-columns/content').then((m) => ({ default: m.module17 })),
  17: () => import('../modules/module18-pandas-str/content').then((m) => ({ default: m.module18 })),
  18: () =>
    import('../modules/module19-pandas-aggregations/content').then((m) => ({
      default: m.module19,
    })),
  19: () =>
    import('../modules/module20-pandas-filters-advanced/content').then((m) => ({
      default: m.module20,
    })),
  20: () =>
    import('../modules/module21-pandas-groupby/content').then((m) => ({ default: m.module21 })),
  21: () =>
    import('../modules/module22-pandas-groupby-agg/content').then((m) => ({ default: m.module22 })),
  22: () =>
    import('../modules/module23-pandas-sort-top/content').then((m) => ({ default: m.module23 })),
  23: () =>
    import('../modules/module24-pandas-concat-merge/content').then((m) => ({
      default: m.module24,
    })),
  24: () =>
    import('../modules/module25-pandas-apply/content').then((m) => ({ default: m.module25 })),
  25: () =>
    import('../modules/module26-pandas-apply-columns/content').then((m) => ({
      default: m.module26,
    })),
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
  0: 3, // Variables
  1: 4, // Operaciones
  2: 7, // Strings
  3: 2, // Listas 1
  4: 6, // Listas 2
  5: 5, // Diccionarios
  6: 9, // Misceláneos
  7: 6, // Condicionales 1 (agregamos ejercicio de IN)
  8: 5, // Condicionales 2
  9: 5, // Bucle FOR
  10: 4, // Bucle WHILE
  11: 9, // Desafíos
  12: 2, // Pandas 0 - Introducción a Pandas (2 quizzes)
  13: 3, // Pandas 1 - Lectura de DataFrames
  14: 5, // Pandas 2 - iloc/loc y Selección (3 ejercicios + 2 quizzes)
  15: 4, // Pandas 3 - Filtros y Operadores Lógicos (4 ejercicios)
  16: 3, // Pandas 5 - Operaciones (3 ejercicios)
  17: 3, // Pandas 6 - Strings .str (3 ejercicios)
  18: 5, // Pandas 7 - Agregaciones (5 ejercicios)
  19: 3, // Pandas 8 - Filtros Avanzados (3 ejercicios: isin, between, query)
  20: 3, // Pandas 9 - GroupBy básico (3 ejercicios)
  21: 3, // Pandas 10 - GroupBy + .agg() (3 ejercicios)
  22: 4, // Pandas 11 - Sort & Top (4 ejercicios)
  23: 4, // Pandas 12 - Concat & Merge (4 ejercicios)
  24: 4, // Pandas 13 - Apply (4 ejercicios)
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
