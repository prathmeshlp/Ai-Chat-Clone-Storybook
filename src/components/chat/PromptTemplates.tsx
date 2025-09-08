import React, { useState } from 'react';
import Button from '../ui/Button';

interface PromptTemplate {
  id: string;
  name: string;
  prompt: string;
  category: string;
}

interface PromptTemplatesProps {
  onTemplateSelect: (prompt: string) => void;
}

const PromptTemplates: React.FC<PromptTemplatesProps> = ({ onTemplateSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [templates] = useState<PromptTemplate[]>([
    {
      id: '1',
      name: 'Code Explanation',
      prompt: 'Can you explain how this code works?',
      category: 'Programming'
    },
    {
      id: '2',
      name: 'Content Summary',
      prompt: 'Please summarize the following content:',
      category: 'Writing'
    },
    {
      id: '3',
      name: 'Creative Story',
      prompt: 'Write a short story about:',
      category: 'Creative'
    },
    {
      id: '4',
      name: 'Technical Analysis',
      prompt: 'Analyze the technical aspects of:',
      category: 'Analysis'
    }
  ]);

  const categories = Array.from(new Set(templates.map(t => t.category)));

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4"
      >
        📋 Prompt Templates
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 z-10 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Prompt Templates</h3>
          
          <div className="space-y-3">
            {categories.map(category => (
              <div key={category}>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {category}
                </h4>
                <div className="space-y-2">
                  {templates
                    .filter(t => t.category === category)
                    .map(template => (
                      <button
                        key={template.id}
                        onClick={() => {
                          onTemplateSelect(template.prompt);
                          setIsOpen(false);
                        }}
                        className="w-full text-left p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                      >
                        <div className="font-medium">{template.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {template.prompt}
                        </div>
                      </button>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptTemplates;