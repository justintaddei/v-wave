const setVue3 = (isVue3: boolean) => {
  jest.resetModules()
  jest.mock('@/utils/isVue3', () => ({
    isVue3
  }))
}

describe('hookKeys', () => {
  test('uses Vue 3 lifecycle hooks when in Vue 3 runtime', () => {
    setVue3(false)
    const { hooks } = require('../../src/utils/hookKeys')

    expect(hooks).toEqual({
      mounted: 'inserted',
      updated: 'componentUpdated'
    })
  })
  test('uses Vue 3 lifecycle hooks when in Vue 3 runtime', () => {
    setVue3(true)
    const { hooks } = require('../../src/utils/hookKeys')

    expect(hooks).toEqual({
      mounted: 'mounted',
      updated: 'updated'
    })
  })
})
