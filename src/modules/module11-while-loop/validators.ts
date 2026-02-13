// Validadores para Módulo 11: Bucle WHILE

export const validateWhileBasic = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea la variable contador
  const hasContador = /contador\s*=\s*1/.test(code);
  if (!hasContador) {
    return { isValid: false, message: 'Debes crear la variable contador = 1 como indica el ejercicio' };
  }

  // Verificar que usa while
  const hasWhile = /\bwhile\b/.test(code);
  if (!hasWhile) {
    return { isValid: false, message: 'Debes usar un bucle "while" para repetir el código' };
  }

  // Verificar que la condición verifica <= 5
  const hasCondition = /contador\s*<=\s*5/.test(code) || /5\s*>=\s*contador/.test(code);
  if (!hasCondition) {
    return { isValid: false, message: 'Debes usar la condición "contador <= 5" en el while' };
  }

  // Verificar que incrementa el contador
  const hasIncrement = /contador\s*=\s*contador\s*\+\s*1/.test(code) || /contador\s*\+=\s*1/.test(code);
  if (!hasIncrement) {
    return { isValid: false, message: 'Debes incrementar el contador dentro del bucle. Ejemplo: contador = contador + 1' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() dentro del bucle para mostrar cada número' };
  }

  // Verificar que el output contiene números del 1 al 5
  const lines = output.trim().split('\n');
  if (lines.length < 5) {
    return { isValid: false, message: 'Debes imprimir 5 números (del 1 al 5)' };
  }

  return { isValid: true };
};

export const validateWhileCounter = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea la variable numero
  const hasNumero = /numero\s*=\s*10/.test(code);
  if (!hasNumero) {
    return { isValid: false, message: 'Debes crear la variable numero = 10 como indica el ejercicio' };
  }

  // Verificar que usa while
  const hasWhile = /\bwhile\b/.test(code);
  if (!hasWhile) {
    return { isValid: false, message: 'Debes usar un bucle "while" para repetir el código' };
  }

  // Verificar que la condición verifica >= 1
  const hasCondition = /numero\s*>=\s*1/.test(code) || /1\s*<=\s*numero/.test(code) || /numero\s*>\s*0/.test(code);
  if (!hasCondition) {
    return { isValid: false, message: 'Debes usar una condición que permita contar del 10 al 1. Ejemplo: numero >= 1' };
  }

  // Verificar que decrementa el numero
  const hasDecrement = /numero\s*=\s*numero\s*-\s*1/.test(code) || /numero\s*-=\s*1/.test(code);
  if (!hasDecrement) {
    return { isValid: false, message: 'Debes decrementar el número dentro del bucle. Ejemplo: numero = numero - 1' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() dentro del bucle para mostrar cada número' };
  }

  // Verificar que el output contiene números del 10 al 1
  const lines = output.trim().split('\n');
  if (lines.length < 10) {
    return { isValid: false, message: 'Debes imprimir 10 números (del 10 al 1)' };
  }

  return { isValid: true };
};

export const validateWhileSum = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea las variables
  const hasSuma = /suma\s*=\s*0/.test(code);
  const hasNumero = /numero\s*=\s*1/.test(code);

  if (!hasSuma || !hasNumero) {
    return { isValid: false, message: 'Debes crear las variables suma = 0 y numero = 1 como indica el ejercicio' };
  }

  // Verificar que usa while
  const hasWhile = /\bwhile\b/.test(code);
  if (!hasWhile) {
    return { isValid: false, message: 'Debes usar un bucle "while" para sumar los números' };
  }

  // Verificar que la condición verifica <= 10
  const hasCondition = /numero\s*<=\s*10/.test(code) || /10\s*>=\s*numero/.test(code);
  if (!hasCondition) {
    return { isValid: false, message: 'Debes usar la condición "numero <= 10" en el while para sumar del 1 al 10' };
  }

  // Verificar que acumula en suma
  const hasAccumulate = /suma\s*=\s*suma\s*\+/.test(code) || /suma\s*\+=/.test(code);
  if (!hasAccumulate) {
    return { isValid: false, message: 'Debes acumular los números en la variable suma. Ejemplo: suma = suma + numero' };
  }

  // Verificar que incrementa numero
  const hasIncrement = /numero\s*=\s*numero\s*\+\s*1/.test(code) || /numero\s*\+=\s*1/.test(code);
  if (!hasIncrement) {
    return { isValid: false, message: 'Debes incrementar numero dentro del bucle. Ejemplo: numero = numero + 1' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar la suma total al final' };
  }

  // Verificar que el output es 55 (1+2+3+4+5+6+7+8+9+10)
  const outputNum = parseInt(output.trim().match(/\d+/)?.[0] || '0');
  if (outputNum !== 55) {
    return { isValid: false, message: 'La suma de los números del 1 al 10 debe ser 55. Verifica tu lógica' };
  }

  return { isValid: true };
};

export const validateWhileBreak = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea la variable numero
  const hasNumero = /numero\s*=\s*1/.test(code);
  if (!hasNumero) {
    return { isValid: false, message: 'Debes crear la variable numero = 1 como indica el ejercicio' };
  }

  // Verificar que usa while True
  const hasWhileTrue = /while\s+True/.test(code);
  if (!hasWhileTrue) {
    return { isValid: false, message: 'Debes usar "while True" para crear un bucle infinito' };
  }

  // Verificar que usa if
  const hasIf = /\bif\b/.test(code);
  if (!hasIf) {
    return { isValid: false, message: 'Debes usar "if" para verificar cuándo salir del bucle' };
  }

  // Verificar que usa break
  const hasBreak = /\bbreak\b/.test(code);
  if (!hasBreak) {
    return { isValid: false, message: 'Debes usar "break" para salir del bucle cuando numero > 5' };
  }

  // Verificar que verifica > 5
  const hasCondition = /numero\s*>\s*5/.test(code) || /5\s*<\s*numero/.test(code);
  if (!hasCondition) {
    return { isValid: false, message: 'Debes verificar si numero > 5 para decidir cuándo usar break' };
  }

  // Verificar que incrementa
  const hasIncrement = /numero\s*=\s*numero\s*\+\s*1/.test(code) || /numero\s*\+=\s*1/.test(code);
  if (!hasIncrement) {
    return { isValid: false, message: 'Debes incrementar numero dentro del bucle. Ejemplo: numero = numero + 1' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() dentro del bucle para mostrar los números' };
  }

  // Verificar que el output tiene los números del 1 al 5 (o 1 al 6 dependiendo del orden del código)
  const lines = output.trim().split('\n').filter(line => line.trim());
  if (lines.length < 5 || lines.length > 6) {
    return { isValid: false, message: 'Debes imprimir los números y luego salir con break cuando numero > 5' };
  }

  return { isValid: true };
};
