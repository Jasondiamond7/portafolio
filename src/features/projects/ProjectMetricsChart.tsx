import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import type { ProjectMetric } from '@/content/types'

/** Normalize metric values to a 0-100 scale so ratios and percentages share an axis. */
function toPercent(metric: ProjectMetric): number {
  if (metric.unit === '%') return metric.value
  return metric.value <= 1 ? metric.value * 100 : metric.value
}

export function ProjectMetricsChart({ metrics }: { metrics: ProjectMetric[] }) {
  const data = metrics.map((metric) => ({
    ...metric,
    pct: toPercent(metric),
    labelText: `${metric.value}${metric.unit ?? ''}`,
  }))

  return (
    <div
      className="h-52 w-full"
      role="img"
      aria-label={`Bar chart of metrics: ${metrics
        .map((m) => `${m.label} ${m.value}${m.unit ?? ''}`)
        .join(', ')}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 32 }}>
          <CartesianGrid
            horizontal={false}
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-800"
          />
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis
            type="category"
            dataKey="label"
            width={140}
            tick={{ fill: 'currentColor', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Bar dataKey="pct" radius={4} maxBarSize={22}>
            {data.map((entry) => (
              <Cell key={entry.label} fill="var(--color-brand-500)" />
            ))}
            <LabelList
              dataKey="labelText"
              position="right"
              className="fill-slate-600 text-xs dark:fill-slate-300"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
