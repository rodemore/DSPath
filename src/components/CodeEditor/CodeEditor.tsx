import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-python';
import './CodeEditor.css';

interface CodeEditorProps {
  onRun: (code: string) => void;
  onReset: () => void;
  initialCode?: string;
  isRunning: boolean;
}

export const CodeEditor = ({ onRun, onReset, initialCode = '', isRunning }: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);

  const handleRun = () => {
    onRun(code);
  };

  const handleReset = () => {
    setCode('');
    onReset();
  };

  const highlightCode = (code: string) => {
    return highlight(code, languages.python, 'python');
  };

  return (
    <>
      <div className="editor-wrapper">
        <div className="editor-bar">
          <div className="dots">
            <span className="r"></span>
            <span className="y"></span>
            <span className="g"></span>
          </div>
          <span>tu_codigo.py</span>
        </div>
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={highlightCode}
          padding={16}
          placeholder="# Escribe tu código aquí..."
          className="code-editor"
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.85rem',
            lineHeight: 1.8,
            minHeight: '100px',
          }}
          textareaClassName="code-editor-textarea"
        />
      </div>
      <div className="btn-row">
        <button
          className="btn btn-run"
          onClick={handleRun}
          disabled={isRunning}
        >
          {isRunning ? '⏳ Ejecutando...' : '▶ Ejecutar'}
        </button>
        <button className="btn btn-reset" onClick={handleReset}>
          ↺ Limpiar
        </button>
      </div>
    </>
  );
};
