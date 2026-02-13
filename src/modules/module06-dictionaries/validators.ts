// Validadores para Módulo 06: Diccionarios

export const validateCreateDictAndAccess = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea un diccionario con llaves {}
  const hasDictCreation = /\w+\s*=\s*\{/.test(code);
  if (!hasDictCreation) {
    return { isValid: false, message: 'Debes crear un diccionario usando llaves {}. Ejemplo: libro = {"titulo": "...", "autor": "..."}' };
  }

  // Verificar que contiene las claves requeridas
  const hasKeys = code.includes('"titulo"') && code.includes('"autor"') && code.includes('"año"');
  if (!hasKeys) {
    return { isValid: false, message: 'El diccionario debe tener las claves "titulo", "autor" y "año"' };
  }

  // Verificar que accede a una clave con corchetes
  const hasKeyAccess = /\w+\[["'][^"']+["']\]/.test(code);
  if (!hasKeyAccess) {
    return { isValid: false, message: 'Debes acceder a un valor del diccionario usando corchetes. Ejemplo: libro["autor"]' };
  }

  // Verificar que usa print()
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar el autor' };
  }

  return { isValid: true };
};

export const validateKeysMethod = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea un diccionario
  const hasDictCreation = /\w+\s*=\s*\{/.test(code);
  if (!hasDictCreation) {
    return { isValid: false, message: 'Debes crear un diccionario. Ejemplo: colores = {"cielo": "azul", ...}' };
  }

  // Verificar que usa el método .keys()
  const hasKeysMethod = /\.keys\s*\(\s*\)/.test(code);
  if (!hasKeysMethod) {
    return { isValid: false, message: 'Debes usar el método .keys() en tu diccionario. Ejemplo: colores.keys()' };
  }

  // Verificar que usa list()
  const hasListConversion = /list\s*\(/.test(code);
  if (!hasListConversion) {
    return { isValid: false, message: 'Debes convertir las claves a lista usando list(). Ejemplo: list(colores.keys())' };
  }

  // Verificar que usa print()
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar las claves' };
  }

  // Verificar que el output es una lista (debe contener [ y ])
  if (!output.includes('[') || !output.includes(']')) {
    return { isValid: false, message: 'El output debe ser una lista. Asegúrate de usar list() y print()' };
  }

  return { isValid: true };
};

export const validateValuesMethod = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea un diccionario
  const hasDictCreation = /\w+\s*=\s*\{/.test(code);
  if (!hasDictCreation) {
    return { isValid: false, message: 'Debes crear un diccionario. Ejemplo: colores = {"cielo": "azul", ...}' };
  }

  // Verificar que usa el método .values()
  const hasValuesMethod = /\.values\s*\(\s*\)/.test(code);
  if (!hasValuesMethod) {
    return { isValid: false, message: 'Debes usar el método .values() en tu diccionario. Ejemplo: colores.values()' };
  }

  // Verificar que usa list()
  const hasListConversion = /list\s*\(/.test(code);
  if (!hasListConversion) {
    return { isValid: false, message: 'Debes convertir los valores a lista usando list(). Ejemplo: list(colores.values())' };
  }

  // Verificar que usa print()
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar los valores' };
  }

  // Verificar que el output es una lista
  if (!output.includes('[') || !output.includes(']')) {
    return { isValid: false, message: 'El output debe ser una lista. Asegúrate de usar list() y print()' };
  }

  return { isValid: true };
};

export const validateUpdateDict = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea un diccionario
  const hasDictCreation = /\w+\s*=\s*\{/.test(code);
  if (!hasDictCreation) {
    return { isValid: false, message: 'Debes crear un diccionario. Ejemplo: usuario = {"nombre": "...", "edad": ...}' };
  }

  // Verificar que contiene las claves iniciales
  const hasInitialKeys = code.includes('"nombre"') && code.includes('"edad"');
  if (!hasInitialKeys) {
    return { isValid: false, message: 'El diccionario inicial debe tener las claves "nombre" y "edad"' };
  }

  // Verificar que actualiza/agrega valores usando corchetes (debe haber al menos 2 asignaciones)
  const assignments = code.match(/\w+\[["'][^"']+["']\]\s*=/g);
  if (!assignments || assignments.length < 2) {
    return { isValid: false, message: 'Debes actualizar la edad y agregar email usando corchetes. Ejemplo: usuario["edad"] = 26' };
  }

  // Verificar que menciona "email" en el código
  const hasEmailKey = code.includes('"email"') || code.includes("'email'");
  if (!hasEmailKey) {
    return { isValid: false, message: 'Debes agregar una nueva clave "email" al diccionario' };
  }

  // Verificar que usa print()
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar el diccionario actualizado' };
  }

  // Verificar que el output contiene un diccionario (tiene { y })
  if (!output.includes('{') || !output.includes('}')) {
    return { isValid: false, message: 'El output debe ser un diccionario. Imprime el diccionario completo' };
  }

  // Verificar que el output contiene email
  if (!output.includes('email')) {
    return { isValid: false, message: 'El diccionario impreso debe incluir la clave "email"' };
  }

  return { isValid: true };
};

export const validateItemsMethod = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea un diccionario
  const hasDictCreation = /\w+\s*=\s*\{/.test(code);
  if (!hasDictCreation) {
    return { isValid: false, message: 'Debes crear un diccionario. Ejemplo: inventario = {"manzanas": 10, ...}' };
  }

  // Verificar que usa el método .items()
  const hasItemsMethod = /\.items\s*\(\s*\)/.test(code);
  if (!hasItemsMethod) {
    return { isValid: false, message: 'Debes usar el método .items() en tu diccionario. Ejemplo: inventario.items()' };
  }

  // Verificar que usa list()
  const hasListConversion = /list\s*\(/.test(code);
  if (!hasListConversion) {
    return { isValid: false, message: 'Debes convertir los items a lista usando list(). Ejemplo: list(inventario.items())' };
  }

  // Verificar que usa print()
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar los pares clave-valor' };
  }

  // Verificar que el output es una lista de tuplas (debe contener [ y ( )
  if (!output.includes('[') || !output.includes('(')) {
    return { isValid: false, message: 'El output debe ser una lista de tuplas (pares clave-valor). Asegúrate de usar list(inventario.items())' };
  }

  return { isValid: true };
};
