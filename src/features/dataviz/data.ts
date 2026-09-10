// Sample data for the visualization showcase. Swap in real experiment output.

export type EpochPoint = { epoch: number; trainLoss: number; valLoss: number }

export const learningCurve: EpochPoint[] = Array.from({ length: 20 }, (_, i) => {
  const epoch = i + 1
  const trainLoss = Number((1.8 * Math.exp(-epoch / 6) + 0.12).toFixed(3))
  const valLoss = Number(
    (1.8 * Math.exp(-epoch / 7) + 0.2 + (epoch > 12 ? (epoch - 12) * 0.01 : 0)).toFixed(3),
  )
  return { epoch, trainLoss, valLoss }
})

export type RocPoint = { fpr: number; tpr: number }

export const rocCurve: RocPoint[] = Array.from({ length: 21 }, (_, i) => {
  const fpr = Number((i / 20).toFixed(2))
  const tpr = Number(Math.min(1, Math.pow(fpr, 0.35)).toFixed(3))
  return { fpr, tpr }
})

export const rocAuc = 0.89
