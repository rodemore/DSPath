// Validadores para Módulo 26: Pandas - Apply sobre columnas (axis=0)

// Ejercicio 26.1: apply sobre una columna — conversión a letra
export const validateApplyColumn = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar los datos con pd.read_csv()' };
  }

  const hasApply = /\.apply\s*\(/.test(code);
  if (!hasApply) {
    return { isValid: false, message: 'Usa .apply() para aplicar la función sobre la columna' };
  }

  const hasNoAxis1 = !/axis\s*=\s*1/.test(code);
  if (!hasNoAxis1) {
    return { isValid: false, message: 'Para apply sobre una columna no uses axis=1. Aplica .apply() directamente sobre la Serie' };
  }

  const hasMatematicas = /['"\[]matematicas['"\]]/.test(code);
  if (!hasMatematicas) {
    return { isValid: false, message: 'Aplica la función sobre la columna "matematicas"' };
  }

  const hasMatLetra = /['"]mat_letra['"]/.test(code);
  if (!hasMatLetra) {
    return { isValid: false, message: 'Guarda el resultado en una columna llamada "mat_letra"' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  // El output debe mostrar letras A, B, C o F
  const hasLetterGrade = /\bA\b|\bB\b|\bC\b|\bF\b/.test(output);
  if (!hasLetterGrade) {
    return { isValid: false, message: 'El output debe mostrar las notas convertidas a letra (A, B, C o F)' };
  }

  return { isValid: true };
};

// Ejercicio 26.2: apply sobre múltiples columnas con axis=0 (normalizar todo el bloque de notas)
export const validateApplyMultipleColumns = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar los datos con pd.read_csv()' };
  }

  const hasApply = /\.apply\s*\(/.test(code);
  if (!hasApply) {
    return { isValid: false, message: 'Usa .apply() para aplicar la función' };
  }

  // Debe seleccionar varias columnas con [[...]]
  const hasMultipleColumns = /\[\s*\[/.test(code) || /\[\s*['"]matematicas['"]/.test(code);
  if (!hasMultipleColumns) {
    return { isValid: false, message: 'Selecciona el bloque de columnas de notas con df[["col1", "col2", ...]]' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  const hasDecimalBetween0and1 = /0\.\d+/.test(output);
  if (!hasDecimalBetween0and1) {
    return { isValid: false, message: 'El output debe mostrar valores normalizados entre 0 y 1 para todas las materias' };
  }

  return { isValid: true };
};

// Ejercicio 26.3: apply para calcular promedio por fila + clasificación
export const validatePromedioClasificacion = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar los datos con pd.read_csv()' };
  }

  const hasApply = /\.apply\s*\(/.test(code);
  if (!hasApply) {
    return { isValid: false, message: 'Usa .apply() para calcular el promedio o la clasificación' };
  }

  const hasPromedio = /promedio|mean/.test(code);
  if (!hasPromedio) {
    return { isValid: false, message: 'Calcula el promedio de las notas de cada estudiante' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  // Debe aparecer alguna clasificación o promedio numérico
  const hasAprobado = output.includes('Aprobado') || output.includes('aprobado') ||
                      output.includes('Reprobado') || output.includes('reprobado') ||
                      output.includes('Sobresaliente') || output.includes('sobresaliente');
  const hasNumeric = /\d{2}\.\d/.test(output);
  if (!hasAprobado && !hasNumeric) {
    return { isValid: false, message: 'El output debe mostrar el promedio o clasificación de cada estudiante' };
  }

  return { isValid: true };
};

// Ejercicio 26.4: apply para ranking — apply sobre columna con función de comparación
export const validateRanking = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar los datos con pd.read_csv()' };
  }

  const hasApply = /\.apply\s*\(/.test(code);
  if (!hasApply) {
    return { isValid: false, message: 'Usa .apply() para crear la columna de clasificación' };
  }

  const hasAxis1 = /axis\s*=\s*1/.test(code);
  if (!hasAxis1) {
    return { isValid: false, message: 'Usa axis=1 para procesar fila por fila (necesitas acceder a varias columnas de notas a la vez)' };
  }

  const hasMateriasColumns = /matematicas|ciencias|historia|lengua|ingles/.test(code);
  if (!hasMateriasColumns) {
    return { isValid: false, message: 'Usa las columnas de materias para determinar el perfil del estudiante' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  const hasProfile = output.includes('Ciencias') || output.includes('ciencias') ||
                     output.includes('Humanidades') || output.includes('humanidades') ||
                     output.includes('Equilibrado') || output.includes('equilibrado');
  if (!hasProfile) {
    return { isValid: false, message: 'El output debe mostrar el perfil de cada estudiante (Ciencias, Humanidades o Equilibrado)' };
  }

  return { isValid: true };
};
