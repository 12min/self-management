interface SidebarProps {
  onSelectView: (view: 'today' | 'week' | 'projects' | 'focus') => void;
  currentView: 'today' | 'week' | 'projects' | 'focus';
}

export function Sidebar({ onSelectView, currentView }: SidebarProps) {
  const menuItems = [
    { id: 'today' as const, label: 'Today', icon: '📅' },
    { id: 'week' as const, label: 'Week', icon: '📊' },
    { id: 'projects' as const, label: 'Projects', icon: '📁' },
    { id: 'focus' as const, label: 'Plano de Foco', icon: '🎯' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-border h-screen sticky top-0 flex flex-col">
      {/* Logo/Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-dark">Self Management</h1>
        <p className="text-xs text-gray mt-1">12min Dashboard</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelectView(item.id)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg flex items-center gap-3
                  transition-colors duration-200
                  ${
                    currentView === item.id
                      ? 'bg-blue-bg text-blue font-medium'
                      : 'text-gray hover:bg-gray-bg'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-gray text-center">
          <p>Q1 2026</p>
          <p className="mt-1">Week 6 of 7</p>
        </div>
      </div>
    </aside>
  );
}
