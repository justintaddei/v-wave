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
  easing: 'ease-out'
}

export { DEFAULT_PLUGIN_OPTIONS, IVWavePluginOptions, IVWaveDirectiveOptions }
