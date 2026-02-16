import type { Section } from '../../types';
import { IRIS_CSV } from '../module14-pandas-dataframes/irisData';
import {
  validateSelectColumn,
  validateSelectMultipleColumns,
  validateIloc,
} from './validators';

export const module15: Section = {
  id: 14,
  moduleNumber: 'Módulo 15',
  title: 'Pandas 2:',
  titleHighlight: 'iloc/loc y Selección',

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
          id: 'ex-15-1',
          number: 'EJERCICIO 15.1',
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
          id: 'ex-15-2',
          number: 'EJERCICIO 15.2',
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
          id: 'ex-15-3',
          number: 'EJERCICIO 15.3',
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
      content: '<span class="inline-code">.loc[]</span> permite seleccionar filas y columnas usando <strong>nombres</strong>. Es útil cuando quieres seleccionar filas específicas y columnas por su nombre.',
      codeExample: {
        filename: 'loc.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">estudiantes</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'estudiantes.csv'</span>)

<span class="comment"># Seleccionar filas 0 a 5, columna 'nombre'</span>
<span class="builtin">print</span>(<span class="identifier">estudiantes</span>.<span class="identifier">loc</span>[<span class="number">0</span>:<span class="number">5</span>, <span class="string">'nombre'</span>])
<span class="output"># → 0    Ana</span>
<span class="output"># → 1    Carlos</span>
<span class="output"># → ...</span>

<span class="comment"># Seleccionar filas específicas y múltiples columnas</span>
<span class="builtin">print</span>(<span class="identifier">estudiantes</span>.<span class="identifier">loc</span>[<span class="number">0</span>:<span class="number">3</span>, [<span class="string">'nombre'</span>, <span class="string">'edad'</span>]])`,
      },
    },
    {
      icon: '🧠',
      title: 'Reconocer iloc vs loc',
      content: 'Ahora que conoces ambos métodos, es importante saber cuándo usar cada uno. Veamos si puedes identificarlos:',
      quizzes: [
        {
          id: 'quiz-15-1',
          number: 'QUIZ 15.1',
          question: 'Tienes un DataFrame de ventas y quieres seleccionar las primeras 10 filas. ¿Qué código usarías?',
          options: [
            {
              id: 'opt-1',
              text: 'ventas.loc[0:10]',
              isCorrect: false,
              feedback: 'Incorrecto. Aunque loc puede usar números de índice, el rango con loc es inclusivo en ambos extremos. Además, iloc es más apropiado para seleccionar por posición numérica.'
            },
            {
              id: 'opt-2',
              text: 'ventas.iloc[0:10]',
              isCorrect: true,
              feedback: '¡Correcto! iloc es ideal para seleccionar filas por posición numérica. iloc[0:10] selecciona las primeras 10 filas (índices 0 a 9).'
            },
            {
              id: 'opt-3',
              text: 'ventas[0:10]',
              isCorrect: false,
              feedback: 'Incorrecto. Aunque esto funciona, es mejor usar iloc explícitamente para selección por posición, ya que hace el código más claro y legible.'
            },
            {
              id: 'opt-4',
              text: 'ventas.head(10)',
              isCorrect: false,
              feedback: 'Aunque head(10) también funciona para este caso específico, la pregunta busca que identifiques cuándo usar iloc vs loc. Para seleccionar por posición numérica, iloc es la respuesta correcta.'
            },
          ],
        },
        {
          id: 'quiz-15-2',
          number: 'QUIZ 15.2',
          question: 'Quieres seleccionar las filas 10 a 20 pero solo las columnas "nombre" y "edad". ¿Qué método usarías?',
          options: [
            {
              id: 'opt-1',
              text: 'iloc[10:20, ["nombre", "edad"]]',
              isCorrect: false,
              feedback: 'Incorrecto. iloc usa posiciones numéricas para TODO, incluyendo columnas. No acepta nombres de columnas.'
            },
            {
              id: 'opt-2',
              text: 'loc[10:20, ["nombre", "edad"]]',
              isCorrect: true,
              feedback: '¡Correcto! loc permite mezclar índices numéricos de filas con nombres de columnas. Es perfecto para este caso.'
            },
            {
              id: 'opt-3',
              text: 'iloc[10:20, [0, 1]]',
              isCorrect: false,
              feedback: 'Esto funcionaría solo si "nombre" y "edad" son las columnas en posiciones 0 y 1. loc es más claro usando los nombres directamente.'
            },
            {
              id: 'opt-4',
              text: 'Ninguno, necesitas dos pasos',
              isCorrect: false,
              feedback: 'Incorrecto. loc puede hacer ambas selecciones en un solo paso: filas por índice y columnas por nombre.'
            },
          ],
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
