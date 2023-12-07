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
![NPM version](https://img.shields.io/npm/v/v-wave.svg?style=flat)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/v-wave?color=%234c1&label=gzipped)
![Downloads per month](https://img.shields.io/npm/dm/v-wave.svg?style=flat)
![Total downloads](https://img.shields.io/npm/dt/v-wave.svg?style=flat&label=total+downloads)
![License](https://img.shields.io/npm/l/v-wave.svg?style=flat)
![Language](https://img.shields.io/badge/language-typescript-blue.svg?style=flat)

<sub>Also available for React: [use-wave](https://github.com/justintaddei/use-wave)</sub>

<details>
    <summary><h3 style="display:inline;">Why did I make this?</h3></summary>

<br />Because every ripple plugin I've tried to use in the past either didn't work or was missing basic features. 

**Here's what you can expect from this plugin:**

- It works ([see for yourself](https://justintaddei.github.io/v-wave)).
- The wave appears on `pointerdown` instead of `pointerup`  
  *(you might think that's an obvious choice... but you'd be wrong).*
- There is a small delay before the ripple appears, during which the animation will be canceled if the user moves the pointer (e.g. scrolling on a mobile phone). This is similar to how native Android ripples work.
- Uses CSS transforms instead of `width` and `height`.
- Doesn't affect the appearance of the element you apply it to (won't explode when used on an element with `display: flex`).
- Guesses the color of the wave automatically by default (using `currentColor`).
- Works with fixed, absolute, relative, and statically positioned elements.
- Will handle independent border-radii (e.g. `border-radius: 5px 20px 15px 30px`) perfectly fine.

</details>

## [[ Live Demo ]](https://justintaddei.github.io/v-wave)  <!-- omit in toc -->

## Quick start <!-- omit in toc -->

After installing and registering the plugin, this is all you need to get started:

```html
<button v-wave>Click here</button>
```

![Example of default options](https://raw.githubusercontent.com/justintaddei/v-wave/assets/default-example.gif)

> Out of the box, this will provide you with a ripple that matches the text color of the element it has been applied to, with reasonable defaults for a responsive feeling ripple.  
> You can change the look and feel of the ripple on a [per-element basis](#configuring-locally), or by modifying the [global defaults](#configuring-globally).

## Contents <!-- omit in toc -->
- [Installation](#installation)
  - [Via NPM](#via-npm)
  - [Via CDN](#via-cdn)
- [Configuration](#configuration)
  - [Configuring globally](#configuring-globally)
  - [Configuring locally](#configuring-locally)
- [Options](#options)
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
  - [Registering the directive locally](#registering-the-directive-locally)
    - [Local registration with Composition API:](#local-registration-with-composition-api)
    - [Local registration with Options API:](#local-registration-with-options-api)
  - [Changing the directive's name](#changing-the-directives-name)
- [License](#license)

## Installation

<small>See: [npm](#via-npm), [cdn](#via-cdn)</small>

### Via NPM

<small>See: [Vue](#vue-), [Nuxt](#nuxt-)</small>

```sh
$ npm i v-wave
```

#### Vue <!-- omit in toc -->
```js
import { createApp } from 'vue'
import VWave from 'v-wave'
import App from './App.vue'

const app = createApp(App)

app.use(VWave)
```

<details>
    <summary>Vue 2</summary>

```js
// Vue 2

import Vue from 'vue'
import VWave from 'v-wave'

Vue.use(VWave)
```

</details>

or

#### Nuxt <!-- omit in toc -->

```js
// nuxt.config.js

// Nuxt 3
export default {
    modules: ['v-wave/nuxt']
}

// Nuxt 2
export default {
    modules: ['v-wave/nuxt/v2']
}
```

### Via CDN

<details>
    <summary>Expand examples</summary>

```html
<script src="https://unpkg.com/v-wave"></script>
```

```js
// With a CDN, `VWave` is made available as a global
Vue.use(VWave)
```

</details>

---  

## Configuration

<small>See: [configuring globally](#configuring-globally), [configuring locally](#configuring-locally)</small>

### Configuring globally

<small>See: [Vue](#vue--1), [Nuxt](#nuxt--1)</small>

#### Vue <!-- omit in toc -->

```js
import { createApp } from 'vue'
import VWave from 'v-wave'
import App from './App.vue'

const app = createApp(App)

app.use(VWave, {
    color: 'red',
    initialOpacity: 0.5,
    easing: 'ease-in',
})
```

<details>
    <summary>Vue 2</summary>

```js
// Vue 2

import Vue from 'vue'
import VWave from 'v-wave'

Vue.use(VWave, {
    color: 'red',
    initialOpacity: 0.5,
    easing: 'ease-in',
})
```

</details>

or

#### Nuxt <!-- omit in toc -->
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

### Configuring locally

```html
<button v-wave="{
    color: 'red',
    initialOpacity: 0.5,
    easing: 'ease-in',
}">
Click here
</button>
```

---

## Options

<small>See: [summary](#summary), [details](#details)</small>

### Summary

| Name                                      |     Default      | Type                          |
| ----------------------------------------- | :--------------: | ----------------------------- |
| [color](#color)                           | `"currentColor"` | `string`                      |
| [initialOpacity](#initialopacity)         |      `0.2`       | `number`                      |
| [finalOpacity](#finalopacity)             |      `0.1`       | `number`                      |
| [duration](#duration)                     |      `0.4`       | `number`                      |
| [dissolveDuration](#dissolveduration)     |      `0.15`      | `number`                      |
| [easing](#easing)                         |    `ease-out`    | `string`                      |
| [cancellationPeriod](#cancellationperiod) |       `75`       | `number`                      |
| [trigger](#trigger)                       |     `"auto"`     | `string \| boolean \| "auto"` |
| [tagName](#tagname)                       |     `"div"`      | `string`                      |

### Details

#### color

- **type:** `string` ([`background` shorthand syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/background#formal_syntax))
- *default:* `"currentColor"`

> Sets the background of the ripple.  
> Supports any value that the CSS `background` property does.

<details>
    <summary>Expand examples</summary>

<small>See: [color](#simple-color-), [gradient](#gradient-), [image](#image-)</small>

#### Simple color <!-- omit in toc -->

```html
<button v-wave="{
    color: 'red',
}">
Click here
</button>
```

![](https://raw.githubusercontent.com/justintaddei/v-wave/assets/color-red.gif)

#### Gradient <!-- omit in toc -->

```html
<button v-wave="{
    color: 'radial-gradient(closest-side, #fff, #00f, #fff)',
}">
Click here
</button>
```

![](https://raw.githubusercontent.com/justintaddei/v-wave/assets/color-gradient.gif)

#### Image <!-- omit in toc -->

```html
<button v-wave="{
    color: 'no-repeat url(https://...) 0 0 / cover',
}">
Click here
</button>
```

![](https://raw.githubusercontent.com/justintaddei/v-wave/assets/color-image.gif)

</details>


#### initialOpacity

- **type:** `number`
- *default:* `0.2`

> The opacity of the ripple when it first appears.

<details>
    <summary>Expand examples</summary>

<small>See: [initialOpacity: 1](#initialopacity-of-1-), [initialOpacity: 0](#initialopacity-of-0-)</small>

#### initialOpacity of 1 <!-- omit in toc -->

```html
<button v-wave="{
    initialOpacity: 1,
}">
Click here
</button>
```

![](https://raw.githubusercontent.com/justintaddei/v-wave/assets/color-initial-opacity-1.gif)


#### initialOpacity of 0 <!-- omit in toc -->

```html
<button v-wave="{
    initialOpacity: 0,
}">
Click here
</button>
```

![](https://raw.githubusercontent.com/justintaddei/v-wave/assets/color-initial-opacity-0.gif)


</details>

#### finalOpacity

- **type:** `number`
- *default:* `0.1`

> The opacity the ripple should be when it has stopped moving.

<details>
    <summary>Expand examples</summary>

<small>See: [finalOpacity: 1](#finalopacity-of-1-), [finalOpacity: 0](#finalopacity-of-0-)</small>

#### finalOpacity of 1 <!-- omit in toc -->

```html
<button v-wave="{
    finalOpacity: 1,
}">
Click here
</button>
```

![](https://raw.githubusercontent.com/justintaddei/v-wave/assets/color-final-opacity-1.gif)


#### finalOpacity of 0 <!-- omit in toc -->

```html
<button v-wave="{
    finalOpacity: 0,
}">
Click here
</button>
```

![](https://raw.githubusercontent.com/justintaddei/v-wave/assets/color-final-opacity-0.gif)


</details>

#### duration

- **type:** `number` (seconds)
- *default:* `0.4`

> The duration of the ripple in seconds.  
> The total duration is `duration + dissolveDuration`

<details>
    <summary>Expand example</summary>

#### duration of 3 seconds <!-- omit in toc -->

```html
<button v-wave="{
    duration: 3,
}">
Click here
</button>
```

![](https://raw.githubusercontent.com/justintaddei/v-wave/assets/duration-3s.gif)

</details>

#### dissolveDuration

- **type:** `number` (seconds)
- *default:* `0.15`

> The duration of the "dissolve animation" in seconds.  
> This is the fade-out animation that plays once the wave has reached its maximum size.  
> The total duration is `duration + dissolveDuration`

<details>
    <summary>Expand example</summary>

#### dissolve duration of 3 seconds <!-- omit in toc -->

```html
<button v-wave="{
    dissolveDuration: 3,
}">
Click here
</button>
```

![](https://raw.githubusercontent.com/justintaddei/v-wave/assets/dissolve-duration-3s.gif)

</details>

#### easing

- **type:** `string` ([`<easing-function>`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function))
- *default:* `"ease-out"`

> Any valid CSS `<easing-function>` ([see more](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function))

<details>
    <summary>Expand example</summary>

#### cubic-bezier <!-- omit in toc -->

```html
<button v-wave="{
    easing: 'cubic-bezier(0,.57,.89,0)',
}">
Click here
</button>
```

![](https://raw.githubusercontent.com/justintaddei/v-wave/assets/easing.gif)

</details>

#### cancellationPeriod

- **type:** `number` (milliseconds)
- *default:* `75`

> The delay, in milliseconds, during which the animation will be canceled if the user moves their figure/pointer (e.g. while scrolling on a mobile device).  

> **Note:** The ripple will not appear until after the delay. This means a delay greater than 100ms can feel sluggish.


#### trigger

- **type:** `"auto" | string | boolean`
- *default:* `"auto"`

> Sets the behavior of the wave when used with triggers. (See the [dedication section](#using-triggers) on triggers for more details).

- `false`  
    Disables the use of triggers. If a `v-wave-trigger` (without an ID) is present in the dom tree of this element, it will be ignored (i.e. `v-wave` always behaves as if there's no trigger).
- `true`  
    Requires a trigger to activate the ripple. `v-wave` assumes the presence of a `v-wave-trigger` (without an ID) in its dom tree. The ripple will only activate for `pointerdown` events on the trigger element.
- `"auto"`  
    If a `v-wave-trigger` (without an ID) is present in the dom-tree of the v-wave element, it behaves as `trigger: true`, otherwise it behaves as `trigger: false`.
- `string`  
    Any string other than `"auto"` will be treated as an ID. `v-wave` will only activate when a `v-wave-trigger` with a matching ID receives a `pointerdown` event.  

    > This is different from the other values as it allows you to place the trigger element anywhere in the dom, while the others require the trigger to be a descendant.


<details>
    <summary>Expand example</summary>

#### basic trigger <!-- omit in toc -->

```html
<label v-wave>
  <input type="text" placeholder="Search" />
  
  <!-- Only show the wave when the trigger is clicked -->
  <img v-wave-trigger src="search.svg" />
</label>
```

![](https://raw.githubusercontent.com/justintaddei/v-wave/assets/tigger.gif)

</details>

#### tagName  
- **type:** `string`  
- *default:* `"div"`  
  
> Sets the tag name of the element used as the wave container. This is is useful in scenarios where the default `div` may interfere with `:last-of-type` or similar selectors.

---

### Using triggers

Triggers allow you to activate a wave on an element when, and only when, a different element receives input.


In the following example, the wave will only activate for the label element when the user clicks or taps on the `<img/>`.

```html
<label v-wave>
    <span>Password</span>
    <input :type="showPassword ? 'text' : 'password'" />
    <img v-wave-trigger src="eye.svg" @click="() => showPassword = !showPassword" />
</label>
```

In this next example, clicking one of the buttons will activate the wave on the other button.

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

### Registering the directive locally

#### Local registration with Composition API:

```html
<script>
import VWave from 'v-wave'
const { vWave, vWaveTrigger } = VWave.createLocalWaveDirective({/* global options */})
</script>

<template>
   <button v-wave>Click me!</button>
</template>
```

#### Local registration with Options API:

```html
<script>
import VWave from 'v-wave'
const { wave, waveTrigger } = VWave.createLocalWaveDirective({/* global options */})

export default {
  directives: {
      wave,
      waveTrigger
  }
}
</script>

<template>
  <button v-wave>Click me!</button>
</template>
```

<details>
    <summary>Vue 2</summary>

If you are using Vue 2, you need to pass `"vue2"` as the second argument to `createLocalWaveDirective`

```html
<script>
import VWave from 'v-wave'
const { wave, waveTrigger } = VWave.createLocalWaveDirective({/* global options */}, 'vue2') // this is the difference

export default {
  directives: {
      wave,
      waveTrigger
  }
}
</script>

<template>
  <button v-wave>Click me!</button>
</template>
```
</details>

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

> Keep in mind that this option can only be set globally (i.e. it cannot be set on individual directives).

## License

This project is distributed under the [MIT License](https://github.com/justintaddei/v-wave/blob/master/LICENSE.md).

### The MIT License (MIT)  <!-- omit in toc -->

Copyright (c) 2021 Justin Taddei

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
