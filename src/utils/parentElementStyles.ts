export const saveParentElementStyles = (el: HTMLElement, computedStyles: CSSStyleDeclaration) => {
  if (computedStyles.position === 'static') {
    ;(['top', 'left', 'right', 'bottom'] as const).forEach((dir) => {
      if (computedStyles[dir] && computedStyles[dir] !== 'auto')
        console.warn(
          '[v-wave]:',
          el,
          `You're using a \`static\` positioned element with a non-auto value (${computedStyles[dir]}) for \`${dir}\`.`,
          "It's position will be changed to relative while displaying the wave which might cause the element to visually jump."
        )
    })

    el.dataset.originalPositionValue = el.style.position
    el.style.position = 'relative'
  }
}

export const restoreParentElementStyles = (el: HTMLElement) => {
  el.style.position = el.dataset.originalPositionValue ?? ''
  delete el.dataset.originalPositionValue
}
