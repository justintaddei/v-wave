import { DEFAULT_PLUGIN_OPTIONS } from '../src/options'

test('has documented default options', () => {
  expect(DEFAULT_PLUGIN_OPTIONS).toMatchSnapshot()
})
