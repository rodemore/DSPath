// Validadores para Módulo 18: Pandas - Operaciones con columnas (dataset tips)

export const validateMathColumn = (
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

  const hasNewColumn = /df\s*\[\s*['"]total_con_propina['"]\s*\]/.test(code);
  if (!hasNewColumn) {
    return { isValid: false, message: 'Debes crear una columna llamada "total_con_propina"' };
  }

  const hasSum =
    /['"]total_bill['"]\s*\]\s*\+\s*df\s*\[\s*['"]tip['"]/.test(code) ||
    /['"]tip['"]\s*\]\s*\+\s*df\s*\[\s*['"]total_bill['"]/.test(code);
  if (!hasSum) {
    return { isValid: false, message: 'Calcula total_con_propina sumando total_bill y tip' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  const hasColumnInOutput = output.includes('total_con_propina');
  if (!hasColumnInOutput) {
    return { isValid: false, message: 'La columna "total_con_propina" no aparece en el output' };
  }

  return { isValid: true };
};

export const validateMultipleColumns = (
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

  const hasNewColumn = /df\s*\[\s*['"]tip_pct['"]\s*\]/.test(code);
  if (!hasNewColumn) {
    return { isValid: false, message: 'Debes crear una columna llamada "tip_pct"' };
  }

  const hasDivision = /['"]tip['"]\s*\]\s*\/\s*df\s*\[\s*['"]total_bill['"]/.test(code);
  if (!hasDivision) {
    return {
      isValid: false,
      message: 'Calcula tip_pct dividiendo tip entre total_bill (y multiplica por 100)',
    };
  }

  const hasMultiply100 = /\*\s*100/.test(code);
  if (!hasMultiply100) {
    return { isValid: false, message: 'No olvides multiplicar por 100 para obtener el porcentaje' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  const hasColumnInOutput = output.includes('tip_pct');
  if (!hasColumnInOutput) {
    return { isValid: false, message: 'La columna "tip_pct" no aparece en el output' };
  }

  return { isValid: true };
};

export const validateLocColumn = (
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

  const hasNewColumn = /df\s*\[\s*['"]mesa_grande['"]\s*\]/.test(code);
  if (!hasNewColumn) {
    return { isValid: false, message: 'Debes crear una columna llamada "mesa_grande"' };
  }

  const hasLoc = /df\s*\.loc\s*\[/.test(code);
  if (!hasLoc) {
    return { isValid: false, message: 'Debes usar .loc[] para asignar valores condicionalmente' };
  }

  const hasCondition = /['"]size['"]/.test(code) || /\bsize\b/.test(code);
  if (!hasCondition) {
    return { isValid: false, message: 'Debes usar la columna "size" para la condición' };
  }

  const hasGrande = /['"]grande['"]/.test(code);
  const hasPequena = /['"]peque[ñn]a['"]/.test(code);
  if (!hasGrande || !hasPequena) {
    return { isValid: false, message: 'Debes asignar los valores "grande" y "pequeña"' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  const hasGrandeOutput = output.includes('grande');
  const hasPequenaOutput = output.includes('peque');
  if (!hasGrandeOutput || !hasPequenaOutput) {
    return { isValid: false, message: 'El output debe mostrar tanto "grande" como "pequeña"' };
  }

  return { isValid: true };
};
