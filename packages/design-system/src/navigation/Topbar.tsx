import React from 'react';
import { useTheme, raisedStyle } from '../theme';
import { LayoutGrid, Search, Sun, Moon, Bell, ChevronDown } from 'lucide-react';

export const Topbar: React.FC<{ onMenu?: () => void }> = ({ onMenu }) => {
  const { tokens, dark, setDark } = useTheme();
  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: tokens.card,
        borderBottom: `1px solid ${tokens.border}`,
        boxShadow: `0 1px 3px ${tokens.shadow.color}, 0 1px 2px ${tokens.shadow.color}`,
        color: tokens.text,
      }}
    >
      <div className="px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-3 min-h-[44px] min-w-[44px] rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center"
            style={raisedStyle(tokens)}
            onClick={onMenu}
            aria-label="Open menu"
          >
            <LayoutGrid className="w-5 h-5" style={{ color: tokens.text }} />
          </button>

          <div className="flex items-center gap-3">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md"
              style={{ background: tokens.primary.gradient }}
            >
              N
            </div>
            <div
              className="font-semibold text-lg"
              style={{ color: tokens.text }}
            >
              nEvo
            </div>
          </div>
        </div>

        {/* Center Search - Hidden on mobile */}
        <div className="flex-1 max-w-md mx-6 hidden lg:flex">
          <div
            className="flex items-center w-full rounded-xl px-4 py-2.5 gap-3 transition-all duration-200 hover:scale-[1.02]"
            style={raisedStyle(tokens)}
          >
            <Search className="w-4 h-4" style={{ color: tokens.muted }} />
            <input
              className="flex-1 bg-transparent outline-none text-sm"
              placeholder="Szukaj produktów, zamówień..."
              style={{ color: tokens.text }}
            />
            <kbd
              className="text-xs px-1.5 py-0.5 rounded border"
              style={{
                background: tokens.card,
                borderColor: tokens.border,
                color: tokens.muted,
              }}
            >
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search button for mobile */}
          <button
            className="lg:hidden p-3 min-h-[44px] min-w-[44px] rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center"
            style={raisedStyle(tokens)}
            aria-label="Szukaj"
          >
            <Search className="w-5 h-5" style={{ color: tokens.text }} />
          </button>

          <button
            className="p-3 min-h-[44px] min-w-[44px] rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center"
            style={raisedStyle(tokens)}
            aria-label="Powiadomienia"
          >
            <Bell className="w-5 h-5" style={{ color: tokens.text }} />
          </button>

          <button
            onClick={() => setDark(!dark)}
            className="p-3 min-h-[44px] min-w-[44px] rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center"
            style={raisedStyle(tokens)}
            aria-label="Przełącz motyw"
          >
            {dark ? (
              <Sun className="w-5 h-5" style={{ color: tokens.text }} />
            ) : (
              <Moon className="w-5 h-5" style={{ color: tokens.text }} />
            )}
          </button>

          {/* User Menu */}
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105"
            style={raisedStyle(tokens)}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-sm"
              style={{ background: tokens.primary.gradient }}
            >
              D
            </div>
            <div className="text-sm font-medium" style={{ color: tokens.text }}>
              Dominik
            </div>
            <ChevronDown className="w-4 h-4" style={{ color: tokens.muted }} />
          </div>
        </div>
      </div>
    </header>
  );
};
