// Validadores para Módulo 05: Métodos de Listas

export const validateAppendMethod = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea una lista vacía o con elementos
  const hasListCreation = /\w+\s*=\s*\[.*\]/.test(code);
  if (!hasListCreation) {
    return { isValid: false, message: 'Debes crear una lista primero. Ejemplo: colores = []' };
  }

  // Verificar que usa append al menos 3 veces
  const appendCount = (code.match(/\.append\s*\(/g) || []).length;
  if (appendCount < 3) {
    return { isValid: false, message: 'Debes usar .append() al menos 3 veces para agregar 3 colores. Ejemplo: colores.append("rojo")' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar la lista después de agregar los elementos' };
  }

  // Verificar que el output muestra una lista con al menos 3 elementos
  const outputClean = output.trim();
  if (!outputClean.includes('[') || !outputClean.includes(']')) {
    return { isValid: false, message: 'El output debe mostrar una lista. Asegúrate de imprimir la lista completa' };
  }

  return { isValid: true };
};

export const validateExtendMethod = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea una lista con [1, 2, 3]
  const hasCorrectList = /\w+\s*=\s*\[\s*1\s*,\s*2\s*,\s*3\s*\]/.test(code);
  if (!hasCorrectList) {
    return { isValid: false, message: 'Debes crear la lista numeros = [1, 2, 3] como indica el ejercicio' };
  }

  // Verificar que usa extend
  const hasExtend = /\.extend\s*\(/.test(code);
  if (!hasExtend) {
    return { isValid: false, message: 'Debes usar el método .extend() para agregar múltiples elementos. Ejemplo: numeros.extend([4, 5, 6])' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar la lista después de extenderla' };
  }

  // Verificar que el output contiene los números del 1 al 6
  const outputClean = output.trim();
  const hasAllNumbers = ['1', '2', '3', '4', '5', '6'].every(num => outputClean.includes(num));

  if (!hasAllNumbers) {
    return { isValid: false, message: 'La lista debe contener los números del 1 al 6 después de usar extend([4, 5, 6])' };
  }

  return { isValid: true };
};

export const validateInsertAndPop = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea la lista correcta ["a", "b", "c"]
  const hasCorrectList = /\w+\s*=\s*\[\s*["']a["']\s*,\s*["']b["']\s*,\s*["']c["']\s*\]/.test(code);
  if (!hasCorrectList) {
    return { isValid: false, message: 'Debes crear la lista letras = ["a", "b", "c"] como indica el ejercicio' };
  }

  // Verificar que usa insert con posición 1
  const hasInsert = /\.insert\s*\(\s*1\s*,/.test(code);
  if (!hasInsert) {
    return { isValid: false, message: 'Debes usar .insert(1, "x") para insertar "x" en la posición 1' };
  }

  // Verificar que usa pop
  const hasPop = /\.pop\s*\(/.test(code);
  if (!hasPop) {
    return { isValid: false, message: 'Debes usar el método .pop() para eliminar el último elemento' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar la lista después de las modificaciones' };
  }

  // Verificar que el output muestra una lista
  const outputClean = output.trim();
  if (!outputClean.includes('[') || !outputClean.includes(']')) {
    return { isValid: false, message: 'El output debe mostrar una lista. Asegúrate de imprimir la lista completa' };
  }

  // El resultado debería ser ['a', 'x', 'b'] después de insert(1, 'x') y pop()
  // (original: ['a', 'b', 'c'] -> insert 'x' en pos 1 -> ['a', 'x', 'b', 'c'] -> pop último -> ['a', 'x', 'b'])
  const hasCorrectResult = outputClean.includes('a') && outputClean.includes('x') && outputClean.includes('b') && !outputClean.includes('c');
  if (!hasCorrectResult) {
    return { isValid: false, message: 'Verifica el orden de las operaciones. Después de insertar "x" en posición 1 y hacer pop(), la lista debería ser ["a", "x", "b"]' };
  }

  return { isValid: true };
};
