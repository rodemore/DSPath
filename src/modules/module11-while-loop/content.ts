import type { Section } from '../../types';
import {
  validateWhileBasic,
  validateWhileCounter,
  validateWhileSum,
  validateWhileBreak,
} from './validators';

export const module11: Section = {
  id: 10,
  moduleNumber: 'Módulo 11',
  title: 'Bucle WHILE:',
  titleHighlight: 'Repetición Condicional',
  theoryBlocks: [
    {
      icon: '🔄',
      title: '¿Qué es un bucle WHILE?',
      content: 'El bucle <span class="inline-code">while</span> ejecuta un bloque de código <strong>mientras</strong> una condición sea verdadera. A diferencia de <span class="inline-code">for</span> que itera sobre una secuencia, <span class="inline-code">while</span> se repite basándose en una condición.',
      codeExample: {
        filename: 'while_basico.py',
        code: `<span class="identifier">contador</span> = <span class="number">1</span>

<span class="keyword">while</span> contador &lt;&#61; <span class="number">3</span>:
    <span class="builtin">print</span>(<span class="string">f"Contador: {contador}"</span>)
    contador = contador + <span class="number">1</span>

<span class="builtin">print</span>(<span class="string">"Fin del bucle"</span>)

<span class="output"># → Contador: 1</span>
<span class="output"># → Contador: 2</span>
<span class="output"># → Contador: 3</span>
<span class="output"># → Fin del bucle</span>`,
      },
      exercises: [
        {
          id: 'ex-11-1',
          number: 'EJERCICIO 11.1',
          description: 'Crea una variable <span class="inline-code">contador = 1</span>.<br><br>Usa un bucle <span class="inline-code">while</span> para imprimir los números del 1 al 5. Recuerda incrementar el contador dentro del bucle.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateWhileBasic,
        },
      ],
    },
    {
      icon: '⚠️',
      title: 'FOR vs WHILE: ¿Cuándo usar cada uno?',
      content: 'Usa <span class="inline-code">for</span> cuando sabes <strong>cuántas veces</strong> quieres repetir algo o cuando iteras sobre una colección. Usa <span class="inline-code">while</span> cuando quieres repetir <strong>hasta que se cumpla una condición</strong> y no sabes de antemano cuántas iteraciones serán.',
      codeExample: {
        filename: 'for_vs_while.py',
        code: `<span class="comment"># FOR: sabemos exactamente 5 iteraciones</span>
<span class="keyword">for</span> i <span class="keyword">in</span> <span class="builtin">range</span>(<span class="number">5</span>):
    <span class="builtin">print</span>(i)

<span class="comment"># WHILE: repetir hasta que se cumpla algo</span>
<span class="identifier">numero</span> = <span class="number">1</span>
<span class="keyword">while</span> numero < <span class="number">100</span>:
    numero = numero * <span class="number">2</span>
    <span class="builtin">print</span>(numero)

<span class="output"># → 2</span>
<span class="output"># → 4</span>
<span class="output"># → 8</span>
<span class="output"># → 16</span>
<span class="output"># → 32</span>
<span class="output"># → 64</span>
<span class="output"># → 128</span>`,
      },
      exercises: [
        {
          id: 'ex-11-2',
          number: 'EJERCICIO 11.2',
          description: 'Crea una variable <span class="inline-code">numero = 10</span>.<br><br>Usa un bucle <span class="inline-code">while</span> para imprimir números descendentes del 10 al 1. Disminuye el número en 1 en cada iteración.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateWhileCounter,
        },
      ],
    },
    {
      icon: '⚙️',
      title: 'Estructura del WHILE',
      content: 'Es <strong>crucial</strong> que la condición eventualmente se vuelva falsa, de lo contrario el bucle será infinito. Siempre debes actualizar la variable de control dentro del bucle.',
      codeExample: {
        filename: 'estructura_while.py',
        code: `<span class="comment"># ✓ CORRECTO: la condición eventualmente se vuelve falsa</span>
<span class="identifier">x</span> = <span class="number">0</span>
<span class="keyword">while</span> x < <span class="number">3</span>:
    <span class="builtin">print</span>(x)
    x = x + <span class="number">1</span>  <span class="comment"># Actualizamos x</span>

<span class="output"># → 0</span>
<span class="output"># → 1</span>
<span class="output"># → 2</span>

<span class="comment"># ✗ INCORRECTO: bucle infinito (¡no hagas esto!)</span>
<span class="comment"># x = 0</span>
<span class="comment"># while x < 3:</span>
<span class="comment">#     print(x)</span>
<span class="comment">#     # ¡Olvidamos actualizar x! Bucle infinito</span>`,
      },
      exercises: [
        {
          id: 'ex-11-3',
          number: 'EJERCICIO 11.3',
          description: 'Crea dos variables: <span class="inline-code">suma = 0</span> y <span class="inline-code">numero = 1</span>.<br><br>Usa un bucle <span class="inline-code">while</span> para sumar los números del 1 al 10. En cada iteración, suma el número actual a la variable suma e incrementa numero. Al final (fuera del bucle), imprime la suma total.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateWhileSum,
        },
      ],
    },
    {
      icon: '🛑',
      title: 'BREAK: Salir del bucle',
      content: 'La palabra clave <span class="inline-code">break</span> permite <strong>salir inmediatamente</strong> de un bucle, sin importar si la condición aún es verdadera. Es muy útil cuando encontramos lo que buscamos y no necesitamos seguir iterando.',
      codeExample: {
        filename: 'break.py',
        code: `<span class="identifier">numero</span> = <span class="number">1</span>

<span class="keyword">while</span> <span class="keyword">True</span>:  <span class="comment"># Bucle "infinito"</span>
    <span class="builtin">print</span>(numero)
    <span class="keyword">if</span> numero &gt;&#61; <span class="number">5</span>:
        <span class="builtin">print</span>(<span class="string">"Alcanzamos el límite, saliendo..."</span>)
        <span class="keyword">break</span>  <span class="comment"># Sale del bucle</span>
    numero = numero + <span class="number">1</span>

<span class="builtin">print</span>(<span class="string">"Fuera del bucle"</span>)

<span class="output"># → 1</span>
<span class="output"># → 2</span>
<span class="output"># → 3</span>
<span class="output"># → 4</span>
<span class="output"># → 5</span>
<span class="output"># → Alcanzamos el límite, saliendo...</span>
<span class="output"># → Fuera del bucle</span>`,
      },
      exercises: [
        {
          id: 'ex-11-4',
          number: 'EJERCICIO 11.4',
          description: 'Crea una variable <span class="inline-code">numero = 1</span>.<br><br>Usa un bucle <span class="inline-code">while True</span> (bucle infinito) para imprimir los números. Usa <span class="inline-code">if</span> con <span class="inline-code">break</span> para salir del bucle cuando el número sea mayor a 5. No olvides incrementar el número.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateWhileBreak,
        },
      ],
    },
    {
      icon: '⏭️',
      title: 'CONTINUE: Saltar a la siguiente iteración',
      content: 'La palabra clave <span class="inline-code">continue</span> salta el resto del código en la iteración actual y pasa directamente a la siguiente.',
      codeExample: {
        filename: 'continue.py',
        code: `<span class="identifier">numero</span> = <span class="number">0</span>

<span class="keyword">while</span> numero < <span class="number">5</span>:
    numero = numero + <span class="number">1</span>

    <span class="keyword">if</span> numero == <span class="number">3</span>:
        <span class="builtin">print</span>(<span class="string">"Saltando el 3"</span>)
        <span class="keyword">continue</span>  <span class="comment"># Salta a la siguiente iteración</span>

    <span class="builtin">print</span>(<span class="string">f"Número: {numero}"</span>)

<span class="output"># → Número: 1</span>
<span class="output"># → Número: 2</span>
<span class="output"># → Saltando el 3</span>
<span class="output"># → Número: 4</span>
<span class="output"># → Número: 5</span>`,
      },
    },
    {
      icon: '🎮',
      title: 'Ejemplo práctico: Juego de adivinanza',
      content: 'Veamos un ejemplo real donde <span class="inline-code">while</span> es ideal: un juego que se repite hasta que el usuario adivine el número correcto.',
      codeExample: {
        filename: 'juego_adivinanza.py',
        code: `<span class="identifier">numero_secreto</span> = <span class="number">7</span>
<span class="identifier">intentos</span> = <span class="number">0</span>
<span class="identifier">adivinado</span> = <span class="keyword">False</span>

<span class="builtin">print</span>(<span class="string">"¡Adivina el número entre 1 y 10!"</span>)

<span class="keyword">while</span> <span class="keyword">not</span> adivinado:
    intentos = intentos + <span class="number">1</span>
    <span class="identifier">intento</span> = <span class="number">5</span>  <span class="comment"># En un juego real, usaríamos input()</span>

    <span class="keyword">if</span> intento == numero_secreto:
        <span class="builtin">print</span>(<span class="string">f"¡Correcto! Lo lograste en {intentos} intentos"</span>)
        adivinado = <span class="keyword">True</span>
    <span class="keyword">elif</span> intento < numero_secreto:
        <span class="builtin">print</span>(<span class="string">"Muy bajo, intenta de nuevo"</span>)
    <span class="keyword">else</span>:
        <span class="builtin">print</span>(<span class="string">"Muy alto, intenta de nuevo"</span>)

<span class="output"># → Muy bajo, intenta de nuevo</span>
<span class="output"># (el bucle continúa...)</span>`,
      },
    },
  ],
  tipBox: {
    icon: '⚠️',
    content: '<strong>Cuidado con los bucles infinitos:</strong> Asegúrate siempre de que la condición del <span class="inline-code">while</span> eventualmente se vuelva falsa, o usa <span class="inline-code">break</span> para salir. Un bucle infinito puede hacer que tu programa se congele.',
  },
  exercises: [],
};
