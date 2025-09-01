import React, { useEffect, useRef, useState } from 'react';
import {
  Send,
  User,
  Bot,
  Loader2,
  Users,
  Menu,
  X,
  Expand,
  UnfoldHorizontal,
  ChevronUp,
  Sparkles,
  ChevronDown,
  Square,
  Mic,
  Edit3,
  Copy,
  Zap,
} from 'lucide-react';

import type { AIModel, Message } from '../lib/type';
import { Logo } from '../components/logo';
import { NewChatButton, ProjectsSection } from './Component/sidebar';
import { Route, Routes } from 'react-router-dom';
import { createApiClient } from '../lib/apiService';
import { DonationPopup } from '../components/DonationPopup';

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
  onToggleAllCollapse: (modelId: string) => void;
  onEditMessage: (messageId: string, newContent: string) => void;
  onRegenerateResponse: (messageId: string) => void;
  onCopyMessage: (content: string) => void;
  onRateResponse: (messageId: string, modelId: string, rating: boolean) => void;
}
interface InputAreaProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onUseExample: (example: string) => void;
  isLoading: boolean;
  selectedModels: AIModel[];
  suggestedQuestions: string[];
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
// const MessageBubble: React.FC<{
//   message: Message, model: string, onEdit?: (newContent: string) => void,
//   onRegenerate?: () => void,
//   onCopy?: (content: string) => void,
//   onRate?: (rating: boolean) => void
// }> = ({ message, model, onEdit, onRegenerate, onCopy, onRate }) => {
//   if (message.isMultiResponse && message.responses) {
//     return (
//       <div className="mb-6">
//         {message.responses.map((response, index) => (
//           <>
//             <div className="flex items-center space-x-2 mb-3">
//               <Users className="w-5 h-5 text-blue-400" />
//               <span className="text-sm text-gray-400">
//                 Responses from {message.responses?.length ?? 0} models • {message.timestamp.toLocaleTimeString()}
//               </span>
//             </div>

//             <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">

//               <div key={index} className="bg-gray-700 rounded-lg p-4 border-l-4 border-gray-600">
//                 <div className="flex items-center space-x-2 mb-2">
//                   <div className="w-2 h-2 rounded-full bg-orange-400"></div>
//                   <span className="text-sm font-medium text-orange-400">{response.model}</span>
//                   {response.loading && <Loader2 className="w-3 h-3 animate-spin text-blue-400" />}
//                 </div>
//                 {response.error ? (
//                   <p className="text-red-400 text-sm">{response.error}</p>
//                 ) : response.loading ? (
//                   <p className="text-gray-400 text-sm">Thinking...</p>
//                 ) : (
//                   <p className="text-gray-100 text-sm whitespace-pre-wrap break-all">{response.content}</p>
//                 )}
//               </div>

//             </div>
//           </>
//         ))}
//       </div>
//     );
//   }
//   if (message.model === model) {
//     return (<>
//       <div className={`flex items-start space-x-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
//         {message.role === 'assistant' && (
//           <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
//             <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
//           </div>
//         )}

//         <div className={`max-w-xs sm:max-w-md md:max-w-lg p-3 sm:p-4 rounded-lg ${message.role === 'user'
//           ? 'bg-blue-600 text-white ml-8 sm:ml-12'
//           : 'bg-gray-700 text-gray-100 mr-8 sm:mr-12'
//           }`}>
//           <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
//           <div className="text-xs opacity-70 mt-2 flex items-center space-x-2">
//             <span>{message.timestamp.toLocaleTimeString()}</span>
//             {message.model && (
//               <>
//                 <span>•</span>
//                 <span className="font-medium">{message.model}</span>
//               </>
//             )}
//           </div>
//         </div>

//         {message.role === 'user' && (
//           <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
//             <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
//           </div>
//         )}
//       </div>
//     </>)
//   }
//   return <></>

// };

