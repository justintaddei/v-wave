import { beforeAll, describe, expect, test, vi } from 'vitest'
import type { App } from 'vue'
import { getHooks } from './hookKeys'

describe('hookKeys', () => {
  beforeAll(() => {
    vi.mock('./isVue3', () => ({
      isVue3: (vue: string) => vue === '3',
    }))
  })

  test('uses Vue 2 lifecycle hooks when in Vue 2 runtime', () => {
    expect(getHooks('2' as unknown as App<unknown>)).toEqual({
      mounted: 'inserted',
      updated: 'componentUpdated',
    })
    expect(getHooks('vue2')).toEqual({
      mounted: 'inserted',
      updated: 'componentUpdated',
    })
  })
  test('uses Vue 3 lifecycle hooks when in Vue 3 runtime', () => {
    expect(getHooks('3' as unknown as App<unknown>)).toEqual({
      mounted: 'mounted',
      updated: 'updated',
    })
    expect(getHooks('vue3')).toEqual({
      mounted: 'mounted',
      updated: 'updated',
    })
  })
})
