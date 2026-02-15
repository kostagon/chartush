import type { Chart } from '../../types'
import { calculatePercents } from '../../services/chart.service'

const LEGEND_HEIGHT = 80

export function drawDonutChart(
  ctx: CanvasRenderingContext2D,
  chart: Chart,
  width: number,
  height: number
): void {
  const { terms, valueType } = chart

  if (terms.length === 0) return

  const percents = calculatePercents(terms)
  const total = terms.reduce((sum, term) => sum + term.value, 0)

  // Calculate donut dimensions
  const chartHeight = height - LEGEND_HEIGHT
  const centerX = width / 2
  const centerY = chartHeight / 2
  const outerRadius = Math.min(centerX, centerY) - 20
  const innerRadius = outerRadius * 0.55

  // Draw donut segments
  let startAngle = -Math.PI / 2 // Start at top

  terms.forEach((term, index) => {
    const sliceAngle = (term.value / total) * Math.PI * 2
    const endAngle = startAngle + sliceAngle

    // Draw arc segment
    ctx.beginPath()
    ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle)
    ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true)
    ctx.closePath()
    ctx.fillStyle = term.color
    ctx.fill()

    // Draw percentage on slice if big enough
    if (sliceAngle > 0.3) {
      const midAngle = startAngle + sliceAngle / 2
      const labelRadius = (outerRadius + innerRadius) / 2
      const labelX = centerX + Math.cos(midAngle) * labelRadius
      const labelY = centerY + Math.sin(midAngle) * labelRadius

      ctx.fillStyle = getContrastColor(term.color)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = 'bold 12px Arial'
      ctx.fillText(`${percents[index]}%`, labelX, labelY)
    }

    startAngle = endAngle
  })

  // Draw center text
  ctx.fillStyle = '#333'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = 'bold 16px Arial'
  ctx.fillText('Total', centerX, centerY - 10)
  ctx.font = 'bold 24px Arial'
  ctx.fillText(total.toString(), centerX, centerY + 14)

  // Draw legend below
  drawLegend(ctx, terms, percents, valueType, width, chartHeight)
}

function drawLegend(
  ctx: CanvasRenderingContext2D,
  terms: Chart['terms'],
  percents: number[],
  valueType: Chart['valueType'],
  width: number,
  startY: number
): void {
  const legendY = startY + 20
  const itemWidth = width / terms.length
  const boxSize = 12

  terms.forEach((term, index) => {
    const x = itemWidth * index + itemWidth / 2

    // Draw color box
    ctx.fillStyle = term.color
    ctx.fillRect(x - 40, legendY, boxSize, boxSize)

    // Draw label
    ctx.fillStyle = '#333'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.font = '12px Arial'
    const displayValue = valueType === 'percent' ? `${percents[index]}%` : term.value.toString()
    ctx.fillText(`${term.label} (${displayValue})`, x - 24, legendY + boxSize / 2)
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
