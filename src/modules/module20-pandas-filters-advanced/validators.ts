// Validadores para Módulo 17: Pandas - Filtros Avanzados

export const validateIsin = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  // Verificar que carga el dataset
  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]iris\.csv['"]\s*\)/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar el dataset con pd.read_csv("iris.csv")' };
  }

  // Verificar que usa .isin()
  const hasIsin = /\.isin\s*\(/.test(code);
  if (!hasIsin) {
    return { isValid: false, message: 'Debes usar el método .isin() para filtrar' };
  }

  // Verificar que menciona setosa y virginica
  const hasSetosa = /['"]setosa['"]/.test(code);
  const hasVirginica = /['"]virginica['"]/.test(code);

  if (!hasSetosa || !hasVirginica) {
    return { isValid: false, message: 'Debes crear una lista con las especies "setosa" y "virginica"' };
  }

  // Verificar que guarda en dos_especies
  const hasVariable = /dos_especies\s*=/.test(code);
  if (!hasVariable) {
    return { isValid: false, message: 'Debes guardar el resultado en una variable llamada "dos_especies"' };
  }

  // Verificar que el output contiene setosa y virginica pero no versicolor
  const hasSetosaOutput = output.includes('setosa');
  const hasVirginicaOutput = output.includes('virginica');
  const hasVersicolor = output.includes('versicolor');

  if (!hasSetosaOutput || !hasVirginicaOutput) {
    return { isValid: false, message: 'El resultado debe contener flores de ambas especies: setosa y virginica' };
  }

  if (hasVersicolor) {
    return { isValid: false, message: 'El resultado NO debe contener flores versicolor. Verifica tu lista de especies' };
  }

  return { isValid: true };
};

export const validateBetween = (code: string, _output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  // Verificar que carga el dataset
  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]iris\.csv['"]\s*\)/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar el dataset con pd.read_csv("iris.csv")' };
  }

  // Verificar que usa .between()
  const hasBetween = /\.between\s*\(/.test(code);
  if (!hasBetween) {
    return { isValid: false, message: 'Debes usar el método .between() para filtrar el rango' };
  }

  // Verificar que menciona sepal_length
  const hasSepalLength = /['"]sepal_length['"]/.test(code);
  if (!hasSepalLength) {
    return { isValid: false, message: 'Debes filtrar por la columna "sepal_length"' };
  }

  // Verificar que usa los valores 5.0 y 6.0 (o 5 y 6)
  const hasBetweenRange = /\.between\s*\(\s*5(\.0)?\s*,\s*6(\.0)?\s*\)/.test(code);
  if (!hasBetweenRange) {
    return { isValid: false, message: 'Debes usar .between(5.0, 6.0) o .between(5, 6)' };
  }

  // Verificar que guarda en rango_medio
  const hasVariable = /rango_medio\s*=/.test(code);
  if (!hasVariable) {
    return { isValid: false, message: 'Debes guardar el resultado en una variable llamada "rango_medio"' };
  }

  return { isValid: true };
};

export const validateQuery = (code: string, _output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  // Verificar que carga el dataset
  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]iris\.csv['"]\s*\)/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar el dataset con pd.read_csv("iris.csv")' };
  }

  // Verificar que usa .query()
  const hasQuery = /\.query\s*\(/.test(code);
  if (!hasQuery) {
    return { isValid: false, message: 'Debes usar el método .query() para filtrar' };
  }

  // Verificar que menciona petal_length y petal_width
  const hasPetalLength = /petal_length\s*>\s*4/.test(code);
  const hasPetalWidth = /petal_width\s*>\s*1\.5/.test(code);

  if (!hasPetalLength) {
    return { isValid: false, message: 'Debes filtrar por petal_length > 4 dentro de query()' };
  }

  if (!hasPetalWidth) {
    return { isValid: false, message: 'Debes filtrar por petal_width > 1.5 dentro de query()' };
  }

  // Verificar que usa 'and' (no necesariamente &, ya que en query se puede usar 'and')
  const hasAnd = /\sand\s/.test(code) || /&/.test(code);
  if (!hasAnd) {
    return { isValid: false, message: 'Debes combinar ambas condiciones con "and" dentro de query()' };
  }

  // Verificar que guarda en petalos_grandes
  const hasVariable = /petalos_grandes\s*=/.test(code);
  if (!hasVariable) {
    return { isValid: false, message: 'Debes guardar el resultado en una variable llamada "petalos_grandes"' };
  }

  return { isValid: true };
};
