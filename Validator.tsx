import { useState } from 'react';
import { Copy, Download, Layers, RefreshCw } from 'lucide-react';
import { generateBatch, type UUIDVersion } from '../utils/uuid';
import { useCopy } from '../hooks/useCopy';
import { cn } from '../utils/cn';

const VERSIONS: { value: UUIDVersion; label: string }[] = [
  { value: 'v1', label: 'Version 1' },
  { value: 'v4', label: 'Version 4' },
  { value: 'v7', label: 'Version 7' },
];

const COUNTS = [1, 5, 10, 25, 50, 100];

export default function BatchGenerator() {
  const [version, setVersion] = useState<UUIDVersion>('v4');
  const [count, setCount] = useState(10);
  const [uuids, setUuids] = useState<string[]>([]);
  const { copiedId, copy } = useCopy();

  const handleGenerate = () => {
    setUuids(generateBatch(version, count));
  };

  const handleCopyAll = () => {
    copy(uuids.join('\n'), 'batch-all');
  };

  const handleCopyOne = (uuid: string, index: number) => {
    copy(uuid, `batch-${index}`);
  };

  const handleDownload = () => {
    const blob = new Blob([uuids.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids-${version}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-600 text-sm font-medium">
          <Layers className="w-4 h-4" />
          Batch UUID Generator
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Generate Multiple UUIDs</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Generate up to 100 UUIDs at once. Copy individually or all at once.
        </p>
      </div>

      {/* Controls */}
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Version */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">UUID Version</label>
          <div className="flex gap-2">
            {VERSIONS.map((v) => (
              <button
                key={v.value}
                onClick={() => setVersion(v.value)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all border',
                  version === v.value
                    ? 'bg-violet-500 text-white border-violet-500 shadow-md shadow-violet-100'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">How many?</label>
          <div className="flex gap-2 flex-wrap">
            {COUNTS.map((c) => (
              <button
                key={c}
                onClick={() => setCount(c)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all border',
                  count === c
                    ? 'bg-violet-500 text-white border-violet-500 shadow-md shadow-violet-100'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                )}
              >
                {c}
              </button>
            ))}
            <div className="relative">
              <input
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-20 px-3 py-2 rounded-lg text-sm border border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-slate-700"
                placeholder="Custom"
              />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-semibold text-sm hover:from-violet-600 hover:to-indigo-600 transition-all shadow-lg shadow-violet-200 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Generate {count} UUID{count !== 1 ? 's' : ''}
        </button>
      </div>

      {/* Results */}
      {uuids.length > 0 && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
              <span className="text-sm font-medium text-slate-600">
                {uuids.length} UUID{uuids.length !== 1 ? 's' : ''} generated
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyAll}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                    copiedId === 'batch-all'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  )}
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedId === 'batch-all' ? 'Copied!' : 'Copy All'}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
              {uuids.map((uuid, index) => (
                <div
                  key={`${uuid}-${index}`}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 group transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs text-slate-400 font-mono w-6 text-right flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="font-mono text-sm text-slate-700 truncate">{uuid}</span>
                  </div>
                  <button
                    onClick={() => handleCopyOne(uuid, index)}
                    className={cn(
                      'flex-shrink-0 p-1.5 rounded-md transition-all opacity-0 group-hover:opacity-100',
                      copiedId === `batch-${index}`
                        ? 'bg-emerald-100 text-emerald-600 opacity-100'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    )}
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
