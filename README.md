# DSPath - Interactive Python Learning Platform

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
git clone https://github.com/rodemore/DSPath.git

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

## Project Structure

```
src/
├── components/         # Reusable React components
│   ├── CodeEditor/    # Code editor with highlighting
│   ├── CodeExample/   # Code examples
│   ├── ExerciseCard/  # Exercise cards
│   ├── Header/        # Header with Python status
│   ├── Navigation/    # Navigation between modules
│   ├── OutputArea/    # Code output area
│   ├── ProgressBar/   # Progress bar
│   ├── Section/       # Module container
│   ├── TheoryBlock/   # Theory blocks
│   └── ThemeToggle/   # Light/dark theme toggle
├── contexts/          # React contexts
│   └── ThemeContext/  # Theme management
├── hooks/             # Custom hooks
│   └── usePyodide/    # Hook to manage Pyodide
├── modules/           # Module content
│   ├── module01-variables/
│   ├── module02-operations/
│   ├── module03-strings/
│   ├── module04-lists-intro/
│   ├── module05-lists-methods/
│   └── module06-dictionaries/
├── data/              # Module configuration
├── types/             # TypeScript types
└── styles/            # Global styles
```

## Adding New Modules

To add a new module:

1. **Create module directory**:
```bash
src/modules/module07-name/
```

2. **Create required files**:
- `content.ts`: Theory content and exercises
- `validators.ts`: Custom validators

3. **Register in `src/data/sections.ts`**:
```typescript
export const sectionsMetadata = [
  // ... existing modules
  { id: 6, moduleNumber: 'Module 07', title: 'Title', titleHighlight: 'Highlight' },
];

const moduleLoaders = {
  // ... existing loaders
  6: () => import('../modules/module07-name/content').then(m => ({ default: m.module07 })),
};
```

4. **Update exercise counter** in `getTotalExercisesCount()`

## Validator Features

Each exercise can use:

- **Exact validation**: Compares output with an expected string
- **Custom validation**: Function that validates the executed code
- **Variable validation**: Verifies existence and types of variables
- **Output validation**: Verifies that the output contains certain values

Example of custom validator:

```typescript
export const validateExample = (
  code: string,
  output: string
): { isValid: boolean; message: string } => {
  // Your validation logic
  return {
    isValid: true,
    message: 'Exercise completed correctly'
  };
};
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

This project is under the MIT License.

## Contributing

Contributions are welcome. Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

If you encounter any issues or have suggestions, please open an issue in the repository.
