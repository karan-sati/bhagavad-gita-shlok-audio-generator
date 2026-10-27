import React from 'react';
import { Home, BookOpen, Layers, Flame, Compass } from 'lucide-react';

export type TabType = 'home' | 'shlokas' | 'chapters' | 'japa' | 'guidance';

interface BottomTabBarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { id: 'home' as TabType, label: 'Home', hindiLabel: 'मुखपृष्ठ', icon: Home },
    { id: 'shlokas' as TabType, label: 'Shlokas', hindiLabel: 'श्लोक', icon: BookOpen },
    { id: 'chapters' as TabType, label: 'Cantos', hindiLabel: 'अध्याय', icon: Layers },
    { id: 'japa' as TabType, label: '108 Mala', hindiLabel: 'माला', icon: Flame },
    { id: 'guidance' as TabType, label: 'Guidance', hindiLabel: 'मार्गदर्शन', icon: Compass },
  ];

  return (
    <nav className="w-full bg-[#080c14]/98 border-t border-slate-800/90 backdrop-blur-md px-1 py-1 z-30 select-none">
      <div className="grid grid-cols-5 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className="min-h-[52px] flex flex-col items-center justify-center py-1 transition-colors relative group"
            >
              <div className="relative">
                <Icon 
                  className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'text-amber-400 stroke-[2.2]' : 'text-slate-400'
                  }`} 
                />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
              </div>
              <span 
                className={`text-[10px] font-medium tracking-tight mt-1 transition-colors ${
                  isActive ? 'text-amber-300 font-bold' : 'text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
