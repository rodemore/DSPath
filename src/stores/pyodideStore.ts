import { create } from 'zustand';
import type { ExerciseResult } from '@/types';

type PyodideStatus = 'loading' | 'ready' | 'error';

interface PyodideInstance {
  runPythonAsync: (code: string) => Promise<unknown>;
  [key: string]: unknown;
}

interface PyodideState {
  // State
  status: PyodideStatus;
  error: string | null;
  pyodideInstance: PyodideInstance | null;

  // Actions
  setStatus: (status: PyodideStatus) => void;
  setError: (error: string | null) => void;
  setPyodideInstance: (instance: PyodideInstance) => void;
  runCode: (
    code: string,
    expectedOutput: string,
    customValidator?: (code: string, output: string) => { isValid: boolean; message?: string },
    initialCode?: string
  ) => Promise<ExerciseResult>;
  reset: () => void;
}

/**
 * Pyodide Store
 * Manages Python runtime status and instance
 * Provides centralized access to Pyodide for running code
 */
export const usePyodideStore = create<PyodideState>()((set, get) => ({
  // Initial state
  status: 'loading',
  error: null,
  pyodideInstance: null,

  // Set Pyodide status
  setStatus: (status) => set({ status, error: status === 'error' ? null : undefined }),

  // Set error message
  setError: (error) => set({ error, status: error ? 'error' : 'ready' }),

  // Set Pyodide instance
  setPyodideInstance: (instance) => set({ pyodideInstance: instance }),

  // Run Python code
  runCode: async (code, expectedOutput, customValidator, initialCode) => {
    const { pyodideInstance, status } = get();

    if (!pyodideInstance || status !== 'ready') {
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
        await pyodideInstance.runPythonAsync(initialCode);
      }

      // Capture stdout
      await pyodideInstance.runPythonAsync(`
import sys, io
_capture = io.StringIO()
sys.stdout = _capture
      `);

      // Run user code
      await pyodideInstance.runPythonAsync(code);

      // Get output
      const output = await pyodideInstance.runPythonAsync('_capture.getvalue()');

      // Reset stdout
      await pyodideInstance.runPythonAsync('sys.stdout = sys.__stdout__');

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
        await pyodideInstance.runPythonAsync('sys.stdout = sys.__stdout__');
      } catch {
        // Ignore reset errors
      }

      let errorMessage = 'Error al ejecutar el código';

      if (error instanceof Error) {
        // Extract the actual Python error from the traceback
        const lines = error.message.split('\n');

        // Look for common Python error types in the message
        const pythonErrorLine = lines.find(
          (line) =>
            line.includes('Error:') ||
            line.includes('Exception:') ||
            /^[A-Z]\w+Error/.test(line.trim()) ||
            /^[A-Z]\w+Exception/.test(line.trim())
        );

        if (pythonErrorLine) {
          errorMessage = pythonErrorLine.trim();
        } else {
          // If no specific error found, use the last non-empty line
          const lastLine = lines.filter((l) => l.trim()).pop();
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

  // Reset to initial state
  reset: () => set({ status: 'loading', error: null, pyodideInstance: null }),
}));
