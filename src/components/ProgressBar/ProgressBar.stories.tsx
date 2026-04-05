import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';

/**
 * ProgressBar component displays exercise completion progress.
 * It shows the number of completed exercises and a visual progress bar.
 */
const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A progress indicator that shows exercise completion status with both text and visual bar representation.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * No progress - starting state
 */
export const Empty: Story = {
  args: {
    progress: {
      completedExercises: new Set(),
      completedInCurrentScope: 0,
      totalExercises: 10,
      percentage: 0,
    },
  },
};

/**
 * Some progress made - 25% complete
 */
export const PartialProgress: Story = {
  args: {
    progress: {
      completedExercises: new Set(['ex-1', 'ex-2', 'ex-3']),
      completedInCurrentScope: 3,
      totalExercises: 12,
      percentage: 25,
    },
  },
};

/**
 * Half complete - 50% progress
 */
export const HalfComplete: Story = {
  args: {
    progress: {
      completedExercises: new Set(['ex-1', 'ex-2', 'ex-3', 'ex-4', 'ex-5']),
      completedInCurrentScope: 5,
      totalExercises: 10,
      percentage: 50,
    },
  },
};

/**
 * Almost complete - 90% progress
 */
export const AlmostComplete: Story = {
  args: {
    progress: {
      completedExercises: new Set([
        'ex-1',
        'ex-2',
        'ex-3',
        'ex-4',
        'ex-5',
        'ex-6',
        'ex-7',
        'ex-8',
        'ex-9',
      ]),
      completedInCurrentScope: 9,
      totalExercises: 10,
      percentage: 90,
    },
  },
};

/**
 * All exercises completed - 100% progress
 */
export const Complete: Story = {
  args: {
    progress: {
      completedExercises: new Set([
        'ex-1',
        'ex-2',
        'ex-3',
        'ex-4',
        'ex-5',
        'ex-6',
        'ex-7',
        'ex-8',
        'ex-9',
        'ex-10',
      ]),
      completedInCurrentScope: 10,
      totalExercises: 10,
      percentage: 100,
    },
  },
};

/**
 * Large number of exercises
 */
export const LargeScale: Story = {
  args: {
    progress: {
      completedExercises: new Set(),
      completedInCurrentScope: 42,
      totalExercises: 150,
      percentage: 28,
    },
  },
};
