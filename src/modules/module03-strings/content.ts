import type { Section } from '../../types';
import {
  validatePlacaFirstChar,
  validatePlacaFirstThree,
  validateExtractMundo,
  validateUpperCase,
  validateTitleCase,
  validateStringMultiplication,
  validateSplitWords,
} from './validators';

export const module03: Section = {
  id: 2,
  moduleNumber: 'Módulo 03',
  title: 'Strings:',
  titleHighlight: 'Cadenas de Texto',
  theoryBlocks: [
    {
      icon: '🔤',
      title: '¿Qué es un String?',
      content:
        'Un string es una secuencia de caracteres encerrada entre comillas simples <span class="inline-code">\'...\'</span> o dobles <span class="inline-code">"..."</span>. Son <strong>inmutables</strong>, lo que significa que no se pueden modificar una vez creados (pero sí crear nuevos a partir de ellos).',
      codeExample: {
        filename: 'strings.py',
        code: `<span class="identifier">texto</span> = <span class="string">"Python"</span>
<span class="builtin">print</span>(texto)          <span class="output"># → Python</span>
<span class="builtin">print</span>(<span class="builtin">len</span>(texto))     <span class="output"># → 6 (longitud)</span>
<span class="builtin">print</span>(<span class="builtin">type</span>(texto))    <span class="output"># → &lt;class 'str'&gt;</span>`,
      },
    },
    {
      icon: '🔢',
      title: 'Índices: Accediendo a caracteres',
      content:
        'Cada carácter en un string tiene una posición (índice). Los <strong>índices positivos</strong> empiezan en 0 desde el inicio. Los <strong>índices negativos</strong> empiezan en -1 desde el final.',
      codeExample: {
        filename: 'indices.py',
        code: `<span class="identifier">palabra</span> = <span class="string">"Python"</span>

<span class="comment"># Índices positivos: →</span>
<span class="comment">#  P  y  t  h  o  n</span>
<span class="comment">#  0  1  2  3  4  5</span>

<span class="builtin">print</span>(palabra[<span class="number">0</span>])      <span class="output"># → P (primera letra)</span>
<span class="builtin">print</span>(palabra[<span class="number">3</span>])      <span class="output"># → h</span>
<span class="builtin">print</span>(palabra[<span class="number">5</span>])      <span class="output"># → n (última letra)</span>

<span class="comment"># Índices negativos: ←</span>
<span class="comment">#  P  y  t  h  o  n</span>
<span class="comment"># -6 -5 -4 -3 -2 -1</span>

<span class="builtin">print</span>(palabra[-<span class="number">1</span>])     <span class="output"># → n (última letra)</span>
<span class="builtin">print</span>(palabra[-<span class="number">6</span>])     <span class="output"># → P (primera letra)</span>`,
      },
      exercises: [
        {
          id: 'ex-3-1',
          number: 'EJERCICIO 3.1',
          description:
            'Crea una variable <span class="inline-code">placa</span> con el valor <span class="inline-code">"GTS-4512"</span>.<br><br>Extrae el primer carácter usando índice y guárdalo en una variable llamada <span class="inline-code">cod_provincia</span>. Finalmente, imprime el valor de <span class="inline-code">cod_provincia</span>.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validatePlacaFirstChar,
        },
      ],
    },
    {
      icon: '✂️',
      title: 'Slicing: Extraer subcadenas',
      content:
        'El slicing permite extraer una porción del string usando la sintaxis <span class="inline-code">[inicio:fin]</span>. El índice <span class="inline-code">inicio</span> está incluido, pero el <span class="inline-code">fin</span> no.',
      codeExample: {
        filename: 'slicing.py',
        code: `<span class="identifier">mensaje</span> = <span class="string">"Hola Mundo"</span>

<span class="builtin">print</span>(mensaje[<span class="number">0</span>:<span class="number">4</span>])     <span class="output"># → Hola (del 0 al 3)</span>
<span class="builtin">print</span>(mensaje[<span class="number">5</span>:<span class="number">10</span>])    <span class="output"># → Mundo (del 5 al 9)</span>
<span class="builtin">print</span>(mensaje[<span class="number">5</span>:])      <span class="output"># → Mundo (del 5 hasta el final)</span>
<span class="builtin">print</span>(mensaje[:<span class="number">4</span>])      <span class="output"># → Hola (desde el inicio hasta el 3)</span>
<span class="builtin">print</span>(mensaje[:])       <span class="output"># → Hola Mundo (copia completa)</span>`,
      },
      exercises: [
        {
          id: 'ex-3-2',
          number: 'EJERCICIO 3.2',
          description:
            'Usando la misma placa <span class="inline-code">"GTS-4512"</span>, obtén los 3 primeros caracteres usando slicing e imprímelos.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validatePlacaFirstThree,
        },
        {
          id: 'ex-3-3',
          number: 'EJERCICIO 3.3',
          description:
            'Crea una variable <span class="inline-code">frase</span> con <span class="inline-code">"Hola Mundo"</span>.<br><br>Usa slicing para extraer e imprimir solo la palabra "Mundo".',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateExtractMundo,
        },
      ],
    },
    {
      icon: '🛠️',
      title: 'Métodos de transformación',
      content:
        'Los strings tienen métodos integrados para transformar el texto. Estos métodos <strong>no modifican</strong> el string original, sino que crean y retornan uno nuevo.',
      codeExample: {
        filename: 'metodos_transformacion.py',
        code: `<span class="identifier">texto</span> = <span class="string">"Hola Mundo"</span>

<span class="comment"># Cambiar a mayúsculas/minúsculas</span>
<span class="builtin">print</span>(texto.<span class="function">upper</span>())        <span class="output"># → HOLA MUNDO</span>
<span class="builtin">print</span>(texto.<span class="function">lower</span>())        <span class="output"># → hola mundo</span>
<span class="builtin">print</span>(texto.<span class="function">capitalize</span>())   <span class="output"># → Hola mundo</span>
<span class="builtin">print</span>(texto.<span class="function">title</span>())        <span class="output"># → Hola Mundo</span>

<span class="comment"># Reemplazar texto</span>
<span class="builtin">print</span>(texto.<span class="function">replace</span>(<span class="string">"Mundo"</span>, <span class="string">"Python"</span>))  <span class="output"># → Hola Python</span>`,
      },
      exercises: [
        {
          id: 'ex-3-4',
          number: 'EJERCICIO 3.4',
          description:
            'Crea una variable <span class="inline-code">frase</span> con <span class="inline-code">"Hola Mundo"</span>.<br><br>Convierte la frase a mayúsculas usando el método apropiado y guarda el resultado en una variable llamada <span class="inline-code">frase_mayusculas</span>. Finalmente, imprime <span class="inline-code">frase_mayusculas</span>.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateUpperCase,
        },
        {
          id: 'ex-3-5',
          number: 'EJERCICIO 3.5',
          description:
            'Crea una variable <span class="inline-code">nombre</span> con el valor <span class="inline-code">"robert moreno"</span>.<br><br>Conviértelo a formato título (primera letra de cada palabra en mayúscula) e imprímelo.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateTitleCase,
        },
      ],
    },
    {
      icon: '🔁',
      title: 'Multiplicación de strings',
      content:
        'Los strings se pueden <strong>multiplicar</strong> por un número entero para repetirlos. Esto es útil para crear patrones o separadores.',
      codeExample: {
        filename: 'multiplicacion_strings.py',
        code: `<span class="identifier">patron</span> = <span class="string">"*"</span>
<span class="builtin">print</span>(patron * <span class="number">10</span>)     <span class="output"># → **********</span>

<span class="identifier">separador</span> = <span class="string">"-"</span> * <span class="number">30</span>
<span class="builtin">print</span>(separador)       <span class="output"># → ------------------------------</span>

<span class="identifier">saludo</span> = <span class="string">"Hola! "</span>
<span class="builtin">print</span>(saludo * <span class="number">3</span>)     <span class="output"># → Hola! Hola! Hola! </span>`,
      },
      exercises: [
        {
          id: 'ex-3-6',
          number: 'EJERCICIO 3.6',
          description:
            'Crea una variable <span class="inline-code">simbolo</span> con el valor <span class="inline-code">"="</span>.<br><br>Multiplica el símbolo por 20 e imprime el resultado para crear una línea separadora.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateStringMultiplication,
        },
      ],
    },
    {
      icon: '✂️',
      title: 'Métodos de división y limpieza',
      content:
        'Puedes dividir strings en partes, eliminar espacios innecesarios o unir listas de strings.',
      codeExample: {
        filename: 'metodos_division.py',
        code: `<span class="comment"># Dividir en palabras usando espacio</span>
<span class="identifier">frase</span> = <span class="string">"uno dos tres"</span>
<span class="builtin">print</span>(frase.<span class="function">split</span>(<span class="string">" "</span>))    <span class="output"># → ['uno', 'dos', 'tres']</span>

<span class="comment"># Dividir por separador</span>
<span class="identifier">datos</span> = <span class="string">"Ana,25,Ecuador"</span>
<span class="builtin">print</span>(datos.<span class="function">split</span>(<span class="string">","</span>))   <span class="output"># → ['Ana', '25', 'Ecuador']</span>

<span class="comment"># Quitar espacios</span>
<span class="identifier">texto</span> = <span class="string">"  hola  "</span>
<span class="builtin">print</span>(texto.<span class="function">strip</span>())       <span class="output"># → hola</span>`,
      },
      exercises: [
        {
          id: 'ex-3-7',
          number: 'EJERCICIO 3.7',
          description:
            'Crea una variable <span class="inline-code">oracion</span> con <span class="inline-code">"Python es divertido"</span>.<br><br>Divide la oración en palabras usando <span class="inline-code">split(" ")</span> e imprime la lista resultante.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateSplitWords,
        },
      ],
    },
  ],
  exercises: [],
};
