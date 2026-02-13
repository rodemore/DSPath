// Validadores para Módulo 12: Desafíos Integradores

export const validateForIfCounter = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  const hasList = /numeros\s*=\s*\[\s*3\s*,\s*7\s*,\s*12\s*,\s*5\s*,\s*18\s*,\s*9\s*,\s*21\s*\]/.test(code);
  if (!hasList) {
    return { isValid: false, message: 'Debes crear la lista numeros = [3, 7, 12, 5, 18, 9, 21]' };
  }

  const hasPares = /pares\s*=\s*0/.test(code);
  if (!hasPares) {
    return { isValid: false, message: 'Debes crear la variable pares = 0 para contar' };
  }

  const hasFor = /\bfor\b/.test(code) && /\bin\b/.test(code);
  if (!hasFor) {
    return { isValid: false, message: 'Debes usar un bucle for para iterar sobre la lista' };
  }

  const hasIf = /\bif\b/.test(code);
  if (!hasIf) {
    return { isValid: false, message: 'Debes usar if para verificar si el número es par' };
  }

  const hasModulo = /%\s*2\s*==\s*0/.test(code) || /==\s*0.*%\s*2/.test(code);
  if (!hasModulo) {
    return { isValid: false, message: 'Debes usar % 2 == 0 para verificar si un número es par' };
  }

  const outputNum = parseInt(output.trim().match(/\d+/)?.[0] || '0');
  if (outputNum !== 3) {
    return { isValid: false, message: 'Hay 3 números pares en la lista: 12, 18. Verifica tu lógica' };
  }

  return { isValid: true };
};

export const validateForIfSum = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  const hasList = /precios\s*=\s*\[\s*25\s*,\s*50\s*,\s*15\s*,\s*80\s*,\s*30\s*\]/.test(code);
  if (!hasList) {
    return { isValid: false, message: 'Debes crear la lista precios = [25, 50, 15, 80, 30]' };
  }

  const hasTotal = /total\s*=\s*0/.test(code);
  if (!hasTotal) {
    return { isValid: false, message: 'Debes crear la variable total = 0 para acumular' };
  }

  const hasFor = /\bfor\b/.test(code) && /\bin\b/.test(code);
  if (!hasFor) {
    return { isValid: false, message: 'Debes usar un bucle for para iterar sobre la lista' };
  }

  const hasIf = /\bif\b/.test(code);
  if (!hasIf) {
    return { isValid: false, message: 'Debes usar if para verificar si el precio es menor a 40' };
  }

  const hasComparison = /<\s*40/.test(code) || /40\s*>/.test(code);
  if (!hasComparison) {
    return { isValid: false, message: 'Debes verificar si el precio < 40' };
  }

  const outputNum = parseInt(output.trim().match(/\d+/)?.[0] || '0');
  if (outputNum !== 70) {
    return { isValid: false, message: 'La suma de los precios menores a 40 (25, 15, 30) debe ser 70' };
  }

  return { isValid: true };
};

export const validateForIfList = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  const hasTempList = /temperaturas\s*=\s*\[\s*22\s*,\s*28\s*,\s*19\s*,\s*31\s*,\s*25\s*,\s*18\s*\]/.test(code);
  if (!hasTempList) {
    return { isValid: false, message: 'Debes crear la lista temperaturas = [22, 28, 19, 31, 25, 18]' };
  }

  const hasCalurosos = /dias_calurosos\s*=\s*\[\s*\]/.test(code);
  if (!hasCalurosos) {
    return { isValid: false, message: 'Debes crear una lista vacía dias_calurosos = []' };
  }

  const hasFor = /\bfor\b/.test(code) && /\bin\b/.test(code);
  if (!hasFor) {
    return { isValid: false, message: 'Debes usar un bucle for para iterar sobre las temperaturas' };
  }

  const hasIf = /\bif\b/.test(code);
  if (!hasIf) {
    return { isValid: false, message: 'Debes usar if para verificar si la temperatura > 25' };
  }

  const hasAppend = /\.append\s*\(/.test(code);
  if (!hasAppend) {
    return { isValid: false, message: 'Debes usar .append() para agregar temperaturas a la lista dias_calurosos' };
  }

  const outputClean = output.trim();
  if (!outputClean.includes('28') || !outputClean.includes('31')) {
    return { isValid: false, message: 'La lista debe contener [28, 31], las temperaturas mayores a 25' };
  }

  return { isValid: true };
};

