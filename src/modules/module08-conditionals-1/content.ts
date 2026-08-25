import type { Section } from '../../types';
import {
  validateComparison,
  validateLogicalAnd,
  validateLogicalOr,
  validateSimpleIf,
  validateIfWithCondition,
  validateInOperator,
} from './validators';

export const module08: Section = {
  id: 7,
  moduleNumber: 'Módulo 08',
  title: 'Condicionales 1:',
  titleHighlight: 'Comparaciones y IF',
  theoryBlocks: [
    {
      icon: '⚖️',
      title: '¿Por qué necesitamos condicionales?',
      content:
        'En programación, constantemente necesitamos tomar decisiones: ¿el usuario es mayor de edad? ¿la contraseña es correcta? ¿hay stock disponible? Las <strong>estructuras condicionales</strong> permiten que nuestro código tome diferentes caminos según las condiciones que evaluemos.',
      codeExample: {
        filename: 'ejemplo_decision.py',
        code: `<span class="identifier">edad</span> = <span class="number">20</span>

<span class="comment"># Python puede tomar decisiones</span>
<span class="keyword">if</span> edad &gt;&#61; <span class="number">18</span>:
    <span class="builtin">print</span>(<span class="string">"Eres mayor de edad"</span>)

<span class="output"># → Eres mayor de edad</span>`,
      },
    },
    {
      icon: '🔍',
      title: 'Operadores de comparación',
      content:
        'Los operadores de comparación nos permiten comparar valores. El resultado de una comparación siempre es un valor booleano: <span class="inline-code">True</span> (verdadero) o <span class="inline-code">False</span> (falso).',
      table: {
        headers: ['Operador', 'Significado', 'Ejemplo', 'Resultado'],
        rows: [
          { Operador: '==', Significado: 'Igual a', Ejemplo: '5 == 5', Resultado: 'True' },
          { Operador: '!=', Significado: 'Diferente de', Ejemplo: '5 != 3', Resultado: 'True' },
          { Operador: '>', Significado: 'Mayor que', Ejemplo: '8 > 5', Resultado: 'True' },
          { Operador: '<', Significado: 'Menor que', Ejemplo: '3 < 7', Resultado: 'True' },
          {
            Operador: '>=',
            Significado: 'Mayor o igual que',
            Ejemplo: '5 >= 5',
            Resultado: 'True',
          },
          {
            Operador: '<=',
            Significado: 'Menor o igual que',
            Ejemplo: '4 <= 9',
            Resultado: 'True',
          },
        ],
      },
      exercises: [
        {
          id: 'ex-8-1',
          number: 'EJERCICIO 8.1',
          description:
            'Crea dos variables: <span class="inline-code">edad = 22</span> y <span class="inline-code">precio = 50</span>.<br><br>Usa operadores de comparación para verificar si la edad es mayor o igual a 18 y guarda el resultado en una variable <span class="inline-code">es_mayor</span>. Verifica si el precio es menor que 100 y guarda el resultado en <span class="inline-code">es_barato</span>.<br><br>Imprime ambos resultados.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateComparison,
        },
      ],
    },
    {
      icon: '💻',
      title: 'Comparaciones en acción',
      content: 'Veamos cómo funcionan las comparaciones en código real:',
      codeExample: {
        filename: 'comparaciones.py',
        code: `<span class="identifier">edad</span> = <span class="number">25</span>
<span class="identifier">precio</span> = <span class="number">100</span>
<span class="identifier">nombre</span> = <span class="string">"Ana"</span>

<span class="comment"># Comparaciones numéricas</span>
<span class="builtin">print</span>(edad &gt; <span class="number">18</span>)        <span class="output"># → True</span>
<span class="builtin">print</span>(precio == <span class="number">50</span>)      <span class="output"># → False</span>
<span class="builtin">print</span>(precio &lt;&#61; <span class="number">100</span>)     <span class="output"># → True</span>

<span class="comment"># Comparaciones de strings</span>
<span class="builtin">print</span>(nombre == <span class="string">"Ana"</span>)   <span class="output"># → True</span>
<span class="builtin">print</span>(nombre != <span class="string">"Juan"</span>)  <span class="output"># → True</span>`,
      },
    },
    {
      icon: '🔗',
      title: 'Operadores lógicos',
      content:
        'Los operadores lógicos nos permiten combinar múltiples condiciones para crear expresiones más complejas.',
      table: {
        headers: ['Operador', 'Descripción', 'Ejemplo', '¿Cuándo usarlo?'],
        rows: [
          {
            Operador: 'and',
            Descripción: 'Verdadero si AMBAS condiciones son verdaderas',
            Ejemplo: 'x > 5 and x < 10',
            '¿Cuándo usarlo?': 'Cuando TODAS las condiciones deben cumplirse',
          },
          {
            Operador: 'or',
            Descripción: 'Verdadero si AL MENOS UNA condición es verdadera',
            Ejemplo: 'edad < 18 or edad > 65',
            '¿Cuándo usarlo?': 'Cuando al menos UNA condición debe cumplirse',
          },
          {
            Operador: 'not',
            Descripción: 'Invierte el valor de verdad',
            Ejemplo: 'not es_fin_de_semana',
            '¿Cuándo usarlo?': 'Cuando quieres negar o invertir una condición',
          },
        ],
      },
      exercises: [
        {
          id: 'ex-8-2',
          number: 'EJERCICIO 8.2',
          description:
            'Crea tres variables: <span class="inline-code">tiene_pasaporte = True</span>, <span class="inline-code">tiene_visa = True</span> y <span class="inline-code">tiene_boleto = False</span>.<br><br>Usa el operador <span class="inline-code">and</span> para verificar si tiene pasaporte Y visa, guarda el resultado en <span class="inline-code">documentos_completos</span>.<br><br>Imprime el resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateLogicalAnd,
        },
      ],
    },
    {
      icon: '🧠',
      title: 'Operadores lógicos en acción',
      content:
        'Veamos ejemplos prácticos de cómo usar <span class="inline-code">and</span>, <span class="inline-code">or</span> y <span class="inline-code">not</span>:',
      codeExample: {
        filename: 'operadores_logicos.py',
        code: `<span class="identifier">edad</span> = <span class="number">20</span>
<span class="identifier">tiene_licencia</span> = <span class="keyword">True</span>
<span class="identifier">es_fin_de_semana</span> = <span class="keyword">False</span>

<span class="comment"># AND - ambas condiciones deben ser verdaderas</span>
<span class="identifier">puede_conducir</span> = edad &gt;&#61; <span class="number">18</span> <span class="keyword">and</span> tiene_licencia
<span class="builtin">print</span>(puede_conducir)  <span class="output"># → True</span>

<span class="comment"># OR - al menos una condición debe ser verdadera</span>
<span class="identifier">puede_salir</span> = edad &gt;&#61; <span class="number">18</span> <span class="keyword">or</span> es_fin_de_semana
<span class="builtin">print</span>(puede_salir)     <span class="output"># → True</span>

<span class="comment"># NOT - invierte el valor</span>
<span class="identifier">es_dia_laboral</span> = <span class="keyword">not</span> es_fin_de_semana
<span class="builtin">print</span>(es_dia_laboral) <span class="output"># → True</span>`,
      },
      exercises: [
        {
          id: 'ex-8-3',
          number: 'EJERCICIO 8.3',
          description:
            'Crea dos variables: <span class="inline-code">es_fin_de_semana = False</span> y <span class="inline-code">es_feriado = True</span>.<br><br>Usa el operador <span class="inline-code">or</span> para verificar si es fin de semana O feriado, guarda el resultado en <span class="inline-code">puede_descansar</span>.<br><br>Imprime el resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateLogicalOr,
        },
      ],
    },
    {
      icon: '📋',
      title: 'Operadores de pertenencia: IN y NOT IN',
      content:
        'Los operadores <span class="inline-code">in</span> y <span class="inline-code">not in</span> permiten verificar si un elemento está presente (o ausente) en una secuencia como listas, strings o tuplas. Son muy útiles para validaciones.',
      table: {
        headers: ['Operador', 'Descripción', 'Ejemplo', '¿Cuándo usarlo?'],
        rows: [
          {
            Operador: 'in',
            Descripción: 'Verdadero si el elemento está en la secuencia',
            Ejemplo: '"a" in "hola"',
            '¿Cuándo usarlo?': 'Verificar si un elemento existe en una colección',
          },
          {
            Operador: 'not in',
            Descripción: 'Verdadero si el elemento NO está en la secuencia',
            Ejemplo: '5 not in [1, 2, 3]',
            '¿Cuándo usarlo?': 'Verificar que un elemento NO existe en una colección',
          },
        ],
      },
    },
    {
      icon: '🎯',
      title: 'Operadores IN y NOT IN en acción',
      content:
        'Veamos ejemplos prácticos de cómo usar <span class="inline-code">in</span> y <span class="inline-code">not in</span> con diferentes tipos de datos:',
      codeExample: {
        filename: 'operadores_in.py',
        code: `<span class="comment"># IN con strings</span>
<span class="identifier">texto</span> = <span class="string">"Python es genial"</span>
<span class="builtin">print</span>(<span class="string">"Python"</span> <span class="keyword">in</span> texto)      <span class="output"># → True</span>
<span class="builtin">print</span>(<span class="string">"Java"</span> <span class="keyword">in</span> texto)        <span class="output"># → False</span>

<span class="comment"># IN con listas</span>
<span class="identifier">frutas</span> = [<span class="string">"manzana"</span>, <span class="string">"pera"</span>, <span class="string">"uva"</span>]
<span class="builtin">print</span>(<span class="string">"pera"</span> <span class="keyword">in</span> frutas)       <span class="output"># → True</span>
<span class="builtin">print</span>(<span class="string">"banana"</span> <span class="keyword">in</span> frutas)    <span class="output"># → False</span>

<span class="comment"># NOT IN con listas</span>
<span class="identifier">numeros</span> = [<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>, <span class="number">4</span>, <span class="number">5</span>]
<span class="builtin">print</span>(<span class="number">10</span> <span class="keyword">not in</span> numeros)      <span class="output"># → True</span>
<span class="builtin">print</span>(<span class="number">3</span> <span class="keyword">not in</span> numeros)       <span class="output"># → False</span>

<span class="comment"># Uso práctico: validar usuario</span>
<span class="identifier">usuarios_permitidos</span> = [<span class="string">"admin"</span>, <span class="string">"user1"</span>, <span class="string">"user2"</span>]
<span class="identifier">usuario</span> = <span class="string">"admin"</span>

<span class="keyword">if</span> usuario <span class="keyword">in</span> usuarios_permitidos:
    <span class="builtin">print</span>(<span class="string">"Acceso permitido"</span>)

<span class="output"># → Acceso permitido</span>`,
      },
      exercises: [
        {
          id: 'ex-8-6',
          number: 'EJERCICIO 8.6',
          description:
            'Crea una lista <span class="inline-code">colores = ["rojo", "azul", "verde"]</span> y una variable <span class="inline-code">color_favorito = "azul"</span>.<br><br>Usa un <span class="inline-code">if</span> con el operador <span class="inline-code">in</span> para verificar si <span class="inline-code">color_favorito</span> está en la lista de colores. Si está, imprime "Color disponible".',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateInOperator,
        },
      ],
    },
    {
      icon: '🔀',
      title: 'La estructura IF',
      content:
        'La estructura <span class="inline-code">if</span> ejecuta un bloque de código <strong>solo si</strong> la condición es verdadera. Es importante notar la <strong>indentación</strong> (espacios al inicio): todo el código indentado después del <span class="inline-code">if</span> se ejecuta solo si la condición es <span class="inline-code">True</span>.',
      codeExample: {
        filename: 'estructura_if.py',
        code: `<span class="identifier">temperatura</span> = <span class="number">30</span>

<span class="comment"># Sintaxis del IF</span>
<span class="keyword">if</span> temperatura &gt; <span class="number">25</span>:
    <span class="builtin">print</span>(<span class="string">"Hace calor"</span>)
    <span class="builtin">print</span>(<span class="string">"Lleva ropa ligera"</span>)

<span class="builtin">print</span>(<span class="string">"Este mensaje siempre se muestra"</span>)

<span class="output"># → Hace calor</span>
<span class="output"># → Lleva ropa ligera</span>
<span class="output"># → Este mensaje siempre se muestra</span>`,
      },
      exercises: [
        {
          id: 'ex-8-4',
          number: 'EJERCICIO 8.4',
          description:
            'Crea una variable <span class="inline-code">nota = 85</span>.<br><br>Usa un <span class="inline-code">if</span> para verificar si la nota es mayor o igual a 70. Si es así, imprime "Aprobado".',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateSimpleIf,
        },
      ],
    },
    {
      icon: '✨',
      title: 'IF con múltiples condiciones',
      content:
        'Podemos combinar operadores de comparación con operadores lógicos dentro de un <span class="inline-code">if</span> para crear condiciones más complejas.',
      codeExample: {
        filename: 'if_complejo.py',
        code: `<span class="identifier">edad</span> = <span class="number">25</span>
<span class="identifier">ciudad</span> = <span class="string">"Quito"</span>
<span class="identifier">saldo</span> = <span class="number">150</span>

<span class="comment"># Múltiples condiciones con AND</span>
<span class="keyword">if</span> edad &gt;&#61; <span class="number">18</span> <span class="keyword">and</span> saldo &gt;&#61; <span class="number">100</span>:
    <span class="builtin">print</span>(<span class="string">"Puedes realizar la compra"</span>)

<span class="comment"># Múltiples condiciones con OR</span>
<span class="keyword">if</span> ciudad == <span class="string">"Quito"</span> <span class="keyword">or</span> ciudad == <span class="string">"Guayaquil"</span>:
    <span class="builtin">print</span>(<span class="string">"Envío disponible"</span>)

<span class="output"># → Puedes realizar la compra</span>
<span class="output"># → Envío disponible</span>`,
      },
      exercises: [
        {
          id: 'ex-8-5',
          number: 'EJERCICIO 8.5',
          description:
            'Crea tres variables: <span class="inline-code">edad = 20</span>, <span class="inline-code">tiene_entrada = True</span> y <span class="inline-code">aforo_disponible = True</span>.<br><br>Usa un <span class="inline-code">if</span> con múltiples condiciones para verificar si la persona puede entrar al evento (edad &gt;&#61; 18 AND tiene_entrada AND aforo_disponible). Si puede entrar, imprime "Bienvenido al evento".',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateIfWithCondition,
        },
      ],
    },
  ],
  tipBox: {
    icon: '💡',
    content:
      '⚠️ <strong>Importante:</strong> En Python, la indentación (espacios al inicio de la línea) no es opcional. Define qué código pertenece al <span class="inline-code">if</span>. Usa siempre 4 espacios o 1 tabulación.',
  },
  exercises: [],
};
