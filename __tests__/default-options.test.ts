import { DEFAULT_PLUGIN_OPTIONS } from '../src/options'

test('has documented default options', () => {
  expect(DEFAULT_PLUGIN_OPTIONS).toEqual({
    directive: 'wave',
    color: 'currentColor',
    initialOpacity: 0.2,
    finalOpacity: 0.1,
    duration: 0.4,
    easing: 'ease-out',
    cancellationPeriod: 75
  })
})
