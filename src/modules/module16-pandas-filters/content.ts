import type { Section } from '../../types';
import { IRIS_CSV } from '../module14-pandas-dataframes/irisData';
import {
  validateSimpleFilter,
  validateAndFilter,
  validateOrFilter,
  validateNotFilter,
} from './validators';

export const module16: Section = {
  id: 15,
  moduleNumber: 'Módulo 16',
  title: 'Pandas 3:',
  titleHighlight: 'Filtros con Condiciones',

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
      icon: '🔍',
      title: 'Filtrar datos con condiciones',
      content:
        'Una de las tareas más comunes en análisis de datos es <strong>filtrar</strong> filas que cumplan ciertas condiciones. En Pandas usamos <span class="inline-code">loc</span> con condiciones lógicas para esto.',
      codeExample: {
        filename: 'filtro_simple.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">estudiantes</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'estudiantes.csv'</span>)

<span class="comment"># Filtrar: solo estudiantes con nota mayor a 80</span>
<span class="identifier">aprobados</span> = <span class="identifier">estudiantes</span>.<span class="identifier">loc</span>[<span class="identifier">estudiantes</span>[<span class="string">'nota'</span>] > <span class="number">80</span>]
<span class="builtin">print</span>(<span class="identifier">aprobados</span>)

<span class="comment"># Filtrar: solo estudiantes de Quito</span>
<span class="identifier">quito</span> = <span class="identifier">estudiantes</span>.<span class="identifier">loc</span>[<span class="identifier">estudiantes</span>[<span class="string">'ciudad'</span>] == <span class="string">'Quito'</span>]
<span class="builtin">print</span>(<span class="identifier">quito</span>)`,
      },
      exercises: [
        {
          id: 'ex-16-1',
          number: 'EJERCICIO 16.1',
          description:
            'Filtra las flores con <span class="inline-code">sepal_length</span> mayor a 6.0. Guarda el resultado en <span class="inline-code">flores_grandes</span> e imprime las primeras 5 filas.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateSimpleFilter,
          starterCode: `import pandas as pd

df = pd.read_csv('iris.csv')

# Escribe tu código aquí
`,
        },
      ],
    },
    {
      icon: '⚙️',
      title: 'Operadores lógicos en Pandas',
      content:
        'Para combinar múltiples condiciones, Pandas usa operadores especiales diferentes a los de Python normal:',
      table: {
        headers: ['Operador', 'Símbolo en Pandas', 'Ejemplo', 'Significado'],
        rows: [
          {
            Operador: 'AND (y)',
            'Símbolo en Pandas': '&',
            Ejemplo: '(df["edad"] > 18) & (df["ciudad"] == "Quito")',
            Significado: 'Ambas condiciones deben cumplirse',
          },
          {
            Operador: 'OR (o)',
            'Símbolo en Pandas': '|',
            Ejemplo: '(df["nota"] > 90) | (df["nota"] < 50)',
            Significado: 'Al menos una condición debe cumplirse',
          },
          {
            Operador: 'NOT (no)',
            'Símbolo en Pandas': '~',
            Ejemplo: '~(df["ciudad"] == "Quito")',
            Significado: 'Niega la condición (lo opuesto)',
          },
        ],
      },
    },
    {
      icon: '➕',
      title: 'Operador AND (&): Ambas condiciones',
      content:
        'El operador <span class="inline-code">&</span> filtra filas donde <strong>ambas</strong> condiciones son verdaderas. <strong>Importante:</strong> Cada condición debe estar entre paréntesis.',
      codeExample: {
        filename: 'filtro_and.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">estudiantes</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'estudiantes.csv'</span>)

<span class="comment"># Filtrar: edad mayor a 18 Y ciudad es Quito</span>
<span class="identifier">adultos_quito</span> = <span class="identifier">estudiantes</span>.<span class="identifier">loc</span>[
    (<span class="identifier">estudiantes</span>[<span class="string">'edad'</span>] > <span class="number">18</span>) &
    (<span class="identifier">estudiantes</span>[<span class="string">'ciudad'</span>] == <span class="string">'Quito'</span>)
]
<span class="builtin">print</span>(<span class="identifier">adultos_quito</span>)`,
      },
      exercises: [
        {
          id: 'ex-16-2',
          number: 'EJERCICIO 16.2',
          description:
            'Filtra las flores que sean de la especie <span class="inline-code">setosa</span> Y que tengan <span class="inline-code">petal_length</span> mayor a 1.5. Guarda el resultado en <span class="inline-code">setosa_grandes</span> e imprime.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateAndFilter,
          starterCode: `import pandas as pd

df = pd.read_csv('iris.csv')

# Escribe tu código aquí (usa & y paréntesis)
`,
        },
      ],
    },
    {
      icon: '🔀',
      title: 'Operador OR (|): Al menos una condición',
      content:
        'El operador <span class="inline-code">|</span> filtra filas donde <strong>al menos una</strong> de las condiciones es verdadera.',
      codeExample: {
        filename: 'filtro_or.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">estudiantes</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'estudiantes.csv'</span>)

<span class="comment"># Filtrar: nota muy alta O muy baja</span>
<span class="identifier">extremos</span> = <span class="identifier">estudiantes</span>.<span class="identifier">loc</span>[
    (<span class="identifier">estudiantes</span>[<span class="string">'nota'</span>] > <span class="number">90</span>) |
    (<span class="identifier">estudiantes</span>[<span class="string">'nota'</span>] < <span class="number">50</span>)
]
<span class="builtin">print</span>(<span class="identifier">extremos</span>)`,
      },
      exercises: [
        {
          id: 'ex-16-3',
          number: 'EJERCICIO 16.3',
          description:
            'Filtra las flores que sean de la especie <span class="inline-code">setosa</span> O de la especie <span class="inline-code">virginica</span>. Guarda el resultado en <span class="inline-code">dos_especies</span> e imprime las primeras 5 filas.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateOrFilter,
          starterCode: `import pandas as pd

df = pd.read_csv('iris.csv')

# Escribe tu código aquí (usa | y paréntesis)
`,
        },
      ],
    },
    {
      icon: '🚫',
      title: 'Operador NOT (~): Negar una condición',
      content:
        'El operador <span class="inline-code">~</span> niega una condición, es decir, selecciona lo opuesto.',
      codeExample: {
        filename: 'filtro_not.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">estudiantes</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'estudiantes.csv'</span>)

<span class="comment"># Filtrar: estudiantes que NO son de Quito</span>
<span class="identifier">no_quito</span> = <span class="identifier">estudiantes</span>.<span class="identifier">loc</span>[
    ~(<span class="identifier">estudiantes</span>[<span class="string">'ciudad'</span>] == <span class="string">'Quito'</span>)
]
<span class="builtin">print</span>(<span class="identifier">no_quito</span>)

<span class="comment"># Equivalente a:</span>
<span class="identifier">no_quito</span> = <span class="identifier">estudiantes</span>.<span class="identifier">loc</span>[<span class="identifier">estudiantes</span>[<span class="string">'ciudad'</span>] != <span class="string">'Quito'</span>]`,
      },
      exercises: [
        {
          id: 'ex-16-4',
          number: 'EJERCICIO 16.4',
          description:
            'Filtra las flores que NO sean de la especie <span class="inline-code">versicolor</span>. Guarda el resultado en <span class="inline-code">no_versicolor</span> e imprime las primeras 5 filas.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateNotFilter,
          starterCode: `import pandas as pd

df = pd.read_csv('iris.csv')

# Escribe tu código aquí (usa ~ o !=)
`,
        },
      ],
    },
  ],

  tipBox: {
    icon: '💡',
    content:
      '<strong>Recuerda:</strong> En Pandas usa <span class="inline-code">&</span> para AND, <span class="inline-code">|</span> para OR, y <span class="inline-code">~</span> para NOT. Siempre pon cada condición entre paréntesis.',
  },

  exercises: [],
};
