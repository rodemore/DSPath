import type { Section } from '../../types';
import { IRIS_CSV } from './irisData';
import {
  validateLoadDataFrame,
  validateShape,
  validateSelectColumn,
  validateSelectMultipleColumns,
  validateIloc,
  validateLoc,
} from './validators';

export const module13: Section = {
  id: 12,
  moduleNumber: 'Módulo 13',
  title: 'Pandas 1:',
  titleHighlight: 'DataFrames y Selección de Datos',

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
            # Ignoramos todos los parámetros (sep, delimiter, etc.) porque ya está parseado
            return pd._iris_df_cached.copy()
        # Para cualquier otro archivo, lanzar error descriptivo
        raise FileNotFoundError(f"Archivo no encontrado: {filepath_or_buffer}")

    # Reemplazar pd.read_csv con nuestra función personalizada
    pd.read_csv = _custom_read_csv
  `,

  theoryBlocks: [
    {
      icon: '🐼',
      title: '¿Qué es Pandas?',
      content: '<strong>Pandas</strong> es la librería más popular de Python para análisis y manipulación de datos. Es esencial para Data Science y permite trabajar con datos tabulares (como hojas de Excel o tablas de bases de datos) de forma eficiente y sencilla.',
    },
    {
      icon: '📊',
      title: 'DataFrames: Tablas en Python',
      content: 'Un <strong>DataFrame</strong> es la estructura principal de Pandas. Es como una tabla o hoja de Excel: tiene filas y columnas con nombres. Cada columna puede contener un tipo de dato diferente (números, texto, fechas, etc.).',
      codeExample: {
        filename: 'dataframe_concepto.py',
        code: `<span class="comment"># Un DataFrame es como esta tabla:</span>
<span class="comment">#</span>
<span class="comment">#   sepal_length  sepal_width  species</span>
<span class="comment">#   5.1           3.5          setosa</span>
<span class="comment">#   4.9           3.0          setosa</span>
<span class="comment">#   7.0           3.2          versicolor</span>`,
      },
    },
    {
      icon: '📁',
      title: 'Cargar datos con read_csv()',
      content: 'La forma más común de trabajar con Pandas es cargando datos desde un archivo CSV (valores separados por comas). Usamos <span class="inline-code">pd.read_csv()</span> para esto.',
      codeExample: {
        filename: 'cargar_csv.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="comment"># Cargar un archivo CSV de ventas</span>
<span class="identifier">ventas</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'ventas.csv'</span>)

<span class="comment"># El DataFrame ya está cargado en memoria</span>
<span class="comment"># Podemos empezar a explorarlo y trabajar con él</span>`,
      },
    },
    {
      icon: '👀',
      title: 'Explorar el DataFrame: head() y shape',
      content: 'Para ver rápidamente cómo lucen nuestros datos, usamos <span class="inline-code">.head()</span> que muestra las primeras filas. Para saber cuántas filas y columnas tiene, usamos <span class="inline-code">.shape</span>.',
      codeExample: {
        filename: 'explorar.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">estudiantes</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'estudiantes.csv'</span>)

<span class="comment"># Ver las primeras 5 filas (por defecto)</span>
<span class="builtin">print</span>(<span class="identifier">estudiantes</span>.<span class="function">head</span>())

<span class="comment"># Ver dimensiones (filas, columnas)</span>
<span class="builtin">print</span>(<span class="identifier">estudiantes</span>.<span class="identifier">shape</span>)  <span class="output"># → (200, 4)</span>

<span class="comment"># Ver las primeras 10 filas</span>
<span class="builtin">print</span>(<span class="identifier">estudiantes</span>.<span class="function">head</span>(<span class="number">10</span>))`,
      },
      exercises: [
        {
          id: 'ex-13-1',
          number: 'EJERCICIO 13.1',
          description: 'Importa pandas como <span class="inline-code">pd</span> y carga el archivo <span class="inline-code">iris.csv</span> en una variable llamada <span class="inline-code">df</span>.<br><br>Imprime el DataFrame usando <span class="inline-code">print(df.head())</span> para ver las primeras 5 filas.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateLoadDataFrame,
        },
        {
          id: 'ex-13-2',
          number: 'EJERCICIO 13.2',
          description: 'Usa <span class="inline-code">.shape</span> para ver las dimensiones del DataFrame (cuántas filas y columnas tiene). Imprime el resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateShape,
          starterCode: `import pandas as pd

df = pd.read_csv('iris.csv')

# Escribe tu código aquí
`,
        },
      ],
    },
    {
      icon: '📌',
      title: 'Seleccionar una columna',
      content: 'Para trabajar con una sola columna del DataFrame, usamos corchetes con el nombre de la columna. El resultado es una <strong>Serie</strong> (una columna de datos).',
      codeExample: {
        filename: 'seleccionar_columna.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">ventas</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'ventas.csv'</span>)

<span class="comment"># Seleccionar la columna 'producto'</span>
<span class="identifier">productos</span> = <span class="identifier">ventas</span>[<span class="string">'producto'</span>]
<span class="builtin">print</span>(<span class="identifier">productos</span>.<span class="function">head</span>())
<span class="output"># → 0    Laptop</span>
<span class="output"># → 1    Mouse</span>
<span class="output"># → 2    Teclado</span>
<span class="output"># → ...</span>

<span class="comment"># También funciona con punto (si el nombre no tiene espacios)</span>
<span class="identifier">precios</span> = <span class="identifier">ventas</span>.<span class="identifier">precio</span>
<span class="builtin">print</span>(<span class="identifier">precios</span>.<span class="function">head</span>())`,
      },
      exercises: [
        {
          id: 'ex-13-3',
          number: 'EJERCICIO 13.3',
          description: 'Selecciona solo la columna <span class="inline-code">species</span> y guárdala en una variable llamada <span class="inline-code">especies</span>. Imprime las primeras 5 valores con <span class="inline-code">print(especies.head())</span>.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateSelectColumn,
          starterCode: `import pandas as pd

df = pd.read_csv('iris.csv')

# Escribe tu código aquí
`,
        },
      ],
    },
    {
      icon: '📋',
      title: 'Seleccionar múltiples columnas',
      content: 'Para seleccionar varias columnas a la vez, pasamos una <strong>lista</strong> con los nombres de las columnas. El resultado es un nuevo DataFrame con solo esas columnas.',
      codeExample: {
        filename: 'multiples_columnas.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">estudiantes</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'estudiantes.csv'</span>)

<span class="comment"># Seleccionar 2 columnas: doble corchete [[]]</span>
<span class="identifier">datos</span> = <span class="identifier">estudiantes</span>[[<span class="string">'nombre'</span>, <span class="string">'nota'</span>]]
<span class="builtin">print</span>(<span class="identifier">datos</span>.<span class="function">head</span>())
<span class="output">#    nombre      nota</span>
<span class="output"># 0  Ana         85</span>
<span class="output"># 1  Carlos      92</span>
<span class="output"># ...</span>

<span class="comment"># También podemos guardar la lista primero</span>
<span class="identifier">columnas_interes</span> = [<span class="string">'edad'</span>, <span class="string">'ciudad'</span>]
<span class="identifier">demografia</span> = <span class="identifier">estudiantes</span>[<span class="identifier">columnas_interes</span>]
<span class="builtin">print</span>(<span class="identifier">demografia</span>.<span class="function">head</span>())`,
      },
      exercises: [
        {
          id: 'ex-13-4',
          number: 'EJERCICIO 13.4',
          description: 'Selecciona las columnas <span class="inline-code">sepal_length</span> y <span class="inline-code">sepal_width</span> (recuerda usar doble corchete). Guarda el resultado en <span class="inline-code">sepalos</span> e imprime las primeras 5 filas.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateSelectMultipleColumns,
          starterCode: `import pandas as pd

df = pd.read_csv('iris.csv')

# Escribe tu código aquí
`,
        },
      ],
    },
    {
      icon: '🔢',
      title: 'iloc: Selección por posición',
      content: '<span class="inline-code">.iloc[]</span> permite seleccionar filas y columnas usando <strong>índices numéricos</strong> (posiciones). Es como trabajar con listas: el primer elemento es 0, el segundo es 1, etc.',
      codeExample: {
        filename: 'iloc.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">ventas</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'ventas.csv'</span>)

<span class="comment"># Seleccionar la primera fila (índice 0)</span>
<span class="builtin">print</span>(<span class="identifier">ventas</span>.<span class="identifier">iloc</span>[<span class="number">0</span>])
<span class="output"># → producto    Laptop</span>
<span class="output"># → precio      1200</span>
<span class="output"># → ...</span>

<span class="comment"># Seleccionar las primeras 3 filas</span>
<span class="builtin">print</span>(<span class="identifier">ventas</span>.<span class="identifier">iloc</span>[<span class="number">0</span>:<span class="number">3</span>])

<span class="comment"># Seleccionar filas 5 a 10</span>
<span class="builtin">print</span>(<span class="identifier">ventas</span>.<span class="identifier">iloc</span>[<span class="number">5</span>:<span class="number">10</span>])

<span class="comment"># Seleccionar fila 0, columna 1</span>
<span class="builtin">print</span>(<span class="identifier">ventas</span>.<span class="identifier">iloc</span>[<span class="number">0</span>, <span class="number">1</span>])  <span class="output"># → 1200</span>`,
      },
      exercises: [
        {
          id: 'ex-13-5',
          number: 'EJERCICIO 13.5',
          description: 'Usa <span class="inline-code">iloc</span> para seleccionar las filas de la 5 a la 10 (índices 5 a 9). Guarda el resultado en <span class="inline-code">subset</span> e imprímelo.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateIloc,
          starterCode: `import pandas as pd

df = pd.read_csv('iris.csv')

# Escribe tu código aquí
`,
        },
      ],
    },
    {
      icon: '🏷️',
      title: 'loc: Selección por etiqueta',
      content: '<span class="inline-code">.loc[]</span> permite seleccionar filas y columnas usando <strong>nombres</strong> o <strong>condiciones</strong>. Es más intuitivo cuando sabemos los nombres de las columnas o queremos filtrar datos.',
      codeExample: {
        filename: 'loc.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">estudiantes</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'estudiantes.csv'</span>)

<span class="comment"># Seleccionar filas 0 a 5, columna 'nombre'</span>
<span class="builtin">print</span>(<span class="identifier">estudiantes</span>.<span class="identifier">loc</span>[<span class="number">0</span>:<span class="number">5</span>, <span class="string">'nombre'</span>])
<span class="output"># → 0    Ana</span>
<span class="output"># → 1    Carlos</span>
<span class="output"># → ...</span>

<span class="comment"># Filtrar: solo estudiantes de Quito</span>
<span class="identifier">quito</span> = <span class="identifier">estudiantes</span>.<span class="identifier">loc</span>[<span class="identifier">estudiantes</span>[<span class="string">'ciudad'</span>] == <span class="string">'Quito'</span>]
<span class="builtin">print</span>(<span class="identifier">quito</span>.<span class="function">head</span>())

<span class="comment"># Filtrar: nota mayor a 80</span>
<span class="identifier">aprobados</span> = <span class="identifier">estudiantes</span>.<span class="identifier">loc</span>[<span class="identifier">estudiantes</span>[<span class="string">'nota'</span>] > <span class="number">80</span>]
<span class="builtin">print</span>(<span class="identifier">aprobados</span>.<span class="function">head</span>())`,
      },
      exercises: [
        {
          id: 'ex-13-6',
          number: 'EJERCICIO 13.6',
          description: 'Usa <span class="inline-code">loc</span> para filtrar solo las flores de la especie <span class="inline-code">virginica</span>. Guarda el resultado en <span class="inline-code">virginicas</span> e imprime las primeras 5 filas.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateLoc,
          starterCode: `import pandas as pd

df = pd.read_csv('iris.csv')

# Escribe tu código aquí
`,
        },
      ],
    },
  ],

  tipBox: {
    icon: '💡',
    content: '<strong>Diferencia clave:</strong> <span class="inline-code">iloc</span> usa números (posiciones), <span class="inline-code">loc</span> usa nombres y condiciones. Para empezar, <span class="inline-code">loc</span> es más intuitivo.',
  },

  exercises: [],
};
