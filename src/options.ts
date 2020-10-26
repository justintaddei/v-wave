interface IVWaveDirectiveOptions {
  /**
   * The `background-color` of the wave.
   *
   * @remarks
   * You can set this to `currentColor` to automatically use the text-color of the element.
   *
   * @default
   * 'currentColor'
   */
  color: string
  /**
   * The opacity of the wave when it first appears.
   *
   * @default
   * 0.2
   */
  initialOpacity: number
  /**
   * The opacity the wave should be when it has stopped moving.
   *
   * @default
   * 0.1
   */
  finalOpacity: number
  /**
   * The duration of the wave animation in seconds.
   *
   * @default
   * 0.4
   */
  duration: number
  /**
   * Any valid CSS `<timing-function>`
   *
   * @default
   * 'ease-out'
   */
  easing: string
  /**
   * The delay, in milliseconds, during which the animation will be canceled if the user moves their figure/pointer (e.g. while scrolling).
   *
   * @note
   * The wave will not appear until after the delay, meaning a delay greater than 100ms can make the site feel sluggish.
   *
   * @default
   * 75
   */
  cancellationPeriod: number
}

interface IVWavePluginOptions extends IVWaveDirectiveOptions {
  /**
   * Used to overwrite the directive's name.
   *
   * @remarks
   * This can be useful if you're migrating from another ripple plugin.
   *
   * @example
   * ```html
   * <!-- If you set `directive: 'ripple'` -->
   * <!-- You would use it like so:        -->
   * <button v-ripple>Click here</button>`
   * ```
   *
   * @default
   * 'wave'
   */
  directive: string
}

const DEFAULT_PLUGIN_OPTIONS: IVWavePluginOptions = {
  directive: 'wave',
  color: 'currentColor',
  initialOpacity: 0.2,
  finalOpacity: 0.1,
  duration: 0.4,
  easing: 'ease-out',
  cancellationPeriod: 75
}

export { DEFAULT_PLUGIN_OPTIONS, IVWavePluginOptions, IVWaveDirectiveOptions }
