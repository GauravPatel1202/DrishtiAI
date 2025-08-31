import { Plus } from "lucide-react";
import { useMemo } from "react";
import { MAX_LIMITS } from "../../lib/config";

// UI Components (unchanged from your original code)
export const NewChatButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-gray-700 hover:bg-gray-600 rounded-lg p-3 flex items-center justify-center space-x-2 transition-colors"
  >
    <Plus className="w-4 h-4" />
    <span>New Chat</span>
  </button>
);

export const ProjectsSection: React.FC = () => (
  <div className="px-4 mb-4">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-sm font-medium text-gray-400">Projects</h2>
      <button className="w-5 h-5 rounded bg-gray-600 hover:bg-gray-500 flex items-center justify-center transition-colors">
        <Plus className="w-3 h-3" />
      </button>
    </div>
  </div>
);

export const PlanInfo: React.FC<{ messageCount: number }> = ({ messageCount }) => {
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

