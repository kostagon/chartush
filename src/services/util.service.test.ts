import { describe, it, expect } from 'vitest'
import { makeId, getRandomInt, getUniqueColors } from './util.service'

describe('util.service', () => {
  describe('makeId', () => {
    it('should generate id with default length of 8', () => {
      const id = makeId()
      expect(id).toHaveLength(8)
    })

    it('should generate id with specified length', () => {
      const id = makeId(12)
      expect(id).toHaveLength(12)
    })

    it('should only contain alphanumeric characters', () => {
      const id = makeId(100)
      expect(id).toMatch(/^[A-Za-z0-9]+$/)
    })

    it('should generate unique ids', () => {
      const ids = new Set(Array.from({ length: 100 }, () => makeId()))
      expect(ids.size).toBe(100)
    })
  })

  describe('getRandomInt', () => {
    it('should return integer within range', () => {
      for (let i = 0; i < 100; i++) {
        const result = getRandomInt(5, 10)
        expect(result).toBeGreaterThanOrEqual(5)
        expect(result).toBeLessThanOrEqual(10)
        expect(Number.isInteger(result)).toBe(true)
      }
    })

    it('should return min when min equals max', () => {
      const result = getRandomInt(5, 5)
      expect(result).toBe(5)
    })
  })

  describe('getUniqueColors', () => {
    it('should return specified number of colors', () => {
      const colors = getUniqueColors(5)
      expect(colors).toHaveLength(5)
    })

    it('should return unique colors', () => {
      const colors = getUniqueColors(10)
      const uniqueColors = new Set(colors)
      expect(uniqueColors.size).toBe(10)
    })

    it('should return valid hex colors', () => {
      const colors = getUniqueColors(5)
      colors.forEach(color => {
        expect(color).toMatch(/^#[0-9a-fA-F]{6}$/)
      })
    })
  })
})
