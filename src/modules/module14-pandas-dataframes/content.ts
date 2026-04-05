import type { Section } from '../../types';
import { IRIS_CSV } from './irisData';
import { TIPS_CSV } from './tipsData';
import { validateLoadDataFrame, validateShape, validateReadCsvWithSep } from './validators';

export const module14: Section = {
  id: 13,
  moduleNumber: 'Módulo 14',
  title: 'Pandas 1:',
  titleHighlight: 'Lectura de DataFrames',

  // Código que se ejecuta antes de cada ejercicio (invisible para el estudiante)
  initialCode: `
import pandas as pd
from io import StringIO

# Dataset Iris precargado como string
_iris_csv_data = """${IRIS_CSV}"""

# Dataset Tips precargado con separador |
_tips_csv_data = """${TIPS_CSV}"""

# Solo crear los DataFrames y hacer el monkey patch si no existe ya
if not hasattr(pd, '_iris_df_cached'):
    # Crear el DataFrame de Iris UNA SOLA VEZ
    pd._iris_df_cached = pd.read_csv(StringIO(_iris_csv_data))

    # Crear el DataFrame de Tips UNA SOLA VEZ
    pd._tips_df_cached = pd.read_csv(StringIO(_tips_csv_data), sep='|')

    # Guardar la función original
    pd._original_read_csv = pd.read_csv

    # Monkey patch para interceptar archivos específicos
    def _custom_read_csv(filepath_or_buffer, *args, **kwargs):
        if isinstance(filepath_or_buffer, str):
            if filepath_or_buffer == 'iris.csv':
                # Retornar una COPIA del DataFrame de iris precargado
                return pd._iris_df_cached.copy()
            elif filepath_or_buffer == 'tips.csv':
                # Retornar una COPIA del DataFrame de tips precargado
                return pd._tips_df_cached.copy()
        # Para cualquier otro archivo, lanzar error descriptivo
        raise FileNotFoundError(f"Archivo no encontrado: {filepath_or_buffer}")

    # Reemplazar pd.read_csv con nuestra función personalizada
    pd.read_csv = _custom_read_csv
  `,

  theoryBlocks: [
    {
      icon: '🐼',
      title: '¿Qué es Pandas?',
      content:
        '<strong>Pandas</strong> es la librería más popular de Python para análisis y manipulación de datos. Es esencial para Data Science y permite trabajar con datos tabulares (como hojas de Excel o tablas de bases de datos) de forma eficiente y sencilla.',
    },
    {
      icon: '📊',
      title: 'DataFrames: Tablas en Python',
      content:
        'Un <strong>DataFrame</strong> es la estructura principal de Pandas. Es como una tabla o hoja de Excel: tiene filas y columnas con nombres. Cada columna puede contener un tipo de dato diferente (números, texto, fechas, etc.).',
      codeExample: {
        filename: 'dataframe_concepto.py',
        code: `<span class="comment"># Un DataFrame es como esta tabla:</span>
<span class="comment">#</span>
<span class="comment">#   total_bill  tip   sex     smoker</span>
<span class="comment">#   16.99       1.01  Female  No</span>
<span class="comment">#   10.34       1.66  Male    No</span>
<span class="comment">#   21.01       3.50  Male    No</span>`,
      },
    },
    {
      icon: '📁',
      title: 'Cargar datos con read_csv()',
      content:
        'La forma más común de trabajar con Pandas es cargando datos desde un archivo CSV (valores separados por comas). Usamos <span class="inline-code">pd.read_csv()</span> para esto.',
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
      content:
        'Para ver rápidamente cómo lucen nuestros datos, usamos <span class="inline-code">.head()</span> que muestra las primeras filas. Para saber cuántas filas y columnas tiene, usamos <span class="inline-code">.shape</span>.',
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
          id: 'ex-14-1',
          number: 'EJERCICIO 14.1',
          description:
            'Importa pandas como <span class="inline-code">pd</span> y carga el archivo <span class="inline-code">iris.csv</span> en una variable llamada <span class="inline-code">df</span>.<br><br>Imprime el DataFrame usando <span class="inline-code">print(df.head())</span> para ver las primeras 5 filas.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateLoadDataFrame,
        },
        {
          id: 'ex-14-2',
          number: 'EJERCICIO 14.2',
          description:
            'Usa <span class="inline-code">.shape</span> para ver las dimensiones del DataFrame (cuántas filas y columnas tiene). Imprime el resultado.',
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
      icon: '📄',
      title: 'Formatos de archivos en Pandas',
      content:
        'Pandas puede leer múltiples formatos de archivos. Los más comunes son CSV y Excel. Cada uno tiene su función específica.',
      table: {
        headers: ['Formato', 'Función', 'Ejemplo de uso', 'Cuándo usarlo'],
        rows: [
          {
            Formato: 'CSV',
            Función: 'pd.read_csv()',
            'Ejemplo de uso': 'pd.read_csv("datos.csv")',
            'Cuándo usarlo': 'Archivos de texto con valores separados por comas',
          },
          {
            Formato: 'Excel',
            Función: 'pd.read_excel()',
            'Ejemplo de uso': 'pd.read_excel("datos.xlsx")',
            'Cuándo usarlo': 'Archivos de Microsoft Excel (.xlsx, .xls)',
          },
        ],
      },
    },
    {
      icon: '🔧',
      title: 'El parámetro sep: Archivos con otros separadores',
      content:
        'No todos los archivos CSV usan comas como separador. Algunos usan <strong>punto y coma (;)</strong>, <strong>tabulaciones (\\t)</strong>, o <strong>pipes (|)</strong>. Para estos casos, usamos el parámetro <span class="inline-code">sep</span>.',
      codeExample: {
        filename: 'sep_parameter.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="comment"># Archivo separado por comas (por defecto)</span>
<span class="identifier">df1</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'datos.csv'</span>)

<span class="comment"># Archivo separado por punto y coma</span>
<span class="identifier">df2</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'datos.csv'</span>, sep=<span class="string">';'</span>)

<span class="comment"># Archivo separado por pipe |</span>
<span class="identifier">df3</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'datos.csv'</span>, sep=<span class="string">'|'</span>)

<span class="comment"># Archivo separado por tabulaciones</span>
<span class="identifier">df4</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'datos.tsv'</span>, sep=<span class="string">'\\t'</span>)`,
      },
    },
    {
      icon: '💡',
      title: '¿Cómo se ve un archivo con separador diferente?',
      content:
        'Veamos cómo luce un archivo CSV con separador <span class="inline-code">|</span> (pipe) en lugar de comas:',
      codeExample: {
        filename: 'tips_pipe.txt',
        code: `<span class="comment"># Contenido de tips.csv (separado por |)</span>
