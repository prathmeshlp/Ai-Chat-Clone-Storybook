import type { Meta, StoryObj } from '@storybook/react-vite';
import ChatBubble from '../components/chat/ChatBubble';
import { type Message } from '../types';
import "../index.css"

const meta: Meta<typeof ChatBubble> = {
  title: 'Chat/ChatBubble',
  component: ChatBubble,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChatBubble>;

const userMessage: Message = {
  id: '1',
  text: 'Hello, how are you today?',
  sender: 'user',
  timestamp: new Date(),
};

const aiMessage: Message = {
  id: '2',
  text: 'I\'m doing well, thank you for asking! How can I assist you today?',
  sender: 'ai',
  timestamp: new Date(),
};

export const UserMessage: Story = {
  args: {
    message: userMessage,
  },
};

export const AIMessage: Story = {
  args: {
    message: aiMessage,
  },
};

export const WithReply: Story = {
  args: {
    message: aiMessage,
    onReply: (text) => console.log('Reply to:', text),
  },
};