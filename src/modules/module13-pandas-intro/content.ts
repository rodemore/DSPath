import type { Section } from '../../types';

export const module13: Section = {
  id: 12,
  moduleNumber: 'Módulo 13',
  title: 'Pandas 0:',
  titleHighlight: 'Introducción a Pandas',

  initialCode: ``,

  theoryBlocks: [
    {
      icon: '🐼',
      title: '¿Qué es Pandas?',
      content: '<strong>Pandas</strong> es la librería más popular de Python para análisis y manipulación de datos. Su nombre viene de "Panel Data" (datos en panel) y es fundamental en Data Science, Machine Learning y Análisis de Datos.',
    },
    {
      icon: '🎯',
      title: '¿Por qué Pandas es importante?',
      content: 'Pandas te permite trabajar con datos tabulares (como hojas de Excel o tablas de bases de datos) de forma eficiente. Es usado por millones de científicos de datos, analistas y desarrolladores en todo el mundo para:',
      table: {
        headers: ['Tarea', 'Descripción', 'Ejemplo'],
        rows: [
          {
            Tarea: 'Leer datos',
            Descripción: 'Cargar datos desde CSV, Excel, SQL, JSON',
            Ejemplo: 'Importar ventas desde Excel'
          },
          {
            Tarea: 'Limpiar datos',
            Descripción: 'Manejar valores faltantes, duplicados',
            Ejemplo: 'Eliminar filas vacías'
          },
          {
            Tarea: 'Analizar datos',
            Descripción: 'Calcular estadísticas, agrupar, filtrar',
            Ejemplo: 'Promedio de ventas por mes'
          },
          {
            Tarea: 'Transformar datos',
            Descripción: 'Crear nuevas columnas, fusionar tablas',
            Ejemplo: 'Calcular totales con IVA'
          },
        ],
      },
    },
    {
      icon: '📦',
      title: 'Instalar Pandas',
      content: 'Para usar Pandas, primero debes instalarlo (generalmente viene incluido con Anaconda). Si no lo tienes, instálalo con pip:',
      terminalCommand: {
        command: 'pip install pandas',
        description: 'Ejecuta este comando en tu terminal una sola vez para instalar Pandas'
      },
    },
    {
      icon: '⚙️',
      title: 'Importar Pandas',
      content: 'Una vez instalado, debes importar Pandas en tu código Python. La convención universal es usar el alias <span class="inline-code">pd</span>:',
      codeExample: {
        filename: 'importar_pandas.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="comment"># La convención es usar el alias 'pd'</span>
<span class="comment"># Esto te permite escribir pd.read_csv() en lugar de pandas.read_csv()</span>`,
      },
    },
    {
      icon: '📊',
      title: 'Estructuras principales de Pandas',
      content: 'Pandas tiene dos estructuras de datos fundamentales: <strong>Series</strong> y <strong>DataFrame</strong>. Es crucial entender la diferencia entre ambas.',
    },
    {
      icon: '📋',
      title: 'DataFrame: Tablas completas',
      content: 'Un <strong>DataFrame</strong> es una tabla bidimensional con filas y columnas. Es similar a una hoja de Excel o una tabla de base de datos. Cada columna puede tener un tipo de dato diferente (números, texto, fechas, etc.).',
      codeExample: {
        filename: 'dataframe.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="comment"># Ejemplo visual de un DataFrame:</span>
<span class="comment">#</span>
<span class="comment">#        nombre    edad    ciudad      salario</span>
<span class="comment">#    0   Ana       25      Quito       1200.50</span>
<span class="comment">#    1   Carlos    30      Guayaquil   1500.00</span>
<span class="comment">#    2   María     28      Cuenca      1350.75</span>
<span class="comment">#</span>
<span class="comment"># - Tiene FILAS (índices: 0, 1, 2)</span>
<span class="comment"># - Tiene COLUMNAS (nombre, edad, ciudad, salario)</span>
<span class="comment"># - Es bidimensional (2D)</span>`,
      },
      quizzes: [
        {
          id: 'quiz-13-1',
          number: 'QUIZ 13.1',
          question: '¿Qué es un DataFrame en Pandas?',
          options: [
            {
              id: 'opt-1',
              text: 'Una lista de Python con números',
              isCorrect: false,
              feedback: 'Incorrecto. Un DataFrame no es una lista de Python, es una estructura de Pandas específicamente diseñada para datos tabulares.'
            },
            {
              id: 'opt-2',
              text: 'Una tabla bidimensional con filas y columnas',
              isCorrect: true,
              feedback: '¡Exacto! Un DataFrame es como una hoja de Excel: tiene filas y columnas, y puede contener diferentes tipos de datos.'
            },
            {
              id: 'opt-3',
              text: 'Una función para leer archivos',
              isCorrect: false,
              feedback: 'Incorrecto. pd.read_csv() es una función para leer archivos, pero un DataFrame es la estructura que contiene los datos.'
            },
            {
              id: 'opt-4',
              text: 'Un tipo de gráfico',
              isCorrect: false,
              feedback: 'Incorrecto. Un DataFrame no es un tipo de gráfico, es una estructura de datos en forma de tabla.'
            },
          ],
        },
      ],
    },
    {
      icon: '📏',
      title: 'Series: Una sola columna',
      content: 'Una <strong>Serie</strong> es una estructura unidimensional que representa una sola columna de datos. Cuando seleccionas una columna de un DataFrame, obtienes una Serie.',
      codeExample: {
        filename: 'series.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="comment"># Ejemplo visual de una Serie:</span>
<span class="comment">#</span>
<span class="comment">#    0    Ana</span>
<span class="comment">#    1    Carlos</span>
<span class="comment">#    2    María</span>
<span class="comment">#    Name: nombre, dtype: object</span>
<span class="comment">#</span>
<span class="comment"># - Solo una COLUMNA de datos</span>
<span class="comment"># - Tiene índices (0, 1, 2)</span>
<span class="comment"># - Es unidimensional (1D)</span>

<span class="comment"># Cuando haces df['nombre'], obtienes una Serie</span>`,
      },
      quizzes: [
        {
          id: 'quiz-13-2',
          number: 'QUIZ 13.2',
          question: '¿Cuál es la diferencia principal entre un DataFrame y una Serie?',
          options: [
            {
              id: 'opt-1',
              text: 'Un DataFrame es más rápido que una Serie',
              isCorrect: false,
              feedback: 'Incorrecto. La diferencia no está en la velocidad, sino en la estructura dimensional.'
            },
            {
              id: 'opt-2',
              text: 'Un DataFrame tiene filas y columnas (2D), una Serie solo tiene una columna (1D)',
              isCorrect: true,
              feedback: '¡Perfecto! Un DataFrame es bidimensional (como una tabla completa), mientras que una Serie es unidimensional (solo una columna).'
            },
            {
              id: 'opt-3',
              text: 'Una Serie solo puede contener números',
              isCorrect: false,
              feedback: 'Incorrecto. Una Serie puede contener cualquier tipo de dato (números, texto, fechas, etc.).'
            },
            {
              id: 'opt-4',
              text: 'No hay ninguna diferencia',
              isCorrect: false,
              feedback: 'Incorrecto. Sí hay una diferencia importante: un DataFrame es 2D (tabla completa) y una Serie es 1D (una sola columna).'
            },
          ],
        },
      ],
    },
    {
      icon: '🎓',
      title: 'Resumen: DataFrame vs Serie',
      content: 'Recuerda estas diferencias clave:',
      table: {
        headers: ['Característica', 'DataFrame', 'Serie'],
        rows: [
          {
            Característica: 'Dimensiones',
            DataFrame: '2D (filas y columnas)',
            Serie: '1D (solo una columna)'
          },
          {
            Característica: 'Estructura',
            DataFrame: 'Tabla completa',
            Serie: 'Una sola columna'
          },
          {
            Característica: 'Cuándo usarlo',
            DataFrame: 'Datos con múltiples variables',
            Serie: 'Una sola variable o columna'
          },
          {
            Característica: 'Ejemplo',
            DataFrame: 'Tabla de estudiantes con nombre, edad, nota',
            Serie: 'Solo la columna de edades'
          },
        ],
      },
    },
  ],

  tipBox: {
    icon: '💡',
    content: '<strong>Tip importante:</strong> Siempre importa pandas como <span class="inline-code">pd</span> (es la convención universal). En los próximos módulos aprenderás a trabajar con DataFrames y Series en detalle.',
  },

  exercises: [],
};
