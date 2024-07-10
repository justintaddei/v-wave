import { describe, expect, test } from 'vitest'
import type { IVWaveDirectiveOptions } from '../options'
import { createWaveElement } from './createWaveElement'

describe('createWaveElement', () => {
  test('returns a <div>', () => {
    const waveElement = createWaveElement({ x: 0, y: 0 }, 0, {} as IVWaveDirectiveOptions)

    expect(waveElement.tagName).toBe('DIV')
  })

  test('returns a <div> with the correct position', () => {
    const waveElement = createWaveElement({ x: 10, y: 20 }, 0, {} as IVWaveDirectiveOptions)

    expect(waveElement.style.top).toBe('20px')
    expect(waveElement.style.left).toBe('10px')
  })

  test('returns a <div> with the correct size', () => {
    const waveElement = createWaveElement({ x: 0, y: 0 }, 10, {} as IVWaveDirectiveOptions)

    expect(waveElement.style.width).toBe('10px')
    expect(waveElement.style.height).toBe('10px')
  })

  test('returns a <div> with the correct background color', () => {
    const waveElement = createWaveElement({ x: 0, y: 0 }, 0, { color: 'red' } as IVWaveDirectiveOptions)

    expect(waveElement.style.background).toBe('red')
  })

  test('returns a <div> with the correct border radius', () => {
    const waveElement = createWaveElement({ x: 0, y: 0 }, 0, { color: 'red' } as IVWaveDirectiveOptions)

    expect(waveElement.style.borderRadius).toBe('50%')
  })

  test('returns a <div> with the correct opacity', () => {
    const waveElement = createWaveElement({ x: 0, y: 0 }, 0, {
      initialOpacity: 0.5,
      finalOpacity: 0.5,
    } as IVWaveDirectiveOptions)

    expect(waveElement.style.opacity).toBe('0.5')
  })

  test('returns a <div> with the correct transform', () => {
    const waveElement = createWaveElement({ x: 0, y: 0 }, 0, {
      initialOpacity: 0.5,
      finalOpacity: 0.5,
    } as IVWaveDirectiveOptions)

    expect(waveElement.style.transform).toBe('translate(-50%,-50%) scale(0)')
  })

  test('returns a <div> with the correct transition', () => {
    const waveElement = createWaveElement({ x: 0, y: 0 }, 0, {
      duration: 1,
      easing: 'ease-in',
    } as IVWaveDirectiveOptions)

    expect(waveElement.style.transition).toBe('transform 1s ease-in, opacity 1s ease-in')
  })
})
