import type { Section } from '../../types';
import { ESTUDIANTES_CSV } from './studentsData';
import {
  validateApplyColumn,
  validateApplyMultipleColumns,
  validatePromedioClasificacion,
  validateRanking,
} from './validators';

export const module26: Section = {
  id: 25,
  moduleNumber: 'Módulo 26',
  title: 'Pandas 14:',
  titleHighlight: 'Apply (columnas)',

  initialCode: `
import pandas as pd
from io import StringIO

_estudiantes_csv = """${ESTUDIANTES_CSV}"""

if not hasattr(pd, '_students_patched'):
    pd._students_patched = True
    pd._original_read_csv_students = pd.read_csv

    def _custom_read_csv(filepath_or_buffer, *args, **kwargs):
        if isinstance(filepath_or_buffer, str) and filepath_or_buffer == 'estudiantes.csv':
            return pd._original_read_csv_students(StringIO(_estudiantes_csv), sep='|')
        raise FileNotFoundError(f"Archivo no encontrado: {filepath_or_buffer}")

    pd.read_csv = _custom_read_csv
  `,

  theoryBlocks: [
    {
      icon: '🎓',
      title: 'El dataset: notas de estudiantes',
      content:
        'En este módulo usamos un dataset de <strong>40 estudiantes</strong> con notas en 5 materias y su porcentaje de asistencia. Las notas siguen distribuciones normales con dos perfiles: estudiantes fuertes en ciencias y estudiantes fuertes en humanidades.',
      table: {
        headers: ['Columna', 'Tipo', 'Descripción', 'Rango'],
        rows: [
          {
            Columna: 'id_estudiante',
            Tipo: 'string',
            Descripción: 'Identificador único',
            Rango: 'E001–E040',
          },
          { Columna: 'nombre', Tipo: 'string', Descripción: 'Nombre completo', Rango: '—' },
          {
            Columna: 'matematicas',
            Tipo: 'float',
            Descripción: 'Nota en matemáticas',
            Rango: '0–100',
          },
          { Columna: 'ciencias', Tipo: 'float', Descripción: 'Nota en ciencias', Rango: '0–100' },
          { Columna: 'historia', Tipo: 'float', Descripción: 'Nota en historia', Rango: '0–100' },
          { Columna: 'lengua', Tipo: 'float', Descripción: 'Nota en lengua', Rango: '0–100' },
          { Columna: 'ingles', Tipo: 'float', Descripción: 'Nota en inglés', Rango: '0–100' },
          {
            Columna: 'asistencia',
            Tipo: 'float',
            Descripción: 'Porcentaje de asistencia',
            Rango: '60–100',
          },
        ],
      },
      codeExample: {
        filename: 'explorar_estudiantes.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'estudiantes.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)
<span class="builtin">print</span>(<span class="identifier">df</span>.<span class="function">head</span>(<span class="number">3</span>))
<span class="comment">#   id_estudiante          nombre  matematicas  ciencias  historia  lengua  ingles  asistencia</span>
<span class="comment"># 0          E001      Ana García         61.4      55.7      80.6    78.6    82.9        65.5</span>
<span class="comment"># 1          E002  Luis Martínez         64.4      73.1      69.6    81.9    73.6        99.5</span>`,
      },
    },
    {
      icon: '📊',
      title: 'apply sobre una Serie (columna): transformación valor por valor',
      content:
        'Cuando aplicas <span class="inline-code">.apply()</span> directamente sobre una <strong>Serie</strong> (una columna), la función recibe <strong>un valor por vez</strong> — no una fila completa. Es perfecto para convertir o clasificar cada valor de forma individual.',
      codeExample: {
        filename: 'apply_serie.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'estudiantes.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="comment"># Convertir nota numérica a letra con def</span>
<span class="keyword">def</span> <span class="function">a_letra</span>(<span class="identifier">nota</span>):
    <span class="keyword">if</span> <span class="identifier">nota</span> >= <span class="number">90</span>: <span class="keyword">return</span> <span class="string">'A'</span>
    <span class="keyword">if</span> <span class="identifier">nota</span> >= <span class="number">75</span>: <span class="keyword">return</span> <span class="string">'B'</span>
    <span class="keyword">if</span> <span class="identifier">nota</span> >= <span class="number">60</span>: <span class="keyword">return</span> <span class="string">'C'</span>
    <span class="keyword">return</span> <span class="string">'F'</span>

<span class="identifier">df</span>[<span class="string">'mat_letra'</span>] = <span class="identifier">df</span>[<span class="string">'matematicas'</span>].<span class="function">apply</span>(<span class="identifier">a_letra</span>)
<span class="builtin">print</span>(<span class="identifier">df</span>[[<span class="string">'matematicas'</span>, <span class="string">'mat_letra'</span>]].<span class="function">head</span>(<span class="number">5</span>))
<span class="comment">#    matematicas mat_letra</span>
<span class="comment"># 0         61.4         C</span>
<span class="comment"># 1         64.4         C</span>
<span class="comment"># 2         78.2         B</span>

<span class="comment"># Con lambda para transformaciones simples</span>
<span class="identifier">df</span>[<span class="string">'asistencia_ok'</span>] = <span class="identifier">df</span>[<span class="string">'asistencia'</span>].<span class="function">apply</span>(<span class="keyword">lambda</span> <span class="identifier">x</span>: <span class="string">'sí'</span> <span class="keyword">if</span> <span class="identifier">x</span> >= <span class="number">80</span> <span class="keyword">else</span> <span class="string">'no'</span>)`,
      },
      exercises: [
        {
          id: 'ex-26-1',
          number: 'EJERCICIO 26.1',
          description:
            'Carga <span class="inline-code">estudiantes.csv</span>. Define una función <span class="inline-code">a_letra(nota)</span> que convierta la nota numérica a letra: <span class="inline-code">"A"</span> (≥ 90), <span class="inline-code">"B"</span> (≥ 75), <span class="inline-code">"C"</span> (≥ 60) o <span class="inline-code">"F"</span>. Aplícala sobre la columna <span class="inline-code">matematicas</span> con <span class="inline-code">.apply()</span> y guarda el resultado en <span class="inline-code">df["mat_letra"]</span>. Imprime las primeras 5 filas mostrando <span class="inline-code">matematicas</span> y <span class="inline-code">mat_letra</span>.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateApplyColumn,
          starterCode: `import pandas as pd

df = pd.read_csv('estudiantes.csv', sep='|')

# Define la función de conversión a letra
def a_letra(nota):
    if nota >= 90: return 'A'
    if nota >= 75: return 'B'
    if nota >= 60: return 'C'
    return 'F'

# Aplica sobre la columna matematicas
df['mat_letra'] = df['matematicas'].apply(a_letra)

print(df[['matematicas', 'mat_letra']].head(5))
`,
        },
      ],
    },
    {
      icon: '📐',
      title: 'apply sobre un bloque de columnas (axis=0)',
      content:
        'Cuando seleccionas <strong>varias columnas</strong> con <span class="inline-code">df[["col1","col2",...]]</span> y aplicas <span class="inline-code">.apply(función)</span>, por defecto la función se aplica <strong>columna por columna</strong> (<span class="inline-code">axis=0</span>). La función recibe una Serie completa (todos los valores de esa columna) y devuelve una Serie transformada.',
      codeExample: {
        filename: 'apply_bloque.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'estudiantes.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="identifier">materias</span> = [<span class="string">'matematicas'</span>, <span class="string">'ciencias'</span>, <span class="string">'historia'</span>, <span class="string">'lengua'</span>, <span class="string">'ingles'</span>]

<span class="comment"># Función que recibe una columna (Serie) y la normaliza</span>
<span class="keyword">def</span> <span class="function">normalizar_columna</span>(<span class="identifier">col</span>):
    <span class="keyword">return</span> (<span class="identifier">col</span> - <span class="identifier">col</span>.<span class="function">min</span>()) / (<span class="identifier">col</span>.<span class="function">max</span>() - <span class="identifier">col</span>.<span class="function">min</span>())

<span class="comment"># Se aplica a cada columna de materias por separado</span>
<span class="identifier">df_norm</span> = <span class="identifier">df</span>[<span class="identifier">materias</span>].<span class="function">apply</span>(<span class="identifier">normalizar_columna</span>)
<span class="builtin">print</span>(<span class="identifier">df_norm</span>.<span class="function">head</span>(<span class="number">3</span>))
<span class="comment">#    matematicas  ciencias  historia  lengua  ingles</span>
<span class="comment"># 0        0.317     0.185     0.722   0.621   0.870</span>
<span class="comment"># 1        0.382     0.527     0.530   0.759   0.680</span>`,
      },
      exercises: [
        {
          id: 'ex-26-2',
          number: 'EJERCICIO 26.2',
          description:
            'Carga <span class="inline-code">estudiantes.csv</span>. Define una función <span class="inline-code">normalizar(col)</span> que aplique la fórmula min-max a una Serie completa. Aplícala sobre el bloque de las 5 materias usando <span class="inline-code">df[materias].apply(normalizar)</span>. Imprime las primeras 3 filas del resultado.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateApplyMultipleColumns,
          starterCode: `import pandas as pd

df = pd.read_csv('estudiantes.csv', sep='|')

materias = ['matematicas', 'ciencias', 'historia', 'lengua', 'ingles']

# Define la función de normalización
def normalizar(col):
    return (col - col.min()) / (col.max() - col.min())

# Aplica sobre el bloque de materias
df_norm = df[materias].apply(normalizar)
print(df_norm.head(3))
`,
        },
      ],
    },
    {
      icon: '🏅',
      title: 'Promedio por fila con apply y clasificación',
      content:
        'Combinando <span class="inline-code">axis=1</span> con <span class="inline-code">.mean()</span> dentro de la función puedes calcular el promedio de varias columnas <strong>por cada estudiante</strong> y luego clasificarlo en una sola pasada.',
      codeExample: {
        filename: 'promedio_filas.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'estudiantes.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="identifier">materias</span> = [<span class="string">'matematicas'</span>, <span class="string">'ciencias'</span>, <span class="string">'historia'</span>, <span class="string">'lengua'</span>, <span class="string">'ingles'</span>]

<span class="comment"># Promedio y clasificación en una función</span>
<span class="keyword">def</span> <span class="function">estado_academico</span>(<span class="identifier">row</span>):
    <span class="identifier">promedio</span> = <span class="identifier">row</span>[<span class="identifier">materias</span>].<span class="function">mean</span>()
    <span class="keyword">if</span> <span class="identifier">promedio</span> >= <span class="number">85</span>:
        <span class="keyword">return</span> <span class="string">'Sobresaliente'</span>
    <span class="keyword">elif</span> <span class="identifier">promedio</span> >= <span class="number">70</span>:
        <span class="keyword">return</span> <span class="string">'Aprobado'</span>
    <span class="keyword">else</span>:
        <span class="keyword">return</span> <span class="string">'Reprobado'</span>

<span class="identifier">df</span>[<span class="string">'promedio'</span>] = <span class="identifier">df</span>.<span class="function">apply</span>(<span class="keyword">lambda</span> <span class="identifier">row</span>: <span class="identifier">row</span>[<span class="identifier">materias</span>].<span class="function">mean</span>(), <span class="identifier">axis</span>=<span class="number">1</span>).<span class="function">round</span>(<span class="number">1</span>)
<span class="identifier">df</span>[<span class="string">'estado'</span>] = <span class="identifier">df</span>.<span class="function">apply</span>(<span class="identifier">estado_academico</span>, <span class="identifier">axis</span>=<span class="number">1</span>)
<span class="builtin">print</span>(<span class="identifier">df</span>[[<span class="string">'nombre'</span>, <span class="string">'promedio'</span>, <span class="string">'estado'</span>]].<span class="function">head</span>(<span class="number">5</span>))`,
      },
      exercises: [
        {
          id: 'ex-26-3',
          number: 'EJERCICIO 26.3',
          description:
            'Carga <span class="inline-code">estudiantes.csv</span>. Usa <span class="inline-code">.apply(axis=1)</span> para crear una columna <span class="inline-code">promedio</span> con la media de las 5 materias, y una columna <span class="inline-code">estado</span> que clasifique como <span class="inline-code">"Sobresaliente"</span> (promedio ≥ 85), <span class="inline-code">"Aprobado"</span> (≥ 70) o <span class="inline-code">"Reprobado"</span>. Imprime las primeras 5 filas con <span class="inline-code">nombre</span>, <span class="inline-code">promedio</span> y <span class="inline-code">estado</span>.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validatePromedioClasificacion,
          starterCode: `import pandas as pd

df = pd.read_csv('estudiantes.csv', sep='|')

materias = ['matematicas', 'ciencias', 'historia', 'lengua', 'ingles']

# Promedio por estudiante
df['promedio'] = df.apply(lambda row: row[materias].mean(), axis=1).round(1)

# Clasificación según promedio
def estado_academico(row):
    if row['promedio'] >= 85:
        return 'Sobresaliente'
    elif row['promedio'] >= 70:
        return 'Aprobado'
    else:
        return 'Reprobado'

df['estado'] = df.apply(estado_academico, axis=1)
print(df[['nombre', 'promedio', 'estado']].head(5))
`,
        },
      ],
    },
    {
      icon: '🔬',
      title: 'Perfil académico: apply multi-columna con lógica comparativa',
      content:
        'El caso más potente: dentro de la función accedes a <strong>varias columnas a la vez para compararlas entre sí</strong>. Aquí determinamos si cada estudiante tiene perfil de ciencias, humanidades o equilibrado según cuál grupo de materias tiene más alto.',
      codeExample: {
        filename: 'perfil_academico.py',
        code: `<span class="keyword">import</span> <span class="identifier">pandas</span> <span class="keyword">as</span> <span class="identifier">pd</span>

<span class="identifier">df</span> = <span class="identifier">pd</span>.<span class="function">read_csv</span>(<span class="string">'estudiantes.csv'</span>, <span class="identifier">sep</span>=<span class="string">'|'</span>)

<span class="keyword">def</span> <span class="function">perfil</span>(<span class="identifier">row</span>):
    <span class="identifier">ciencias_avg</span> = (
        <span class="identifier">row</span>[<span class="string">'matematicas'</span>] + <span class="identifier">row</span>[<span class="string">'ciencias'</span>]
    ) / <span class="number">2</span>
    <span class="identifier">humanidades_avg</span> = (
        <span class="identifier">row</span>[<span class="string">'historia'</span>] + <span class="identifier">row</span>[<span class="string">'lengua'</span>] + <span class="identifier">row</span>[<span class="string">'ingles'</span>]
    ) / <span class="number">3</span>
    <span class="identifier">diferencia</span> = <span class="identifier">ciencias_avg</span> - <span class="identifier">humanidades_avg</span>
    <span class="keyword">if</span> <span class="identifier">diferencia</span> > <span class="number">10</span>:
        <span class="keyword">return</span> <span class="string">'Ciencias'</span>
    <span class="keyword">elif</span> <span class="identifier">diferencia</span> < <span class="number">-10</span>:
        <span class="keyword">return</span> <span class="string">'Humanidades'</span>
    <span class="keyword">else</span>:
        <span class="keyword">return</span> <span class="string">'Equilibrado'</span>

<span class="identifier">df</span>[<span class="string">'perfil'</span>] = <span class="identifier">df</span>.<span class="function">apply</span>(<span class="identifier">perfil</span>, <span class="identifier">axis</span>=<span class="number">1</span>)
<span class="builtin">print</span>(<span class="identifier">df</span>[<span class="string">'perfil'</span>].<span class="function">value_counts</span>())`,
      },
      exercises: [
        {
          id: 'ex-26-4',
          number: 'EJERCICIO 26.4',
          description:
            'Carga <span class="inline-code">estudiantes.csv</span>. Define una función <span class="inline-code">perfil(row)</span> que compare el promedio de ciencias (<span class="inline-code">matematicas + ciencias</span>) contra el promedio de humanidades (<span class="inline-code">historia + lengua + ingles</span>): si la diferencia es > 10 retorna <span class="inline-code">"Ciencias"</span>, si es &lt; -10 retorna <span class="inline-code">"Humanidades"</span>, y si está en el medio <span class="inline-code">"Equilibrado"</span>. Usa <span class="inline-code">.apply(axis=1)</span> y muestra el <span class="inline-code">.value_counts()</span>.',
          expectedOutput: '',
          validationMode: 'custom',
          customValidator: validateRanking,
          starterCode: `import pandas as pd

df = pd.read_csv('estudiantes.csv', sep='|')

def perfil(row):
    ciencias_avg = (row['matematicas'] + row['ciencias']) / 2
    humanidades_avg = (row['historia'] + row['lengua'] + row['ingles']) / 3
    diferencia = ciencias_avg - humanidades_avg
    if diferencia > 10:
        return 'Ciencias'
    elif diferencia < -10:
        return 'Humanidades'
    else:
        return 'Equilibrado'

df['perfil'] = df.apply(perfil, axis=1)
print(df['perfil'].value_counts())
`,
        },
      ],
    },
    {
      icon: '📝',
      title: 'Resumen: apply sobre Serie vs apply sobre DataFrame',
      content: 'Las dos formas de usar apply con columnas:',
      table: {
        headers: ['Forma', 'La función recibe', 'axis', 'Ejemplo'],
        rows: [
          {
            Forma: 'df["col"].apply(f)',
            'La función recibe': 'Un valor escalar',
            axis: '(no aplica)',
            Ejemplo: 'df["nota"].apply(lambda x: x * 1.1)',
          },
          {
            Forma: 'df[cols].apply(f)',
            'La función recibe': 'Una Serie (columna completa)',
            axis: 'axis=0 (default)',
            Ejemplo: 'df[cols].apply(normalizar)',
          },
          {
            Forma: 'df.apply(f, axis=1)',
            'La función recibe': 'Una Serie (fila completa)',
            axis: 'axis=1',
            Ejemplo: 'df.apply(lambda row: row[cols].mean(), axis=1)',
          },
        ],
      },
    },
  ],

  tipBox: {
    icon: '💡',
    content:
      '<strong>Tip:</strong> Dentro de una función con <span class="inline-code">axis=1</span> puedes acceder a un subconjunto de columnas y aplicarles agregaciones: <span class="inline-code">row[["mat","cie"]].mean()</span> calcula el promedio solo de esas dos columnas para esa fila.',
  },

  exercises: [],
};
