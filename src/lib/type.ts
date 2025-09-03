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
  role: "user" | "assistant";
  timestamp: Date;
  model?: string;
  isMultiResponse?: boolean;
  bookmarked?: boolean;
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

export const modelsComponent = [
  {
    id: "gemini",
    name: "Gemini",
    color: "bg-blue-500",
    enabled: true,
    selected: true,
    isExpend: true,
  },
  {
    id: "chatgpt",
    name: "OpenAI",
    color: "bg-emerald-500",
    enabled: true,
    selected: false,
    isExpend: false,
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    color: "bg-purple-500",
    enabled: true,
    selected: false,
    isExpend: false,
  },
  {
    id: "perplexity",
    name: "Mistral",
    color: "bg-orange-500",
    enabled: true,
    selected: false,
    isExpend: false,
  },
];

export const exampleQuestions = [
  "Daily Life Tools",
  "Explain quantum computing in simple terms",
  "How to learn React quickly?",
  "What are the best practices for API design?",
  "Write a poem about artificial intelligence",
  "Compare Next.js and Remix frameworks",
];