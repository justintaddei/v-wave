import { expect, test } from 'vitest'
import type { IVWaveDirectiveOptions } from '../options'
import { createWaveElement } from './createWaveElement'

test('createWaveElement returns a <div>', () => {
  expect(createWaveElement(0, 0, 0, {} as IVWaveDirectiveOptions)).toMatchSnapshot()
})
