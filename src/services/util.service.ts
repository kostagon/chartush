const COLORS = [
  '#a8d5e5', '#7ec8e3', '#5ab4db', '#3d9dc9', '#2c87b5',
  '#f8b4b4', '#f28b82', '#e57373', '#ef5350', '#f44336',
  '#c5e1a5', '#aed581', '#9ccc65', '#8bc34a', '#7cb342',
  '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300',
  '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa'
]

const FONTS = [
  'Arial',
  'Verdana',
  'Georgia',
  'Times New Roman',
  'Courier New',
  'Trebuchet MS'
]

export function makeId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return id
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

export function getUniqueColors(count: number): string[] {
  const shuffled = [...COLORS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function getAvailableFonts(): string[] {
  return [...FONTS]
}

export function getDefaultColors(): string[] {
  return [...COLORS]
}
