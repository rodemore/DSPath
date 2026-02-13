// Validadores para Módulo 09: Condicionales 2 - IF-ELSE e IF-ELIF-ELSE

export const validateIfElse = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea la variable temperatura
  const hasTemperatura = /temperatura\s*=\s*30/.test(code);
  if (!hasTemperatura) {
    return { isValid: false, message: 'Debes crear la variable temperatura = 30 como indica el ejercicio' };
  }

  // Verificar que usa if
  const hasIf = /\bif\b/.test(code);
  if (!hasIf) {
    return { isValid: false, message: 'Debes usar la estructura "if" para verificar la condición' };
  }

  // Verificar que usa else
  const hasElse = /\belse\b/.test(code);
  if (!hasElse) {
    return { isValid: false, message: 'Debes usar "else" para el caso contrario' };
  }

  // Verificar que compara con 25
  const hasComparison = /temperatura\s*>\s*25/.test(code) || /25\s*<\s*temperatura/.test(code);
  if (!hasComparison) {
    return { isValid: false, message: 'Debes verificar si temperatura > 25 en la condición del if' };
  }

  // Verificar que el output es correcto
  if (!output.trim().includes('Hace calor')) {
    return { isValid: false, message: 'Como la temperatura es 30 (mayor a 25), debe imprimir "Hace calor"' };
  }

  return { isValid: true };
};

export const validateIfElseAge = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea la variable edad
  const hasEdad = /edad\s*=\s*16/.test(code);
  if (!hasEdad) {
    return { isValid: false, message: 'Debes crear la variable edad = 16 como indica el ejercicio' };
  }

  // Verificar que usa if
  const hasIf = /\bif\b/.test(code);
  if (!hasIf) {
    return { isValid: false, message: 'Debes usar la estructura "if" para verificar la condición' };
  }

  // Verificar que usa else
  const hasElse = /\belse\b/.test(code);
  if (!hasElse) {
    return { isValid: false, message: 'Debes usar "else" para el caso contrario' };
  }

  // Verificar que compara con >= 18
  const hasComparison = /edad\s*>=\s*18/.test(code) || /18\s*<=\s*edad/.test(code);
  if (!hasComparison) {
    return { isValid: false, message: 'Debes verificar si edad >= 18 en la condición del if' };
  }

  // Verificar que el output es correcto (edad = 16, entonces no puede votar)
  const outputClean = output.trim().toLowerCase();
  if (!outputClean.includes('no puedes votar') && !outputClean.includes('no puede votar')) {
    return { isValid: false, message: 'Como la edad es 16 (menor a 18), debe imprimir "No puedes votar aún"' };
  }

  return { isValid: true };
};

export const validateIfElifElse = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea la variable hora
  const hasHora = /hora\s*=\s*14/.test(code);
  if (!hasHora) {
    return { isValid: false, message: 'Debes crear la variable hora = 14 como indica el ejercicio' };
  }

  // Verificar que usa if
  const hasIf = /\bif\b/.test(code);
  if (!hasIf) {
    return { isValid: false, message: 'Debes usar la estructura "if" para verificar la primera condición' };
  }

  // Verificar que usa elif
  const hasElif = /\belif\b/.test(code);
  if (!hasElif) {
    return { isValid: false, message: 'Debes usar "elif" para la segunda condición (hora < 18)' };
  }

  // Verificar que usa else
  const hasElse = /\belse\b/.test(code);
  if (!hasElse) {
    return { isValid: false, message: 'Debes usar "else" para el caso contrario (buenas noches)' };
  }

  // Verificar que el output es correcto (hora = 14, entonces buenas tardes)
  const outputClean = output.trim().toLowerCase();
  if (!outputClean.includes('buenas tardes')) {
    return { isValid: false, message: 'Como la hora es 14 (mayor o igual a 12 pero menor que 18), debe imprimir "Buenas tardes"' };
  }

  return { isValid: true };
};

export const validateIfElifElseGrade = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea la variable nota
  const hasNota = /nota\s*=\s*78/.test(code);
  if (!hasNota) {
    return { isValid: false, message: 'Debes crear la variable nota = 78 como indica el ejercicio' };
  }

  // Verificar que usa if
  const hasIf = /\bif\b/.test(code);
  if (!hasIf) {
    return { isValid: false, message: 'Debes usar la estructura "if" para la primera condición' };
  }

  // Verificar que usa elif al menos 3 veces
  const elifCount = (code.match(/\belif\b/g) || []).length;
  if (elifCount < 3) {
    return { isValid: false, message: 'Debes usar "elif" al menos 3 veces para las condiciones intermedias (>= 80, >= 70, >= 60)' };
  }

  // Verificar que usa else
  const hasElse = /\belse\b/.test(code);
  if (!hasElse) {
    return { isValid: false, message: 'Debes usar "else" para el caso de reprobado' };
  }

  // Verificar que el output es correcto (nota = 78, entonces "Bueno")
  const outputClean = output.trim();
  if (!outputClean.includes('Bueno')) {
    return { isValid: false, message: 'Como la nota es 78 (mayor o igual a 70 pero menor que 80), debe imprimir "Bueno"' };
  }

  return { isValid: true };
};

export const validateComplexConditions = (code: string, output: string): { isValid: boolean; message?: string } => {
  if (!code.trim()) {
    return { isValid: false, message: 'No has escrito ningún código' };
  }

  if (!output.trim()) {
    return { isValid: false, message: 'Tu código no imprime nada. Usa print()' };
  }

  // Verificar que crea las tres variables
  const hasEdad = /edad\s*=\s*25/.test(code);
  const hasEstudiante = /es_estudiante\s*=\s*True/.test(code);
  const hasDescuento = /tiene_descuento\s*=\s*False/.test(code);

  if (!hasEdad || !hasEstudiante || !hasDescuento) {
    return { isValid: false, message: 'Debes crear las tres variables: edad = 25, es_estudiante = True, tiene_descuento = False' };
  }

  // Verificar que usa if
  const hasIf = /\bif\b/.test(code);
  if (!hasIf) {
    return { isValid: false, message: 'Debes usar la estructura "if" para la primera condición' };
  }

  // Verificar que usa elif
  const hasElif = /\belif\b/.test(code);
  if (!hasElif) {
    return { isValid: false, message: 'Debes usar "elif" para la segunda condición (edad >= 65)' };
  }

  // Verificar que usa else
  const hasElse = /\belse\b/.test(code);
  if (!hasElse) {
    return { isValid: false, message: 'Debes usar "else" para el precio normal' };
  }

  // Verificar que usa el operador or
  const hasOr = /\bor\b/.test(code);
  if (!hasOr) {
    return { isValid: false, message: 'Debes usar el operador "or" para combinar las condiciones (edad < 18 or es_estudiante)' };
  }

  // Verificar que el output es correcto (edad = 25, es_estudiante = True, entonces $5)
  const outputClean = output.trim();
  if (!outputClean.includes('$5') && !outputClean.includes('5')) {
    return { isValid: false, message: 'Como es_estudiante es True, debe imprimir "Precio: $5"' };
  }

  return { isValid: true };
};
