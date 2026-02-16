// Validadores para Módulo 14: Pandas - Selección de Datos

export const validateSelectColumn = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  // Verificar que carga el dataset
  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]iris\.csv['"]\s*\)/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar el dataset con pd.read_csv("iris.csv")' };
  }

  // Verificar que selecciona la columna species
  const hasSpeciesColumn = /df\[['"]species['"]\]/.test(code) || /df\.species/.test(code);
  if (!hasSpeciesColumn) {
    return { isValid: false, message: 'Debes seleccionar la columna "species" usando df["species"]' };
  }

  // Verificar que guarda en especies
  const hasEspecies = /especies\s*=/.test(code);
  if (!hasEspecies) {
    return { isValid: false, message: 'Debes guardar la columna en una variable llamada "especies"' };
  }

  // Verificar que usa head()
  const hasHead = /especies\.head\s*\(\s*\)/.test(code);
  if (!hasHead) {
    return { isValid: false, message: 'Debes usar especies.head() para ver los primeros valores' };
  }

  // Verificar que el output contiene datos de especies
  const hasSpeciesData = output.includes('setosa') || output.includes('versicolor') || output.includes('virginica');
  if (!hasSpeciesData) {
    return { isValid: false, message: 'El output debe mostrar los valores de la columna species (setosa, versicolor, virginica)' };
  }

  return { isValid: true };
};

export const validateSelectMultipleColumns = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  // Verificar que carga el dataset
  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]iris\.csv['"]\s*\)/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar el dataset con pd.read_csv("iris.csv")' };
  }

  // Verificar que usa doble corchete [[]]
  const hasDoubleBracket = /df\[\[/.test(code);
  if (!hasDoubleBracket) {
    return { isValid: false, message: 'Para seleccionar múltiples columnas debes usar doble corchete: df[[ ... ]]' };
  }

  // Verificar que selecciona las columnas correctas
  const hasSepalLength = /['"]sepal_length['"]/.test(code);
  const hasSepalWidth = /['"]sepal_width['"]/.test(code);
  if (!hasSepalLength || !hasSepalWidth) {
    return { isValid: false, message: 'Debes seleccionar las columnas "sepal_length" y "sepal_width"' };
  }

  // Verificar que guarda en sepalos
  const hasSepalos = /sepalos\s*=/.test(code);
  if (!hasSepalos) {
    return { isValid: false, message: 'Debes guardar el resultado en una variable llamada "sepalos"' };
  }

  // Verificar que el output contiene las columnas correctas
  const hasCorrectColumns = output.includes('sepal_length') && output.includes('sepal_width');
  if (!hasCorrectColumns) {
    return { isValid: false, message: 'El output debe mostrar las columnas sepal_length y sepal_width' };
  }

  return { isValid: true };
};

export const validateIloc = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  // Verificar que carga el dataset
  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]iris\.csv['"]\s*\)/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar el dataset con pd.read_csv("iris.csv")' };
  }

  // Verificar que usa iloc
  const hasIloc = /\.iloc\[/.test(code);
  if (!hasIloc) {
    return { isValid: false, message: 'Debes usar .iloc[] para seleccionar filas por posición' };
  }

  // Verificar que usa el rango correcto (5:10)
  const hasCorrectRange = /\.iloc\[5:10\]/.test(code) || /\.iloc\[\s*5\s*:\s*10\s*\]/.test(code);
  if (!hasCorrectRange) {
    return { isValid: false, message: 'Debes seleccionar las filas de la posición 5 a la 9 usando .iloc[5:10]' };
  }

  // Verificar que guarda en subset
  const hasSubset = /subset\s*=/.test(code);
  if (!hasSubset) {
    return { isValid: false, message: 'Debes guardar el resultado en una variable llamada "subset"' };
  }

  return { isValid: true };
};

export const validateLoc = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  // Verificar que carga el dataset
  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]iris\.csv['"]\s*\)/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar el dataset con pd.read_csv("iris.csv")' };
  }

  // Verificar que usa loc
  const hasLoc = /\.loc\[/.test(code);
  if (!hasLoc) {
    return { isValid: false, message: 'Debes usar .loc[] para filtrar filas' };
  }

  // Verificar que filtra por species == 'virginica'
  const hasViginicaFilter = /['"]species['"]\]\s*==\s*['"]virginica['"]/.test(code);
  if (!hasViginicaFilter) {
    return { isValid: false, message: 'Debes filtrar por species == "virginica" dentro de .loc[]' };
  }

  // Verificar que guarda en virginicas
  const hasVirginicas = /virginicas\s*=/.test(code);
  if (!hasVirginicas) {
    return { isValid: false, message: 'Debes guardar el resultado en una variable llamada "virginicas"' };
  }

  // Verificar que el output contiene solo virginica
  const hasOnlyVirginica = output.includes('virginica') && !output.includes('setosa') && !output.includes('versicolor');
  if (!hasOnlyVirginica) {
    return { isValid: false, message: 'El output debe mostrar solo flores de la especie virginica. Verifica que el filtro esté correcto' };
  }

  return { isValid: true };
};
