// Validadores para Módulo 21: Pandas - GroupBy básico

// Ejercicio 21.1: groupby por una columna con una función
export const validateGroupbyOne = (code: string, output: string): { isValid: boolean; message?: string } => {
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

  const hasDayColumn = /['"]day['"]/.test(code);
  if (!hasDayColumn) {
    return { isValid: false, message: 'Agrupa por la columna "day"' };
  }

  const hasTotalBill = /['"]total_bill['"]/.test(code);
  if (!hasTotalBill) {
    return { isValid: false, message: 'Calcula el promedio de la columna "total_bill"' };
  }

  const hasMean = /\.mean\s*\(\s*\)/.test(code);
  if (!hasMean) {
    return { isValid: false, message: 'Usa .mean() para calcular el promedio por grupo' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  const hasDayInOutput = output.includes('Sun') || output.includes('Sat') || output.includes('Thur') || output.includes('Fri');
  if (!hasDayInOutput) {
    return { isValid: false, message: 'El output debe mostrar los días con su promedio de total_bill' };
  }

  return { isValid: true };
};

// Ejercicio 21.2: groupby por dos columnas
export const validateGroupbyTwo = (code: string, output: string): { isValid: boolean; message?: string } => {
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

  // Debe agrupar por dos columnas con lista []
  const hasTwoColumns = /\.groupby\s*\(\s*\[/.test(code);
  if (!hasTwoColumns) {
    return { isValid: false, message: 'Para agrupar por dos columnas, pásalas dentro de una lista: .groupby(["col1", "col2"])' };
  }

  const hasDayColumn = /['"]day['"]/.test(code);
  const hasSmokerColumn = /['"]smoker['"]/.test(code);
  if (!hasDayColumn || !hasSmokerColumn) {
    return { isValid: false, message: 'Agrupa por "day" y "smoker" usando una lista' };
  }

  const hasTip = /['"]tip['"]/.test(code);
  if (!hasTip) {
    return { isValid: false, message: 'Calcula el promedio de la columna "tip"' };
  }

  const hasMean = /\.mean\s*\(\s*\)/.test(code);
  if (!hasMean) {
    return { isValid: false, message: 'Usa .mean() para calcular el promedio por grupo' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  const hasDayInOutput = output.includes('Sun') || output.includes('Sat') || output.includes('Thur') || output.includes('Fri');
  if (!hasDayInOutput) {
    return { isValid: false, message: 'El output debe mostrar la combinación de día y fumador con el promedio de tip' };
  }

  return { isValid: true };
};

// Ejercicio 21.3: reset_index() o as_index=False
export const validateResetIndex = (code: string, output: string): { isValid: boolean; message?: string } => {
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

  const hasDayColumn = /['"]day['"]/.test(code);
  if (!hasDayColumn) {
    return { isValid: false, message: 'Agrupa por la columna "day"' };
  }

  const hasMean = /\.mean\s*\(\s*\)/.test(code);
  if (!hasMean) {
    return { isValid: false, message: 'Usa .mean() para calcular el promedio' };
  }

  const hasResetIndex = /\.reset_index\s*\(\s*\)/.test(code);
  const hasAsIndex = /as_index\s*=\s*False/.test(code);
  if (!hasResetIndex && !hasAsIndex) {
    return { isValid: false, message: 'Usa .reset_index() al final, o as_index=False dentro del groupby, para obtener un DataFrame normal' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  // Con reset_index el output debe mostrar "day" como columna normal (índice numérico 0,1,2...)
  const hasDayInOutput = output.includes('Fri') || output.includes('Sat') || output.includes('Sun') || output.includes('Thur');
  if (!hasDayInOutput) {
    return { isValid: false, message: 'El output debe mostrar los días como una columna normal del DataFrame' };
  }

  // Verificar que "day" aparece como columna en el header, no como índice
  const hasDayAsColumn = output.includes('day');
  if (!hasDayAsColumn) {
    return { isValid: false, message: 'Con reset_index(), "day" debe aparecer como columna, no como índice' };
  }

  return { isValid: true };
};
