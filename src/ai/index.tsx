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
  Copy,
  Zap,
  VolumeX,
  Volume2,
  Bookmark,
  BookmarkCheck,
  Share,
  Download,
  Clock,
  ShoppingCart,
  ChefHat,
  Heart,
  TrendingUp,
  CloudRain,
  Sun,
  Moon,
  Target,
  Wallet,
  PiggyBank,
  Edit3,
  Lightbulb,
  Utensils,
  Search,
  History,
  Star,

  Calendar,

  Home,
  Gift,

  BookOpen,
  Globe,
  MapPin,

  Mail,

  Palette,
  Scissors,

  Compass,
  Watch,

  Lock,

  DollarSign,
  CreditCard,
  Receipt,
  Package,





  FileText,
  Music,
  Film,
  Luggage,
  Briefcase,
  Languages,
  GraduationCap,
  Smartphone,
  Code,
  Cpu,



} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import { exampleQuestions, modelsComponent, type AIModel, type Message } from '../lib/type';
import { Logo } from '../components/logo';
import { NewChatButton, ProjectsSection } from './Component/sidebar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { createApiClient } from '../lib/apiService';
import { DonationPopup } from '../components/DonationPopup';
import { useAuth } from '../AuthContext';

interface TopBarProps {
  models: AIModel[];
  onModelToggleSelect: (modelId: string) => void;
  onToggleModel: (modelId: string) => void;
  onMenuClick: () => void;
  onToggleTools: () => void;
  showTools: boolean;
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
  readingMessageId?: string;
  onReadAloud: (messageId: string, content: string) => void;
  onStopReading: () => void;
  onBookmarkMessage: (messageId: string) => void;
  onShareMessage: (content: string) => void;
  onExportMessage: (content: string, format: string) => void;
}

interface InputAreaProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onUseExample: (example: string) => void;
  isLoading: boolean;
  selectedModels: AIModel[];
  suggestedQuestions: string[];
  onQuickAction: (prompt: string) => void;
  showTools: boolean;
  onToggleTools: () => void;
}

interface MessageBubbleProps {
  message: Message;
  model: string;
  onEdit?: (newContent: string) => void;
  onRegenerate?: () => void;
  onCopy?: (content: string) => void;
  onRate?: (rating: boolean) => void;
  isReading?: boolean;
  onReadAloud?: (content: string) => void;
  onStopReading?: () => void;
  onBookmark?: (messageId: string) => void;
  onShare?: (content: string) => void;
  onExport?: (content: string, format: string) => void;
}

interface DailyTool {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  prompt: string;
  category: string;
  favorite?: boolean;
}

interface QuickAction {
  id: string;
  title: string;
  prompt: string;
  icon: React.ReactNode;
  category: string;
}

interface ToolCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface RecentTool {
  id: string;
  name: string;
  timestamp: Date;
  prompt: string;
}

const providerMapping: { [key: string]: string } = {
  'chatgpt': 'openai',
  'gemini': 'gemini',
  'deepseek': 'deepseek',
  'perplexity': 'mistral',
};

// Tool categories
const toolCategories: ToolCategory[] = [
  {
    id: 'all',
    name: 'All Tools',
    icon: <Sparkles className="w-4 h-4" />,
    color: 'bg-purple-500'
  },
  {
    id: 'productivity',
    name: 'Productivity',
    icon: <TrendingUp className="w-4 h-4" />,
    color: 'bg-blue-500'
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    icon: <Heart className="w-4 h-4" />,
    color: 'bg-green-500'
  },
  {
    id: 'home',
    name: 'Home & Life',
    icon: <Home className="w-4 h-4" />,
    color: 'bg-orange-500'
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: <DollarSign className="w-4 h-4" />,
    color: 'bg-emerald-500'
  },
  {
    id: 'creativity',
    name: 'Creativity',
    icon: <Palette className="w-4 h-4" />,
    color: 'bg-pink-500'
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: <Cpu className="w-4 h-4" />,
    color: 'bg-indigo-500'
  },
  {
    id: 'education',
    name: 'Education',
    icon: <BookOpen className="w-4 h-4" />,
    color: 'bg-yellow-500'
  },
  {
    id: 'travel',
    name: 'Travel',
    icon: <Globe className="w-4 h-4" />,
    color: 'bg-cyan-500'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: <Film className="w-4 h-4" />,
    color: 'bg-red-500'
  }
];

