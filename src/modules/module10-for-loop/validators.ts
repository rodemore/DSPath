// Validadores para Módulo 10: Bucle FOR

export const validateForList = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea la lista
  const hasList = /colores\s*=\s*\[.*"rojo".*"azul".*"verde".*\]/.test(code) ||
                  /colores\s*=\s*\[.*'rojo'.*'azul'.*'verde'.*\]/.test(code);
  if (!hasList) {
    return { isValid: false, message: 'Debes crear la lista colores = ["rojo", "azul", "verde"] como indica el ejercicio' };
  }

  // Verificar que usa for
  const hasFor = /\bfor\b/.test(code);
  if (!hasFor) {
    return { isValid: false, message: 'Debes usar un bucle "for" para iterar sobre la lista' };
  }

  // Verificar que usa in
  const hasIn = /\bin\b/.test(code);
  if (!hasIn) {
    return { isValid: false, message: 'Debes usar "in" en el bucle for. Ejemplo: for color in colores:' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() dentro del bucle para mostrar cada color' };
  }

  // Verificar que el output contiene los tres colores
  const outputLower = output.toLowerCase();
  if (!outputLower.includes('rojo') || !outputLower.includes('azul') || !outputLower.includes('verde')) {
    return { isValid: false, message: 'El output debe mostrar los tres colores: rojo, azul y verde' };
  }

  return { isValid: true };
};

export const validateForString = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea la variable palabra
  const hasPalabra = /palabra\s*=\s*["']Python["']/.test(code);
  if (!hasPalabra) {
    return { isValid: false, message: 'Debes crear la variable palabra = "Python" como indica el ejercicio' };
  }

  // Verificar que usa for
  const hasFor = /\bfor\b/.test(code);
  if (!hasFor) {
    return { isValid: false, message: 'Debes usar un bucle "for" para iterar sobre la palabra' };
  }

  // Verificar que usa in
  const hasIn = /\bin\b/.test(code);
  if (!hasIn) {
    return { isValid: false, message: 'Debes usar "in" en el bucle for. Ejemplo: for letra in palabra:' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() dentro del bucle para mostrar cada letra' };
  }

  // Verificar que el output contiene las letras de Python
  const lines = output.trim().split('\n');
  if (lines.length < 6) {
    return { isValid: false, message: 'Debes imprimir cada letra de "Python" (6 letras en total)' };
  }

  return { isValid: true };
};

export const validateForRange = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que usa for
  const hasFor = /\bfor\b/.test(code);
  if (!hasFor) {
    return { isValid: false, message: 'Debes usar un bucle "for" para iterar' };
  }

  // Verificar que usa range
  const hasRange = /range\s*\(/.test(code);
  if (!hasRange) {
    return { isValid: false, message: 'Debes usar la función range() en el bucle. Ejemplo: for i in range(1, 11):' };
  }

  // Verificar que usa range(1, 11) para números del 1 al 10
  const hasCorrectRange = /range\s*\(\s*1\s*,\s*11\s*\)/.test(code);
  if (!hasCorrectRange) {
    return { isValid: false, message: 'Debes usar range(1, 11) para generar números del 1 al 10' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() dentro del bucle para mostrar cada número' };
  }

  // Verificar que el output contiene números del 1 al 10
  const lines = output.trim().split('\n');
  if (lines.length < 10) {
    return { isValid: false, message: 'Debes imprimir 10 números (del 1 al 10)' };
  }

  return { isValid: true };
};

export const validateForRangeSum = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea la lista
  const hasList = /numeros\s*=\s*\[\s*5\s*,\s*10\s*,\s*15\s*,\s*20\s*,\s*25\s*\]/.test(code);
  if (!hasList) {
    return { isValid: false, message: 'Debes crear la lista numeros = [5, 10, 15, 20, 25] como indica el ejercicio' };
  }

  // Verificar que crea la variable suma
  const hasSuma = /suma\s*=\s*0/.test(code);
  if (!hasSuma) {
    return { isValid: false, message: 'Debes crear una variable suma = 0 antes del bucle para acumular los valores' };
  }

  // Verificar que usa for
  const hasFor = /\bfor\b/.test(code);
  if (!hasFor) {
    return { isValid: false, message: 'Debes usar un bucle "for" para iterar sobre la lista' };
  }

  // Verificar que usa in
  const hasIn = /\bin\b/.test(code);
  if (!hasIn) {
    return { isValid: false, message: 'Debes usar "in" en el bucle for. Ejemplo: for numero in numeros:' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar la suma total al final' };
  }

  // Verificar que el output es 75 (5+10+15+20+25)
  const outputNum = parseInt(output.trim().match(/\d+/)?.[0] || '0');
  if (outputNum !== 75) {
    return { isValid: false, message: 'La suma de [5, 10, 15, 20, 25] debe ser 75. Verifica que estés acumulando correctamente' };
  }

  return { isValid: true };
};

export const validateForWithIf = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea la lista
  const hasList = /numeros\s*=\s*\[\s*12\s*,\s*7\s*,\s*23\s*,\s*8\s*,\s*15\s*,\s*30\s*,\s*5\s*\]/.test(code);
  if (!hasList) {
    return { isValid: false, message: 'Debes crear la lista numeros = [12, 7, 23, 8, 15, 30, 5] como indica el ejercicio' };
  }

  // Verificar que crea la variable contador
  const hasContador = /contador\s*=\s*0/.test(code);
  if (!hasContador) {
    return { isValid: false, message: 'Debes crear una variable contador = 0 antes del bucle' };
  }

  // Verificar que usa for
  const hasFor = /\bfor\b/.test(code);
  if (!hasFor) {
    return { isValid: false, message: 'Debes usar un bucle "for" para iterar sobre la lista' };
  }

  // Verificar que usa if
  const hasIf = /\bif\b/.test(code);
  if (!hasIf) {
    return { isValid: false, message: 'Debes usar "if" dentro del bucle para verificar si el número es mayor a 10' };
  }

  // Verificar que compara con > 10
  const hasComparison = />\s*10/.test(code) || /10\s*</.test(code);
  if (!hasComparison) {
    return { isValid: false, message: 'Debes verificar si cada número es mayor a 10 (numero > 10)' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar el contador al final' };
  }

  // Verificar que el output es 4 (12, 23, 15, 30 son mayores a 10)
  const outputNum = parseInt(output.trim().match(/\d+/)?.[0] || '0');
  if (outputNum !== 4) {
    return { isValid: false, message: 'Hay 4 números mayores a 10 en la lista (12, 23, 15, 30). Verifica tu lógica' };
  }

  return { isValid: true };
};
