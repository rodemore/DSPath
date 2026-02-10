import type { TheoryBlock as TheoryBlockType } from '../../types';
import { CodeExample } from '../CodeExample';

interface TheoryBlockProps {
  block: TheoryBlockType;
}

export const TheoryBlock = ({ block }: TheoryBlockProps) => {
  const renderContent = () => {
    if (Array.isArray(block.content)) {
      return (
        <ul>
          {block.content.map((item, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
    }
    return <p dangerouslySetInnerHTML={{ __html: block.content }} />;
  };

  const renderTable = () => {
    if (!block.table) return null;

    return (
      <table className="info-table">
        <thead>
          <tr>
            {block.table.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.table.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {block.table!.headers.map((header, cellIndex) => (
                <td key={cellIndex} dangerouslySetInnerHTML={{ __html: String(row[header] || '') }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="theory-block">
      <h3>
        <span className="icon">{block.icon}</span>
        {block.title}
      </h3>
      {renderContent()}
      {block.codeExample && <CodeExample example={block.codeExample} />}
      {renderTable()}
    </div>
  );
};
