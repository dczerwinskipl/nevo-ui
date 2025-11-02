import React, { useState } from "react";
import { useTheme, raisedStyle, Tokens } from "../theme";
import {
  LayoutGrid,
  Package,
  ShoppingCart,
  User,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

// TODO: TASK-020 - Move sections array outside component to prevent recreation on each render

// Extracted constants - no recreation on each render
const NAVIGATION_SECTIONS: NavigationItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <LayoutGrid className="w-4 h-4" />,
  },
  {
    key: "products",
    label: "Produkty",
    icon: <Package className="w-4 h-4" />,
    children: [
      { key: "products", label: "Lista" },
      { key: "product-edit", label: "Edycja" },
    ],
  },
  {
    key: "order",
    label: "Zamówienia",
    icon: <ShoppingCart className="w-4 h-4" />,
    children: [{ key: "order", label: "Szczegóły" }],
  },
  { key: "users", label: "Użytkownicy", icon: <User className="w-4 h-4" /> },
] as const;

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
  route: string;
  onNavigate: (key: string) => void;
  open?: boolean;
  onClose?: () => void;
}

export interface NavListProps {
  tokens: Tokens;
  sections: NavigationItem[];
  route: string;
  onNavigate: (key: string) => void;
  openMap: Record<string, boolean>;
  setOpenMap: (openMap: Record<string, boolean>) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  route,
  onNavigate,
  open,
  onClose,
}) => {
  const sections = NAVIGATION_SECTIONS;
  const { tokens } = useTheme();
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({
    products: true,
    order: true,
  });

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={onClose}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute inset-y-0 left-0 w-72 max-w-[85vw] overflow-hidden"
            style={{
              background: tokens.card,
              borderRight: `1px solid ${tokens.border}`,
              boxShadow: tokens.shadow.lg,
              color: tokens.text,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 h-full overflow-y-auto">
              <NavList
                tokens={tokens}
                sections={sections}
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
        className="hidden md:flex w-64 flex-col h-full"
        style={{
          background: tokens.card,
          borderRight: `1px solid ${tokens.border}`,
          color: tokens.text,
        }}
      >
        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
          <NavList
            tokens={tokens}
            sections={sections}
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
  sections,
  route,
  onNavigate,
  openMap,
  setOpenMap,
}: NavListProps) {
  return (
    <nav className="space-y-2">
      {sections.map((s: NavigationItem) => {
        const hasChildren = !!s.children;
        const isActive = route === s.key;
        const isChildActive =
          hasChildren &&
          s.children!.some((c: NavigationChild) => c.key === route);

        return (
          <div key={s.key}>
            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
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
                    ? tokens.shadow.md
                    : tokens.shadow.sm,
              }}
              onClick={() =>
                hasChildren
                  ? setOpenMap({ ...openMap, [s.key]: !openMap[s.key] })
                  : onNavigate(s.key)
              }
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
                {s.children!.map((c: NavigationChild) => {
                  const subActive = route === c.key;
                  return (
                    <button
                      key={c.key}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        background: subActive
                          ? "rgba(109,106,255,.12)"
                          : "transparent",
                        color: subActive ? tokens.text : tokens.text,
                        border: `1px solid ${
                          subActive ? "rgba(109,106,255,.2)" : "transparent"
                        }`,
                        boxShadow: subActive ? tokens.shadow.sm : "none",
                      }}
                      onClick={() => onNavigate(c.key)}
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
    </nav>
  );
}
