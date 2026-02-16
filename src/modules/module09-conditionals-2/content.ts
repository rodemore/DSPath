import type { Section } from '../../types';
import {
  validateIfElse,
  validateIfElseAge,
  validateIfElifElse,
  validateIfElifElseGrade,
  validateComplexConditions,
} from './validators';

export const module09: Section = {
  id: 8,
  moduleNumber: 'Módulo 09',
  title: 'Condicionales 2:',
  titleHighlight: 'IF-ELSE e IF-ELIF-ELSE',
  theoryBlocks: [
    {
      icon: '🔀',
      title: 'La estructura IF-ELSE',
      content: 'Con <span class="inline-code">if</span> solo, el código se ejecuta si la condición es verdadera. Con <span class="inline-code">else</span> podemos especificar qué hacer cuando la condición es <strong>falsa</strong>. Es como decir: "si se cumple esto, haz A, de lo contrario, haz B".',
      codeExample: {
        filename: 'if_else.py',
        code: `<span class="identifier">edad</span> = <span class="number">15</span>

<span class="keyword">if</span> edad &gt;&#61; <span class="number">18</span>:
    <span class="builtin">print</span>(<span class="string">"Eres mayor de edad"</span>)
<span class="keyword">else</span>:
    <span class="builtin">print</span>(<span class="string">"Eres menor de edad"</span>)

<span class="output"># → Eres menor de edad</span>`,
      },
      exercises: [
        {
          id: 'ex-9-1',
          number: 'EJERCICIO 9.1',
          description: 'Crea una variable <span class="inline-code">temperatura = 30</span>.<br><br>Usa <span class="inline-code">if-else</span> para verificar si la temperatura es mayor a 25. Si es así, imprime "Hace calor", de lo contrario imprime "Clima agradable".',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateIfElse,
        },
      ],
    },
    {
      icon: '💡',
      title: 'IF-ELSE en acción',
      content: 'Veamos más ejemplos prácticos de cómo usar <span class="inline-code">if-else</span> en situaciones reales:',
      codeExample: {
        filename: 'ejemplos_if_else.py',
        code: `<span class="identifier">temperatura</span> = <span class="number">18</span>

<span class="keyword">if</span> temperatura > <span class="number">25</span>:
    <span class="builtin">print</span>(<span class="string">"Hace calor"</span>)
<span class="keyword">else</span>:
    <span class="builtin">print</span>(<span class="string">"No hace calor"</span>)

<span class="output"># → No hace calor</span>

<span class="identifier">saldo</span> = <span class="number">50</span>
<span class="identifier">precio</span> = <span class="number">30</span>

<span class="keyword">if</span> saldo &gt;&#61; precio:
    <span class="builtin">print</span>(<span class="string">"Compra aprobada"</span>)
<span class="keyword">else</span>:
    <span class="builtin">print</span>(<span class="string">"Saldo insuficiente"</span>)

<span class="output"># → Compra aprobada</span>`,
      },
      exercises: [
        {
          id: 'ex-9-2',
          number: 'EJERCICIO 9.2',
          description: 'Crea una variable <span class="inline-code">edad = 16</span>.<br><br>Usa <span class="inline-code">if-else</span> para verificar si la edad es mayor o igual a 18. Si es así, imprime "Puedes votar", de lo contrario imprime "No puedes votar aún".',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateIfElseAge,
        },
      ],
    },
    {
      icon: '🎯',
      title: 'La estructura IF-ELIF-ELSE',
      content: '<span class="inline-code">elif</span> (abreviatura de "else if") permite evaluar <strong>múltiples condiciones</strong> en secuencia. Python evalúa cada condición en orden y ejecuta el primer bloque cuya condición sea verdadera.',
      codeExample: {
        filename: 'if_elif_else.py',
        code: `<span class="identifier">nota</span> = <span class="number">75</span>

<span class="keyword">if</span> nota &gt;&#61; <span class="number">90</span>:
    <span class="builtin">print</span>(<span class="string">"Excelente"</span>)
<span class="keyword">elif</span> nota &gt;&#61; <span class="number">70</span>:
    <span class="builtin">print</span>(<span class="string">"Bueno"</span>)
<span class="keyword">elif</span> nota &gt;&#61; <span class="number">60</span>:
    <span class="builtin">print</span>(<span class="string">"Regular"</span>)
<span class="keyword">else</span>:
    <span class="builtin">print</span>(<span class="string">"Reprobado"</span>)

<span class="output"># → Bueno</span>`,
      },
      exercises: [
        {
          id: 'ex-9-3',
          number: 'EJERCICIO 9.3',
          description: 'Crea una variable <span class="inline-code">hora = 14</span>.<br><br>Usa <span class="inline-code">if-elif-else</span> para imprimir un saludo según la hora:<br>- Si hora &lt; 12: "Buenos días"<br>- Si hora &lt; 18: "Buenas tardes"<br>- De lo contrario: "Buenas noches"',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateIfElifElse,
        },
      ],
    },
    {
      icon: '📊',
      title: 'Orden de evaluación en IF-ELIF-ELSE',
      content: 'Es importante entender que Python evalúa las condiciones <strong>de arriba hacia abajo</strong> y se detiene en la primera que sea verdadera. Las condiciones posteriores no se evalúan.',
      codeExample: {
        filename: 'orden_evaluacion.py',
        code: `<span class="identifier">edad</span> = <span class="number">25</span>

<span class="comment"># Orden correcto: de más específico a menos específico</span>
<span class="keyword">if</span> edad &gt;&#61; <span class="number">65</span>:
    <span class="builtin">print</span>(<span class="string">"Senior"</span>)
<span class="keyword">elif</span> edad &gt;&#61; <span class="number">18</span>:
    <span class="builtin">print</span>(<span class="string">"Adulto"</span>)
<span class="keyword">elif</span> edad &gt;&#61; <span class="number">13</span>:
    <span class="builtin">print</span>(<span class="string">"Adolescente"</span>)
<span class="keyword">else</span>:
    <span class="builtin">print</span>(<span class="string">"Niño"</span>)

<span class="output"># → Adulto</span>
<span class="comment"># Se detiene aquí, no evalúa las siguientes</span>`,
      },
      exercises: [
        {
          id: 'ex-9-4',
          number: 'EJERCICIO 9.4',
          description: 'Crea una variable <span class="inline-code">nota = 78</span>.<br><br>Usa <span class="inline-code">if-elif-else</span> para clasificar la nota:<br>- Si nota &gt;&#61; 90: "Excelente"<br>- Si nota &gt;&#61; 80: "Muy bueno"<br>- Si nota &gt;&#61; 70: "Bueno"<br>- Si nota &gt;&#61; 60: "Aprobado"<br>- De lo contrario: "Reprobado"',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateIfElifElseGrade,
        },
      ],
    },
    {
      icon: '🎮',
      title: 'Ejemplo completo: Sistema de calificaciones',
      content: 'Veamos un ejemplo más completo que combina todo lo aprendido:',
      codeExample: {
        filename: 'sistema_calificaciones.py',
        code: `<span class="identifier">nombre</span> = <span class="string">"Ana"</span>
<span class="identifier">nota</span> = <span class="number">85</span>
<span class="identifier">asistencia</span> = <span class="number">90</span>

<span class="builtin">print</span>(<span class="string">f"Estudiante: {nombre}"</span>)

<span class="keyword">if</span> asistencia < <span class="number">75</span>:
    <span class="builtin">print</span>(<span class="string">"Reprobado por inasistencias"</span>)
<span class="keyword">elif</span> nota &gt;&#61; <span class="number">90</span>:
    <span class="builtin">print</span>(<span class="string">"Calificación: A - Excelente"</span>)
<span class="keyword">elif</span> nota &gt;&#61; <span class="number">80</span>:
    <span class="builtin">print</span>(<span class="string">"Calificación: B - Muy bueno"</span>)
<span class="keyword">elif</span> nota &gt;&#61; <span class="number">70</span>:
    <span class="builtin">print</span>(<span class="string">"Calificación: C - Bueno"</span>)
<span class="keyword">elif</span> nota &gt;&#61; <span class="number">60</span>:
    <span class="builtin">print</span>(<span class="string">"Calificación: D - Aprobado"</span>)
<span class="keyword">else</span>:
    <span class="builtin">print</span>(<span class="string">"Calificación: F - Reprobado"</span>)

<span class="output"># → Estudiante: Ana</span>
<span class="output"># → Calificación: B - Muy bueno</span>`,
      },
    },
    {
      icon: '🔧',
      title: 'Condiciones anidadas',
      content: 'Puedes colocar estructuras <span class="inline-code">if</span> dentro de otras estructuras <span class="inline-code">if</span>. Esto se llama <strong>anidamiento</strong>. Es útil para condiciones más complejas.',
      codeExample: {
        filename: 'anidadas.py',
        code: `<span class="identifier">edad</span> = <span class="number">20</span>
<span class="identifier">tiene_licencia</span> = <span class="keyword">True</span>

<span class="keyword">if</span> edad &gt;&#61; <span class="number">18</span>:
    <span class="builtin">print</span>(<span class="string">"Eres mayor de edad"</span>)
    <span class="keyword">if</span> tiene_licencia:
        <span class="builtin">print</span>(<span class="string">"Puedes conducir"</span>)
    <span class="keyword">else</span>:
        <span class="builtin">print</span>(<span class="string">"Necesitas obtener tu licencia"</span>)
<span class="keyword">else</span>:
    <span class="builtin">print</span>(<span class="string">"Eres menor de edad, no puedes conducir"</span>)

<span class="output"># → Eres mayor de edad</span>
<span class="output"># → Puedes conducir</span>`,
      },
      exercises: [
        {
          id: 'ex-9-5',
          number: 'EJERCICIO 9.5',
          description: 'Crea tres variables: <span class="inline-code">edad = 25</span>, <span class="inline-code">es_estudiante = True</span> y <span class="inline-code">tiene_descuento = False</span>.<br><br>Usa <span class="inline-code">if-elif-else</span> para determinar el precio del boleto:<br>- Si edad &lt; 18 OR es_estudiante: imprime "Precio: $5"<br>- Si edad &gt;&#61; 65: imprime "Precio: $7"<br>- De lo contrario: imprime "Precio: $10"',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateComplexConditions,
        },
      ],
    },
  ],
  tipBox: {
    icon: '⚠️',
    content: '<strong>Importante:</strong> Recuerda que <span class="inline-code">elif</span> y <span class="inline-code">else</span> solo funcionan después de un <span class="inline-code">if</span>. No pueden existir solos. Además, <span class="inline-code">else</span> siempre debe ir al final.',
  },
  exercises: [],
};
