import { describe, expect, test } from 'vitest'
import { decrementWaveCount, deleteWaveCount, getWaveCount, incrementWaveCount } from './wave-count'

const WAVE_COUNT = 'vWaveCountInternal'

describe('wave-count', () => {
  test('gets correct wave count from element', () => {
    const el = document.createElement('div')
    el.dataset[WAVE_COUNT] = '5'

    expect(getWaveCount(el)).toBe(5)
  })

  test('increments wave count', () => {
    const el = document.createElement('div')

    incrementWaveCount(el)

    expect(el.dataset[WAVE_COUNT]).toBe('1')

    incrementWaveCount(el)

    expect(el.dataset[WAVE_COUNT]).toBe('2')
  })

  test('decrements wave count', () => {
    const el = document.createElement('div')
    el.dataset[WAVE_COUNT] = '2'

    decrementWaveCount(el)

    expect(el.dataset[WAVE_COUNT]).toBe('1')

    decrementWaveCount(el)

    expect(el.dataset[WAVE_COUNT]).toBe('0')
  })

  test('removes wave count from element', () => {
    const el = document.createElement('div')
    el.dataset[WAVE_COUNT] = '5'

    deleteWaveCount(el)

    expect(typeof el.dataset[WAVE_COUNT]).toBe('undefined')
  })
})
