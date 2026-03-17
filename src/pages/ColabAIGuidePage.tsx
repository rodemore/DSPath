import { useNavigate } from 'react-router-dom';
import { ColabAIGuide } from '../components/ColabAIGuide';
import { ArrowLeft } from 'lucide-react';
import './GeniaGuidePage.css';

export const ColabAIGuidePage = () => {
  const navigate = useNavigate();

  const handleBackToGuides = () => {
    navigate('/guides');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="genia-guide-page">
      <div className="guide-nav">
        <button onClick={handleBackToGuides} className="back-to-guides-button">
          <ArrowLeft size={20} />
          Volver a Guías
        </button>
      </div>
      <ColabAIGuide />
    </div>
  );
};
