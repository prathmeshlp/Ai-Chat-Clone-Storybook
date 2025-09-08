import { type Message, type Source, type ModelConfig } from '../types';

export const mockSources: Source[] = [
  {
    id: '1',
    title: 'Nature Quantum Information',
    snippet: 'Recent devices to monitor error correction operations require increasing execution number, improving performance.',
    url: '#',
    credibility: 'high'
  },
  {
    id: '2',
    title: 'IBM Research Blog',
    snippet: "IBM's quantum processor shows improvements in runtime across all hardware applications.",
    url: '#',
    credibility: 'high'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Can you explain quantum error correction?',
    sender: 'user',
    timestamp: new Date(),
  },
  {
    id: '2',
    text: 'Quantum error correction is a set of techniques to protect quantum information from errors due to decoherence and other quantum noise. Recent advances include improved qubit stability and better error correction algorithms, with companies like IBM and Google making significant progress.',
    sender: 'ai',
    timestamp: new Date(),
    sources: mockSources
  }
];

export const mockModelConfig: ModelConfig = {
  id: 'gpt-4',
  name: 'GPT-4',
  provider: 'OpenAI',
  parameters: {
    temperature: 0.7,
    maxTokens: 2343,
    topP: 0.9,
    frequencyPenalty: 0,
    presencePenalty: 0
  }
};

export const availableModels: ModelConfig[] = [
  mockModelConfig,
  {
    id: 'claude-3',
    name: 'Claude-3',
    provider: 'Anthropic',
    parameters: {
      temperature: 0.7,
      maxTokens: 2000,
      topP: 0.9,
      frequencyPenalty: 0,
      presencePenalty: 0
    }
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    parameters: {
      temperature: 0.7,
      maxTokens: 2500,
      topP: 0.9,
      frequencyPenalty: 0,
      presencePenalty: 0
    }
  }
];