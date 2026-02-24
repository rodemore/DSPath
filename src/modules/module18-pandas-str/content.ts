import type { Section } from '../../types';
import { TIPS_CSV } from '../module14-pandas-dataframes/tipsData';
import {
  validateStrLower,
  validateStrContains,
  validateStrReplace,
} from './validators';

export const module18: Section = {
  id: 17,
  moduleNumber: 'Módulo 18',
  title: 'Pandas 5:',
  titleHighlight: '.str',

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
      icon: '🔤',
      title: '¿Qué es el accessor .str?',
      content: 'Pandas incluye el accessor <span class="inline-code">.str</span> que permite aplicar operaciones de texto directamente sobre una columna entera. En lugar de iterar fila por fila, escribes una sola línea y Pandas lo aplica a todos los valores automáticamente.',
      codeExample: {
        filename: 'str_intro.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Sin .str tendríamos que hacer un bucle for</span>
<span class="comment"># ❌ Esto NO funciona en Pandas:</span>
<span class="comment"># df['day'].lower()  → error</span>

<span class="comment"># ✅ Con .str funciona en toda la columna de una vez:</span>
<span class="builtin">print</span>(<span class="identifier">df</span>[<span class="string">'day'</span>].<span class="identifier">str</span>.<span class="function">lower</span>().<span class="function">head</span>())
<span class="comment"># 0    sun</span>
<span class="comment"># 1    sun</span>
<span class="comment"># 2    sun</span>`,
      },
    },
    {
      icon: '🔡',
      title: '.str.lower() y .str.upper(): cambiar mayúsculas',
      content: 'Convierte todos los valores de una columna a minúsculas o mayúsculas. Muy útil para normalizar datos antes de comparar o filtrar.',
      codeExample: {
        filename: 'lower_upper.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Convertir a minúsculas</span>
<span class="identifier">df</span>[<span class="string">'day_lower'</span>] = <span class="identifier">df</span>[<span class="string">'day'</span>].<span class="identifier">str</span>.<span class="function">lower</span>()

<span class="comment"># Convertir a mayúsculas</span>
<span class="identifier">df</span>[<span class="string">'time_upper'</span>] = <span class="identifier">df</span>[<span class="string">'time'</span>].<span class="identifier">str</span>.<span class="function">upper</span>()

<span class="builtin">print</span>(<span class="identifier">df</span>[[<span class="string">'day'</span>, <span class="string">'day_lower'</span>, <span class="string">'time'</span>, <span class="string">'time_upper'</span>]].<span class="function">head</span>())`,
      },
      exercises: [
        {
          id: 'ex-19-1',
          number: 'EJERCICIO 19.1',
          description: 'Crea una columna <span class="inline-code">day_lower</span> con los valores de <span class="inline-code">day</span> en minúsculas usando <span class="inline-code">.str.lower()</span>. Imprime las primeras 5 filas mostrando <span class="inline-code">day</span> y <span class="inline-code">day_lower</span>.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateStrLower,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Crea la columna day_lower usando .str.lower()
`,
        },
      ],
    },
    {
      icon: '🔍',
      title: '.str.contains(): buscar texto dentro de una columna',
      content: '<span class="inline-code">.str.contains()</span> devuelve <span class="inline-code">True</span> o <span class="inline-code">False</span> por cada fila según si el texto buscado aparece en el valor. Es perfecto para usarlo como filtro.',
      codeExample: {
        filename: 'str_contains.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Filtrar filas donde 'time' contiene 'Dinner'</span>
<span class="identifier">cenas</span> = <span class="identifier">df</span>[<span class="identifier">df</span>[<span class="string">'time'</span>].<span class="identifier">str</span>.<span class="function">contains</span>(<span class="string">'Dinner'</span>)]
<span class="builtin">print</span>(<span class="identifier">cenas</span>.<span class="function">head</span>())

<span class="comment"># También sirve para buscar varios valores con | (OR)</span>
<span class="identifier">fin_semana</span> = <span class="identifier">df</span>[<span class="identifier">df</span>[<span class="string">'day'</span>].<span class="identifier">str</span>.<span class="function">contains</span>(<span class="string">'Sat|Sun'</span>)]
<span class="builtin">print</span>(<span class="identifier">fin_semana</span>.<span class="function">head</span>())`,
      },
      exercises: [
        {
          id: 'ex-19-2',
          number: 'EJERCICIO 19.2',
          description: 'Usa <span class="inline-code">.str.contains()</span> para filtrar las filas del fin de semana (<span class="inline-code">day</span> es <span class="inline-code">"Sat"</span> o <span class="inline-code">"Sun"</span>). Guarda el resultado en <span class="inline-code">fin_de_semana</span> e imprime las primeras 5 filas.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateStrContains,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Filtra Sat y Sun con .str.contains()
`,
        },
      ],
    },
    {
      icon: '🔄',
      title: '.str.replace(): reemplazar texto',
      content: '<span class="inline-code">.str.replace(valor_viejo, valor_nuevo)</span> reemplaza todas las ocurrencias de un texto por otro. Muy útil para traducir valores, limpiar datos o estandarizar categorías.',
      codeExample: {
        filename: 'str_replace.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'tips.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Reemplazar 'Dinner' por 'Cena' y 'Lunch' por 'Almuerzo'</span>
<span class="identifier">df</span>[<span class="string">'time_es'</span>] = <span class="identifier">df</span>[<span class="string">'time'</span>].<span class="identifier">str</span>.<span class="function">replace</span>(<span class="string">'Dinner'</span>, <span class="string">'Cena'</span>)
<span class="identifier">df</span>[<span class="string">'time_es'</span>] = <span class="identifier">df</span>[<span class="string">'time_es'</span>].<span class="identifier">str</span>.<span class="function">replace</span>(<span class="string">'Lunch'</span>, <span class="string">'Almuerzo'</span>)

<span class="builtin">print</span>(<span class="identifier">df</span>[[<span class="string">'time'</span>, <span class="string">'time_es'</span>]].<span class="function">head</span>())`,
      },
      exercises: [
        {
          id: 'ex-19-3',
          number: 'EJERCICIO 19.3',
          description: 'Crea una columna <span class="inline-code">sex_es</span> traduciendo la columna <span class="inline-code">sex</span>: reemplaza <span class="inline-code">"Male"</span> por <span class="inline-code">"Hombre"</span> y <span class="inline-code">"Female"</span> por <span class="inline-code">"Mujer"</span> usando <span class="inline-code">.str.replace()</span>. Imprime las primeras 5 filas mostrando <span class="inline-code">sex</span> y <span class="inline-code">sex_es</span>.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateStrReplace,
          starterCode: `import pandas as pd

df = pd.read_csv('tips.csv', sep='|')

# Crea la columna sex_es usando .str.replace()
`,
        },
      ],
    },
    {
      icon: '📋',
      title: 'Resumen del accessor .str',
      content: 'Los métodos más usados del accessor <span class="inline-code">.str</span> en Pandas:',
      table: {
        headers: ['Método', 'Qué hace', 'Ejemplo'],
        rows: [
          {
            Método: '.str.lower()',
            'Qué hace': 'Convierte a minúsculas',
            Ejemplo: 'df["day"].str.lower()',
          },
          {
            Método: '.str.upper()',
            'Qué hace': 'Convierte a mayúsculas',
            Ejemplo: 'df["day"].str.upper()',
          },
          {
            Método: '.str.contains()',
            'Qué hace': 'Devuelve True/False si contiene el texto',
            Ejemplo: 'df["day"].str.contains("Sun")',
          },
          {
            Método: '.str.replace()',
            'Qué hace': 'Reemplaza un texto por otro',
            Ejemplo: 'df["sex"].str.replace("Male", "Hombre")',
          },
        ],
      },
    },
  ],

  tipBox: {
    icon: '💡',
    content: '<strong>Tip:</strong> <span class="inline-code">.str.contains()</span> acepta patrones con <span class="inline-code">|</span> para buscar varios valores a la vez: <span class="inline-code">df["day"].str.contains("Sat|Sun")</span> es equivalente a buscar Sat OR Sun.',
  },

  exercises: [],
};
