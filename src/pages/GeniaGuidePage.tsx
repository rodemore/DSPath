import { useNavigate } from 'react-router-dom';
import { GeniaGuide } from '../components/GeniaGuide';
import { ArrowLeft } from 'lucide-react';
import './GeniaGuidePage.css';

export const GeniaGuidePage = () => {
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
      <GeniaGuide />
    </div>
  );
};
