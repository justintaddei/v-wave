<p align="center">
<img src="https://raw.githubusercontent.com/justintaddei/v-wave/assets/logo-small.png">
</p>

<h2 align="center">v-wave</h2>

<p align="center">
The material-ripple directive for Vue that actually works
</p>

![Checks](https://github.com/justintaddei/v-wave/workflows/checks/badge.svg)
![Issues](https://img.shields.io/github/issues-raw/justintaddei/v-wave.svg?style=flat)
![Size when minified and gzipped](https://img.shields.io/badge/gzipped-121%20B-green)
![NPM version](https://img.shields.io/npm/v/v-wave.svg?style=flat)
![Downloads](https://img.shields.io/npm/dt/v-wave.svg?style=flat)
![License](https://img.shields.io/npm/l/v-wave.svg?style=flat)
![Language](https://img.shields.io/badge/language-typescript-blue.svg?style=flat)

### Support for both Vue 2 and Vue 3!

## Why did I make this? 

Because every ripple-plugin I've tried to use in the past either didn't work, or was missing basic features.

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


## [[ Live Demo ]](https://justintaddei.github.io/v-wave)
> Source code for the demo page can be found on the [example branch.](https://github.com/justintaddei/v-wave/tree/example)

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

### Usage with options

#### Global options

**Vue**

```js
// main.js
. . .

.use(VWave, {
    color: 'red',
    startingOpacity: 0.5,
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
        startingOpacity: 0.5,
        easing: 'ease-in',
    }
}

```

#### Per-directive options

```html
<button v-wave="{
    color: 'red',
    startingOpacity: 0.5,
    easing: 'ease-in',
}">
Click me!
</button>
```


### Summary
| Name                 | Type     |     Default      |
| -------------------- | -------- | :--------------: |
| `color`              | `string` | `"currentColor"` |
| `initialOpacity`     | `number` |      `0.2`       |
| `finialOpacity`      | `number` |      `0.1`       |
| `duration`           | `number` |      `0.4`       |
| `easing`             | `string` |    `ease-out`    |
| `cancellationPeriod` | `number` |       `75`       |



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

#### easing  
- **type:** `string`  
- *default:* `"ease-out"`  
  
    Any valid CSS `<timing-function>`

#### cancellationPeriod  
- **type:** `number`  
- *default:* `75`  
  
    The delay, *in milliseconds*, during which the animation will be canceled by the user moving their figure/pointer (e.g. while scrolling on a mobile phone).

    **Note:**  
    The wave will not appear until after the delay, meaning a delay greater than 100ms can make the site feel sluggish.

---

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
