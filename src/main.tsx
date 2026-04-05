/* eslint-disable react-refresh/only-export-components */
import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import { GlobalErrorHandler } from './utils/globalErrorHandler';
import './i18n'; // Initialize i18n
import App from './App.tsx';

// Initialize global error handler
GlobalErrorHandler.initialize();

// Lazy load guide pages (they're separate routes, not always needed)
const GuidesPage = lazy(() =>
  import('./pages/GuidesPage.tsx').then((m) => ({ default: m.GuidesPage }))
);
const GeniaGuidePage = lazy(() =>
  import('./pages/GeniaGuidePage.tsx').then((m) => ({ default: m.GeniaGuidePage }))
);
const ColabAIGuidePage = lazy(() =>
  import('./pages/ColabAIGuidePage.tsx').then((m) => ({ default: m.ColabAIGuidePage }))
);
const CopilotGuidePage = lazy(() =>
  import('./pages/CopilotGuidePage.tsx').then((m) => ({ default: m.CopilotGuidePage }))
);

// Loading fallback component
const PageLoader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '1.2rem',
      color: 'var(--text-secondary)',
    }}
  >
    Cargando...
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/module/:superModuleId/section/:sectionId" element={<App />} />
              <Route path="/guides" element={<GuidesPage />} />
              <Route path="/guides/genia" element={<GeniaGuidePage />} />
              <Route path="/guides/colab-ai" element={<ColabAIGuidePage />} />
              <Route path="/guides/copilot" element={<CopilotGuidePage />} />
            </Routes>
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
