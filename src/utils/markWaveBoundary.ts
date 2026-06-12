import type { IVWaveDirectiveOptions } from '../options'
import { triggerIsID } from './triggerIsID'

export const markWaveBoundary = (el: HTMLElement, trigger: IVWaveDirectiveOptions['trigger']) => {
  el.dataset.vWaveBoundary = triggerIsID(trigger) ? trigger : 'true'
}
