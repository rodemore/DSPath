import type { Section } from '../../types';
import { TIPS_CSV } from '../module14-pandas-dataframes/tipsData';
import {
  validateMeanSum,
  validateMaxMin,
  validateMedian,
  validateNuniqueUnique,
  validateValueCounts,
} from './validators';

export const module19: Section = {
  id: 18,
  moduleNumber: 'Módulo 19',
  title: 'Pandas 6:',
  titleHighlight: 'Agregaciones',

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
      icon: '🔢',
      title: '¿Qué son las funciones de agregación?',
      content: 'Las funciones de agregación toman una columna entera y devuelven <strong>un solo valor</strong> que resume esa columna. Con una línea obtienes el promedio, la suma, el máximo o el mínimo de toda una columna sin necesidad de bucles.',
      codeExample: {
        filename: 'agregaciones_intro.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Una columna → un solo número de resumen</span>
<span class="builtin">print</span>(<span class="identifier">df</span>[<span class="string">'total_bill'</span>].<span class="function">mean</span>())   <span class="comment"># 19.78</span>
<span class="builtin">print</span>(<span class="identifier">df</span>[<span class="string">'total_bill'</span>].<span class="function">sum</span>())    <span class="comment"># 4827.77</span>
<span class="builtin">print</span>(<span class="identifier">df</span>[<span class="string">'tip'</span>].<span class="function">max</span>())         <span class="comment"># 10.0</span>
<span class="builtin">print</span>(<span class="identifier">df</span>[<span class="string">'tip'</span>].<span class="function">min</span>())         <span class="comment"># 1.0</span>`,
      },
    },
    {
      icon: '➕',
      title: '.mean() y .sum(): promedio y suma',
      content: '<span class="inline-code">.mean()</span> calcula el promedio aritmético de la columna. <span class="inline-code">.sum()</span> suma todos los valores. Ambas ignoran automáticamente los valores nulos (<span class="inline-code">NaN</span>).',
      codeExample: {
        filename: 'mean_sum.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Promedio de la cuenta total</span>
<span class="identifier">promedio</span> = <span class="identifier">df</span>[<span class="string">'total_bill'</span>].<span class="function">mean</span>()
<span class="builtin">print</span>(<span class="string">'Promedio:'</span>, <span class="identifier">promedio</span>)
<span class="comment"># Promedio: 19.785942622950818</span>

<span class="comment"># Suma de todas las propinas</span>
<span class="identifier">suma_tips</span> = <span class="identifier">df</span>[<span class="string">'tip'</span>].<span class="function">sum</span>()
<span class="builtin">print</span>(<span class="string">'Total propinas:'</span>, <span class="identifier">suma_tips</span>)
<span class="comment"># Total propinas: 731.58</span>`,
      },
      exercises: [
        {
          id: 'ex-20-1',
          number: 'EJERCICIO 20.1',
          description: 'Calcula el <strong>promedio</strong> y la <strong>suma</strong> de la columna <span class="inline-code">total_bill</span> usando <span class="inline-code">.mean()</span> y <span class="inline-code">.sum()</span>. Imprime ambos resultados.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateMeanSum,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Calcula el promedio y la suma de total_bill
`,
        },
      ],
    },
    {
      icon: '📈',
      title: '.max() y .min(): máximo y mínimo',
      content: '<span class="inline-code">.max()</span> devuelve el valor más alto de la columna y <span class="inline-code">.min()</span> el más bajo. Funcionan tanto en columnas numéricas como en columnas de texto (orden alfabético).',
      codeExample: {
        filename: 'max_min.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Propina más alta y más baja</span>
<span class="builtin">print</span>(<span class="string">'Máxima propina:'</span>, <span class="identifier">df</span>[<span class="string">'tip'</span>].<span class="function">max</span>())   <span class="comment"># 10.0</span>
<span class="builtin">print</span>(<span class="string">'Mínima propina:'</span>, <span class="identifier">df</span>[<span class="string">'tip'</span>].<span class="function">min</span>())   <span class="comment"># 1.0</span>

<span class="comment"># También funciona en texto (alfabético)</span>
<span class="builtin">print</span>(<span class="identifier">df</span>[<span class="string">'day'</span>].<span class="function">max</span>())  <span class="comment"># Thur (último alfabéticamente)</span>
<span class="builtin">print</span>(<span class="identifier">df</span>[<span class="string">'day'</span>].<span class="function">min</span>())  <span class="comment"># Fri (primero alfabéticamente)</span>`,
      },
      exercises: [
        {
          id: 'ex-20-2',
          number: 'EJERCICIO 20.2',
          description: 'Encuentra la propina <strong>máxima</strong> y la propina <strong>mínima</strong> de la columna <span class="inline-code">tip</span> usando <span class="inline-code">.max()</span> y <span class="inline-code">.min()</span>. Imprime ambos valores.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateMaxMin,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Encuentra la propina máxima y mínima
`,
        },
      ],
    },
    {
      icon: '📊',
      title: '.median(): la mediana',
      content: 'La mediana es el valor central cuando los datos están ordenados. A diferencia del promedio, <strong>no se ve afectada por valores extremos</strong>. Si hay unos pocos clientes que pagaron cuentas muy altas, el promedio sube pero la mediana se mantiene estable.',
      codeExample: {
        filename: 'median.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Comparar promedio vs mediana</span>
<span class="builtin">print</span>(<span class="string">'Promedio total_bill:'</span>, <span class="identifier">df</span>[<span class="string">'total_bill'</span>].<span class="function">mean</span>())    <span class="comment"># 19.79</span>
<span class="builtin">print</span>(<span class="string">'Mediana total_bill:'</span>, <span class="identifier">df</span>[<span class="string">'total_bill'</span>].<span class="function">median</span>())  <span class="comment"># 17.80</span>

<span class="comment"># La mediana es menor → hay cuentas altas que "tiran" el promedio hacia arriba</span>`,
      },
      exercises: [
        {
          id: 'ex-20-3',
          number: 'EJERCICIO 20.3',
          description: 'Calcula la <strong>mediana</strong> de la columna <span class="inline-code">total_bill</span> usando <span class="inline-code">.median()</span>. Imprime el resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateMedian,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Calcula la mediana de total_bill
`,
        },
      ],
    },
    {
      icon: '🔤',
      title: '.nunique() y .unique(): valores únicos',
      content: '<span class="inline-code">.nunique()</span> devuelve <strong>cuántos</strong> valores distintos hay en la columna (un número). <span class="inline-code">.unique()</span> devuelve <strong>cuáles</strong> son esos valores (un array). Son muy útiles para explorar columnas de texto o categorías.',
      codeExample: {
        filename: 'nunique_unique.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># ¿Cuántos días distintos hay?</span>
<span class="builtin">print</span>(<span class="identifier">df</span>[<span class="string">'day'</span>].<span class="function">nunique</span>())   <span class="comment"># 4</span>

<span class="comment"># ¿Cuáles son esos días?</span>
<span class="builtin">print</span>(<span class="identifier">df</span>[<span class="string">'day'</span>].<span class="function">unique</span>())
<span class="comment"># ['Sun' 'Sat' 'Thur' 'Fri']</span>

<span class="comment"># También funciona en columnas numéricas</span>
<span class="builtin">print</span>(<span class="identifier">df</span>[<span class="string">'size'</span>].<span class="function">nunique</span>())   <span class="comment"># 6 (mesas de 1 a 6 personas)</span>`,
      },
      exercises: [
        {
          id: 'ex-20-4',
          number: 'EJERCICIO 20.4',
          description: 'Usa <span class="inline-code">.nunique()</span> para saber cuántos días distintos hay en la columna <span class="inline-code">day</span>, y <span class="inline-code">.unique()</span> para ver cuáles son. Imprime ambos resultados.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateNuniqueUnique,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Usa .nunique() y .unique() sobre la columna day
`,
        },
      ],
    },
    {
      icon: '📋',
      title: '.value_counts(): frecuencia de cada valor',
      content: '<span class="inline-code">.value_counts()</span> cuenta cuántas veces aparece cada valor en la columna y ordena los resultados de mayor a menor. Es la forma más rápida de ver cuál es el valor más frecuente.',
      codeExample: {
        filename: 'value_counts.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># ¿En qué día hay más registros?</span>
<span class="builtin">print</span>(<span class="identifier">df</span>[<span class="string">'day'</span>].<span class="function">value_counts</span>())
<span class="comment"># Sat     87</span>
<span class="comment"># Sun     76</span>
<span class="comment"># Thur    62</span>
<span class="comment"># Fri     19</span>

<span class="comment"># ¿Cuántos fumadores hay vs no fumadores?</span>
<span class="builtin">print</span>(<span class="identifier">df</span>[<span class="string">'smoker'</span>].<span class="function">value_counts</span>())
<span class="comment"># No     151</span>
<span class="comment"># Yes     93</span>`,
      },
      exercises: [
        {
          id: 'ex-20-5',
          number: 'EJERCICIO 20.5',
          description: 'Usa <span class="inline-code">.value_counts()</span> sobre la columna <span class="inline-code">day</span> para ver cuántos registros hay por día. Imprime el resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateValueCounts,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Usa .value_counts() sobre la columna day
`,
        },
      ],
    },
    {
      icon: '📝',
      title: 'Resumen: funciones de agregación',
      content: 'Las funciones más usadas para explorar y resumir columnas:',
      table: {
        headers: ['Función', 'Tipo de columna', 'Qué devuelve', 'Ejemplo'],
        rows: [
          {
            Función: '.mean()',
            'Tipo de columna': 'Numérica',
            'Qué devuelve': 'Promedio',
            Ejemplo: 'df["total_bill"].mean()',
          },
          {
            Función: '.sum()',
            'Tipo de columna': 'Numérica',
            'Qué devuelve': 'Suma total',
            Ejemplo: 'df["tip"].sum()',
          },
          {
            Función: '.max()',
            'Tipo de columna': 'Numérica o texto',
            'Qué devuelve': 'Valor más alto',
            Ejemplo: 'df["tip"].max()',
          },
          {
            Función: '.min()',
            'Tipo de columna': 'Numérica o texto',
            'Qué devuelve': 'Valor más bajo',
            Ejemplo: 'df["tip"].min()',
          },
          {
            Función: '.median()',
            'Tipo de columna': 'Numérica',
            'Qué devuelve': 'Valor central',
            Ejemplo: 'df["total_bill"].median()',
          },
          {
            Función: '.nunique()',
            'Tipo de columna': 'Cualquiera',
            'Qué devuelve': 'Cantidad de valores únicos',
            Ejemplo: 'df["day"].nunique()',
          },
          {
            Función: '.unique()',
            'Tipo de columna': 'Cualquiera',
            'Qué devuelve': 'Array con los valores únicos',
            Ejemplo: 'df["day"].unique()',
          },
          {
            Función: '.value_counts()',
            'Tipo de columna': 'Cualquiera',
            'Qué devuelve': 'Frecuencia de cada valor',
            Ejemplo: 'df["day"].value_counts()',
          },
        ],
      },
    },
  ],

  tipBox: {
    icon: '💡',
    content: '<strong>Tip:</strong> Puedes combinar filtros con agregaciones: <span class="inline-code">df[df["day"] == "Sat"]["tip"].mean()</span> te da el promedio de propinas solo los sábados.',
  },

  exercises: [],
};
