# PyLab - Interactive Python Learning Platform

An interactive web application for learning Python hands-on, with real-time exercises and automatic validation.

## Features

- **In-browser code editor**: Run Python code directly in the browser using Pyodide
- **6 progressive learning modules**: From basic concepts to advanced data structures
- **21 interactive exercises**: With automatic validation and instant feedback
- **Progress tracking system**: Follow your advancement through the modules
- **Light/dark theme**: Switch between themes according to your preference
- **Responsive design**: Works perfectly on mobile and desktop devices
- **Zero-config**: No Python installation required on your system

## Learning Modules

1. **Module 01**: Variables and Data Types
2. **Module 02**: Numeric Operations
3. **Module 03**: Strings - Text Chains
4. **Module 04**: Lists 1 - Fundamentals
5. **Module 05**: Lists 2 - Methods
6. **Module 06**: Dictionaries - Key-Value Data

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Python Runtime**: Pyodide 0.29
- **Editor**: react-simple-code-editor with syntax highlighting (Prism.js)
- **Styling**: CSS Modules with CSS variables for theming

## Installation and Usage

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to directory
cd dspath

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Production

```bash
# Build for production
npm run build

# Preview the build
npm run preview
```

## Estructura del Proyecto

```
src/
├── components/         # Componentes React reutilizables
│   ├── CodeEditor/    # Editor de código con highlighting
│   ├── CodeExample/   # Ejemplos de código
│   ├── ExerciseCard/  # Tarjetas de ejercicios
│   ├── Header/        # Encabezado con estado de Python
│   ├── Navigation/    # Navegación entre módulos
│   ├── OutputArea/    # Área de salida del código
│   ├── ProgressBar/   # Barra de progreso
│   ├── Section/       # Contenedor de módulos
│   ├── TheoryBlock/   # Bloques de teoría
│   └── ThemeToggle/   # Toggle tema claro/oscuro
├── contexts/          # Contextos de React
│   └── ThemeContext/  # Gestión del tema
├── hooks/             # Custom hooks
│   └── usePyodide/    # Hook para gestionar Pyodide
├── modules/           # Contenido de los módulos
│   ├── module01-variables/
│   ├── module02-operations/
│   ├── module03-strings/
│   ├── module04-lists-intro/
│   ├── module05-lists-methods/
│   └── module06-dictionaries/
├── data/              # Configuración de módulos
├── types/             # Tipos TypeScript
└── styles/            # Estilos globales
```

## Agregar Nuevos Módulos

Para agregar un nuevo módulo:

1. **Crear directorio del módulo**:
```bash
src/modules/module07-nombre/
```

2. **Crear archivos necesarios**:
- `content.ts`: Contenido teórico y ejercicios
- `validators.ts`: Validadores personalizados

3. **Registrar en `src/data/sections.ts`**:
```typescript
export const sectionsMetadata = [
  // ... módulos existentes
  { id: 6, moduleNumber: 'Módulo 07', title: 'Título', titleHighlight: 'Destacado' },
];

const moduleLoaders = {
  // ... loaders existentes
  6: () => import('../modules/module07-nombre/content').then(m => ({ default: m.module07 })),
};
```

4. **Actualizar contador de ejercicios** en `getTotalExercisesCount()`

## Características de los Validadores

Cada ejercicio puede usar:

- **Validación exacta**: Compara la salida con un string esperado
- **Validación personalizada**: Función que valida el código ejecutado
- **Validación de variables**: Verifica existencia y tipos de variables
- **Validación de salida**: Verifica que el output contenga ciertos valores

Ejemplo de validador personalizado:

```typescript
export const validateExample = (
  code: string,
  output: string
): { isValid: boolean; message: string } => {
  // Tu lógica de validación
  return {
    isValid: true,
    message: 'Ejercicio completado correctamente'
  };
};
```

## Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Vista previa de la build de producción
- `npm run lint` - Ejecuta ESLint

## Licencia

Este proyecto está bajo la licencia MIT.

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Soporte

Si encuentras algún problema o tienes sugerencias, por favor abre un issue en el repositorio.
