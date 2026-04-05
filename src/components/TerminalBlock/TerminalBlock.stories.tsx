import type { Meta, StoryObj } from '@storybook/react-vite';
import { TerminalBlock } from './TerminalBlock';

/**
 * TerminalBlock component displays terminal commands with a realistic terminal UI.
 */
const meta = {
  title: 'Components/TerminalBlock',
  component: TerminalBlock,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A terminal-styled code block with macOS-style window decorations for displaying shell commands.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    command: {
      control: 'text',
      description: 'The terminal command to display',
    },
    description: {
      control: 'text',
      description: 'Optional description of what the command does',
    },
  },
} satisfies Meta<typeof TerminalBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Simple command without description
 */
export const Basic: Story = {
  args: {
    command: 'python script.py',
  },
};

/**
 * Command with description
 */
export const WithDescription: Story = {
  args: {
    command: 'pip install pandas',
    description: 'Instala la biblioteca pandas para análisis de datos',
  },
};

/**
 * Python execution command
 */
export const RunPython: Story = {
  args: {
    command: 'python3 app.py',
    description: 'Ejecuta la aplicación principal',
  },
};

/**
 * Package manager command
 */
export const NPMInstall: Story = {
  args: {
    command: 'npm install',
    description: 'Instala todas las dependencias del proyecto',
  },
};

/**
 * Git command
 */
export const GitCommand: Story = {
  args: {
    command: 'git commit -m "Add new feature"',
    description: 'Crea un commit con los cambios actuales',
  },
};

/**
 * Long command example
 */
export const LongCommand: Story = {
  args: {
    command: 'python -m venv venv && source venv/bin/activate && pip install -r requirements.txt',
    description: 'Crea un entorno virtual, lo activa e instala dependencias',
  },
};

/**
 * Docker command
 */
export const Docker: Story = {
  args: {
    command: 'docker run -p 3000:3000 my-app',
    description: 'Ejecuta el contenedor Docker en el puerto 3000',
  },
};

/**
 * File system operation
 */
export const FileOperation: Story = {
  args: {
    command: 'mkdir proyecto && cd proyecto',
    description: 'Crea un directorio y navega hacia él',
  },
};
