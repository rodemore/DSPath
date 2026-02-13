// Validadores para Módulo 03: Strings

export const validatePlacaFirstChar = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que hay una variable con la placa
  const hasPlacaVariable = /\w+\s*=\s*["']GTS-4512["']/.test(code);
  if (!hasPlacaVariable) {
    return { isValid: false, message: 'Debes crear una variable con el valor "GTS-4512". Ejemplo: placa = "GTS-4512"' };
  }

  // Verificar que usa índice para obtener primer carácter
  const hasIndexAccess = /\w+\[0\]/.test(code);
  if (!hasIndexAccess) {
    return { isValid: false, message: 'Debes usar índice [0] para obtener el primer carácter. Ejemplo: placa[0]' };
  }

  // Verificar que crea la variable 'cod_provincia'
  const hasCodProvinciaVariable = /cod_provincia\s*=/.test(code);
  if (!hasCodProvinciaVariable) {
    return { isValid: false, message: 'Debes crear una variable llamada "cod_provincia" con el primer carácter. Ejemplo: cod_provincia = placa[0]' };
  }

  // Verificar que imprime el primer carácter
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar cod_provincia' };
  }

  // Verificar que el output es correcto
  if (output.trim() !== 'G') {
    return { isValid: false, message: 'El resultado debe ser "G" (el primer carácter de la placa)' };
  }

  return { isValid: true };
};

export const validatePlacaFirstThree = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que hay una variable con la placa
  const hasPlacaVariable = /\w+\s*=\s*["']GTS-4512["']/.test(code);
  if (!hasPlacaVariable) {
    return { isValid: false, message: 'Debes crear una variable con el valor "GTS-4512". Ejemplo: placa = "GTS-4512"' };
  }

  // Verificar que usa slicing para obtener los 3 primeros
  const hasSlicing = /\w+\[0?:3\]/.test(code) || /\w+\[:3\]/.test(code);
  if (!hasSlicing) {
    return { isValid: false, message: 'Debes usar slicing para obtener los 3 primeros caracteres. Ejemplo: placa[:3] o placa[0:3]' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar los primeros 3 caracteres' };
  }

  // Verificar que el output es correcto
  if (output.trim() !== 'GTS') {
    return { isValid: false, message: 'El resultado debe ser "GTS" (los 3 primeros caracteres)' };
  }

  return { isValid: true };
};

export const validateExtractMundo = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que hay una variable con "Hola Mundo"
  const hasFraseVariable = /\w+\s*=\s*["']Hola Mundo["']/.test(code);
  if (!hasFraseVariable) {
    return { isValid: false, message: 'Debes crear una variable con el valor "Hola Mundo". Ejemplo: frase = "Hola Mundo"' };
  }

  // Verificar que usa slicing (no decimos cuál)
  const hasSlicing = /\w+\[\d+:\d*\]/.test(code) || /\w+\[:\d+\]/.test(code) || /\w+\[-\d+:\]/.test(code);
  if (!hasSlicing) {
    return { isValid: false, message: 'Debes usar slicing para extraer la palabra "Mundo". Pista: recuerda que puedes usar [inicio:fin] para extraer una porción del string' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar la palabra extraída' };
  }

  // Verificar que el output es correcto
  if (output.trim() !== 'Mundo') {
    return { isValid: false, message: 'El resultado debe ser exactamente "Mundo". Pista: "Hola Mundo" tiene 10 caracteres, "Hola" tiene 4 caracteres + 1 espacio = empieza en índice 5' };
  }

  return { isValid: true };
};

export const validateUpperCase = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que hay una variable con "Hola Mundo"
  const hasFraseVariable = /\w+\s*=\s*["']Hola Mundo["']/.test(code);
  if (!hasFraseVariable) {
    return { isValid: false, message: 'Debes crear una variable con el valor "Hola Mundo". Ejemplo: frase = "Hola Mundo"' };
  }

  // Verificar que usa el método upper()
  const hasUpper = /\.upper\s*\(\s*\)/.test(code);
  if (!hasUpper) {
    return { isValid: false, message: 'Debes usar el método .upper() para convertir a mayúsculas. Ejemplo: frase.upper()' };
  }

  // Verificar que crea la variable 'frase_mayusculas'
  const hasFraseMayusculasVariable = /frase_mayusculas\s*=/.test(code);
  if (!hasFraseMayusculasVariable) {
    return { isValid: false, message: 'Debes crear una variable llamada "frase_mayusculas" con el resultado. Ejemplo: frase_mayusculas = frase.upper()' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar frase_mayusculas' };
  }

  // Verificar que el output es correcto
  if (output.trim() !== 'HOLA MUNDO') {
    return { isValid: false, message: 'El resultado debe ser "HOLA MUNDO" (todo en mayúsculas)' };
  }

  return { isValid: true };
};

export const validateTitleCase = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que hay una variable con "robert moreno"
  const hasNameVariable = /\w+\s*=\s*["']robert moreno["']/.test(code);
  if (!hasNameVariable) {
    return { isValid: false, message: 'Debes crear una variable con el valor "robert moreno". Ejemplo: nombre = "robert moreno"' };
  }

  // Verificar que usa el método title()
  const hasTitle = /\.title\s*\(\s*\)/.test(code);
  if (!hasTitle) {
    return { isValid: false, message: 'Debes usar el método .title() para convertir a formato título. Ejemplo: nombre.title()' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar el resultado' };
  }

  // Verificar que el output es correcto
  if (output.trim() !== 'Robert Moreno') {
    return { isValid: false, message: 'El resultado debe ser "Robert Moreno" (primera letra de cada palabra en mayúscula)' };
  }

  return { isValid: true };
};

export const validateStringMultiplication = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que hay una variable con "="
  const hasSimboloVariable = /\w+\s*=\s*["']=["']/.test(code);
  if (!hasSimboloVariable) {
    return { isValid: false, message: 'Debes crear una variable con el valor "=". Ejemplo: simbolo = "="' };
  }

  // Verificar que usa multiplicación
  const hasMultiplication = /\*\s*20|20\s*\*/.test(code);
  if (!hasMultiplication) {
    return { isValid: false, message: 'Debes multiplicar el string por 20. Ejemplo: simbolo * 20' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar el resultado' };
  }

  // Verificar que el output es correcto (20 signos =)
  if (output.trim() !== '====================') {
    return { isValid: false, message: 'El resultado debe ser 20 signos de igual (=). Verifica que estés multiplicando por 20' };
  }

  return { isValid: true };
};

export const validateSplitWords = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que hay una variable con "Python es divertido"
  const hasOracionVariable = /\w+\s*=\s*["']Python es divertido["']/.test(code);
  if (!hasOracionVariable) {
    return { isValid: false, message: 'Debes crear una variable con el valor "Python es divertido". Ejemplo: oracion = "Python es divertido"' };
  }

  // Verificar que usa split(" ")
  const hasSplitWithSpace = /\.split\s*\(\s*["']\s["']\s*\)/.test(code);
  if (!hasSplitWithSpace) {
    return { isValid: false, message: 'Debes usar el método .split(" ") con espacio como separador. Ejemplo: oracion.split(" ")' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar el resultado' };
  }

  // Verificar que el output es correcto
  const expectedOutput = "['Python', 'es', 'divertido']";
  if (output.trim() !== expectedOutput) {
    return { isValid: false, message: `El resultado debe ser ${expectedOutput} (una lista con las 3 palabras)` };
  }

  return { isValid: true };
};
