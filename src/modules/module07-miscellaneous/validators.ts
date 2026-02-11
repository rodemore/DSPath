// Validators for Module 07 - Miscellaneous Exercises (without for/if)

// Exercise 7.1: Basic calculations with discount
export const validateBasicCalculations = (
  code: string,
  output: string
): { isValid: boolean; message: string } => {
  // Check if variables are defined
  const hasPrice = code.includes('precio') || code.includes('price');
  const hasDiscount = code.includes('descuento') || code.includes('discount');
  const hasQuantity = code.includes('cantidad') || code.includes('quantity');

  if (!hasPrice || !hasDiscount || !hasQuantity) {
    return {
      isValid: false,
      message: 'Necesitas crear las tres variables: precio, descuento y cantidad'
    };
  }

  // Check if calculations are performed
  if (!code.includes('*') || !code.includes('/')) {
    return {
      isValid: false,
      message: 'Necesitas realizar cálculos usando multiplicación y división'
    };
  }

  // Check if output contains a number
  if (!output.trim().match(/\d+/)) {
    return {
      isValid: false,
      message: 'Necesitas imprimir el resultado del cálculo'
    };
  }

  return {
    isValid: true,
    message: '¡Excelente! Calculaste el precio final correctamente'
  };
};

// Exercise 7.2: String manipulation with split
export const validateStringManipulation = (
  code: string,
  output: string
): { isValid: boolean; message: string } => {
  const lines = output.trim().split('\n');

  // Check if split is used
  if (!code.includes('split()')) {
    return {
      isValid: false,
      message: 'Necesitas usar .split() para convertir el string en lista'
    };
  }

  // Check if indexing is used
  if (!code.includes('[0]') && !code.includes('[-1]')) {
    return {
      isValid: false,
      message: 'Necesitas usar indexación [0] y [-1] para obtener primera y última palabra'
    };
  }

  // Check if upper() is used
  if (!code.includes('upper()')) {
    return {
      isValid: false,
      message: 'Necesitas usar .upper() para convertir a mayúsculas'
    };
  }

  // Check if both words are printed
  if (lines.length < 2) {
    return {
      isValid: false,
      message: 'Necesitas imprimir tanto la primera como la última palabra'
    };
  }

  return {
    isValid: true,
    message: '¡Perfecto! Manipulaste el string correctamente'
  };
};

// Exercise 7.3: List operations with sum, average, max
export const validateListOperations = (
  code: string,
  output: string
): { isValid: boolean; message: string } => {
  const lines = output.trim().split('\n');

  // Check if list is created
  if (!code.includes('[') || !code.includes(']')) {
    return {
      isValid: false,
      message: 'Necesitas crear una lista de números'
    };
  }

  // Check if sum() is used
  if (!code.includes('sum(')) {
    return {
      isValid: false,
      message: 'Necesitas usar sum() para calcular la suma total'
    };
  }

  // Check if len() is used for average
  if (!code.includes('len(')) {
    return {
      isValid: false,
      message: 'Necesitas usar len() para calcular el promedio'
    };
  }

  // Check if max() is used
  if (!code.includes('max(')) {
    return {
      isValid: false,
      message: 'Necesitas usar max() para encontrar el número mayor'
    };
  }

  // Check if 3 values are printed
  if (lines.length < 3) {
    return {
      isValid: false,
      message: 'Necesitas imprimir 3 valores: suma, promedio y máximo'
    };
  }

  return {
    isValid: true,
    message: '¡Genial! Realizaste las operaciones con listas correctamente'
  };
};

// Exercise 7.4: Name formatter with title()
export const validateNameFormatter = (
  code: string,
  output: string
): { isValid: boolean; message: string } => {
  // Check if title() is used
  if (!code.includes('title()')) {
    return {
      isValid: false,
      message: 'Necesitas usar .title() para capitalizar el nombre'
    };
  }

  // Check if variables are created
  const hasName = code.includes('nombre') || code.includes('name');
  const hasAge = code.includes('edad') || code.includes('age');

  if (!hasName || !hasAge) {
    return {
      isValid: false,
      message: 'Necesitas crear las variables nombre y edad'
    };
  }

  // Check if output contains formatted name
  const outputText = output.trim();
  if (!outputText.includes('Nombre') && !outputText.includes('Name')) {
    return {
      isValid: false,
      message: 'Necesitas imprimir un mensaje con el nombre y la edad'
    };
  }

  return {
    isValid: true,
    message: '¡Perfecto! Formateaste el nombre correctamente'
  };
};

// Exercise 7.5: List methods (append, extend)
export const validateListMethods = (
  code: string,
  output: string
): { isValid: boolean; message: string } => {
  const lines = output.trim().split('\n');

  // Check if append is used
  if (!code.includes('append(')) {
    return {
      isValid: false,
      message: 'Necesitas usar .append() para agregar un elemento'
    };
  }

  // Check if extend is used
  if (!code.includes('extend(')) {
    return {
      isValid: false,
      message: 'Necesitas usar .extend() para agregar múltiples elementos'
    };
  }

  // Check if len() is used
  if (!code.includes('len(')) {
    return {
      isValid: false,
      message: 'Necesitas usar len() para obtener la longitud de la lista'
    };
  }

  // Check if output contains list and length
  if (lines.length < 2) {
    return {
      isValid: false,
      message: 'Necesitas imprimir tanto la lista final como su longitud'
    };
  }

  return {
    isValid: true,
    message: '¡Excelente! Usaste los métodos de lista correctamente'
  };
};

