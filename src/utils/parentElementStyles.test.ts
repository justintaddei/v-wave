import { describe, expect, test, vi } from 'vitest'
import { restoreParentElementStyles, saveParentElementStyles } from './parentElementStyles'

describe('parentElementStyles', () => {
  test('saveParentElementStyles', () => {
    const el = document.createElement('div')
    el.style.position = 'static'

    saveParentElementStyles(el, window.getComputedStyle(el))

    expect(el.style.position).toBe('relative')
    expect(el.dataset.originalPositionValue).toBe('static')
  })

  test('restoreParentElementStyles', () => {
    const el = document.createElement('div')
    el.style.position = 'relative'
    el.dataset.originalPositionValue = 'static'

    restoreParentElementStyles(el)

    expect(el.style.position).toBe('static')
    expect(el.dataset.originalPositionValue).toBe(undefined)
  })

  test.each`
    direction
    ${'top'}
    ${'left'}
    ${'right'}
    ${'bottom'}
  `('saveParentElementStyles warns when position is static and $direction is not auto', ({ direction }) => {
    const el = document.createElement('div')
    el.style.position = 'static'
    el.style[direction] = '10px'

    console.warn = vi.fn()

    saveParentElementStyles(el, window.getComputedStyle(el))

    expect(console.warn).toHaveBeenCalledWith(
      '[v-wave]:',
      el,
      `You're using a \`static\` positioned element with a non-auto value (10px) for \`${direction}\`.`,
      "It's position will be changed to relative while displaying the wave which might cause the element to visually jump."
    )
  })
})
