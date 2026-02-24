import type { Section } from '../../types';
import {
  VENTAS_ENERO_CSV,
  VENTAS_FEBRERO_CSV,
  VENTAS_MARZO_CSV,
} from '../module24-pandas-concat-merge/salesData';
import {
  validateApplyDef,
  validateApplyLambda,
  validateSegmentation,
  validateApplyGroupby,
} from './validators';

export const module25: Section = {
  id: 24,
  moduleNumber: 'Módulo 25',
  title: 'Pandas 13:',
  titleHighlight: 'Apply (filas)',

  initialCode: `
import pandas as pd
from io import StringIO

_ventas_enero_csv = """${VENTAS_ENERO_CSV}"""
_ventas_febrero_csv = """${VENTAS_FEBRERO_CSV}"""
_ventas_marzo_csv = """${VENTAS_MARZO_CSV}"""

_csv_files = {
    'ventas_enero.csv': _ventas_enero_csv,
    'ventas_febrero.csv': _ventas_febrero_csv,
    'ventas_marzo.csv': _ventas_marzo_csv,
}

if not hasattr(pd, '_apply_patched'):
    pd._apply_patched = True
    pd._original_read_csv_apply = pd.read_csv

    def _custom_read_csv(filepath_or_buffer, *args, **kwargs):
        if isinstance(filepath_or_buffer, str) and filepath_or_buffer in _csv_files:
            return pd._original_read_csv_apply(StringIO(_csv_files[filepath_or_buffer]), sep='|')
        raise FileNotFoundError(f"Archivo no encontrado: {filepath_or_buffer}")

    pd.read_csv = _custom_read_csv
  `,

  theoryBlocks: [
    {
      icon: '⚙️',
      title: '¿Qué es .apply() y cuándo usarlo?',
      content: '<span class="inline-code">.apply()</span> ejecuta una función sobre cada fila (o columna) del DataFrame. Úsalo cuando la lógica <strong>depende de varias columnas a la vez</strong> y no se puede expresar con operaciones vectorizadas simples. Si puedes resolver algo con <span class="inline-code">+</span>, <span class="inline-code">*</span> o <span class="inline-code">.str</span>, esas opciones son más rápidas.',
      codeExample: {
        filename: 'apply_cuando.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'ventas_enero.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># ✅ Esto NO necesita apply (operación vectorizada simple)</span>
<span class="identifier">df</span>[<span class="string">'ganancia_neta'</span>] = <span class="identifier">df</span>[<span class="string">'total'</span>] * <span class="number">0.30</span>

<span class="comment"># ✅ Esto SÍ necesita apply (lógica que depende de varias columnas)</span>
<span class="comment"># "premium si total > 500 Y sin descuento, barata si total < 50"</span>
<span class="keyword">def</span> <span class="function">clasificar</span>(<span class="identifier">row</span>):
    <span class="keyword">if</span> <span class="identifier">row</span>[<span class="string">'total'</span>] > <span class="number">500</span> <span class="keyword">and</span> <span class="identifier">row</span>[<span class="string">'discount'</span>] == <span class="number">0</span>:
        <span class="keyword">return</span> <span class="string">'premium'</span>
    <span class="keyword">elif</span> <span class="identifier">row</span>[<span class="string">'total'</span>] < <span class="number">50</span>:
        <span class="keyword">return</span> <span class="string">'económica'</span>
    <span class="keyword">else</span>:
        <span class="keyword">return</span> <span class="string">'regular'</span>

<span class="identifier">df</span>[<span class="string">'tipo'</span>] = <span class="identifier">df</span>.<span class="function">apply</span>(<span class="identifier">clasificar</span>, <span class="identifier">axis</span>=<span class="number">1</span>)`,
      },
    },
    {
      icon: '🔧',
      title: 'Apply con función def: la forma más legible',
      content: 'Define una función con <span class="inline-code">def</span>, donde el parámetro es <span class="inline-code">row</span> (una fila completa). Accedes a cada columna con <span class="inline-code">row["columna"]</span>. Luego pásala a <span class="inline-code">.apply(función, axis=1)</span>. Este estilo es el más legible cuando la lógica tiene varias condiciones.',
      codeExample: {
        filename: 'apply_def.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'ventas_enero.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Función: clasifica cada transacción por su monto</span>
<span class="keyword">def</span> <span class="function">nivel_venta</span>(<span class="identifier">row</span>):
    <span class="keyword">if</span> <span class="identifier">row</span>[<span class="string">'total'</span>] >= <span class="number">500</span>:
        <span class="keyword">return</span> <span class="string">'alta'</span>
    <span class="keyword">elif</span> <span class="identifier">row</span>[<span class="string">'total'</span>] >= <span class="number">100</span>:
        <span class="keyword">return</span> <span class="string">'media'</span>
    <span class="keyword">else</span>:
        <span class="keyword">return</span> <span class="string">'baja'</span>

<span class="comment"># axis=1 → aplicar fila por fila</span>
<span class="identifier">df</span>[<span class="string">'nivel'</span>] = <span class="identifier">df</span>.<span class="function">apply</span>(<span class="identifier">nivel_venta</span>, <span class="identifier">axis</span>=<span class="number">1</span>)
<span class="builtin">print</span>(<span class="identifier">df</span>[[<span class="string">'total'</span>, <span class="string">'nivel'</span>]].<span class="function">head</span>(<span class="number">5</span>))
<span class="comment">#       total  nivel</span>
<span class="comment"># 0   1139.99   alta</span>
<span class="comment"># 1     29.99   baja</span>
<span class="comment"># 2     89.97   baja</span>`,
      },
      exercises: [
        {
          id: 'ex-25-1',
          number: 'EJERCICIO 25.1',
          description: 'Carga <span class="inline-code">ventas_enero.csv</span>. Define una función <span class="inline-code">nivel_venta(row)</span> que clasifique cada fila: <span class="inline-code">"alta"</span> si <span class="inline-code">total >= 500</span>, <span class="inline-code">"media"</span> si <span class="inline-code">total >= 100</span>, y <span class="inline-code">"baja"</span> en el resto. Aplícala con <span class="inline-code">.apply(axis=1)</span> y guarda el resultado en una columna <span class="inline-code">nivel</span>. Imprime las primeras 5 filas mostrando <span class="inline-code">total</span> y <span class="inline-code">nivel</span>.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateApplyDef,
          starterCode: `import pandas as pd

df = pd.read_csv('ventas_enero.csv', sep='|')

# Define la función
def nivel_venta(row):
    pass  # reemplaza con la lógica

# Aplica la función fila por fila
df['nivel'] = df.apply(nivel_venta, axis=1)

print(df[['total', 'nivel']].head(5))
`,
        },
      ],
    },
    {
      icon: '⚡',
      title: 'Apply con lambda: inline y conciso',
      content: 'Cuando la lógica es simple, puedes escribirla directamente como <span class="inline-code">lambda row: ...</span> sin definir una función aparte. Es más compacto, aunque para condiciones múltiples el <span class="inline-code">def</span> es más legible.',
      codeExample: {
        filename: 'apply_lambda.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'ventas_enero.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Lambda: precio efectivo por unidad (con descuento aplicado)</span>
<span class="identifier">df</span>[<span class="string">'precio_por_unidad'</span>] = <span class="identifier">df</span>.<span class="function">apply</span>(
    <span class="keyword">lambda</span> <span class="identifier">row</span>: <span class="identifier">row</span>[<span class="string">'total'</span>] / <span class="identifier">row</span>[<span class="string">'quantity'</span>],
    <span class="identifier">axis</span>=<span class="number">1</span>
)
<span class="builtin">print</span>(<span class="identifier">df</span>[[<span class="string">'id_producto'</span>, <span class="string">'quantity'</span>, <span class="string">'total'</span>, <span class="string">'precio_por_unidad'</span>]].<span class="function">head</span>())

<span class="comment"># Lambda con condicional: ¿tuvo descuento real?</span>
<span class="identifier">df</span>[<span class="string">'con_descuento'</span>] = <span class="identifier">df</span>.<span class="function">apply</span>(
    <span class="keyword">lambda</span> <span class="identifier">row</span>: <span class="string">'sí'</span> <span class="keyword">if</span> <span class="identifier">row</span>[<span class="string">'discount'</span>] > <span class="number">0</span> <span class="keyword">else</span> <span class="string">'no'</span>,
    <span class="identifier">axis</span>=<span class="number">1</span>
)`,
      },
      exercises: [
        {
          id: 'ex-25-2',
          number: 'EJERCICIO 25.2',
          description: 'Carga <span class="inline-code">ventas_enero.csv</span>. Usa <span class="inline-code">.apply()</span> con una <strong>lambda</strong> y <span class="inline-code">axis=1</span> para crear una columna <span class="inline-code">precio_por_unidad</span> calculada como <span class="inline-code">total / quantity</span>. Imprime las primeras 5 filas mostrando <span class="inline-code">quantity</span>, <span class="inline-code">total</span> y <span class="inline-code">precio_por_unidad</span>.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateApplyLambda,
          starterCode: `import pandas as pd

df = pd.read_csv('ventas_enero.csv', sep='|')

# Usa lambda con apply para calcular precio_por_unidad
df['precio_por_unidad'] = df.apply(
    lambda row: ,  # completa aquí
    axis=1
)

print(df[['quantity', 'total', 'precio_por_unidad']].head(5))
`,
        },
      ],
    },
    {
      icon: '🎯',
      title: 'Segmentación multi-columna: el caso de uso ideal de apply',
      content: 'El poder real de <span class="inline-code">apply(axis=1)</span> está en evaluar <strong>condiciones que cruzan varias columnas</strong> en la misma fila. Aquí no hay alternativa vectorizada directa — necesitas apply.',
      codeExample: {
        filename: 'segmentacion.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'ventas_enero.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Segmentación que cruza total, quantity y discount</span>
<span class="keyword">def</span> <span class="function">segmento_transaccion</span>(<span class="identifier">row</span>):
    <span class="keyword">if</span> <span class="identifier">row</span>[<span class="string">'total'</span>] > <span class="number">500</span> <span class="keyword">and</span> <span class="identifier">row</span>[<span class="string">'discount'</span>] == <span class="number">0</span>:
        <span class="keyword">return</span> <span class="string">'premium'</span>       <span class="comment"># compra grande, precio completo</span>
    <span class="keyword">elif</span> <span class="identifier">row</span>[<span class="string">'total'</span>] > <span class="number">500</span> <span class="keyword">and</span> <span class="identifier">row</span>[<span class="string">'discount'</span>] > <span class="number">0</span>:
        <span class="keyword">return</span> <span class="string">'premium_desc'</span>  <span class="comment"># compra grande, con descuento</span>
    <span class="keyword">elif</span> <span class="identifier">row</span>[<span class="string">'quantity'</span>] >= <span class="number">3</span>:
        <span class="keyword">return</span> <span class="string">'volumen'</span>       <span class="comment"># muchas unidades</span>
    <span class="keyword">elif</span> <span class="identifier">row</span>[<span class="string">'total'</span>] < <span class="number">30</span>:
        <span class="keyword">return</span> <span class="string">'económica'</span>    <span class="comment"># compra pequeña</span>
    <span class="keyword">else</span>:
        <span class="keyword">return</span> <span class="string">'regular'</span>

<span class="identifier">df</span>[<span class="string">'segmento'</span>] = <span class="identifier">df</span>.<span class="function">apply</span>(<span class="identifier">segmento_transaccion</span>, <span class="identifier">axis</span>=<span class="number">1</span>)
<span class="builtin">print</span>(<span class="identifier">df</span>[<span class="string">'segmento'</span>].<span class="function">value_counts</span>())`,
      },
      exercises: [
        {
          id: 'ex-25-3',
          number: 'EJERCICIO 25.3',
          description: 'Carga <span class="inline-code">ventas_enero.csv</span>. Define una función que cree la columna <span class="inline-code">segmento</span> cruzando <span class="inline-code">total</span> y <span class="inline-code">discount</span>: <span class="inline-code">"premium"</span> si <span class="inline-code">total > 500</span> y <span class="inline-code">discount == 0</span>, <span class="inline-code">"económica"</span> si <span class="inline-code">total < 30</span>, y <span class="inline-code">"regular"</span> en el resto. Usa <span class="inline-code">.apply(axis=1)</span>. Imprime el resultado de <span class="inline-code">.value_counts()</span>.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateSegmentation,
          starterCode: `import pandas as pd

df = pd.read_csv('ventas_enero.csv', sep='|')

def segmento_transaccion(row):
    if row['total'] > 500 and row['discount'] == 0:
        return 'premium'
    elif row['total'] < 30:
        return 'económica'
    else:
        return 'regular'

df['segmento'] = df.apply(segmento_transaccion, axis=1)
print(df['segmento'].value_counts())
`,
        },
      ],
    },
    {
      icon: '🔗',
      title: 'Apply + GroupBy: segmentar y analizar',
      content: 'La combinación <span class="inline-code">apply</span> → <span class="inline-code">groupby</span> es muy potente: primero creas los segmentos con <span class="inline-code">apply</span>, luego analizas cada segmento con <span class="inline-code">groupby</span>. Esto te permite comparar métricas entre grupos que definiste con lógica personalizada.',
      codeExample: {
        filename: 'apply_groupby.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'ventas_enero.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="keyword">def</span> <span class="function">segmento</span>(<span class="identifier">row</span>):
    <span class="keyword">if</span> <span class="identifier">row</span>[<span class="string">'total'</span>] > <span class="number">500</span> <span class="keyword">and</span> <span class="identifier">row</span>[<span class="string">'discount'</span>] == <span class="number">0</span>:
        <span class="keyword">return</span> <span class="string">'premium'</span>
    <span class="keyword">elif</span> <span class="identifier">row</span>[<span class="string">'total'</span>] < <span class="number">30</span>:
        <span class="keyword">return</span> <span class="string">'económica'</span>
    <span class="keyword">else</span>:
        <span class="keyword">return</span> <span class="string">'regular'</span>

<span class="identifier">df</span>[<span class="string">'segmento'</span>] = <span class="identifier">df</span>.<span class="function">apply</span>(<span class="identifier">segmento</span>, <span class="identifier">axis</span>=<span class="number">1</span>)

<span class="comment"># Analizar cada segmento</span>
<span class="identifier">resumen</span> = <span class="identifier">df</span>.<span class="function">groupby</span>(<span class="string">'segmento'</span>).<span class="function">agg</span>({
    <span class="string">'total'</span>: [<span class="string">'count'</span>, <span class="string">'mean'</span>, <span class="string">'sum'</span>]
}).<span class="function">reset_index</span>()
<span class="builtin">print</span>(<span class="identifier">resumen</span>)`,
      },
      exercises: [
        {
          id: 'ex-25-4',
          number: 'EJERCICIO 25.4',
          description: 'Carga <span class="inline-code">ventas_enero.csv</span>. Crea la columna <span class="inline-code">segmento</span> con <span class="inline-code">apply</span> (usando la misma lógica del ejercicio anterior). Luego usa <span class="inline-code">.groupby("segmento")</span> para calcular el <strong>promedio</strong> y la <strong>suma</strong> de <span class="inline-code">total</span> por segmento. Imprime el resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateApplyGroupby,
          starterCode: `import pandas as pd

df = pd.read_csv('ventas_enero.csv', sep='|')

# Paso 1: crea la columna segmento con apply
def segmento(row):
    if row['total'] > 500 and row['discount'] == 0:
        return 'premium'
    elif row['total'] < 30:
        return 'económica'
    else:
        return 'regular'

df['segmento'] = df.apply(segmento, axis=1)

# Paso 2: groupby por segmento
resumen = df.groupby('segmento').agg({
    'total': ['count', 'mean', 'sum']
}).reset_index()

print(resumen)
`,
        },
      ],
    },
    {
      icon: '📝',
      title: 'Resumen: def vs lambda en apply',
      content: 'Cuándo usar cada forma:',
      table: {
        headers: ['Forma', 'Cuándo usarla', 'Ejemplo'],
        rows: [
          {
            Forma: 'def función(row)',
            'Cuándo usarla': 'Lógica compleja, múltiples condiciones, más legible',
            Ejemplo: 'def clasificar(row): if... elif... else...',
          },
          {
            Forma: 'lambda row: ...',
            'Cuándo usarla': 'Lógica simple en una línea',
            Ejemplo: 'lambda row: row["total"] / row["quantity"]',
          },
        ],
      },
    },
  ],

  tipBox: {
    icon: '💡',
    content: '<strong>Tip:</strong> Dentro de la función puedes acceder a los valores de la fila como <span class="inline-code">row["columna"]</span> o como atributo <span class="inline-code">row.columna</span>. La segunda forma es más corta pero falla si el nombre de columna tiene espacios o coincide con un atributo de pandas.',
  },

  exercises: [],
};
