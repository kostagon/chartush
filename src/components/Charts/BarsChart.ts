import type { Chart } from '../../types'
import { calculatePercents } from '../../services/chart.service'

const PADDING = 40
const BAR_GAP = 20
const LABEL_HEIGHT = 24

export function drawBarsChart(
  ctx: CanvasRenderingContext2D,
  chart: Chart,
  width: number,
  height: number
): void {
  const { terms, style, valueType } = chart

  if (terms.length === 0) return

  const percents = calculatePercents(terms)
  const maxValue = Math.max(...terms.map((t) => t.value), 1)

  // Calculate dimensions
  const chartWidth = width - PADDING * 2
  const chartHeight = height - PADDING * 2 - LABEL_HEIGHT
  const barWidth = (chartWidth - BAR_GAP * (terms.length - 1)) / terms.length

  // Set font
  ctx.font = `${style.fontSize} ${style.font}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'

  terms.forEach((term, index) => {
    const x = PADDING + index * (barWidth + BAR_GAP)
    const barHeight = (term.value / maxValue) * chartHeight
    const y = PADDING + chartHeight - barHeight

    // Draw bar
    ctx.fillStyle = term.color
    ctx.fillRect(x, y, barWidth, barHeight)

    // Draw value on top of bar
    ctx.fillStyle = '#333'
    ctx.font = '14px Arial'
    const displayValue = valueType === 'percent' ? `${percents[index]}%` : term.value.toString()
    ctx.fillText(displayValue, x + barWidth / 2, y - 20)

    // Draw label below bar
    ctx.fillStyle = '#333'
    ctx.font = '12px Arial'
    ctx.fillText(term.label, x + barWidth / 2, PADDING + chartHeight + 8)
  })
}
