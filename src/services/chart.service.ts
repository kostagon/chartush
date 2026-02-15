import type { Chart, ChartCreate, ChartType, ChartStyle, ChartTerm } from '../types/chart.types'
import { makeId, getUniqueColors } from './util.service'

export function createChart(data: ChartCreate): Chart {
  const now = Date.now()
  return {
    ...data,
    id: makeId(),
    createdAt: now,
    updatedAt: now
  }
}

export function getEmptyChart(): Chart {
  const colors = getUniqueColors(3)
  return createChart({
    type: 'bars',
    title: 'My Chart',
    style: getDefaultStyle(),
    valueType: 'value',
    terms: [
      { label: 'Item A', value: 40, color: colors[0] },
      { label: 'Item B', value: 30, color: colors[1] },
      { label: 'Item C', value: 30, color: colors[2] }
    ]
  })
}

export function getDefaultStyle(): ChartStyle {
  return {
    font: 'Arial',
    fontSize: '45px',
    backgroundColor: 'transparent'
  }
}

export function addTerm(chart: Chart, term: ChartTerm): Chart {
  return {
    ...chart,
    terms: [...chart.terms, term],
    updatedAt: Date.now()
  }
}

export function updateTerm(chart: Chart, index: number, term: Partial<ChartTerm>): Chart {
  const terms = [...chart.terms]
  terms[index] = { ...terms[index], ...term }
  return {
    ...chart,
    terms,
    updatedAt: Date.now()
  }
}

export function removeTerm(chart: Chart, index: number): Chart {
  return {
    ...chart,
    terms: chart.terms.filter((_, i) => i !== index),
    updatedAt: Date.now()
  }
}

export function updateChartType(chart: Chart, type: ChartType): Chart {
  return {
    ...chart,
    type,
    updatedAt: Date.now()
  }
}

export function updateChartTitle(chart: Chart, title: string): Chart {
  return {
    ...chart,
    title,
    updatedAt: Date.now()
  }
}

export function updateChartStyle(chart: Chart, style: Partial<ChartStyle>): Chart {
  return {
    ...chart,
    style: { ...chart.style, ...style },
    updatedAt: Date.now()
  }
}

export function calculatePercents(terms: ChartTerm[]): number[] {
  const total = terms.reduce((sum, term) => sum + term.value, 0)
  if (total === 0) return terms.map(() => 0)
  return terms.map(term => Math.round((term.value / total) * 100))
}
