import { markWaveBoundary } from '../../src/utils/markWaveBoundary'

describe('markWaveBoundary', () => {
  test('sets dataset to true when trigger is not an id', () => {
    const div = document.createElement('div')
    markWaveBoundary(div, 'auto')
    expect(div).toMatchSnapshot()
  })
  test('sets dataset to the id when the trigger is an id', () => {
    const div = document.createElement('div')
    markWaveBoundary(div, 'stringId')
    expect(div).toMatchSnapshot()
  })
})
