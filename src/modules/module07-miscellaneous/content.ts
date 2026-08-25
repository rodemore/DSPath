import type { Section } from '../../types';
import {
  validateBasicCalculations,
  validateStringManipulation,
  validateListOperations,
  validateNameFormatter,
  validateListMethods,
  validateDictionaryOperations,
  validateTextStatistics,
  validateComplexListManipulation,
  validateDataCombination,
} from './validators';

export const module07: Section = {
  id: 6,
  moduleNumber: 'Módulo 07',
  title: 'Misceláneos:',
  titleHighlight: 'Desafíos Combinados',
  theoryBlocks: [
    {
      icon: '🎯',
      title: 'Poniendo todo junto',
      content:
        'Ahora que has aprendido <strong>variables, operaciones, strings, listas y diccionarios</strong>, es momento de combinar estos conceptos para resolver problemas más complejos. Estos ejercicios te desafiarán a usar múltiples técnicas en un solo programa.',
      codeExample: {
        filename: 'ejemplo_combinado.py',
        code: `<span class="comment"># Combinando listas y diccionarios</span>
<span class="identifier">persona</span> = {
    <span class="string">"nombre"</span>: <span class="string">"Ana García"</span>,
    <span class="string">"edad"</span>: <span class="number">25</span>,
    <span class="string">"hobbies"</span>: [<span class="string">"leer"</span>, <span class="string">"nadar"</span>, <span class="string">"programar"</span>]
}

<span class="comment"># Accediendo y mostrando datos</span>
<span class="builtin">print</span>(persona[<span class="string">"nombre"</span>].upper())  <span class="output"># → ANA GARCÍA</span>
<span class="builtin">print</span>(<span class="builtin">len</span>(persona[<span class="string">"hobbies"</span>]))      <span class="output"># → 3</span>`,
      },
    },
    {
      icon: '💡',
      title: 'Combinando métodos',
      content:
        'Puedes <strong>encadenar métodos</strong> y <strong>anidar operaciones</strong> para resolver problemas más complejos. Por ejemplo, puedes usar métodos de strings junto con operaciones de listas.',
      codeExample: {
        filename: 'metodos_combinados.py',
        code: `<span class="comment"># Combinando métodos de string y listas</span>
<span class="identifier">texto</span> = <span class="string">"python es genial"</span>
<span class="identifier">palabras</span> = texto.split()

<span class="comment"># Obtener primera y última palabra</span>
<span class="builtin">print</span>(palabras[<span class="number">0</span>].upper())   <span class="output"># → PYTHON</span>
<span class="builtin">print</span>(palabras[-<span class="number">1</span>].upper())  <span class="output"># → GENIAL</span>`,
      },
    },
    {
      icon: '🔧',
      title: 'Trabajando con datos estructurados',
      content:
        'Los diccionarios pueden contener listas, y las listas pueden contener diccionarios. Usa <strong>indexación</strong> y <strong>métodos</strong> para acceder y modificar datos anidados.',
      codeExample: {
        filename: 'datos_estructurados.py',
        code: `<span class="comment"># Lista de diccionarios</span>
<span class="identifier">productos</span> = [
    {<span class="string">"nombre"</span>: <span class="string">"Laptop"</span>, <span class="string">"precio"</span>: <span class="number">1000</span>},
    {<span class="string">"nombre"</span>: <span class="string">"Mouse"</span>, <span class="string">"precio"</span>: <span class="number">25</span>}
]

<span class="comment"># Acceder a datos anidados</span>
<span class="builtin">print</span>(productos[<span class="number">0</span>][<span class="string">"nombre"</span>])  <span class="output"># → Laptop</span>
<span class="builtin">print</span>(productos[<span class="number">1</span>][<span class="string">"precio"</span>]) <span class="output"># → 25</span>`,
      },
    },
  ],
  tipBox: {
    icon: '💡',
    content:
      'Lee cada ejercicio cuidadosamente e identifica qué herramientas necesitas: ¿métodos de strings? ¿operaciones con listas? ¿acceso a diccionarios? Usa lo que has aprendido en los módulos anteriores.',
  },
  exercises: [
    {
      id: 'ex-7-1',
      number: 'EJERCICIO 7.1',
      description:
        'Crea tres variables: <span class="inline-code">precio = 100</span>, <span class="inline-code">descuento = 15</span> (porcentaje), y <span class="inline-code">cantidad = 3</span>.<br><br>Calcula el precio con descuento (<span class="inline-code">precio - precio * descuento / 100</span>), luego multiplica por la cantidad.<br><br>Imprime el resultado final.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateBasicCalculations,
    },
    {
      id: 'ex-7-2',
      number: 'EJERCICIO 7.2',
      description:
        'Crea una variable <span class="inline-code">frase = "aprendiendo python es divertido"</span>.<br><br>Usa <span class="inline-code">.split()</span> para convertirla en lista, luego imprime la primera palabra en mayúsculas y la última palabra en mayúsculas.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateStringManipulation,
    },
    {
      id: 'ex-7-3',
      number: 'EJERCICIO 7.3',
      description:
        'Crea una lista <span class="inline-code">numeros = [10, 20, 30, 40, 50]</span>.<br><br>Imprime:<br>1) La suma total usando <span class="inline-code">sum()</span><br>2) El promedio (suma / cantidad)<br>3) El número mayor usando <span class="inline-code">max()</span>',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateListOperations,
    },
    {
      id: 'ex-7-4',
      number: 'EJERCICIO 7.4',
      description:
        'Crea dos variables: <span class="inline-code">nombre = "juan pérez"</span> y <span class="inline-code">edad = 25</span>.<br><br>Formatea el nombre usando <span class="inline-code">.title()</span> para capitalizar cada palabra.<br><br>Imprime un mensaje: "Nombre: [nombre formateado], Edad: [edad]".',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateNameFormatter,
    },
    {
      id: 'ex-7-5',
      number: 'EJERCICIO 7.5',
      description:
        'Crea una lista <span class="inline-code">frutas = ["manzana", "banana"]</span>.<br><br>Usa <span class="inline-code">.append()</span> para agregar "naranja", luego <span class="inline-code">.extend()</span> para agregar <span class="inline-code">["uva", "pera"]</span>.<br><br>Imprime la lista final y su longitud.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateListMethods,
    },
    {
      id: 'ex-7-6',
      number: 'EJERCICIO 7.6',
      description:
        'Crea un diccionario <span class="inline-code">estudiante = {"nombre": "Ana", "edad": 20, "carrera": "Ingeniería"}</span>.<br><br>Modifica la edad a 21. Agrega una nueva llave <span class="inline-code">"promedio": 8.5</span>.<br><br>Imprime el diccionario completo y el número total de llaves usando <span class="inline-code">len()</span>.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateDictionaryOperations,
    },
    {
      id: 'ex-7-7',
      number: 'EJERCICIO 7.7',
      description:
        'Crea una variable <span class="inline-code">texto = "Python"</span>.<br><br>Imprime:<br>1) El texto repetido 3 veces (<span class="inline-code">texto * 3</span>)<br>2) El texto en mayúsculas<br>3) El texto al revés usando slicing <span class="inline-code">[::-1]</span><br>4) La longitud del texto',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateTextStatistics,
    },
    {
      id: 'ex-7-8',
      number: 'EJERCICIO 7.8',
      description:
        'Crea una lista <span class="inline-code">datos = [5, 10, 15, 20, 25, 30]</span>.<br><br>Crea una nueva lista <span class="inline-code">primeros_tres</span> con los primeros 3 elementos (usando slicing <span class="inline-code">[:3]</span>), y <span class="inline-code">ultimos_tres</span> con los últimos 3 elementos (<span class="inline-code">[-3:]</span>).<br><br>Imprime ambas listas y la suma de cada una.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateComplexListManipulation,
    },
    {
      id: 'ex-7-9',
      number: 'EJERCICIO 7.9',
      description:
        'Crea un diccionario <span class="inline-code">producto = {"nombre": "Laptop", "precio": 1000, "stock": 5}</span> y una variable <span class="inline-code">cantidad_vendida = 2</span>.<br><br>Calcula:<br>1) Ingresos totales (precio × cantidad_vendida)<br>2) Nuevo stock (stock - cantidad_vendida)<br>3) Actualiza el diccionario con el nuevo stock<br><br>Imprime el diccionario actualizado y los ingresos.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateDataCombination,
    },
  ],
};
