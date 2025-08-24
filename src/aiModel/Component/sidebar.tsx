import { Plus, Settings, Zap, X } from "lucide-react";
import { Logo } from "../../components/logo";
import type { SidebarProps } from "../../lib/type";
import { useMemo } from "react";
import { MAX_LIMITS } from "../../lib/config";

export const Sidebar: React.FC<SidebarProps & { messageCount: number; onNewChat: () => void; isOpen: boolean, setIsOpen: (val: boolean) => void }> = ({
  isOpen = false,
  messageCount,
  onNewChat,
  setIsOpen
}) => {
  return (
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
            onNewChat();
            setIsOpen(false);
          }} />
        </div>
        <ProjectsSection />
        <div className="flex-1"></div>
        <div className="p-4 border-t border-gray-700">
          <PlanInfo messageCount={messageCount} />
          <UpgradeButton />
          <SettingsButton />
        </div>
      </div>
    </>
  );
};

// UI Components (unchanged from your original code)
const NewChatButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-gray-700 hover:bg-gray-600 rounded-lg p-3 flex items-center justify-center space-x-2 transition-colors"
  >
    <Plus className="w-4 h-4" />
    <span>New Chat</span>
  </button>
);

const ProjectsSection: React.FC = () => (
  <div className="px-4 mb-4">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-sm font-medium text-gray-400">Projects</h2>
      <button className="w-5 h-5 rounded bg-gray-600 hover:bg-gray-500 flex items-center justify-center transition-colors">
        <Plus className="w-3 h-3" />
      </button>
    </div>
  </div>
);

const PlanInfo: React.FC<{ messageCount: number }> = ({ messageCount }) => {
    let messCount = useMemo(() => {
        if (messageCount <= MAX_LIMITS) {
            return messageCount
        } else {
            return MAX_LIMITS
        }
    }, [messageCount])
    return (
  <div className="bg-gray-700 rounded-lg p-3 mb-3">
    <h3 className="text-sm font-medium mb-1">Free Plan</h3>
            <p className="text-xs text-gray-400">{messCount} / {MAX_LIMITS} messages used</p>
    <div className="w-full bg-gray-600 rounded-full h-1.5 mt-2">
      <div
        className="bg-blue-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${(messCount / MAX_LIMITS) * 100}%` }}
      ></div>
    </div>
  </div>
);
}

const UpgradeButton: React.FC = () => (
  <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg p-2.5 flex items-center justify-center space-x-2 transition-all">
    <Zap className="w-4 h-4" />
    <span className="text-sm font-medium">Upgrade Plan</span>
  </button>
);

const SettingsButton: React.FC = () => (
  <button className="w-full mt-2 text-gray-400 hover:text-white flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors">
    <Settings className="w-4 h-4" />
    <span className="text-sm">Settings</span>
  </button>
);