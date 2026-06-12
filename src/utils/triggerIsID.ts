import type { IVWaveDirectiveOptions } from '../options'

export const triggerIsID = (trigger: IVWaveDirectiveOptions['trigger']): trigger is string /* and not 'auto' */ =>
  typeof trigger === 'string' && trigger !== 'auto'
