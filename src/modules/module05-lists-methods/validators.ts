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

export const validateSumAndLen = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea la lista calificaciones con los valores correctos
  const hasCalificaciones = /calificaciones\s*=\s*\[\s*85\s*,\s*90\s*,\s*78\s*,\s*92\s*,\s*88\s*\]/.test(code);
  if (!hasCalificaciones) {
    return { isValid: false, message: 'Debes crear la lista calificaciones = [85, 90, 78, 92, 88] como indica el ejercicio' };
  }

  // Verificar que usa sum()
  const hasSum = /sum\s*\(/.test(code);
  if (!hasSum) {
    return { isValid: false, message: 'Debes usar la función sum() para sumar las calificaciones. Ejemplo: sum(calificaciones)' };
  }

  // Verificar que usa len()
  const hasLen = /len\s*\(/.test(code);
  if (!hasLen) {
    return { isValid: false, message: 'Debes usar la función len() para obtener la cantidad de calificaciones. Ejemplo: len(calificaciones)' };
  }

  // Verificar que crea la variable 'total'
  const hasTotal = /total\s*=/.test(code);
  if (!hasTotal) {
    return { isValid: false, message: 'Debes crear una variable llamada "total" con el resultado de sum(calificaciones)' };
  }

  // Verificar que crea la variable 'cantidad'
  const hasCantidad = /cantidad\s*=/.test(code);
  if (!hasCantidad) {
    return { isValid: false, message: 'Debes crear una variable llamada "cantidad" con el resultado de len(calificaciones)' };
  }

  // Verificar que crea la variable 'promedio'
  const hasPromedio = /promedio\s*=/.test(code);
  if (!hasPromedio) {
    return { isValid: false, message: 'Debes crear una variable llamada "promedio" dividiendo total entre cantidad' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar el promedio' };
  }

  // Verificar que el output es correcto (el promedio de 85, 90, 78, 92, 88 es 86.6)
  const outputNum = parseFloat(output.trim());
  if (isNaN(outputNum) || Math.abs(outputNum - 86.6) > 0.1) {
    return { isValid: false, message: 'El promedio de [85, 90, 78, 92, 88] debe ser 86.6. Verifica tus cálculos' };
  }

  return { isValid: true };
};

export const validateIndexAndCount = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea la lista correcta
  const hasCorrectList = /numeros\s*=\s*\[\s*5\s*,\s*10\s*,\s*15\s*,\s*10\s*,\s*20\s*,\s*10\s*,\s*25\s*\]/.test(code);
  if (!hasCorrectList) {
    return { isValid: false, message: 'Debes crear la lista numeros = [5, 10, 15, 10, 20, 10, 25] como indica el ejercicio' };
  }

  // Verificar que usa index()
  const hasIndex = /\.index\s*\(\s*15\s*\)/.test(code);
  if (!hasIndex) {
    return { isValid: false, message: 'Debes usar .index(15) para encontrar la posición del número 15. Ejemplo: numeros.index(15)' };
  }

  // Verificar que usa count()
  const hasCount = /\.count\s*\(\s*10\s*\)/.test(code);
  if (!hasCount) {
    return { isValid: false, message: 'Debes usar .count(10) para contar cuántas veces aparece el 10. Ejemplo: numeros.count(10)' };
  }

  // Verificar que crea la variable 'posicion'
  const hasPosicion = /posicion\s*=/.test(code);
  if (!hasPosicion) {
    return { isValid: false, message: 'Debes crear una variable llamada "posicion" con el resultado de .index(15)' };
  }

  // Verificar que crea la variable 'apariciones'
  const hasApariciones = /apariciones\s*=/.test(code);
  if (!hasApariciones) {
    return { isValid: false, message: 'Debes crear una variable llamada "apariciones" con el resultado de .count(10)' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar ambos resultados' };
  }

  // Verificar que el output contiene los valores esperados (posición 2, apariciones 3)
  const outputStr = output.trim();
  if (!outputStr.includes('2') || !outputStr.includes('3')) {
    return { isValid: false, message: 'El resultado debe mostrar que 15 está en la posición 2 y que 10 aparece 3 veces' };
  }

  return { isValid: true };
};

export const validateSortList = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea la lista correcta
  const hasCorrectList = /precios\s*=\s*\[\s*45\s*,\s*23\s*,\s*67\s*,\s*12\s*,\s*89\s*,\s*34\s*\]/.test(code);
  if (!hasCorrectList) {
    return { isValid: false, message: 'Debes crear la lista precios = [45, 23, 67, 12, 89, 34] como indica el ejercicio' };
  }

  // Verificar que usa sort()
  const hasSort = /\.sort\s*\(\s*\)/.test(code);
  if (!hasSort) {
    return { isValid: false, message: 'Debes usar el método .sort() para ordenar la lista. Ejemplo: precios.sort()' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar la lista ordenada' };
  }

  // Verificar que el output muestra la lista ordenada [12, 23, 34, 45, 67, 89]
  const outputClean = output.trim();
  const hasCorrectOrder = outputClean.includes('12') &&
                          outputClean.includes('23') &&
                          outputClean.includes('34') &&
                          outputClean.includes('45') &&
                          outputClean.includes('67') &&
                          outputClean.includes('89');

  if (!hasCorrectOrder) {
    return { isValid: false, message: 'La lista debe estar ordenada de menor a mayor: [12, 23, 34, 45, 67, 89]' };
  }

  // Verificar el orden específico (que 12 aparezca antes que 89 en el output)
  const index12 = outputClean.indexOf('12');
  const index89 = outputClean.indexOf('89');

  if (index12 === -1 || index89 === -1 || index12 > index89) {
    return { isValid: false, message: 'La lista no está correctamente ordenada. Usa .sort() para ordenar de menor a mayor' };
  }

  return { isValid: true };
};
