describe('hookKeys', () => {
  beforeAll(() => {
    jest.resetModules()
    jest.mock('@/utils/isVue3', () => ({
      isVue3: (vue: string) => vue === '3'
    }))
  })

  test('uses Vue 2 lifecycle hooks when in Vue 2 runtime', () => {
    const { getHooks } = require('../../src/utils/hookKeys')

    expect(getHooks('2')).toEqual({
      mounted: 'inserted',
      updated: 'componentUpdated'
    })
    expect(getHooks('vue2')).toEqual({
      mounted: 'inserted',
      updated: 'componentUpdated'
    })
  })
  test('uses Vue 3 lifecycle hooks when in Vue 3 runtime', () => {
    const { getHooks } = require('../../src/utils/hookKeys')

    expect(getHooks('3')).toEqual({
      mounted: 'mounted',
      updated: 'updated'
    })
    expect(getHooks('vue3')).toEqual({
      mounted: 'mounted',
      updated: 'updated'
    })
  })
})