<span class="identifier">total_bill|tip|sex|smoker|day|time|size</span>
<span class="number">16.99</span>|<span class="number">1.01</span>|Female|No|Sun|Dinner|<span class="number">2</span>
<span class="number">10.34</span>|<span class="number">1.66</span>|Male|No|Sun|Dinner|<span class="number">3</span>
<span class="number">21.01</span>|<span class="number">3.50</span>|Male|No|Sun|Dinner|<span class="number">3</span>

<span class="comment"># Si intentamos leerlo sin especificar sep='|'</span>
<span class="comment"># Pandas pensará que todo es una sola columna!</span>
<span class="comment"># Por eso DEBEMOS usar: pd.read_csv('tips.csv', sep='|')</span>`,
      },
      exercises: [
        {
          id: 'ex-14-3',
          number: 'EJERCICIO 14.3',
          description:
            'El archivo <span class="inline-code">tips.csv</span> está separado por pipes (<span class="inline-code">|</span>) en lugar de comas.<br><br>Carga el archivo usando <span class="inline-code">pd.read_csv()</span> con el parámetro <span class="inline-code">sep="|"</span>. Guárdalo en una variable <span class="inline-code">tips</span> e imprime las primeras 5 filas con <span class="inline-code">.head()</span>.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateReadCsvWithSep,
        },
      ],
    },
  ],

  tipBox: {
    icon: '💡',
    content:
      '<strong>Recuerda:</strong> Siempre usa <span class="inline-code">.head()</span> después de cargar un archivo para verificar que se cargó correctamente. Si ves todas las columnas en una sola, probablemente necesitas ajustar el parámetro <span class="inline-code">sep</span>.',
  },

  exercises: [],
};