export const validateForNestedIf = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  const hasList = /edades\s*=\s*\[\s*15\s*,\s*22\s*,\s*17\s*,\s*30\s*,\s*12\s*,\s*25\s*\]/.test(code);
  if (!hasList) {
    return { isValid: false, message: 'Debes crear la lista edades = [15, 22, 17, 30, 12, 25]' };
  }

  const hasFor = /\bfor\b/.test(code) && /\bin\b/.test(code);
  if (!hasFor) {
    return { isValid: false, message: 'Debes usar un bucle for para iterar sobre las edades' };
  }

  const hasIf = /\bif\b/.test(code);
  const hasElif = /\belif\b/.test(code);
  const hasElse = /\belse\b/.test(code);

  if (!hasIf || !hasElif || !hasElse) {
    return { isValid: false, message: 'Debes usar if-elif-else para clasificar las edades' };
  }

  const outputLower = output.toLowerCase();
  const hasAdulto = outputLower.includes('adulto');
  const hasAdolescente = outputLower.includes('adolescente');
  const hasNino = outputLower.includes('niño') || outputLower.includes('nino');

  if (!hasAdulto || !hasAdolescente || !hasNino) {
    return { isValid: false, message: 'Debes imprimir las tres categorías: Niño, Adolescente, y Adulto' };
  }

  return { isValid: true };
};

