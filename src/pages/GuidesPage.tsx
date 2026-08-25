import { useNavigate } from 'react-router-dom';
import { BookOpen, Sparkles, Code2, Cpu } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import './GuidesPage.css';

interface Guide {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  path: string;
}

export const GuidesPage = () => {
  const navigate = useNavigate();

  const guides: Guide[] = [
    {
      id: 'genia',
      title: 'Guía de Uso de Genia',
      description:
        'Aprende a usar Genia como un profesional: desde prompts básicos hasta técnicas avanzadas de ingeniería de prompts para Data Science.',
      icon: <Sparkles size={32} />,
      color: '#3b82f6',
      path: '/guides/genia',
    },
    {
      id: 'colab-ai',
      title: 'Asistente de IA en Google Colab',
      description:
        'Guía completa para activar y sacarle el máximo provecho al asistente de IA de Google Colab: autocompletado, generación de código, debugging y más.',
      icon: <Code2 size={32} />,
      color: '#f97316',
      path: '/guides/colab-ai',
    },
    {
      id: 'copilot',
      title: 'GitHub Copilot en VS Code',
      description:
        'Domina GitHub Copilot en Visual Studio Code: instalación, Copilot Chat, Slash Commands, mejores prácticas y casos de uso reales.',
      icon: <Cpu size={32} />,
      color: '#7c3aed',
      path: '/guides/copilot',
    },
  ];

  const handleGuideSelect = (guidePath: string) => {
    navigate(guidePath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="guides-page">
      <nav className="landing-nav">
        <div className="nav-content">
          <div className="logo" onClick={handleBackToHome} style={{ cursor: 'pointer' }}>
            <span className="py">DS</span>
            <span className="lab">Path</span>
          </div>
          <div className="nav-links">
            <a href="/" className="nav-link">
              Cursos
            </a>
            <a href="#" className="nav-link disabled">
              Proyectos
            </a>
            <a href="/guides" className="nav-link active">
              Guías
            </a>
          </div>
        </div>
      </nav>

      <div className="guides-header">
        <h1 className="guides-title">
          <span className="guides-icon">
            <BookOpen size={48} />
          </span>
          Guías de Aprendizaje
        </h1>
        <p className="guides-subtitle">
          Recursos completos y tutoriales para dominar herramientas y técnicas de Data Science
        </p>
      </div>

      <div className="guides-section">
        <div className="guides-section-header">
          <h2 className="guides-section-title">
            <span className="section-icon">📚</span> Guías Disponibles
          </h2>
        </div>
        <main className="guides-grid">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="guide-card"
              onClick={() => handleGuideSelect(guide.path)}
              style={{ borderLeftColor: guide.color }}
            >
              <div className="guide-card-header">
                <div className="guide-icon" style={{ color: guide.color }}>
                  {guide.icon}
                </div>
                <h3 className="guide-card-title">{guide.title}</h3>
              </div>
              <p className="guide-card-description">{guide.description}</p>
              <div className="guide-card-footer">
                <button className="guide-button" style={{ backgroundColor: guide.color }}>
                  Ver guía →
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>

      <ThemeToggle />
    </div>
  );
};
