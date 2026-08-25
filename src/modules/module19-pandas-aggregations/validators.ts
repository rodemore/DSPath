// Validadores para Módulo 20: Pandas - Funciones de agregación

// Ejercicio 20.1: .mean() y .sum() en columnas numéricas
export const validateMeanSum = (
  code: string,
  output: string
): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]tips\.csv['"]/.test(code);
  if (!hasReadCsv) {
    return {
      isValid: false,
      message: 'Debes cargar el dataset con pd.read_csv("tips.csv", sep="|")',
    };
  }

  const hasMean = /\.mean\s*\(\s*\)/.test(code);
  if (!hasMean) {
    return { isValid: false, message: 'Debes usar .mean() para calcular el promedio' };
  }

  const hasSum = /\.sum\s*\(\s*\)/.test(code);
  if (!hasSum) {
    return { isValid: false, message: 'Debes usar .sum() para calcular la suma' };
  }

  const hasTotalBill = /['"]total_bill['"]/.test(code);
  if (!hasTotalBill) {
    return { isValid: false, message: 'Debes aplicar las funciones sobre la columna "total_bill"' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir los resultados' };
  }

  // El promedio de total_bill en el dataset tips es ~19.78
  const hasNumericOutput = /1[5-9]\.\d+|2[0-4]\.\d+/.test(output);
  if (!hasNumericOutput) {
    return {
      isValid: false,
      message: 'El output debe mostrar el promedio de total_bill (debería ser ~19.78)',
    };
  }

  return { isValid: true };
};

// Ejercicio 20.2: .max() y .min()
export const validateMaxMin = (
  code: string,
  output: string
): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]tips\.csv['"]/.test(code);
  if (!hasReadCsv) {
    return {
      isValid: false,
      message: 'Debes cargar el dataset con pd.read_csv("tips.csv", sep="|")',
    };
  }

  const hasMax = /\.max\s*\(\s*\)/.test(code);
  if (!hasMax) {
    return { isValid: false, message: 'Debes usar .max() para encontrar el máximo' };
  }

  const hasMin = /\.min\s*\(\s*\)/.test(code);
  if (!hasMin) {
    return { isValid: false, message: 'Debes usar .min() para encontrar el mínimo' };
  }

  const hasTipColumn = /['"]tip['"]/.test(code);
  if (!hasTipColumn) {
    return { isValid: false, message: 'Debes aplicar .max() y .min() sobre la columna "tip"' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir los resultados' };
  }

  // La propina máxima en tips es 10.0 y la mínima es 1.0
  const hasMaxValue = /10\.0|10$/.test(output);
  const hasMinValue = /1\.0|^1$/.test(output);
  if (!hasMaxValue || !hasMinValue) {
    return {
      isValid: false,
      message: 'El output debe mostrar el máximo (10.0) y mínimo (1.0) de la columna tip',
    };
  }

  return { isValid: true };
};

// Ejercicio 20.3: .median()
export const validateMedian = (
  code: string,
  output: string
): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]tips\.csv['"]/.test(code);
  if (!hasReadCsv) {
    return {
      isValid: false,
      message: 'Debes cargar el dataset con pd.read_csv("tips.csv", sep="|")',
    };
  }

  const hasMedian = /\.median\s*\(\s*\)/.test(code);
  if (!hasMedian) {
    return { isValid: false, message: 'Debes usar .median() para calcular la mediana' };
  }

  const hasTotalBill = /['"]total_bill['"]/.test(code);
  if (!hasTotalBill) {
    return { isValid: false, message: 'Debes calcular la mediana de la columna "total_bill"' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  // La mediana de total_bill en tips es 17.795
  const hasMedianValue = /17\.[67]\d*|17\.8\d*/.test(output);
  if (!hasMedianValue) {
    return {
      isValid: false,
      message: 'El output debe mostrar la mediana de total_bill (debería ser ~17.80)',
    };
  }

  return { isValid: true };
};

// Ejercicio 20.4: .nunique() y .unique()
export const validateNuniqueUnique = (
  code: string,
  output: string
): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]tips\.csv['"]/.test(code);
  if (!hasReadCsv) {
    return {
      isValid: false,
      message: 'Debes cargar el dataset con pd.read_csv("tips.csv", sep="|")',
    };
  }

  const hasNunique = /\.nunique\s*\(\s*\)/.test(code);
  if (!hasNunique) {
    return { isValid: false, message: 'Debes usar .nunique() para contar los valores únicos' };
  }

  const hasUnique = /\.unique\s*\(\s*\)/.test(code);
  if (!hasUnique) {
    return { isValid: false, message: 'Debes usar .unique() para ver los valores únicos' };
  }

  const hasDayColumn = /['"]day['"]/.test(code);
  if (!hasDayColumn) {
    return { isValid: false, message: 'Aplica .nunique() y .unique() sobre la columna "day"' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir los resultados' };
  }

  // day tiene 4 valores únicos: Sun, Sat, Thur, Fri
  const hasFourDays = output.includes('4') || (output.includes('Sun') && output.includes('Sat'));
  if (!hasFourDays) {
    return {
      isValid: false,
      message: 'El output debe mostrar que hay 4 días únicos (Sun, Sat, Thur, Fri)',
    };
  }

  return { isValid: true };
};

// Ejercicio 20.5: .value_counts()
export const validateValueCounts = (
  code: string,
  output: string
): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]tips\.csv['"]/.test(code);
  if (!hasReadCsv) {
    return {
      isValid: false,
      message: 'Debes cargar el dataset con pd.read_csv("tips.csv", sep="|")',
    };
  }

  const hasValueCounts = /\.value_counts\s*\(\s*\)/.test(code);
  if (!hasValueCounts) {
    return { isValid: false, message: 'Debes usar .value_counts() para contar frecuencias' };
  }

  const hasDayColumn = /['"]day['"]/.test(code);
  if (!hasDayColumn) {
    return { isValid: false, message: 'Aplica .value_counts() sobre la columna "day"' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  // value_counts muestra Sun, Sat, Thur, Fri con sus conteos
  const hasSun = output.includes('Sun');
  const hasSat = output.includes('Sat');
  if (!hasSun || !hasSat) {
    return {
      isValid: false,
      message: 'El output debe mostrar los días y su frecuencia (Sun, Sat, Thur, Fri)',
    };
  }

  return { isValid: true };
};
