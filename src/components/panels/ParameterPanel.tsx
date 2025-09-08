import React from 'react';
import { type ModelConfig } from '../../types';
import Slider from '../ui/Slider';
import Button from '../ui/Button';

interface ParameterPanelProps {
  config: ModelConfig;
  onConfigChange: (config: ModelConfig) => void;
  onSaveConfig: () => void;
  onLoadConfig: () => void;
}

const ParameterPanel: React.FC<ParameterPanelProps> = ({
  config,
  onConfigChange,
  onSaveConfig,
  onLoadConfig
}) => {
  const handleParameterChange = (param: keyof ModelConfig['parameters'], value: number) => {
    onConfigChange({
      ...config,
      parameters: {
        ...config.parameters,
        [param]: value
      }
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Model Configuration</h2>
      
      <div className="space-y-6">
        {/* Model Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Model
          </label>
          <select
            value={config.id}
            onChange={(e) => {
              // For now, we'll just update the name. Later we can fetch actual model data.
              onConfigChange({
                ...config,
                id: e.target.value,
                name: e.target.value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
              });
            }}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="gpt-4">GPT-4</option>
            <option value="claude-3">Claude-3</option>
            <option value="gemini-pro">Gemini Pro</option>
          </select>
        </div>

        {/* Parameter Sliders */}
        <Slider
          label="Temperature"
          value={config.parameters.temperature}
          min={0}
          max={1}
          step={0.1}
          onChange={(value) => handleParameterChange('temperature', value)}
        />
        
        <Slider
          label="Max Tokens"
          value={config.parameters.maxTokens}
          min={100}
          max={4000}
          step={100}
          onChange={(value) => handleParameterChange('maxTokens', value)}
        />
        
        <Slider
          label="Top-P"
          value={config.parameters.topP}
          min={0}
          max={1}
          step={0.1}
          onChange={(value) => handleParameterChange('topP', value)}
        />

        {/* Configuration Buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={onSaveConfig}
          >
            💾 Save Configuration
          </Button>
          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={onLoadConfig}
          >
            📂 Load Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParameterPanel;