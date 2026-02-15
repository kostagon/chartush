import type { Chart } from '../types/chart.types'

const STORAGE_KEY = 'mister-charts-gallery'

export function saveChart(chart: Chart): void {
  const charts = loadCharts()
  const existingIndex = charts.findIndex(c => c.id === chart.id)
  
  if (existingIndex >= 0) {
    charts[existingIndex] = chart
  } else {
    charts.push(chart)
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(charts))
}

export function loadCharts(): Chart[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function loadChart(id: string): Chart | null {
  const charts = loadCharts()
  return charts.find(c => c.id === id) || null
}

export function deleteChart(id: string): void {
  const charts = loadCharts().filter(c => c.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(charts))
}

export function clearGallery(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function getChartCount(): number {
  return loadCharts().length
}
