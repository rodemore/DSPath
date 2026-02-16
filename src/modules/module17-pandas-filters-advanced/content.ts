import type { Section } from '../../types';
import { IRIS_CSV } from '../module14-pandas-dataframes/irisData';
import {
  validateIsin,
  validateBetween,
  validateQuery,
} from './validators';

export const module17: Section = {
  id: 16,
  moduleNumber: 'Módulo 17',
  title: 'Pandas 4:',
  titleHighlight: 'Filtros Avanzados',

  // Código que se ejecuta antes de cada ejercicio (invisible para el estudiante)
  initialCode: `
import pandas as pd
from io import StringIO

# Dataset Iris precargado como string
_iris_csv_data = """${IRIS_CSV}"""

# Solo crear el DataFrame y hacer el monkey patch si no existe ya
if not hasattr(pd, '_iris_df_cached'):
    # Crear el DataFrame UNA SOLA VEZ
    pd._iris_df_cached = pd.read_csv(StringIO(_iris_csv_data))

    # Guardar la función original
    pd._original_read_csv = pd.read_csv

    # Monkey patch para interceptar solo 'iris.csv'
    def _custom_read_csv(filepath_or_buffer, *args, **kwargs):
        if isinstance(filepath_or_buffer, str) and filepath_or_buffer == 'iris.csv':
            # Retornar una COPIA del DataFrame precargado
            return pd._iris_df_cached.copy()
        # Para cualquier otro archivo, lanzar error descriptivo
        raise FileNotFoundError(f"Archivo no encontrado: {filepath_or_buffer}")

    # Reemplazar pd.read_csv con nuestra función personalizada
    pd.read_csv = _custom_read_csv
  `,

  theoryBlocks: [
    {
      icon: '📋',
      title: 'isin(): Filtrar con lista de valores',
      content: 'El método <span class="inline-code">.isin()</span> permite filtrar filas donde una columna tenga cualquiera de los valores de una lista. Es más limpio que usar múltiples condiciones con OR.',
      codeExample: {
        filename: 'isin.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">estudiantes</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'estudiantes.csv'</span>)

<span class="comment"># ❌ Forma larga con OR:</span>
<span class="identifier">resultado</span> = <span class="identifier">estudiantes</span>.<span class="identifier">loc</span>[
    (<span class="identifier">estudiantes</span>[<span class="string">'ciudad'</span>] == <span class="string">'Quito'</span>) |
    (<span class="identifier">estudiantes</span>[<span class="string">'ciudad'</span>] == <span class="string">'Guayaquil'</span>) |
    (<span class="identifier">estudiantes</span>[<span class="string">'ciudad'</span>] == <span class="string">'Cuenca'</span>)
]

<span class="comment"># ✅ Forma corta con isin():</span>
<span class="identifier">ciudades</span> = [<span class="string">'Quito'</span>, <span class="string">'Guayaquil'</span>, <span class="string">'Cuenca'</span>]
<span class="identifier">resultado</span> = <span class="identifier">estudiantes</span>[<span class="identifier">estudiantes</span>[<span class="string">'ciudad'</span>].<span class="function">isin</span>(<span class="identifier">ciudades</span>)]
<span class="builtin">print</span>(<span class="identifier">resultado</span>)`,
      },
      exercises: [
        {
          id: 'ex-17-1',
          number: 'EJERCICIO 17.1',
          description: 'Filtra las flores que sean de las especies <span class="inline-code">setosa</span> o <span class="inline-code">virginica</span> usando <span class="inline-code">.isin()</span>. Guarda el resultado en <span class="inline-code">dos_especies</span> e imprime las primeras 5 filas.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateIsin,
          starterCode: `import pandas as pd

df = pd.read_csv('iris.csv')

# Escribe tu código aquí usando .isin()
`,
        },
      ],
    },
    {
      icon: '↔️',
      title: 'between(): Filtrar rangos de valores',
      content: 'El método <span class="inline-code">.between()</span> filtra valores que estén dentro de un rango. Es más claro que usar dos condiciones con AND.',
      codeExample: {
        filename: 'between.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">estudiantes</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'estudiantes.csv'</span>)

<span class="comment"># ❌ Forma larga con AND:</span>
<span class="identifier">resultado</span> = <span class="identifier">estudiantes</span>.<span class="identifier">loc</span>[
    (<span class="identifier">estudiantes</span>[<span class="string">'edad'</span>] >= <span class="number">18</span>) &
    (<span class="identifier">estudiantes</span>[<span class="string">'edad'</span>] <= <span class="number">25</span>)
]

<span class="comment"># ✅ Forma corta con between():</span>
<span class="identifier">resultado</span> = <span class="identifier">estudiantes</span>[<span class="identifier">estudiantes</span>[<span class="string">'edad'</span>].<span class="function">between</span>(<span class="number">18</span>, <span class="number">25</span>)]
<span class="builtin">print</span>(<span class="identifier">resultado</span>)

<span class="comment"># Por defecto, between() es inclusivo en ambos extremos</span>
<span class="comment"># between(18, 25) incluye 18 y 25</span>`,
      },
      exercises: [
        {
          id: 'ex-17-2',
          number: 'EJERCICIO 17.2',
          description: 'Filtra las flores con <span class="inline-code">sepal_length</span> entre 5.0 y 6.0 (inclusivo) usando <span class="inline-code">.between()</span>. Guarda el resultado en <span class="inline-code">rango_medio</span> e imprime las primeras 5 filas.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateBetween,
          starterCode: `import pandas as pd

df = pd.read_csv('iris.csv')

# Escribe tu código aquí usando .between()
`,
        },
      ],
    },
    {
      icon: '🔎',
      title: 'query(): Filtrar con strings (SQL-like)',
      content: 'El método <span class="inline-code">.query()</span> permite escribir filtros como strings, similar a SQL. Es muy útil para filtros complejos y hace el código más legible. <strong>Importante:</strong> Usa <span class="inline-code">and</span>, <span class="inline-code">or</span>, <span class="inline-code">not</span> en minúsculas (no AND, OR, NOT).',
      codeExample: {
        filename: 'query.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">estudiantes</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'estudiantes.csv'</span>)

<span class="comment"># ❌ Forma tradicional:</span>
<span class="identifier">resultado</span> = <span class="identifier">estudiantes</span>.<span class="identifier">loc</span>[
    (<span class="identifier">estudiantes</span>[<span class="string">'edad'</span>] > <span class="number">18</span>) &
    (<span class="identifier">estudiantes</span>[<span class="string">'nota'</span>] >= <span class="number">80</span>)
]

<span class="comment"># ✅ Forma con query() (más legible):</span>
<span class="identifier">resultado</span> = <span class="identifier">estudiantes</span>.<span class="function">query</span>(<span class="string">'edad > 18 and nota >= 80'</span>)
<span class="builtin">print</span>(<span class="identifier">resultado</span>)

<span class="comment"># Puedes usar and, or, not en lugar de &, |, ~</span>
<span class="identifier">resultado</span> = <span class="identifier">estudiantes</span>.<span class="function">query</span>(<span class="string">'ciudad == "Quito" or ciudad == "Cuenca"'</span>)
<span class="builtin">print</span>(<span class="identifier">resultado</span>)`,
      },
      exercises: [
        {
          id: 'ex-17-3',
          number: 'EJERCICIO 17.3',
          description: 'Usa <span class="inline-code">.query()</span> para filtrar flores con <span class="inline-code">petal_length > 4</span> Y <span class="inline-code">petal_width > 1.5</span>. Recuerda usar <span class="inline-code">and</span> en minúsculas dentro del query. Guarda el resultado en <span class="inline-code">petalos_grandes</span> e imprime las primeras 5 filas.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateQuery,
          starterCode: `import pandas as pd

df = pd.read_csv('iris.csv')

# Escribe tu código aquí usando .query()
`,
        },
      ],
    },
    {
      icon: '📊',
      title: 'Comparación de métodos de filtrado',
      content: 'Cada método tiene sus ventajas. Aquí un resumen de cuándo usar cada uno:',
      table: {
        headers: ['Método', 'Cuándo usarlo', 'Ventaja', 'Ejemplo'],
        rows: [
          {
            Método: 'loc con & y |',
            'Cuándo usarlo': 'Filtros simples con 1-2 condiciones',
            Ventaja: 'Más control y tradicional',
            Ejemplo: 'df.loc[(df["edad"] > 18) & (df["nota"] > 80)]'
          },
          {
            Método: 'isin()',
            'Cuándo usarlo': 'Filtrar por lista de valores',
            Ventaja: 'Más limpio que múltiples OR',
            Ejemplo: 'df[df["ciudad"].isin(["Quito", "Cuenca"])]'
          },
          {
            Método: 'between()',
            'Cuándo usarlo': 'Filtrar por rango numérico',
            Ventaja: 'Más claro que dos condiciones',
            Ejemplo: 'df[df["edad"].between(18, 25)]'
          },
          {
            Método: 'query()',
            'Cuándo usarlo': 'Filtros complejos con múltiples condiciones',
            Ventaja: 'Muy legible, similar a SQL',
            Ejemplo: 'df.query("edad > 18 and nota >= 80")'
          },
        ],
      },
    },
  ],

  tipBox: {
    icon: '💡',
    content: '<strong>Tip profesional:</strong> Para filtros simples usa <span class="inline-code">loc</span>, para listas usa <span class="inline-code">isin()</span>, para rangos usa <span class="inline-code">between()</span>, y para filtros complejos usa <span class="inline-code">query()</span>.',
  },

  exercises: [],
};
