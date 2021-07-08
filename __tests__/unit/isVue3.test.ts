const mockVueVersion = (version: string) => {
  jest.resetModules()
  jest.mock('vue', () => ({
    version
  }))
}

describe('Detects the correct Vue version', () => {
  it('detects Vue 3', () => {
    mockVueVersion('3.0.5')
    const { isVue3 } = require('../../src/utils/isVue3')
    expect(isVue3({ config: { globalProperties: {} } })).toBe(true)
  })

  it('detects Vue 2', () => {
    mockVueVersion('2.6.12')
    const { isVue3 } = require('../../src/utils/isVue3')
    expect(isVue3({})).toBe(false)
  })
})
