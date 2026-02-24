import type { Section } from '../../types';
import { TIPS_CSV } from '../module14-pandas-dataframes/tipsData';
import {
  validateAggDict,
  validateAggList,
  validateAggComplete,
} from './validators';

export const module22: Section = {
  id: 21,
  moduleNumber: 'Módulo 22',
  title: 'Pandas 10:',
  titleHighlight: 'GroupBy + Agg',

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
      icon: '⚙️',
      title: '¿Por qué usar .agg()?',
      content: 'El método <span class="inline-code">.groupby()</span> con una función simple como <span class="inline-code">.mean()</span> solo permite calcular <strong>una cosa a la vez</strong>. Con <span class="inline-code">.agg()</span> puedes calcular <strong>múltiples métricas de distintas columnas en una sola operación</strong>.',
      codeExample: {
        filename: 'agg_vs_simple.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># ❌ Sin .agg(): necesitas una línea por cada métrica</span>
<span class="identifier">df</span>.<span class="function">groupby</span>(<span class="string">'day'</span>)[<span class="string">'tip'</span>].<span class="function">mean</span>()
<span class="identifier">df</span>.<span class="function">groupby</span>(<span class="string">'day'</span>)[<span class="string">'tip'</span>].<span class="function">max</span>()
<span class="identifier">df</span>.<span class="function">groupby</span>(<span class="string">'day'</span>)[<span class="string">'total_bill'</span>].<span class="function">sum</span>()

<span class="comment"># ✅ Con .agg(): todo en una sola operación</span>
<span class="identifier">resultado</span> = <span class="identifier">df</span>.<span class="function">groupby</span>(<span class="string">'day'</span>).<span class="function">agg</span>({
    <span class="string">'tip'</span>: [<span class="string">'mean'</span>, <span class="string">'max'</span>],
    <span class="string">'total_bill'</span>: <span class="string">'sum'</span>
})
<span class="builtin">print</span>(<span class="identifier">resultado</span>)`,
      },
    },
    {
      icon: '📖',
      title: '.agg() con diccionario: una función por columna',
      content: 'Pasa un <strong>diccionario</strong> a <span class="inline-code">.agg()</span> donde cada clave es el nombre de una columna y el valor es la función a aplicar. Así puedes calcular cosas distintas en columnas distintas.',
      codeExample: {
        filename: 'agg_dict.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Diccionario: columna → función</span>
<span class="identifier">resultado</span> = <span class="identifier">df</span>.<span class="function">groupby</span>(<span class="string">'day'</span>).<span class="function">agg</span>({
    <span class="string">'total_bill'</span>: <span class="string">'mean'</span>,   <span class="comment"># promedio de la cuenta</span>
    <span class="string">'tip'</span>: <span class="string">'sum'</span>,           <span class="comment"># suma de propinas</span>
    <span class="string">'size'</span>: <span class="string">'max'</span>           <span class="comment"># mesa más grande del día</span>
})
<span class="builtin">print</span>(<span class="identifier">resultado</span>)
<span class="comment">#       total_bill    tip  size</span>
<span class="comment"># day</span>
<span class="comment"># Fri    17.151579  51.96     5</span>
<span class="comment"># Sat    20.441379 260.40     6</span>
<span class="comment"># Sun    21.410000 247.39     6</span>
<span class="comment"># Thur   17.682742 171.83     6</span>`,
      },
      exercises: [
        {
          id: 'ex-22-1',
          number: 'EJERCICIO 22.1',
          description: 'Agrupa por <span class="inline-code">day</span> y usa <span class="inline-code">.agg()</span> con un diccionario para calcular: el <strong>promedio</strong> de <span class="inline-code">total_bill</span> y la <strong>suma</strong> de <span class="inline-code">tip</span>. Imprime el resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateAggDict,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Usa .agg() con diccionario
resultado = df.groupby('day').agg({
    # 'columna': 'función'
})
print(resultado)
`,
        },
      ],
    },
    {
      icon: '📋',
      title: '.agg() con lista: varias funciones sobre la misma columna',
      content: 'Si quieres aplicar <strong>varias funciones a la misma columna</strong>, pasa una <strong>lista</strong> como valor en el diccionario. El resultado tendrá columnas con nombres como <span class="inline-code">(columna, función)</span>.',
      codeExample: {
        filename: 'agg_list.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Lista de funciones para la misma columna</span>
<span class="identifier">resultado</span> = <span class="identifier">df</span>.<span class="function">groupby</span>(<span class="string">'day'</span>).<span class="function">agg</span>({
    <span class="string">'tip'</span>: [<span class="string">'mean'</span>, <span class="string">'max'</span>, <span class="string">'min'</span>],
    <span class="string">'total_bill'</span>: [<span class="string">'mean'</span>, <span class="string">'sum'</span>]
})
<span class="builtin">print</span>(<span class="identifier">resultado</span>)
<span class="comment">#          tip                  total_bill</span>
<span class="comment">#         mean   max   min        mean     sum</span>
<span class="comment"># day</span>
<span class="comment"># Fri   2.7347  4.73  1.00   17.151579   51.96</span>
<span class="comment"># Sat   2.9931 10.00  1.00   20.441379  ...</span>

<span class="comment"># También puedes aplicar varias funciones a una sola columna sin dict:</span>
<span class="identifier">df</span>.<span class="function">groupby</span>(<span class="string">'day'</span>)[<span class="string">'tip'</span>].<span class="function">agg</span>([<span class="string">'mean'</span>, <span class="string">'max'</span>, <span class="string">'min'</span>])`,
      },
      exercises: [
        {
          id: 'ex-22-2',
          number: 'EJERCICIO 22.2',
          description: 'Agrupa por <span class="inline-code">day</span> y usa <span class="inline-code">.agg()</span> para calcular el <strong>promedio</strong>, <strong>máximo</strong> y <strong>mínimo</strong> de la columna <span class="inline-code">tip</span> (pasándolos en una lista). Imprime el resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateAggList,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Varias funciones sobre la misma columna
resultado = df.groupby('day')['tip'].agg([
    # 'funcion1', 'funcion2', ...
])
print(resultado)
`,
        },
      ],
    },
    {
      icon: '🏆',
      title: '.agg() completo: distintas funciones por columna + reset_index()',
      content: 'Combina todo lo aprendido: agrupa, aplica distintas funciones a distintas columnas con un diccionario, y usa <span class="inline-code">.reset_index()</span> para obtener un DataFrame limpio con índice numérico.',
      codeExample: {
        filename: 'agg_completo.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="identifier">resumen</span> = <span class="identifier">df</span>.<span class="function">groupby</span>(<span class="string">'day'</span>).<span class="function">agg</span>({
    <span class="string">'total_bill'</span>: [<span class="string">'mean'</span>, <span class="string">'sum'</span>],
    <span class="string">'tip'</span>: [<span class="string">'mean'</span>, <span class="string">'max'</span>],
    <span class="string">'size'</span>: <span class="string">'sum'</span>
}).<span class="function">reset_index</span>()

<span class="builtin">print</span>(<span class="identifier">resumen</span>)
<span class="comment">#    day total_bill          tip        size</span>
<span class="comment">#            mean     sum    mean   max   sum</span>
<span class="comment"># 0  Fri   17.15   51.96    2.73  4.73    26</span>
<span class="comment"># 1  Sat   20.44  1778.4    2.99 10.00   219</span>`,
      },
      exercises: [
        {
          id: 'ex-22-3',
          number: 'EJERCICIO 22.3',
          description: 'Agrupa por <span class="inline-code">day</span> y usa <span class="inline-code">.agg()</span> con un diccionario para calcular el <strong>promedio</strong> y la <strong>suma</strong> de <span class="inline-code">total_bill</span>, y el <strong>promedio</strong> y el <strong>máximo</strong> de <span class="inline-code">tip</span>. Añade <span class="inline-code">.reset_index()</span> al final. Imprime el resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateAggComplete,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# .agg() completo con reset_index()
resumen = df.groupby('day').agg({
    # 'total_bill': [...],
    # 'tip': [...],
}).reset_index()
print(resumen)
`,
        },
      ],
    },
    {
      icon: '📊',
      title: 'Resumen: formas de usar .agg()',
      content: 'Las tres formas de pasar funciones a <span class="inline-code">.agg()</span>:',
      table: {
        headers: ['Forma', 'Código', 'Cuándo usarla'],
        rows: [
          {
            Forma: 'String simple',
            Código: '.agg({"col": "mean"})',
            'Cuándo usarla': 'Una función por columna',
          },
          {
            Forma: 'Lista de strings',
            Código: '.agg({"col": ["mean", "max"]})',
            'Cuándo usarla': 'Varias funciones en la misma columna',
          },
          {
            Forma: 'Sobre una sola columna',
            Código: '["col"].agg(["mean", "max"])',
            'Cuándo usarla': 'Varias funciones, una sola columna seleccionada',
          },
        ],
      },
    },
  ],

  tipBox: {
    icon: '💡',
    content: '<strong>Tip:</strong> Si el resultado de <span class="inline-code">.agg()</span> tiene columnas con nombres compuestos como <span class="inline-code">(tip, mean)</span>, puedes aplanarlos con: <span class="inline-code">df.columns = ["_".join(col).strip() for col in df.columns]</span> para obtener nombres como <span class="inline-code">tip_mean</span>.',
  },

  exercises: [],
};
