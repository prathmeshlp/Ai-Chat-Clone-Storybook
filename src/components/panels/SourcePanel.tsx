import React from 'react';
import { type Source } from '../../types';

interface SourcePanelProps {
  sources: Source[];
  selectedMessageId?: string;
}

const SourcePanel: React.FC<SourcePanelProps> = ({ sources, selectedMessageId }) => {
  if (!sources || sources.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sources</h2>
       <p className="text-gray-500 dark:text-gray-400 text-sm">
          {selectedMessageId 
            ? "No sources available for this response." 
            : "Select an AI response to view sources."}
        </p>
      </div>
    );
  }

  const getCredibilityColor = (credibility: Source['credibility']) => {
    switch (credibility) {
      case 'high': return 'text-green-600 dark:text-green-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sources</h2>
      
      <div className="space-y-4">
        {sources.map((source) => (
          <div key={source.id} className="border-l-4 border-indigo-400 pl-4 py-2">
            <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
              {source.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-xs mb-2">
              {source.snippet}
            </p>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium ${getCredibilityColor(source.credibility)}`}>
                [{source.credibility.toUpperCase()}] Credibility
              </span>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Visit Source →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourcePanel;