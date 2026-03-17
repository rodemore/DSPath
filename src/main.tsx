import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import App from './App.tsx'
import { GuidesPage } from './pages/GuidesPage.tsx'
import { GeniaGuidePage } from './pages/GeniaGuidePage.tsx'
import { ColabAIGuidePage } from './pages/ColabAIGuidePage.tsx'
import { CopilotGuidePage } from './pages/CopilotGuidePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/module/:superModuleId/section/:sectionId" element={<App />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/guides/genia" element={<GeniaGuidePage />} />
          <Route path="/guides/colab-ai" element={<ColabAIGuidePage />} />
          <Route path="/guides/copilot" element={<CopilotGuidePage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
