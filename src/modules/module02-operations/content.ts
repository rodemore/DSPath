import type { Section } from '../../types';
import {
  validateSumOperation,
  validateRectangleArea,
  validatePowerOperation,
  validateDivisionAndModulo,
} from './validators';

export const module02: Section = {
  id: 1,
  moduleNumber: 'Módulo 02',
  title: 'Operaciones',
  titleHighlight: 'Numéricas',
  theoryBlocks: [
    {
      icon: '🔢',
      title: 'Recordando los tipos numéricos',
      content:
        'En Python trabajamos con dos tipos principales de números: <strong>int</strong> (enteros) y <strong>float</strong> (decimales). Podemos realizar múltiples operaciones matemáticas con ellos.',
      codeExample: {
        filename: 'numeros.py',
        code: `<span class="identifier">entero</span> = <span class="number">42</span>
<span class="identifier">decimal</span> = <span class="number">3.14</span>

<span class="builtin">print</span>(<span class="builtin">type</span>(entero))    <span class="output"># → &lt;class 'int'&gt;</span>
<span class="builtin">print</span>(<span class="builtin">type</span>(decimal))   <span class="output"># → &lt;class 'float'&gt;</span>`,
      },
    },
    {
      icon: '➕',
      title: 'Operaciones básicas',
      content:
        'Python soporta todas las operaciones matemáticas básicas. Los operadores funcionan tanto con <span class="inline-code">int</span> como con <span class="inline-code">float</span>.',
      table: {
        headers: ['Operador', 'Operación', 'Ejemplo', 'Resultado'],
        rows: [
          {
            Operador: '<code>+</code>',
            Operación: 'Suma',
            Ejemplo: '<code>10 + 3</code>',
            Resultado: '<code>13</code>',
          },
          {
            Operador: '<code>-</code>',
            Operación: 'Resta',
            Ejemplo: '<code>10 - 3</code>',
            Resultado: '<code>7</code>',
          },
          {
            Operador: '<code>*</code>',
            Operación: 'Multiplicación',
            Ejemplo: '<code>10 * 3</code>',
            Resultado: '<code>30</code>',
          },
          {
            Operador: '<code>/</code>',
            Operación: 'División',
            Ejemplo: '<code>10 / 3</code>',
            Resultado: '<code>3.333...</code>',
          },
          {
            Operador: '<code>**</code>',
            Operación: 'Potencia',
            Ejemplo: '<code>10 ** 3</code>',
            Resultado: '<code>1000</code>',
          },
          {
            Operador: '<code>//</code>',
            Operación: 'División entera',
            Ejemplo: '<code>10 // 3</code>',
            Resultado: '<code>3</code>',
          },
          {
            Operador: '<code>%</code>',
            Operación: 'Módulo (residuo)',
            Ejemplo: '<code>10 % 3</code>',
            Resultado: '<code>1</code>',
          },
        ],
      },
    },
    {
      icon: '💻',
      title: 'Ejemplos en código',
      content: 'Veamos cómo usar estos operadores en la práctica con variables:',
      codeExample: {
        filename: 'ejemplos.py',
        code: `<span class="identifier">a</span> = <span class="number">15</span>
<span class="identifier">b</span> = <span class="number">4</span>

<span class="comment"># Operaciones básicas</span>
<span class="builtin">print</span>(<span class="string">"Suma:"</span>, a + b)           <span class="output"># → Suma: 19</span>
<span class="builtin">print</span>(<span class="string">"Resta:"</span>, a - b)          <span class="output"># → Resta: 11</span>
<span class="builtin">print</span>(<span class="string">"Multiplicación:"</span>, a * b)  <span class="output"># → Multiplicación: 60</span>
<span class="builtin">print</span>(<span class="string">"División:"</span>, a / b)       <span class="output"># → División: 3.75</span>

<span class="comment"># Potencia (elevar a una potencia)</span>
<span class="builtin">print</span>(<span class="string">"Potencia:"</span>, <span class="number">2</span> ** <span class="number">3</span>)      <span class="output"># → Potencia: 8 (2³)</span>`,
      },
    },
    {
      icon: '➗',
      title: 'División entera y módulo',
      content:
        'El operador <span class="inline-code">//</span> realiza división entera (cociente sin decimales) y <span class="inline-code">%</span> obtiene el residuo (resto de la división).',
      codeExample: {
        filename: 'division_modulo.py',
        code: `<span class="identifier">dividendo</span> = <span class="number">17</span>
<span class="identifier">divisor</span> = <span class="number">5</span>

<span class="comment"># División entera (cociente)</span>
<span class="identifier">cociente</span> = dividendo // divisor
<span class="builtin">print</span>(cociente)    <span class="output"># → 3</span>

<span class="comment"># Módulo (residuo)</span>
<span class="identifier">residuo</span> = dividendo % divisor
<span class="builtin">print</span>(residuo)     <span class="output"># → 2</span>

<span class="comment"># Verificación: 17 = (5 × 3) + 2</span>`,
      },
    },
  ],
  tipBox: {
    icon: '💡',
    content:
      'La división normal <span class="inline-code">/</span> siempre retorna un <span class="inline-code">float</span>, incluso si el resultado es un número entero. Usa <span class="inline-code">//</span> si necesitas un resultado <span class="inline-code">int</span>.',
  },
  exercises: [
    {
      id: 'ex-2-1',
      number: 'EJERCICIO 2.1',
      description:
        'Crea dos variables numéricas: <span class="inline-code">a</span> y <span class="inline-code">b</span> con los valores que quieras. Suma ambas variables e imprime el resultado.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateSumOperation,
    },
    {
      id: 'ex-2-2',
      number: 'EJERCICIO 2.2',
      description:
        'Crea dos variables: <span class="inline-code">base</span> con valor 8 y <span class="inline-code">altura</span> con valor 5.<br><br>Calcula el área del rectángulo (base × altura) y guarda el resultado en una variable llamada <span class="inline-code">area</span>. Finalmente, imprime el valor de <span class="inline-code">area</span>.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateRectangleArea,
    },
    {
      id: 'ex-2-3',
      number: 'EJERCICIO 2.3',
      description:
        'Crea dos variables: <span class="inline-code">numero</span> y <span class="inline-code">exponente</span> con los valores que quieras.<br><br>Calcula la potencia usando el operador <span class="inline-code">**</span> e imprime el resultado.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validatePowerOperation,
    },
    {
      id: 'ex-2-4',
      number: 'EJERCICIO 2.4',
      description:
        'Crea dos variables: <span class="inline-code">dividendo</span> con valor 23 y <span class="inline-code">divisor</span> con valor 4.<br><br>Calcula el cociente usando <span class="inline-code">//</span> y guárdalo en una variable llamada <span class="inline-code">cociente</span>. Calcula el residuo usando <span class="inline-code">%</span> y guárdalo en una variable llamada <span class="inline-code">residuo</span>. Finalmente, imprime ambas variables.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateDivisionAndModulo,
    },
  ],
};
