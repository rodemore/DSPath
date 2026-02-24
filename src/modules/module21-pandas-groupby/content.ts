import type { Section } from '../../types';
import { TIPS_CSV } from '../module14-pandas-dataframes/tipsData';
import {
  validateGroupbyOne,
  validateGroupbyTwo,
  validateResetIndex,
} from './validators';

export const module21: Section = {
  id: 20,
  moduleNumber: 'Módulo 21',
  title: 'Pandas 9:',
  titleHighlight: 'GroupBy',

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
      icon: '🗂️',
      title: '¿Qué es GroupBy?',
      content: '<span class="inline-code">.groupby()</span> divide el DataFrame en grupos según los valores de una columna, luego aplica una función a cada grupo por separado. El resultado es una tabla resumen: una fila por grupo. Piénsalo como: <strong>"divide → aplica → combina"</strong>.',
      codeExample: {
        filename: 'groupby_concepto.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Sin groupby: promedio de TODA la columna</span>
<span class="builtin">print</span>(<span class="identifier">df</span>[<span class="string">'total_bill'</span>].<span class="function">mean</span>())  <span class="comment"># 19.78 (un solo número)</span>

<span class="comment"># Con groupby: promedio POR DÍA</span>
<span class="builtin">print</span>(<span class="identifier">df</span>.<span class="function">groupby</span>(<span class="string">'day'</span>)[<span class="string">'total_bill'</span>].<span class="function">mean</span>())
<span class="comment"># day</span>
<span class="comment"># Fri     17.15</span>
<span class="comment"># Sat     20.44</span>
<span class="comment"># Sun     21.41</span>
<span class="comment"># Thur    17.68</span>`,
      },
    },
    {
      icon: '1️⃣',
      title: 'Agrupar por una columna',
      content: 'La estructura básica es: <span class="inline-code">df.groupby("columna_grupo")["columna_valor"].funcion()</span>. Primero indicas <strong>por qué columna agrupar</strong>, luego <strong>qué columna calcular</strong>, y finalmente <strong>qué función aplicar</strong>.',
      codeExample: {
        filename: 'groupby_una.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Promedio de propina por día</span>
<span class="identifier">resultado</span> = <span class="identifier">df</span>.<span class="function">groupby</span>(<span class="string">'day'</span>)[<span class="string">'tip'</span>].<span class="function">mean</span>()
<span class="builtin">print</span>(<span class="identifier">resultado</span>)
<span class="comment"># day</span>
<span class="comment"># Fri     2.73</span>
<span class="comment"># Sat     2.99</span>
<span class="comment"># Sun     3.25</span>
<span class="comment"># Thur    2.77</span>

<span class="comment"># También puedes usar sum, max, min, count...</span>
<span class="builtin">print</span>(<span class="identifier">df</span>.<span class="function">groupby</span>(<span class="string">'sex'</span>)[<span class="string">'total_bill'</span>].<span class="function">sum</span>())`,
      },
      exercises: [
        {
          id: 'ex-21-1',
          number: 'EJERCICIO 21.1',
          description: 'Agrupa el DataFrame por la columna <span class="inline-code">day</span> y calcula el <strong>promedio</strong> de <span class="inline-code">total_bill</span> por día usando <span class="inline-code">.groupby()</span> y <span class="inline-code">.mean()</span>. Imprime el resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateGroupbyOne,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Promedio de total_bill por día
`,
        },
      ],
    },
    {
      icon: '2️⃣',
      title: 'Agrupar por dos columnas',
      content: 'Para agrupar por más de una columna, pásalas dentro de una <strong>lista</strong> <span class="inline-code">[]</span>. El resultado tendrá una fila por cada combinación única de valores entre las dos columnas.',
      codeExample: {
        filename: 'groupby_dos.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># ❌ Así NO: .groupby('day', 'smoker')  → error</span>
<span class="comment"># ✅ Así SÍ: las columnas van en una lista []</span>
<span class="identifier">resultado</span> = <span class="identifier">df</span>.<span class="function">groupby</span>([<span class="string">'day'</span>, <span class="string">'smoker'</span>])[<span class="string">'tip'</span>].<span class="function">mean</span>()
<span class="builtin">print</span>(<span class="identifier">resultado</span>)
<span class="comment"># day   smoker</span>
<span class="comment"># Fri   No       2.81</span>
<span class="comment">#       Yes      2.71</span>
<span class="comment"># Sat   No       3.10</span>
<span class="comment">#       Yes      2.87</span>
<span class="comment"># ...</span>`,
      },
      exercises: [
        {
          id: 'ex-21-2',
          number: 'EJERCICIO 21.2',
          description: 'Agrupa por <span class="inline-code">day</span> y <span class="inline-code">smoker</span> (usando una lista <span class="inline-code">[]</span>) y calcula el promedio de <span class="inline-code">tip</span>. Imprime el resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateGroupbyTwo,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Promedio de tip agrupando por day y smoker
`,
        },
      ],
    },
    {
      icon: '🔄',
      title: 'reset_index() y as_index=False',
      content: 'Por defecto, las columnas de agrupación se convierten en el <strong>índice</strong> del resultado. Para que queden como columnas normales tienes dos opciones:<br><br><strong>Opción 1:</strong> Encadenar <span class="inline-code">.reset_index()</span> al final.<br><strong>Opción 2:</strong> Pasar <span class="inline-code">as_index=False</span> dentro del <span class="inline-code">.groupby()</span>. Ambas dan el mismo resultado: un DataFrame con índice numérico 0, 1, 2...',
      codeExample: {
        filename: 'reset_index.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># ❌ Sin reset_index: "day" es el índice</span>
<span class="identifier">r1</span> = <span class="identifier">df</span>.<span class="function">groupby</span>(<span class="string">'day'</span>)[<span class="string">'tip'</span>].<span class="function">mean</span>()
<span class="comment"># day</span>
<span class="comment"># Fri    2.73   ← "day" es índice, no columna</span>

<span class="comment"># ✅ Opción 1: .reset_index()</span>
<span class="identifier">r2</span> = <span class="identifier">df</span>.<span class="function">groupby</span>(<span class="string">'day'</span>)[<span class="string">'tip'</span>].<span class="function">mean</span>().<span class="function">reset_index</span>()
<span class="comment">#    day       tip</span>
<span class="comment"># 0  Fri  2.734737   ← índice numérico, "day" es columna</span>

<span class="comment"># ✅ Opción 2: as_index=False</span>
<span class="identifier">r3</span> = <span class="identifier">df</span>.<span class="function">groupby</span>(<span class="string">'day'</span>, <span class="identifier">as_index</span>=<span class="keyword">False</span>)[<span class="string">'tip'</span>].<span class="function">mean</span>()
<span class="comment">#    day       tip</span>
<span class="comment"># 0  Fri  2.734737   ← mismo resultado</span>`,
      },
      exercises: [
        {
          id: 'ex-21-3',
          number: 'EJERCICIO 21.3',
          description: 'Agrupa por <span class="inline-code">day</span> y calcula el promedio de <span class="inline-code">total_bill</span>. Usa <span class="inline-code">.reset_index()</span> (o <span class="inline-code">as_index=False</span>) para obtener un DataFrame con índice numérico. Imprime el resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateResetIndex,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Groupby con reset_index
`,
        },
      ],
    },
    {
      icon: '📝',
      title: 'Resumen: estructura de GroupBy',
      content: 'La anatomía de un groupby:',
      table: {
        headers: ['Parte', 'Código', 'Qué hace'],
        rows: [
          {
            Parte: 'Agrupar',
            Código: '.groupby("col")',
            'Qué hace': 'Define los grupos (una columna)',
          },
          {
            Parte: 'Agrupar (2 columnas)',
            Código: '.groupby(["col1", "col2"])',
            'Qué hace': 'Define los grupos (varias columnas)',
          },
          {
            Parte: 'Seleccionar',
            Código: '["columna_valor"]',
            'Qué hace': 'Elige qué columna calcular',
          },
          {
            Parte: 'Agregar',
            Código: '.mean() / .sum() / .max()...',
            'Qué hace': 'Función que se aplica a cada grupo',
          },
          {
            Parte: 'Resetear índice',
            Código: '.reset_index()',
            'Qué hace': 'Convierte el índice en columnas normales',
          },
        ],
      },
    },
  ],

  tipBox: {
    icon: '💡',
    content: '<strong>Tip:</strong> Puedes encadenar un filtro antes del groupby: <span class="inline-code">df[df["time"] == "Dinner"].groupby("day")["tip"].mean()</span> calcula el promedio de propinas solo en las cenas, por día.',
  },

  exercises: [],
};
