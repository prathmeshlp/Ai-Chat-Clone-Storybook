import type { Meta, StoryObj } from '@storybook/react-vite';
import "../index.css"

const meta: Meta = {
  title: 'Welcome',
  component: () => <div>Welcome to Storybook</div>,
};

export default meta;

export const Welcome: StoryObj = {
  render: () => (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Welcome to Storybook
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
        This is your Storybook environment for the AI Chat Assistant project.
      </p>
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Getting Started
        </h2>
        <ul className="list-disc list-inside text-blue-800 dark:text-blue-200 space-y-1">
          <li>Check the navigation sidebar for available components</li>
          <li>Use the controls panel to interact with component props</li>
          <li>Toggle between light and dark themes using the toolbar</li>
        </ul>
      </div>
    </div>
  ),
};