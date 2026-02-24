// Validadores para Módulo 22: Pandas - GroupBy con .agg()

// Ejercicio 22.1: .agg() con una función por columna (dict)
export const validateAggDict = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]tips\.csv['"]/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar el dataset con pd.read_csv("tips.csv", sep="|")' };
  }

  const hasGroupby = /\.groupby\s*\(/.test(code);
  if (!hasGroupby) {
    return { isValid: false, message: 'Debes usar .groupby() para agrupar los datos' };
  }

  const hasAgg = /\.agg\s*\(/.test(code);
  if (!hasAgg) {
    return { isValid: false, message: 'Debes usar .agg() para aplicar las funciones de agregación' };
  }

  const hasDayColumn = /['"]day['"]/.test(code);
  if (!hasDayColumn) {
    return { isValid: false, message: 'Agrupa por la columna "day"' };
  }

  const hasTotalBill = /['"]total_bill['"]/.test(code);
  const hasTip = /['"]tip['"]/.test(code);
  if (!hasTotalBill || !hasTip) {
    return { isValid: false, message: 'Dentro de .agg() incluye cálculos para "total_bill" y "tip"' };
  }

  const hasMean = /['"]mean['"]/.test(code);
  const hasSum = /['"]sum['"]/.test(code);
  if (!hasMean && !hasSum) {
    return { isValid: false, message: 'Usa funciones como "mean" o "sum" dentro de .agg()' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  const hasDayInOutput = output.includes('Fri') || output.includes('Sat') || output.includes('Sun') || output.includes('Thur');
  if (!hasDayInOutput) {
    return { isValid: false, message: 'El output debe mostrar los días agrupados con sus valores calculados' };
  }

  return { isValid: true };
};

// Ejercicio 22.2: .agg() con múltiples funciones sobre la misma columna (lista)
export const validateAggList = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]tips\.csv['"]/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar el dataset con pd.read_csv("tips.csv", sep="|")' };
  }

  const hasGroupby = /\.groupby\s*\(/.test(code);
  if (!hasGroupby) {
    return { isValid: false, message: 'Debes usar .groupby() para agrupar los datos' };
  }

  const hasAgg = /\.agg\s*\(/.test(code);
  if (!hasAgg) {
    return { isValid: false, message: 'Debes usar .agg() para aplicar múltiples funciones' };
  }

  // Debe tener una lista dentro de agg
  const hasListInAgg = /\.agg\s*\(\s*\[/.test(code) || /:\s*\[/.test(code);
  if (!hasListInAgg) {
    return { isValid: false, message: 'Para aplicar varias funciones a la misma columna, pásalas en una lista: .agg(["mean", "max", "min"])' };
  }

  const hasTip = /['"]tip['"]/.test(code);
  if (!hasTip) {
    return { isValid: false, message: 'Aplica las funciones sobre la columna "tip"' };
  }

  const hasMean = /['"]mean['"]/.test(code);
  const hasMax = /['"]max['"]/.test(code);
  const hasMin = /['"]min['"]/.test(code);
  if (!hasMean || !hasMax || !hasMin) {
    return { isValid: false, message: 'Usa al menos "mean", "max" y "min" dentro de la lista' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  const hasDayInOutput = output.includes('Fri') || output.includes('Sat') || output.includes('Sun') || output.includes('Thur');
  if (!hasDayInOutput) {
    return { isValid: false, message: 'El output debe mostrar los grupos con las múltiples métricas calculadas' };
  }

  return { isValid: true };
};

// Ejercicio 22.3: .agg() completo con dict y múltiples funciones por columna + reset_index
export const validateAggComplete = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]tips\.csv['"]/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar el dataset con pd.read_csv("tips.csv", sep="|")' };
  }

  const hasGroupby = /\.groupby\s*\(/.test(code);
  if (!hasGroupby) {
    return { isValid: false, message: 'Debes usar .groupby() para agrupar los datos' };
  }

  const hasAgg = /\.agg\s*\(/.test(code);
  if (!hasAgg) {
    return { isValid: false, message: 'Debes usar .agg() para agregar' };
  }

  const hasDayColumn = /['"]day['"]/.test(code);
  if (!hasDayColumn) {
    return { isValid: false, message: 'Agrupa por la columna "day"' };
  }

  const hasTotalBill = /['"]total_bill['"]/.test(code);
  const hasTip = /['"]tip['"]/.test(code);
  if (!hasTotalBill || !hasTip) {
    return { isValid: false, message: 'Incluye cálculos para las columnas "total_bill" y "tip"' };
  }

  const hasResetIndex = /\.reset_index\s*\(\s*\)/.test(code);
  const hasAsIndex = /as_index\s*=\s*False/.test(code);
  if (!hasResetIndex && !hasAsIndex) {
    return { isValid: false, message: 'Usa .reset_index() para obtener un DataFrame con índice numérico' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  const hasDayInOutput = output.includes('Fri') || output.includes('Sat') || output.includes('Sun') || output.includes('Thur');
  if (!hasDayInOutput) {
    return { isValid: false, message: 'El output debe mostrar los días con sus métricas calculadas' };
  }

  const hasDayColumn2 = output.includes('day');
  if (!hasDayColumn2) {
    return { isValid: false, message: 'Con reset_index(), "day" debe aparecer como columna en el output' };
  }

  return { isValid: true };
};
