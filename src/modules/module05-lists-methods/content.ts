import type { Section } from '../../types';
import {
  validateAppendMethod,
  validateExtendMethod,
  validateInsertAndPop,
} from './validators';

export const module05: Section = {
  id: 4,
  moduleNumber: 'Módulo 05',
  title: 'Listas 2',
  titleHighlight: 'Métodos',
  theoryBlocks: [
    {
      icon: '➕',
      title: 'Agregar elementos',
      content: 'Python ofrece varios métodos para agregar elementos a una lista existente.',
      codeExample: {
        filename: 'agregar.py',
        code: `<span class="identifier">numeros</span> = [<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>]

<span class="comment"># append() - agrega un elemento al final</span>
<span class="identifier">numeros</span>.<span class="function">append</span>(<span class="number">4</span>)
<span class="builtin">print</span>(numeros)  <span class="output"># → [1, 2, 3, 4]</span>

<span class="comment"># extend() - agrega múltiples elementos</span>
<span class="identifier">numeros</span>.<span class="function">extend</span>([<span class="number">5</span>, <span class="number">6</span>, <span class="number">7</span>])
<span class="builtin">print</span>(numeros)  <span class="output"># → [1, 2, 3, 4, 5, 6, 7]</span>

<span class="comment"># insert() - inserta en una posición específica</span>
<span class="identifier">numeros</span>.<span class="function">insert</span>(<span class="number">0</span>, <span class="number">0</span>)  <span class="comment"># inserta 0 en posición 0</span>
<span class="builtin">print</span>(numeros)  <span class="output"># → [0, 1, 2, 3, 4, 5, 6, 7]</span>`,
      },
    },
    {
      icon: '➖',
      title: 'Eliminar elementos',
      content: 'Existen varios métodos para eliminar elementos de una lista según diferentes criterios.',
      codeExample: {
        filename: 'eliminar.py',
        code: `<span class="identifier">letras</span> = [<span class="string">"a"</span>, <span class="string">"b"</span>, <span class="string">"c"</span>, <span class="string">"d"</span>, <span class="string">"e"</span>]

<span class="comment"># remove() - elimina la primera aparición del valor</span>
<span class="identifier">letras</span>.<span class="function">remove</span>(<span class="string">"c"</span>)
<span class="builtin">print</span>(letras)  <span class="output"># → ['a', 'b', 'd', 'e']</span>

<span class="comment"># pop() - elimina y retorna elemento por índice</span>
<span class="identifier">ultimo</span> = <span class="identifier">letras</span>.<span class="function">pop</span>()      <span class="comment"># sin índice, elimina el último</span>
<span class="builtin">print</span>(ultimo)  <span class="output"># → e</span>
<span class="builtin">print</span>(letras)  <span class="output"># → ['a', 'b', 'd']</span>

<span class="identifier">primero</span> = <span class="identifier">letras</span>.<span class="function">pop</span>(<span class="number">0</span>)   <span class="comment"># elimina elemento en posición 0</span>
<span class="builtin">print</span>(primero) <span class="output"># → a</span>`,
      },
    },
    {
      icon: '🔍',
      title: 'Buscar y contar',
      content: 'Métodos útiles para buscar elementos y obtener información sobre la lista.',
      codeExample: {
        filename: 'buscar.py',
        code: `<span class="identifier">valores</span> = [<span class="number">10</span>, <span class="number">20</span>, <span class="number">30</span>, <span class="number">20</span>, <span class="number">40</span>, <span class="number">20</span>]

<span class="comment"># index() - obtiene el índice de un elemento</span>
<span class="identifier">posicion</span> = <span class="identifier">valores</span>.<span class="function">index</span>(<span class="number">30</span>)
<span class="builtin">print</span>(posicion)  <span class="output"># → 2</span>

<span class="comment"># count() - cuenta cuántas veces aparece un elemento</span>
<span class="identifier">veces</span> = <span class="identifier">valores</span>.<span class="function">count</span>(<span class="number">20</span>)
<span class="builtin">print</span>(veces)      <span class="output"># → 3</span>

<span class="comment"># len() - obtiene la longitud de la lista</span>
<span class="builtin">print</span>(<span class="builtin">len</span>(valores))  <span class="output"># → 6</span>`,
      },
    },
    {
      icon: '🔀',
      title: 'Ordenar y revertir',
      content: 'Métodos para reorganizar los elementos de una lista.',
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
    },
  ],
  tipBox: {
    icon: '💡',
    content: 'Los métodos <span class="inline-code">.append()</span>, <span class="inline-code">.sort()</span>, <span class="inline-code">.reverse()</span> modifican la lista original. No retornan una nueva lista, sino <span class="inline-code">None</span>.',
  },
  exercises: [
    {
      id: 'ex-5-1',
      number: 'EJERCICIO 5.1',
      description: 'Crea una lista vacía llamada <span class="inline-code">colores</span>. Usa <span class="inline-code">.append()</span> para agregar 3 colores. Imprime la lista resultante.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateAppendMethod,
    },
    {
      id: 'ex-5-2',
      number: 'EJERCICIO 5.2',
      description: 'Crea una lista <span class="inline-code">numeros = [1, 2, 3]</span>. Usa <span class="inline-code">.extend()</span> para agregar los números 4, 5 y 6. Imprime la lista resultante.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateExtendMethod,
    },
    {
      id: 'ex-5-3',
      number: 'EJERCICIO 5.3',
      description: 'Crea una lista <span class="inline-code">letras = ["a", "b", "c"]</span>. Usa <span class="inline-code">.insert()</span> para insertar "x" en la posición 1. Luego usa <span class="inline-code">.pop()</span> para eliminar el último elemento. Imprime la lista resultante.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateInsertAndPop,
    },
  ],
};
