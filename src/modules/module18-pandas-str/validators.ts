// Validadores para Módulo 19: Pandas - Operaciones con strings (.str)

export const validateStrLower = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]tips\.csv['"]/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar el dataset con pd.read_csv("tips.csv", sep="|")' };
  }

  const hasStrLower = /\.str\.lower\s*\(\s*\)/.test(code);
  if (!hasStrLower) {
    return { isValid: false, message: 'Debes usar .str.lower() para convertir a minúsculas' };
  }

  const hasDayColumn = /['"]day['"]/.test(code);
  if (!hasDayColumn) {
    return { isValid: false, message: 'Debes aplicar .str.lower() sobre la columna "day"' };
  }

  const hasNewColumn = /df\s*\[\s*['"]day_lower['"]\s*\]/.test(code);
  if (!hasNewColumn) {
    return { isValid: false, message: 'Guarda el resultado en una nueva columna llamada "day_lower"' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  // Verificar que el output tiene valores en minúsculas
  const hasLowerValues = output.includes('sun') || output.includes('sat') || output.includes('fri') || output.includes('thur');
  if (!hasLowerValues) {
    return { isValid: false, message: 'El output debe mostrar los días en minúsculas (sun, sat, fri, thur)' };
  }

  return { isValid: true };
};

export const validateStrContains = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]tips\.csv['"]/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar el dataset con pd.read_csv("tips.csv", sep="|")' };
  }

  const hasStrContains = /\.str\.contains\s*\(/.test(code);
  if (!hasStrContains) {
    return { isValid: false, message: 'Debes usar .str.contains() para filtrar' };
  }

  const hasSunOrSat = /['"]Sun['"]|['"]Sat['"]/.test(code);
  if (!hasSunOrSat) {
    return { isValid: false, message: 'Filtra los registros del fin de semana: "Sat" o "Sun"' };
  }

  const hasVariable = /fin_de_semana\s*=/.test(code);
  if (!hasVariable) {
    return { isValid: false, message: 'Guarda el resultado en una variable llamada "fin_de_semana"' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  const hasWeekendOutput = output.includes('Sun') || output.includes('Sat');
  if (!hasWeekendOutput) {
    return { isValid: false, message: 'El resultado debe contener filas del fin de semana (Sun o Sat)' };
  }

  const hasFridayOutput = output.includes('Fri');
  const hasThursdayOutput = output.includes('Thur');
  if (hasFridayOutput || hasThursdayOutput) {
    return { isValid: false, message: 'El resultado no debe contener filas de Fri o Thur' };
  }

  return { isValid: true };
};

export const validateStrReplace = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]tips\.csv['"]/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar el dataset con pd.read_csv("tips.csv", sep="|")' };
  }

  const hasStrReplace = /\.str\.replace\s*\(/.test(code);
  if (!hasStrReplace) {
    return { isValid: false, message: 'Debes usar .str.replace() para reemplazar valores' };
  }

  const hasSexColumn = /['"]sex['"]/.test(code);
  if (!hasSexColumn) {
    return { isValid: false, message: 'Debes aplicar .str.replace() sobre la columna "sex"' };
  }

  const hasReplaceMale = /['"]Male['"]/.test(code) && /['"]Hombre['"]/.test(code);
  const hasReplaceFemale = /['"]Female['"]/.test(code) && /['"]Mujer['"]/.test(code);

  if (!hasReplaceMale && !hasReplaceFemale) {
    return { isValid: false, message: 'Reemplaza "Male" por "Hombre" y "Female" por "Mujer"' };
  }

  const hasNewColumn = /df\s*\[\s*['"]sex_es['"]\s*\]/.test(code);
  if (!hasNewColumn) {
    return { isValid: false, message: 'Guarda el resultado en una nueva columna llamada "sex_es"' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  const hasSpanishInOutput = output.includes('Hombre') || output.includes('Mujer');
  if (!hasSpanishInOutput) {
    return { isValid: false, message: 'El output debe mostrar "Hombre" o "Mujer" en la columna sex_es' };
  }

  return { isValid: true };
};
