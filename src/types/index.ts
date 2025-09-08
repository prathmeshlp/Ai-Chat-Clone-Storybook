export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  sources?: Source[];
}

export interface Source {
  id: string;
  title: string;
  snippet: string;
  url: string;
  credibility: 'high' | 'medium' | 'low';
}

export interface ModelParameters {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  parameters: ModelParameters;
}