// Validadores para Módulo 16: Pandas - Filtros y Operadores Lógicos

export const validateSimpleFilter = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  // Verificar que carga el dataset
  const hasReadCsv = /pd\.read_csv\s*\(\s*['"]iris\.csv['"]\s*\)/.test(code);
  if (!hasReadCsv) {
    return { isValid: false, message: 'Debes cargar el dataset con pd.read_csv("iris.csv")' };
  }

  // Verificar que usa loc para filtrar
  const hasLoc = /\.loc\[/.test(code);
  if (!hasLoc) {
    return { isValid: false, message: 'Debes usar .loc[] para filtrar datos' };
  }

  // Verificar que filtra por sepal_length > 6.0
  const hasCorrectFilter = /['"]sepal_length['"]\]\s*>\s*6\.0/.test(code) || /['"]sepal_length['"]\]\s*>\s*6/.test(code);
  if (!hasCorrectFilter) {
    return { isValid: false, message: 'Debes filtrar por sepal_length > 6.0' };
  }

  // Verificar que guarda en flores_grandes
  const hasVariable = /flores_grandes\s*=/.test(code);
  if (!hasVariable) {
    return { isValid: false, message: 'Debes guardar el resultado en una variable llamada "flores_grandes"' };
  }

  return { isValid: true };
};

export const validateAndFilter = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  // Verificar que usa el operador &
  const hasAnd = /&/.test(code);
  if (!hasAnd) {
    return { isValid: false, message: 'Debes usar el operador & para combinar condiciones' };
  }

  // Verificar que filtra por species == 'setosa'
  const hasSetosa = /['"]species['"]\]\s*==\s*['"]setosa['"]/.test(code);
  if (!hasSetosa) {
    return { isValid: false, message: 'Debes filtrar por species == "setosa"' };
  }

  // Verificar que filtra por petal_length > 1.5
  const hasPetalLength = /['"]petal_length['"]\]\s*>\s*1\.5/.test(code);
  if (!hasPetalLength) {
    return { isValid: false, message: 'Debes filtrar por petal_length > 1.5' };
  }

  // Verificar que guarda en setosa_grandes
  const hasVariable = /setosa_grandes\s*=/.test(code);
  if (!hasVariable) {
    return { isValid: false, message: 'Debes guardar el resultado en una variable llamada "setosa_grandes"' };
  }

  // Verificar que el output contiene solo setosa
  const hasOnlySetosa = output.includes('setosa') && !output.includes('versicolor') && !output.includes('virginica');
  if (!hasOnlySetosa) {
    return { isValid: false, message: 'El resultado debe contener solo flores de la especie setosa' };
  }

  return { isValid: true };
};

export const validateOrFilter = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  // Verificar que usa el operador |
  const hasOr = /\|/.test(code);
  if (!hasOr) {
    return { isValid: false, message: 'Debes usar el operador | para el OR lógico' };
  }

  // Verificar que filtra por setosa o virginica
  const hasSetosa = /['"]species['"]\]\s*==\s*['"]setosa['"]/.test(code);
  const hasVirginica = /['"]species['"]\]\s*==\s*['"]virginica['"]/.test(code);

  if (!hasSetosa || !hasVirginica) {
    return { isValid: false, message: 'Debes filtrar por species == "setosa" O species == "virginica"' };
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
    return { isValid: false, message: 'El resultado NO debe contener flores versicolor. Verifica tu filtro con |' };
  }

  return { isValid: true };
};

export const validateNotFilter = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  // Verificar que usa ~ o !=
  const hasNot = /~/.test(code) || /!=/.test(code);
  if (!hasNot) {
    return { isValid: false, message: 'Debes usar el operador ~ o != para negar la condición' };
  }

  // Verificar que menciona versicolor
  const hasVersicolor = /['"]versicolor['"]/.test(code);
  if (!hasVersicolor) {
    return { isValid: false, message: 'Debes filtrar las flores que NO sean versicolor' };
  }

  // Verificar que guarda en no_versicolor
  const hasVariable = /no_versicolor\s*=/.test(code);
  if (!hasVariable) {
    return { isValid: false, message: 'Debes guardar el resultado en una variable llamada "no_versicolor"' };
  }

  // Verificar que el output NO contiene versicolor pero sí las otras
  const hasVersicolorOutput = output.includes('versicolor');
  const hasSetosa = output.includes('setosa');
  const hasVirginica = output.includes('virginica');

  if (hasVersicolorOutput) {
    return { isValid: false, message: 'El resultado NO debe contener flores versicolor. Verifica tu filtro' };
  }

  if (!hasSetosa || !hasVirginica) {
    return { isValid: false, message: 'El resultado debe contener flores setosa y virginica (todas excepto versicolor)' };
  }

  return { isValid: true };
};
