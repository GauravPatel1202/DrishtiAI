import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  User,
  Bot,
  Loader2,
  Users,
  Menu,
  X,
  Settings
} from 'lucide-react';
import type { AIModel, Message } from '../lib/type';
import { Logo } from '../components/logo';
import { NewChatButton, ProjectsSection, } from './Component/sidebar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProfileSettings from './profileSettings';
import { createApiClient } from '../lib/apiService';

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

const providerMapping: { [key: string]: string } = {
  'chatgpt': 'openai',
  'gemini': 'gemini',
  'deepseek': 'deepseek',
  'perplexity': 'mistral',
};

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

// Message Component - Enhanced for mobile
const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  if (message.isMultiResponse && message.responses) {
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

        {messages.map((message) => {
          { JSON.stringify(message) }
          return (
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
          )
        })}
      </>
      <div ref={messagesEndRef} />
    </div>
  </>
}
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
          <div className="absolute right-2 bottom-2 sm:right-3 sm:bottom-3 flex items-center space-x-1">
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
        </div>
      </div>
    </div>
  );
};

// Main App Component
const AI: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
  const apiService = createApiClient('');
  const selectedModels = models.filter(m => m.selected && m.enabled).map(m => m.id);
  const generateId = () => Math.random().toString(36).substr(2, 9);
  const handleModelToggleSelect = (modelId: string) => {
    setModels(prev => prev.map(model =>
      model.id === modelId ? { ...model, selected: !model.selected } : model
    ));
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

    if (selectedModels.length >= 1) {
      // Create initial multi-response message with loading states
      const multiResponseId = generateId();
      const multiResponseMessage: Message = {
        id: multiResponseId,
        content: '',
        role: 'assistant',
        timestamp: new Date(),
        isMultiResponse: true,
        responses: selectedModels.map(model => ({
          model,
          content: '',
          loading: true,
        })),
      };

      setMessages(prev => [...prev, multiResponseMessage]);

      try {
      const responses = await apiService.sendQuery(currentMessage, selectedModels);

        // Update ONLY the multiResponseMessage
        setMessages(prev =>
          prev.map(msg => {
            if (msg.id === multiResponseId) {
              return {
                ...msg,
                responses: selectedModels.map(model => {
                  const response = (responses as unknown as any[])?.find(
                    (res: any) => res.provider === providerMapping[model]
                  );
                  return {
                    model,
                    content: response?.content ?? '',
                    loading: false,
                  };
                }),
              };
            }
            return msg; // keep old messages unchanged
          })
        );
      } catch (error) {
        console.error(error);
      }
    }

    setIsLoading(false);
  };

  const handleToggleModel = (modelId: string) => {
    setModels(prev => prev.map(model =>
      model.id === modelId ? { ...model, enabled: !model.enabled } : model
    ));
  };

  const handleNewChat = () => {
    setMessages([]);
    setMessage('');
  };
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const setIsSettingsOpen = () => {
    navigate('/app/profile');
  }
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        {/* Sidebar - Full screen on mobile */}
        <div className={`
                   fixed lg:static inset-0 lg:inset-y-0 lg:left-0 z-40
                   w-full lg:w-64 bg-gray-800 border-r border-gray-700 flex flex-col
                   transform transition-transform duration-300 ease-in-out
                   lg:translate-x-0
                   ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                 `}>
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <Logo />
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4">
            <NewChatButton onClick={() => {
              handleNewChat();
              setIsOpen(false);
            }} />
          </div>
          <ProjectsSection />
          <div className="flex-1"></div>
          <div className="p-4 border-t border-gray-700">
            <button onClick={setIsSettingsOpen} className="w-full mt-2 text-gray-400 hover:text-white flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </button>
          </div>
        </div>
      </>
      <div className="flex-1 flex flex-col min-w-0">
        <Routes>
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/ai-app" element={<>
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
            /></>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default AI;
