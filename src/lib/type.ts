export interface AIModel {
  id: string;
  name: string;
  color: string;
  enabled: boolean;
  selected: boolean;
  isExpend: boolean;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  model?: string;
  isMultiResponse?: boolean;
  responses?: ModelResponse[];
}

export interface ModelResponse {
  model: string;
  content: string;
  error?: string;
  loading?: boolean;
}

export interface ApiResponse {
  response: string;
  model?: string;
  error?: string;
}

export interface SidebarProps {
  models: AIModel[];
}