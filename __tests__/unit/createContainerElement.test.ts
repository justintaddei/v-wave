import { createContainer } from '../../src/utils/createContainerElement'

test('createContainerElement returns a <div>', () => {
  expect(createContainer({} as CSSStyleDeclaration)).toMatchSnapshot()
})
