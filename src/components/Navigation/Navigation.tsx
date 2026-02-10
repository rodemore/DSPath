interface NavigationProps {
  sections: Array<{ id: number; title: string }>;
  activeSection: number;
  onSectionChange: (sectionId: number) => void;
}

export const Navigation = ({ sections, activeSection, onSectionChange }: NavigationProps) => {
  return (
    <nav className="nav-container">
      <div className="nav-scroll">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => onSectionChange(section.id)}
          >
            <span className="num">{section.id + 1}</span>
            {section.title}
          </button>
        ))}
      </div>
    </nav>
  );
};
