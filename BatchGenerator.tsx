import { useState } from 'react';
import { Sparkles, Layers, Search, BookOpen } from 'lucide-react';
import Generator from './components/Generator';
import BatchGenerator from './components/BatchGenerator';
import Validator from './components/Validator';
import { cn } from './utils/cn';

type Tab = 'generator' | 'batch' | 'validator';

const TABS: { id: Tab; label: string; icon: React.ReactNode; color: string }[] = [
  {
    id: 'generator',
    label: 'Generator',
    icon: <Sparkles className="w-4 h-4" />,
    color: 'indigo',
  },
  {
    id: 'batch',
    label: 'Batch',
    icon: <Layers className="w-4 h-4" />,
    color: 'violet',
  },
  {
    id: 'validator',
    label: 'Validator',
    icon: <Search className="w-4 h-4" />,
    color: 'emerald',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('generator');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                <span className="text-white font-bold text-sm font-mono">U</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-tight">UUID Toolkit</h1>
                <p className="text-xs text-slate-400 -mt-0.5">Generate, validate & decode</p>
              </div>
            </div>
            <a
              href="https://www.rfc-editor.org/rfc/rfc4122"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              RFC 4122
            </a>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <nav className="flex gap-1 bg-slate-100 rounded-xl p-1 max-w-md mx-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              )}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {activeTab === 'generator' && <Generator />}
        {activeTab === 'batch' && <BatchGenerator />}
        {activeTab === 'validator' && <Validator />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>UUID Toolkit — Generate and validate UUIDs v1, v4, and v7</p>
            <p>All UUIDs are generated locally in your browser. Nothing is stored.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