// Enhanced daily tools with categories
const dailyTools: DailyTool[] = [
  // Productivity
  {
    id: 'daily-planner',
    name: 'Daily Planner',
    icon: <Calendar className="w-5 h-5" />,
    description: 'Plan your perfect day',
    prompt: 'Create a detailed daily schedule for optimal productivity including work blocks, breaks, and self-care',
    category: 'productivity'
  },
  {
    id: 'goal-setter',
    name: 'Goal Setter',
    icon: <Target className="w-5 h-5" />,
    description: 'Set and track goals',
    prompt: 'Help me create SMART goals for the next quarter with actionable steps',
    category: 'productivity'
  },
  {
    id: 'meeting-helper',
    name: 'Meeting Helper',
    icon: <Users className="w-5 h-5" />,
    description: 'Prepare for meetings',
    prompt: 'Create an agenda and talking points for a team meeting about project updates',
    category: 'productivity'
  },
  {
    id: 'time-blocker',
    name: 'Time Blocker',
    icon: <Clock className="w-5 h-5" />,
    description: 'Time management system',
    prompt: 'Help me create a time blocking schedule for a productive work week',
    category: 'productivity'
  },
  {
    id: 'email-responder',
    name: 'Email Responder',
    icon: <Mail className="w-5 h-5" />,
    description: 'Craft professional emails',
    prompt: 'Help me write a professional email to my manager about requesting time off',
    category: 'productivity'
  },

  // Health & Wellness
  {
    id: 'meal-planner',
    name: 'Meal Planner',
    icon: <ChefHat className="w-5 h-5" />,
    description: 'Weekly meal plans',
    prompt: 'Create a healthy meal plan for the week with grocery list for a family of 4',
    category: 'health'
  },
  {
    id: 'workout-builder',
    name: 'Workout Builder',
    icon: <Heart className="w-5 h-5" />,
    description: 'Custom workouts',
    prompt: 'Design a 30-minute home workout focusing on strength and cardio',
    category: 'health'
  },
  {
    id: 'meditation-guide',
    name: 'Meditation Guide',
    icon: <Zap className="w-5 h-5" />,
    description: 'Mindfulness exercises',
    prompt: 'Guide me through a 10-minute mindfulness meditation session',
    category: 'health'
  },
  {
    id: 'sleep-optimizer',
    name: 'Sleep Optimizer',
    icon: <Moon className="w-5 h-5" />,
    description: 'Improve sleep quality',
    prompt: 'Suggest a bedtime routine and environment adjustments to improve sleep quality',
    category: 'health'
  },
  {
    id: 'stress-manager',
    name: 'Stress Manager',
    icon: <CloudRain className="w-5 h-5" />,
    description: 'Stress reduction techniques',
    prompt: 'Provide 5 effective techniques to manage stress during busy work periods',
    category: 'health'
  },

  // Home & Life
  {
    id: 'cleaning-schedule',
    name: 'Cleaning Schedule',
    icon: <Sparkles className="w-5 h-5" />,
    description: 'Home maintenance',
    prompt: 'Create a weekly cleaning schedule for a 3-bedroom house',
    category: 'home'
  },
  {
    id: 'grocery-optimizer',
    name: 'Grocery Optimizer',
    icon: <ShoppingCart className="w-5 h-5" />,
    description: 'Smart shopping lists',
    prompt: 'Generate a cost-effective grocery list for healthy meals for the week',
    category: 'home'
  },
  {
    id: 'recipe-finder',
    name: 'Recipe Finder',
    icon: <Utensils className="w-5 h-5" />,
    description: 'Find recipes',
    prompt: 'Suggest 3 easy dinner recipes using chicken, rice, and vegetables',
    category: 'home'
  },
  {
    id: 'home-organizer',
    name: 'Home Organizer',
    icon: <Package className="w-5 h-5" />,
    description: 'Decluttering strategies',
    prompt: 'Provide a room-by-room guide to declutter and organize my home',
    category: 'home'
  },
  {
    id: 'diy-helper',
    name: 'DIY Helper',
    icon: <Scissors className="w-5 h-5" />,
    description: 'Home improvement projects',
    prompt: 'Guide me through painting a room with professional techniques',
    category: 'home'
  },

  // Finance
  {
    id: 'budget-planner',
    name: 'Budget Planner',
    icon: <Wallet className="w-5 h-5" />,
    description: 'Financial planning',
    prompt: 'Help me create a monthly budget for a $5000 income with expenses breakdown',
    category: 'finance'
  },
  {
    id: 'savings-tracker',
    name: 'Savings Tracker',
    icon: <PiggyBank className="w-5 h-5" />,
    description: 'Track savings goals',
    prompt: 'Create a savings plan to save $10,000 in 12 months',
    category: 'finance'
  },
  {
    id: 'investment-analyzer',
    name: 'Investment Analyzer',
    icon: <TrendingUp className="w-5 h-5" />,
    description: 'Investment guidance',
    prompt: 'Explain different investment options for a beginner with $5,000 to invest',
    category: 'finance'
  },
  {
    id: 'debt-payoff',
    name: 'Debt Payoff Planner',
    icon: <CreditCard className="w-5 h-5" />,
    description: 'Debt reduction strategies',
    prompt: 'Create a debt snowball plan for paying off $15,000 in credit card debt',
    category: 'finance'
  },
  {
    id: 'tax-helper',
    name: 'Tax Helper',
    icon: <Receipt className="w-5 h-5" />,
    description: 'Tax preparation guide',
    prompt: 'What deductions can I claim as a freelance graphic designer?',
    category: 'finance'
  },

  // Creativity
  {
    id: 'writing-helper',
    name: 'Writing Helper',
    icon: <Edit3 className="w-5 h-5" />,
    description: 'Writing assistance',
    prompt: 'Help me write a compelling email to my team about the new project',
    category: 'creativity'
  },
  {
    id: 'idea-generator',
    name: 'Idea Generator',
    icon: <Lightbulb className="w-5 h-5" />,
    description: 'Creative ideas',
    prompt: 'Generate 10 creative ideas for a weekend project',
    category: 'creativity'
  },
  {
    id: 'content-creator',
    name: 'Content Creator',
    icon: <FileText className="w-5 h-5" />,
    description: 'Content ideas',
    prompt: 'Suggest 5 engaging topics for a technology blog',
    category: 'creativity'
  },
  {
    id: 'design-helper',
    name: 'Design Helper',
    icon: <Palette className="w-5 h-5" />,
    description: 'Design inspiration',
    prompt: 'Provide color palette suggestions for a modern website design',
    category: 'creativity'
  },
  {
    id: 'storyteller',
    name: 'Storyteller',
    icon: <BookOpen className="w-5 h-5" />,
    description: 'Story ideas',
    prompt: 'Help me develop a plot for a short science fiction story',
    category: 'creativity'
  },

  // Technology
  {
    id: 'tech-helper',
    name: 'Tech Helper',
    icon: <Cpu className="w-5 h-5" />,
    description: 'Tech support',
    prompt: 'Troubleshoot why my computer is running slowly and suggest fixes',
    category: 'technology'
  },
  {
    id: 'code-assistant',
    name: 'Code Assistant',
    icon: <Code className="w-5 h-5" />,
    description: 'Programming help',
    prompt: 'Help me debug this JavaScript function that is not working correctly',
    category: 'technology'
  },
  {
    id: 'app-ideas',
    name: 'App Ideas',
    icon: <Smartphone className="w-5 h-5" />,
    description: 'App concepts',
    prompt: 'Suggest 5 innovative mobile app ideas that solve everyday problems',
    category: 'technology'
  },
  {
    id: 'gadget-guide',
    name: 'Gadget Guide',
    icon: <Watch className="w-5 h-5" />,
    description: 'Tech recommendations',
    prompt: 'What are the best laptops for graphic design under $1500?',
    category: 'technology'
  },
  {
    id: 'privacy-checker',
    name: 'Privacy Checker',
    icon: <Lock className="w-5 h-5" />,
    description: 'Online security',
    prompt: 'What are the essential privacy settings I should enable on my smartphone?',
    category: 'technology'
  },

  // Education
  {
    id: 'study-planner',
    name: 'Study Planner',
    icon: <BookOpen className="w-5 h-5" />,
    description: 'Study schedules',
    prompt: 'Create a study plan for preparing for a biology exam in 3 weeks',
    category: 'education'
  },
  {
    id: 'learning-path',
    name: 'Learning Path',
    icon: <GraduationCap className="w-5 h-5" />,
    description: 'Skill development',
    prompt: 'Design a 6-month learning path to become proficient in web development',
    category: 'education'
  },
  {
    id: 'research-helper',
    name: 'Research Helper',
    icon: <Search className="w-5 h-5" />,
    description: 'Research assistance',
    prompt: 'Help me outline the key points for a research paper on climate change',
    category: 'education'
  },
  {
    id: 'language-tutor',
    name: 'Language Tutor',
    icon: <Languages className="w-5 h-5" />,
    description: 'Language learning',
    prompt: 'Create a daily 15-minute Spanish practice routine for beginners',
    category: 'education'
  },
  {
    id: 'career-advisor',
    name: 'Career Advisor',
    icon: <Briefcase className="w-5 h-5" />,
    description: 'Career guidance',
    prompt: 'What skills should I develop to transition into a data science career?',
    category: 'education'
  },

  // Travel
  {
    id: 'trip-planner',
    name: 'Trip Planner',
    icon: <MapPin className="w-5 h-5" />,
    description: 'Travel itineraries',
    prompt: 'Create a 5-day itinerary for a trip to Paris including major attractions',
    category: 'travel'
  },
  {
    id: 'packing-helper',
    name: 'Packing Helper',
    icon: <Luggage className="w-5 h-5" />,
    description: 'Packing lists',
    prompt: 'What should I pack for a week-long beach vacation in Hawaii?',
    category: 'travel'
  },
  {
    id: 'culture-guide',
    name: 'Culture Guide',
    icon: <Globe className="w-5 h-5" />,
    description: 'Cultural information',
    prompt: 'What are the cultural customs I should know before visiting Japan?',
    category: 'travel'
  },
  {
    id: 'budget-travel',
    name: 'Budget Travel',
    icon: <Wallet className="w-5 h-5" />,
    description: 'Cost-saving tips',
    prompt: 'How can I travel to Europe for two weeks on a $2000 budget?',
    category: 'travel'
  },
  {
    id: 'local-experiences',
    name: 'Local Experiences',
    icon: <Compass className="w-5 h-5" />,
    description: 'Authentic experiences',
    prompt: 'Suggest unique local experiences in Barcelona that tourists often miss',
    category: 'travel'
  },

  // Entertainment
  {
    id: 'movie-recommender',
    name: 'Movie Recommender',
    icon: <Film className="w-5 h-5" />,
    description: 'Film suggestions',
    prompt: 'Recommend 5 critically acclaimed movies from the past year that I might enjoy',
    category: 'entertainment'
  },
  {
    id: 'book-suggester',
    name: 'Book Suggester',
    icon: <BookOpen className="w-5 h-5" />,
    description: 'Reading recommendations',
    prompt: 'Suggest 3 novels similar to "The Alchemist" by Paulo Coelho',
    category: 'entertainment'
  },
  {
    id: 'game-finder',
    name: 'Game Finder',
    icon: <Music className="w-5 h-5" />,
    description: 'Game recommendations',
    prompt: 'What are the best cooperative video games to play with friends online?',
    category: 'entertainment'
  },
  {
    id: 'music-discovery',
    name: 'Music Discovery',
    icon: <Music className="w-5 h-5" />,
    description: 'Music suggestions',
    prompt: 'Recommend artists similar to Tame Impala for someone who enjoys psychedelic rock',
    category: 'entertainment'
  },
  {
    id: 'party-planner',
    name: 'Party Planner',
    icon: <Gift className="w-5 h-5" />,
    description: 'Event planning',
    prompt: 'Help me plan a memorable birthday party for a 10-year-old with a science theme',
    category: 'entertainment'
  }
];

