import { useEffect, useRef } from 'react';
import type { PyodideStatus } from '../types';
import { usePyodideStore } from '@/stores/pyodideStore';

// Extend window to include loadPyodide
declare global {
  interface Window {
    loadPyodide: (config?: { indexURL?: string; [key: string]: unknown }) => Promise<unknown>;
  }
}

export const usePyodide = () => {
  const {
    status: storeStatus,
    setStatus,
    setError,
    setPyodideInstance,
    runCode,
  } = usePyodideStore();
  const isInitializedRef = useRef(false);

  // Create status object compatible with old PyodideStatus type
  const status: PyodideStatus = {
    isReady: storeStatus === 'ready',
    isLoading: storeStatus === 'loading',
    error: usePyodideStore.getState().error,
  };

  useEffect(() => {
    // Prevent multiple initializations
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const initPyodide = async () => {
      try {
        console.log('🐍 Iniciando carga de Pyodide...');
        setStatus('loading');
        setError(null);

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
        setPyodideInstance(pyodide);
        setStatus('ready');
      } catch (error) {
        console.error('❌ Error al cargar Pyodide:', error);
        const errorMessage = error instanceof Error ? error.message : 'Error al cargar Python';
        setError(errorMessage);
      }
    };

    initPyodide();
  }, [setStatus, setError, setPyodideInstance]);

  return {
    status,
    runCode,
  };
};
