import React, { useState, useMemo } from "react";
import { useTheme, Tokens } from "../theme";
import { ChevronDown, ChevronRight } from "lucide-react";

export interface NavigationChild {
  key: string;
  label: string;
}

export interface NavigationItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: NavigationChild[];
}

export interface SidebarProps {
  navigation: NavigationItem[];
  bottomItems?: NavigationItem[];
  route: string;
  onNavigate: (key: string) => void;
  open?: boolean;
  onClose?: () => void;
}

export interface NavListProps {
  tokens: Tokens;
  navigation: NavigationItem[];
  bottomItems?: NavigationItem[];
  route: string;
  onNavigate: (key: string) => void;
  openMap: Record<string, boolean>;
  setOpenMap: (openMap: Record<string, boolean>) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  navigation,
  bottomItems = [],
  route,
  onNavigate,
  open,
  onClose,
}) => {
  const { tokens } = useTheme();

  // Auto-open sections that contain the active route
  const initialOpenMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    navigation.forEach((section) => {
      if (section.children) {
        const hasActiveChild = section.children.some(
          (child) => child.key === route
        );
        if (hasActiveChild) {
          map[section.key] = true;
        }
      }
    });
    return map;
  }, [navigation, route]);

  const [openMap, setOpenMap] =
    useState<Record<string, boolean>>(initialOpenMap);

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50 w-full h-full cursor-default border-none p-0"
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                onClose?.();
              }
            }}
            aria-label="Close navigation menu"
            tabIndex={0}
          />
          <div
            className="absolute inset-y-0 left-0 w-72 max-w-[85vw] flex flex-col"
            style={{
              background: tokens.gradients.card,
              borderRight: `1px solid ${tokens.border}`,
              boxShadow: `0 10px 30px ${tokens.shadow.color}, 0 6px 10px ${tokens.shadow.color}`,
              color: tokens.text,
            }}
          >
            <div className="flex-1 overflow-y-auto p-4">
              <NavList
                tokens={tokens}
                navigation={navigation}
                bottomItems={bottomItems}
                route={route}
                onNavigate={(k: string) => {
                  onNavigate(k);
                  onClose && onClose();
                }}
                openMap={openMap}
                setOpenMap={setOpenMap}
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex md:flex-col w-64 h-screen"
        style={{
          background: tokens.gradients.card,
          borderRight: `1px solid ${tokens.border}`,
          color: tokens.text,
        }}
      >
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <NavList
            tokens={tokens}
            navigation={navigation}
            bottomItems={bottomItems}
            route={route}
            onNavigate={onNavigate}
            openMap={openMap}
            setOpenMap={setOpenMap}
          />
        </div>
      </aside>
    </>
  );
};

function NavList({
  tokens,
  navigation,
  bottomItems = [],
  route,
  onNavigate,
  openMap,
  setOpenMap,
}: NavListProps) {
  return (
    <nav className="space-y-2">
      {navigation.map((s: NavigationItem) => {
        const hasChildren = !!s.children;
        const isActive = route === s.key;
        const isChildActive =
          hasChildren &&
          s.children?.some((c: NavigationChild) => c.key === route);

        return (
          <div key={s.key}>
            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 md:hover:scale-[1.02] touch-manipulation"
              style={{
                background:
                  isActive || isChildActive
                    ? "rgba(109,106,255,.15)"
                    : "transparent",
                color: isActive || isChildActive ? tokens.text : tokens.text,
                border: `1px solid ${
                  isActive || isChildActive
                    ? "rgba(109,106,255,.3)"
                    : tokens.border
                }`,
                boxShadow:
                  isActive || isChildActive
                    ? `0 4px 8px ${tokens.shadow.color}, 0 2px 4px ${tokens.shadow.color}`
                    : `0 1px 3px ${tokens.shadow.color}, 0 1px 2px ${tokens.shadow.color}`,
              }}
              onClick={() =>
                hasChildren
                  ? setOpenMap({ ...openMap, [s.key]: !openMap[s.key] })
                  : onNavigate(s.key)
              }
              onTouchStart={(e) => {
                // Prevent any potential touch conflicts
                e.stopPropagation();
              }}
            >
              <span className="opacity-80">{s.icon}</span>
              <span className="flex-1 text-left">{s.label}</span>
              {hasChildren && (
                <span className="opacity-60 transition-transform duration-200">
                  {openMap[s.key] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </span>
              )}
            </button>

            {hasChildren && openMap[s.key] && (
              <div
                className="mt-1 ml-6 pl-3 space-y-1 border-l"
                style={{ borderColor: tokens.border }}
              >
                {s.children?.map((c: NavigationChild) => {
                  const subActive = route === c.key;
                  return (
                    <button
                      key={c.key}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 md:hover:scale-[1.02] touch-manipulation"
                      style={{
                        background: subActive
                          ? "rgba(109,106,255,.12)"
                          : "transparent",
                        color: subActive ? tokens.text : tokens.text,
                        border: `1px solid ${
                          subActive ? "rgba(109,106,255,.2)" : "transparent"
                        }`,
                        boxShadow: subActive
                          ? `0 1px 3px ${tokens.shadow.color}, 0 1px 2px ${tokens.shadow.color}`
                          : "none",
                      }}
                      onClick={() => onNavigate(c.key)}
                      onTouchStart={(e) => {
                        // Prevent any potential touch conflicts
                        e.stopPropagation();
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: subActive
                            ? "rgba(109,106,255,.6)"
                            : "currentColor",
                          opacity: subActive ? 1 : 0.4,
                        }}
                      />
                      <span className="flex-1 text-left">{c.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Bottom Items */}
      {bottomItems && bottomItems.length > 0 && (
        <>
          <div
            className="my-4 border-t"
            style={{ borderColor: tokens.border }}
          />
          {bottomItems.map((item: NavigationItem) => {
            const isActive = route === item.key;
            return (
              <button
                key={item.key}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 md:hover:scale-[1.02] touch-manipulation"
                style={{
                  background: isActive
                    ? "rgba(109,106,255,.15)"
                    : "transparent",
                  color: isActive ? tokens.text : tokens.text,
                  border: `1px solid ${
                    isActive ? "rgba(109,106,255,.3)" : tokens.border
                  }`,
                  boxShadow: isActive
                    ? `0 4px 8px ${tokens.shadow.color}, 0 2px 4px ${tokens.shadow.color}`
                    : `0 1px 3px ${tokens.shadow.color}, 0 1px 2px ${tokens.shadow.color}`,
                }}
                onClick={() => onNavigate(item.key)}
                onTouchStart={(e) => {
                  e.stopPropagation();
                }}
              >
                {item.icon && (
                  <span className="flex-shrink-0">{item.icon}</span>
                )}
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            );
          })}
        </>
      )}
    </nav>
  );
}
