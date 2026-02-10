// Validadores para Módulo 01: Variables y Tipos de Datos

export const validateVariableAndPrint = (code: string, output: string): { isValid: boolean; message?: string } => {
  // Verificar que el código no esté vacío
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  // Verificar que hay output
  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que contiene una asignación de variable (nombre = "algo")
  const hasStringAssignment = /\w+\s*=\s*["'][^"']+["']/.test(code);
  if (!hasStringAssignment) {
    return { isValid: false, message: 'Debes crear una variable de texto (string) con tu nombre. Ejemplo: nombre = "Juan"' };
  }

  // Verificar que usa print()
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar tu variable' };
  }

  // Si pasa todas las validaciones
  return { isValid: true };
};

export const validateTwoVariablesAndTypes = (code: string, output: string): { isValid: boolean; message?: string } => {
  // Verificar que el código no esté vacío
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  // Verificar que hay dos líneas de output
  const lines = output.trim().split('\n');
  if (lines.length < 2) {
    return { isValid: false, message: 'Debes imprimir dos valores: el tipo de pi y el tipo de es_positivo' };
  }

  // Verificar que contiene asignación con número decimal
  const hasFloatAssignment = /\w+\s*=\s*\d+\.\d+/.test(code);
  if (!hasFloatAssignment) {
    return { isValid: false, message: 'Debes crear una variable con un número decimal (float). Ejemplo: pi = 3.14159' };
  }

  // Verificar que contiene asignación con booleano
  const hasBoolAssignment = /\w+\s*=\s*(True|False)/.test(code);
  if (!hasBoolAssignment) {
    return { isValid: false, message: 'Debes crear una variable booleana (True o False). Ejemplo: es_positivo = True' };
  }

  // Verificar que usa type() al menos dos veces
  const typeCount = (code.match(/type\s*\(/g) || []).length;
  if (typeCount < 2) {
    return { isValid: false, message: 'Debes usar type() dos veces para verificar el tipo de ambas variables' };
  }

  // Verificar que usa print() al menos dos veces
  const printCount = (code.match(/print\s*\(/g) || []).length;
  if (printCount < 2) {
    return { isValid: false, message: 'Debes usar print() dos veces para mostrar ambos tipos' };
  }

  // Verificar que el output contiene las clases esperadas
  const hasFloatClass = lines.some(line => line.includes("'float'"));
  const hasBoolClass = lines.some(line => line.includes("'bool'"));

  if (!hasFloatClass) {
    return { isValid: false, message: 'No se detectó <class \'float\'>. Verifica que creaste un número decimal correctamente' };
  }

  if (!hasBoolClass) {
    return { isValid: false, message: 'No se detectó <class \'bool\'>. Verifica que creaste un valor booleano (True o False)' };
  }

  // Si pasa todas las validaciones
  return { isValid: true };
};

export const validatePrintWithTextAndVariables = (code: string, output: string): { isValid: boolean; message?: string } => {
  // Verificar que el código no esté vacío
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  // Verificar que hay output
  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que hay al menos dos asignaciones de variables
  const assignmentCount = (code.match(/\w+\s*=\s*[^=]/g) || []).length;
  if (assignmentCount < 2) {
    return { isValid: false, message: 'Debes crear dos variables. Ejemplo: nombre = "Ana" y edad = 25' };
  }

  // Verificar que usa print() con comas (múltiples argumentos)
  const hasPrintWithComma = /print\s*\([^)]*,[^)]*\)/.test(code);
  if (!hasPrintWithComma) {
    return { isValid: false, message: 'Debes usar print() con texto y variables separadas por comas. Ejemplo: print("Hola, me llamo", nombre)' };
  }

  // Verificar que hay al menos un string literal en el print (texto hardcodeado)
  const hasStringInPrint = /print\s*\([^)]*["'][^"']*["'][^)]*\)/.test(code);
  if (!hasStringInPrint) {
    return { isValid: false, message: 'Debes incluir texto entre comillas en el print(). Ejemplo: print("Mi nombre es", nombre)' };
  }

  // Si pasa todas las validaciones
  return { isValid: true };
};
