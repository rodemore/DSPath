// Validadores para Módulo 25: Pandas - Apply sobre filas (axis=1)

// Ejercicio 25.1: apply con función definida (def)
export const validateApplyDef = (
  code: string,
  output: string
): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar los datos con pd.read_csv()' };
  }

  const hasDef = /\bdef\s+\w+\s*\(/.test(code);
  if (!hasDef) {
    return { isValid: false, message: 'Define una función con def para clasificar las filas' };
  }

  const hasApply = /\.apply\s*\(/.test(code);
  if (!hasApply) {
    return { isValid: false, message: 'Usa .apply() para aplicar la función al DataFrame' };
  }

  const hasAxis1 = /axis\s*=\s*1/.test(code);
  if (!hasAxis1) {
    return { isValid: false, message: 'Usa axis=1 para aplicar la función fila por fila' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  // Debe aparecer alguna categoría de transacción en el output
  const hasCategory =
    output.includes('alta') ||
    output.includes('media') ||
    output.includes('baja') ||
    output.includes('Alta') ||
    output.includes('Media') ||
    output.includes('Baja');
  if (!hasCategory) {
    return {
      isValid: false,
      message: 'El output debe mostrar la clasificación de las transacciones',
    };
  }

  return { isValid: true };
};

// Ejercicio 25.2: apply con lambda
export const validateApplyLambda = (
  code: string,
  output: string
): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar los datos con pd.read_csv()' };
  }

  const hasLambda = /lambda\s+\w+/.test(code);
  if (!hasLambda) {
    return { isValid: false, message: 'Usa una función lambda dentro del .apply()' };
  }

  const hasApply = /\.apply\s*\(/.test(code);
  if (!hasApply) {
    return { isValid: false, message: 'Usa .apply() para aplicar la lambda' };
  }

  const hasAxis1 = /axis\s*=\s*1/.test(code);
  if (!hasAxis1) {
    return { isValid: false, message: 'Usa axis=1 para aplicar la función fila por fila' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  const hasDiscountOrTotal =
    output.includes('con_descuento') ||
    output.includes('sin_descuento') ||
    output.includes('True') ||
    output.includes('False') ||
    /\d+\.\d+/.test(output);
  if (!hasDiscountOrTotal) {
    return {
      isValid: false,
      message: 'El output debe mostrar el resultado de aplicar la lambda a cada fila',
    };
  }

  return { isValid: true };
};

// Ejercicio 25.3: apply para segmentación multi-columna
export const validateSegmentation = (
  code: string,
  output: string
): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar los datos con pd.read_csv()' };
  }

  const hasApply = /\.apply\s*\(/.test(code);
  if (!hasApply) {
    return { isValid: false, message: 'Usa .apply() para crear la segmentación' };
  }

  const hasAxis1 = /axis\s*=\s*1/.test(code);
  if (!hasAxis1) {
    return {
      isValid: false,
      message: 'Usa axis=1 para evaluar condiciones sobre varias columnas de cada fila',
    };
  }

  // eslint-disable-next-line no-useless-escape
  const hasTotal = /['"\[]total['"\]]|row\['total'\]|row\.total/.test(code);
  // eslint-disable-next-line no-useless-escape
  const hasDiscount = /['"\[]discount['"\]]|row\['discount'\]|row\.discount/.test(code);
  if (!hasTotal || !hasDiscount) {
    return {
      isValid: false,
      message: 'La segmentación debe considerar las columnas "total" y "discount"',
    };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  // Debe aparecer algún segmento
  const hasSegment =
    output.includes('premium') ||
    output.includes('Premium') ||
    output.includes('regular') ||
    output.includes('Regular') ||
    output.includes('economica') ||
    output.includes('Economica') ||
    output.includes('económica') ||
    output.includes('Económica');
  if (!hasSegment) {
    return {
      isValid: false,
      message:
        'El output debe mostrar los segmentos de las transacciones (ej: premium, regular, económica)',
    };
  }

  return { isValid: true };
};

// Ejercicio 25.4: apply + groupby (integrador)
export const validateApplyGroupby = (
  code: string,
  output: string
): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar los datos con pd.read_csv()' };
  }

  const hasApply = /\.apply\s*\(/.test(code);
  if (!hasApply) {
    return { isValid: false, message: 'Usa .apply() para crear la columna de segmento' };
  }

  const hasAxis1 = /axis\s*=\s*1/.test(code);
  if (!hasAxis1) {
    return { isValid: false, message: 'Usa axis=1 para aplicar la función fila por fila' };
  }

  const hasGroupby = /\.groupby\s*\(/.test(code);
  if (!hasGroupby) {
    return {
      isValid: false,
      message: 'Usa .groupby() para analizar los segmentos creados con apply',
    };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  const hasNumericOutput = /\d+\.\d+|\d{2,}/.test(output);
  if (!hasNumericOutput) {
    return {
      isValid: false,
      message: 'El output debe mostrar métricas numéricas agrupadas por segmento',
    };
  }

  return { isValid: true };
};
