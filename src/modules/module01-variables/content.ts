import type { Section } from '../../types';
import {
  validateVariableAndPrint,
  validateTwoVariablesAndTypes,
  validatePrintWithTextAndVariables,
} from './validators';

export const module01: Section = {
  id: 0,
  moduleNumber: 'Módulo 01',
  title: 'Variables y',
  titleHighlight: 'Tipos de Datos',
  theoryBlocks: [
    {
      icon: '🖨️',
      title: 'Mostrar información: print()',
      content:
        'La función <span class="inline-code">print()</span> te permite <strong>mostrar</strong> información en la consola. Es fundamental para ver los resultados de tu código.',
      codeExample: {
        filename: 'hola_mundo.py',
        code: `<span class="comment"># Tu primer programa en Python</span>
<span class="builtin">print</span>(<span class="string">"Hola, Mundo!"</span>)  <span class="output"># → Hola, Mundo!</span>

<span class="comment"># Imprimir números</span>
<span class="builtin">print</span>(<span class="number">42</span>)               <span class="output"># → 42</span>
<span class="builtin">print</span>(<span class="number">3.14159</span>)          <span class="output"># → 3.14159</span>`,
      },
    },
    {
      icon: '📦',
      title: '¿Qué es una variable?',
      content:
        'Una variable es un <strong>nombre</strong> que apunta a un valor almacenado en memoria. En Python no necesitas declarar el tipo — se infiere automáticamente.',
      codeExample: {
        filename: 'ejemplo.py',
        code: `<span class="comment"># Asignación de variables</span>
<span class="identifier">nombre</span> = <span class="string">"Ana"</span>        <span class="comment"># str (cadena de texto)</span>
<span class="identifier">edad</span> = <span class="number">25</span>              <span class="comment"># int (entero)</span>
<span class="identifier">altura</span> = <span class="number">1.68</span>           <span class="comment"># float (decimal)</span>
<span class="identifier">es_estudiante</span> = <span class="keyword">True</span>    <span class="comment"># bool (booleano)</span>

<span class="comment"># Ahora podemos mostrar estas variables</span>
<span class="builtin">print</span>(nombre)           <span class="output"># → Ana</span>
<span class="builtin">print</span>(<span class="builtin">type</span>(edad))      <span class="output"># → &lt;class 'int'&gt;</span>`,
      },
    },
    {
      icon: '📋',
      title: 'Tipos de datos básicos',
      content: '',
      table: {
        headers: ['Tipo', 'Descripción', 'Ejemplo'],
        rows: [
          { Tipo: '<code>int</code>', Descripción: 'Número entero', Ejemplo: '<code>42</code>' },
          {
            Tipo: '<code>float</code>',
            Descripción: 'Número decimal',
            Ejemplo: '<code>3.14</code>',
          },
          {
            Tipo: '<code>str</code>',
            Descripción: 'Cadena de texto',
            Ejemplo: '<code>"Hola"</code>',
          },
          {
            Tipo: '<code>bool</code>',
            Descripción: 'Verdadero o falso',
            Ejemplo: '<code>True / False</code>',
          },
          {
            Tipo: '<code>NoneType</code>',
            Descripción: 'Ausencia de valor',
            Ejemplo: '<code>None</code>',
          },
        ],
      },
    },
    {
      icon: '🖨️',
      title: 'Imprimir múltiples valores',
      content:
        'Puedes usar <span class="inline-code">print()</span> con varios argumentos separados por comas para combinar texto y variables. Python automáticamente agrega un espacio entre cada valor.',
      codeExample: {
        filename: 'print_multiple.py',
        code: `<span class="identifier">nombre</span> = <span class="string">"Ana"</span>
<span class="identifier">edad</span> = <span class="number">25</span>

<span class="comment"># Combinar texto y variables</span>
<span class="builtin">print</span>(<span class="string">"Hola, me llamo"</span>, nombre, <span class="string">"y tengo"</span>, edad, <span class="string">"años"</span>)
<span class="output"># → Hola, me llamo Ana y tengo 25 años</span>

<span class="comment"># Puedes usar solo variables</span>
<span class="builtin">print</span>(nombre, edad)  <span class="output"># → Ana 25</span>`,
      },
    },
  ],
  tipBox: {
    icon: '💡',
    content:
      'Los nombres de variables deben empezar con una letra o guión bajo, no pueden tener espacios y son <strong>sensibles a mayúsculas</strong> (<span class="inline-code">edad</span> ≠ <span class="inline-code">Edad</span>).',
  },
  exercises: [
    {
      id: 'ex-1-1',
      number: 'EJERCICIO 1.1',
      description:
        'Crea una variable llamada <span class="inline-code">nombre</span> con tu nombre (entre comillas). Luego usa <span class="inline-code">print()</span> para mostrar tu variable.',
      expectedOutput: '', // No se usa en validación custom
      validationMode: 'custom',
      customValidator: validateVariableAndPrint,
    },
    {
      id: 'ex-1-2',
      number: 'EJERCICIO 1.2',
      description:
        'Crea una variable <span class="inline-code">pi</span> con valor <span class="inline-code">3.14159</span> y una variable <span class="inline-code">es_positivo</span> con valor <span class="inline-code">True</span>.<br><br>Imprime el tipo de cada una usando <span class="inline-code">type()</span>.',
      expectedOutput: '', // No se usa en validación custom
      validationMode: 'custom',
      customValidator: validateTwoVariablesAndTypes,
    },
    {
      id: 'ex-1-3',
      number: 'EJERCICIO 1.3',
      description:
        'Crea dos variables: <span class="inline-code">ciudad</span> con tu ciudad y <span class="inline-code">pais</span> con tu país.<br><br>Usa <span class="inline-code">print()</span> para mostrar un mensaje como: "Vivo en [ciudad], [pais]" combinando texto y variables con comas.',
      expectedOutput: '', // No se usa en validación custom
      validationMode: 'custom',
      customValidator: validatePrintWithTextAndVariables,
    },
  ],
};
