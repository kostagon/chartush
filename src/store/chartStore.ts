import { create } from 'zustand'
import type { Chart, ChartType, ChartStyle, ChartTerm } from '../types'
import { getEmptyChart } from '../services/chart.service'
import { getUniqueColors } from '../services/util.service'

interface ChartState {
  chart: Chart
  setChart: (chart: Chart) => void
  updateTitle: (title: string) => void
  updateType: (type: ChartType) => void
  updateValueType: (valueType: 'value' | 'percent') => void
  addTerm: () => void
  updateTerm: (index: number, term: Partial<ChartTerm>) => void
  removeTerm: (index: number) => void
  updateStyle: (style: Partial<ChartStyle>) => void
  resetChart: () => void
}

export const useChartStore = create<ChartState>((set) => ({
  chart: getEmptyChart(),

  setChart: (chart) => set({ chart }),

  updateTitle: (title) => set((state) => ({
    chart: { ...state.chart, title, updatedAt: Date.now() }
  })),

  updateType: (type) => set((state) => ({
    chart: { ...state.chart, type, updatedAt: Date.now() }
  })),

  updateValueType: (valueType) => set((state) => ({
    chart: { ...state.chart, valueType, updatedAt: Date.now() }
  })),

  addTerm: () => set((state) => {
    const [color] = getUniqueColors(1)
    const newTerm: ChartTerm = {
      label: `Item ${state.chart.terms.length + 1}`,
      value: 10,
      color
    }
    return {
      chart: {
        ...state.chart,
        terms: [...state.chart.terms, newTerm],
        updatedAt: Date.now()
      }
    }
  }),

  updateTerm: (index, term) => set((state) => {
    const terms = [...state.chart.terms]
    terms[index] = { ...terms[index], ...term }
    return {
      chart: { ...state.chart, terms, updatedAt: Date.now() }
    }
  }),

  removeTerm: (index) => set((state) => ({
    chart: {
      ...state.chart,
      terms: state.chart.terms.filter((_, i) => i !== index),
      updatedAt: Date.now()
    }
  })),

  updateStyle: (style) => set((state) => ({
    chart: {
      ...state.chart,
      style: { ...state.chart.style, ...style },
      updatedAt: Date.now()
    }
  })),

  resetChart: () => set({ chart: getEmptyChart() })
}))
