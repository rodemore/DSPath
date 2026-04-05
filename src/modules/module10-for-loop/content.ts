import type { Section } from '../../types';
import {
  validateForList,
  validateForString,
  validateForRange,
  validateForRangeSum,
  validateForWithIf,
} from './validators';

export const module10: Section = {
  id: 9,
  moduleNumber: 'Módulo 10',
  title: 'Bucle FOR:',
  titleHighlight: 'Iteración sobre Secuencias',
  theoryBlocks: [
    {
      icon: '🔁',
      title: '¿Qué es un bucle?',
      content:
        'Un <strong>bucle</strong> (o loop) es una estructura que permite repetir un bloque de código múltiples veces. En lugar de escribir el mismo código 10 veces, podemos usar un bucle que lo ejecute 10 veces automáticamente.',
      codeExample: {
        filename: 'concepto_bucle.py',
        code: `<span class="comment"># Sin bucle (repetitivo y limitado)</span>
<span class="builtin">print</span>(<span class="string">"Hola"</span>)
<span class="builtin">print</span>(<span class="string">"Hola"</span>)
<span class="builtin">print</span>(<span class="string">"Hola"</span>)

<span class="comment"># Con bucle (elegante y flexible)</span>
<span class="keyword">for</span> i <span class="keyword">in</span> <span class="builtin">range</span>(<span class="number">3</span>):
    <span class="builtin">print</span>(<span class="string">"Hola"</span>)

<span class="output"># → Hola</span>
<span class="output"># → Hola</span>
<span class="output"># → Hola</span>`,
      },
    },
    {
      icon: '📋',
      title: 'FOR con listas',
      content:
        'El bucle <span class="inline-code">for</span> nos permite <strong>iterar</strong> (recorrer) cada elemento de una lista, uno por uno. En cada iteración, la variable toma el valor del siguiente elemento.',
      codeExample: {
        filename: 'for_lista.py',
        code: `<span class="identifier">frutas</span> = [<span class="string">"manzana"</span>, <span class="string">"banana"</span>, <span class="string">"naranja"</span>]

<span class="keyword">for</span> <span class="identifier">fruta</span> <span class="keyword">in</span> frutas:
    <span class="builtin">print</span>(fruta)

<span class="output"># → manzana</span>
<span class="output"># → banana</span>
<span class="output"># → naranja</span>

<span class="comment"># Otro ejemplo con números</span>
<span class="identifier">numeros</span> = [<span class="number">10</span>, <span class="number">20</span>, <span class="number">30</span>]

<span class="keyword">for</span> <span class="identifier">numero</span> <span class="keyword">in</span> numeros:
    <span class="builtin">print</span>(<span class="string">f"El número es: {numero}"</span>)

<span class="output"># → El número es: 10</span>
<span class="output"># → El número es: 20</span>
<span class="output"># → El número es: 30</span>`,
      },
      exercises: [
        {
          id: 'ex-10-1',
          number: 'EJERCICIO 10.1',
          description:
            'Crea una lista <span class="inline-code">colores = ["rojo", "azul", "verde"]</span>.<br><br>Usa un bucle <span class="inline-code">for</span> para imprimir cada color.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateForList,
        },
      ],
    },
    {
      icon: '🔤',
      title: 'FOR con strings',
      content:
        'Los strings también son secuencias, por lo que podemos iterar sobre cada carácter usando <span class="inline-code">for</span>.',
      codeExample: {
        filename: 'for_string.py',
        code: `<span class="identifier">palabra</span> = <span class="string">"Python"</span>

<span class="keyword">for</span> <span class="identifier">letra</span> <span class="keyword">in</span> palabra:
    <span class="builtin">print</span>(letra)

<span class="output"># → P</span>
<span class="output"># → y</span>
<span class="output"># → t</span>
<span class="output"># → h</span>
<span class="output"># → o</span>
<span class="output"># → n</span>`,
      },
      exercises: [
        {
          id: 'ex-10-2',
          number: 'EJERCICIO 10.2',
          description:
            'Crea una variable <span class="inline-code">palabra = "Python"</span>.<br><br>Usa un bucle <span class="inline-code">for</span> para imprimir cada letra de la palabra.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateForString,
        },
      ],
    },
    {
      icon: '🔢',
      title: 'La función range()',
      content:
        'La función <span class="inline-code">range()</span> genera una secuencia de números. Es extremadamente útil cuando queremos repetir algo un número específico de veces o generar secuencias numéricas. <strong>Es una de las funciones más usadas con FOR.</strong>',
      codeExample: {
        filename: 'range.py',
        code: `<span class="comment"># range(n) - genera números de 0 a n-1</span>
<span class="keyword">for</span> i <span class="keyword">in</span> <span class="builtin">range</span>(<span class="number">5</span>):
    <span class="builtin">print</span>(i)

<span class="output"># → 0</span>
<span class="output"># → 1</span>
<span class="output"># → 2</span>
<span class="output"># → 3</span>
<span class="output"># → 4</span>

<span class="comment"># range(inicio, fin) - genera de inicio a fin-1</span>
<span class="keyword">for</span> i <span class="keyword">in</span> <span class="builtin">range</span>(<span class="number">3</span>, <span class="number">7</span>):
    <span class="builtin">print</span>(i)

<span class="output"># → 3</span>
<span class="output"># → 4</span>
<span class="output"># → 5</span>
<span class="output"># → 6</span>

<span class="comment"># range(inicio, fin, paso) - controla el incremento</span>
<span class="keyword">for</span> i <span class="keyword">in</span> <span class="builtin">range</span>(<span class="number">0</span>, <span class="number">10</span>, <span class="number">2</span>):
    <span class="builtin">print</span>(i)

<span class="output"># → 0</span>
<span class="output"># → 2</span>
<span class="output"># → 4</span>
<span class="output"># → 6</span>
<span class="output"># → 8</span>`,
      },
      exercises: [
        {
          id: 'ex-10-3',
          number: 'EJERCICIO 10.3',
          description:
            'Usa un bucle <span class="inline-code">for</span> con <span class="inline-code">range(1, 11)</span> para imprimir los números del 1 al 10.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateForRange,
        },
      ],
    },
    {
      icon: '➕',
      title: 'Acumuladores en bucles',
      content:
        'Un patrón muy común es usar una variable <strong>acumuladora</strong> que va sumando, contando o concatenando valores en cada iteración del bucle. Esto es fundamental para cálculos y procesamiento de datos.',
      codeExample: {
        filename: 'acumuladores.py',
        code: `<span class="comment"># Sumar números del 1 al 5</span>
<span class="identifier">suma</span> = <span class="number">0</span>
<span class="keyword">for</span> i <span class="keyword">in</span> <span class="builtin">range</span>(<span class="number">1</span>, <span class="number">6</span>):
    suma = suma + i
    <span class="builtin">print</span>(<span class="string">f"i={i}, suma parcial={suma}"</span>)

<span class="builtin">print</span>(<span class="string">f"Suma total: {suma}"</span>)

<span class="output"># → i=1, suma parcial=1</span>
<span class="output"># → i=2, suma parcial=3</span>
<span class="output"># → i=3, suma parcial=6</span>
<span class="output"># → i=4, suma parcial=10</span>
<span class="output"># → i=5, suma parcial=15</span>
<span class="output"># → Suma total: 15</span>

<span class="comment"># Contar elementos</span>
<span class="identifier">frutas</span> = [<span class="string">"manzana"</span>, <span class="string">"banana"</span>, <span class="string">"naranja"</span>]
<span class="identifier">contador</span> = <span class="number">0</span>

<span class="keyword">for</span> <span class="identifier">fruta</span> <span class="keyword">in</span> frutas:
    contador = contador + <span class="number">1</span>

<span class="builtin">print</span>(<span class="string">f"Total de frutas: {contador}"</span>)
<span class="output"># → Total de frutas: 3</span>`,
      },
      exercises: [
        {
          id: 'ex-10-4',
          number: 'EJERCICIO 10.4',
          description:
            'Crea una lista <span class="inline-code">numeros = [5, 10, 15, 20, 25]</span>.<br><br>Usa un bucle <span class="inline-code">for</span> para sumar todos los números. Crea una variable <span class="inline-code">suma = 0</span> antes del bucle y ve acumulando cada número. Al final, imprime el total.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateForRangeSum,
        },
      ],
    },
    {
      icon: '🔀',
      title: 'FOR con condicionales',
      content:
        'Podemos combinar <span class="inline-code">for</span> con <span class="inline-code">if</span> para procesar solo ciertos elementos que cumplan una condición. Esta combinación es muy poderosa para filtrar y analizar datos.',
      codeExample: {
        filename: 'for_if.py',
        code: `<span class="identifier">numeros</span> = [<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>, <span class="number">4</span>, <span class="number">5</span>, <span class="number">6</span>, <span class="number">7</span>, <span class="number">8</span>]

<span class="comment"># Imprimir solo números pares</span>
<span class="keyword">for</span> <span class="identifier">numero</span> <span class="keyword">in</span> numeros:
    <span class="keyword">if</span> numero % <span class="number">2</span> == <span class="number">0</span>:
        <span class="builtin">print</span>(<span class="string">f"{numero} es par"</span>)

<span class="output"># → 2 es par</span>
<span class="output"># → 4 es par</span>
<span class="output"># → 6 es par</span>
<span class="output"># → 8 es par</span>

<span class="comment"># Contar aprobados</span>
<span class="identifier">notas</span> = [<span class="number">85</span>, <span class="number">65</span>, <span class="number">90</span>, <span class="number">55</span>, <span class="number">78</span>]
<span class="identifier">aprobados</span> = <span class="number">0</span>

<span class="keyword">for</span> <span class="identifier">nota</span> <span class="keyword">in</span> notas:
    <span class="keyword">if</span> nota &gt;&#61; <span class="number">70</span>:
        aprobados = aprobados + <span class="number">1</span>

<span class="builtin">print</span>(<span class="string">f"Aprobados: {aprobados}"</span>)
<span class="output"># → Aprobados: 3</span>`,
      },
      exercises: [
        {
          id: 'ex-10-5',
          number: 'EJERCICIO 10.5',
          description:
            'Crea una lista <span class="inline-code">numeros = [12, 7, 23, 8, 15, 30, 5]</span>.<br><br>Usa un bucle <span class="inline-code">for</span> con <span class="inline-code">if</span> para contar cuántos números son mayores a 10. Crea una variable <span class="inline-code">contador = 0</span> y auméntala cada vez que encuentres un número mayor a 10. Al final, imprime el contador.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateForWithIf,
        },
      ],
    },
  ],
  tipBox: {
    icon: '💡',
    content:
      '<strong>Recuerda:</strong> La indentación es crucial en los bucles. Todo el código que quieras repetir debe estar indentado dentro del <span class="inline-code">for</span>. El código que no esté indentado se ejecutará solo una vez, después del bucle.',
  },
  exercises: [],
};
