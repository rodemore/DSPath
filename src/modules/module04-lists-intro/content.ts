import type { Section } from '../../types';
import {
  validateCreateListAndAccess,
  validateListSlicing,
} from './validators';

export const module04: Section = {
  id: 3,
  moduleNumber: 'Módulo 04',
  title: 'Listas 1',
  titleHighlight: 'Fundamentos',
  theoryBlocks: [
    {
      icon: '📋',
      title: '¿Qué es una lista?',
      content: 'Una lista es una <strong>colección ordenada</strong> de elementos que puede contener diferentes tipos de datos. Se crean usando corchetes <span class="inline-code">[]</span> y los elementos se separan por comas.',
      codeExample: {
        filename: 'listas.py',
        code: `<span class="comment"># Crear listas</span>
<span class="identifier">frutas</span> = [<span class="string">"manzana"</span>, <span class="string">"banana"</span>, <span class="string">"naranja"</span>]
<span class="identifier">numeros</span> = [<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>, <span class="number">4</span>, <span class="number">5</span>]
<span class="identifier">mixta</span> = [<span class="string">"Python"</span>, <span class="number">3.11</span>, <span class="keyword">True</span>, <span class="number">42</span>]

<span class="builtin">print</span>(frutas)     <span class="output"># → ['manzana', 'banana', 'naranja']</span>
<span class="builtin">print</span>(<span class="builtin">len</span>(frutas))  <span class="output"># → 3 (longitud de la lista)</span>`,
      },
    },
    {
      icon: '🔢',
      title: 'Acceder a elementos: Indexación',
      content: 'Al igual que con strings, puedes acceder a elementos de una lista usando índices. Los índices empiezan en 0 y puedes usar índices negativos para acceder desde el final.',
      codeExample: {
        filename: 'indexacion.py',
        code: `<span class="identifier">colores</span> = [<span class="string">"rojo"</span>, <span class="string">"verde"</span>, <span class="string">"azul"</span>, <span class="string">"amarillo"</span>]

<span class="comment"># Índices positivos</span>
<span class="builtin">print</span>(colores[<span class="number">0</span>])     <span class="output"># → rojo (primer elemento)</span>
<span class="builtin">print</span>(colores[<span class="number">2</span>])     <span class="output"># → azul</span>

<span class="comment"># Índices negativos</span>
<span class="builtin">print</span>(colores[-<span class="number">1</span>])    <span class="output"># → amarillo (último elemento)</span>
<span class="builtin">print</span>(colores[-<span class="number">2</span>])    <span class="output"># → azul</span>`,
      },
    },
    {
      icon: '✂️',
      title: 'Obtener porciones: Slicing',
      content: 'El slicing permite extraer una porción de la lista usando la sintaxis <span class="inline-code">[inicio:fin]</span>. Funciona igual que con strings.',
      codeExample: {
        filename: 'slicing.py',
        code: `<span class="identifier">numeros</span> = [<span class="number">10</span>, <span class="number">20</span>, <span class="number">30</span>, <span class="number">40</span>, <span class="number">50</span>, <span class="number">60</span>]

<span class="builtin">print</span>(numeros[<span class="number">1</span>:<span class="number">4</span>])    <span class="output"># → [20, 30, 40]</span>
<span class="builtin">print</span>(numeros[:<span class="number">3</span>])     <span class="output"># → [10, 20, 30] (primeros 3)</span>
<span class="builtin">print</span>(numeros[<span class="number">3</span>:])     <span class="output"># → [40, 50, 60] (desde el 3 al final)</span>
<span class="builtin">print</span>(numeros[-<span class="number">2</span>:])    <span class="output"># → [50, 60] (últimos 2)</span>`,
      },
    },
    {
      icon: '🔄',
      title: 'Modificar elementos',
      content: 'A diferencia de los strings, las listas son <strong>mutables</strong>, lo que significa que puedes cambiar sus elementos después de crearlas.',
      codeExample: {
        filename: 'modificar.py',
        code: `<span class="identifier">animales</span> = [<span class="string">"perro"</span>, <span class="string">"gato"</span>, <span class="string">"pez"</span>]

<span class="comment"># Cambiar un elemento</span>
<span class="identifier">animales</span>[<span class="number">1</span>] = <span class="string">"conejo"</span>
<span class="builtin">print</span>(animales)  <span class="output"># → ['perro', 'conejo', 'pez']</span>

<span class="comment"># Cambiar varios elementos con slicing</span>
<span class="identifier">animales</span>[<span class="number">0</span>:<span class="number">2</span>] = [<span class="string">"león"</span>, <span class="string">"tigre"</span>]
<span class="builtin">print</span>(animales)  <span class="output"># → ['león', 'tigre', 'pez']</span>`,
      },
    },
  ],
  tipBox: {
    icon: '💡',
    content: 'Las listas son <strong>mutables</strong> (se pueden modificar) mientras que los strings son <strong>inmutables</strong> (no se pueden modificar). Esta es una diferencia clave entre ambos tipos.',
  },
  exercises: [
    {
      id: 'ex-4-1',
      number: 'EJERCICIO 4.1',
      description: 'Crea una lista llamada <span class="inline-code">frutas</span> con al menos 4 frutas. Imprime el primer elemento y el último elemento usando índices.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateCreateListAndAccess,
    },
    {
      id: 'ex-4-2',
      number: 'EJERCICIO 4.2',
      description: 'Crea una lista llamada <span class="inline-code">numeros</span> con los números del 1 al 10. Usa slicing para obtener e imprimir los números del 3 al 7.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateListSlicing,
    },
  ],
};
