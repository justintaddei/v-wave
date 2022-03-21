import { triggerIsID } from '../../src/utils/triggerIsID'

test('markWaveBoundary', () => {
  expect(triggerIsID('auto')).toEqual(false)
  expect(triggerIsID(true)).toEqual(false)
  expect(triggerIsID(false)).toEqual(false)
  expect(triggerIsID('stringId')).toEqual(true)
})