// Quick actions for daily life
const quickActions: QuickAction[] = [
  {
    id: 'morning-routine',
    title: 'Morning Routine',
    prompt: 'Suggest an optimal morning routine for productivity and health',
    icon: <Sun className="w-4 h-4" />,
    category: 'Wellness'
  },
  {
    id: 'evening-wind-down',
    title: 'Evening Wind Down',
    prompt: 'Recommend an evening routine for better sleep and relaxation',
    icon: <Moon className="w-4 h-4" />,
    category: 'Wellness'
  },
  {
    id: 'quick-workout',
    title: '15-min Workout',
    prompt: 'Design a 15-minute full body workout I can do at home',
    icon: <Heart className="w-4 h-4" />,
    category: 'Fitness'
  },
  {
    id: 'healthy-snacks',
    title: 'Healthy Snacks',
    prompt: 'Suggest 5 healthy snack ideas that are easy to prepare',
    icon: <ChefHat className="w-4 h-4" />,
    category: 'Nutrition'
  },
  {
    id: 'budget-template',
    title: 'Budget Template',
    prompt: 'Create a simple monthly budget template for personal finance',
    icon: <TrendingUp className="w-4 h-4" />,
    category: 'Finance'
  },
  {
    id: 'shopping-list',
    title: 'Smart Shopping List',
    prompt: 'Generate a categorized shopping list for healthy eating',
    icon: <ShoppingCart className="w-4 h-4" />,
    category: 'Shopping'
  }
];

