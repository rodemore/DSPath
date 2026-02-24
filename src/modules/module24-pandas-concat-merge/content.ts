import type { Section } from '../../types';
import {
  VENTAS_ENERO_CSV,
  VENTAS_FEBRERO_CSV,
  VENTAS_MARZO_CSV,
  PRODUCTOS_CSV,
} from './salesData';
import {
  validateConcatTwo,
  validateConcatThree,
  validateMergeInner,
  validateIntegrador,
} from './validators';

export const module24: Section = {
  id: 23,
  moduleNumber: 'Módulo 24',
  title: 'Pandas 12:',
  titleHighlight: 'Concat & Merge',

  initialCode: `
import pandas as pd
from io import StringIO

_ventas_enero_csv = """${VENTAS_ENERO_CSV}"""
_ventas_febrero_csv = """${VENTAS_FEBRERO_CSV}"""
_ventas_marzo_csv = """${VENTAS_MARZO_CSV}"""
_productos_csv = """${PRODUCTOS_CSV}"""

_csv_files = {
    'ventas_enero.csv': _ventas_enero_csv,
    'ventas_febrero.csv': _ventas_febrero_csv,
    'ventas_marzo.csv': _ventas_marzo_csv,
    'productos.csv': _productos_csv,
}

if not hasattr(pd, '_sales_patched'):
    pd._sales_patched = True
    pd._original_read_csv = pd.read_csv

    def _custom_read_csv(filepath_or_buffer, *args, **kwargs):
        if isinstance(filepath_or_buffer, str) and filepath_or_buffer in _csv_files:
            return pd._original_read_csv(StringIO(_csv_files[filepath_or_buffer]), sep='|')
        raise FileNotFoundError(f"Archivo no encontrado: {filepath_or_buffer}")

    pd.read_csv = _custom_read_csv
  `,

  theoryBlocks: [
    {
      icon: '📦',
      title: 'Los datasets: ventas por mes + catálogo de productos',
      content: 'En este módulo trabajamos con datos de ventas de una tienda. Tenemos <strong>cuatro archivos</strong>: tres de ventas mensuales y uno con el catálogo de productos.',
      table: {
        headers: ['Archivo', 'Filas', 'Columnas clave'],
        rows: [
          {
            Archivo: 'ventas_enero.csv',
            Filas: '120',
            'Columnas clave': 'id_cliente, id_producto, amount, quantity, total, date, discount',
          },
          {
            Archivo: 'ventas_febrero.csv',
            Filas: '135',
            'Columnas clave': 'id_cliente, id_producto, amount, quantity, total, date, discount',
          },
          {
            Archivo: 'ventas_marzo.csv',
            Filas: '150',
            'Columnas clave': 'id_cliente, id_producto, amount, quantity, total, date, discount',
          },
          {
            Archivo: 'productos.csv',
            Filas: '12',
            'Columnas clave': 'id_producto, nombre, categoria, precio_unitario',
          },
        ],
      },
      codeExample: {
        filename: 'explorar_datos.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">enero</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'ventas_enero.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)
<span class="identifier">productos</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'productos.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="builtin">print</span>(<span class="identifier">enero</span>.<span class="function">head</span>(<span class="number">3</span>))
<span class="comment">#   id_cliente id_producto   amount  quantity    total        date  discount</span>
<span class="comment"># 0       C015        P001  1199.99         1  1139.99  2024-01-23       5.0</span>

<span class="builtin">print</span>(<span class="identifier">productos</span>.<span class="function">head</span>(<span class="number">3</span>))
<span class="comment">#   id_producto            nombre   categoria  precio_unitario</span>
<span class="comment"># 0        P001    Laptop Pro 15  Electronica          1199.99</span>`,
      },
    },
    {
      icon: '🔗',
      title: 'pd.concat(): apilar DataFrames verticalmente',
      content: '<span class="inline-code">pd.concat()</span> apila DataFrames uno encima del otro (mismas columnas). Es perfecto cuando tienes los mismos datos divididos en varios archivos. Siempre usa <span class="inline-code">ignore_index=True</span> para que el índice sea continuo (0, 1, 2...) y no se repita.',
      codeExample: {
        filename: 'concat_basico.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">enero</span>   = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'ventas_enero.csv'</span>,   <span class="identifier">sep</span>=<span class="string">'|'</span>)
<span class="identifier">febrero</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'ventas_febrero.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Apilar enero + febrero</span>
<span class="identifier">ventas</span> = <span class="identifier">pd</span>.<span class="function">concat</span>([<span class="identifier">enero</span>, <span class="identifier">febrero</span>], <span class="identifier">ignore_index</span>=<span class="keyword">True</span>)

<span class="builtin">print</span>(<span class="identifier">ventas</span>.<span class="identifier">shape</span>)  <span class="comment"># (255, 7) → 120 + 135</span>
<span class="builtin">print</span>(<span class="identifier">ventas</span>.<span class="function">head</span>())`,
      },
      exercises: [
        {
          id: 'ex-24-1',
          number: 'EJERCICIO 24.1',
          description: 'Carga <span class="inline-code">ventas_enero.csv</span> y <span class="inline-code">ventas_febrero.csv</span>. Úsalos con <span class="inline-code">pd.concat()</span> e <span class="inline-code">ignore_index=True</span> para crear un solo DataFrame. Imprime su <span class="inline-code">.shape</span> para verificar que tiene 255 filas.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateConcatTwo,
          starterCode: `import pandas as pd

enero   = pd.read_csv('ventas_enero.csv',   sep='|')
febrero = pd.read_csv('ventas_febrero.csv', sep='|')

# Une los dos DataFrames con pd.concat()
`,
        },
      ],
    },
    {
      icon: '📚',
      title: 'pd.concat() con tres o más DataFrames',
      content: 'Puedes pasar tantos DataFrames como quieras dentro de la lista. Este es el patrón habitual cuando tienes archivos por mes, por región o por cualquier otra partición.',
      codeExample: {
        filename: 'concat_tres.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">enero</span>   = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'ventas_enero.csv'</span>,   <span class="identifier">sep</span>=<span class="string">'|'</span>)
<span class="identifier">febrero</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'ventas_febrero.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)
<span class="identifier">marzo</span>   = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'ventas_marzo.csv'</span>,   <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Los tres meses en un solo DataFrame</span>
<span class="identifier">ventas</span> = <span class="identifier">pd</span>.<span class="function">concat</span>([<span class="identifier">enero</span>, <span class="identifier">febrero</span>, <span class="identifier">marzo</span>], <span class="identifier">ignore_index</span>=<span class="keyword">True</span>)

<span class="builtin">print</span>(<span class="identifier">ventas</span>.<span class="identifier">shape</span>)  <span class="comment"># (405, 7) → 120 + 135 + 150</span>`,
      },
      exercises: [
        {
          id: 'ex-24-2',
          number: 'EJERCICIO 24.2',
          description: 'Carga los tres archivos de ventas y úsalos con <span class="inline-code">pd.concat()</span> para crear un único DataFrame con todos los meses. Imprime su <span class="inline-code">.shape</span> — debe mostrar <strong>405 filas</strong>.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateConcatThree,
          starterCode: `import pandas as pd

enero   = pd.read_csv('ventas_enero.csv',   sep='|')
febrero = pd.read_csv('ventas_febrero.csv', sep='|')
marzo   = pd.read_csv('ventas_marzo.csv',   sep='|')

# Une los tres con pd.concat()
`,
        },
      ],
    },
    {
      icon: '🔀',
      title: 'merge(): unir dos tablas por una columna clave',
      content: '<span class="inline-code">.merge()</span> une dos DataFrames horizontalmente buscando filas que coincidan en una columna clave. Es equivalente a un JOIN en SQL. El parámetro <span class="inline-code">on="columna"</span> indica qué columna usar como llave de unión.',
      codeExample: {
        filename: 'merge_basico.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">ventas</span>   = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'ventas_enero.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)
<span class="identifier">productos</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'productos.csv'</span>,      <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># ventas tiene: id_producto → P001, P002...</span>
<span class="comment"># productos tiene: id_producto → P001, P002... + nombre, categoria, precio</span>

<span class="comment"># Unir por la columna en común: id_producto</span>
<span class="identifier">df</span> = <span class="identifier">ventas</span>.<span class="function">merge</span>(<span class="identifier">productos</span>, <span class="identifier">on</span>=<span class="string">'id_producto'</span>)

<span class="builtin">print</span>(<span class="identifier">df</span>[[<span class="string">'id_cliente'</span>, <span class="string">'nombre'</span>, <span class="string">'categoria'</span>, <span class="string">'total'</span>]].<span class="function">head</span>(<span class="number">3</span>))
<span class="comment">#   id_cliente       nombre   categoria    total</span>
<span class="comment"># 0       C015  Laptop Pro 15  Electronica  1139.99</span>`,
      },
      exercises: [
        {
          id: 'ex-24-3',
          number: 'EJERCICIO 24.3',
          description: 'Carga <span class="inline-code">ventas_enero.csv</span> y <span class="inline-code">productos.csv</span>. Usa <span class="inline-code">.merge()</span> con <span class="inline-code">on="id_producto"</span> para añadir el nombre, categoría y precio de cada producto a las ventas. Imprime las primeras 5 filas del resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateMergeInner,
          starterCode: `import pandas as pd

ventas   = pd.read_csv('ventas_enero.csv', sep='|')
productos = pd.read_csv('productos.csv',   sep='|')

# Une ventas con productos usando merge
`,
        },
      ],
    },
    {
      icon: '🏗️',
      title: 'Concat + Merge + GroupBy: el flujo completo',
      content: 'En la práctica estos tres pasos se encadenan: <strong>1)</strong> <span class="inline-code">concat</span> para unir los archivos mensuales, <strong>2)</strong> <span class="inline-code">merge</span> para enriquecer con el catálogo de productos, <strong>3)</strong> <span class="inline-code">groupby</span> para analizar por categoría, por mes, etc.',
      codeExample: {
        filename: 'flujo_completo.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="comment"># Paso 1: concat → un DataFrame con todo el año</span>
<span class="identifier">ventas</span> = <span class="identifier">pd</span>.<span class="function">concat</span>(
    [
        <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'ventas_enero.csv'</span>,   <span class="identifier">sep</span>=<span class="string">'|'</span>),
        <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'ventas_febrero.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>),
        <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'ventas_marzo.csv'</span>,   <span class="identifier">sep</span>=<span class="string">'|'</span>),
    ],
    <span class="identifier">ignore_index</span>=<span class="keyword">True</span>
)

