import { triggerIsID } from './triggerIsID'

export const markWaveBoundary = (el: HTMLElement, trigger: string | boolean) => {
  el.dataset.vWaveBoundary = triggerIsID(trigger) ? trigger : 'true'
}
