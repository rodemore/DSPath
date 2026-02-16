// Validadores para Módulo 13: Pandas - DataFrames y Selección

export const validateLoadDataFrame = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  // Verificar que importa pandas
  const hasPandasImport = /import\s+pandas\s+as\s+pd/.test(code);
  if (!hasPandasImport) {
    return { isValid: false, message: 'Debes importar pandas como pd: import pandas as pd' };
  }

  // Verificar que carga el CSV
  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]iris\.csv['"]\s*\)/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar el archivo con pd.read_csv("iris.csv")' };
  }

  // Verificar que guarda en variable df
  const hasDf = /df\s*=\s*pd\.read_csv/.test(code);
  if (!hasDf) {
    return { isValid: false, message: 'Debes guardar el DataFrame en una variable llamada "df"' };
  }

  // Verificar que usa head()
  const hasHead = /df\.head\s*\(\s*\)/.test(code);
  if (!hasHead) {
    return { isValid: false, message: 'Debes usar df.head() para ver las primeras filas' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar el resultado' };
  }

  // Verificar que el output contiene datos del iris (algunas columnas)
  const hasIrisData = output.includes('sepal_length') && output.includes('species');
  if (!hasIrisData) {
    return { isValid: false, message: 'El output debe mostrar las columnas del dataset iris. Verifica que estés imprimiendo df.head()' };
  }

  return { isValid: true };
};

export const validateShape = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  // Verificar que carga el dataset
  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]iris\.csv['"]\s*\)/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar el dataset con pd.read_csv("iris.csv")' };
  }

  // Verificar que usa .shape
  const hasShape = /\.shape/.test(code);
  if (!hasShape) {
    return { isValid: false, message: 'Debes usar .shape para ver las dimensiones del DataFrame' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar el resultado' };
  }

  // Verificar que el output contiene (150, 5) - las dimensiones de iris
  const hasCorrectShape = output.includes('150') && output.includes('5');
  if (!hasCorrectShape) {
    return { isValid: false, message: 'El output debe mostrar (150, 5), las dimensiones del dataset iris' };
  }

  return { isValid: true };
};

export const validateReadCsvWithSep = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  // Verificar que importa pandas
  const hasPandasImport = /import\s+pandas\s+as\s+pd/.test(code);
  if (!hasPandasImport) {
    return { isValid: false, message: 'Debes importar pandas como pd: import pandas as pd' };
  }

  // Verificar que carga el archivo tips.csv
  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]tips\.csv['"]/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar el archivo con pd.read_csv("tips.csv", ...)' };
  }

  // Verificar que usa el parámetro sep='|'
  const hasSepParameter = /sep\s*=\s*['"][|]['"]/.test(code);
  if (!hasSepParameter) {
    return { isValid: false, message: 'Debes usar el parámetro sep="|" para especificar que el separador es pipe (|)' };
  }

  // Verificar que guarda en variable tips
  const hasTips = /tips\s*=\s*pd\.read_csv/.test(code);
  if (!hasTips) {
    return { isValid: false, message: 'Debes guardar el DataFrame en una variable llamada "tips"' };
  }

  // Verificar que usa head()
  const hasHead = /tips\.head\s*\(\s*\)/.test(code);
  if (!hasHead) {
    return { isValid: false, message: 'Debes usar tips.head() para ver las primeras filas' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar el resultado' };
  }

  // Verificar que el output contiene columnas del dataset tips
  const hasTipsData = output.includes('total_bill') && output.includes('tip');
  if (!hasTipsData) {
    return { isValid: false, message: 'El output debe mostrar las columnas del dataset tips (total_bill, tip, etc.). Verifica que estés usando sep="|"' };
  }

  return { isValid: true };
};

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