<span class="comment"># Paso 2: merge → enriquecer con datos de productos</span>
<span class="identifier">productos</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'productos.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)
<span class="identifier">df</span> = <span class="identifier">ventas</span>.<span class="function">merge</span>(
    <span class="identifier">productos</span>,
    <span class="identifier">on</span>=<span class="string">'id_producto'</span>
)

<span class="comment"># Paso 3: groupby → ventas totales por categoría</span>
<span class="identifier">resumen</span> = (
    <span class="identifier">df</span>
    .<span class="function">groupby</span>(<span class="string">'categoria'</span>)[<span class="string">'total'</span>]
    .<span class="function">sum</span>()
    .<span class="function">reset_index</span>()
    .<span class="function">sort_values</span>(<span class="string">'total'</span>, <span class="identifier">ascending</span>=<span class="keyword">False</span>)
)
<span class="builtin">print</span>(<span class="identifier">resumen</span>)
<span class="comment">#      categoria       total</span>
<span class="comment"># 0  Electronica   28541.23</span>
<span class="comment"># 1      Muebles    9823.45</span>
<span class="comment"># 2    Papelería    1204.67</span>`,
      },
      exercises: [
        {
          id: 'ex-24-4',
          number: 'EJERCICIO 24.4',
          description: 'Combina los tres meses con <span class="inline-code">pd.concat()</span>, enriquece con <span class="inline-code">productos.csv</span> usando <span class="inline-code">.merge()</span>, y calcula las <strong>ventas totales</strong> (<span class="inline-code">total</span>) por <span class="inline-code">categoria</span> con <span class="inline-code">.groupby()</span>. Imprime el resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateIntegrador,
          starterCode: `import pandas as pd

# Paso 1: une los tres meses con concat
ventas = pd.concat(
    [
        pd.read_csv('ventas_enero.csv',   sep='|'),
        pd.read_csv('ventas_febrero.csv', sep='|'),
        pd.read_csv('ventas_marzo.csv',   sep='|'),
    ],
    ignore_index=True
)

# Paso 2: carga productos y haz el merge
productos = pd.read_csv('productos.csv', sep='|')

df = ventas.merge(
    productos,
    on='id_producto'
)

# Paso 3: groupby por categoria, suma de total
resumen = (
    df
    .groupby('categoria')['total']
    .sum()
    .reset_index()
    .sort_values('total', ascending=False)
)

print(resumen)
`,
        },
      ],
    },
    {
      icon: '📝',
      title: 'Resumen: Concat vs Merge',
      content: 'Cuándo usar cada uno:',
      table: {
        headers: ['Operación', 'Dirección', 'Cuándo usarla', 'Ejemplo'],
        rows: [
          {
            Operación: 'pd.concat()',
            Dirección: 'Vertical (↕)',
            'Cuándo usarla': 'Mismas columnas, más filas',
            Ejemplo: 'Unir ventas de enero, febrero y marzo',
          },
          {
            Operación: '.merge()',
            Dirección: 'Horizontal (↔)',
            'Cuándo usarla': 'Mismas filas, más columnas',
            Ejemplo: 'Añadir nombre y categoría a cada venta',
          },
        ],
      },
    },
  ],

  tipBox: {
    icon: '💡',
    content: '<strong>Tip:</strong> <span class="inline-code">.merge()</span> hace por defecto un <strong>inner join</strong>: solo conserva las filas que tienen coincidencia en ambas tablas. Si quieres conservar todas las filas de la tabla izquierda (aunque no haya match), usa <span class="inline-code">how="left"</span>.',
  },

  exercises: [],
};