export const validateForIfStats = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  const hasList = /notas\s*=\s*\[\s*85\s*,\s*92\s*,\s*78\s*,\s*65\s*,\s*90\s*,\s*45\s*,\s*88\s*\]/.test(code);
  if (!hasList) {
    return { isValid: false, message: 'Debes crear la lista notas = [85, 92, 78, 65, 90, 45, 88]' };
  }

  const hasSum = /sum\s*\(/.test(code);
  const hasLen = /len\s*\(/.test(code);
  if (!hasSum || !hasLen) {
    return { isValid: false, message: 'Debes usar sum() y len() para calcular el promedio' };
  }

  const hasFor = /\bfor\b/.test(code) && /\bin\b/.test(code);
  if (!hasFor) {
    return { isValid: false, message: 'Debes usar un bucle for para contar aprobados y reprobados' };
  }

  const hasIf = /\bif\b/.test(code);
  if (!hasIf) {
    return { isValid: false, message: 'Debes usar if para verificar si la nota es >= 70' };
  }

  const lines = output.trim().split('\n');
  if (lines.length < 3) {
    return { isValid: false, message: 'Debes imprimir tres valores: promedio, aprobados y reprobados' };
  }

  return { isValid: true };
};

export const validateForIfString = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  const hasPalabra = /palabra\s*=\s*["']Python["']/.test(code);
  if (!hasPalabra) {
    return { isValid: false, message: 'Debes crear la variable palabra = "Python"' };
  }

  const hasVocales = /vocales\s*=\s*0/.test(code);
  if (!hasVocales) {
    return { isValid: false, message: 'Debes crear la variable vocales = 0 para contar' };
  }

  const hasFor = /\bfor\b/.test(code) && /\bin\b/.test(code);
  if (!hasFor) {
    return { isValid: false, message: 'Debes usar un bucle for para iterar sobre cada letra' };
  }

  const hasIf = /\bif\b/.test(code);
  if (!hasIf) {
    return { isValid: false, message: 'Debes usar if para verificar si la letra es una vocal' };
  }

  const hasLower = /\.lower\s*\(/.test(code);
  if (!hasLower) {
    return { isValid: false, message: 'Debes usar .lower() para comparar en minúsculas' };
  }

  const outputNum = parseInt(output.trim().match(/\d+/)?.[0] || '0');
  if (outputNum !== 2) {
    return { isValid: false, message: '"Python" tiene 2 vocales (o, y). Verifica tu lógica' };
  }

  return { isValid: true };
};

export const validateForRangeIf = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  const hasFor = /\bfor\b/.test(code) && /\bin\b/.test(code);
  if (!hasFor) {
    return { isValid: false, message: 'Debes usar un bucle for con range' };
  }

  const hasRange = /range\s*\(\s*1\s*,\s*21\s*\)/.test(code);
  if (!hasRange) {
    return { isValid: false, message: 'Debes usar range(1, 21) para números del 1 al 20' };
  }

  const hasIf = /\bif\b/.test(code);
  if (!hasIf) {
    return { isValid: false, message: 'Debes usar if para verificar si el número es divisible entre 3' };
  }

  const hasModulo = /%\s*3\s*==\s*0/.test(code);
  if (!hasModulo) {
    return { isValid: false, message: 'Debes usar % 3 == 0 para verificar divisibilidad entre 3' };
  }

  const lines = output.trim().split('\n');
  if (lines.length !== 6) {
    return { isValid: false, message: 'Debes imprimir 6 números divisibles entre 3 (3, 6, 9, 12, 15, 18)' };
  }

  return { isValid: true };
};

export const validateForListConditional = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  const hasList = /productos\s*=\s*\[/.test(code) && /manzana/.test(code) && /leche/.test(code);
  if (!hasList) {
    return { isValid: false, message: 'Debes crear la lista productos = ["manzana", "pan", "leche", "arroz", "agua"]' };
  }

  const hasFor = /\bfor\b/.test(code) && /\bin\b/.test(code);
  if (!hasFor) {
    return { isValid: false, message: 'Debes usar un bucle for para iterar sobre los productos' };
  }

  const hasIf = /\bif\b/.test(code);
  if (!hasIf) {
    return { isValid: false, message: 'Debes usar if para verificar la longitud del producto' };
  }

  const hasLen = /len\s*\(/.test(code);
  if (!hasLen) {
    return { isValid: false, message: 'Debes usar len() para obtener la longitud de cada producto' };
  }

  const outputLower = output.toLowerCase();
  if (!outputLower.includes('manzana') || !outputLower.includes('leche') || !outputLower.includes('arroz')) {
    return { isValid: false, message: 'Debes imprimir los productos con más de 4 letras: manzana, leche, arroz' };
  }

  return { isValid: true };
};

export const validateWhileIfCounter = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  const hasNumero = /numero\s*=\s*2/.test(code);
  const hasContador = /contador\s*=\s*0/.test(code);
  if (!hasNumero || !hasContador) {
    return { isValid: false, message: 'Debes crear las variables numero = 2 y contador = 0' };
  }

  const hasWhile = /\bwhile\b/.test(code);
  if (!hasWhile) {
    return { isValid: false, message: 'Debes usar un bucle while para repetir mientras numero <= 100' };
  }

  const hasMultiply = /numero\s*=\s*numero\s*\*\s*2/.test(code) || /numero\s*\*=\s*2/.test(code);
  if (!hasMultiply) {
    return { isValid: false, message: 'Debes multiplicar numero por 2 en cada iteración. Ejemplo: numero = numero * 2' };
  }

  const hasIncrement = /contador\s*=\s*contador\s*\+\s*1/.test(code) || /contador\s*\+=\s*1/.test(code);
  if (!hasIncrement) {
    return { isValid: false, message: 'Debes incrementar contador en cada iteración' };
  }

  const outputNum = parseInt(output.trim().match(/\d+/)?.[0] || '0');
  if (outputNum !== 6) {
    return { isValid: false, message: 'El número se puede multiplicar 6 veces por 2 antes de superar 100 (2, 4, 8, 16, 32, 64, 128). Verifica tu lógica' };
  }

  return { isValid: true };
};
