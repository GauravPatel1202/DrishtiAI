import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Image,
  Upload,
  Mic,
  User,
  Bot,
  Loader2,
  Check,
  Users,
  Menu
} from 'lucide-react';
import type { AIModel, ApiResponse, Message } from '../lib/type';
import clsx from 'clsx';
import { Logo } from '../components/logo';
import { Sidebar } from './Component/sidebar';

interface TopBarProps {
  models: AIModel[];
  onModelToggleSelect: (modelId: string) => void;
  onToggleModel: (modelId: string) => void;
  onMenuClick: () => void;
}
interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  selectedModels: string[];
}
interface InputAreaProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  selectedModels: string[];
}

// API Service
class ApiService {
  private baseUrl = 'http://localhost:3001/api/queries';

  async sendQuery(query: string, model: string): Promise<ApiResponse> {
    const providerMapping: { [key: string]: string } = {
      'chatgpt': 'openai',
      'gemini': 'gemini',
      'deepseek': 'deepseek',
      'perplexity': 'mistral',
    };

    const provider = providerMapping[model] || 'openai';

    const requestPayload = {
      prompt: query,
      providers: [provider]
    };
    try {
      const response = await fetch(`${this.baseUrl}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });
      if (!response.ok) {
        let errorDetails = '';
        try {
          const errorBody = await response.text();

          errorDetails = errorBody ? ` - ${errorBody}` : '';
        } catch (parseError) {
        }

        throw new Error(`HTTP ${response.status}: ${response.statusText}${errorDetails}`);
      }

      const data = await response.json();
      if (data && data.responses && data.responses.length > 0) {
        const responseData = data.responses[0];
        return {
          response: responseData.content,
          model: responseData.provider
        };
      } else {
        throw new Error('No response data received from server');
      }

    } catch (error) {

      let errorMessage = `Sorry, I encountered an error while processing your request with ${model}.`;

      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = `Unable to connect to the server for ${model}. Please check if the API server is running on port 3001.`;
      } else if (error instanceof Error) {
        if (error.message.includes('500')) {
          errorMessage = `Server error with ${provider} provider. Please check your API keys and server logs.`;
        } else if (error.message.includes('404')) {
          errorMessage = `API endpoint not found for ${model}. Please ensure the server route is /api/queries/query.`;
        } else if (error.message.includes('401') || error.message.includes('403')) {
          errorMessage = `Authentication failed for ${provider}. Please check your API key.`;
        }
      }

      return {
        response: errorMessage + ' Please try again or contact support if the issue persists.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async sendMultiQuery(query: string, models: string[]): Promise<{ [key: string]: ApiResponse }> {
    const results: { [key: string]: ApiResponse } = {};

    // Send requests to all models in parallel
    const promises = models.map(async (model) => {
      try {
        const response = await this.sendQuery(query, model);
        results[model] = response;
      } catch (error) {
        results[model] = {
          response: `Error with ${model}: ${error instanceof Error ? error.message : 'Unknown error'}`,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    });

    await Promise.all(promises);
    return results;
  }
}

// Model Toggle Component - Updated for mobile
const ModelToggle: React.FC<{
  model: AIModel;
  onToggleSelect: () => void;
  onToggle: () => void;
}> = ({ model, onToggleSelect, onToggle }) => (
  <div className="flex items-center space-x-2">
    <button
      onClick={onToggleSelect}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border-2 ${model.selected
        ? 'bg-blue-600 text-white shadow-md border-blue-400'
        : 'bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600 border-gray-600'
        }`}
    >
      {model.selected && <Check className="w-3 h-3 inline mr-1" />}
      <span className="hidden sm:inline">{model.name}</span>
      <span className="sm:hidden">{model.name.split(' ')[0]}</span>
    </button>
    <div className="flex items-center space-x-1">
      <button
        onClick={onToggle}
        className={`w-8 h-4 rounded-full relative transition-colors ${model.enabled ? 'bg-green-500' : 'bg-gray-500'
          }`}
        title={model.enabled ? 'Enabled' : 'Disabled'}
      >
        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${model.enabled ? 'translate-x-4' : 'translate-x-0.5'
          }`}></div>
      </button>
    </div>
  </div>
);

// Top Bar Component - Updated for mobile
const TopBar: React.FC<TopBarProps> = ({ models, onModelToggleSelect, onToggleModel, onMenuClick }) => {
  const [showModels, setShowModels] = useState(false);

  return (
    <div className="border-b border-gray-700 p-3 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between mb-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Logo />
          <button
            onClick={() => setShowModels(!showModels)}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <Users className="w-5 h-5" />
          </button>
        </div>

        {/* Models section - always visible on desktop, toggleable on mobile */}
        <div className={`${showModels ? 'block' : 'hidden'} lg:block`}>
          <div className="flex flex-wrap gap-2">
            {models.map((model) => (
              <ModelToggle
                key={model.id}
                model={model}
                onToggleSelect={() => onModelToggleSelect(model.id)}
                onToggle={() => onToggleModel(model.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Multi-Response Message Component
const MultiResponseMessage: React.FC<{ message: Message }> = ({ message }) => {
  if (!message.isMultiResponse || !message.responses) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <Users className="w-5 h-5 text-blue-400" />
        <span className="text-sm text-gray-400">
          Responses from {message.responses.length} models • {message.timestamp.toLocaleTimeString()}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {message.responses.map((response, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-4 border-l-4 border-gray-600">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-orange-400"></div>
              <span className="text-sm font-medium text-orange-400">{response.model}</span>
              {response.loading && <Loader2 className="w-3 h-3 animate-spin text-blue-400" />}
            </div>
            {response.error ? (
              <p className="text-red-400 text-sm">{response.error}</p>
            ) : response.loading ? (
              <p className="text-gray-400 text-sm">Thinking...</p>
            ) : (
              <p className="text-gray-100 text-sm whitespace-pre-wrap">{response.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Message Component - Enhanced for mobile
const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  if (message.isMultiResponse) {
    return <MultiResponseMessage message={message} />;
  }

  return (
    <div className={`flex items-start space-x-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      {message.role === 'assistant' && (
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </div>
      )}

      <div className={`max-w-xs sm:max-w-md md:max-w-lg p-3 sm:p-4 rounded-lg ${message.role === 'user'
        ? 'bg-blue-600 text-white ml-8 sm:ml-12'
        : 'bg-gray-700 text-gray-100 mr-8 sm:mr-12'
        }`}>
        <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
        <div className="text-xs opacity-70 mt-2 flex items-center space-x-2">
          <span>{message.timestamp.toLocaleTimeString()}</span>
          {message.model && (
            <>
              <span>•</span>
              <span className="font-medium">{message.model}</span>
            </>
          )}
        </div>
      </div>

      {message.role === 'user' && (
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </div>
      )}
    </div>
  );
};

// Loading Component - Updated for mobile
const LoadingMessage: React.FC<{ selectedModels: string[] }> = ({ selectedModels }) => (
  <div className="mb-6">
    <div className="flex items-center space-x-2 mb-3">
      <Users className="w-5 h-5 text-blue-400" />
      <span className="text-sm text-gray-400">
        Getting responses from {selectedModels.length} models...
      </span>
    </div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      {selectedModels.map((model, index) => (
        <div key={index} className="bg-gray-700 rounded-lg p-4 border-l-4 border-blue-500">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
            <span className="text-sm font-medium text-orange-400">{model}</span>
            <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
          </div>
          <p className="text-gray-400 text-sm">Thinking...</p>
        </div>
      ))}
    </div>
  </div>
);

// Welcome Message Component - Updated for mobile
const WelcomeMessage: React.FC = () => (
  <div className="text-center max-w-md px-4">
    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
      <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
    </div>
    <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome to AI Fiesta</h2>
    <p className="text-gray-400 text-sm sm:text-base mb-6">Select one or more AI models above and ask anything to compare their responses side by side.</p>
  </div>
);

// Chat Area Component - Updated for mobile
const ChatArea: React.FC<ChatAreaProps> = ({ messages, isLoading, selectedModels }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, selectedModels]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        {selectedModels.length === 0 ? (
          <div className="flex-1 flex flex-col justify-center items-center">
            <WelcomeMessage />
          </div>
        ) : (
            <div className="flex flex-col lg:flex-row mx-auto flex-1 h-full gap-4 lg:gap-8">
              {selectedModels.map((selectModels: string, index: number) => {
                let isLast = index === selectedModels.length - 1;
                return (
                  <div
                    key={selectModels}
                    className={clsx('flex-col px-2 sm:px-4 flex-1', {
                      "lg:border-r lg:border-gray-700": !isLast
                    })}
                  >
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={
                        message.isMultiResponse
                          ? {
                            ...message,
                            responses: message.responses?.filter((res) => res.model === selectModels) ?? []
                          }
                          : message
                      }
                    />
                  ))}
                  {isLoading && selectedModels.length > 1 && (
                    <LoadingMessage selectedModels={selectedModels} />
                  )}
                  <div ref={messagesEndRef} />
                </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

// Input Controls Component - Updated for mobile
const InputControls: React.FC<{
  message: string;
  onSendMessage: () => void;
  isLoading: boolean;
}> = ({ message, onSendMessage, isLoading }) => (
  <div className="absolute right-2 bottom-2 sm:right-3 sm:bottom-3 flex items-center space-x-1">
    <button className="p-1 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
      <Image className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
    <button className="p-1 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
      <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
    <button className="p-1 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
      <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
    <button
      onClick={onSendMessage}
      disabled={!message.trim() || isLoading}
      className={`p-1 sm:p-2 rounded-lg transition-colors ${message.trim() && !isLoading
        ? 'bg-green-500 hover:bg-green-600 text-white'
        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
      ) : (
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
      )}
    </button>
  </div>
);

// Input Area Component - Updated for mobile
const InputArea: React.FC<InputAreaProps> = ({ message, onMessageChange, onSendMessage, isLoading, selectedModels }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const getPlaceholder = () => {
    if (selectedModels.length === 0) {
      return "Select models to get started...";
    } else if (selectedModels.length === 1) {
      return `Ask ${selectedModels[0]} anything...`;
    } else {
      return `Ask ${selectedModels.length} models anything...`;
    }
  };

  return (
    <div className="border-t border-gray-700 p-3 sm:p-4">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={getPlaceholder()}
            disabled={isLoading || selectedModels.length === 0}
            className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3 sm:p-4 pr-24 sm:pr-32 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 text-sm sm:text-base"
            rows={1}
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          <InputControls message={message} onSendMessage={onSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

// Main App Component
const AIFiestaClone: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setApiLogs] = useState<string[]>([]);
  const [models, setModels] = useState<AIModel[]>([
    {
      id: 'chatgpt',
      name: 'OpenAI GPT-3.5',
      color: 'bg-emerald-500',
      enabled: true,
      selected: true
    },
    {
      id: 'gemini',
      name: 'Gemini 1.5 Flash',
      color: 'bg-blue-500',
      enabled: true,
      selected: true
    },
    {
      id: 'deepseek',
      name: 'DeepSeek Chat',
      color: 'bg-purple-500',
      enabled: true,
      selected: true
    },
    {
      id: 'perplexity',
      name: 'Mistral Large',
      color: 'bg-orange-500',
      enabled: true,
      selected: true
    }
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const apiService = new ApiService();
  const selectedModels = models.filter(m => m.selected && m.enabled).map(m => m.id);

  const addApiLog = (log: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setApiLogs(prev => [...prev, `[${timestamp}] ${log}`].slice(-20));
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleModelToggleSelect = (modelId: string) => {
    setModels(prev => prev.map(model =>
      model.id === modelId ? { ...model, selected: !model.selected } : model
    ));
    addApiLog(`Model ${modelId} ${models.find(m => m.id === modelId)?.selected ? 'deselected' : 'selected'}`);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading || selectedModels.length === 0) return;

    const userMessage: Message = {
      id: generateId(),
      content: message,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = message;
    setMessage('');
    setIsLoading(true);

    if (selectedModels.length === 1) {
      // Single model response
      addApiLog(`Sending message to ${selectedModels[0]}: "${currentMessage.substring(0, 50)}..."`);

      try {
        const response = await apiService.sendQuery(currentMessage, selectedModels[0]);

        if (response.error) {
          addApiLog(`API Error from ${selectedModels[0]}: ${response.error}`);
        } else {
          addApiLog(`Received response from ${selectedModels[0]}: "${response.response.substring(0, 50)}..."`);
        }

        const assistantMessage: Message = {
          id: generateId(),
          content: response.response,
          role: 'assistant',
          timestamp: new Date(),
          model: response.model || selectedModels[0],
        };

        setMessages(prev => [...prev, assistantMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        addApiLog(`Unexpected error with ${selectedModels[0]}: ${error}`);

        const errorMessage: Message = {
          id: generateId(),
          content: 'Sorry, I encountered an unexpected error. Please check the debug panel for details.',
          role: 'assistant',
          timestamp: new Date(),
          model: selectedModels[0],
        };

        setMessages(prev => [...prev, errorMessage]);
      }
    } else {
      // Multi-model response
      addApiLog(`Sending message to ${selectedModels.length} models: "${currentMessage.substring(0, 50)}..."`);

      // Create initial multi-response message with loading states
      const multiResponseMessage: Message = {
        id: generateId(),
        content: '',
        role: 'assistant',
        timestamp: new Date(),
        isMultiResponse: true,
        responses: selectedModels.map(model => ({
          model,
          content: '',
          loading: true
        }))
      };

      setMessages(prev => [...prev, multiResponseMessage]);

      try {
        const responses = await apiService.sendMultiQuery(currentMessage, selectedModels);

        // Update the message with actual responses
        setMessages(prev => prev.map(msg => {
          if (msg.id === multiResponseMessage.id) {
            return {
              ...msg,
              responses: selectedModels.map(model => ({
                model,
                content: responses[model]?.response || 'No response received',
                error: responses[model]?.error,
                loading: false
              }))
            };
          }
          return msg;
        }));

        // Log results
        Object.entries(responses).forEach(([model, response]) => {
          if (response.error) {
            addApiLog(`API Error from ${model}: ${response.error}`);
          } else {
            addApiLog(`Received response from ${model}: "${response.response.substring(0, 50)}..."`);
          }
        });

      } catch (error) {
        addApiLog(`Unexpected error in multi-query: ${error}`);

        // Update with error states
        setMessages(prev => prev.map(msg => {
          if (msg.id === multiResponseMessage.id) {
            return {
              ...msg,
              responses: selectedModels.map(model => ({
                model,
                content: '',
                error: 'Unexpected error occurred',
                loading: false
              }))
            };
          }
          return msg;
        }));
      }
    }

    setIsLoading(false);
  };

  const handleToggleModel = (modelId: string) => {
    setModels(prev => prev.map(model =>
      model.id === modelId ? { ...model, enabled: !model.enabled } : model
    ));
    addApiLog(`Model ${modelId} ${models.find(m => m.id === modelId)?.enabled ? 'disabled' : 'enabled'}`);
  };

  const handleNewChat = () => {
    setMessages([]);
    setMessage('');
    addApiLog('Started new chat session');
  };


  const [isOpen, setIsOpen] = useState(false);
  const userMessageCount = messages.filter(msg => msg.role === 'user').length;
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar
        models={models}
        messageCount={userMessageCount}
        onNewChat={handleNewChat} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          models={models}
          onModelToggleSelect={handleModelToggleSelect}
          onToggleModel={handleToggleModel}
          onMenuClick={() => setIsOpen(!isOpen)}
        />
        <ChatArea
          messages={messages}
          isLoading={isLoading}
          selectedModels={selectedModels}
        />

        <InputArea
          message={message}
          onMessageChange={setMessage}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          selectedModels={selectedModels}
        />
      </div>
    </div>
  );
};

export default AIFiestaClone;