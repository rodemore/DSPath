import type { Section } from '../../types';
import { TIPS_CSV } from '../module14-pandas-dataframes/tipsData';
import {
  validateSortValues,
  validateTop5,
  validateBottom5,
  validateGroupbySort,
} from './validators';

export const module23: Section = {
  id: 22,
  moduleNumber: 'Módulo 23',
  title: 'Pandas 11:',
  titleHighlight: 'Sort & Top',

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
      icon: '🔃',
      title: 'sort_values(): ordenar un DataFrame',
      content:
        '<span class="inline-code">.sort_values("columna")</span> ordena el DataFrame por los valores de esa columna. Por defecto ordena de <strong>menor a mayor</strong>. Para invertir el orden usa <span class="inline-code">ascending=False</span>.',
      codeExample: {
        filename: 'sort_values.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Ordenar de menor a mayor (por defecto)</span>
<span class="builtin">print</span>(<span class="identifier">df</span>.<span class="function">sort_values</span>(<span class="string">'total_bill'</span>).<span class="function">head</span>())
<span class="comment">#    total_bill   tip     sex smoker  day   time  size</span>
<span class="comment"># 67       3.07  1.00  Female    Yes  Sat  Dinner     1</span>

<span class="comment"># Ordenar de mayor a menor</span>
<span class="builtin">print</span>(<span class="identifier">df</span>.<span class="function">sort_values</span>(<span class="string">'total_bill'</span>, <span class="identifier">ascending</span>=<span class="keyword">False</span>).<span class="function">head</span>())
<span class="comment">#     total_bill    tip  sex smoker  day   time  size</span>
<span class="comment"># 170      50.81  10.0  Male    Yes  Sat  Dinner     3</span>`,
      },
      exercises: [
        {
          id: 'ex-23-1',
          number: 'EJERCICIO 23.1',
          description:
            'Ordena el DataFrame por <span class="inline-code">total_bill</span> de <strong>mayor a menor</strong> usando <span class="inline-code">ascending=False</span>. Imprime las primeras 5 filas.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateSortValues,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Ordena por total_bill de mayor a menor
`,
        },
      ],
    },
    {
      icon: '🏆',
      title: 'Top N con sort_values() + head()',
      content:
        'La combinación <span class="inline-code">.sort_values(ascending=False).head(N)</span> es el patrón estándar para obtener los <strong>N mejores</strong> registros de cualquier columna. Es más explícito y flexible que <span class="inline-code">.nlargest()</span>.',
      codeExample: {
        filename: 'top5.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Top 5 propinas más altas</span>
<span class="identifier">top5</span> = <span class="identifier">df</span>.<span class="function">sort_values</span>(<span class="string">'tip'</span>, <span class="identifier">ascending</span>=<span class="keyword">False</span>).<span class="function">head</span>(<span class="number">5</span>)
<span class="builtin">print</span>(<span class="identifier">top5</span>[[<span class="string">'total_bill'</span>, <span class="string">'tip'</span>, <span class="string">'day'</span>]])
<span class="comment">#     total_bill   tip  day</span>
<span class="comment"># 170      50.81  10.0  Sat</span>
<span class="comment"># 212      48.33   9.0  Sat</span>
<span class="comment"># 23       39.42   7.58 Sat</span>
<span class="comment"># 59       48.27   6.73 Sat</span>
<span class="comment"># 141      34.30   6.70 Thur</span>`,
      },
      exercises: [
        {
          id: 'ex-23-2',
          number: 'EJERCICIO 23.2',
          description:
            'Obtén el <strong>top 5 de propinas más altas</strong>: ordena por <span class="inline-code">tip</span> de mayor a menor y usa <span class="inline-code">.head(5)</span>. Imprime el resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateTop5,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Top 5 propinas más altas
`,
        },
      ],
    },
    {
      icon: '📉',
      title: 'Bottom N con sort_values() + tail()',
      content:
        '<span class="inline-code">.tail(N)</span> devuelve las últimas N filas. Combinado con <span class="inline-code">.sort_values(ascending=False)</span>, te da los <strong>N peores</strong> registros: los de menor propina, la cuenta más baja, etc.',
      codeExample: {
        filename: 'bottom5.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Opción A: ordenar desc + tail (últimos = los menores)</span>
<span class="identifier">bottom5</span> = <span class="identifier">df</span>.<span class="function">sort_values</span>(<span class="string">'tip'</span>, <span class="identifier">ascending</span>=<span class="keyword">False</span>).<span class="function">tail</span>(<span class="number">5</span>)
<span class="builtin">print</span>(<span class="identifier">bottom5</span>[[<span class="string">'total_bill'</span>, <span class="string">'tip'</span>, <span class="string">'day'</span>]])

<span class="comment"># Opción B: ordenar asc + head (los primeros = los menores)</span>
<span class="identifier">bottom5</span> = <span class="identifier">df</span>.<span class="function">sort_values</span>(<span class="string">'tip'</span>).<span class="function">head</span>(<span class="number">5</span>)
<span class="builtin">print</span>(<span class="identifier">bottom5</span>[[<span class="string">'total_bill'</span>, <span class="string">'tip'</span>, <span class="string">'day'</span>]])
<span class="comment"># Ambas dan el mismo resultado</span>`,
      },
      exercises: [
        {
          id: 'ex-23-3',
          number: 'EJERCICIO 23.3',
          description:
            'Obtén las <strong>5 propinas más bajas</strong> usando <span class="inline-code">.sort_values()</span> y <span class="inline-code">.tail(5)</span> (o <span class="inline-code">.head(5)</span> con orden ascendente). Imprime el resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateBottom5,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Las 5 propinas más bajas
`,
        },
      ],
    },
    {
      icon: '🔗',
      title: 'Groupby + sort_values(): ranking por grupo',
      content:
        'El patrón más potente: primero <span class="inline-code">.groupby()</span> para resumir por categoría, luego <span class="inline-code">.sort_values()</span> para ordenar ese resumen. Así obtienes un <strong>ranking real</strong>: qué día tuvo mayor propina promedio, qué categoría vendió más, etc.',
      codeExample: {
        filename: 'groupby_sort.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Paso 1: promedio de propina por día</span>
<span class="identifier">por_dia</span> = <span class="identifier">df</span>.<span class="function">groupby</span>(<span class="string">'day'</span>)[<span class="string">'tip'</span>].<span class="function">mean</span>().<span class="function">reset_index</span>()

<span class="comment"># Paso 2: ordenar para ver el ranking</span>
<span class="identifier">ranking</span> = <span class="identifier">por_dia</span>.<span class="function">sort_values</span>(<span class="string">'tip'</span>, <span class="identifier">ascending</span>=<span class="keyword">False</span>)
<span class="builtin">print</span>(<span class="identifier">ranking</span>)
<span class="comment">#    day       tip</span>
<span class="comment"># 2  Sun  3.255132   ← el domingo es el día con mayor propina promedio</span>
<span class="comment"># 1  Sat  2.993103</span>
<span class="comment"># 3  Thur 2.771452</span>
<span class="comment"># 0  Fri  2.734737</span>`,
      },
      exercises: [
        {
          id: 'ex-23-4',
          number: 'EJERCICIO 23.4',
          description:
            'Calcula el <strong>promedio de propina por día</strong> con <span class="inline-code">.groupby()</span>, luego ordena el resultado de <strong>mayor a menor</strong> con <span class="inline-code">.sort_values(ascending=False)</span> para ver el ranking de días. Imprime el resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateGroupbySort,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Paso 1: promedio de tip por día con groupby
por_dia =

# Paso 2: ordena de mayor a menor
ranking =

print(ranking)
`,
        },
      ],
    },
    {
      icon: '📝',
      title: 'Resumen: Sort & Top',
      content: 'Patrones más usados para ordenar y encontrar extremos:',
      table: {
        headers: ['Patrón', 'Código', 'Resultado'],
        rows: [
          {
            Patrón: 'Ordenar ascendente',
            Código: '.sort_values("col")',
            Resultado: 'De menor a mayor',
          },
          {
            Patrón: 'Ordenar descendente',
            Código: '.sort_values("col", ascending=False)',
            Resultado: 'De mayor a menor',
          },
          {
            Patrón: 'Top N',
            Código: '.sort_values("col", ascending=False).head(N)',
            Resultado: 'Los N valores más altos',
          },
          {
            Patrón: 'Bottom N',
            Código: '.sort_values("col", ascending=False).tail(N)',
            Resultado: 'Los N valores más bajos',
          },
          {
            Patrón: 'Ranking por grupo',
            Código:
              '.groupby("cat")["col"].mean().reset_index().sort_values("col", ascending=False)',
            Resultado: 'Categorías ordenadas por su métrica',
          },
        ],
      },
    },
  ],

  tipBox: {
    icon: '💡',
    content:
      '<strong>Tip:</strong> Puedes ordenar por varias columnas a la vez: <span class="inline-code">.sort_values(["day", "tip"], ascending=[True, False])</span> ordena primero por día (A→Z) y luego por propina (mayor a menor) dentro de cada día.',
  },

  exercises: [],
};
