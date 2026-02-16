import { useState, useEffect, useCallback, useRef } from 'react';
import type { PyodideStatus, ExerciseResult } from '../types';

// Extend window to include loadPyodide
declare global {
  interface Window {
    loadPyodide: any;
  }
}

export const usePyodide = () => {
  const [status, setStatus] = useState<PyodideStatus>({
    isReady: false,
    isLoading: true,
    error: null,
  });

  const pyodideRef = useRef<any>(null);

  useEffect(() => {
    const initPyodide = async () => {
      try {
        console.log('🐍 Iniciando carga de Pyodide...');
        setStatus({ isReady: false, isLoading: true, error: null });

        // Wait for window.loadPyodide to be available
        if (typeof window.loadPyodide === 'undefined') {
          console.log('⏳ Esperando que Pyodide se cargue...');
          await new Promise((resolve) => {
            const checkPyodide = setInterval(() => {
              if (typeof window.loadPyodide !== 'undefined') {
                clearInterval(checkPyodide);
                resolve(true);
              }
            }, 100);
          });
        }

        console.log('📦 Cargando Pyodide desde CDN...');
        const pyodide = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/',
        });

        console.log('📊 Cargando paquetes de Python (pandas, numpy)...');
        await pyodide.loadPackage(['pandas', 'numpy']);

        console.log('✅ Pyodide cargado correctamente con pandas');
        pyodideRef.current = pyodide;
        setStatus({ isReady: true, isLoading: false, error: null });
      } catch (error) {
        console.error('❌ Error al cargar Pyodide:', error);
        const errorMessage = error instanceof Error ? error.message : 'Error al cargar Python';
        setStatus({ isReady: false, isLoading: false, error: errorMessage });
      }
    };

    initPyodide();
  }, []);

  const runCode = useCallback(
    async (
      code: string,
      expectedOutput: string,
      customValidator?: (code: string, output: string) => { isValid: boolean; message?: string },
      initialCode?: string
    ): Promise<ExerciseResult> => {
      if (!pyodideRef.current || !status.isReady) {
        return {
          isCorrect: false,
          output: '',
          error: 'Python aún no está listo. Espera unos segundos...',
        };
      }

      if (!code.trim()) {
        return {
          isCorrect: false,
          output: '',
          error: 'No hay código para ejecutar',
        };
      }

      try {
        // Execute initialCode first (if provided) - invisible to the student
        if (initialCode) {
          await pyodideRef.current.runPythonAsync(initialCode);
        }

        // Capture stdout
        await pyodideRef.current.runPythonAsync(`
import sys, io
_capture = io.StringIO()
sys.stdout = _capture
        `);

        // Run user code
        await pyodideRef.current.runPythonAsync(code);

        // Get output
        const output = await pyodideRef.current.runPythonAsync('_capture.getvalue()');

        // Reset stdout
        await pyodideRef.current.runPythonAsync('sys.stdout = sys.__stdout__');

        const trimmedOutput = (output as string).trimEnd();

        // Use custom validator if provided
        if (customValidator) {
          console.log('🔍 Usando validación personalizada');
          const validation = customValidator(code, trimmedOutput);
          console.log('📊 Resultado validación:', validation);
          return {
            isCorrect: validation.isValid,
            output: trimmedOutput || '(sin salida)',
            error: validation.isValid ? null : validation.message || 'La validación falló',
          };
        }

        // Default: exact match validation
        const expectedNorm = expectedOutput.replace(/\\n/g, '\n').trimEnd();
        const isCorrect = trimmedOutput === expectedNorm;

        return {
          isCorrect,
          output: trimmedOutput || '(sin salida)',
          error: null,
        };
      } catch (error) {
        // Reset stdout on error
        try {
          await pyodideRef.current.runPythonAsync('sys.stdout = sys.__stdout__');
        } catch {
          // Ignore reset errors
        }

        let errorMessage = 'Error al ejecutar el código';

        if (error instanceof Error) {
          // Extract the actual Python error from the traceback
          const lines = error.message.split('\n');

          // Look for common Python error types in the message
          const pythonErrorLine = lines.find(line =>
            line.includes('Error:') ||
            line.includes('Exception:') ||
            /^[A-Z]\w+Error/.test(line.trim()) ||
            /^[A-Z]\w+Exception/.test(line.trim())
          );

          if (pythonErrorLine) {
            errorMessage = pythonErrorLine.trim();
          } else {
            // If no specific error found, use the last non-empty line
            const lastLine = lines.filter(l => l.trim()).pop();
            errorMessage = lastLine || error.message;
          }
        }

        return {
          isCorrect: false,
          output: '',
          error: errorMessage,
        };
      }
    },
    [status.isReady]
  );

  return {
    status,
    runCode,
  };
};