const TopBar: React.FC<TopBarProps> = ({ onMenuClick, onToggleTools, showTools }) => {
  return (
    <div className="border-b border-gray-700">
      <div className="max-w-6xl mx-auto">
        <div className="lg:hidden flex items-center justify-between mb-3 p-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-600 hover:text-white hover:bg-gray-700"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Logo />
          <div className="flex space-x-2">
            <button
              onClick={onToggleTools}
              className={`p-2 rounded-md transition-colors ${showTools ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              title="Daily Tools"
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700">
              <Users className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  model,
  onRegenerate,
  onCopy,
  isReading = false,
  onReadAloud,
  onStopReading,
  onBookmark,
  onShare,
  onExport
}) => {
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
            <div key={index} className="bg-gray-700 rounded-lg p-4 border-1 border-gray-600 hover:border-blue-600 transition-colors relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                  <span className="text-sm font-medium text-orange-400">{response.model}</span>
                  {response.loading && <Loader2 className="w-3 h-3 animate-spin text-blue-400" />}
                </div>

                {!response.loading && !response.error && (
                  <div className="absolute -bottom-5 right-0 bg-gray-800 rounded-lg py-1 px-2 shadow-lg flex space-x-1">
                    <div className='flex flex-row gap-2'>
                      <button
                        onClick={() => onCopy?.(response.content)}
                        className="p-1 text-gray-400 hover:text-white rounded cursor-pointer"
                        title="Copy"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      {onReadAloud && (
                        <button
                          onClick={() => isReading ? onStopReading?.() : onReadAloud(response.content)}
                          className="p-1 text-gray-400 hover:text-white rounded cursor-pointer"
                          title={isReading ? "Stop reading" : "Read aloud"}
                        >
                          {isReading ? <VolumeX className="w-3 h-3 text-blue-600" /> : <Volume2 className="w-3 h-3" />}
                        </button>
                      )}
                      {onBookmark && (
                        <button
                          onClick={() => onBookmark(message.id)}
                          className="p-1 text-gray-400 hover:text-yellow-400 rounded cursor-pointer"
                          title="Bookmark"
                        >
                          {message.bookmarked ? <BookmarkCheck className="w-3 h-3 text-yellow-400" /> : <Bookmark className="w-3 h-3" />}
                        </button>
                      )}
                      {onShare && (
                        <button
                          onClick={() => onShare(response.content)}
                          className="p-1 text-gray-400 hover:text-blue-400 rounded cursor-pointer"
                          title="Share"
                        >
                          <Share className="w-3 h-3" />
                        </button>
                      )}
                    </div>
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
                    <p className="text-gray-100 text-sm whitespace-pre-wrap break-all">
                      <ReactMarkdown children={response.content} />
                    </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (message.model === model) {
    return (
      <div className={`flex items-start space-x-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4 group`}>
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
          </div>

          {message.role === 'user' && (
            <div className="absolute -bottom-5 right-0 bg-gray-800 rounded-lg p-1 shadow-lg flex space-x-1">
              <button
                onClick={() => onCopy?.(message.content)}
                className="p-1 text-gray-400 hover:text-white rounded cursor-pointer"
                title="Copy"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
          )}

          {message.role === 'assistant' && (
            <div className="absolute -bottom-5 right-0 bg-gray-800 rounded-lg p-1 shadow-lg flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onCopy?.(message.content)}
                className="p-1 text-gray-400 hover:text-white rounded cursor-pointer"
                title="Copy"
              >
                <Copy className="w-3 h-3" />
              </button>
              {onReadAloud && (
                <button
                  onClick={() => isReading ? onStopReading?.() : onReadAloud(message.content)}
                  className="p-1 text-gray-400 hover:text-white rounded cursor-pointer"
                  title={isReading ? "Stop reading" : "Read aloud"}
                >
                  {isReading ? <VolumeX className="w-3 h-3 text-blue-600" /> : <Volume2 className="w-3 h-3" />}
                </button>
              )}
              {onBookmark && (
                <button
                  onClick={() => onBookmark(message.id)}
                  className="p-1 text-gray-400 hover:text-yellow-400 rounded cursor-pointer"
                  title="Bookmark"
                >
                  {message.bookmarked ? <BookmarkCheck className="w-3 h-3 text-yellow-400" /> : <Bookmark className="w-3 h-3" />}
                </button>
              )}
              {onShare && (
                <button
                  onClick={() => onShare(message.content)}
                  className="p-1 text-gray-400 hover:text-blue-400 rounded cursor-pointer"
                  title="Share"
                >
                  <Share className="w-3 h-3" />
                </button>
              )}
              {onExport && (
                <div className="relative group">
                  <button
                    className="p-1 text-gray-400 hover:text-green-400 rounded cursor-pointer"
                    title="Export"
                  >
                    <Download className="w-3 h-3" />
                  </button>
                  <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 rounded-lg p-2 shadow-lg z-10">
                    <button
                      onClick={() => onExport(message.content, 'text')}
                      className="block w-full text-left px-3 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded"
                    >
                      📝 Text
                    </button>
                    <button
                      onClick={() => onExport(message.content, 'pdf')}
                      className="block w-full text-left px-3 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded"
                    >
                      📄 PDF
                    </button>
                  </div>
                </div>
              )}
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
  onRateResponse,
  readingMessageId,
  onReadAloud,
  onStopReading,
  onBookmarkMessage,
  onShareMessage,
  onExportMessage,
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
        {selectedModels.map((model, index) => {
          if (model.enabled && model.isExpend && model.selected) {
            return (
              <div
                key={model.id}
                className={`flex flex-col flex-auto h-full transition-all duration-300 min-w-full sm:min-w-0 
                    ${index < selectedModels.length - 1 ? "border-r border-gray-700" : ""}`}
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
                      isReading={message.id === readingMessageId}
                      onReadAloud={(content) => onReadAloud(message.id, content)}
                      onStopReading={onStopReading}
                      onBookmark={onBookmarkMessage}
                      onShare={onShareMessage}
                      onExport={onExportMessage}
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
        {selectedModels.map((model) => {
          if (model.enabled && !model.isExpend && !model.selected) {
            return (
              <div
                key={model.id}
                className="flex flex-col md:flex-col h-full min-w-0 border-r border-gray-700 last:border-r-0 w-12 md:w-20 flex-none"
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
            return null;
          }
        })}
        {selectedModels.map((model) => {
          if (!model.enabled) {
            return (
              <div
                key={model.id}
                className="flex flex-col md:flex-col h-full min-w-0 border-r border-gray-700 last:border-r-0 w-12 md:w-20 flex-none"
              >
                <div className="sticky top-0 bg-gray-800 py-2 px-3 opacity-10 flex flex-col items-center justify-between h-full z-10">
                  <span className="font-medium text-xs text-center mb-2">{model.name}</span>
                  <div className="text-center p-1">
                    <h1 className="text-sm font-bold text-gray-300 uppercase break-all">
                      Coming Soon
                    </h1>
                    <p className="text-gray-400 text-sm">
                      We're working on something amazing. Stay tuned!
                    </p>
                  </div>
                  <div className='flex flex-col items-center gap-3'>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={model.selected}
                        disabled
                        onChange={() => onToggleModelActive(model.id)}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer ${model.selected ? 'peer-checked:bg-blue-600' : ''} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}>
                      </div>
                    </label>
                    <button
                      disabled
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
            return null;
          }
        })}
      </div>
    </div>
  );
};

const InputArea: React.FC<InputAreaProps> = ({
  message,
  onMessageChange,
  onSendMessage,
  isLoading,
  selectedModels,
  suggestedQuestions,
  onUseExample,
  onQuickAction,
  showTools,
  onToggleTools
}) => {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [recentTools, setRecentTools] = useState<RecentTool[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load recent tools and favorites from localStorage
  useEffect(() => {
    const savedRecentTools = localStorage.getItem('recentTools');
    if (savedRecentTools) {
      try {
        const parsed = JSON.parse(savedRecentTools);
        setRecentTools(parsed.map((tool: any) => ({
          ...tool,
          timestamp: new Date(tool.timestamp)
        })));
      } catch (e) {
        console.error('Error loading recent tools:', e);
      }
    }

    const savedFavorites = localStorage.getItem('favoriteTools');
    if (savedFavorites) {
      try {
        setFavorites(new Set(JSON.parse(savedFavorites)));
      } catch (e) {
        console.error('Error loading favorites:', e);
      }
    }
  }, []);

  // Save recent tools and favorites to localStorage
  useEffect(() => {
    localStorage.setItem('recentTools', JSON.stringify(recentTools));
  }, [recentTools]);

  useEffect(() => {
    localStorage.setItem('favoriteTools', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

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
        onMessageChange(transcript);
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
    }
    return `Ask ${selectedModels.length} models anything...`;
  };

  const handleToolClick = (tool: DailyTool) => {
    onQuickAction(tool.prompt);

    // Add to recent tools
    const newRecentTool: RecentTool = {
      id: tool.id,
      name: tool.name,
      timestamp: new Date(),
      prompt: tool.prompt
    };

    setRecentTools(prev => {
      const filtered = prev.filter(t => t.id !== tool.id);
      return [newRecentTool, ...filtered].slice(0, 5); // Keep only 5 most recent
    });
  };

  const toggleFavorite = (toolId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(toolId)) {
      newFavorites.delete(toolId);
    } else {
      newFavorites.add(toolId);
    }
    setFavorites(newFavorites);
  };

  // Filter tools based on category and search
  const filteredTools = dailyTools.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group quick actions by category
  const groupedQuickActions = quickActions.reduce((groups, action) => {
    if (!groups[action.category]) {
      groups[action.category] = [];
    }
    groups[action.category].push(action);
    return groups;
  }, {} as Record<string, QuickAction[]>);

  return (
    <div className="border-t border-gray-700">
      {showTools && (
        <div className="fixed inset-0  bg-opacity-50 z-50 flex justify-center items-start pt-16">
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col border border-gray-700">
            <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/80">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Daily Life Tools
              </h3>
              <button
                onClick={onToggleTools}
                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-transparent">
              {/* Search and Categories */}
              <div className="mb-6">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700/70 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none backdrop-blur-sm"
                  />
                </div>

                <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                  {toolCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center space-x-2 flex-shrink-0 px-3 py-2 rounded-lg transition-colors backdrop-blur-sm ${activeCategory === category.id
                        ? `${category.color} text-white`
                        : 'bg-gray-700/70 text-gray-300 hover:bg-gray-600/80'
                        }`}
                    >
                      <span>{category.icon}</span>
                      <span className="text-sm">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Tools */}
              {recentTools.length > 0 && activeCategory === 'all' && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center">
                    <History className="w-4 h-4 mr-2" />
                    Recently Used
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {recentTools.map((tool) => {
                      const toolData = dailyTools.find(t => t.id === tool.id);
                      if (!toolData) return null;

                      return (
                        <button
                          key={tool.id}
                          onClick={() => handleToolClick(toolData)}
                          className="flex flex-col items-center p-3 bg-gray-700/70 rounded-lg hover:bg-gray-600/80 transition-colors relative group backdrop-blur-sm"
                          title={toolData.description}
                        >
                          <button
                            onClick={(e) => toggleFavorite(tool.id, e)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-yellow-400 z-10 backdrop-blur-sm rounded"
                          >
                            <Star className={`w-4 h-4 ${favorites.has(tool.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          </button>
                          <div className="text-blue-400 mb-2">{toolData.icon}</div>
                          <span className="text-xs text-white font-medium text-center">{toolData.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Favorite Tools */}
              {favorites.size > 0 && activeCategory === 'all' && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center">
                    <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
                    Favorite Tools
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {Array.from(favorites).map((toolId) => {
                      const tool = dailyTools.find(t => t.id === toolId);
                      if (!tool) return null;

                      return (
                        <button
                          key={tool.id}
                          onClick={() => handleToolClick(tool)}
                          className="flex flex-col items-center p-3 bg-gray-700/70 rounded-lg hover:bg-gray-600/80 transition-colors relative group backdrop-blur-sm"
                          title={tool.description}
                        >
                          <button
                            onClick={(e) => toggleFavorite(tool.id, e)}
                            className="absolute top-2 right-2 text-yellow-400 z-10 backdrop-blur-sm rounded"
                          >
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          </button>
                          <div className="text-blue-400 mb-2">{tool.icon}</div>
                          <span className="text-xs text-white font-medium text-center">{tool.name}</span>
                        </button>
                      );
                    })}
                  </div>
          </div>
              )}

              {/* Tools Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                {filteredTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleToolClick(tool)}
                    className="flex flex-col items-center p-3 bg-gray-700/70 rounded-lg hover:bg-gray-600/80 transition-colors relative group backdrop-blur-sm"
                    title={tool.description}
                  >
                    <button
                      onClick={(e) => toggleFavorite(tool.id, e)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-yellow-400 z-10 backdrop-blur-sm rounded"
                    >
                      <Star className={`w-4 h-4 ${favorites.has(tool.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    </button>
                    <div className="text-blue-400 mb-2">{tool.icon}</div>
                    <span className="text-xs text-white font-medium text-center">{tool.name}</span>
                    <span className="text-xs text-gray-300 mt-1 text-center">{tool.description}</span>
                  </button>
                ))}
              </div>

              {filteredTools.length === 0 && (
                <div className="text-center py-8 text-gray-300">
                  <Search className="w-12 h-12 mx-auto mb-4" />
                  <p>No tools found matching your search.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('all');
                    }}
                    className="text-blue-400 hover:text-blue-300 mt-2"
                  >
                    Clear search
                  </button>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-300 mb-3">Quick Actions</h4>

                {Object.entries(groupedQuickActions).map(([category, actions]) => (
                  <div key={category} className="mb-4">
                    <h5 className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">{category}</h5>
                    <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                      {actions.map((action) => (
                        <button
                          key={action.id}
                          onClick={() => onQuickAction(action.prompt)}
                          className="flex items-center space-x-2 flex-shrink-0 bg-gray-700/70 hover:bg-gray-600/80 text-xs text-gray-200 px-3 py-2 rounded-lg transition-colors backdrop-blur-sm"
                          title={action.prompt}
                        >
                          <span className="text-blue-400">{action.icon}</span>
                          <span>{action.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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


const ONE_HOUR = 60 * 60 * 1000;

const AI: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token') ?? "";
  const { user, logout } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [models, setModels] = useState<AIModel[]>(modelsComponent);
  const [collapsedModels, setCollapsedModels] = useState<string[]>([]);
  const [showTools, setShowTools] = useState(false);
  const [, setBookmarkedMessages] = useState<Set<string>>(new Set());

  const apiService = createApiClient(token);
  const selectedModels = models;
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleToggleModelActive = (modelId: string) => {
    setModels((prev) => {
      const selectedCount = prev.filter(m => m.enabled && m.selected).length;
      const expandedCount = prev.filter(m => m.enabled && m.isExpend).length;

      return prev.map((model) => {
        if (model.id === modelId) {
          const willBeSelected = !model.selected;
          if (willBeSelected && selectedCount >= 3) return model;
          if (!willBeSelected && selectedCount <= 1) return model;
          return {
            ...model,
            selected: willBeSelected,
            isExpend: willBeSelected
              ? expandedCount < 3
                ? true
                : model.isExpend
              : false,
          };
        }
        return model;
      });
    });
  };

  const handleToggleCollapse = (modelId: string, expand: boolean) => {
    setModels((prev) => {
      const expandedCount = prev.filter(m => m.enabled && m.isExpend).length;
      const selectedCount = prev.filter(m => m.enabled && m.selected).length;

      return prev.map((model) => {
        if (model.id === modelId) {
          if (expand) {
            if (expandedCount >= 3) return model;
            return {
              ...model,
              isExpend: true,
              selected: true,
            };
          } else {
            if (expandedCount <= 1 || selectedCount <= 1) return model;
            return {
              ...model,
              isExpend: false,
              selected: false,
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
            selected: true,
          };
        } else {
          return {
            ...model,
            isExpend: false,
            selected: false,
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
      const userMessage: Message[] = selectedModels.filter((model) => model.enabled && model.selected).map(model => ({
        id: multiResponseId,
        content: message,
        role: 'user' as 'user',
        model: model.id,
        timestamp: new Date(),
      })) ?? []

      setMessages(prev => {
        return [...prev, ...userMessage]
      });

      const multiResponseMessage: Message = {
        id: multiResponseId,
        content: '',
        role: 'assistant',
        timestamp: new Date(),
        isMultiResponse: true,
        responses: selectedModels.filter((model) => model.enabled && model.selected).map(model => ({
          model: model.id,
          content: '',
          loading: true,
        })),
      };

      setMessages(prev => [...prev, multiResponseMessage]);

      try {
        const responses = await apiService.sendQuery(currentMessage, selectedModels.filter((model) => model.enabled && model.selected).map((model) => model.id));
        setMessages(prev =>
          prev.map(msg => {
            if (msg.id === multiResponseId) {
              return {
                ...msg,
                responses: selectedModels.filter((model) => model.enabled && model.selected).map(model => {
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
            return msg;
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
    if (example === "Daily Life Tools") {
      setShowTools(true)
      return
    }
    setMessage(example);
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleEditMessage = (messageId: string, newContent: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, content: newContent } : msg
      )
    );
  };

  const handleRateResponse = (messageId: string, modelId: string, rating: boolean) => {
    console.log(`Rated message ${messageId} from model ${modelId} as ${rating ? 'good' : 'bad'}`);
  };

  const handleRegenerateResponse = async (messageId: string) => {
    const responseMessage = messages.find(m => m.id === messageId);
    if (!responseMessage || !responseMessage.isMultiResponse) return;

    const userMessageIndex = messages.findIndex(m => m.id === messageId) - 1;
    if (userMessageIndex < 0) return;

    const userMessage = messages[userMessageIndex];
    if (userMessage.role !== 'user') return;

    setIsLoading(true);

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
  const [readingMessageId, setReadingMessageId] = useState<string | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handleReadAloud = (messageId: string, content: string) => {
    handleStopReading();

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(content);
      speechSynthesisRef.current = utterance;

      utterance.onend = () => {
        setReadingMessageId(null);
        speechSynthesisRef.current = null;
      };

      utterance.onerror = () => {
        setReadingMessageId(null);
        speechSynthesisRef.current = null;
      };

      window.speechSynthesis.speak(utterance);
      setReadingMessageId(messageId);
    } else {
      alert("Text-to-speech is not supported in your browser");
    }
  };

  const handleStopReading = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setReadingMessageId(null);
      speechSynthesisRef.current = null;
    }
  };

  const handleBookmarkMessage = (messageId: string) => {
    setBookmarkedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });

    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, bookmarked: !msg.bookmarked } : msg
      )
    );
  };

  const handleShareMessage = (content: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'AI Response',
        text: content,
        url: window.location.href
      }).catch(() => {
        navigator.clipboard.writeText(content);
        alert('Content copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(content);
      alert('Content copied to clipboard!');
    }
  };

  const handleExportMessage = (content: string, format: string) => {
    if (format === 'text') {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ai-response.txt';
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      alert('PDF export would be implemented with a PDF generation library');
      // This would typically use a library like jsPDF
    }
  };

  const handleQuickAction = (prompt: string) => {
    setMessage(prompt);
    setShowTools(false);
  };

  useEffect(() => {
    const lastClosed = localStorage.getItem('lastDonationClosed');
    const now = Date.now();

    if (!lastClosed || now - parseInt(lastClosed, 10) > ONE_HOUR) {
      setShowDonation(true);
    }

    const timer = setInterval(() => {
      const lastClosed = localStorage.getItem('lastDonationClosed');
      const now = Date.now();

      if (!lastClosed || now - parseInt(lastClosed, 10) > ONE_HOUR) {
        setShowDonation(true);
      }
    }, ONE_HOUR);

    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      clearInterval(timer);
    };
  }, []);

  const handleClose = () => {
    setShowDonation(false);
    localStorage.setItem('lastDonationClosed', Date.now().toString());
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {showDonation && (
        <DonationPopup onClose={() => handleClose()} />
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
          {user && (
            <div className="mt-auto p-3 bg-gray-700 rounded-lg mx-4 mb-4">
              <div className="text-sm text-gray-300">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs">{user.email}</p>
              </div>
              <button
                onClick={async () => {
                  navigate('/');
                  await logout();
                  setIsOpen(false);
                }}
                className="mt-2 w-full px-3 py-1 bg-gradient-to-br from-[#7c5cff] to-[#00d1ff] text-[#0b0d10] text-xs rounded font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </>
      <div className="flex-1 flex flex-col min-w-0">
        <Routes>
          <Route path="/ai-app" element={<>
            <TopBar
              models={[]}
              onModelToggleSelect={handleToggleModelActive}
              onToggleModel={() => { }}
              onMenuClick={() => setIsOpen(true)}
              onToggleTools={() => setShowTools(!showTools)}
              showTools={showTools}
            />
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
              readingMessageId={readingMessageId || undefined}
              onReadAloud={handleReadAloud}
              onStopReading={handleStopReading}
              onBookmarkMessage={handleBookmarkMessage}
              onShareMessage={handleShareMessage}
              onExportMessage={handleExportMessage}
            />
            <InputArea
              message={message}
              onMessageChange={setMessage}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              selectedModels={selectedModels.filter((model) => model.enabled && model.selected)}
              onUseExample={handleUseExample}
              suggestedQuestions={exampleQuestions}
              onQuickAction={handleQuickAction}
              showTools={showTools}
              onToggleTools={() => setShowTools(!showTools)}
            />
          </>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default AI;