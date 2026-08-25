// Validadores para Módulo 23: Pandas - Sort, Head & Tail

// Ejercicio 23.1: sort_values() ascendente y descendente
export const validateSortValues = (
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

  const hasSortValues = /\.sort_values\s*\(/.test(code);
  if (!hasSortValues) {
    return { isValid: false, message: 'Debes usar .sort_values() para ordenar' };
  }

  const hasTotalBill = /['"]total_bill['"]/.test(code);
  if (!hasTotalBill) {
    return { isValid: false, message: 'Ordena por la columna "total_bill"' };
  }

  const hasAscendingFalse = /ascending\s*=\s*False/.test(code);
  if (!hasAscendingFalse) {
    return { isValid: false, message: 'Usa ascending=False para ordenar de mayor a menor' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  // La cuenta más alta en tips es 50.81, verificar que el output empieza por ahí
  const hasHighValue = /50\.\d+|48\.\d+|45\.\d+/.test(output);
  if (!hasHighValue) {
    return {
      isValid: false,
      message: 'El output debe mostrar las cuentas más altas primero (la máxima es ~50.81)',
    };
  }

  return { isValid: true };
};

// Ejercicio 23.2: top 5 con sort_values + head()
export const validateTop5 = (
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

  const hasSortValues = /\.sort_values\s*\(/.test(code);
  if (!hasSortValues) {
    return { isValid: false, message: 'Usa .sort_values() para ordenar antes de tomar el top' };
  }

  const hasTip = /['"]tip['"]/.test(code);
  if (!hasTip) {
    return { isValid: false, message: 'Ordena por la columna "tip"' };
  }

  const hasAscendingFalse = /ascending\s*=\s*False/.test(code);
  if (!hasAscendingFalse) {
    return {
      isValid: false,
      message: 'Usa ascending=False para ordenar de mayor a menor (las propinas más altas primero)',
    };
  }

  const hasHead = /\.head\s*\(\s*5\s*\)/.test(code);
  if (!hasHead) {
    return { isValid: false, message: 'Usa .head(5) para quedarte con las 5 propinas más altas' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  // La propina máxima es 10.0, verificar que aparece en el output
  const hasTopTip = /10\.0|9\.\d+/.test(output);
  if (!hasTopTip) {
    return {
      isValid: false,
      message: 'El output debe mostrar las 5 propinas más altas (la máxima es 10.0)',
    };
  }

  return { isValid: true };
};

// Ejercicio 23.3: bottom 5 con sort_values + tail() (o head con ascending=True)
export const validateBottom5 = (
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

  const hasSortValues = /\.sort_values\s*\(/.test(code);
  if (!hasSortValues) {
    return { isValid: false, message: 'Usa .sort_values() para ordenar' };
  }

  const hasTip = /['"]tip['"]/.test(code);
  if (!hasTip) {
    return { isValid: false, message: 'Ordena por la columna "tip"' };
  }

  const hasTail = /\.tail\s*\(\s*5\s*\)/.test(code) || /\.head\s*\(\s*5\s*\)/.test(code);
  if (!hasTail) {
    return {
      isValid: false,
      message: 'Usa .tail(5) para obtener las 5 propinas más bajas (o sort descendente + .head(5))',
    };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  // Las propinas más bajas son ~1.0, verificar que aparece en el output
  const hasLowTip = /1\.0\d*|1\.1\d*/.test(output);
  if (!hasLowTip) {
    return {
      isValid: false,
      message:
        'El output debe mostrar las 5 propinas más bajas (las menores están alrededor de 1.0)',
    };
  }

  return { isValid: true };
};

// Ejercicio 23.4: groupby + sort_values (top por grupo)
export const validateGroupbySort = (
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

  const hasGroupby = /\.groupby\s*\(/.test(code);
  if (!hasGroupby) {
    return {
      isValid: false,
      message: 'Usa .groupby() para calcular el promedio por grupo primero',
    };
  }

  const hasSortValues = /\.sort_values\s*\(/.test(code);
  if (!hasSortValues) {
    return { isValid: false, message: 'Usa .sort_values() para ordenar el resultado del groupby' };
  }

  const hasDayColumn = /['"]day['"]/.test(code);
  if (!hasDayColumn) {
    return { isValid: false, message: 'Agrupa por la columna "day"' };
  }

  const hasTip = /['"]tip['"]/.test(code);
  if (!hasTip) {
    return { isValid: false, message: 'Calcula el promedio de "tip" por día' };
  }

  const hasAscendingFalse = /ascending\s*=\s*False/.test(code);
  if (!hasAscendingFalse) {
    return {
      isValid: false,
      message:
        'Ordena de mayor a menor con ascending=False para ver el día con mayor propina primero',
    };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  // El día con mayor propina promedio es Sun (~3.25), debe aparecer primero
  const hasSunFirst =
    output.trimStart().startsWith('Sun') ||
    /^\s*(day\s*\n)?\s*Sun/.test(output) ||
    output.includes('Sun');
  if (!hasSunFirst) {
    return {
      isValid: false,
      message:
        'El output debe mostrar los días ordenados por propina promedio (Sun tiene la mayor)',
    };
  }

  return { isValid: true };
};
