import type { Section } from '../../types';
import {
  validateCreateDictAndAccess,
  validateKeysMethod,
  validateValuesMethod,
  validateUpdateDict,
  validateItemsMethod,
} from './validators';

export const module06: Section = {
  id: 5,
  moduleNumber: 'Módulo 06',
  title: 'Diccionarios:',
  titleHighlight: 'Datos Clave-Valor',
  theoryBlocks: [
    {
      icon: '📚',
      title: '¿Qué es un diccionario?',
      content: 'Un <strong>diccionario</strong> es una estructura de datos que almacena pares <strong>clave-valor</strong>. Cada clave es única y se usa para acceder a su valor asociado. Se definen con llaves <span class="inline-code">{}</span>.',
      codeExample: {
        filename: 'diccionario_basico.py',
        code: `<span class="comment"># Crear un diccionario</span>
<span class="identifier">estudiante</span> = {
    <span class="string">"nombre"</span>: <span class="string">"Ana"</span>,
    <span class="string">"edad"</span>: <span class="number">20</span>,
    <span class="string">"carrera"</span>: <span class="string">"Ingeniería"</span>
}

<span class="comment"># Acceder a valores usando claves</span>
<span class="builtin">print</span>(estudiante[<span class="string">"nombre"</span>])     <span class="output"># → Ana</span>
<span class="builtin">print</span>(estudiante[<span class="string">"edad"</span>])       <span class="output"># → 20</span>

<span class="comment"># Obtener cantidad de elementos</span>
<span class="builtin">print</span>(<span class="builtin">len</span>(estudiante))         <span class="output"># → 3</span>`,
      },
      exercises: [
        {
          id: 'ex-6-1',
          number: 'EJERCICIO 6.1',
          description: 'Crea un diccionario llamado <span class="inline-code">libro</span> con las claves <span class="inline-code">"titulo"</span>, <span class="inline-code">"autor"</span> y <span class="inline-code">"año"</span> con los valores que prefieras.<br><br>Luego imprime el valor de <span class="inline-code">"autor"</span>.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateCreateDictAndAccess,
        },
      ],
    },
    {
      icon: '🔑',
      title: 'Métodos keys() y values()',
      content: 'El método <span class="inline-code">.keys()</span> devuelve todas las <strong>claves</strong> y <span class="inline-code">.values()</span> devuelve todos los <strong>valores</strong> del diccionario. Puedes convertirlos a listas para trabajar con ellos.',
      codeExample: {
        filename: 'keys_values.py',
        code: `<span class="identifier">persona</span> = {
    <span class="string">"nombre"</span>: <span class="string">"Carlos"</span>,
    <span class="string">"edad"</span>: <span class="number">25</span>,
    <span class="string">"ciudad"</span>: <span class="string">"Madrid"</span>
}

<span class="comment"># Obtener todas las claves</span>
<span class="identifier">claves</span> = <span class="builtin">list</span>(<span class="identifier">persona</span>.<span class="builtin">keys</span>())
<span class="builtin">print</span>(claves)  <span class="output"># → ['nombre', 'edad', 'ciudad']</span>

<span class="comment"># Obtener todos los valores</span>
<span class="identifier">valores</span> = <span class="builtin">list</span>(<span class="identifier">persona</span>.<span class="builtin">values</span>())
<span class="builtin">print</span>(valores)  <span class="output"># → ['Carlos', 25, 'Madrid']</span>`,
      },
      exercises: [
        {
          id: 'ex-6-2',
          number: 'EJERCICIO 6.2',
          description: 'Crea un diccionario <span class="inline-code">colores</span> con al menos 3 pares clave-valor (ejemplo: <span class="inline-code">"cielo": "azul"</span>).<br><br>Usa el método <span class="inline-code">.keys()</span> y conviértelo a lista con <span class="inline-code">list()</span> para imprimir todas las claves.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateKeysMethod,
        },
        {
          id: 'ex-6-3',
          number: 'EJERCICIO 6.3',
          description: 'Usando el mismo diccionario <span class="inline-code">colores</span> del ejercicio anterior, usa el método <span class="inline-code">.values()</span> y conviértelo a lista para imprimir todos los valores.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateValuesMethod,
        },
      ],
    },
    {
      icon: '✏️',
      title: 'Actualizar y agregar valores',
      content: 'Puedes <strong>actualizar</strong> valores existentes o <strong>agregar</strong> nuevos pares clave-valor simplemente asignando un valor a una clave.',
      codeExample: {
        filename: 'actualizar_dict.py',
        code: `<span class="identifier">config</span> = {<span class="string">"tema"</span>: <span class="string">"oscuro"</span>, <span class="string">"idioma"</span>: <span class="string">"es"</span>}

<span class="comment"># Actualizar valor existente</span>
<span class="identifier">config</span>[<span class="string">"tema"</span>] = <span class="string">"claro"</span>
<span class="builtin">print</span>(config)  <span class="output"># → {'tema': 'claro', 'idioma': 'es'}</span>

<span class="comment"># Agregar nueva clave-valor</span>
<span class="identifier">config</span>[<span class="string">"notificaciones"</span>] = <span class="keyword">True</span>
<span class="builtin">print</span>(config)  <span class="output"># → {'tema': 'claro', 'idioma': 'es', 'notificaciones': True}</span>`,
      },
      exercises: [
        {
          id: 'ex-6-4',
          number: 'EJERCICIO 6.4',
          description: 'Crea un diccionario <span class="inline-code">usuario</span> con <span class="inline-code">"nombre"</span> y <span class="inline-code">"edad"</span>.<br><br>Actualiza la edad a un nuevo valor y agrega una nueva clave <span class="inline-code">"email"</span> con un correo.<br><br>Imprime el diccionario completo.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateUpdateDict,
        },
      ],
    },
    {
      icon: '📋',
      title: 'Método items() y eliminar elementos',
      content: 'El método <span class="inline-code">.items()</span> devuelve pares (clave, valor) y <span class="inline-code">del</span> permite eliminar elementos del diccionario.',
      codeExample: {
        filename: 'items_delete.py',
        code: `<span class="identifier">producto</span> = {
    <span class="string">"nombre"</span>: <span class="string">"Laptop"</span>,
    <span class="string">"precio"</span>: <span class="number">899</span>,
    <span class="string">"stock"</span>: <span class="number">15</span>
}

<span class="comment"># items() devuelve pares (clave, valor)</span>
<span class="identifier">items</span> = <span class="builtin">list</span>(<span class="identifier">producto</span>.<span class="builtin">items</span>())
<span class="builtin">print</span>(items)
<span class="output"># → [('nombre', 'Laptop'), ('precio', 899), ('stock', 15)]</span>

<span class="comment"># Eliminar un elemento con del</span>
<span class="keyword">del</span> <span class="identifier">producto</span>[<span class="string">"stock"</span>]
<span class="builtin">print</span>(producto)  <span class="output"># → {'nombre': 'Laptop', 'precio': 899}</span>`,
      },
      exercises: [
        {
          id: 'ex-6-5',
          number: 'EJERCICIO 6.5',
          description: 'Crea un diccionario <span class="inline-code">inventario</span> con 3 productos y sus cantidades (ejemplo: <span class="inline-code">"manzanas": 10</span>).<br><br>Usa <span class="inline-code">.items()</span> y conviértelo a lista para imprimir todos los pares clave-valor.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateItemsMethod,
        },
      ],
    },
  ],
  tipBox: {
    icon: '💡',
    content: 'Las claves de un diccionario deben ser <strong>únicas</strong> e <strong>inmutables</strong> (strings, números, tuplas). Los valores pueden ser de cualquier tipo.',
  },
  exercises: [],
};
