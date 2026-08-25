import type { Meta, StoryObj } from '@storybook/react-vite';
import { TheoryBlock } from './TheoryBlock';
import type { TheoryBlock as TheoryBlockType } from '../../types';

/**
 * TheoryBlock component displays educational content with optional code examples,
 * terminal commands, and tables.
 */
const meta = {
  title: 'Components/TheoryBlock',
  component: TheoryBlock,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A versatile content block for displaying theory, explanations, code examples, and tables in the learning modules.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TheoryBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic text content with icon and title
 */
export const BasicText: Story = {
  args: {
    block: {
      icon: '📚',
      title: 'Variables en Python',
      content: 'Las variables son contenedores que almacenan valores de datos.',
    } as TheoryBlockType,
  },
};

/**
 * Content with a bulleted list
 */
export const WithList: Story = {
  args: {
    block: {
      icon: '✨',
      title: 'Características de Python',
      content: [
        '<strong>Fácil de aprender:</strong> Sintaxis simple y legible',
        '<strong>Versátil:</strong> Web, ciencia de datos, IA, automatización',
        '<strong>Gran comunidad:</strong> Millones de desarrolladores',
        '<strong>Bibliotecas potentes:</strong> pandas, numpy, matplotlib',
      ],
    } as TheoryBlockType,
  },
};

/**
 * Theory block with code example
 */
export const WithCodeExample: Story = {
  args: {
    block: {
      icon: '💡',
      title: 'Ejemplo de Variable',
      content: 'Puedes crear variables asignándoles valores:',
      codeExample: {
        filename: 'variables.py',
        code: 'nombre = "Python"\nversion = 3.11\nes_genial = True',
        language: 'python',
      },
    } as TheoryBlockType,
  },
};

/**
 * Theory block with terminal command
 */
export const WithTerminalCommand: Story = {
  args: {
    block: {
      icon: '⚡',
      title: 'Ejecutar Python',
      content: 'Para ejecutar un archivo Python, usa el siguiente comando:',
      terminalCommand: {
        command: 'python mi_script.py',
        description: 'Ejecuta el archivo mi_script.py',
      },
    } as TheoryBlockType,
  },
};

/**
 * Theory block with data table
 */
export const WithTable: Story = {
  args: {
    block: {
      icon: '📊',
      title: 'Tipos de Datos',
      content: 'Python soporta varios tipos de datos primitivos:',
      table: {
        headers: ['Tipo', 'Ejemplo', 'Descripción'],
        rows: [
          { Tipo: 'int', Ejemplo: '42', Descripción: 'Número entero' },
          { Tipo: 'float', Ejemplo: '3.14', Descripción: 'Número decimal' },
          { Tipo: 'str', Ejemplo: '"Hola"', Descripción: 'Texto' },
          { Tipo: 'bool', Ejemplo: 'True', Descripción: 'Verdadero/Falso' },
        ],
      },
    } as TheoryBlockType,
  },
};

/**
 * Complex block with multiple elements
 */
export const CompleteExample: Story = {
  args: {
    block: {
      icon: '🎯',
      title: 'Operadores en Python',
      content: [
        '<strong>Aritméticos:</strong> +, -, *, /, //, %, **',
        '<strong>Comparación:</strong> ==, !=, <, >, <=, >=',
        '<strong>Lógicos:</strong> and, or, not',
      ],
      codeExample: {
        filename: 'operadores.py',
        code: '# Operadores aritméticos\nresultado = 10 + 5\npotencia = 2 ** 3\n\n# Operadores de comparación\nes_mayor = 10 > 5\n\n# Operadores lógicos\nresultado = True and False',
        language: 'python',
      },
      table: {
        headers: ['Operador', 'Descripción', 'Ejemplo'],
        rows: [
          { Operador: '+', Descripción: 'Suma', Ejemplo: '5 + 3 = 8' },
          { Operador: '-', Descripción: 'Resta', Ejemplo: '5 - 3 = 2' },
          { Operador: '*', Descripción: 'Multiplicación', Ejemplo: '5 * 3 = 15' },
          { Operador: '/', Descripción: 'División', Ejemplo: '6 / 3 = 2.0' },
        ],
      },
    } as TheoryBlockType,
  },
};
