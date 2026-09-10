import { Section } from '@/components/layout/Section'
import { ModelPerformanceChart } from './ModelPerformanceChart'

export function DatavizShowcase() {
  return (
    <Section
      id="dataviz"
      title="Data Visualization"
      description="Interactive charts are part of the deliverable, not an afterthought. Toggle the views below."
      className="bg-slate-50 dark:bg-slate-900/40"
    >
      <div className="rounded-xl border border-slate-200 p-6 dark:border-slate-800">
        <ModelPerformanceChart />
      </div>
    </Section>
  )
}
