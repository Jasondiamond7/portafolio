import type { Project } from './types'

// TODO: replace with your real case studies. Keep the problem/approach/outcome
// structure — recruiters skim it fast.
export const projects: Project[] = [
  {
    slug: 'churn-prediction',
    title: 'Customer Churn Prediction',
    summary: 'Gradient-boosted model that flags at-risk subscribers a month ahead.',
    problem:
      'A subscription business was losing customers with no early warning, so retention offers arrived too late.',
    approach:
      'Built features from usage logs and billing history, trained LightGBM with time-based validation, ' +
      'and calibrated probabilities for the retention team.',
    outcome:
      'AUC 0.89 on a held-out month. Targeted campaigns on the top decile recovered an estimated 12% of would-be churners.',
    tags: ['LightGBM', 'Feature Engineering', 'Calibration', 'FastAPI'],
    metrics: [
      { label: 'ROC AUC', value: 0.89 },
      { label: 'Precision @ top 10%', value: 0.64 },
      { label: 'Recall @ top 10%', value: 0.41 },
    ],
    repoUrl: 'https://github.com/your-handle/churn-prediction',
    notebookUrl: 'https://nbviewer.org/github/your-handle/churn-prediction/blob/main/report.ipynb',
    featured: true,
    narrative: [
      // TODO: replace with the real case-study narrative.
      'TODO: describe the business context and why churn prediction mattered here.',
      'TODO: describe the modeling journey and the tradeoffs made along the way.',
    ],
    methodology: [
      {
        title: 'Data collection',
        detail: 'TODO: describe how usage and billing data were gathered.',
      },
      {
        title: 'Feature engineering',
        detail: 'TODO: describe the engineered features and rationale.',
      },
      { title: 'Validation', detail: 'TODO: describe the time-based validation strategy.' },
    ],
    technicalNotes: [
      'TODO: note the training infrastructure and runtime.',
      'TODO: note how probabilities were calibrated for the retention team.',
    ],
  },
  {
    slug: 'demand-forecasting',
    title: 'Retail Demand Forecasting',
    summary: 'Hierarchical forecasts for 400 SKUs across 30 stores.',
    problem:
      'Manual spreadsheet forecasts caused stockouts on fast movers and waste on perishables.',
    approach:
      'Compared classical (ETS, ARIMA) against LightGBM with lag/rolling features; reconciled ' +
      'store-level and chain-level forecasts.',
    outcome: 'Cut weighted MAPE from 34% to 19% versus the incumbent baseline.',
    tags: ['Time Series', 'LightGBM', 'Forecast Reconciliation'],
    metrics: [
      { label: 'Baseline MAPE', value: 34, unit: '%' },
      { label: 'Model MAPE', value: 19, unit: '%' },
    ],
    repoUrl: 'https://github.com/your-handle/demand-forecasting',
    featured: true,
    narrative: [
      'TODO: describe the business context and the cost of poor forecasts.',
      'TODO: describe the reconciliation approach across store and chain levels.',
    ],
    methodology: [
      { title: 'Baseline comparison', detail: 'TODO: describe the classical baselines evaluated.' },
      { title: 'Feature design', detail: 'TODO: describe the lag/rolling features used.' },
      {
        title: 'Reconciliation',
        detail: 'TODO: describe how forecasts were reconciled hierarchically.',
      },
    ],
    technicalNotes: [
      'TODO: note the forecasting cadence and retraining schedule.',
      'TODO: note how the 400 SKU x 30 store scale was handled computationally.',
    ],
  },
  {
    slug: 'support-ticket-triage',
    title: 'Support Ticket Triage (NLP)',
    summary: 'Transformer classifier that routes tickets to the right queue.',
    problem: 'Support tickets were routed by hand, adding hours of first-response delay.',
    approach:
      'Fine-tuned a compact transformer on labeled historical tickets; added a confidence ' +
      'threshold with human fallback for low-certainty cases.',
    outcome:
      'Auto-routed 71% of tickets with 94% routing accuracy; median first response down 3.2 hours.',
    tags: ['NLP', 'Transformers', 'Active Learning'],
    metrics: [
      { label: 'Coverage', value: 71, unit: '%' },
      { label: 'Routing accuracy', value: 94, unit: '%' },
    ],
    repoUrl: 'https://github.com/your-handle/ticket-triage',
    demoUrl: 'https://your-demo.example.com',
    featured: false,
    narrative: [
      'TODO: describe the business context and the delay caused by manual routing.',
      'TODO: describe the confidence-threshold fallback design.',
    ],
    methodology: [
      { title: 'Fine-tuning', detail: 'TODO: describe the transformer fine-tuning setup.' },
      {
        title: 'Confidence thresholding',
        detail: 'TODO: describe how the human fallback threshold was chosen.',
      },
    ],
    technicalNotes: [
      'TODO: note the serving latency and infrastructure.',
      'TODO: note how routing accuracy was measured in production.',
    ],
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
