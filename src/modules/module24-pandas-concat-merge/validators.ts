// Validadores para Módulo 24: Pandas - Concat & Merge

// Ejercicio 24.1: pd.concat() con dos DataFrames
export const validateConcatTwo = (
  code: string,
  output: string
): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar los archivos con pd.read_csv()' };
  }

  const hasEnero = /ventas_enero\.csv/.test(code);
  const hasFebrero = /ventas_febrero\.csv/.test(code);
  if (!hasEnero || !hasFebrero) {
    return { isValid: false, message: 'Debes cargar ventas_enero.csv y ventas_febrero.csv' };
  }

  const hasConcat = /pd\.concat\s*\(/.test(code);
  if (!hasConcat) {
    return { isValid: false, message: 'Usa pd.concat() para combinar los dos DataFrames' };
  }

  const hasIgnoreIndex = /ignore_index\s*=\s*True/.test(code);
  if (!hasIgnoreIndex) {
    return { isValid: false, message: 'Usa ignore_index=True para que el índice sea continuo' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  // enero=120, febrero=135 → total=255 filas
  const has255 = output.includes('255');
  if (!has255) {
    return {
      isValid: false,
      message: 'El DataFrame resultante debe tener 255 filas (120 enero + 135 febrero)',
    };
  }

  return { isValid: true };
};

// Ejercicio 24.2: pd.concat() con tres DataFrames
export const validateConcatThree = (
  code: string,
  output: string
): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar los archivos con pd.read_csv()' };
  }

  const hasEnero = /ventas_enero\.csv/.test(code);
  const hasFebrero = /ventas_febrero\.csv/.test(code);
  const hasMarzo = /ventas_marzo\.csv/.test(code);
  if (!hasEnero || !hasFebrero || !hasMarzo) {
    return {
      isValid: false,
      message:
        'Debes cargar los tres archivos: ventas_enero.csv, ventas_febrero.csv y ventas_marzo.csv',
    };
  }

  const hasConcat = /pd\.concat\s*\(/.test(code);
  if (!hasConcat) {
    return {
      isValid: false,
      message: 'Usa pd.concat() para combinar los tres DataFrames en una lista []',
    };
  }

  const hasList = /pd\.concat\s*\(\s*\[/.test(code);
  if (!hasList) {
    return {
      isValid: false,
      message: 'Pasa los tres DataFrames dentro de una lista: pd.concat([df1, df2, df3])',
    };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return {
      isValid: false,
      message: 'Debes imprimir el resultado (usa .shape para ver las dimensiones)',
    };
  }

  // enero=120, febrero=135, marzo=150 → total=405 filas
  const has405 = output.includes('405');
  if (!has405) {
    return {
      isValid: false,
      message: 'El DataFrame resultante debe tener 405 filas (120 + 135 + 150)',
    };
  }

  return { isValid: true };
};

// Ejercicio 24.3: merge básico (inner join)
export const validateMergeInner = (
  code: string,
  output: string
): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar los archivos con pd.read_csv()' };
  }

  const hasProductos = /productos\.csv/.test(code);
  if (!hasProductos) {
    return { isValid: false, message: 'Debes cargar productos.csv para hacer el merge' };
  }

  const hasMerge = /\.merge\s*\(|pd\.merge\s*\(/.test(code);
  if (!hasMerge) {
    return { isValid: false, message: 'Usa .merge() para unir las ventas con los productos' };
  }

  const hasIdProducto = /['"]id_producto['"]/.test(code);
  if (!hasIdProducto) {
    return {
      isValid: false,
      message: 'Une los DataFrames usando la columna "id_producto" con on="id_producto"',
    };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  // Después del merge deben aparecer columnas de productos
  const hasNombre =
    output.includes('nombre') || output.includes('Laptop') || output.includes('Mouse');
  if (!hasNombre) {
    return {
      isValid: false,
      message:
        'El resultado debe incluir las columnas de productos (nombre, categoria, precio_unitario)',
    };
  }

  return { isValid: true };
};

// Ejercicio 24.4: concat + merge + groupby (ejercicio integrador)
export const validateIntegrador = (
  code: string,
  output: string
): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  const hasReadCsv = /pd\.read_csv/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar los archivos con pd.read_csv()' };
  }

  const hasConcat = /pd\.concat\s*\(/.test(code);
  if (!hasConcat) {
    return { isValid: false, message: 'Primero une los tres meses con pd.concat()' };
  }

  const hasMerge = /\.merge\s*\(|pd\.merge\s*\(/.test(code);
  if (!hasMerge) {
    return { isValid: false, message: 'Luego une las ventas con productos usando .merge()' };
  }

  const hasGroupby = /\.groupby\s*\(/.test(code);
  if (!hasGroupby) {
    return { isValid: false, message: 'Usa .groupby() para agrupar por categoría' };
  }

  const hasCategoria = /['"]categoria['"]/.test(code);
  if (!hasCategoria) {
    return {
      isValid: false,
      message: 'Agrupa por la columna "categoria" del DataFrame de productos',
    };
  }

  const hasTotal = /['"]total['"]/.test(code);
  if (!hasTotal) {
    return { isValid: false, message: 'Calcula la suma de "total" por categoría' };
  }

  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes imprimir el resultado' };
  }

  // Debe aparecer alguna de las categorías
  const hasCategories =
    output.includes('Electronica') || output.includes('Muebles') || output.includes('Papelería');
  if (!hasCategories) {
    return {
      isValid: false,
      message:
        'El output debe mostrar las categorías (Electronica, Muebles, Papelería) con sus ventas totales',
    };
  }

  return { isValid: true };
};
