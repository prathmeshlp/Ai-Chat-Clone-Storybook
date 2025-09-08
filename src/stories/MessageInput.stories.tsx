import type { Meta, StoryObj } from '@storybook/react-vite';
import MessageInput from '../components/chat/MessageInput';
import "../index.css"

const meta: Meta<typeof MessageInput> = {
  title: 'Chat/MessageInput',
  component: MessageInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MessageInput>;

export const Default: Story = {
  args: {
    onSendMessage: (message) => console.log('Message sent:', message),
  },
};

export const Disabled: Story = {
  args: {
    onSendMessage: (message) => console.log('Message sent:', message),
    disabled: true,
  },
};