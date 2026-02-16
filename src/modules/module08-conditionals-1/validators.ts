// Validadores para Módulo 08: Condicionales 1 - Comparaciones y IF

export const validateComparison = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea las variables edad y precio
  const hasEdad = /edad\s*=\s*22/.test(code);
  const hasPrecio = /precio\s*=\s*50/.test(code);

  if (!hasEdad || !hasPrecio) {
    return { isValid: false, message: 'Debes crear las variables edad = 22 y precio = 50 como indica el ejercicio' };
  }

  // Verificar que crea la variable es_mayor con comparación
  const hasEsMayor = /es_mayor\s*=/.test(code);
  if (!hasEsMayor) {
    return { isValid: false, message: 'Debes crear una variable "es_mayor" con el resultado de comparar edad >= 18' };
  }

  // Verificar que usa >= para es_mayor
  const hasGreaterEqual = /edad\s*>=\s*18/.test(code) || /18\s*<=\s*edad/.test(code);
  if (!hasGreaterEqual) {
    return { isValid: false, message: 'Debes usar el operador >= para verificar si edad es mayor o igual a 18' };
  }

  // Verificar que crea la variable es_barato con comparación
  const hasEsBarato = /es_barato\s*=/.test(code);
  if (!hasEsBarato) {
    return { isValid: false, message: 'Debes crear una variable "es_barato" con el resultado de comparar precio < 100' };
  }

  // Verificar que usa < para es_barato
  const hasLessThan = /precio\s*<\s*100/.test(code) || /100\s*>\s*precio/.test(code);
  if (!hasLessThan) {
    return { isValid: false, message: 'Debes usar el operador < para verificar si precio es menor que 100' };
  }

  // Verificar que imprime ambos resultados
  const printCount = (code.match(/print\s*\(/g) || []).length;
  if (printCount < 2) {
    return { isValid: false, message: 'Debes usar print() dos veces para mostrar ambos resultados' };
  }

  // Verificar que el output contiene True en ambas líneas
  const lines = output.trim().split('\n');
  if (lines.length < 2) {
    return { isValid: false, message: 'Debes imprimir dos valores (es_mayor y es_barato)' };
  }

  if (!lines[0].includes('True') || !lines[1].includes('True')) {
    return { isValid: false, message: 'Ambos resultados deben ser True. Verifica tus comparaciones' };
  }

  return { isValid: true };
};

export const validateLogicalAnd = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea las tres variables booleanas
  const hasPasaporte = /tiene_pasaporte\s*=\s*True/.test(code);
  const hasVisa = /tiene_visa\s*=\s*True/.test(code);
  const hasBoleto = /tiene_boleto\s*=\s*False/.test(code);

  if (!hasPasaporte || !hasVisa || !hasBoleto) {
    return { isValid: false, message: 'Debes crear las tres variables: tiene_pasaporte = True, tiene_visa = True, tiene_boleto = False' };
  }

  // Verificar que usa el operador and
  const hasAnd = /\band\b/.test(code);
  if (!hasAnd) {
    return { isValid: false, message: 'Debes usar el operador "and" para combinar las condiciones' };
  }

  // Verificar que crea la variable documentos_completos
  const hasDocumentosCompletos = /documentos_completos\s*=/.test(code);
  if (!hasDocumentosCompletos) {
    return { isValid: false, message: 'Debes crear una variable "documentos_completos" con el resultado de tiene_pasaporte and tiene_visa' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar el resultado' };
  }

  // Verificar que el output es True (ambas condiciones son verdaderas)
  if (!output.trim().includes('True')) {
    return { isValid: false, message: 'El resultado debe ser True ya que ambas condiciones (tiene_pasaporte y tiene_visa) son verdaderas' };
  }

  return { isValid: true };
};

export const validateLogicalOr = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea las dos variables booleanas
  const hasFinDeSemana = /es_fin_de_semana\s*=\s*False/.test(code);
  const hasFeriado = /es_feriado\s*=\s*True/.test(code);

  if (!hasFinDeSemana || !hasFeriado) {
    return { isValid: false, message: 'Debes crear las dos variables: es_fin_de_semana = False y es_feriado = True' };
  }

  // Verificar que usa el operador or
  const hasOr = /\bor\b/.test(code);
  if (!hasOr) {
    return { isValid: false, message: 'Debes usar el operador "or" para combinar las condiciones' };
  }

  // Verificar que crea la variable puede_descansar
  const hasPuedeDescansar = /puede_descansar\s*=/.test(code);
  if (!hasPuedeDescansar) {
    return { isValid: false, message: 'Debes crear una variable "puede_descansar" con el resultado de es_fin_de_semana or es_feriado' };
  }

  // Verificar que imprime
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() para mostrar el resultado' };
  }

  // Verificar que el output es True (al menos una condición es verdadera)
  if (!output.trim().includes('True')) {
    return { isValid: false, message: 'El resultado debe ser True ya que al menos una condición (es_feriado) es verdadera' };
  }

  return { isValid: true };
};

export const validateSimpleIf = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea la variable nota
  const hasNota = /nota\s*=\s*85/.test(code);
  if (!hasNota) {
    return { isValid: false, message: 'Debes crear la variable nota = 85 como indica el ejercicio' };
  }

  // Verificar que usa if
  const hasIf = /\bif\b/.test(code);
  if (!hasIf) {
    return { isValid: false, message: 'Debes usar la estructura "if" para verificar la condición' };
  }

  // Verificar que usa >= 70 en la condición
  const hasCondition = /nota\s*>=\s*70/.test(code) || /70\s*<=\s*nota/.test(code);
  if (!hasCondition) {
    return { isValid: false, message: 'Debes verificar si nota >= 70 en la condición del if' };
  }

  // Verificar que usa print dentro del if
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() dentro del if para mostrar el mensaje' };
  }

  // Verificar que el output contiene "Aprobado"
  if (!output.trim().includes('Aprobado')) {
    return { isValid: false, message: 'El mensaje debe ser "Aprobado". Recuerda que debe estar dentro del if' };
  }

  return { isValid: true };
};

export const validateIfWithCondition = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea las tres variables
  const hasEdad = /edad\s*=\s*20/.test(code);
  const hasTieneEntrada = /tiene_entrada\s*=\s*True/.test(code);
  const hasAforoDisponible = /aforo_disponible\s*=\s*True/.test(code);

  if (!hasEdad || !hasTieneEntrada || !hasAforoDisponible) {
    return { isValid: false, message: 'Debes crear las tres variables: edad = 20, tiene_entrada = True, aforo_disponible = True' };
  }

  // Verificar que usa if
  const hasIf = /\bif\b/.test(code);
  if (!hasIf) {
    return { isValid: false, message: 'Debes usar la estructura "if" para verificar las condiciones' };
  }

  // Verificar que usa and (al menos 2 veces para 3 condiciones)
  const andCount = (code.match(/\band\b/g) || []).length;
  if (andCount < 2) {
    return { isValid: false, message: 'Debes usar el operador "and" dos veces para combinar las tres condiciones. Ejemplo: condicion1 and condicion2 and condicion3' };
  }

  // Verificar que verifica edad >= 18
  const hasEdadCondition = /edad\s*>=\s*18/.test(code) || /18\s*<=\s*edad/.test(code);
  if (!hasEdadCondition) {
    return { isValid: false, message: 'Debes verificar si edad >= 18 en la condición del if' };
  }

  // Verificar que usa print
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() dentro del if para mostrar el mensaje' };
  }

  // Verificar que el output contiene el mensaje esperado
  const outputClean = output.trim().toLowerCase();
  if (!outputClean.includes('bienvenido') || !outputClean.includes('evento')) {
    return { isValid: false, message: 'El mensaje debe ser "Bienvenido al evento". Recuerda que debe estar dentro del if' };
  }

  return { isValid: true };
};

export const validateInOperator = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea la lista de colores
  const hasColores = /colores\s*=\s*\[/.test(code);
  if (!hasColores) {
    return { isValid: false, message: 'Debes crear una lista llamada "colores" con los valores especificados' };
  }

  // Verificar que la lista contiene los colores correctos
  const hasRojo = /["']rojo["']/.test(code);
  const hasAzul = /["']azul["']/.test(code);
  const hasVerde = /["']verde["']/.test(code);

  if (!hasRojo || !hasAzul || !hasVerde) {
    return { isValid: false, message: 'La lista debe contener los colores: "rojo", "azul", "verde"' };
  }

  // Verificar que crea la variable color_favorito
  const hasColorFavorito = /color_favorito\s*=\s*["']azul["']/.test(code);
  if (!hasColorFavorito) {
    return { isValid: false, message: 'Debes crear la variable color_favorito = "azul"' };
  }

  // Verificar que usa el operador in
  const hasIn = /\bin\b/.test(code);
  if (!hasIn) {
    return { isValid: false, message: 'Debes usar el operador "in" para verificar si color_favorito está en la lista' };
  }

  // Verificar que usa if
  const hasIf = /\bif\b/.test(code);
  if (!hasIf) {
    return { isValid: false, message: 'Debes usar la estructura "if" con el operador "in"' };
  }

  // Verificar que usa print
  const hasPrint = /print\s*\(/.test(code);
  if (!hasPrint) {
    return { isValid: false, message: 'Debes usar print() dentro del if para mostrar el mensaje' };
  }

  // Verificar que el output contiene el mensaje esperado
  const outputClean = output.trim().toLowerCase();
  if (!outputClean.includes('color disponible')) {
    return { isValid: false, message: 'El mensaje debe ser "Color disponible". Recuerda que debe estar dentro del if' };
  }

  return { isValid: true };
};
