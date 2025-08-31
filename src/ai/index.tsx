import React, { useState } from 'react';
import {
  Send,
  User,
  Bot,
  Loader2,
  Users,
  Menu,
  X,
  Expand,
} from 'lucide-react';

import type { AIModel, Message } from '../lib/type';
import { Logo } from '../components/logo';
import { NewChatButton, ProjectsSection } from './Component/sidebar';
import { Route, Routes } from 'react-router-dom';
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
  selectedModels: AIModel[];
  onToggleModelActive: (modelId: string) => void;
  collapsedModels: string[];
  onToggleCollapse: (modelId: string, val: boolean) => void;
}
interface InputAreaProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  selectedModels: AIModel[];
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

const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  selectedModels,
  onToggleModelActive,
  collapsedModels,
  onToggleCollapse
}) => {
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
          <div className="flex-1 flex overflow-x-auto w-full scroll-smooth bg-gray-850 scrollbar-hide">
            {selectedModels.map((model, index) => {// Assuming all selected models are active
              if (model.isExpend && model.selected) {
                return (
                  <div
                    key={model.id}
                    className={`flex flex-col h-full min-w-0 transition-all duration-300
                    ${index < selectedModels.length - 1 ? "border-r border-gray-700" : ""}
                  `}
                    style={{
                      width: `calc((100% - ${collapsedModels.length * 80}px) / ${selectedModels.length - collapsedModels.length})`,
                      flex: '1 1 auto'
                    }}
                  >
                    <div className="sticky top-0 bg-gray-800 py-2 px-4 flex items-center z-10 justify-between">
                      <span className="font-medium">{model.name}</span>
                      <div className='flex gap-4'>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={model.selected}
                            onChange={() => onToggleModelActive(model.id)}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer ${model.selected ? 'peer-checked:bg-blue-600' : ''} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                        </label>
                        <button
                          onClick={() => onToggleCollapse(model.id, false)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Expand className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <MessageBubble
                          key={message.id}
                          message={
                            message.isMultiResponse
                              ? {
                                ...message,
                                responses: message.responses?.filter((res) => res.model === model.id) ?? []
                              }
                              : message
                          }
                        />
                      ))}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={model.id}
                    className="flex flex-col h-full min-w-0 border-r border-gray-700 last:border-r-0"
                    style={{ width: '80px', flex: '0 0 auto' }}
                  >
                    <div className="sticky top-0 bg-gray-800 py-2 px-3 flex flex-col items-center justify-between h-full z-10">
                      <span className="font-medium text-xs text-center mb-2">{model.name}</span>
                      <div className='flex flex-col items-center gap-3'>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={model.selected}
                            onChange={() => onToggleModelActive(model.id)}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer ${model.selected ? 'peer-checked:bg-blue-600' : ''} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                        </label>
                        <button
                          onClick={() => onToggleCollapse(model.id, true)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Expand className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );

              }
            })}
        </div>
      )}
    </div>
  );
};

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
const modelsComponent = [
  {
    id: 'chatgpt',
    name: 'OpenAI GPT-3.5',
    color: 'bg-emerald-500',
    enabled: true,
    selected: true,
    isExpend: true
  },
  {
    id: 'gemini',
    name: 'Gemini 1.5 Flash',
    color: 'bg-blue-500',
    enabled: true,
    selected: true,
    isExpend: true
  },
  {
    id: 'deepseek',
    name: 'DeepSeek Chat',
    color: 'bg-purple-500',
    enabled: true,
    selected: true,
    isExpend: true
  },
  {
    id: 'perplexity',
    name: 'Mistral Large',
    color: 'bg-orange-500',
    enabled: true,
    selected: false,
    isExpend: false
  }
]

const AI: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [models, setModels] = useState<AIModel[]>(modelsComponent);
  const [collapsedModels, setCollapsedModels] = useState<string[]>([]);
  const apiService = createApiClient('');
  const selectedModels = models.filter(m => m.enabled);
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleToggleModelActive = (modelId: string) => {
    setModels((prev) => {
      const selectedCount = prev.filter(m => m.selected).length;
      const expandedCount = prev.filter(m => m.isExpend).length;

      return prev.map((model) => {
        if (model.id === modelId) {
          const willBeSelected = !model.selected;

          // Prevent selecting more than 3
          if (willBeSelected && selectedCount >= 3) return model;

          // Prevent deselecting the last selected model
          if (!willBeSelected && selectedCount <= 1) return model;

          return {
            ...model,
            selected: willBeSelected,
            isExpend: willBeSelected
              ? expandedCount < 3
                ? true
                : model.isExpend // Don't expand if already 3 are expanded
              : false, // collapse on deselect
          };
        }

        return model;
      });
    });
  };


  const handleToggleCollapse = (modelId: string, expand: boolean) => {
    setModels((prev) => {
      const expandedCount = prev.filter(m => m.isExpend).length;
      const selectedCount = prev.filter(m => m.selected).length;

      return prev.map((model) => {
        if (model.id === modelId) {
          if (expand) {
            // Enforce max 3 expanded
            if (expandedCount >= 3) return model;
            return {
              ...model,
              isExpend: true,
              selected: true, // expanding means selecting
            };
          } else {
            // Enforce min 1 expanded and selected
            if (expandedCount <= 1 || selectedCount <= 1) return model;
            return {
              ...model,
              isExpend: false,
              selected: false, // collapse = deselect
            };
          }
        }
        return model;
      });
    });
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
        responses: selectedModels.filter((model) => model.selected).map(model => ({
          model: model.id,
          content: '',
          loading: true,
        })),
      };

      setMessages(prev => [...prev, multiResponseMessage]);

      try {
        const responses = await apiService.sendQuery(currentMessage, selectedModels.filter((model) => model.selected).map((model) => model.id));

        // Update ONLY the multiResponseMessage
        setMessages(prev =>
          prev.map(msg => {
            if (msg.id === multiResponseId) {
              return {
                ...msg,
                responses: selectedModels.filter((model) => model.selected).map(model => {
                  const response = (responses as unknown as any[])?.find(
                    (res: any) => res.provider === providerMapping[model.id]
                  );
                  return {
                    model: model.id,
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
  const [isOpen, setIsOpen] = useState(false);
  const handleNewChat = () => {
    setMessages([]);
    setMessage('');
    setCollapsedModels([]);
  };


  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
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
        </div>
      </>
      <div className="flex-1 flex flex-col min-w-0">
        <Routes>
          <Route path="/ai-app" element={<>
            <TopBar models={[]} onModelToggleSelect={handleToggleModelActive} onToggleModel={() => { }} onMenuClick={() => setIsOpen(true)} />
            <ChatArea
              messages={messages}
              isLoading={isLoading}
              selectedModels={selectedModels}
              onToggleModelActive={handleToggleModelActive}
              collapsedModels={collapsedModels}
              onToggleCollapse={handleToggleCollapse}
            />
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