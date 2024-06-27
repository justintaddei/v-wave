import { expect, test } from 'vitest'
import { DEFAULT_PLUGIN_OPTIONS } from './options'

test('has documented default options', () => {
  expect(DEFAULT_PLUGIN_OPTIONS).toMatchSnapshot()
})
