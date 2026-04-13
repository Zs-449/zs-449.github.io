import { useState } from 'react';
import { Copy, RefreshCw, Sparkles } from 'lucide-react';
import { generateUUID, type UUIDVersion } from '../utils/uuid';
import { useCopy } from '../hooks/useCopy';
import { cn } from '../utils/cn';

const VERSIONS: { value: UUIDVersion; label: string; description: string }[] = [
  { value: 'v1', label: 'Version 1', description: 'Time-based (timestamp + MAC address)' },
  { value: 'v4', label: 'Version 4', description: 'Random (cryptographically secure)' },
  { value: 'v7', label: 'Version 7', description: 'Time-ordered (Unix timestamp + random)' },
];

export default function Generator() {
  const [version, setVersion] = useState<UUIDVersion>('v4');
  const [uuid, setUuid] = useState<string>(() => generateUUID('v4'));
  const { copiedId, copy } = useCopy();

  const handleGenerate = () => {
    setUuid(generateUUID(version));
  };

  const handleCopy = () => {
    copy(uuid, 'main');
  };

  const currentVersionInfo = VERSIONS.find((v) => v.value === version);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Single UUID Generator
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Generate a UUID</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Choose a version and generate a unique identifier instantly.
        </p>
      </div>

      {/* Version Selector */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {VERSIONS.map((v) => (
          <button
            key={v.value}
            onClick={() => {
              setVersion(v.value);
              setUuid(generateUUID(v.value));
            }}
            className={cn(
              'group relative px-5 py-3 rounded-xl border-2 transition-all duration-200 text-left',
              version === v.value
                ? 'border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-100'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
            )}
          >
            <div className={cn(
              'font-semibold text-sm',
              version === v.value ? 'text-indigo-700' : 'text-slate-700'
            )}>
              {v.label}
            </div>
            <div className={cn(
              'text-xs mt-0.5',
              version === v.value ? 'text-indigo-500' : 'text-slate-400'
            )}>
              {v.description}
            </div>
          </button>
        ))}
      </div>

      {/* Generated UUID Display */}
      <div className="max-w-2xl mx-auto">
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl shadow-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              {currentVersionInfo?.label}
            </span>
            <span className="text-xs text-slate-500">
              36 characters
            </span>
          </div>
          <div className="font-mono text-xl sm:text-2xl text-white tracking-wider break-all leading-relaxed">
            {uuid}
          </div>
          <div className="flex gap-2 mt-5">
            <button
              onClick={handleCopy}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                copiedId === 'main'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              )}
            >
              <Copy className="w-4 h-4" />
              {copiedId === 'main' ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={handleGenerate}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-400 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Generate New
            </button>
          </div>
        </div>
      </div>

      {/* Color-coded UUID breakdown */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">UUID Structure</h3>
          <div className="flex flex-wrap items-center gap-1 font-mono text-lg">
            <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700" title="time_low (32 bits)">{uuid.split('-')[0]}</span>
            <span className="text-slate-300">-</span>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700" title="time_mid (16 bits)">{uuid.split('-')[1]}</span>
            <span className="text-slate-300">-</span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700" title="time_hi_and_version (16 bits)">{uuid.split('-')[2]}</span>
            <span className="text-slate-300">-</span>
            <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-700" title="clock_seq (16 bits)">{uuid.split('-')[3]}</span>
            <span className="text-slate-300">-</span>
            <span className="px-2 py-0.5 rounded bg-violet-100 text-violet-700" title="node (48 bits)">{uuid.split('-')[4]}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400"></span>time_low (8 hex)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span>time_mid (4 hex)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span>time_hi & version (4 hex)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-400"></span>clock_seq (4 hex)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-400"></span>node (12 hex)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
