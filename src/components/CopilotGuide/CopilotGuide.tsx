import { useState } from 'react';
import {
  Terminal,
  Sparkles,
  Download,
  Code2,
  MessageSquare,
  Lightbulb,
  Bug,
  TestTube,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Zap,
  BookOpen,
  ShieldCheck,
  FileCode,
  Settings,
} from 'lucide-react';
import './CopilotGuide.css';
import '../../styles/guides-theme.css';

type SectionId =
  | 'intro'
  | 'instalacion'
  | 'autocompletado'
  | 'copilot-chat'
  | 'slash-commands'
  | 'mejores-practicas'
  | 'casos-uso'
  | 'limitaciones';

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

const CodeBlock = ({ code, language = 'python' }: CodeBlockProps) => (
  <div className="copilot-code-block">
    <div className="code-header">
      <span className="code-language">{language}</span>
      <div className="code-dots">
        <div className="dot red"></div>
        <div className="dot yellow"></div>
        <div className="dot green"></div>
      </div>
    </div>
    <pre className="code-content">{code}</pre>
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

export const CopilotGuide = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('intro');

  const sections: Section[] = [
    { id: 'intro', label: '1. Introducción', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'instalacion', label: '2. Instalación', icon: <Download className="w-4 h-4" /> },
    { id: 'autocompletado', label: '3. Autocompletado', icon: <Zap className="w-4 h-4" /> },
    { id: 'copilot-chat', label: '4. Copilot Chat', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'slash-commands', label: '5. Slash Commands', icon: <Terminal className="w-4 h-4" /> },
    {
      id: 'mejores-practicas',
      label: '6. Mejores Prácticas',
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
    { id: 'casos-uso', label: '7. Casos de Uso', icon: <FileCode className="w-4 h-4" /> },
    { id: 'limitaciones', label: '8. Limitaciones', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="copilot-guide-container">
      {/* Header */}
      <header className="copilot-header">
        <div className="header-content">
          <h1 className="header-title">
            Guía Completa de <br />{' '}
            <span className="title-highlight">GitHub Copilot en VS Code</span>
          </h1>
          <p className="header-subtitle">
            Domina el uso de GitHub Copilot en Visual Studio Code: desde la instalación hasta
            técnicas avanzadas con Copilot Chat y Slash Commands.
          </p>
          <p className="header-author">Por Robert Moreno</p>
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
                  <span className="sidebar-icon">{s.icon}</span>
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
              <h2 className="section-title">1. ¿Qué es GitHub Copilot?</h2>
              <div className="section-text">
                <p className="section-paragraph">
                  <strong>GitHub Copilot</strong> es un asistente de programación con IA
                  desarrollado por GitHub y OpenAI. Funciona como tu "copiloto" en VS Code,
                  sugiriendo código completo mientras escribes, respondiendo preguntas y ayudándote
                  a entender y depurar código.
                </p>

                <div className="feature-grid">
                  {[
                    {
                      title: 'Sugerencias Contextuales',
                      desc: 'Completa líneas y funciones enteras basándose en tu código y comentarios.',
                      icon: <Sparkles className="feature-icon" />,
                      color: 'purple',
                    },
                    {
                      title: 'Copilot Chat',
                      desc: 'Chatea con el AI directamente en el editor para hacer preguntas y resolver dudas.',
                      icon: <MessageSquare className="feature-icon" />,
                      color: 'blue',
                    },
                    {
                      title: 'Slash Commands',
                      desc: 'Comandos especiales como /explain, /fix, /tests para tareas específicas.',
                      icon: <Terminal className="feature-icon" />,
                      color: 'emerald',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className={`feature-card ${item.color}`}>
                      <div className="feature-icon-container">{item.icon}</div>
                      <h4 className="feature-title">{item.title}</h4>
                      <p className="feature-desc">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <TipBox type="warning">
                  <strong>Nota:</strong> GitHub Copilot es un <strong>servicio de pago</strong>{' '}
                  ($10/mes), aunque es gratuito para estudiantes verificados y mantenedores de
                  proyectos open source populares.
                </TipBox>
              </div>
            </div>
          )}

          {/* SECTION: INSTALACION */}
          {activeSection === 'instalacion' && (
            <div className="section-content">
              <h2 className="section-title">2. Instalación y Configuración</h2>
              <p className="section-intro">
                Sigue estos pasos para empezar a usar GitHub Copilot en VS Code:
              </p>

              <div className="steps-container">
                <div className="installation-step">
                  <div className="step-number">1</div>
                  <div className="step-content-box">
                    <h3 className="step-title">Suscríbete a GitHub Copilot</h3>
                    <p className="step-description">
                      Ve a{' '}
                      <a
                        href="https://github.com/features/copilot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                      >
                        github.com/features/copilot
                      </a>{' '}
                      y suscríbete al servicio. Puedes probar gratis por 30 días.
                    </p>
                    <TipBox type="tip">
                      <strong>Estudiantes:</strong> Si tienes el GitHub Student Developer Pack,
                      Copilot es completamente gratis.
                    </TipBox>
                  </div>
                </div>

                <div className="installation-step">
                  <div className="step-number">2</div>
                  <div className="step-content-box">
                    <h3 className="step-title">Instala la Extensión en VS Code</h3>
                    <p className="step-description">
                      Abre VS Code y ve a la pestaña de Extensiones (<kbd>Ctrl/Cmd + Shift + X</kbd>
                      ), busca:
                    </p>
                    <div className="extension-box">
                      <Settings className="extension-icon" />
                      <div>
                        <strong>GitHub Copilot</strong>
                        <p>Por GitHub</p>
                      </div>
                    </div>
                    <p className="step-description">
                      Haz clic en <strong>Install</strong> para instalarla.
                    </p>
                  </div>
                </div>

                <div className="installation-step">
                  <div className="step-number">3</div>
                  <div className="step-content-box">
                    <h3 className="step-title">
                      Instala GitHub Copilot Chat (Opcional pero Recomendado)
                    </h3>
                    <p className="step-description">
                      En la misma pestaña de Extensiones, busca e instala:
                    </p>
                    <div className="extension-box">
                      <MessageSquare className="extension-icon" />
                      <div>
                        <strong>GitHub Copilot Chat</strong>
                        <p>Por GitHub</p>
                      </div>
                    </div>
                    <p className="step-description">
                      Esta extensión te permite chatear con Copilot directamente en el editor.
                    </p>
                  </div>
                </div>

                <div className="installation-step">
                  <div className="step-number">4</div>
                  <div className="step-content-box">
                    <h3 className="step-title">Inicia Sesión con GitHub</h3>
                    <p className="step-description">
                      VS Code te pedirá que inicies sesión con tu cuenta de GitHub. Haz clic en{' '}
                      <strong>Sign in to GitHub</strong>y autoriza la extensión.
                    </p>
                  </div>
                </div>

                <div className="installation-step">
                  <div className="step-number">5</div>
                  <div className="step-content-box">
                    <h3 className="step-title">¡Listo para Usar!</h3>
                    <p className="step-description">
                      Verás el ícono de Copilot <Sparkles className="inline-icon" /> en la barra de
                      estado de VS Code. Si está en gris, haz clic para habilitarlo.
                    </p>
                    <div className="status-indicators">
                      <div className="status-item enabled">
                        <CheckCircle2 className="status-icon" />
                        <span>Habilitado - Copilot está activo</span>
                      </div>
                      <div className="status-item disabled">
                        <AlertTriangle className="status-icon" />
                        <span>Deshabilitado - Haz clic para activar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: AUTOCOMPLETADO */}
          {activeSection === 'autocompletado' && (
            <div className="section-content">
              <h2 className="section-title">3. Autocompletado Inteligente</h2>
              <p className="section-intro">
                Copilot sugiere código en tiempo real mientras escribes:
              </p>

              <div className="autocomplete-demo">
                <h3 className="demo-title">Cómo Funciona</h3>
                <div className="demo-steps-grid">
                  <div className="demo-step">
                    <div className="demo-number">1</div>
                    <h4>Escribe un comentario o empieza una función</h4>
                    <CodeBlock
                      code={`# Función que calcula el promedio de una lista
def`}
                    />
                  </div>
                  <div className="demo-step">
                    <div className="demo-number">2</div>
                    <h4>Copilot sugiere código (en gris)</h4>
                    <CodeBlock
                      code={`# Función que calcula el promedio de una lista
def calcular_promedio(lista):
    return sum(lista) / len(lista)`}
                      language="python (sugerencia)"
                    />
                  </div>
                  <div className="demo-step">
                    <div className="demo-number">3</div>
                    <h4>Presiona Tab para aceptar</h4>
                    <CodeBlock
                      code={`# Función que calcula el promedio de una lista
def calcular_promedio(lista):
    return sum(lista) / len(lista)  # ✅ Aceptada`}
                    />
                  </div>
                </div>

                <div className="shortcuts-box">
                  <h3 className="shortcuts-title">⌨️ Atajos de Teclado</h3>
                  <div className="shortcuts-grid">
                    <div className="shortcut-item">
                      <kbd>Tab</kbd>
                      <span>Aceptar sugerencia completa</span>
                    </div>
                    <div className="shortcut-item">
                      <kbd>Ctrl/Cmd + →</kbd>
                      <span>Aceptar palabra por palabra</span>
                    </div>
                    <div className="shortcut-item">
                      <kbd>Esc</kbd>
                      <span>Rechazar sugerencia</span>
                    </div>
                    <div className="shortcut-item">
                      <kbd>Alt/Option + ]</kbd>
                      <span>Ver siguiente sugerencia</span>
                    </div>
                    <div className="shortcut-item">
                      <kbd>Alt/Option + [</kbd>
                      <span>Ver sugerencia anterior</span>
                    </div>
                    <div className="shortcut-item">
                      <kbd>Ctrl/Cmd + Enter</kbd>
                      <span>Abrir panel de sugerencias</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="examples-section">
                <h3 className="section-subtitle">Ejemplos Prácticos</h3>

                <div className="example-card">
                  <h4 className="example-title">📊 Data Science: Cargar y Limpiar Datos</h4>
                  <div className="example-comparison">
                    <div>
                      <span className="example-label">Tú escribes:</span>
                      <CodeBlock
                        code={`import pandas as pd

# Cargar el dataset de ventas y limpiar valores nulos`}
                      />
                    </div>
                    <div>
                      <span className="example-label success">Copilot sugiere:</span>
                      <CodeBlock
                        code={`import pandas as pd

# Cargar el dataset de ventas y limpiar valores nulos
df = pd.read_csv('ventas.csv')
df = df.dropna()
df = df.drop_duplicates()`}
                      />
                    </div>
                  </div>
                </div>

                <div className="example-card">
                  <h4 className="example-title">🤖 Machine Learning: Entrenar Modelo</h4>
                  <div className="example-comparison">
                    <div>
                      <span className="example-label">Tú escribes:</span>
                      <CodeBlock
                        code={`from sklearn.ensemble import RandomForestClassifier

# Entrenar un Random Forest con 100 árboles`}
                      />
                    </div>
                    <div>
                      <span className="example-label success">Copilot sugiere:</span>
                      <CodeBlock
                        code={`from sklearn.ensemble import RandomForestClassifier

# Entrenar un Random Forest con 100 árboles
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: COPILOT CHAT */}
          {activeSection === 'copilot-chat' && (
            <div className="section-content">
              <h2 className="section-title">4. Copilot Chat: Tu Asistente Conversacional</h2>
              <p className="section-intro">
                Chatea con Copilot para obtener ayuda, explicaciones y generar código:
              </p>

              <div className="chat-features">
                <div className="chat-access">
                  <h3 className="chat-subtitle">🚀 Cómo Abrir Copilot Chat</h3>
                  <div className="access-methods">
                    <div className="access-method">
                      <Code2 className="access-icon" />
                      <div>
                        <strong>Sidebar de Chat</strong>
                        <p>
                          Haz clic en el ícono de chat <MessageSquare className="inline-icon" /> en
                          la barra lateral izquierda
                        </p>
                      </div>
                    </div>
                    <div className="access-method">
                      <Terminal className="access-icon" />
                      <div>
                        <strong>Inline Chat</strong>
                        <p>
                          Presiona <kbd>Ctrl/Cmd + I</kbd> para abrir el chat en línea dentro del
                          editor
                        </p>
                      </div>
                    </div>
                    <div className="access-method">
                      <FileCode className="access-icon" />
                      <div>
                        <strong>Quick Chat</strong>
                        <p>
                          Presiona <kbd>Ctrl/Cmd + Shift + I</kbd> para un chat rápido flotante
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="chat-use-cases">
                  <h3 className="chat-subtitle">💬 Qué Puedes Hacer con Copilot Chat</h3>

                  <div className="use-case-grid">
                    <div className="use-case-card">
                      <div className="use-case-header">
                        <Lightbulb className="use-case-icon" />
                        <h4>Explicar Código</h4>
                      </div>
                      <div className="chat-example">
                        <div className="chat-message user">
                          <strong>Tú:</strong> ¿Qué hace esta función?
                        </div>
                        <div className="chat-message copilot">
                          <strong>Copilot:</strong> Esta función implementa el algoritmo de búsqueda
                          binaria. Recibe una lista ordenada y un valor objetivo, y retorna el
                          índice...
                        </div>
                      </div>
                    </div>

                    <div className="use-case-card">
                      <div className="use-case-header">
                        <Bug className="use-case-icon" />
                        <h4>Encontrar y Corregir Bugs</h4>
                      </div>
                      <div className="chat-example">
                        <div className="chat-message user">
                          <strong>Tú:</strong> ¿Por qué obtengo un IndexError en la línea 45?
                        </div>
                        <div className="chat-message copilot">
                          <strong>Copilot:</strong> El error ocurre porque estás intentando acceder
                          a lista[i+1] pero cuando i es el último índice, i+1 está fuera de rango...
                        </div>
                      </div>
                    </div>

                    <div className="use-case-card">
                      <div className="use-case-header">
                        <Code2 className="use-case-icon" />
                        <h4>Generar Código Complejo</h4>
                      </div>
                      <div className="chat-example">
                        <div className="chat-message user">
                          <strong>Tú:</strong> Crea una función que lea un CSV, lo convierta a JSON
                          y lo guarde
                        </div>
                        <div className="chat-message copilot">
                          <strong>Copilot:</strong> Aquí está la función:
                          <br />
                          <code>def csv_to_json(csv_file, json_file): ...</code>
                        </div>
                      </div>
                    </div>

                    <div className="use-case-card">
                      <div className="use-case-header">
                        <TestTube className="use-case-icon" />
                        <h4>Generar Tests</h4>
                      </div>
                      <div className="chat-example">
                        <div className="chat-message user">
                          <strong>Tú:</strong> Genera unit tests para la función calcular_promedio
                        </div>
                        <div className="chat-message copilot">
                          <strong>Copilot:</strong> Aquí tienes los tests usando pytest:
                          <br />
                          <code>def test_calcular_promedio(): ...</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <TipBox type="success">
                  <strong>Consejo Pro:</strong> Puedes <strong>seleccionar código</strong> en el
                  editor y luego hacer una pregunta en Copilot Chat. El AI usará ese código como
                  contexto para su respuesta.
                </TipBox>
              </div>
            </div>
          )}

          {/* SECTION: SLASH COMMANDS */}
          {activeSection === 'slash-commands' && (
            <div className="section-content">
              <h2 className="section-title">5. Slash Commands: Comandos Poderosos</h2>
              <p className="section-intro">
                Los Slash Commands son atajos para tareas específicas en Copilot Chat:
              </p>

              <div className="slash-commands-grid">
                <div className="command-card">
                  <div className="command-header">
                    <Terminal className="command-icon" />
                    <code className="command-name">/explain</code>
                  </div>
                  <p className="command-description">
                    <strong>Explica el código seleccionado</strong> en lenguaje simple.
                  </p>
                  <div className="command-example">
                    <strong>Ejemplo:</strong>
                    <p className="command-usage">
                      Selecciona una función compleja → Escribe <code>/explain</code> en el chat
                    </p>
                    <div className="command-result">
                      <strong>Resultado:</strong> Copilot te da una explicación detallada paso a
                      paso de qué hace la función.
                    </div>
                  </div>
                </div>

                <div className="command-card">
                  <div className="command-header">
                    <Bug className="command-icon" />
                    <code className="command-name">/fix</code>
                  </div>
                  <p className="command-description">
                    <strong>Sugiere correcciones</strong> para el código problemático.
                  </p>
                  <div className="command-example">
                    <strong>Ejemplo:</strong>
                    <p className="command-usage">
                      Selecciona código con bug → Escribe <code>/fix</code>
                    </p>
                    <div className="command-result">
                      <strong>Resultado:</strong> Copilot identifica el problema y propone una
                      solución.
                    </div>
                  </div>
                </div>

                <div className="command-card">
                  <div className="command-header">
                    <TestTube className="command-icon" />
                    <code className="command-name">/tests</code>
                  </div>
                  <p className="command-description">
                    <strong>Genera unit tests</strong> para la función o clase seleccionada.
                  </p>
                  <div className="command-example">
                    <strong>Ejemplo:</strong>
                    <p className="command-usage">
                      Selecciona una función → Escribe <code>/tests</code>
                    </p>
                    <div className="command-result">
                      <strong>Resultado:</strong> Copilot genera tests completos con pytest o
                      unittest.
                    </div>
                  </div>
                </div>

                <div className="command-card">
                  <div className="command-header">
                    <FileCode className="command-icon" />
                    <code className="command-name">/doc</code>
                  </div>
                  <p className="command-description">
                    <strong>Genera documentación</strong> (docstrings) para tu código.
                  </p>
                  <div className="command-example">
                    <strong>Ejemplo:</strong>
                    <p className="command-usage">
                      Selecciona una función → Escribe <code>/doc</code>
                    </p>
                    <div className="command-result">
                      <strong>Resultado:</strong> Copilot añade docstrings con descripción,
                      parámetros y return.
                    </div>
                  </div>
                </div>

                <div className="command-card">
                  <div className="command-header">
                    <Sparkles className="command-icon" />
                    <code className="command-name">/optimize</code>
                  </div>
                  <p className="command-description">
                    <strong>Optimiza el código</strong> para mejor rendimiento.
                  </p>
                  <div className="command-example">
                    <strong>Ejemplo:</strong>
                    <p className="command-usage">
                      Selecciona código lento → Escribe <code>/optimize</code>
                    </p>
                    <div className="command-result">
                      <strong>Resultado:</strong> Copilot sugiere una versión más eficiente (ej:
                      vectorización en pandas).
                    </div>
                  </div>
                </div>

                <div className="command-card">
                  <div className="command-header">
                    <Code2 className="command-icon" />
                    <code className="command-name">/simplify</code>
                  </div>
                  <p className="command-description">
                    <strong>Simplifica código complejo</strong> haciéndolo más legible.
                  </p>
                  <div className="command-example">
                    <strong>Ejemplo:</strong>
                    <p className="command-usage">
                      Selecciona código complicado → Escribe <code>/simplify</code>
                    </p>
                    <div className="command-result">
                      <strong>Resultado:</strong> Copilot refactoriza para hacer el código más
                      simple y claro.
                    </div>
                  </div>
                </div>
              </div>

              <div className="practical-workflow">
                <h3 className="workflow-title">🔄 Flujo de Trabajo Recomendado</h3>
                <div className="workflow-steps-visual">
                  <div className="workflow-step">
                    <span className="step-num">1</span>
                    <p>Escribe código inicial</p>
                  </div>
                  <span className="workflow-arrow">→</span>
                  <div className="workflow-step">
                    <span className="step-num">2</span>
                    <p>
                      Usa <code>/explain</code> para entenderlo
                    </p>
                  </div>
                  <span className="workflow-arrow">→</span>
                  <div className="workflow-step">
                    <span className="step-num">3</span>
                    <p>
                      Usa <code>/optimize</code> para mejorar
                    </p>
                  </div>
                  <span className="workflow-arrow">→</span>
                  <div className="workflow-step">
                    <span className="step-num">4</span>
                    <p>
                      Usa <code>/tests</code> para validar
                    </p>
                  </div>
                  <span className="workflow-arrow">→</span>
                  <div className="workflow-step">
                    <span className="step-num">5</span>
                    <p>
                      Usa <code>/doc</code> para documentar
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: MEJORES PRACTICAS */}
          {activeSection === 'mejores-practicas' && (
            <div className="section-content">
              <h2 className="section-title">6. Mejores Prácticas con Copilot</h2>
              <p className="section-intro">
                Maximiza tu productividad siguiendo estos consejos probados:
              </p>

              <div className="practices-grid">
                <div className="practice-card">
                  <div className="practice-badge">1</div>
                  <h3 className="practice-title">Escribe Comentarios Descriptivos</h3>
                  <p className="practice-text">
                    Copilot funciona mejor cuando proporcionas contexto claro en comentarios:
                  </p>
                  <div className="practice-examples">
                    <div className="practice-bad">
                      <span className="practice-label">❌ Vago</span>
                      <code># procesar datos</code>
                    </div>
                    <div className="practice-good">
                      <span className="practice-label">✅ Específico</span>
                      <code>
                        # Leer CSV, filtrar filas con age {'>'} 18, y calcular promedio de salary
                        por departamento
                      </code>
                    </div>
                  </div>
                </div>

                <div className="practice-card">
                  <div className="practice-badge">2</div>
                  <h3 className="practice-title">Usa Nombres Descriptivos de Variables</h3>
                  <p className="practice-text">
                    Nombres claros ayudan a Copilot a entender tu intención:
                  </p>
                  <CodeBlock
                    code={`# Copilot entiende mejor con nombres claros
customer_data = pd.read_csv('customers.csv')
high_value_customers = customer_data[customer_data['total_spent'] > 1000]

# vs nombres genéricos como 'df', 'data', 'x'`}
                  />
                </div>

                <div className="practice-card">
                  <div className="practice-badge">3</div>
                  <h3 className="practice-title">Divide Tareas Complejas</h3>
                  <p className="practice-text">En lugar de pedir todo a la vez, divide en pasos:</p>
                  <CodeBlock
                    code={`# Paso 1: Cargar datos
df = pd.read_csv('sales.csv')

# Paso 2: Limpiar valores nulos
df = df.dropna(subset=['price', 'quantity'])

# Paso 3: Crear columna de total
df['total'] = df['price'] * df['quantity']

# Copilot completa cada paso de manera más precisa`}
                  />
                </div>

                <div className="practice-card">
                  <div className="practice-badge">4</div>
                  <h3 className="practice-title">Revisa y Valida el Código Generado</h3>
                  <p className="practice-text">
                    <strong>SIEMPRE</strong> lee y entiende el código antes de aceptarlo:
                  </p>
                  <ul className="practice-checklist">
                    <li>✓ ¿El código hace lo que esperas?</li>
                    <li>✓ ¿Maneja casos edge correctamente?</li>
                    <li>✓ ¿Hay imports faltantes?</li>
                    <li>✓ ¿Es eficiente para tu caso de uso?</li>
                  </ul>
                </div>

                <div className="practice-card">
                  <div className="practice-badge">5</div>
                  <h3 className="practice-title">Aprovecha el Contexto del Archivo</h3>
                  <p className="practice-text">
                    Copilot lee todo tu archivo actual. Usa esto a tu favor:
                  </p>
                  <CodeBlock
                    code={`# Al inicio del archivo, define tus imports y constantes
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

# Copilot usará estos imports en sugerencias posteriores
# No tendrás que repetir los imports`}
                  />
                </div>

                <div className="practice-card">
                  <div className="practice-badge">6</div>
                  <h3 className="practice-title">Itera con Copilot Chat</h3>
                  <p className="practice-text">
                    Si la sugerencia no es perfecta, usa el chat para refinar:
                  </p>
                  <div className="iteration-flow">
                    <div className="iteration-step">
                      <strong>1ra iteración:</strong> "Crea una función para limpiar datos"
                    </div>
                    <div className="iteration-step">
                      <strong>2da iteración:</strong> "Modifícala para que también maneje fechas"
                    </div>
                    <div className="iteration-step">
                      <strong>3ra iteración:</strong> "Añade logging de errores"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: CASOS USO */}
          {activeSection === 'casos-uso' && (
            <div className="section-content">
              <h2 className="section-title">7. Casos de Uso Reales</h2>
              <p className="section-intro">
                Ejemplos prácticos de cómo usar Copilot en escenarios reales de Data Science:
              </p>

              <div className="real-cases">
                <div className="case-study-card">
                  <div className="case-header">
                    <span className="case-icon">📊</span>
                    <h3>Caso 1: EDA Rápido de un Dataset</h3>
                  </div>
                  <div className="case-scenario">
                    <strong>Escenario:</strong> Acabas de recibir un nuevo dataset y necesitas
                    entenderlo rápidamente.
                  </div>
                  <div className="case-steps">
                    <div className="case-step">
                      <strong>Paso 1:</strong> Escribe comentario y deja que Copilot complete
                      <CodeBlock
                        code={`import pandas as pd

# Cargar dataset y mostrar información básica
df = pd.read_csv('new_dataset.csv')
print(df.info())
print(df.describe())
print(df.head())`}
                      />
                    </div>
                    <div className="case-step">
                      <strong>Paso 2:</strong> Usa Copilot Chat para análisis más profundo
                      <div className="chat-interaction">
                        <div className="chat-msg user">
                          Tú: Analiza este dataset y sugiere qué columnas podrían tener problemas
                        </div>
                        <div className="chat-msg assistant">
                          Copilot: Basándome en el código, veo que hay 3 columnas con muchos
                          nulos...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="case-study-card">
                  <div className="case-header">
                    <span className="case-icon">🤖</span>
                    <h3>Caso 2: Pipeline de ML Completo</h3>
                  </div>
                  <div className="case-scenario">
                    <strong>Escenario:</strong> Necesitas crear un pipeline de Machine Learning
                    desde cero.
                  </div>
                  <div className="case-steps">
                    <div className="case-step">
                      <strong>Con Copilot:</strong> Escribe comentarios para cada paso
                      <CodeBlock
                        code={`# 1. Cargar y dividir datos
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# 2. Crear pipeline con preprocessing y modelo
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier(n_estimators=100))
])

# 3. Entrenar y evaluar
pipeline.fit(X_train, y_train)
score = pipeline.score(X_test, y_test)
print(f'Accuracy: {score:.2%}')`}
                      />
                    </div>
                  </div>
                  <TipBox type="success">
                    Copilot completó automáticamente todo el código del pipeline siguiendo las
                    mejores prácticas de scikit-learn.
                  </TipBox>
                </div>

                <div className="case-study-card">
                  <div className="case-header">
                    <span className="case-icon">🐛</span>
                    <h3>Caso 3: Debugging de Código Complejo</h3>
                  </div>
                  <div className="case-scenario">
                    <strong>Escenario:</strong> Tienes un bug en tu código de procesamiento de datos
                    y no sabes dónde está.
                  </div>
                  <div className="case-steps">
                    <div className="case-step">
                      <strong>Solución con Slash Commands:</strong>
                      <ol className="case-list">
                        <li>Selecciona la función problemática</li>
                        <li>
                          Abre Copilot Chat (<kbd>Ctrl/Cmd + I</kbd>)
                        </li>
                        <li>
                          Escribe <code>/explain</code> para entender el código
                        </li>
                        <li>
                          Si encuentras el bug, escribe <code>/fix</code>
                        </li>
                        <li>Copilot sugerirá la corrección</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="case-study-card">
                  <div className="case-header">
                    <span className="case-icon">📝</span>
                    <h3>Caso 4: Documentar Código Legacy</h3>
                  </div>
                  <div className="case-scenario">
                    <strong>Escenario:</strong> Heredaste código sin documentación y necesitas
                    añadir docstrings.
                  </div>
                  <div className="case-steps">
                    <div className="case-step">
                      <strong>Proceso:</strong>
                      <ol className="case-list">
                        <li>Selecciona cada función una por una</li>
                        <li>
                          Usa <code>/doc</code> en Copilot Chat
                        </li>
                        <li>
                          Copilot genera docstrings completos con:
                          <ul>
                            <li>Descripción de la función</li>
                            <li>Parámetros con tipos</li>
                            <li>Valor de retorno</li>
                            <li>Ejemplos de uso</li>
                          </ul>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="productivity-boost">
                <h3 className="boost-title">⚡ Impacto en Productividad</h3>
                <div className="boost-stats">
                  <div className="boost-stat">
                    <div className="boost-number">70%</div>
                    <p>Menos tiempo escribiendo boilerplate</p>
                  </div>
                  <div className="boost-stat">
                    <div className="boost-number">50%</div>
                    <p>Reducción en tiempo de debugging</p>
                  </div>
                  <div className="boost-stat">
                    <div className="boost-number">3x</div>
                    <p>Más rápido documentando código</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: LIMITACIONES */}
          {activeSection === 'limitaciones' && (
            <div className="section-content">
              <h2 className="section-title">8. Limitaciones y Consideraciones</h2>
              <p className="section-intro">
                Es importante conocer las limitaciones para usar Copilot de manera efectiva y
                segura:
              </p>

              <div className="limitations-section">
                <div className="limitation-category warning">
                  <div className="category-header">
                    <AlertTriangle className="category-icon" />
                    <h3>⚠️ Limitaciones Técnicas</h3>
                  </div>
                  <ul className="limitation-list">
                    <li>
                      <strong>No siempre es correcto:</strong> Copilot puede generar código con bugs
                      o lógica incorrecta. SIEMPRE revisa el código antes de usarlo.
                    </li>
                    <li>
                      <strong>Contexto limitado:</strong> Solo ve el archivo actual y algunos
                      archivos relacionados. No conoce toda tu arquitectura de proyecto.
                    </li>
                    <li>
                      <strong>Puede sugerir código obsoleto:</strong> A veces sugiere librerías o
                      métodos deprecados. Verifica las versiones.
                    </li>
                    <li>
                      <strong>Depende de tu descripción:</strong> Si tu comentario es vago, la
                      sugerencia será genérica.
                    </li>
                  </ul>
                </div>

                <div className="limitation-category security">
                  <div className="category-header">
                    <ShieldCheck className="category-icon" />
                    <h3>🔒 Privacidad y Seguridad</h3>
                  </div>
                  <TipBox type="warning">
                    <strong>CRÍTICO:</strong> GitHub Copilot envía fragmentos de tu código a los
                    servidores de OpenAI para procesar.
                  </TipBox>

                  <div className="security-guidelines">
                    <h4>❌ NO hacer:</h4>
                    <ul className="security-dont-list">
                      <li>NO incluyas API keys, tokens o credenciales en el código</li>
                      <li>
                        NO trabajes con datos sensibles (PII, datos médicos, financieros) sin
                        ofuscar
                      </li>
                      <li>
                        NO uses Copilot en proyectos con NDA estrictos sin verificar políticas
                      </li>
                      <li>NO confíes ciegamente en código de seguridad generado por Copilot</li>
                    </ul>

                    <h4>✅ SÍ hacer:</h4>
                    <ul className="security-do-list">
                      <li>Usa variables de entorno para secretos</li>
                      <li>
                        Configura <code>.copilotignore</code> para excluir archivos sensibles
                      </li>
                      <li>Revisa las políticas de tu empresa antes de usar Copilot</li>
                      <li>Usa Copilot for Business si necesitas controles empresariales</li>
                    </ul>
                  </div>
                </div>

                <div className="limitation-category cost">
                  <div className="category-header">
                    <span className="category-icon">💰</span>
                    <h3>💵 Costos</h3>
                  </div>
                  <div className="pricing-info">
                    <div className="pricing-tier">
                      <strong>Individual:</strong> $10/mes o $100/año
                    </div>
                    <div className="pricing-tier">
                      <strong>Business:</strong> $19/usuario/mes (con features adicionales)
                    </div>
                    <div className="pricing-tier free">
                      <strong>Gratis para:</strong> Estudiantes verificados y mantenedores de
                      proyectos open source populares
                    </div>
                  </div>
                </div>

                <div className="when-not-use">
                  <h3 className="when-not-title">🚫 Cuándo NO Depender de Copilot</h3>
                  <div className="when-not-grid">
                    <div className="when-not-card">
                      <h4>Algoritmos Críticos</h4>
                      <p>
                        Para lógica de negocio crítica, encriptación, o algoritmos de seguridad,
                        escribe el código manualmente.
                      </p>
                    </div>
                    <div className="when-not-card">
                      <h4>Aprendizaje</h4>
                      <p>
                        Si estás aprendiendo a programar, no dependas de Copilot. Intenta resolver
                        por ti mismo primero.
                      </p>
                    </div>
                    <div className="when-not-card">
                      <h4>Código de Producción Crítico</h4>
                      <p>
                        Código que afecta vidas o dinero debe ser revisado exhaustivamente por
                        humanos.
                      </p>
                    </div>
                    <div className="when-not-card">
                      <h4>Problemas de Performance</h4>
                      <p>Para optimizaciones extremas, profiling manual es más confiable.</p>
                    </div>
                  </div>
                </div>

                <div className="final-thoughts">
                  <h3 className="thoughts-title">💭 Reflexión Final</h3>
                  <div className="thoughts-content">
                    <p>
                      GitHub Copilot es una <strong>herramienta increíblemente poderosa</strong> que
                      puede multiplicar tu productividad, PERO:
                    </p>
                    <div className="thoughts-points">
                      <div className="thought-point">
                        <CheckCircle2 className="thought-icon" />
                        <p>No reemplaza tu conocimiento y experiencia</p>
                      </div>
                      <div className="thought-point">
                        <CheckCircle2 className="thought-icon" />
                        <p>Requiere validación y revisión constante</p>
                      </div>
                      <div className="thought-point">
                        <CheckCircle2 className="thought-icon" />
                        <p>Es mejor usarlo como asistente, no como piloto automático</p>
                      </div>
                      <div className="thought-point">
                        <CheckCircle2 className="thought-icon" />
                        <p>Tu criterio profesional sigue siendo insustituible</p>
                      </div>
                    </div>
                    <p className="thoughts-conclusion">
                      Úsalo para acelerar tareas repetitivas, aprender nuevas librerías y explorar
                      soluciones, pero <strong>siempre mantén el control</strong> sobre el código
                      que escribes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="copilot-footer"></footer>
    </div>
  );
};
