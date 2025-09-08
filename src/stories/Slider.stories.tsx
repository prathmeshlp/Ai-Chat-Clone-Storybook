import type { Meta, StoryObj } from '@storybook/react-vite';
import Slider from '../components/ui/Slider';
import "../index.css"

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    label: 'Temperature',
    value: 0.7,
    min: 0,
    max: 1,
    step: 0.1,
    onChange: (value) => console.log('Slider value:', value),
  },
};

export const MaxTokens: Story = {
  args: {
    label: 'Max Tokens',
    value: 1000,
    min: 100,
    max: 4000,
    step: 100,
    onChange: (value) => console.log('Slider value:', value),
  },
};

export const TopP: Story = {
  args: {
    label: 'Top-P',
    value: 0.7,
    min: 0,
    max: 1,
    step: 0.1,
    onChange: (value) => console.log('Slider value:', value),
  },
};