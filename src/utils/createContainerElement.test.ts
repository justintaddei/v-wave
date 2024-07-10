import { describe, expect, test } from 'vitest'
import { createContainer } from './createContainerElement'

describe('createContainerElement', () => {
  test('returns an element based on `tagName`', () => {
    expect(createContainer({} as CSSStyleDeclaration, 'div').tagName).toBe('DIV')
    expect(createContainer({} as CSSStyleDeclaration, 'span').tagName).toBe('SPAN')
  })

  test('returns an element with the correct border radius', () => {
    const container = createContainer(
      {
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '20px',
        borderBottomLeftRadius: '30px',
        borderBottomRightRadius: '40px',
      } as CSSStyleDeclaration,
      'div'
    )

    expect(container.style.borderRadius).toBe('10px 20px 40px 30px')
  })
})
