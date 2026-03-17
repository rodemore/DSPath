import { useState } from 'react';
import {
  Terminal,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  BookOpen,
  Database,
  ShieldCheck,
  Zap,
  ChevronRight,
  Target,
  Lightbulb,
  FileCode
} from 'lucide-react';
import './GeniaGuide.css';
import '../../styles/guides-theme.css';

type SectionId = 'intro' | 'principios' | 'anatomia' | 'contexto' | 'eda' | 'optimization' | 'estrategia' | 'caso-real' | 'validación';

interface Section {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
}

interface CodeBlockProps {
  code: string;
  language?: string;
}

interface PromptBoxProps {
  type: 'weak' | 'strong';
  children: React.ReactNode;
}

const CodeBlock = ({ code, language = "python" }: CodeBlockProps) => (
  <div className="genia-code-block">
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

const PromptBox = ({ type, children }: PromptBoxProps) => (
  <div className={`prompt-box ${type}`}>
    <div className="prompt-header">
      {type === 'weak' ? <AlertTriangle className="prompt-icon"/> : <Target className="prompt-icon"/>}
      {type === 'weak' ? 'Prompt Débil' : 'Prompt Elite'}
    </div>
    <p className="prompt-content">{children}</p>
  </div>
);

export const GeniaGuide = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('intro');

  const sections: Section[] = [
    { id: 'intro', label: '1. Introducción', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'principios', label: '2. El Rol del Copiloto', icon: <Cpu className="w-4 h-4" /> },
    { id: 'anatomia', label: '3. Anatomía del Prompt', icon: <Terminal className="w-4 h-4" /> },
    { id: 'contexto', label: '4. Estrategia de Contexto', icon: <Database className="w-4 h-4" /> },
    { id: 'eda', label: '5. EDA & Visualización', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'optimization', label: '6. Optimización & Refactor', icon: <Zap className="w-4 h-4" /> },
    { id: 'estrategia', label: '7. Planificación Estratégica', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'caso-real', label: '8. Caso de Uso Real', icon: <FileCode className="w-4 h-4" /> },
    { id: 'validación', label: '9. Validación & Errores', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="genia-guide-container">
      {/* Header */}
      <header className="genia-header">
        <div className="header-content">
          <h1 className="header-title">
            Ingeniería de Prompts <br/> <span className="title-highlight">para Data Science con Genia</span>
          </h1>
          <p className="header-subtitle">
            Domina la colaboración con Genia para escalar tu productividad técnica de "copiar código" a "arquitecturar soluciones".
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
            <h3 className="sidebar-title">Módulos de Aprendizaje</h3>
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
              <h2 className="section-title">1. Programación Asistida con Genia: El Nuevo Paradigma</h2>
              <div className="section-text">
                <p className="section-paragraph">
                  En el pasado, un Data Scientist pasaba el 60% de su tiempo depurando sintaxis en StackOverflow. Hoy, con <strong>Genia</strong>, el foco ha cambiado hacia el <strong>diseño de prompts contextuales</strong> y la <strong>validación de lógica</strong>.
                </p>
                <div className="feature-grid">
                  {[
                    { title: 'Velocidad', desc: 'Generación de boilerplate y scripts de limpieza en segundos.', color: 'blue' },
                    { title: 'Calidad', desc: 'Refactorización instantánea para seguir estándares PEP8.', color: 'emerald' },
                    { title: 'Exploración', desc: 'Posibilidad de probar 5 arquitecturas de modelos en 10 minutos.', color: 'purple' }
                  ].map((item, idx) => (
                    <div key={idx} className={`feature-card ${item.color}`}>
                      <h4 className="feature-title">{item.title}</h4>
                      <p className="feature-desc">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION: PRINCIPIOS */}
          {activeSection === 'principios' && (
            <div className="section-content">
              <h2 className="section-title">2. La Mentalidad del Senior</h2>
              <div className="principle-card">
                <div className="principle-content">
                  <div>
                    <h3 className="principle-title">Genia no es el "Piloto", es tu "Copiloto"</h3>
                    <ul className="principle-list">
                      <li className="principle-item">
                        <div className="principle-check"><CheckCircle2 className="check-icon"/></div>
                        <span><strong>Validación Empírica:</strong> Ejecuta siempre el código en un entorno controlado (Notebook) antes de confiar.</span>
                      </li>
                      <li className="principle-item">
                        <div className="principle-check"><CheckCircle2 className="check-icon"/></div>
                        <span><strong>Entendimiento Lógico:</strong> Si no puedes explicar por qué Genia usó una `pivot_table` en lugar de un `groupby`, pídele una explicación técnica.</span>
                      </li>
                      <li className="principle-item">
                        <div className="principle-check"><CheckCircle2 className="check-icon"/></div>
                        <span><strong>Seguridad:</strong> Nunca proporciones PII (Información Personal Identificable) o claves de API.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="ratio-box">
                    <div className="ratio-number">60/40</div>
                    <p className="ratio-label">Relación Esfuerzo</p>
                    <p className="ratio-description">
                      "60% del tiempo pensando en la arquitectura de datos, 40% iterando con Genia para generar la implementación."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: ANATOMIA */}
          {activeSection === 'anatomia' && (
            <div className="section-content">
              <h2 className="section-title">3. Ingeniería de Prompts Elite</h2>
              <p className="section-intro">Comparemos cómo un principiante y un experto piden la misma tarea de limpieza de datos a Genia.</p>

              <div className="prompt-examples">
                <div>
                  <PromptBox type="weak">
                    "Limpia mi dataset de ventas en Python."
                  </PromptBox>
                  <div className="prompt-result error">
                    <AlertTriangle className="result-icon"/> <strong>Resultado:</strong> Código genérico que no funcionará porque Genia no conoce tus columnas ni tus nulos.
                  </div>
                </div>

                <div>
                  <PromptBox type="strong">
                    "Actúa como un Senior Data Engineer. Tengo un DataFrame de ventas (`df`) con columnas: `order_id` (int), `price` (float), `category` (string) y `timestamp` (object). <br/><br/>
                    <strong>Tareas:</strong><br/>
                    1. Convierte `timestamp` a datetime.<br/>
                    2. Imputa valores nulos en `price` usando la mediana de su respectiva `category`.<br/>
                    3. Elimina filas donde `order_id` esté duplicado.<br/><br/>
                    <strong>Formato:</strong> Devuelve una función Python llamada `clean_sales_data` altamente eficiente."
                  </PromptBox>
                  <CodeBlock code={`def clean_sales_data(df):
    # 1. Conversión de tipos
    df['timestamp'] = pd.to_datetime(df['timestamp'])

    # 2. Imputación condicionada (Vectorizada)
    df['price'] = df['price'].fillna(df.groupby('category')['price'].transform('median'))

    # 3. Limpieza de duplicados
    df = df.drop_duplicates(subset=['order_id'])

    return df`} />
                </div>
              </div>
            </div>
          )}

          {/* SECTION: CONTEXTO */}
          {activeSection === 'contexto' && (
            <div className="section-content">
              <h2 className="section-title">4. La Estrategia del Contexto</h2>
              <div className="context-grid">
                <div className="context-card">
                  <div className="context-icon-box">
                    <Database className="context-icon"/>
                  </div>
                  <h3 className="context-title">Cómo "dibujar" tu Dataset para Genia</h3>
                  <p className="context-description">
                    Si no pasas el esquema, Genia alucinará nombres de columnas. Usa este formato:
                  </p>
                  <div className="context-schema">
                    ### CONTEXTO DE DATOS ###<br/>
                    Dataset: Telecom Churn<br/>
                    Columnas: <br/>
                    - customer_id: UUID<br/>
                    - tenure: meses (int)<br/>
                    - monthly_charges: USD (float)<br/>
                    - churn: 'Yes'/'No' (target)<br/>
                    df.head(2): [Copia y pega 2 filas reales]
                  </div>
                </div>
                <div className="tips-stack">
                  <div className="tip-card dark">
                    <h4 className="tip-title"><ChevronRight className="tip-icon"/> Tip Pro</h4>
                    <p className="tip-text">Si el dataset es grande, pega el output de `df.describe().to_string()` para que Genia entienda las distribuciones y rangos.</p>
                  </div>
                  <div className="tip-card blue">
                    <h4 className="tip-title"><ChevronRight className="tip-icon"/> ¿Por qué funciona?</h4>
                    <p className="tip-text">Al conocer los tipos de datos, Genia sugerirá métodos específicos (ej. `.dt.month` solo si sabe que es datetime).</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: EDA */}
          {activeSection === 'eda' && (
            <div className="section-content">
              <h2 className="section-title">5. EDA & Visualización Avanzada</h2>
              <div className="eda-card">
                <div>
                  <h3 className="eda-subtitle">
                    <BarChart3 className="eda-icon" /> Prompt para Storytelling Visual con Genia
                  </h3>
                  <PromptBox type="strong">
                    "Usando Seaborn y Matplotlib, crea un gráfico de calor (Heatmap) de correlación.
                    - Solo incluye variables numéricas.
                    - Usa la paleta de colores 'coolwarm'.
                    - Añade anotaciones con solo 2 decimales.
                    - Haz que el gráfico sea triangular (quitar la parte superior repetida).
                    - Ajusta el tamaño para que sea legible en una presentación (10x8)."
                  </PromptBox>
                  <CodeBlock code={`import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

# Filtrar numéricas
numeric_df = df.select_dtypes(include=[np.number])
corr = numeric_df.corr()

# Máscara para el triángulo superior
mask = np.triu(np.ones_like(corr, dtype=bool))

plt.figure(figsize=(10, 8))
sns.heatmap(corr, mask=mask, annot=True, fmt=".2f", cmap='coolwarm', center=0)
plt.title('Matriz de Correlación de Variables Numéricas', fontsize=16)
plt.show()`} />
                </div>
              </div>
            </div>
          )}

          {/* SECTION: OPTIMIZATION */}
          {activeSection === 'optimization' && (
            <div className="section-content">
              <h2 className="section-title">6. Optimización de Rendimiento</h2>
              <p className="section-intro">Usa Genia para transformar código ineficiente en código de producción.</p>

              <div className="optimization-grid">
                <div className="optimization-card">
                  <h4 className="optimization-title bad">Código Lento (Bucle For)</h4>
                  <CodeBlock code={`# NO HACER ESTO
for index, row in df.iterrows():
    if row['sales'] > 100:
        df.at[index, 'label'] = 'High'
    else:
        df.at[index, 'label'] = 'Low'`} />
                </div>
                <div className="optimization-card">
                  <h4 className="optimization-title good">Prompt de Optimización para Genia</h4>
                  <div className="optimization-prompt">
                    "Tengo un bucle for que itera sobre un DataFrame de 1M de filas. ¿Cómo puedo vectorizar esta lógica usando `np.where` o `.loc` para mejorar el rendimiento?"
                  </div>
                  <CodeBlock code={`# VERSIÓN VECTORIZADA (Genia)
import numpy as np
df['label'] = np.where(df['sales'] > 100, 'High', 'Low')`} />
                </div>
              </div>
            </div>
          )}

          {/* SECTION: ESTRATEGIA */}
          {activeSection === 'estrategia' && (
            <div className="section-content">
              <h2 className="section-title">7. Planificación Estratégica con Genia</h2>
              <p className="section-intro">Antes de escribir código, usa Genia para explorar diferentes enfoques y planificar tu estrategia.</p>

              <div className="strategy-container">
                <div className="strategy-principle">
                  <div className="principle-badge">
                    <Lightbulb className="principle-badge-icon" />
                    <span>Principio Clave</span>
                  </div>
                  <h3 className="strategy-subtitle">No te quedes con la primera respuesta</h3>
                  <p className="strategy-text">
                    La mejor solución rara vez es la primera que obtienes. Pregunta por <strong>alternativas</strong>,
                    <strong> trade-offs</strong> y <strong>mejores prácticas</strong> antes de implementar.
                  </p>
                </div>

                <div className="strategy-examples">
                  <h3 className="examples-title">Prompts para Planificación Estratégica</h3>

                  <div className="strategy-card">
                    <div className="strategy-header">
                      <span className="strategy-number">1</span>
                      <h4>Explorar Enfoques</h4>
                    </div>
                    <PromptBox type="strong">
                      "Tengo un dataset de transacciones bancarias con 5M de filas. Necesito detectar fraudes.
                      ¿Cuáles son las 3 mejores estrategias que podrías proponer? Para cada una, menciona:
                      - Algoritmo/técnica recomendada
                      - Pros y contras
                      - Complejidad de implementación"
                    </PromptBox>
                  </div>

                  <div className="strategy-card">
                    <div className="strategy-header">
                      <span className="strategy-number">2</span>
                      <h4>Comparar Soluciones</h4>
                    </div>
                    <PromptBox type="strong">
                      "¿Qué diferencias hay entre usar Random Forest vs XGBoost para este problema de clasificación desbalanceada?
                      Considera: tiempo de entrenamiento, interpretabilidad, rendimiento con datos desbalanceados, y facilidad de tuning."
                    </PromptBox>
                  </div>

                  <div className="strategy-card">
                    <div className="strategy-header">
                      <span className="strategy-number">3</span>
                      <h4>Validar Decisiones</h4>
                    </div>
                    <PromptBox type="strong">
                      "Estoy pensando en usar SMOTE para balancear mis clases. ¿Es esta la mejor opción o existen alternativas más efectivas?
                      ¿Cuáles serían los riesgos de usar SMOTE en mi caso?"
                    </PromptBox>
                  </div>

                  <div className="strategy-card">
                    <div className="strategy-header">
                      <span className="strategy-number">4</span>
                      <h4>Iterar y Refinar</h4>
                    </div>
                    <PromptBox type="strong">
                      "Propusiste usar MinMaxScaler. ¿Por qué no StandardScaler? ¿En qué casos uno es mejor que otro?
                      Dado que tengo outliers en mi dataset, ¿cambiaría tu recomendación?"
                    </PromptBox>
                  </div>
                </div>

                <div className="strategy-workflow">
                  <h3 className="workflow-subtitle">Flujo de Trabajo Recomendado</h3>
                  <div className="workflow-boxes">
                    <div className="workflow-box">
                      <span className="workflow-step-num">1</span>
                      <p><strong>Pregunta abierta:</strong> "¿Cómo resolverías este problema?"</p>
                    </div>
                    <div className="workflow-arrow">→</div>
                    <div className="workflow-box">
                      <span className="workflow-step-num">2</span>
                      <p><strong>Explora alternativas:</strong> "Dame 3 enfoques diferentes"</p>
                    </div>
                    <div className="workflow-arrow">→</div>
                    <div className="workflow-box">
                      <span className="workflow-step-num">3</span>
                      <p><strong>Profundiza:</strong> "¿Por qué recomiendas X sobre Y?"</p>
                    </div>
                    <div className="workflow-arrow">→</div>
                    <div className="workflow-box">
                      <span className="workflow-step-num">4</span>
                      <p><strong>Valida:</strong> "¿Qué podría salir mal con esta solución?"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: CASO-REAL */}
          {activeSection === 'caso-real' && (
            <div className="section-content">
              <h2 className="section-title">8. Caso de Uso Real: Segmentación de Clientes</h2>
              <p className="section-intro">Veamos un ejemplo completo de cómo usar Genia para resolver un problema real de negocio.</p>

              <div className="case-study">
                <div className="case-context">
                  <h3 className="case-subtitle">📋 Contexto del Problema</h3>
                  <div className="context-box">
                    <p><strong>Situación:</strong> Una empresa de e-commerce quiere segmentar a sus clientes para personalizar campañas de marketing.</p>
                    <p><strong>Dataset:</strong> 50,000 clientes con datos de: compras históricas, frecuencia, monto promedio, categorías preferidas, días desde última compra.</p>
                    <p><strong>Objetivo:</strong> Crear 4-5 segmentos significativos de clientes.</p>
                  </div>
                </div>

                <div className="case-steps">
                  <h3 className="case-subtitle">🔄 Conversación con Genia</h3>

                  <div className="conversation-step">
                    <div className="step-header user">
                      <span className="step-label">Tú</span>
                      <span className="step-title">Prompt 1: Planificación Inicial</span>
                    </div>
                    <div className="step-content">
                      <PromptBox type="strong">
                        "Tengo un dataset de 50k clientes con las siguientes columnas: customer_id, total_purchases (int),
                        avg_order_value (float), purchase_frequency (compras/mes), days_since_last_purchase (int),
                        favorite_category (string).
                        <br/><br/>
                        Quiero segmentar a los clientes. ¿Qué técnica de clustering recomiendas y por qué?
                        Dame al menos 2 opciones con sus pros/contras."
                      </PromptBox>
                    </div>
                  </div>

                  <div className="conversation-step">
                    <div className="step-header genia">
                      <span className="step-label">Genia</span>
                      <span className="step-title">Respuesta: Propuestas de Solución</span>
                    </div>
                    <div className="step-content response">
                      <p><strong>Opción 1: K-Means</strong></p>
                      <ul>
                        <li>✅ Rápido y escalable</li>
                        <li>✅ Fácil de interpretar</li>
                        <li>❌ Sensible a outliers y escala</li>
                      </ul>
                      <p><strong>Opción 2: DBSCAN</strong></p>
                      <ul>
                        <li>✅ Detecta formas arbitrarias</li>
                        <li>✅ Robusto a outliers</li>
                        <li>❌ Difícil elegir hiperparámetros</li>
                      </ul>
                    </div>
                  </div>

                  <div className="conversation-step">
                    <div className="step-header user">
                      <span className="step-label">Tú</span>
                      <span className="step-title">Prompt 2: Preparación de Datos</span>
                    </div>
                    <div className="step-content">
                      <PromptBox type="strong">
                        "Voy a usar K-Means. ¿Qué preprocesamiento necesito? Genera el código Python para:
                        1. Normalizar las variables numéricas
                        2. Codificar 'favorite_category'
                        3. Manejar outliers extremos
                        Usa RobustScaler porque tengo outliers."
                      </PromptBox>
                    </div>
                  </div>

                  <div className="conversation-step">
                    <div className="step-header genia">
                      <span className="step-label">Genia</span>
                      <span className="step-title">Código Generado</span>
                    </div>
                    <div className="step-content">
                      <CodeBlock code={`from sklearn.preprocessing import RobustScaler
from sklearn.preprocessing import LabelEncoder
import pandas as pd

# 1. Separar features numéricas y categóricas
numerical_features = ['total_purchases', 'avg_order_value',
                      'purchase_frequency', 'days_since_last_purchase']
categorical_features = ['favorite_category']

# 2. Encoding de categorías
le = LabelEncoder()
df['category_encoded'] = le.fit_transform(df['favorite_category'])

# 3. Escalar con RobustScaler (resistente a outliers)
scaler = RobustScaler()
df[numerical_features] = scaler.fit_transform(df[numerical_features])

# 4. Dataset final para clustering
X = df[numerical_features + ['category_encoded']]`} />
                    </div>
                  </div>

                  <div className="conversation-step">
                    <div className="step-header user">
                      <span className="step-label">Tú</span>
                      <span className="step-title">Prompt 3: Implementación</span>
                    </div>
                    <div className="step-content">
                      <PromptBox type="strong">
                        "Ahora implementa K-Means. Usa el método del codo para encontrar el K óptimo entre 3 y 8 clusters.
                        Genera un gráfico con matplotlib que muestre la inercia vs número de clusters."
                      </PromptBox>
                    </div>
                  </div>

                  <div className="conversation-step">
                    <div className="step-header genia">
                      <span className="step-label">Genia</span>
                      <span className="step-title">Código Generado</span>
                    </div>
                    <div className="step-content">
                      <CodeBlock code={`from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Método del codo
inertias = []
K_range = range(3, 9)

for k in K_range:
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(X)
    inertias.append(kmeans.inertia_)

# Visualización
plt.figure(figsize=(10, 6))
plt.plot(K_range, inertias, 'bo-', linewidth=2, markersize=8)
plt.xlabel('Número de Clusters (K)', fontsize=12)
plt.ylabel('Inercia', fontsize=12)
plt.title('Método del Codo para K-Means', fontsize=14, fontweight='bold')
plt.grid(True, alpha=0.3)
plt.show()

# Aplicar clustering con K óptimo (ejemplo: 5)
kmeans_final = KMeans(n_clusters=5, random_state=42, n_init=10)
df['cluster'] = kmeans_final.fit_predict(X)`} />
                    </div>
                  </div>

                  <div className="conversation-step">
                    <div className="step-header user">
                      <span className="step-label">Tú</span>
                      <span className="step-title">Prompt 4: Análisis de Resultados</span>
                    </div>
                    <div className="step-content">
                      <PromptBox type="strong">
                        "Perfecto. Ahora ayúdame a interpretar los clusters. Genera código que muestre:
                        - Tamaño de cada cluster
                        - Promedio de cada variable por cluster
                        - Crea nombres descriptivos para cada segmento basados en sus características"
                      </PromptBox>
                    </div>
                  </div>
                </div>

                <div className="case-takeaway">
                  <h3 className="takeaway-title">💡 Lecciones Clave</h3>
                  <div className="takeaway-grid">
                    <div className="takeaway-item">
                      <CheckCircle2 className="takeaway-icon" />
                      <p><strong>Conversación iterativa:</strong> Cada prompt construye sobre el anterior</p>
                    </div>
                    <div className="takeaway-item">
                      <CheckCircle2 className="takeaway-icon" />
                      <p><strong>Contexto específico:</strong> Siempre incluye detalles del dataset</p>
                    </div>
                    <div className="takeaway-item">
                      <CheckCircle2 className="takeaway-icon" />
                      <p><strong>Validación constante:</strong> Pregunta por alternativas y trade-offs</p>
                    </div>
                    <div className="takeaway-item">
                      <CheckCircle2 className="takeaway-icon" />
                      <p><strong>Código + Entendimiento:</strong> No solo código, también explicaciones</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: VALIDACION */}
          {activeSection === 'validación' && (
            <div className="section-content">
              <h2 className="section-title">9. Validación de Respuestas de Genia</h2>
              <div className="validation-grid">
                <div className="validation-card warning">
                  <h3 className="validation-title">
                    <AlertTriangle className="validation-icon" /> Errores Críticos
                  </h3>
                  <ul className="validation-list">
                    <li className="validation-item"><strong>1. Alucinación de Librerías:</strong> Genia sugiere `pandas.magic_clean()` (que no existe).</li>
                    <li className="validation-item"><strong>2. Bias de Entrenamiento:</strong> Sugiere modelos que no se adaptan al desbalanceo de tus clases.</li>
                    <li className="validation-item"><strong>3. Código Depreciado:</strong> Usa funciones que en la versión actual de Scikit-Learn lanzan un `FutureWarning`.</li>
                  </ul>
                </div>

                <div className="validation-card success">
                  <h3 className="validation-title">
                    <ShieldCheck className="validation-icon" /> Senior Checklist
                  </h3>
                  <div className="checklist">
                    {["¿El código maneja NaNs?", "¿Es el algoritmo adecuado para el tamaño del dato?", "¿La métrica de evaluación es razonable (ej. F1 vs Accuracy)?", "¿Es legible para otros humanos?"].map((check, i) => (
                      <label key={i} className="checklist-item">
                        <input type="checkbox" className="checklist-checkbox" />
                        <span className="checklist-text">{check}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className="genia-footer">
      </footer>
    </div>
  );
};
