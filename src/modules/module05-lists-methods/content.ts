import type { Section } from '../../types';
import {
  validateAppendMethod,
  validateExtendMethod,
  validateInsertAndPop,
  validateIndexAndCount,
  validateSumAndLen,
  validateSortList,
} from './validators';

export const module05: Section = {
  id: 4,
  moduleNumber: 'Módulo 05',
  title: 'Listas 2',
  titleHighlight: 'Métodos',
  theoryBlocks: [
    {
      icon: '➕',
      title: 'Agregar y eliminar elementos',
      content: 'Python ofrece varios métodos para modificar listas: agregar elementos con <span class="inline-code">append()</span>, <span class="inline-code">extend()</span> e <span class="inline-code">insert()</span>, y eliminarlos con <span class="inline-code">remove()</span> y <span class="inline-code">pop()</span>.',
      codeExample: {
        filename: 'modificar_listas.py',
        code: `<span class="identifier">numeros</span> = [<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>]

<span class="comment"># append() - agrega un elemento al final</span>
<span class="identifier">numeros</span>.<span class="function">append</span>(<span class="number">4</span>)
<span class="builtin">print</span>(numeros)  <span class="output"># → [1, 2, 3, 4]</span>

<span class="comment"># extend() - agrega múltiples elementos</span>
<span class="identifier">numeros</span>.<span class="function">extend</span>([<span class="number">5</span>, <span class="number">6</span>])
<span class="builtin">print</span>(numeros)  <span class="output"># → [1, 2, 3, 4, 5, 6]</span>

<span class="comment"># insert() - inserta en una posición específica</span>
<span class="identifier">numeros</span>.<span class="function">insert</span>(<span class="number">0</span>, <span class="number">0</span>)  <span class="comment"># inserta 0 en posición 0</span>
<span class="builtin">print</span>(numeros)  <span class="output"># → [0, 1, 2, 3, 4, 5, 6]</span>

<span class="comment"># pop() - elimina y retorna el último elemento</span>
<span class="identifier">ultimo</span> = <span class="identifier">numeros</span>.<span class="function">pop</span>()
<span class="builtin">print</span>(ultimo)   <span class="output"># → 6</span>
<span class="builtin">print</span>(numeros)  <span class="output"># → [0, 1, 2, 3, 4, 5]</span>

<span class="comment"># remove() - elimina la primera aparición del valor</span>
<span class="identifier">numeros</span>.<span class="function">remove</span>(<span class="number">0</span>)
<span class="builtin">print</span>(numeros)  <span class="output"># → [1, 2, 3, 4, 5]</span>`,
      },
      exercises: [
        {
          id: 'ex-5-1',
          number: 'EJERCICIO 5.1',
          description: 'Crea una lista vacía llamada <span class="inline-code">colores</span>.<br><br>Usa <span class="inline-code">.append()</span> para agregar 3 colores.<br><br>Imprime la lista resultante.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateAppendMethod,
        },
        {
          id: 'ex-5-2',
          number: 'EJERCICIO 5.2',
          description: 'Crea una lista <span class="inline-code">numeros = [1, 2, 3]</span>.<br><br>Usa <span class="inline-code">.extend()</span> para agregar los números 4, 5 y 6.<br><br>Imprime la lista resultante.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateExtendMethod,
        },
        {
          id: 'ex-5-3',
          number: 'EJERCICIO 5.3',
          description: 'Crea una lista <span class="inline-code">letras = ["a", "b", "c"]</span>.<br><br>Usa <span class="inline-code">.insert()</span> para insertar "x" en la posición 1. Luego usa <span class="inline-code">.pop()</span> para eliminar el último elemento.<br><br>Imprime la lista resultante.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateInsertAndPop,
        },
      ],
    },
    {
      icon: '🔍',
      title: 'Buscar y contar',
      content: 'Métodos útiles para buscar elementos y obtener información sobre la lista. <span class="inline-code">index()</span> encuentra la posición de un elemento y <span class="inline-code">count()</span> cuenta cuántas veces aparece.',
      codeExample: {
        filename: 'buscar.py',
        code: `<span class="identifier">valores</span> = [<span class="number">10</span>, <span class="number">20</span>, <span class="number">30</span>, <span class="number">20</span>, <span class="number">40</span>, <span class="number">20</span>]

<span class="comment"># index() - obtiene el índice de un elemento</span>
<span class="identifier">posicion</span> = <span class="identifier">valores</span>.<span class="function">index</span>(<span class="number">30</span>)
<span class="builtin">print</span>(posicion)  <span class="output"># → 2</span>

<span class="comment"># count() - cuenta cuántas veces aparece un elemento</span>
<span class="identifier">veces</span> = <span class="identifier">valores</span>.<span class="function">count</span>(<span class="number">20</span>)
<span class="builtin">print</span>(veces)      <span class="output"># → 3</span>`,
      },
      exercises: [
        {
          id: 'ex-5-4',
          number: 'EJERCICIO 5.4',
          description: 'Crea una lista <span class="inline-code">numeros = [5, 10, 15, 10, 20, 10, 25]</span>.<br><br>Usa <span class="inline-code">.index()</span> para encontrar la posición del número 15 y guárdalo en <span class="inline-code">posicion</span>. Usa <span class="inline-code">.count()</span> para contar cuántas veces aparece el 10 y guárdalo en <span class="inline-code">apariciones</span>.<br><br>Imprime ambos resultados.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateIndexAndCount,
        },
      ],
    },
    {
      icon: '📊',
      title: 'Funciones útiles: len() y sum()',
      content: 'Python incluye funciones integradas muy útiles para trabajar con listas. <span class="inline-code">len()</span> obtiene la cantidad de elementos y <span class="inline-code">sum()</span> suma todos los elementos numéricos.',
      codeExample: {
        filename: 'len_sum.py',
        code: `<span class="identifier">numeros</span> = [<span class="number">10</span>, <span class="number">20</span>, <span class="number">30</span>, <span class="number">40</span>, <span class="number">50</span>]

<span class="comment"># len() - obtiene la cantidad de elementos</span>
<span class="identifier">cantidad</span> = <span class="builtin">len</span>(numeros)
<span class="builtin">print</span>(cantidad)  <span class="output"># → 5</span>

<span class="comment"># sum() - suma todos los elementos numéricos</span>
<span class="identifier">total</span> = <span class="builtin">sum</span>(numeros)
<span class="builtin">print</span>(total)     <span class="output"># → 150</span>

<span class="comment"># Calcular promedio combinando ambas</span>
<span class="identifier">promedio</span> = <span class="builtin">sum</span>(numeros) / <span class="builtin">len</span>(numeros)
<span class="builtin">print</span>(promedio) <span class="output"># → 30.0</span>`,
      },
      exercises: [
        {
          id: 'ex-5-5',
          number: 'EJERCICIO 5.5',
          description: 'Crea una lista <span class="inline-code">calificaciones = [85, 90, 78, 92, 88]</span>.<br><br>Usa <span class="inline-code">sum()</span> para calcular el total y guárdalo en una variable <span class="inline-code">total</span>. Usa <span class="inline-code">len()</span> para obtener la cantidad de calificaciones y guárdalo en <span class="inline-code">cantidad</span>. Calcula el promedio dividiendo total entre cantidad y guárdalo en <span class="inline-code">promedio</span>.<br><br>Imprime el promedio.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateSumAndLen,
        },
      ],
    },
    {
      icon: '🔀',
      title: 'Ordenar y revertir',
      content: 'Métodos para reorganizar los elementos de una lista. <span class="inline-code">sort()</span> ordena la lista y <span class="inline-code">reverse()</span> invierte el orden de los elementos.',
      codeExample: {
        filename: 'ordenar.py',
        code: `<span class="identifier">numeros</span> = [<span class="number">3</span>, <span class="number">1</span>, <span class="number">4</span>, <span class="number">1</span>, <span class="number">5</span>, <span class="number">9</span>, <span class="number">2</span>]

<span class="comment"># sort() - ordena la lista de menor a mayor</span>
<span class="identifier">numeros</span>.<span class="function">sort</span>()
<span class="builtin">print</span>(numeros)  <span class="output"># → [1, 1, 2, 3, 4, 5, 9]</span>

<span class="comment"># reverse() - invierte el orden de los elementos</span>
<span class="identifier">numeros</span>.<span class="function">reverse</span>()
<span class="builtin">print</span>(numeros)  <span class="output"># → [9, 5, 4, 3, 2, 1, 1]</span>

<span class="comment"># clear() - vacía la lista completamente</span>
<span class="identifier">numeros</span>.<span class="function">clear</span>()
<span class="builtin">print</span>(numeros)  <span class="output"># → []</span>`,
      },
      exercises: [
        {
          id: 'ex-5-6',
          number: 'EJERCICIO 5.6',
          description: 'Crea una lista <span class="inline-code">precios = [45, 23, 67, 12, 89, 34]</span>.<br><br>Ordena la lista usando <span class="inline-code">.sort()</span> e imprime el resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateSortList,
        },
      ],
    },
  ],
  tipBox: {
    icon: '💡',
    content: 'Los métodos <span class="inline-code">.append()</span>, <span class="inline-code">.sort()</span>, <span class="inline-code">.reverse()</span> modifican la lista original. No retornan una nueva lista, sino <span class="inline-code">None</span>.',
  },
  exercises: [],
};
