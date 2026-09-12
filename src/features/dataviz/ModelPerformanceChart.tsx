import { useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { cn } from '@/lib/cn'
import { learningCurve, rocAuc, rocCurve } from './data'

type View = 'learning' | 'roc'

const tabs: { id: View; label: string }[] = [
  { id: 'learning', label: 'Learning curve' },
  { id: 'roc', label: 'ROC curve' },
]

export function ModelPerformanceChart() {
  const [view, setView] = useState<View>('learning')

  return (
    <div>
      <div role="tablist" aria-label="Chart view" className="mb-4 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={view === tab.id}
            onClick={() => setView(tab.id)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium',
              view === tab.id
                ? 'bg-primary text-white'
                : 'border border-border text-text-secondary',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {view === 'learning' ? (
            <LineChart data={learningCurve} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
              <CartesianGrid stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
              <XAxis
                dataKey="epoch"
                tick={{ fill: 'currentColor', fontSize: 12 }}
                label={{
                  value: 'Epoch',
                  position: 'insideBottom',
                  offset: -4,
                  fill: 'currentColor',
                }}
              />
              <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="trainLoss"
                name="Train loss"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="valLoss"
                name="Val loss"
                stroke="var(--color-accent)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          ) : (
            <LineChart data={rocCurve} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
              <CartesianGrid stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
              <XAxis
                dataKey="fpr"
                type="number"
                domain={[0, 1]}
                tick={{ fill: 'currentColor', fontSize: 12 }}
                label={{
                  value: 'False positive rate',
                  position: 'insideBottom',
                  offset: -4,
                  fill: 'currentColor',
                }}
              />
              <YAxis
                dataKey="tpr"
                type="number"
                domain={[0, 1]}
                tick={{ fill: 'currentColor', fontSize: 12 }}
              />
              <Tooltip />
              <ReferenceLine
                segment={[
                  { x: 0, y: 0 },
                  { x: 1, y: 1 },
                ]}
                stroke="currentColor"
                strokeDasharray="4 4"
                className="text-slate-400"
              />
              <Line
                type="monotone"
                dataKey="tpr"
                name={`ROC (AUC ${rocAuc})`}
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
