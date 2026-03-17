import { useState } from 'react';
import {
  Terminal,
  Sparkles,
  Settings,
  Code2,
  Lightbulb,
  Bug,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Zap,
  BookOpen,
  PlayCircle,
  ShieldCheck
} from 'lucide-react';
import './ColabAIGuide.css';

type SectionId = 'intro' | 'activacion' | 'funciones' | 'autocompletado' | 'generacion' | 'debugging' | 'mejores-practicas' | 'limitaciones';

interface Section {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
}

interface CodeBlockProps {
  code: string;
  language?: string;
}

interface TipBoxProps {
  type: 'tip' | 'warning' | 'success';
  children: React.ReactNode;
}

const CodeBlock = ({ code, language = "python" }: CodeBlockProps) => (
  <div className="colab-code-block">
    <div className="code-header">
      <span className="code-language">{language}</span>
      <div className="code-dots">
        <div className="dot red"></div>
        <div className="dot yellow"></div>
        <div className="dot green"></div>
      </div>
    </div>
    <pre className="code-content">
      {code}
    </pre>
  </div>
);

const TipBox = ({ type, children }: TipBoxProps) => (
  <div className={`tip-box ${type}`}>
    <div className="tip-header">
      {type === 'tip' && <Lightbulb className="tip-icon" />}
      {type === 'warning' && <AlertTriangle className="tip-icon" />}
      {type === 'success' && <CheckCircle2 className="tip-icon" />}
      <span className="tip-label">
        {type === 'tip' && 'Consejo'}
        {type === 'warning' && 'Importante'}
        {type === 'success' && 'Buena Práctica'}
      </span>
    </div>
    <div className="tip-content">{children}</div>
  </div>
);

