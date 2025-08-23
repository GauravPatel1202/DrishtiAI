import { Menu } from "lucide-react";
import React from "react";

interface TopBarProps {
  models: { id: string; name: string; selected?: boolean }[];
  onModelToggleSelect: (ids: string[]) => void;
  onToggleSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  models,
  onModelToggleSelect,
  onToggleSidebar,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIds = Array.from(event.target.selectedOptions, (option) => option.value);
    onModelToggleSelect(selectedIds);
  };

  return (
    <div className="sticky top-0 z-40 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center p-4">
        {/* Sidebar toggle button (mobile only) */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden mr-3 p-1.5 rounded-lg hover:bg-white/10"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>

        {/* Multi-select box */}
        <select
          multiple
          aria-label="Select models"
          className="bg-black/40 text-white rounded-lg p-2 outline-none cursor-pointer min-w-[160px]"
          onChange={handleChange}
          value={models.filter((m) => m.selected).map((m) => m.id)}
        >
          {models.map((model) => (
            <option key={model.id} value={model.id} className="bg-black text-white">
              {model.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
