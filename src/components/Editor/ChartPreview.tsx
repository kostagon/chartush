import { useEffect, useRef } from 'react'
import { useChartStore } from '../../store/chartStore'
import { drawBarsChart } from '../Charts/BarsChart'
import { drawCirclesChart } from '../Charts/CirclesChart'
import { drawRectanglesChart } from '../Charts/RectanglesChart'
import { drawDonutChart } from '../Charts/DonutChart'

const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 400

export function ChartPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chart = useChartStore((state) => state.chart)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Apply background
    if (chart.style.backgroundColor !== 'transparent') {
      ctx.fillStyle = chart.style.backgroundColor
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }

    // Draw chart based on type
    switch (chart.type) {
      case 'bars':
        drawBarsChart(ctx, chart, CANVAS_WIDTH, CANVAS_HEIGHT)
        break
      case 'circles':
        drawCirclesChart(ctx, chart, CANVAS_WIDTH, CANVAS_HEIGHT)
        break
      case 'rectangles':
        drawRectanglesChart(ctx, chart, CANVAS_WIDTH, CANVAS_HEIGHT)
        break
      case 'donut':
        drawDonutChart(ctx, chart, CANVAS_WIDTH, CANVAS_HEIGHT)
        break
      default:
        drawBarsChart(ctx, chart, CANVAS_WIDTH, CANVAS_HEIGHT)
    }
  }, [chart])

  return (
    <div className="chart-preview">
      <h3>{chart.title}</h3>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
    </div>
  )
}
