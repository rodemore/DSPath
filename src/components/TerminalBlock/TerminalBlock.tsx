import './TerminalBlock.css';

interface TerminalBlockProps {
  command: string;
  description?: string;
}

export const TerminalBlock = ({ command, description }: TerminalBlockProps) => {
  return (
    <div className="terminal-block">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <span className="terminal-title">Terminal</span>
      </div>
      <div className="terminal-body">
        <div className="terminal-line">
          <span className="terminal-prompt">$</span>
          <span className="terminal-command">{command}</span>
        </div>
        {description && (
          <div className="terminal-description">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
