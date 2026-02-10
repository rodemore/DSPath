# PyLab - Plataforma Interactiva de Aprendizaje de Python

Una aplicación web interactiva para aprender Python de forma práctica, con ejercicios en tiempo real y validación automática.

## Características

- **Editor de código en el navegador**: Ejecuta código Python directamente en el navegador usando Pyodide
- **6 módulos de aprendizaje progresivo**: Desde conceptos básicos hasta estructuras de datos avanzadas
- **21 ejercicios interactivos**: Con validación automática y retroalimentación instantánea
- **Sistema de progreso**: Sigue tu avance a través de los módulos
- **Tema claro/oscuro**: Cambia entre temas según tu preferencia
- **Diseño responsive**: Funciona perfectamente en dispositivos móviles y escritorio
- **Zero-config**: No requiere instalación de Python en tu sistema

## Módulos de Aprendizaje

1. **Módulo 01**: Variables y Tipos de Datos
2. **Módulo 02**: Operaciones Numéricas
3. **Módulo 03**: Strings - Cadenas de Texto
4. **Módulo 04**: Listas 1 - Fundamentos
5. **Módulo 05**: Listas 2 - Métodos
6. **Módulo 06**: Diccionarios - Datos Clave-Valor

## Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Python Runtime**: Pyodide 0.29
- **Editor**: react-simple-code-editor con sintaxis highlighting (Prism.js)
- **Styling**: CSS Modules con variables CSS para temas

## Instalación y Uso

### Prerrequisitos

- Node.js 18 o superior
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Navegar al directorio
cd dspath

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Producción

```bash
# Construir para producción
npm run build

# Vista previa de la build
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
