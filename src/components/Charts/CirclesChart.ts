import type { Chart } from '../../types'
import { calculatePercents } from '../../services/chart.service'

const PADDING = 40
const LABEL_HEIGHT = 40

export function drawCirclesChart(
  ctx: CanvasRenderingContext2D,
  chart: Chart,
  width: number,
  height: number
): void {
  const { terms, valueType } = chart

  if (terms.length === 0) return

  const percents = calculatePercents(terms)
  const maxValue = Math.max(...terms.map((t) => t.value), 1)

  // Calculate available space
  const chartWidth = width - PADDING * 2
  const chartHeight = height - PADDING * 2 - LABEL_HEIGHT

  // Calculate maximum radius that fits all circles
  const maxRadius = Math.min(
    chartHeight / 2,
    chartWidth / (terms.length * 2)
  )

  // Calculate positions - distribute circles evenly
  const spacing = chartWidth / terms.length
  const centerY = PADDING + chartHeight / 2

  terms.forEach((term, index) => {
    // Area-based scaling: radius proportional to sqrt(value)
    const scaleFactor = Math.sqrt(term.value / maxValue)
    const radius = maxRadius * scaleFactor

    const centerX = PADDING + spacing * index + spacing / 2

    // Draw circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fillStyle = term.color
    ctx.fill()

    // Draw value inside circle if big enough
    if (radius > 20) {
      ctx.fillStyle = getContrastColor(term.color)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = 'bold 14px Arial'
      const displayValue = valueType === 'percent' ? `${percents[index]}%` : term.value.toString()
      ctx.fillText(displayValue, centerX, centerY)
    }

    // Draw label below
    ctx.fillStyle = '#333'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.font = '12px Arial'
    ctx.fillText(term.label, centerX, PADDING + chartHeight + 8)
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