// Exercise 7.6: Dictionary operations
export const validateDictionaryOperations = (
  code: string,
  output: string
): { isValid: boolean; message: string } => {
  const lines = output.trim().split('\n');

  // Check if dictionary is created
  if (!code.includes('{') || !code.includes('}')) {
    return {
      isValid: false,
      message: 'Necesitas crear un diccionario'
    };
  }

  // Check if dictionary modification is done
  const modifications = code.match(/\[["'].*?["']\]\s*=/g);
  if (!modifications || modifications.length < 2) {
    return {
      isValid: false,
      message: 'Necesitas modificar la edad y agregar una nueva llave al diccionario'
    };
  }

  // Check if len() is used
  if (!code.includes('len(')) {
    return {
      isValid: false,
      message: 'Necesitas usar len() para contar las llaves del diccionario'
    };
  }

  // Check if output contains dictionary and count
  if (lines.length < 2) {
    return {
      isValid: false,
      message: 'Necesitas imprimir el diccionario y el número de llaves'
    };
  }

  return {
    isValid: true,
    message: '¡Genial! Manipulaste el diccionario correctamente'
  };
};

// Exercise 7.7: Text statistics (repetition, upper, reverse, length)
export const validateTextStatistics = (
  code: string,
  output: string
): { isValid: boolean; message: string } => {
  const lines = output.trim().split('\n');

  // Check if string multiplication is used
  if (!code.includes('* 3') && !code.includes('*3')) {
    return {
      isValid: false,
      message: 'Necesitas repetir el texto 3 veces usando multiplicación'
    };
  }

  // Check if upper() is used
  if (!code.includes('upper()')) {
    return {
      isValid: false,
      message: 'Necesitas usar .upper() para convertir a mayúsculas'
    };
  }

  // Check if reverse slicing is used
  if (!code.includes('[::-1]')) {
    return {
      isValid: false,
      message: 'Necesitas usar [::-1] para invertir el texto'
    };
  }

  // Check if len() is used
  if (!code.includes('len(')) {
    return {
      isValid: false,
      message: 'Necesitas usar len() para obtener la longitud'
    };
  }

  // Check if 4 values are printed
  if (lines.length < 4) {
    return {
      isValid: false,
      message: 'Necesitas imprimir 4 resultados diferentes'
    };
  }

  return {
    isValid: true,
    message: '¡Perfecto! Realizaste todas las operaciones de texto correctamente'
  };
};

// Exercise 7.8: Complex list manipulation with slicing
export const validateComplexListManipulation = (
  code: string,
  output: string
): { isValid: boolean; message: string } => {
  const lines = output.trim().split('\n');

  // Check if list is created
  if (!code.includes('[') || !code.includes(']')) {
    return {
      isValid: false,
      message: 'Necesitas crear una lista de datos'
    };
  }

  // Check if slicing is used
  if (!code.includes('[:3]') || !code.includes('[-3:]')) {
    return {
      isValid: false,
      message: 'Necesitas usar slicing [:3] y [-3:] para dividir la lista'
    };
  }

  // Check if sum() is used
  if (!code.includes('sum(')) {
    return {
      isValid: false,
      message: 'Necesitas usar sum() para calcular la suma de cada sublista'
    };
  }

  // Check if output contains multiple values
  if (lines.length < 4) {
    return {
      isValid: false,
      message: 'Necesitas imprimir ambas sublistas y sus sumas'
    };
  }

  return {
    isValid: true,
    message: '¡Excelente! Manipulaste las listas con slicing correctamente'
  };
};

// Exercise 7.9: Data combination (dictionary + calculations)
export const validateDataCombination = (
  code: string,
  output: string
): { isValid: boolean; message: string } => {
  const lines = output.trim().split('\n');

  // Check if dictionary is created
  if (!code.includes('{') || !code.includes('}')) {
    return {
      isValid: false,
      message: 'Necesitas crear un diccionario de producto'
    };
  }

  // Check if calculations are performed
  if (!code.includes('*')) {
    return {
      isValid: false,
      message: 'Necesitas calcular los ingresos totales (precio × cantidad)'
    };
  }

  if (!code.includes('-')) {
    return {
      isValid: false,
      message: 'Necesitas calcular el nuevo stock (stock - cantidad_vendida)'
    };
  }

  // Check if dictionary is updated
  const hasUpdate = code.match(/\[["']stock["']\]\s*=/);
  if (!hasUpdate) {
    return {
      isValid: false,
      message: 'Necesitas actualizar el stock en el diccionario'
    };
  }

  // Check if output contains results
  if (lines.length < 2) {
    return {
      isValid: false,
      message: 'Necesitas imprimir el diccionario actualizado y los ingresos'
    };
  }

  return {
    isValid: true,
    message: '¡Excepcional! Combinaste diccionarios y cálculos perfectamente'
  };
};
