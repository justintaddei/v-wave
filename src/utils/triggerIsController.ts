import type { IVWaveDirectiveOptions, VWaveTrigger } from '../options'
import type { Vector } from '../types'

export const triggerIsController = (
  trigger: IVWaveDirectiveOptions['trigger']
): trigger is VWaveTrigger & {
  _set_press: (cb: (position?: Vector) => void) => void
  _set_cancel: (cb: () => void) => void
  _set_release: (cb: () => void) => void
} => {
  return (
    trigger !== null &&
    typeof trigger === 'object' &&
    typeof trigger.press === 'function' &&
    typeof trigger.cancel === 'function' &&
    typeof trigger.release === 'function'
  )
}
