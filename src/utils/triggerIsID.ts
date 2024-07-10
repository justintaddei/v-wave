export const triggerIsID = (trigger: string | boolean): trigger is string /* and not 'auto' */ =>
  typeof trigger === 'string' && trigger !== 'auto'
