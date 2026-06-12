import { describe, expect, test } from 'vitest'
import { triggerIsController } from './triggerIsController'

const validController = {
  press: () => {},
  cancel: () => {},
  release: () => {},
}

describe('triggerIsController', () => {
  test('returns false for boolean true', () => {
    expect(triggerIsController(true)).toBe(false)
  })

  test('returns false for boolean false', () => {
    expect(triggerIsController(false)).toBe(false)
  })

  test('returns false for "auto"', () => {
    expect(triggerIsController('auto')).toBe(false)
  })

  test('returns false for a string ID', () => {
    expect(triggerIsController('my-trigger-id')).toBe(false)
  })

  test('returns true for a valid controller object', () => {
    expect(triggerIsController(validController)).toBe(true)
  })

  test('returns false when press is missing', () => {
    const { press: _press, ...rest } = validController
    expect(triggerIsController(rest as typeof validController)).toBe(false)
  })

  test('returns false when cancel is missing', () => {
    const { cancel: _cancel, ...rest } = validController
    expect(triggerIsController(rest as typeof validController)).toBe(false)
  })

  test('returns false when release is missing', () => {
    const { release: _release, ...rest } = validController
    expect(triggerIsController(rest as typeof validController)).toBe(false)
  })

  test('returns false when press is not a function', () => {
    expect(
      triggerIsController({ ...validController, press: 'not-a-function' } as unknown as typeof validController)
    ).toBe(false)
  })

  test('returns false when cancel is not a function', () => {
    expect(triggerIsController({ ...validController, cancel: 42 } as unknown as typeof validController)).toBe(false)
  })

  test('returns false when release is not a function', () => {
    expect(triggerIsController({ ...validController, release: null } as unknown as typeof validController)).toBe(false)
  })
})
