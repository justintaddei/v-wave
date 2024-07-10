import { expect, test } from 'vitest'
import { triggerIsID } from './triggerIsID'

test('triggerIsID', () => {
  expect(triggerIsID('auto')).toEqual(false)
  expect(triggerIsID(true)).toEqual(false)
  expect(triggerIsID(false)).toEqual(false)
  expect(triggerIsID('stringId')).toEqual(true)
})
