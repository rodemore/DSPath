# 🤖 Sistema de Ayuda Inteligente con Claude AI

Sistema de ayuda personalizada para estudiantes usando la API de Claude (Anthropic).

## 📋 Características

✅ **Aparece automáticamente**: El botón aparece después de 2 intentos fallidos
✅ **Feedback personalizado**: Claude analiza el código y da pistas específicas
✅ **Control de costos**: Límite de 10 ayudas por estudiante por hora
✅ **UI atractiva**: Modal con diseño moderno y animaciones
✅ **Tracking local**: Los intentos se guardan en localStorage
✅ **Bajo costo**: Usa Claude Haiku (~$0.40-0.80 por 100 estudiantes)

---

## 🚀 Instalación y Configuración

### 1. Instalar Dependencias del Backend

```bash
cd server
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita `.env` y agrega tu API key de Anthropic:

```env
ANTHROPIC_API_KEY=sk-ant-api03-tu-api-key-aqui
PORT=3001
NODE_ENV=development
```

**¿Cómo obtener una API Key de Anthropic?**
1. Visita: https://console.anthropic.com/
2. Crea una cuenta o inicia sesión
3. Ve a "API Keys" en el menú
4. Crea una nueva API key
5. Cópiala y pégala en tu `.env`

### 3. Configurar Variable de Entorno del Frontend

Crea un archivo `.env` en la raíz del proyecto (junto al package.json principal):

```env
VITE_SMART_HELP_API_URL=http://localhost:3001
```

### 4. Iniciar el Backend

```bash
cd server
npm start
```

O en modo desarrollo con auto-reload:

```bash
npm run dev
```

Deberías ver:

```
🚀 Smart Help API running on http://localhost:3001
📊 Environment: development
🔑 API Key configured: ✓
```

### 5. Iniciar el Frontend

En otra terminal:

```bash
npm run dev
```

---

## 💻 Uso

1. **El estudiante intenta resolver un ejercicio**
2. **Después de 2 intentos fallidos**, aparece el botón "¿Necesitas ayuda?" con el icono 🤖
3. **Al hacer clic**, se abre un modal con:
   - 📋 **Diagnóstico**: Qué está mal en el código
   - 🔴 **Errores de sintaxis**: Si los hay
   - 💡 **Pista**: Sugerencia específica sin dar la solución
   - 🌟 **Motivación**: Mensaje de aliento
4. **El estudiante aplica la pista** y vuelve a intentar
5. **Límite**: 10 ayudas por hora por estudiante

---

## 📊 Costos Estimados

### Por 100 Estudiantes (Cohort Completo)

| Escenario | Intentos/Ejercicio | Total Validaciones | Costo Estimado |
|-----------|-------------------|-------------------|----------------|
| **Conservador** | 4 intentos promedio | 50,400 | $40-80 USD |
| **Realista** | 6.5 intentos | 81,900 | $65-130 USD |
| **Pesimista** | 10 intentos | 126,000 | $100-200 USD |

**Nota**: Estos costos asumen que el estudiante usa ayuda inteligente en ~20-30% de los ejercicios, no en todos.

### Costos Reales (Claude Haiku)
- **Input**: $0.80 por millón de tokens
- **Output**: $4.00 por millón de tokens
- **Promedio por ayuda**: ~500-1000 tokens totales = **$0.0015-0.003 USD**

---

## 🛠️ Personalización

### Cambiar el Umbral de Intentos

En `src/utils/attemptTracker.ts`, línea 4:

```typescript
const FAILED_ATTEMPTS_THRESHOLD = 2; // Cambiar a 3, 4, etc.
```

### Cambiar el Límite de Ayudas por Hora

En `server/index.js`, línea 33:

```javascript
if (userRequests.length >= 10) { // Cambiar a 5, 15, 20, etc.
```

### Usar un Modelo Diferente

En `server/index.js`, línea 75:

```javascript
model: 'claude-3-haiku-20240307', // Opciones:
// - 'claude-3-haiku-20240307' (más barato)
// - 'claude-3-5-sonnet-20241022' (más inteligente, 5x más caro)
// - 'claude-3-opus-20240229' (mejor calidad, 15x más caro)
```

### Personalizar el Prompt

En `server/index.js`, línea 53-90, puedes editar el prompt que se envía a Claude.

---

## 🏗️ Arquitectura

```
┌─────────────────┐
│  ExerciseCard   │  (Frontend Component)
│   - Tracking    │
│   - UI Button   │
└────────┬────────┘
         │
         │ HTTP POST /api/smart-help
         ▼
┌─────────────────┐
│  Express API    │  (Backend Server)
│   - Rate limit  │
│   - Validation  │
└────────┬────────┘
         │
         │ Anthropic SDK
         ▼
┌─────────────────┐
│   Claude API    │  (Anthropic)
│   - Haiku model │
│   - Analysis    │
└─────────────────┘
```

---

## 📁 Archivos Creados/Modificados

### Nuevos Archivos
- `server/index.js` - Backend API
- `server/package.json` - Dependencias del servidor
- `src/components/SmartFeedback/SmartFeedback.tsx` - Componente del modal
- `src/components/SmartFeedback/SmartFeedback.css` - Estilos del modal
- `src/components/SmartFeedback/index.ts` - Export
- `src/services/smartHelpService.ts` - Cliente HTTP
- `src/utils/attemptTracker.ts` - Tracking de intentos
- `.env.example` - Template de configuración

### Archivos Modificados
- `src/components/ExerciseCard/ExerciseCard.tsx` - Integración del botón y lógica
- `src/types/index.ts` - Nuevos tipos TypeScript
- `src/styles/globals.css` - Estilos del botón
- `.gitignore` - Agregar .env

---

## 🐛 Troubleshooting

### El botón no aparece
- ✅ Verifica que hayas fallado 2+ veces el ejercicio
- ✅ Abre DevTools → Console para ver si hay errores
- ✅ Verifica que el backend esté corriendo

### Error: "No se pudo conectar con el servicio"
- ✅ Verifica que el backend esté corriendo en http://localhost:3001
- ✅ Verifica la variable `VITE_SMART_HELP_API_URL` en `.env`
- ✅ Revisa el health check: http://localhost:3001/health

### Error: "Missing API Key"
- ✅ Verifica que `ANTHROPIC_API_KEY` esté en el archivo `.env`
- ✅ Verifica que no tenga espacios ni comillas extra
- ✅ Reinicia el servidor después de cambiar el `.env`

### El modal muestra "Analizando..." eternamente
- ✅ Revisa la consola del backend para ver errores
- ✅ Verifica tu cuota de API de Anthropic: https://console.anthropic.com/
- ✅ Verifica tu conexión a internet

### Rate limit alcanzado
- ✅ Espera 1 hora
- ✅ O aumenta el límite en `server/index.js` línea 33

---

## 📈 Monitoreo de Uso

### Ver estadísticas en la consola del navegador:

```javascript
// Ver intentos de un ejercicio
AttemptTracker.getStats('section-0-exercise-0')

// Limpiar todos los intentos (testing)
AttemptTracker.clearAll()
```

### Ver logs del servidor:

El servidor imprime cada request a smart help con el studentId y tokens usados.

---

## 🔒 Seguridad

✅ **API Key no expuesta**: La key está solo en el backend
✅ **Rate limiting**: Previene abuso
✅ **CORS habilitado**: Solo dominios permitidos (configurable)
✅ **Sin autenticación de usuario**: Simple student ID basado en localStorage

---

## 🚀 Producción

### Desplegar el Backend

Recomendaciones:
- **Railway.app** (gratis para proyectos pequeños)
- **Render.com** (gratis con límites)
- **Fly.io** (gratis con límites)
- **Vercel** (gratis, requiere adaptar a serverless)

### Variables de Entorno en Producción

```env
ANTHROPIC_API_KEY=sk-ant-api03-...
PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=https://tu-dominio.com
```

### Frontend en Producción

Actualiza `.env`:

```env
VITE_SMART_HELP_API_URL=https://tu-backend.railway.app
```

---

## 💡 Próximas Mejoras Sugeridas

- [ ] Dashboard de analytics (cuántas ayudas se usan por módulo)
- [ ] Sistema de autenticación real (JWT, OAuth)
- [ ] Cache de respuestas similares (reducir costos)
- [ ] A/B testing de prompts (optimizar calidad)
- [ ] Feedback del estudiante sobre la ayuda (thumbs up/down)
- [ ] Integración con base de datos (PostgreSQL/MongoDB)
- [ ] Webhooks para notificaciones (Discord, Slack)

---

## 📞 Soporte

Si tienes problemas o preguntas:
1. Revisa la sección de Troubleshooting arriba
2. Verifica los logs del servidor
3. Abre DevTools en el navegador
4. Revisa la documentación de Anthropic: https://docs.anthropic.com/

---

## 📄 Licencia

Este código es parte de tu proyecto DSPath. Puedes modificarlo y usarlo como desees.

---

**¡Hecho con ❤️ y Claude AI!**
