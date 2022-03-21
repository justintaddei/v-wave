<p align="center">
<img src="https://raw.githubusercontent.com/justintaddei/v-wave/assets/logo-small.png">
</p>

<h2 align="center">v-wave</h2>

<p align="center">
The material-ripple directive for Vue that actually works
</p>

![Checks](https://github.com/justintaddei/v-wave/workflows/checks/badge.svg)
![Vue Support](https://img.shields.io/badge/vue-2%20&%203-1cb884.svg?style=flat)
[![Issues](https://img.shields.io/github/issues-raw/justintaddei/v-wave.svg?style=flat)](https://github.com/justintaddei/v-wave/issues)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/v-wave?color=%234c1&label=gzipped)
![NPM version](https://img.shields.io/npm/v/v-wave.svg?style=flat)
![Downloads per month](https://img.shields.io/npm/dm/v-wave.svg?style=flat)
![Total downloads](https://img.shields.io/npm/dt/v-wave.svg?style=flat&label=total+downloads)
![License](https://img.shields.io/npm/l/v-wave.svg?style=flat)
![Language](https://img.shields.io/badge/language-typescript-blue.svg?style=flat)

## Why did I make this?  <!-- omit in toc -->

Because every ripple-plugin I've tried to use in the past either didn't work, or was missing basic features.

<sub>Also available for React: [use-wave](https://github.com/justintaddei/use-wave)</sub>

**Here's what you can expect from this plugin:**

- It works ([see for yourself](https://justintaddei.github.io/v-wave)).
- The wave appears on `pointerdown` instead of `pointerup`  
  *(you might think that's an obvious choice... but you'd be wrong).*
- There is a small delay before the ripple appears, during which the animation will be canceled if the user moves the pointer (e.g. scrolling on a mobile phone). This is similar to how native Android ripples work.
- Uses CSS transforms instead of `width` and `height`.
- Doesn't effect the appearance of the element you apply it to (won't explode when used on an element with  `display: flex`).
- Guesses the color of the wave automatically by default (using `currentColor`).
- Works with fixed, absolute, relative, and statically positioned elements.
- Will handle independent border-radii (e.g. `border-radius: 5px 20px 15px 30px`) perfectly fine.

If you have a feature request or you found a bug, please open an issue!


## [[ Live Demo ]](https://justintaddei.github.io/v-wave)  <!-- omit in toc -->
> Source code for the demo page can be found on the [example branch.](https://github.com/justintaddei/v-wave/tree/example)

### Contents

- [Install](#install)
- [Register the plugin](#register-the-plugin)
- [Usage](#usage)
- [Options](#options)
  - [Setting options globally](#setting-options-globally)
  - [Setting options per-directive](#setting-options-per-directive)
  - [Summary](#summary)
  - [Details](#details)
    - [color](#color)
    - [initialOpacity](#initialopacity)
    - [finalOpacity](#finalopacity)
    - [duration](#duration)
    - [dissolveDuration](#dissolveduration)
    - [easing](#easing)
    - [cancellationPeriod](#cancellationperiod)
    - [trigger](#trigger)
    - [tagName](#tagname)
  - [Using triggers](#using-triggers)
  - [Disabling the directive](#disabling-the-directive)
- [Advanced](#advanced)
  - [Changing the directive's name](#changing-the-directives-name)
- [License](#license)

## Install

**npm**
```sh
$ npm i v-wave
```
or

**CDN**
```html
<script src="https://unpkg.com/v-wave"></script>
```

## Register the plugin

**Vue**
```js
// Vue 2

import Vue from 'vue'
import VWave from 'v-wave'

Vue.use(VWave)
```
```js
// Vue 3

import {createApp} from 'vue'
import VWave from 'v-wave'
import App from './App.vue'

createApp(App)
  .use(VWave)
  .mount('#app')
```

or

**Nuxt**

```js
// nuxt.config.js

export default {
    modules: ['v-wave/nuxt']
}
```

## Usage

```html
<button v-wave>Click me!</button>
```


## Options

### Setting options globally

**Vue**

```js
// main.js
. . .

.use(VWave, {
    color: 'red',
    initialOpacity: 0.5,
    easing: 'ease-in',
})
```

or

**Nuxt**

```js
// nuxt.config.js

export default {
    modules: ['v-wave/nuxt'],

    vWave: {
        color: 'red',
        initialOpacity: 0.5,
        easing: 'ease-in',
    }
}

```

### Setting options per-directive

```html
<button v-wave="{
    color: 'red',
    initialOpacity: 0.5,
    easing: 'ease-in',
}">
Click me!
</button>
```


### Summary
| Name                 | Type                          |     Default      |
| -------------------- | ----------------------------- | :--------------: |
| `color`              | `string`                      | `"currentColor"` |
| `initialOpacity`     | `number`                      |      `0.2`       |
| `finialOpacity`      | `number`                      |      `0.1`       |
| `duration`           | `number`                      |      `0.4`       |
| `dissolveDuration`   | `number`                      |      `0.15`      |
| `easing`             | `string`                      |    `ease-out`    |
| `cancellationPeriod` | `number`                      |       `75`       |
| `trigger`            | `string \| boolean \| "auto"` |     `"auto"`     |
| `tagName`            | `string`                      |     `"div"`      |



### Details

#### color  
- **type:** `string`  
- *default:* `"currentColor"`  
  
    The `background-color` of the wave.

#### initialOpacity  
- **type:** `number`  
- *default:* `0.2`  
  
    The opacity of the wave when it first appears.

#### finalOpacity  
- **type:** `number`  
- *default:* `0.1`  
  
    The opacity the wave should be when it has stopped moving.

#### duration  
- **type:** `number`  
- *default:* `0.4`  
  
    The duration of the wave animation in seconds.

#### dissolveDuration  
- **type:** `number`  
- *default:* `0.15`  
  
    The duration of the "dissolve animation" in seconds.  
    > This is the fade-out animation that plays once the wave has reached its maximum size.

#### easing  
- **type:** `string`  
- *default:* `"ease-out"`  
  
    Any valid CSS `<timing-function>`

#### cancellationPeriod  
- **type:** `number`  
- *default:* `75`  
  
    The delay, *in milliseconds*, during which the animation will be canceled by the user moving their figure/pointer (e.g. while scrolling on a mobile phone).

    > **Note:**  
    > The wave will not appear until after the delay, meaning a delay greater than 100ms can make the site feel sluggish.

#### trigger  
- **type:** `string | boolean | "auto"`  
- *default:* `"auto"`  

    Sets the behavior of the wave when used with triggers.
  
    - `false`  
        Disables the use of triggers. If a `v-wave-trigger` (without an ID) is present in the dom tree of this element, it will be ignored (i.e. `v-wave` always behaves as if there's no trigger).
    - `true`  
        Requires a trigger to activate the wave. `v-wave` assumes the presence of a `v-wave-trigger` (without an ID) in its dom tree. The wave will only active for `pointerdown` events on the trigger element.
    - `"auto"`  
        If a `v-wave-trigger` (without an ID) is present in the dom-tree of the v-wave element, it behaves as `trigger: true`, otherwise it behaves as `trigger: false`.
    - `string`  
        Any string other than `"auto"` will be treated as an ID. `v-wave` will only activate when a `v-wave-trigger` with a matching ID receives a `pointerdown` event.  

        > This is different from the other values as it allows you to place the trigger element anywhere in the dom, while the others require the trigger to be a descendant.

#### tagName  
- **type:** `string`  
- *default:* `"div"`  
  
    Sets the tag name of the element used as the wave container. This is is useful in scenarios where the default `div` may interfere with `:last-of-type` selectors.

---

### Using triggers

Triggers allow you to activate a wave on an element when, and only when, a different element receives input.


In the following example, the wave will only active for the label element when the user clicks or taps on the `<img/>`.

```html
<label v-wave>
    <span>Password</span>
    <input :type="showPassword ? 'text' : 'password'" />
    <img v-wave-trigger src="eye.svg" @click="() => showPassword = !showPassword" />
</label>
```

In this next example, clicking one of the buttons will active the wave on the other button.

```html
<button v-wave="{trigger: 'button2'}" v-wave-trigger:button1>Button 1</button>

<button v-wave="{trigger: 'button1'}" v-wave-trigger:button2>Button 2</button>
```

> Triggers that use an ID support many-to-many relationships. See the grid example on the [example page](https://justintaddei.github.io/v-wave).

### Disabling the directive

If you need to temporarily disable the wave effect, simply pass `false` to the directive.

> Note that v-wave checks for strict `false` equality (`=== false`).  
> Using any other *falsely* value will **not** disable the directive.  

```html
<button v-wave="false">Click me!</button>
```

## Advanced

### Changing the directive's name

If you are migrating from another ripple directive you can change the name of the directive v-wave uses if you want to avoid changing it in your source code.  
Simply pass a new name for the directive using the `directive` option:

```js
//main.js

import Vue from 'vue'
import VWave from 'v-wave'

Vue.use(VWave, {
    directive: 'ripple'
})
```

Now you can use the plugin like so:

```html
<button v-ripple>Click me!</button>
```

Keep in mind that this option can only be set globally (i.e. it cannot be set on individual directives).


## License

This project is distributed under the [MIT License](https://github.com/justintaddei/v-wave/blob/master/LICENSE.md).

### The MIT License (MIT)  <!-- omit in toc -->

Copyright (c) 2021 Justin Taddei

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
