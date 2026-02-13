// Validadores para Módulo 02: Operaciones Numéricas

export const validateSumOperation = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que hay dos asignaciones de variables numéricas
  const hasNumAssignments = (code.match(/\w+\s*=\s*\d+/g) || []).length >= 2;
  if (!hasNumAssignments) {
    return { isValid: false, message: 'Debes crear dos variables con números. Ejemplo: a = 10 y b = 20' };
  }

  // Verificar que usa el operador +
  const hasAddition = /\+/.test(code);
  if (!hasAddition) {
    return { isValid: false, message: 'Debes usar el operador + para sumar. Ejemplo: a + b' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar el resultado' };
  }

  // Verificar que el output es un número
  if (!/^\d+$/.test(output.trim())) {
    return { isValid: false, message: 'El resultado debe ser un número. Asegúrate de sumar dos números' };
  }

  return { isValid: true };
};

export const validateRectangleArea = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que hay variables base y altura
  const hasBase = /base\s*=\s*\d+/.test(code);
  const hasAltura = /altura\s*=\s*\d+/.test(code);

  if (!hasBase || !hasAltura) {
    return { isValid: false, message: 'Debes crear dos variables: base y altura con valores numéricos. Ejemplo: base = 8, altura = 5' };
  }

  // Verificar que usa multiplicación
  const hasMultiplication = /\*/.test(code);
  if (!hasMultiplication) {
    return { isValid: false, message: 'Debes usar el operador * para calcular el área. Área = base * altura' };
  }

  // Verificar que crea la variable 'area'
  const hasAreaVariable = /area\s*=/.test(code);
  if (!hasAreaVariable) {
    return { isValid: false, message: 'Debes crear una variable llamada "area" con el resultado de base * altura. Ejemplo: area = base * altura' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar el área' };
  }

  // Verificar que el output es un número
  if (!/^\d+$/.test(output.trim())) {
    return { isValid: false, message: 'El resultado debe ser un número. Asegúrate de multiplicar base * altura y guardar en area' };
  }

  return { isValid: true };
};

export const validatePowerOperation = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea variables numero y exponente
  const hasNumero = /numero\s*=\s*\d+/.test(code);
  const hasExponente = /exponente\s*=\s*\d+/.test(code);

  if (!hasNumero || !hasExponente) {
    return { isValid: false, message: 'Debes crear dos variables: numero y exponente. Ejemplo: numero = 2, exponente = 3' };
  }

  // Verificar que usa el operador **
  const hasPower = /\*\*/.test(code);
  if (!hasPower) {
    return { isValid: false, message: 'Debes usar el operador ** para calcular la potencia. Ejemplo: numero ** exponente' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar el resultado' };
  }

  // Verificar que el output es un número
  if (!/^\d+$/.test(output.trim())) {
    return { isValid: false, message: 'El resultado debe ser un número. Asegúrate de calcular numero ** exponente' };
  }

  return { isValid: true };
};

export const validateDivisionAndModulo = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea variables dividendo y divisor
  const hasDividendo = /dividendo\s*=\s*\d+/.test(code);
  const hasDivisor = /divisor\s*=\s*\d+/.test(code);

  if (!hasDividendo || !hasDivisor) {
    return { isValid: false, message: 'Debes crear dos variables: dividendo y divisor. Ejemplo: dividendo = 23, divisor = 4' };
  }

  // Verificar que usa división entera //
  const hasFloorDiv = /\/\//.test(code);
  if (!hasFloorDiv) {
    return { isValid: false, message: 'Debes usar el operador // para división entera (cociente). Ejemplo: cociente = dividendo // divisor' };
  }

  // Verificar que usa módulo %
  const hasModulo = /%/.test(code);
  if (!hasModulo) {
    return { isValid: false, message: 'Debes usar el operador % para obtener el residuo. Ejemplo: residuo = dividendo % divisor' };
  }

  // Verificar que crea la variable 'cociente'
  const hasCocienteVariable = /cociente\s*=/.test(code);
  if (!hasCocienteVariable) {
    return { isValid: false, message: 'Debes crear una variable llamada "cociente" con el resultado de dividendo // divisor' };
  }

  // Verificar que crea la variable 'residuo'
  const hasResiduoVariable = /residuo\s*=/.test(code);
  if (!hasResiduoVariable) {
    return { isValid: false, message: 'Debes crear una variable llamada "residuo" con el resultado de dividendo % divisor' };
  }

  // Verificar que imprime al menos dos valores
  const printCount = (code.match(/print\s*\(/g) || []).length;
  if (printCount < 2) {
    return { isValid: false, message: 'Debes usar print() dos veces: una para el cociente y otra para el residuo' };
  }

  // Verificar que el output tiene al menos 2 líneas
  const lines = output.trim().split('\n');
  if (lines.length < 2) {
    return { isValid: false, message: 'Debes imprimir dos valores: cociente y residuo' };
  }

  return { isValid: true };
};
