/**
 * Creates a container element for the wave.
 */
export const createContainer = (
  { borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius }: CSSStyleDeclaration,
  tagName: string
) => {
  const waveContainer = document.createElement(tagName)
  waveContainer.style.top = '0'
  waveContainer.style.left = '0'
  waveContainer.style.width = '100%'
  waveContainer.style.height = '100%'
  waveContainer.style.display = 'block'
  waveContainer.style.position = 'absolute'
  waveContainer.style.borderRadius = `${borderTopLeftRadius} ${borderTopRightRadius} ${borderBottomRightRadius} ${borderBottomLeftRadius}`
  waveContainer.style.overflow = 'hidden'
  waveContainer.style.pointerEvents = 'none'

  // Meet Safari, the new IE 💩
  waveContainer.style.webkitMaskImage = '-webkit-radial-gradient(white, black)'

  return waveContainer
}
