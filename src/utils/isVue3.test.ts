import { describe, expect, it } from 'vitest'
import type { App } from 'vue'
import { isVue3 } from './isVue3'

describe('Detects the correct Vue version', () => {
  it('detects Vue 3', () => {
    expect(isVue3({ config: { globalProperties: {} } } as App<unknown>)).toBe(true)
  })

  it('detects Vue 2', () => {
    expect(isVue3({} as App<unknown>)).toBe(false)
  })
})