export const ColabAIGuide = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('intro');

  const sections: Section[] = [
    { id: 'intro', label: '1. Introducción', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'activacion', label: '2. Activación', icon: <Settings className="w-4 h-4" /> },
    { id: 'funciones', label: '3. Funciones Principales', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'autocompletado', label: '4. Autocompletado Inteligente', icon: <Zap className="w-4 h-4" /> },
    { id: 'generacion', label: '5. Generación de Código', icon: <Code2 className="w-4 h-4" /> },
    { id: 'debugging', label: '6. Debugging y Corrección', icon: <Bug className="w-4 h-4" /> },
    { id: 'mejores-practicas', label: '7. Mejores Prácticas', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'limitaciones', label: '8. Limitaciones', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="colab-guide-container">
      {/* Header */}
      <header className="colab-header">
        <div className="header-content">
          <h1 className="header-title">
            Guía Completa del <br/> <span className="title-highlight">Asistente de IA en Google Colab</span>
          </h1>
          <p className="header-subtitle">
            Aprende a activar y sacarle el máximo provecho al asistente de IA de Google Colab para acelerar tu flujo de trabajo en Data Science.
          </p>
          <p className="header-author">
            Por Robert Moreno
          </p>
        </div>
        <div className="header-blur"></div>
      </header>

      <div className="guide-content">
        {/* Navigation Sidebar */}
        <aside className="guide-sidebar">
          <div className="sidebar-sticky">
            <h3 className="sidebar-title">Contenido de la Guía</h3>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`sidebar-btn ${activeSection === s.id ? 'active' : ''}`}
              >
                <div className="sidebar-btn-content">
                  <span className="sidebar-icon">
                    {s.icon}
                  </span>
                  {s.label}
                </div>
                {activeSection === s.id && <ChevronRight className="chevron-icon" />}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="guide-main">

          {/* SECTION: INTRO */}
          {activeSection === 'intro' && (
            <div className="section-content">
              <h2 className="section-title">1. ¿Qué es el Asistente de IA de Google Colab?</h2>
              <div className="section-text">
                <p className="section-paragraph">
                  Google Colab integra <strong>asistentes de IA generativa</strong> (Gemini) que te ayudan a escribir código,
                  completar funciones, generar documentación y resolver errores, todo sin salir de tu notebook.
                </p>

                <div className="feature-grid">
                  {[
                    {
                      title: 'Autocompletado Inteligente',
                      desc: 'Sugerencias de código en tiempo real basadas en tu contexto.',
                      icon: <Zap className="feature-icon" />,
                      color: 'blue'
                    },
                    {
                      title: 'Generación de Código',
                      desc: 'Describe lo que necesitas y el AI genera el código completo.',
                      icon: <Code2 className="feature-icon" />,
                      color: 'emerald'
                    },
                    {
                      title: 'Corrección de Errores',
                      desc: 'Detecta y sugiere correcciones para bugs y errores.',
                      icon: <Bug className="feature-icon" />,
                      color: 'purple'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className={`feature-card ${item.color}`}>
                      <div className="feature-icon-container">{item.icon}</div>
                      <h4 className="feature-title">{item.title}</h4>
                      <p className="feature-desc">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <TipBox type="tip">
                  El asistente de IA en Colab está <strong>disponible de forma gratuita</strong>, aunque usuarios de Colab Pro tienen acceso a modelos más avanzados.
                </TipBox>
              </div>
            </div>
          )}

          {/* SECTION: ACTIVACION */}
          {activeSection === 'activacion' && (
            <div className="section-content">
              <h2 className="section-title">2. Cómo Activar el Asistente de IA</h2>
              <p className="section-intro">Sigue estos pasos para habilitar el asistente en tu notebook de Colab:</p>

              <div className="steps-container">
                <div className="activation-step">
                  <div className="step-number">1</div>
                  <div className="step-content-box">
                    <h3 className="step-title">Abre Google Colab</h3>
                    <p className="step-description">
                      Ve a <a href="https://colab.research.google.com" target="_blank" rel="noopener noreferrer" className="link">colab.research.google.com</a> e inicia sesión con tu cuenta de Google.
                    </p>
                  </div>
                </div>

                <div className="activation-step">
                  <div className="step-number">2</div>
                  <div className="step-content-box">
                    <h3 className="step-title">Accede a Configuración</h3>
                    <p className="step-description">
                      Haz clic en el ícono de <strong>⚙️ Configuración</strong> (Settings) en la esquina superior derecha,
                      o usa el atajo de teclado <code>Cmd/Ctrl + ,</code>
                    </p>
                  </div>
                </div>

                <div className="activation-step">
                  <div className="step-number">3</div>
                  <div className="step-content-box">
                    <h3 className="step-title">Habilita las Sugerencias de IA</h3>
                    <p className="step-description">
                      En el panel de configuración, busca la opción:
                    </p>
                    <div className="setting-option">
                      <input type="checkbox" checked readOnly />
                      <span><strong>Enable AI-powered code completions</strong></span>
                    </div>
                    <p className="step-description">
                      Activa el toggle para habilitar las sugerencias inteligentes.
                    </p>
                  </div>
                </div>

                <div className="activation-step">
                  <div className="step-number">4</div>
                  <div className="step-content-box">
                    <h3 className="step-title">¡Listo para Usar!</h3>
                    <p className="step-description">
                      Ahora verás sugerencias de código mientras escribes. Las sugerencias aparecen en <span className="code-hint">texto gris</span> y puedes aceptarlas presionando <kbd>Tab</kbd>.
                    </p>
                  </div>
                </div>
              </div>

              <TipBox type="success">
                <strong>Atajo rápido:</strong> Presiona <kbd>Ctrl + M</kbd> (Windows/Linux) o <kbd>Cmd + M</kbd> (Mac) para abrir el panel de comandos y buscar "AI" para ver todas las opciones disponibles.
              </TipBox>
            </div>
          )}

          {/* SECTION: FUNCIONES */}
          {activeSection === 'funciones' && (
            <div className="section-content">
              <h2 className="section-title">3. Funciones Principales del Asistente</h2>
              <p className="section-intro">El asistente de IA en Colab ofrece múltiples capacidades para mejorar tu productividad:</p>

              <div className="functions-grid">
                <div className="function-card">
                  <div className="function-header">
                    <Sparkles className="function-icon" />
                    <h3>Autocompletado en Tiempo Real</h3>
                  </div>
                  <p className="function-desc">
                    Mientras escribes código, el AI sugiere la continuación más probable basándose en:
                  </p>
                  <ul className="function-list">
                    <li>El contexto de tu código anterior</li>
                    <li>Patrones comunes en Python/Data Science</li>
                    <li>Nombres de variables y funciones existentes</li>
                  </ul>
                  <div className="function-example">
                    <strong>Ejemplo:</strong> Si escribes <code>df.grou</code>, automáticamente sugiere <code className="suggestion">pby(</code>
                  </div>
                </div>

                <div className="function-card">
                  <div className="function-header">
                    <Code2 className="function-icon" />
                    <h3>Generación desde Comentarios</h3>
                  </div>
                  <p className="function-desc">
                    Escribe un comentario describiendo lo que necesitas y el AI genera el código:
                  </p>
                  <CodeBlock code={`# Crea un gráfico de barras con las 10 ciudades más frecuentes
# El AI genera automáticamente:
top_cities = df['city'].value_counts().head(10)
plt.figure(figsize=(10, 6))
plt.bar(top_cities.index, top_cities.values)
plt.xlabel('Ciudad')
plt.ylabel('Frecuencia')
plt.title('Top 10 Ciudades')
plt.xticks(rotation=45)
plt.show()`} />
                </div>

                <div className="function-card">
                  <div className="function-header">
                    <Bug className="function-icon" />
                    <h3>Ayuda con Errores</h3>
                  </div>
                  <p className="function-desc">
                    Cuando ocurre un error, Colab muestra un botón <strong>"✨ Explain error"</strong> que:
                  </p>
                  <ul className="function-list">
                    <li>Explica la causa del error en lenguaje simple</li>
                    <li>Sugiere posibles soluciones</li>
                    <li>Muestra código corregido</li>
                  </ul>
                </div>

                <div className="function-card">
                  <div className="function-header">
                    <FileText className="function-icon" />
                    <h3>Documentación Automática</h3>
                  </div>
                  <p className="function-desc">
                    Genera docstrings y comentarios explicativos para tus funciones:
                  </p>
                  <CodeBlock code={`def process_data(df, threshold=0.5):
    """
    Procesa el DataFrame aplicando filtros y transformaciones.

    Args:
        df (pd.DataFrame): DataFrame de entrada
        threshold (float): Umbral para filtrado (default: 0.5)

    Returns:
        pd.DataFrame: DataFrame procesado
    """
    # El AI puede generar esto automáticamente`} />
                </div>
              </div>
            </div>
          )}

          {/* SECTION: AUTOCOMPLETADO */}
          {activeSection === 'autocompletado' && (
            <div className="section-content">
              <h2 className="section-title">4. Domina el Autocompletado Inteligente</h2>
              <p className="section-intro">El autocompletado de Colab AI va más allá del autocompletado tradicional:</p>

              <div className="autocomplete-examples">
                <div className="example-block">
                  <h3 className="example-title">📊 Ejemplo: Análisis de Datos</h3>
                  <div className="comparison-grid">
                    <div>
                      <h4 className="comparison-label">Tú escribes:</h4>
                      <CodeBlock code={`import pandas as pd
df = pd.read_csv('datos.csv')

# Quiero ver estadísticas de`} />
                    </div>
                    <div>
                      <h4 className="comparison-label success">El AI sugiere:</h4>
                      <CodeBlock code={`import pandas as pd
df = pd.read_csv('datos.csv')

# Quiero ver estadísticas de las columnas numéricas
df.describe()

# O también sugiere:
df.info()
df.select_dtypes(include='number').describe()`} />
                    </div>
                  </div>
                </div>

                <div className="example-block">
                  <h3 className="example-title">🎨 Ejemplo: Visualización</h3>
                  <div className="comparison-grid">
                    <div>
                      <h4 className="comparison-label">Tú escribes:</h4>
                      <CodeBlock code={`import matplotlib.pyplot as plt

# Crear gráfico de dispersión entre edad y salario`} />
                    </div>
                    <div>
                      <h4 className="comparison-label success">El AI completa:</h4>
                      <CodeBlock code={`import matplotlib.pyplot as plt

# Crear gráfico de dispersión entre edad y salario
plt.figure(figsize=(10, 6))
plt.scatter(df['edad'], df['salario'], alpha=0.6)
plt.xlabel('Edad')
plt.ylabel('Salario')
plt.title('Relación entre Edad y Salario')
plt.grid(True, alpha=0.3)
plt.show()`} />
                    </div>
                  </div>
                </div>

                <TipBox type="tip">
                  <strong>Truco Pro:</strong> Escribe comentarios muy específicos en español. El AI entiende perfectamente el contexto y genera código apropiado. Por ejemplo: <code># Normalizar columnas numéricas usando StandardScaler</code>
                </TipBox>
              </div>

              <div className="shortcuts-box">
                <h3 className="shortcuts-title">⌨️ Atajos de Teclado</h3>
                <div className="shortcuts-grid">
                  <div className="shortcut-item">
                    <kbd>Tab</kbd>
                    <span>Aceptar sugerencia completa</span>
                  </div>
                  <div className="shortcut-item">
                    <kbd>Ctrl + →</kbd>
                    <span>Aceptar palabra por palabra</span>
                  </div>
                  <div className="shortcut-item">
                    <kbd>Esc</kbd>
                    <span>Rechazar sugerencia</span>
                  </div>
                  <div className="shortcut-item">
                    <kbd>Alt + ]</kbd>
                    <span>Siguiente sugerencia</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: GENERACION */}
          {activeSection === 'generacion' && (
            <div className="section-content">
              <h2 className="section-title">5. Generación de Código con Prompts</h2>
              <p className="section-intro">Aprende a escribir prompts efectivos para generar código de calidad:</p>

              <div className="prompt-strategies">
                <div className="strategy-box">
                  <div className="strategy-header">
                    <Lightbulb className="strategy-icon" />
                    <h3>Estrategia 1: Sé Específico con el Contexto</h3>
                  </div>
                  <div className="strategy-comparison">
                    <div className="bad-prompt">
                      <span className="label bad">❌ Prompt Vago</span>
                      <CodeBlock code={`# Limpia los datos`} />
                    </div>
                    <div className="good-prompt">
                      <span className="label good">✅ Prompt Específico</span>
                      <CodeBlock code={`# Limpia el DataFrame df:
# 1. Elimina filas con NaN en la columna 'precio'
# 2. Convierte 'fecha' a datetime
# 3. Elimina duplicados basados en 'id'`} />
                      <div className="ai-result">
                        <strong>Resultado del AI:</strong>
                        <CodeBlock code={`df = df.dropna(subset=['precio'])
df['fecha'] = pd.to_datetime(df['fecha'])
df = df.drop_duplicates(subset=['id'], keep='first')`} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="strategy-box">
                  <div className="strategy-header">
                    <Code2 className="strategy-icon" />
                    <h3>Estrategia 2: Incluye Nombres de Variables</h3>
                  </div>
                  <TipBox type="success">
                    El AI es más preciso cuando conoce los nombres exactos de tus variables y columnas.
                  </TipBox>
                  <CodeBlock code={`# Tengo un DataFrame 'ventas' con columnas: producto, cantidad, precio_unitario
# Crea una columna 'total' que sea cantidad * precio_unitario
# Luego agrupa por producto y suma los totales

# El AI genera:
ventas['total'] = ventas['cantidad'] * ventas['precio_unitario']
resumen = ventas.groupby('producto')['total'].sum().reset_index()
resumen = resumen.sort_values('total', ascending=False)`} />
                </div>

                <div className="strategy-box">
                  <div className="strategy-header">
                    <PlayCircle className="strategy-icon" />
                    <h3>Estrategia 3: Pide Código Paso a Paso</h3>
                  </div>
                  <p>Para tareas complejas, divide en pasos comentados:</p>
                  <CodeBlock code={`# Modelo de Machine Learning para predecir churn:
# Paso 1: Separar features (X) y target (y), donde y = 'churn'

# Paso 2: Dividir en train/test (80/20)

# Paso 3: Entrenar RandomForestClassifier con 100 árboles

# Paso 4: Evaluar con accuracy y matriz de confusión

# El AI genera código para cada paso automáticamente`} />
                </div>
              </div>

              <div className="use-cases">
                <h3 className="use-cases-title">📚 Casos de Uso Comunes</h3>
                <div className="use-cases-grid">
                  <div className="use-case">
                    <h4>🔍 EDA (Exploratory Data Analysis)</h4>
                    <code># Genera gráficos para análisis exploratorio de todas las columnas numéricas</code>
                  </div>
                  <div className="use-case">
                    <h4>🧹 Data Cleaning</h4>
                    <code># Detecta y maneja outliers en columnas numéricas usando el método IQR</code>
                  </div>
                  <div className="use-case">
                    <h4>🤖 Feature Engineering</h4>
                    <code># Crea variables dummy para todas las columnas categóricas</code>
                  </div>
                  <div className="use-case">
                    <h4>📊 Visualizaciones</h4>
                    <code># Crea un dashboard con 4 subplots: histograma, boxplot, scatter y heatmap</code>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: DEBUGGING */}
          {activeSection === 'debugging' && (
            <div className="section-content">
              <h2 className="section-title">6. Debugging y Corrección de Errores</h2>
              <p className="section-intro">El AI de Colab es excelente para ayudarte a resolver errores rápidamente:</p>

              <div className="debugging-guide">
                <div className="error-workflow">
                  <h3 className="workflow-title">🔧 Flujo de Trabajo para Debugging</h3>
                  <div className="workflow-steps-horizontal">
                    <div className="workflow-step-box">
                      <span className="workflow-num">1</span>
                      <p><strong>Ejecuta tu código</strong><br/>y obtén un error</p>
                    </div>
                    <div className="workflow-arrow">→</div>
                    <div className="workflow-step-box">
                      <span className="workflow-num">2</span>
                      <p><strong>Haz clic en</strong><br/>"✨ Explain error"</p>
                    </div>
                    <div className="workflow-arrow">→</div>
                    <div className="workflow-step-box">
                      <span className="workflow-num">3</span>
                      <p><strong>Lee la explicación</strong><br/>y las soluciones</p>
                    </div>
                    <div className="workflow-arrow">→</div>
                    <div className="workflow-step-box">
                      <span className="workflow-num">4</span>
                      <p><strong>Aplica el fix</strong><br/>sugerido</p>
                    </div>
                  </div>
                </div>

                <div className="error-examples">
                  <h3 className="examples-title">Ejemplos Reales de Debugging</h3>

                  <div className="error-case">
                    <div className="error-header">
                      <Bug className="error-icon" />
                      <h4>Error: KeyError</h4>
                    </div>
                    <CodeBlock code={`# Tu código:
df['precio_total'] = df['precio'] * df['cantidad']

# Error:
KeyError: 'precio'`} />
                    <div className="ai-explanation">
                      <strong>🤖 Explicación del AI:</strong>
                      <p>La columna 'precio' no existe en tu DataFrame. Verifica los nombres de columnas con <code>df.columns</code>.</p>
                      <strong>💡 Solución sugerida:</strong>
                      <CodeBlock code={`# Primero verifica las columnas disponibles
print(df.columns)

# Usa el nombre correcto (por ejemplo, 'price' en lugar de 'precio')
df['precio_total'] = df['price'] * df['cantidad']`} />
                    </div>
                  </div>

                  <div className="error-case">
                    <div className="error-header">
                      <Bug className="error-icon" />
                      <h4>Error: ValueError en reshape</h4>
                    </div>
                    <CodeBlock code={`# Tu código:
X = df[['feature1', 'feature2']].values
X_reshaped = X.reshape(-1, 1)

# Error:
ValueError: cannot reshape array of size 200 into shape (100,1)`} />
                    <div className="ai-explanation">
                      <strong>🤖 Explicación del AI:</strong>
                      <p>Estás intentando reshapear un array 2D a 1D. Si tienes 2 features, el tamaño total es 200 (100 filas × 2 columnas), no se puede convertir a (100, 1).</p>
                      <strong>💡 Solución sugerida:</strong>
                      <CodeBlock code={`# Si quieres mantener ambas features:
X = df[['feature1', 'feature2']].values  # Ya está en forma correcta (100, 2)

# Si solo necesitas una feature:
X = df['feature1'].values.reshape(-1, 1)  # (100, 1)`} />
                    </div>
                  </div>
                </div>

                <TipBox type="tip">
                  <strong>Pro Tip:</strong> También puedes <strong>pedirle ayuda manualmente</strong> escribiendo un comentario:
                  <br/><code># ¿Por qué obtengo un TypeError aquí? [selecciona el código problemático]</code>
                </TipBox>
              </div>
            </div>
          )}

          {/* SECTION: MEJORES PRACTICAS */}
          {activeSection === 'mejores-practicas' && (
            <div className="section-content">
              <h2 className="section-title">7. Mejores Prácticas y Consejos</h2>
              <p className="section-intro">Maximiza tu productividad con estos tips probados:</p>

              <div className="best-practices-grid">
                <div className="practice-card">
                  <div className="practice-number">1</div>
                  <h3 className="practice-title">Valida Siempre el Código Generado</h3>
                  <p className="practice-text">
                    El AI es poderoso, pero <strong>no es infalible</strong>. Antes de ejecutar:
                  </p>
                  <ul className="practice-list">
                    <li>✓ Lee y entiende el código generado</li>
                    <li>✓ Verifica que use las variables correctas</li>
                    <li>✓ Prueba con un subconjunto pequeño de datos primero</li>
                  </ul>
                </div>

                <div className="practice-card">
                  <div className="practice-number">2</div>
                  <h3 className="practice-title">Escribe Comentarios Descriptivos</h3>
                  <p className="practice-text">
                    Cuanto más claro sea tu comentario, mejor será el código generado:
                  </p>
                  <div className="practice-example">
                    <CodeBlock code={`# ❌ Malo:
# filtrar datos

# ✅ Bueno:
# Filtrar filas donde 'edad' > 18 y 'estado' == 'activo'`} />
                  </div>
                </div>

                <div className="practice-card">
                  <div className="practice-number">3</div>
                  <h3 className="practice-title">Aprovecha el Contexto Existente</h3>
                  <p className="practice-text">
                    El AI lee todo tu notebook. Si ya cargaste datos o definiste variables, no necesitas repetir el contexto:
                  </p>
                  <CodeBlock code={`# Celda 1 (ya ejecutada):
df = pd.read_csv('ventas.csv')

# Celda 2 (el AI ya conoce 'df'):
# Agrupa por mes y suma las ventas`} />
                </div>

                <div className="practice-card">
                  <div className="practice-number">4</div>
                  <h3 className="practice-title">Usa Múltiples Iteraciones</h3>
                  <p className="practice-text">
                    Si la primera sugerencia no es perfecta, <strong>refina tu comentario</strong>:
                  </p>
                  <div className="iteration-example">
                    <div className="iteration-step">
                      <span className="iteration-label">1ra iteración:</span>
                      <code># Crea un modelo de clasificación</code>
                    </div>
                    <div className="iteration-step">
                      <span className="iteration-label">2da iteración (más específica):</span>
                      <code># Crea un modelo RandomForest con 100 árboles y max_depth=10</code>
                    </div>
                  </div>
                </div>

                <div className="practice-card">
                  <div className="practice-number">5</div>
                  <h3 className="practice-title">Combina AI con Tu Conocimiento</h3>
                  <p className="practice-text">
                    Usa el AI para el <strong>boilerplate</strong>, pero añade tu lógica de negocio:
                  </p>
                  <CodeBlock code={`# El AI genera la estructura:
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Tú añades validaciones específicas de tu negocio:
if len(X_train) < 1000:
    print("⚠️ Warning: Dataset pequeño, considera cross-validation")

# Tú añades logging personalizado:
accuracy = model.score(X_test, y_test)
logging.info(f"Model trained with accuracy: {accuracy:.2%}")`} />
                </div>

                <div className="practice-card">
                  <div className="practice-number">6</div>
                  <h3 className="practice-title">Experimenta con Diferentes Enfoques</h3>
                  <p className="practice-text">
                    Pide al AI que genere <strong>múltiples soluciones</strong> y compara:
                  </p>
                  <CodeBlock code={`# Opción 1: Pide una solución simple
# Normaliza las columnas numéricas

# Opción 2: Pide alternativas
# Normaliza las columnas numéricas usando StandardScaler o MinMaxScaler
# y explica cuándo usar cada uno`} />
                </div>
              </div>
            </div>
          )}

          {/* SECTION: LIMITACIONES */}
          {activeSection === 'limitaciones' && (
            <div className="section-content">
              <h2 className="section-title">8. Limitaciones y Consideraciones</h2>
              <p className="section-intro">Es importante conocer las limitaciones para usar el AI de manera efectiva:</p>

              <div className="limitations-container">
                <div className="limitation-card warning">
                  <div className="limitation-header">
                    <AlertTriangle className="limitation-icon" />
                    <h3>⚠️ Limitaciones Técnicas</h3>
                  </div>
                  <ul className="limitation-list">
                    <li>
                      <strong>Contexto limitado:</strong> El AI solo "ve" tu notebook actual, no puede acceder a archivos externos o APIs sin tu código.
                    </li>
                    <li>
                      <strong>Puede generar código desactualizado:</strong> A veces sugiere métodos deprecados. Verifica siempre la documentación oficial.
                    </li>
                    <li>
                      <strong>No entiende lógica de negocio compleja:</strong> Reglas específicas de tu dominio deben ser codificadas por ti.
                    </li>
                    <li>
                      <strong>Rendimiento variable:</strong> En horarios pico, las sugerencias pueden ser más lentas.
                    </li>
                  </ul>
                </div>

                <div className="limitation-card security">
                  <div className="limitation-header">
                    <ShieldCheck className="limitation-icon" />
                    <h3>🔒 Privacidad y Seguridad</h3>
                  </div>
                  <TipBox type="warning">
                    <strong>IMPORTANTE:</strong> El código que escribes en Colab puede ser usado para entrenar modelos de AI de Google (según sus términos de servicio).
                  </TipBox>
                  <div className="security-tips">
                    <h4>Recomendaciones de Seguridad:</h4>
                    <ul className="security-list">
                      <li>❌ <strong>NO</strong> incluyas credenciales, API keys o contraseñas en tu código</li>
                      <li>❌ <strong>NO</strong> trabajes con datos sensibles o PII sin anonimizar</li>
                      <li>✅ Usa variables de entorno para secretos: <code>from google.colab import userdata</code></li>
                      <li>✅ Lee los términos de servicio de Colab si trabajas con datos confidenciales</li>
                    </ul>
                  </div>
                </div>

                <div className="limitation-card">
                  <div className="limitation-header">
                    <Lightbulb className="limitation-icon" />
                    <h3>💡 Cuándo NO usar el AI</h3>
                  </div>
                  <div className="when-not-grid">
                    <div className="when-not-item">
                      <h4>Algoritmos Críticos</h4>
                      <p>Para lógica de seguridad o financiera, escribe y revisa manualmente.</p>
                    </div>
                    <div className="when-not-item">
                      <h4>Código de Producción</h4>
                      <p>El código generado necesita testing exhaustivo antes de deployar.</p>
                    </div>
                    <div className="when-not-item">
                      <h4>Aprendizaje</h4>
                      <p>Si estás aprendiendo, intenta resolver primero sin AI para fortalecer habilidades.</p>
                    </div>
                    <div className="when-not-item">
                      <h4>Optimización Extrema</h4>
                      <p>Para código que requiere máximo rendimiento, optimiza manualmente.</p>
                    </div>
                  </div>
                </div>

                <div className="final-tips">
                  <h3 className="final-title">🎯 Reflexión Final</h3>
                  <div className="final-content">
                    <p>
                      El asistente de IA en Google Colab es una <strong>herramienta poderosa</strong>, no un reemplazo para tu conocimiento.
                      Úsalo para:
                    </p>
                    <div className="final-grid">
                      <div className="final-item success">✓ Acelerar tareas repetitivas</div>
                      <div className="final-item success">✓ Aprender nuevas librerías</div>
                      <div className="final-item success">✓ Generar boilerplate rápidamente</div>
                      <div className="final-item success">✓ Resolver errores comunes</div>
                    </div>
                    <p className="final-note">
                      Pero siempre <strong>entiende, valida y mejora</strong> el código que genera.
                      Tu criterio como Data Scientist es insustituible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className="colab-footer">
        <div className="footer-content">
          <div className="footer-status">
            <span className="status-text">Autor: Robert Moreno</span>
          </div>
          <div className="footer-tech">
            <span className="tech-item"><Terminal className="tech-icon"/> Google Colab</span>
            <span className="tech-item"><Sparkles className="tech-icon"/> Gemini AI</span>
            <span className="tech-item"><Code2 className="tech-icon"/> Python 3.10+</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
