import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Image,
  Upload,
  Mic,
  User,
  Bot,
  Loader2,
  Check,
  Users,
  Menu,
  Sun,
  Moon,
  X
} from 'lucide-react';
import type { AIModel, ApiResponse, Message } from '../lib/type';
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

const providerMapping: { [key: string]: string } = {
  'chatgpt': 'openai',
  'gemini': 'gemini',
  'deepseek': 'deepseek',
  'perplexity': 'mistral',
};
class ApiService {
  private baseUrl = 'http://localhost:3001/api/queries';

  async sendQuery(query: string, model: string): Promise<ApiResponse> {


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
const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const [showModels, setShowModels] = useState(false);

  return (
    <div className="border-b border-gray-700">
      <div className="max-w-6xl mx-auto">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between mb-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-600 hover:text-white hover:bg-gray-700"
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

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
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
                  <p className="text-gray-100 text-sm whitespace-pre-wrap break-all">{response.content}</p>
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

// Welcome Message Component - Updated for mobile

const ChatArea: React.FC<ChatAreaProps> = ({ messages, isLoading, selectedModels }) => {
  return (
    <div className="flex flex-col h-screen w-full mx-auto bg-gray-900 text-gray-100 shadow-xl overflow-hidden">
      {selectedModels.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-850">
          <div className="text-center max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No AI Models Selected</h3>
            <p className="text-gray-500">Select at least one AI model from the options above to start chatting.</p>
          </div>
        </div>
      ) : (
          <div
            className="flex-1 flex overflow-x-auto  w-full scroll-smooth bg-gray-850 scrollbar-hide"
          >
            {selectedModels.map((model, index) => (
              <div
                key={model}
                className={`flex flex-col h-full min-w-0
    w-full flex-shrink-0
    md:flex-1 md:min-w-1/4 md:w-[calc(100%/${selectedModels.length})]
    ${index < selectedModels.length - 1 ? "border-r border-gray-700" : ""}
  `}
              >
                <ChatAreaMassage messages={messages}
                  isLoading={isLoading}
                  selectedModels={selectedModels}
                  model={model} />
              </div>
            ))}
        </div>

      )}
    </div>
  );
};

interface ChatAreaMassageProps {
  messages: Message[];
  isLoading: boolean;
  selectedModels: string[];
  model: string;
}
const ChatAreaMassage: React.FC<ChatAreaMassageProps> = ({ messages, isLoading, selectedModels, model }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, selectedModels]);
  return <>
    <div className="sticky top-0 bg-gray-800 py-2 px-4 flex items-center z-10">
      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
      <span className="font-medium">{model}</span>
    </div>
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={
              message.isMultiResponse
                ? {
                  ...message,
                  responses: message.responses?.filter((res) => res.model === model) ?? []
                }
                : message
            }
          />
        ))}
      </>
      <div ref={messagesEndRef} />
    </div>
  </>

}
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUpgradePlanOpen, setIsUpgradePlanOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  const handleModelToggle = (modelId: string) => {
    setModels(prev => prev.map(model =>
      model.id === modelId ? { ...model, selected: !model.selected } : model
    ));
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    // You could also persist this to localStorage
  };
  const userMessageCount = messages.filter(msg => msg.role === 'user').length;
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar
        models={models}
        messageCount={userMessageCount}
        onNewChat={handleNewChat} isOpen={isOpen} setIsOpen={setIsOpen}
        onOpenSettings={() => setIsSettingsOpen(pro => !pro)} onOpenUpgrade={() => setIsUpgradePlanOpen(pro => !pro)} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          models={models}
          onModelToggleSelect={handleModelToggleSelect}
          onToggleModel={handleToggleModel}
          onMenuClick={() => setIsOpen(!isOpen)}
        />
        <ChatArea messages={messages}
          isLoading={isLoading}
          selectedModels={selectedModels} />
        <InputArea
          message={message}
          onMessageChange={setMessage}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          selectedModels={selectedModels}
        />
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          selectedModels={selectedModels}
          onModelToggle={handleModelToggle}
          theme={theme}
          onThemeChange={handleThemeChange}
        />

        <UpgradePlanModal
          isOpen={isUpgradePlanOpen}
          onClose={() => setIsUpgradePlanOpen(false)}
        />
      </div>
    </div>
  );
};

export default AIFiestaClone;


const UpgradePlanModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const plans = [
    {
      name: "Free",
      price: "$0",
      features: ["3 AI models", "Basic responses", "Standard speed", "5 requests per hour"]
    },
    {
      name: "Pro",
      price: "$15",
      period: "/month",
      features: ["All AI models", "Advanced responses", "Faster speed", "Unlimited requests", "Priority support"]
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["All AI models", "Custom integrations", "Highest speed", "Unlimited requests", "Dedicated support", "API access"]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 bg-gray-800">
          <h2 className="text-xl font-semibold">Upgrade Your Plan</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`bg-gray-700 rounded-lg p-4 md:p-6 ${index === 1 ? 'ring-2 ring-blue-500 md:transform md:scale-105' : ''
                  }`}
              >
                <h3 className="text-lg md:text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-3 md:mb-4">
                  <span className="text-2xl md:text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-400 text-sm md:text-base">{plan.period}</span>}
                </div>
                <ul className="space-y-1 md:space-y-2 mb-4 md:mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-xs md:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 rounded-lg font-medium text-sm md:text-base ${index === 1
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                    }`}
                >
                  {index === 0 ? 'Current Plan' : 'Upgrade Now'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-700 text-center text-xs md:text-sm text-gray-400">
          Need help choosing a plan? <a href="#" className="text-blue-400 hover:underline">Contact us</a>
        </div>
      </div>
    </div>
  );
  };
const SettingsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  selectedModels: string[];
  onModelToggle: (modelId: string) => void;
  theme: string;
  onThemeChange: (theme: string) => void;
}> = ({ isOpen, onClose, selectedModels, onModelToggle, theme, onThemeChange }) => {
  if (!isOpen) return null;

  const availableModels = [
    { id: 'chatgpt', name: 'OpenAI GPT-3.5' },
    { id: 'gemini', name: 'Gemini 1.5 Flash' },
    { id: 'deepseek', name: 'DeepSeek Chat' },
    { id: 'perplexity', name: 'Mistral Large' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 bg-gray-800">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Theme Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Theme</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => onThemeChange('light')}
                className={`flex items-center justify-center px-3 py-2 md:px-4 md:py-2 rounded-lg border text-sm md:text-base ${theme === 'light'
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  }`}
              >
                <Sun className="w-4 h-4 mr-1 md:mr-2" />
                Light
              </button>
              <button
                onClick={() => onThemeChange('dark')}
                className={`flex items-center justify-center px-3 py-2 md:px-4 md:py-2 rounded-lg border text-sm md:text-base ${theme === 'dark'
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  }`}
              >
                <Moon className="w-4 h-4 mr-1 md:mr-2" />
                Dark
              </button>
            </div>
          </div>

          {/* Model Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">AI Models</h3>
            <div className="space-y-2">
              {availableModels.map(model => (
                <div key={model.id} className="flex items-center justify-between p-2 bg-gray-700 rounded-lg">
                  <span className="text-sm md:text-base">{model.name}</span>
                  <button
                    onClick={() => onModelToggle(model.id)}
                    className={`w-8 h-4 rounded-full relative transition-colors ${selectedModels.includes(model.id) ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                  >
                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${selectedModels.includes(model.id) ? 'translate-x-4' : 'translate-x-0.5'
                      }`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-700 flex justify-end sticky bottom-0 bg-gray-800">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm md:text-base"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
