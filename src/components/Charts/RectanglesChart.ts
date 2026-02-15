import type { Chart } from '../../types'
import { calculatePercents } from '../../services/chart.service'

const PADDING = 40
const GAP = 2

export function drawRectanglesChart(
  ctx: CanvasRenderingContext2D,
  chart: Chart,
  width: number,
  height: number
): void {
  const { terms, valueType } = chart

  if (terms.length === 0) return

  const percents = calculatePercents(terms)
  const total = terms.reduce((sum, term) => sum + term.value, 0)

  if (total === 0) return

  // Calculate dimensions
  const chartWidth = width - PADDING * 2
  const chartHeight = height - PADDING * 2
  const totalGaps = GAP * (terms.length - 1)
  const availableWidth = chartWidth - totalGaps

  let x = PADDING

  terms.forEach((term, index) => {
    const proportion = term.value / total
    const rectWidth = availableWidth * proportion
    const y = PADDING

    // Draw rectangle
    ctx.fillStyle = term.color
    ctx.fillRect(x, y, rectWidth, chartHeight)

    // Draw label and value centered in rectangle
    if (rectWidth > 30) {
      ctx.fillStyle = getContrastColor(term.color)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const centerX = x + rectWidth / 2
      const centerY = y + chartHeight / 2

      // Label
      ctx.font = 'bold 14px Arial'
      ctx.fillText(term.label, centerX, centerY - 12)

      // Value
      ctx.font = '12px Arial'
      const displayValue = valueType === 'percent' ? `${percents[index]}%` : term.value.toString()
      ctx.fillText(displayValue, centerX, centerY + 12)
    }

    x += rectWidth + GAP
  })
}

function getContrastColor(hexColor: string): string {
  const hex = hexColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? '#333333' : '#ffffff'
}
