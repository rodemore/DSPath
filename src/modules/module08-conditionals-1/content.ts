import type { Section } from '../../types';
import {
  validateComparison,
  validateLogicalAnd,
  validateLogicalOr,
  validateSimpleIf,
  validateIfWithCondition,
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
      content: 'En programación, constantemente necesitamos tomar decisiones: ¿el usuario es mayor de edad? ¿la contraseña es correcta? ¿hay stock disponible? Las <strong>estructuras condicionales</strong> permiten que nuestro código tome diferentes caminos según las condiciones que evaluemos.',
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
      content: 'Los operadores de comparación nos permiten comparar valores. El resultado de una comparación siempre es un valor booleano: <span class="inline-code">True</span> (verdadero) o <span class="inline-code">False</span> (falso).',
      table: {
        headers: ['Operador', 'Significado', 'Ejemplo', 'Resultado'],
        rows: [
          { Operador: '==', Significado: 'Igual a', Ejemplo: '5 == 5', Resultado: 'True' },
          { Operador: '!=', Significado: 'Diferente de', Ejemplo: '5 != 3', Resultado: 'True' },
          { Operador: '>', Significado: 'Mayor que', Ejemplo: '8 > 5', Resultado: 'True' },
          { Operador: '<', Significado: 'Menor que', Ejemplo: '3 < 7', Resultado: 'True' },
          { Operador: '>=', Significado: 'Mayor o igual que', Ejemplo: '5 >= 5', Resultado: 'True' },
          { Operador: '<=', Significado: 'Menor o igual que', Ejemplo: '4 <= 9', Resultado: 'True' },
        ],
      },
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
      content: 'Los operadores lógicos nos permiten combinar múltiples condiciones para crear expresiones más complejas.',
      table: {
        headers: ['Operador', 'Descripción', 'Ejemplo', 'Resultado'],
        rows: [
          { Operador: 'and', Descripción: 'Verdadero si AMBAS condiciones son verdaderas', Ejemplo: 'True and True', Resultado: 'True' },
          { Operador: 'and', Descripción: 'Falso si al menos una es falsa', Ejemplo: 'True and False', Resultado: 'False' },
          { Operador: 'or', Descripción: 'Verdadero si AL MENOS UNA condición es verdadera', Ejemplo: 'True or False', Resultado: 'True' },
          { Operador: 'or', Descripción: 'Falso solo si AMBAS son falsas', Ejemplo: 'False or False', Resultado: 'False' },
          { Operador: 'not', Descripción: 'Invierte el valor de verdad', Ejemplo: 'not True', Resultado: 'False' },
          { Operador: 'not', Descripción: 'Invierte el valor de verdad', Ejemplo: 'not False', Resultado: 'True' },
        ],
      },
    },
    {
      icon: '🧠',
      title: 'Operadores lógicos en acción',
      content: 'Veamos ejemplos prácticos de cómo usar <span class="inline-code">and</span>, <span class="inline-code">or</span> y <span class="inline-code">not</span>:',
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
    },
    {
      icon: '🔀',
      title: 'La estructura IF',
      content: 'La estructura <span class="inline-code">if</span> ejecuta un bloque de código <strong>solo si</strong> la condición es verdadera. Es importante notar la <strong>indentación</strong> (espacios al inicio): todo el código indentado después del <span class="inline-code">if</span> se ejecuta solo si la condición es <span class="inline-code">True</span>.',
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
    },
    {
      icon: '✨',
      title: 'IF con múltiples condiciones',
      content: 'Podemos combinar operadores de comparación con operadores lógicos dentro de un <span class="inline-code">if</span> para crear condiciones más complejas.',
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
    },
  ],
  tipBox: {
    icon: '💡',
    content: '⚠️ <strong>Importante:</strong> En Python, la indentación (espacios al inicio de la línea) no es opcional. Define qué código pertenece al <span class="inline-code">if</span>. Usa siempre 4 espacios o 1 tabulación.',
  },
  exercises: [
    {
      id: 'ex-8-1',
      number: 'EJERCICIO 8.1',
      description: 'Crea dos variables: <span class="inline-code">edad = 22</span> y <span class="inline-code">precio = 50</span>.<br><br>Usa operadores de comparación para verificar si la edad es mayor o igual a 18 y guarda el resultado en una variable <span class="inline-code">es_mayor</span>. Verifica si el precio es menor que 100 y guarda el resultado en <span class="inline-code">es_barato</span>.<br><br>Imprime ambos resultados.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateComparison,
    },
    {
      id: 'ex-8-2',
      number: 'EJERCICIO 8.2',
      description: 'Crea tres variables: <span class="inline-code">tiene_pasaporte = True</span>, <span class="inline-code">tiene_visa = True</span> y <span class="inline-code">tiene_boleto = False</span>.<br><br>Usa el operador <span class="inline-code">and</span> para verificar si tiene pasaporte Y visa, guarda el resultado en <span class="inline-code">documentos_completos</span>.<br><br>Imprime el resultado.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateLogicalAnd,
    },
    {
      id: 'ex-8-3',
      number: 'EJERCICIO 8.3',
      description: 'Crea dos variables: <span class="inline-code">es_fin_de_semana = False</span> y <span class="inline-code">es_feriado = True</span>.<br><br>Usa el operador <span class="inline-code">or</span> para verificar si es fin de semana O feriado, guarda el resultado en <span class="inline-code">puede_descansar</span>.<br><br>Imprime el resultado.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateLogicalOr,
    },
    {
      id: 'ex-8-4',
      number: 'EJERCICIO 8.4',
      description: 'Crea una variable <span class="inline-code">nota = 85</span>.<br><br>Usa un <span class="inline-code">if</span> para verificar si la nota es mayor o igual a 70. Si es así, imprime "Aprobado".',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateSimpleIf,
    },
    {
      id: 'ex-8-5',
      number: 'EJERCICIO 8.5',
      description: 'Crea tres variables: <span class="inline-code">edad = 20</span>, <span class="inline-code">tiene_entrada = True</span> y <span class="inline-code">aforo_disponible = True</span>.<br><br>Usa un <span class="inline-code">if</span> con múltiples condiciones para verificar si la persona puede entrar al evento (edad &gt;&#61; 18 AND tiene_entrada AND aforo_disponible). Si puede entrar, imprime "Bienvenido al evento".',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateIfWithCondition,
    },
  ],
};