const MessageBubble: React.FC<{
  message: Message,
  model: string,
  onEdit?: (newContent: string) => void,
  onRegenerate?: () => void,
  onCopy?: (content: string) => void,
  onRate?: (rating: boolean) => void
}> = ({ message, model, onEdit, onRegenerate, onCopy }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);
  const [showActions, setShowActions] = useState(false);

  const handleSaveEdit = () => {
    if (onEdit && editedContent.trim() && editedContent !== message.content) {
      onEdit(editedContent);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(message.content);
    setIsEditing(false);
  };

  if (message.isMultiResponse && message.responses) {
    return (
      <div className="mb-6 group relative">
        <div className="flex items-center space-x-2 mb-3">
          <Users className="w-5 h-5 text-blue-400" />
          <span className="text-sm text-gray-400">
            Responses from {message.responses?.length ?? 0} models • {message.timestamp.toLocaleTimeString()}
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          {message.responses.map((response, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4 border-l-4 border-gray-600 hover:border-blue-500 transition-colors relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                  <span className="text-sm font-medium text-orange-400">{response.model}</span>
                  {response.loading && <Loader2 className="w-3 h-3 animate-spin text-blue-400" />}
                </div>

                {!response.loading && !response.error && (
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onCopy?.(response.content)}
                      className="p-1text-white rounded"
                      title="Copy"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {response.error ? (
                <div className="text-red-400 text-sm">
                  <p>{response.error}</p>
                  <button
                    onClick={onRegenerate}
                    className="mt-2 text-xs text-blue-400 hover:text-blue-300 flex items-center"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Regenerate
                  </button>
                </div>
              ) : response.loading ? (
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                ) : (
                <p className="text-gray-100 text-sm whitespace-pre-wrap break-words">{response.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (message.model === model) {
    return (
      <div className={`flex items-start space-x-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4 group`} onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}>
        {message.role === 'assistant' && (
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
        )}

        <div
          className={`relative max-w-xs sm:max-w-md md:max-w-lg p-3 sm:p-4 rounded-lg ${message.role === 'user'
            ? 'bg-blue-600 text-white ml-8 sm:ml-12'
            : 'bg-gray-700 text-gray-100 mr-8 sm:mr-12'
            } group-hover:bg-opacity-95 transition-all`}

        >


          <p className="whitespace-pre-wrap text-sm sm:text-base break-all">{message.content}</p>
          <div className="text-xs opacity-70 mt-2 flex items-center space-x-2">
            <span>{message.timestamp.toLocaleTimeString()}</span>
            {message.model && (
              <>
                <span>•</span>
                <span className="font-medium">{message.model}</span>
              </>
            )}
          </div>



          {showActions && !isEditing && message.role === 'user' && (
            <div className="absolute  right-0 bg-gray-800 rounded-lg p-1 shadow-lg flex space-x-1">
              <button
                onClick={() => onCopy?.(message.content)}
                className="p-1 text-gray-400 hover:text-white rounded"
                title="Copy"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {message.role === 'user' && (
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
        )}
      </div>
    );
  }
    return <></>;
  };
const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  selectedModels,
  onToggleModelActive,
  collapsedModels,
  onToggleCollapse,
  onToggleAllCollapse,
  onEditMessage,
  onRegenerateResponse,
  onCopyMessage,
  onRateResponse
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen w-full mx-auto bg-gray-900 text-gray-100 shadow-xl overflow-hidden">
      <div className="flex-1 flex overflow-x-auto w-full scroll-smooth bg-gray-850 scrollbar-hide">
        {selectedModels.map((model, index) => {// Assuming all selected models are active
          if (model.isExpend && model.selected) {
            return (
              <div
                key={model.id}
                className={` flex flex-col flex-auto h-full transition-all duration-300 min-w-full sm:min-w-0 
                    ${index < selectedModels.length - 1 ? "border-r border-gray-700" : ""}`
                }

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
                      onClick={() => onToggleAllCollapse(model.id)}
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
                      model={model.id}
                      message={
                        message.isMultiResponse
                          ? {
                            ...message,
                            responses: message.responses?.filter((res) => res.model === model.id) ?? []
                          }
                          : message
                      }
                      onEdit={(newContent) => onEditMessage(message.id, newContent)}
                      onRegenerate={() => onRegenerateResponse(message.id)}
                      onCopy={onCopyMessage}
                      onRate={(rating) => onRateResponse(message.id, model.id, rating)}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            );
          } else {
            return <></>;
          }
        })}
        {selectedModels.map((model) => {// Assuming all selected models are active
          if (!model.isExpend && !model.selected) {
            return (

              <div
                key={model.id}
                className="flex flex-col md:flex-col h-full min-w-0 border-r border-gray-700 last:border-r-0 w-12 md:w-20 flex-none "
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
                      <UnfoldHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            );
          } else {
            return null
          }
        })}
      </div>
    </div>
  );
};

// Input Area Component - Updated for mobile
const InputArea: React.FC<InputAreaProps> = ({ message, onMessageChange, onSendMessage, isLoading, selectedModels, suggestedQuestions, onUseExample }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map(result => result.transcript)
          .join('');
        // setMessage(transcript);
        onMessageChange(transcript)
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      if (isRecording) {
        recognition.start();
      } else {
        recognition.stop();
      }

      return () => {
        recognition.stop();
      };
    }
  }, [isRecording]);

  const handleToggleRecording = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Speech recognition is not supported in your browser");
      return;
    }
    setIsRecording(!isRecording);
  };
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
      {suggestedQuestions.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 flex items-center">
              <Sparkles className="w-3 h-3 mr-1" />
              Try asking...
            </span>
            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="text-xs text-gray-500 hover:text-gray-300 flex items-center"
            >
              {showSuggestions ? 'Hide' : 'Show'}
              {showSuggestions ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
            </button>
          </div>

          {showSuggestions && (
            <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => onUseExample(question)}
                  className="flex-shrink-0 bg-gray-700 hover:bg-gray-600 text-xs text-gray-200 px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="max-w-6xl mx-auto p-3">
        <div className="relative bg-gray-750 border border-gray-600 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
          <textarea
            value={message}
            ref={textareaRef}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={getPlaceholder()}
            disabled={isLoading || selectedModels.length === 0}
            className="w-full bg-transparent p-3 pr-24 text-white placeholder-gray-400 resize-none focus:outline-none disabled:opacity-50 text-sm sm:text-base scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
            rows={1}
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          <div className="absolute right-2 bottom-2 flex items-center space-x-2">
            <button
              onClick={handleToggleRecording}
              className={`p-2 rounded-lg transition-colors ${isRecording
                ? 'bg-red-500 text-white animate-pulse'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
              disabled={isLoading}
              title={isRecording ? "Stop recording" : "Start voice input"}
            >
              {isRecording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <button
              onClick={onSendMessage}
              disabled={!message.trim() || isLoading}
              className={`p-2 rounded-lg transition-colors flex items-center justify-center ${message.trim() && !isLoading
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              title="Send message"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                  <Send className="w-4 h-4" />
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

const exampleQuestions = [
  "Explain quantum computing in simple terms",
  "How to learn React quickly?",
  "What are the best practices for API design?",
  "Write a poem about artificial intelligence",
  "Compare Next.js and Remix frameworks"
];

const AI: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [models, setModels] = useState<AIModel[]>(modelsComponent);
  const [collapsedModels, setCollapsedModels] = useState<string[]>([]);
  const apiService = createApiClient();
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

  const handleToggleAllCollapse = (modelId: string) => {
    setModels((prev) => {
      return prev.map((model) => {
        if (model.id === modelId) {
          return {
            ...model,
            isExpend: true,
            selected: true, // expanding means selecting
          };
        } else {
          return {
            ...model,
            isExpend: false,
            selected: false, // collapse = deselect
          };
        }
      });
    });
  };


  const handleSendMessage = async () => {
    if (!message.trim() || isLoading || selectedModels.length === 0) return;

    const currentMessage = message;
    setMessage('');
    setIsLoading(true);

    if (selectedModels.length >= 1) {

      const multiResponseId = generateId();
      const userMessage: Message[] = selectedModels.filter((model) => model.selected).map(model => ({
        id: multiResponseId,
        content: message,
        role: 'user' as 'user',
        model: model.id,
        timestamp: new Date(),
      })) ?? []

      setMessages(prev => {
        return [...prev, ...userMessage]
      });
      // Create initial multi-response message with loading state
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

  const handleUseExample = (example: string) => {
    setMessage(example);
  };
  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    // You could add a toast notification here
  };
  const handleEditMessage = (messageId: string, newContent: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, content: newContent } : msg
      )
    );
  };

  const handleRateResponse = (messageId: string, modelId: string, rating: boolean) => {
    // Here you would typically send this feedback to your backend
    console.log(`Rated message ${messageId} from model ${modelId} as ${rating ? 'good' : 'bad'}`);
  }

  const handleRegenerateResponse = async (messageId: string) => {
    // Find the user message that this response is for
    const responseMessage = messages.find(m => m.id === messageId);
    if (!responseMessage || !responseMessage.isMultiResponse) return;

    // Find the user message that preceded this response
    const userMessageIndex = messages.findIndex(m => m.id === messageId) - 1;
    if (userMessageIndex < 0) return;

    const userMessage = messages[userMessageIndex];
    if (userMessage.role !== 'user') return;

    setIsLoading(true);

    // Update the response message to show loading state
    setMessages(prev =>
      prev.map(msg => {
        if (msg.id === messageId) {
          return {
            ...msg,
            responses: msg.responses?.map(r => ({ ...r, loading: true, error: undefined })) || [],
          };
        }
        return msg;
      })
    );

    try {
      const responses = await apiService.sendQuery(userMessage.content, selectedModels.filter((model) => model.selected).map((model) => model.id));

      // Update the response message with new responses
      setMessages(prev =>
        prev.map(msg => {
          if (msg.id === messageId) {
            return {
              ...msg,
              responses: selectedModels.filter((model) => model.selected).map(model => {
                const response = (responses as unknown as any[])?.find(
                  (res: any) => res.provider === providerMapping[model.id]
                );
                return {
                  model: model.id,
                  content: response?.content ?? 'No response received',
                  loading: false,
                };
              }),
            };
          }
          return msg;
        })
      );
    } catch (error) {
      console.error(error);
      setMessages(prev =>
        prev.map(msg => {
          if (msg.id === messageId) {
            return {
              ...msg,
              responses: msg.responses?.map(r => ({
                ...r,
                error: 'Failed to regenerate response',
                loading: false
              })) || [],
            };
          }
          return msg;
        })
      );
    }

    setIsLoading(false);
  };
  const [showDonation, setShowDonation] = useState(false);

  useEffect(() => {
    setShowDonation(true);
    const timer = setInterval(() => {
      setShowDonation(true);
    }, 60 * 60 * 1000); // 1 hour
    return () => clearInterval(timer);
  }, []);


  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {showDonation && (
        <DonationPopup onClose={() => setShowDonation(false)} />
      )}
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
              onToggleAllCollapse={handleToggleAllCollapse}
              onEditMessage={handleEditMessage}
              onRegenerateResponse={handleRegenerateResponse}
              onCopyMessage={handleCopyMessage}
              onRateResponse={handleRateResponse}

            />
            <InputArea
              message={message}
              onMessageChange={setMessage}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              selectedModels={selectedModels}
              onUseExample={handleUseExample}
              suggestedQuestions={exampleQuestions}
            /></>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default AI;