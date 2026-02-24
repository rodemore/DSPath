import type { Section } from '../../types';
import { TIPS_CSV } from '../module14-pandas-dataframes/tipsData';
import {
  validateMathColumn,
  validateMultipleColumns,
  validateLocColumn,
} from './validators';

export const module17: Section = {
  id: 16,
  moduleNumber: 'Módulo 17',
  title: 'Pandas 4:',
  titleHighlight: 'Operaciones',

  initialCode: `
import pandas as pd
from io import StringIO

_tips_csv_data = """${TIPS_CSV}"""

if not hasattr(pd, '_tips_df_cached'):
    pd._tips_df_cached = pd.read_csv(StringIO(_tips_csv_data), sep='|')
    pd._original_read_csv = pd.read_csv

    def _custom_read_csv(filepath_or_buffer, *args, **kwargs):
        if isinstance(filepath_or_buffer, str) and filepath_or_buffer == 'tips.csv':
            return pd._tips_df_cached.copy()
        raise FileNotFoundError(f"Archivo no encontrado: {filepath_or_buffer}")

    pd.read_csv = _custom_read_csv
  `,

  theoryBlocks: [
    {
      icon: '🍽️',
      title: 'El dataset tips',
      content: 'En este módulo usaremos el dataset <span class="inline-code">tips</span>, que registra las cuentas y propinas de un restaurante. Tiene 244 filas y 7 columnas:',
      table: {
        headers: ['Columna', 'Tipo', 'Descripción', 'Ejemplo'],
        rows: [
          { Columna: 'total_bill', Tipo: 'float', Descripción: 'Total de la cuenta en dólares', Ejemplo: '16.99' },
          { Columna: 'tip', Tipo: 'float', Descripción: 'Propina dejada por el cliente', Ejemplo: '1.01' },
          { Columna: 'sex', Tipo: 'string', Descripción: 'Género de quien paga', Ejemplo: 'Female / Male' },
          { Columna: 'smoker', Tipo: 'string', Descripción: 'Si la mesa era de fumadores', Ejemplo: 'Yes / No' },
          { Columna: 'day', Tipo: 'string', Descripción: 'Día de la semana', Ejemplo: 'Sun, Sat, Fri, Thur' },
          { Columna: 'time', Tipo: 'string', Descripción: 'Turno del servicio', Ejemplo: 'Dinner / Lunch' },
          { Columna: 'size', Tipo: 'int', Descripción: 'Número de personas en la mesa', Ejemplo: '2' },
        ],
      },
      codeExample: {
        filename: 'explorar_tips.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="builtin">print</span>(<span class="identifier">df</span>.<span class="function">head</span>())
<span class="comment">#    total_bill   tip     sex smoker  day    time  size</span>
<span class="comment"># 0       16.99  1.01  Female     No  Sun  Dinner     2</span>
<span class="comment"># 1       10.34  1.66    Male     No  Sun  Dinner     3</span>
<span class="comment"># 2       21.01  3.50    Male     No  Sun  Dinner     3</span>`,
      },
    },
    {
      icon: '➕',
      title: 'Crear una nueva columna',
      content: 'En Pandas puedes crear una nueva columna simplemente asignándole valores. Si el nombre no existe, Pandas la crea automáticamente.',
      codeExample: {
        filename: 'nueva_columna.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Crear columna con valor fijo</span>
<span class="identifier">df</span>[<span class="string">'restaurante'</span>] = <span class="string">'La Trattoria'</span>

<span class="comment"># Crear columna a partir de operación</span>
<span class="identifier">df</span>[<span class="string">'total_con_propina'</span>] = <span class="identifier">df</span>[<span class="string">'total_bill'</span>] + <span class="identifier">df</span>[<span class="string">'tip'</span>]

<span class="builtin">print</span>(<span class="identifier">df</span>[[<span class="string">'total_bill'</span>, <span class="string">'tip'</span>, <span class="string">'total_con_propina'</span>]].<span class="function">head</span>())`,
      },
    },
    {
      icon: '🔢',
      title: 'Operaciones matemáticas entre columnas',
      content: 'Puedes combinar columnas con <span class="inline-code">+</span>, <span class="inline-code">-</span>, <span class="inline-code">*</span>, <span class="inline-code">/</span>. Pandas aplica la operación fila por fila automáticamente. También puedes combinar con números fijos.',
      codeExample: {
        filename: 'operaciones.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Porcentaje de propina respecto a la cuenta</span>
<span class="identifier">df</span>[<span class="string">'tip_pct'</span>] = (<span class="identifier">df</span>[<span class="string">'tip'</span>] / <span class="identifier">df</span>[<span class="string">'total_bill'</span>]) * <span class="number">100</span>

<span class="comment"># Costo por persona en la mesa</span>
<span class="identifier">df</span>[<span class="string">'bill_per_person'</span>] = <span class="identifier">df</span>[<span class="string">'total_bill'</span>] / <span class="identifier">df</span>[<span class="string">'size'</span>]

<span class="builtin">print</span>(<span class="identifier">df</span>[[<span class="string">'total_bill'</span>, <span class="string">'tip'</span>, <span class="string">'tip_pct'</span>, <span class="string">'size'</span>, <span class="string">'bill_per_person'</span>]].<span class="function">head</span>())`,
      },
      exercises: [
        {
          id: 'ex-18-1',
          number: 'EJERCICIO 18.1',
          description: 'Crea una columna llamada <span class="inline-code">total_con_propina</span> que sea la suma de <span class="inline-code">total_bill</span> y <span class="inline-code">tip</span>. Imprime las primeras 5 filas mostrando <span class="inline-code">total_bill</span>, <span class="inline-code">tip</span> y <span class="inline-code">total_con_propina</span>.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateMathColumn,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Crea la columna total_con_propina
`,
        },
        {
          id: 'ex-18-2',
          number: 'EJERCICIO 18.2',
          description: 'Crea una columna llamada <span class="inline-code">tip_pct</span> que represente el porcentaje de propina: <span class="inline-code">(tip / total_bill) * 100</span>. Imprime las primeras 5 filas mostrando <span class="inline-code">total_bill</span>, <span class="inline-code">tip</span> y <span class="inline-code">tip_pct</span>.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateMultipleColumns,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Crea la columna tip_pct
`,
        },
      ],
    },
    {
      icon: '🔀',
      title: 'Columnas condicionales con loc',
      content: 'Para crear una columna cuyo valor depende de una condición, usa <span class="inline-code">.loc[]</span> en dos pasos: primero asigna un valor por defecto a toda la columna, luego sobreescribe los valores que cumplen la condición.',
      codeExample: {
        filename: 'columna_condicional.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Paso 1: valor por defecto para TODAS las filas</span>
<span class="identifier">df</span>[<span class="string">'propina_tipo'</span>] = <span class="string">'normal'</span>

<span class="comment"># Paso 2: sobreescribir las filas que cumplen la condición</span>
<span class="identifier">df</span>.<span class="identifier">loc</span>[<span class="identifier">df</span>[<span class="string">'tip'</span>] >= <span class="number">4</span>, <span class="string">'propina_tipo'</span>] = <span class="string">'generosa'</span>

<span class="builtin">print</span>(<span class="identifier">df</span>[[<span class="string">'total_bill'</span>, <span class="string">'tip'</span>, <span class="string">'propina_tipo'</span>]].<span class="function">head</span>(<span class="number">10</span>))`,
      },
      exercises: [
        {
          id: 'ex-18-3',
          number: 'EJERCICIO 18.3',
          description: 'Crea una columna <span class="inline-code">mesa_grande</span> usando <span class="inline-code">.loc[]</span>: si <span class="inline-code">size >= 4</span> asigna <span class="inline-code">"grande"</span>, si no <span class="inline-code">"pequeña"</span>. Imprime las primeras 10 filas mostrando <span class="inline-code">size</span> y <span class="inline-code">mesa_grande</span>.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateLocColumn,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Paso 1: asigna "pequeña" como valor por defecto
# Paso 2: usa .loc para asignar "grande" donde size >= 4
`,
        },
      ],
    },
    {
      icon: '📊',
      title: 'Resumen: formas de crear columnas',
      content: 'Tres formas de crear columnas nuevas según lo que necesites:',
      table: {
        headers: ['Método', 'Cuándo usarlo', 'Ejemplo'],
        rows: [
          {
            Método: 'Valor fijo',
            'Cuándo usarlo': 'Mismo valor para todas las filas',
            Ejemplo: 'df["restaurante"] = "La Trattoria"',
          },
          {
            Método: 'Operación matemática',
            'Cuándo usarlo': 'Calcular a partir de otras columnas',
            Ejemplo: 'df["total"] = df["bill"] + df["tip"]',
          },
          {
            Método: 'loc condicional',
            'Cuándo usarlo': 'Valor distinto según condición',
            Ejemplo: 'df.loc[df["tip"] >= 4, "tipo"] = "generosa"',
          },
        ],
      },
    },
  ],

  tipBox: {
    icon: '💡',
    content: '<strong>Tip:</strong> Con <span class="inline-code">.loc[condición, "columna"] = valor</span> modificas solo las celdas que cumplen la condición. Recuerda siempre crear primero la columna con un valor por defecto.',
  },

  exercises: [],
};
