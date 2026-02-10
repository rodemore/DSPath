// Validadores para Módulo 04: Introducción a Listas

export const validateCreateListAndAccess = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea una lista con corchetes
  const hasListCreation = /\w+\s*=\s*\[.*\]/.test(code);
  if (!hasListCreation) {
    return { isValid: false, message: 'Debes crear una lista usando corchetes []. Ejemplo: frutas = ["manzana", "banana", "naranja"]' };
  }

  // Verificar que usa índice para acceder (al menos dos accesos)
  const indexMatches = code.match(/\w+\[\d+\]|\w+\[-\d+\]/g);
  if (!indexMatches || indexMatches.length < 2) {
    return { isValid: false, message: 'Debes acceder a elementos de la lista usando índices al menos dos veces. Ejemplo: frutas[0] y frutas[-1]' };
  }

  // Verificar que imprime al menos dos valores
  const printCount = (code.match(/print\s*\(/g) || []).length;
  if (printCount < 2) {
    return { isValid: false, message: 'Debes usar print() dos veces: una para el primer elemento y otra para el último' };
  }

  // Verificar que el output tiene al menos 2 líneas
  const lines = output.trim().split('\n');
  if (lines.length < 2) {
    return { isValid: false, message: 'Debes imprimir dos valores: el primer elemento y el último elemento' };
  }

  return { isValid: true };
};

export const validateListSlicing = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea una lista con números del 1 al 10
  const listMatch = code.match(/\w+\s*=\s*\[([\d\s,]+)\]/);
  if (!listMatch) {
    return { isValid: false, message: 'Debes crear una lista con números del 1 al 10. Ejemplo: numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]' };
  }

  // Verificar que usa slicing
  const hasSlicing = /\w+\[\d*:\d*\]/.test(code);
  if (!hasSlicing) {
    return { isValid: false, message: 'Debes usar slicing para obtener una porción de la lista. Ejemplo: numeros[2:7]' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar el resultado del slicing' };
  }

  // Verificar que el output contiene los números del 3 al 7
  const outputClean = output.trim();
  const hasCorrectNumbers = outputClean.includes('3') && outputClean.includes('4') &&
                           outputClean.includes('5') && outputClean.includes('6') &&
                           outputClean.includes('7');

  if (!hasCorrectNumbers) {
    return { isValid: false, message: 'El slicing debe obtener los números del 3 al 7. Pista: los números del 3 al 7 están en los índices 2 al 7 (recuerda que los índices empiezan en 0)' };
  }

  return { isValid: true };
};
