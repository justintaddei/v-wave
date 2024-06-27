import { expect, test } from 'vitest'
import { createContainer } from './createContainerElement'

test('createContainerElement returns a an element based on `tagName`', () => {
  expect(createContainer({} as CSSStyleDeclaration, 'div')).toMatchSnapshot()
  expect(createContainer({} as CSSStyleDeclaration, 'span')).toMatchSnapshot()
})
