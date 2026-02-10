import type { CodeExample as CodeExampleType } from '../../types';

interface CodeExampleProps {
  example: CodeExampleType;
}

export const CodeExample = ({ example }: CodeExampleProps) => {
  return (
    <div className="code-example">
      <div className="code-example-header">
        <div className="dots">
          <span className="r"></span>
          <span className="y"></span>
          <span className="g"></span>
        </div>
        {example.filename}
      </div>
      <pre dangerouslySetInnerHTML={{ __html: example.code }} />
    </div>
  );
};
