import { triggerIsID } from './triggerIsID'

export const markWaveBoundary = (el: HTMLElement, trigger: any) => {
  el.dataset.vWaveBoundary = triggerIsID(trigger) ? (trigger as string) : 'true'
}
