import type { SmartHelpResponse } from '../types';
import { ENV } from '@/config';
import { ErrorLogger } from './errorLogger';

const API_BASE_URL = ENV.smartHelpApiUrl;
const REQUEST_TIMEOUT = 30000; // 30 seconds

export interface SmartHelpRequest {
  studentCode: string;
  exerciseDescription: string;
  expectedOutput?: string;
  actualOutput?: string;
  errorMessage?: string;
  studentId?: string;
}

export class SmartHelpService {
  /**
   * Requests smart help from the Claude API backend with timeout
   */
  static async getSmartHelp(request: SmartHelpRequest): Promise<SmartHelpResponse> {
    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

      const response = await fetch(`${API_BASE_URL}/api/smart-help`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `HTTP error! status: ${response.status}`;

        // Log network error
        ErrorLogger.logError(new Error(errorMessage), {
          type: 'smart-help-api-error',
          status: response.status,
          url: `${API_BASE_URL}/api/smart-help`,
        });

        throw new Error(errorMessage);
      }

      const data: SmartHelpResponse = await response.json();
      return data;
    } catch (error) {
      // Handle different error types
      let userMessage = 'No se pudo conectar con el servicio de ayuda inteligente';
      let hint = 'Verifica tu conexión a internet e intenta nuevamente';

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          userMessage = 'La solicitud tardó demasiado tiempo';
          hint = 'El servidor está ocupado. Por favor, intenta de nuevo en unos momentos';
          ErrorLogger.logError(error, { type: 'smart-help-timeout' }, 'medium');
        } else if (error.message.includes('Failed to fetch')) {
          userMessage = 'No se pudo conectar con el servidor';
          hint = 'Verifica que el servidor de ayuda esté ejecutándose (npm run backend:dev)';
          ErrorLogger.logError(error, { type: 'smart-help-connection-failed' }, 'medium');
        } else if (error.message.includes('NetworkError')) {
          userMessage = 'Error de red';
          hint = 'Verifica tu conexión a internet';
          ErrorLogger.logError(error, { type: 'smart-help-network-error' }, 'medium');
        } else {
          ErrorLogger.logError(error, { type: 'smart-help-unknown-error' }, 'medium');
        }
      }

      // Return user-friendly error response
      return {
        success: false,
        feedback: {
          diagnosis: userMessage,
          hint: hint,
          encouragement: '¡No te rindas! Puedes resolverlo sin la ayuda inteligente',
          syntaxErrors: null,
        },
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Checks if the smart help API is available
   */
  static async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
      });
      return response.ok;
    } catch (error) {
      console.error('Smart help API health check failed:', error);
      return false;
    }
  }
}
