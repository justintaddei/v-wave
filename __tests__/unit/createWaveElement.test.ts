import { createWaveElement } from '../../src/utils/createWaveElement'
import { IVWaveDirectiveOptions } from '../../src/options'

test('createWaveElement returns a <div>', () => {
  expect(createWaveElement(0, 0, 0, {} as IVWaveDirectiveOptions)).toBeInstanceOf(HTMLDivElement)
})
