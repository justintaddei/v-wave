import type { Vector } from './types'

/**
 * A controller object returned by `VWave.createTrigger()` that can be passed
 * as the `trigger` option. When a programmatic trigger is used, v-wave stops
 * listening for pointer events entirely. Use this if you need a wave to trigger
 * as the result of some other action, or an event other than `pointerdown`.
 *
 * Because `MouseEvent`s and `PointerEvent`s have `x` and `y` properties, you
 * can pass the event directly to `trigger.press()`.
 *
 * @remarks
 * You must call `createTrigger()` once per element. A single trigger cannot be
 * shared across multiple elements.
 *
 * @see [VWaveTrigger documentation](https://github.com/justintaddei/v-wave#programmatic-control)
 */
interface VWaveTrigger {
  /**
   * Starts the wave on the bound element.
   *
   * Optionally accepts an `{ x, y }` position. Because `MouseEvent` and
   * `PointerEvent` both expose `x` and `y` properties, you can pass the event
   * object directly. When omitted, the wave originates from the center of the
   * element.
   *
   * @see [press documentation](https://github.com/justintaddei/v-wave#programmatic-control)
   */
  press: (position?: Vector) => void
  /**
   * Cancels the wave immediately. This mirrors the internal behavior when the
   * user scrolls away (or otherwise triggers a `pointercancel` event) during
   * the cancellation period.
   *
   * @see [cancel documentation](https://github.com/justintaddei/v-wave#programmatic-control)
   */
  cancel: () => void
  /**
   * When `waitForRelease` is `true` this triggers
   * the dissolve animation.
   *
   * @see [release documentation](https://github.com/justintaddei/v-wave#programmatic-control)
   */
  release: () => void
}

interface IVWaveDirectiveOptions {
  /**
   * The `background-color` of the wave.
   *
   * @remarks
   * You can set this to `currentColor` to automatically use the text-color of the element.
   *
   * @default
   * 'currentColor'
   *
   * @see [color documentation](https://github.com/justintaddei/v-wave#color)
   */
  color: string
  /**
   * The opacity of the wave when it first appears.
   *
   * @default
   * 0.2
   *
   * @see [initialOpacity documentation](https://github.com/justintaddei/v-wave#initialopacity)
   */
  initialOpacity: number
  /**
   * The opacity the wave should be when it has stopped moving.
   *
   * @default
   * 0.1
   *
   * @see [finalOpacity documentation](https://github.com/justintaddei/v-wave#finalopacity)
   */
  finalOpacity: number
  /**
   * The duration of the wave animation in seconds.
   *
   * @default
   * 0.4
   *
   * @see [duration documentation](https://github.com/justintaddei/v-wave#duration)
   */
  duration: number
  /**
   * The duration of the "dissolve animation" in seconds.
   * This is the fade-out animation that plays once the wave has reached its maximum size.
   *
   * @default
   * 0.15
   *
   * @see [dissolveDuration documentation](https://github.com/justintaddei/v-wave#dissolveduration)
   */
  dissolveDuration: number
  /** When `true`, the wave will not dissolve until the user releases the pointer.
   *
   * @default
   * true
   *
   * @see [waitForRelease documentation](https://github.com/justintaddei/v-wave#waitforrelease)
   */
  waitForRelease: boolean
  /**
   * Any valid CSS `<timing-function>`
   *
   * @default
   * 'ease-out'
   *
   * @see [easing documentation](https://github.com/justintaddei/v-wave#easing)
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
   *
   * @see [cancellationPeriod documentation](https://github.com/justintaddei/v-wave#cancellationperiod)
   */
  cancellationPeriod: number

  /**
   * Sets the behavior of the wave when used with triggers.
   *
   * Possible values:
   * - `false`: disables the use of triggers.
   *   - if a `v-wave-trigger` (without an ID) is present in the dom tree of this element, it will be ignored (i.e. `v-wave` always behaves as if there's no trigger).
   * - `true`: requires a trigger to activate the wave.
   *   - `v-wave` assumes the presence of a `v-wave-trigger` (without an ID) in its dom tree. The wave will only active for `pointerdown` events on the trigger element.
   * - `"auto"`: if a `v-wave-trigger` (without an ID) is present in the dom-tree of the v-wave element, it behaves as `trigger: true`, otherwise it behaves as `trigger: false`.
   * - `string`: any string other than `"auto"` will be treated as an ID. `v-wave` will only activate when a `v-wave-trigger` with a matching ID receives a `pointerdown` event.
   * - `VWaveTrigger`: a controller object returned by `VWave.createTrigger()`. No pointer events are listened to; the wave is activated by calling `trigger.press()` directly. This is useful for programmatic or accessibility-driven interactions.
   *
   * @default
   * "auto"
   *
   * @see [trigger documentation](https://github.com/justintaddei/v-wave#trigger)
   */
  trigger: string | boolean | VWaveTrigger

  /**
   * Sets the tag name of the element used as the wave container. This is is useful in scenarios where the default `div` may interfere with `:last-of-type` selectors.
   *
   * @default
   * 'div'
   *
   * @see [tagName documentation](https://github.com/justintaddei/v-wave#tagname)
   */
  tagName: string

  /**
   * Disables the wave effect on the element.
   *
   * @default
   * false
   *
   * @see [disabled documentation](https://github.com/justintaddei/v-wave#disabled)
   */
  disabled: boolean

  /**
   * If `true`, the wave effect will be disabled if the html `disabled` attribute is present on the element.
   *
   * @example
   * ```html
   * <!-- The wave will not appear on this button -->
   * <button v-wave disabled>Click me!</button>
   * ```
   *
   * @default
   * true
   *
   * @see [respectDisabledAttribute documentation](https://github.com/justintaddei/v-wave#respectdisabledattribute)
   */
  respectDisabledAttribute: boolean

  /**
   * If `true`, the wave effect will be disabled if the user's `prefers-reduced-motion` preference is set to `reduce`.
   *
   * @default
   * true
   *
   * @see [respectPrefersReducedMotion documentation](https://github.com/justintaddei/v-wave#respectprefersreducedmotion)
   */
  respectPrefersReducedMotion: boolean

  /**
   * Prevents the pointerdown event from propagating to parent elements
   *
   * @default
   * false
   *
   * @see [stopPropagation documentation](https://github.com/justintaddei/v-wave#stoppropagation)
   */
  stopPropagation: boolean
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
   *
   * @see [directive documentation](https://github.com/justintaddei/v-wave#changing-the-directives-name)
   */
  directive: string
}

const DEFAULT_PLUGIN_OPTIONS: IVWavePluginOptions = {
  directive: 'wave',
  color: 'currentColor',
  initialOpacity: 0.2,
  finalOpacity: 0.1,
  duration: 0.4,
  dissolveDuration: 0.15,
  waitForRelease: true,
  easing: 'ease-out',
  cancellationPeriod: 75,
  trigger: 'auto',
  tagName: 'div',
  disabled: false,
  respectDisabledAttribute: true,
  respectPrefersReducedMotion: true,
  stopPropagation: false,
}

export { DEFAULT_PLUGIN_OPTIONS, type IVWaveDirectiveOptions, type IVWavePluginOptions, type VWaveTrigger }
