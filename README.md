<center>
<img src="https://raw.githubusercontent.com/justintaddei/v-wave/assets/logo-small.png">

# v-wave

The material-ripple directive for Vue that actually works

<br/>

![](https://img.shields.io/github/issues-raw/justintaddei/v-wave.svg?style=flat)
![](https://img.shields.io/npm/v/v-wave.svg?style=flat)
![](https://img.shields.io/npm/dt/v-wave.svg?style=flat)
![](https://img.shields.io/npm/l/v-wave.svg?style=flat)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
![](https://img.shields.io/badge/language-typescript-blue.svg?style=flat)

</center>

## Why did I make this? 

Because every ripple-plugin I've tried to use in the past either didn't work, or was missing basic features.

**Here's what you can example from this plugin:**

- It works.
- The wave appears on `pointerdown` instead of `pointerup`  
  *(you might think that's an obvious choice... but you'd be wrong).*
- Handles touch input just as well as it does mouse input.
- Uses CSS transforms instead of `width` and `height`.
- Doesn't effect the appearance of the element you apply it to (won't explode when used on an element with  `display: flex`).
- Guesses the color of the wave automatically by default (using `currentColor`).
- Works with fixed, absolute, relative, and statically positioned elements.
- Will handle independent border-radii (e.g. `border-radius: 5px 20px 15px 30px`) perfectly fine.


**Don't believe me?**  

**See for yourself:**

## [Live Demo](https://justintaddei.github.io/v-wave)
> Source code for the example can be found on the [example branch.](https://github.com/justintaddei/v-wave/tree/example)

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
//main.js

import Vue from 'vue'
import VWave from 'v-wave'

Vue.use(VWave)
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

 Vue.use(VWave, {
    color: 'red'
    startingOpacity: 0.5
    easing: 'ease-in'
 })
```

or

**Nuxt**

```js
// nuxt.config.js

export default {
    modules: ['v-wave/nuxt],

    vWave: {
        color: 'red'
        startingOpacity: 0.5
        easing: 'ease-in'
    }
}

```

#### Per-directive options

```html
<button v-wave="{
    color: 'red'
    startingOpacity: 0.5
    easing: 'ease-in'
}">
Click me!
</button>
```


### Summary
| Name             | Type     |     Default      |
| ---------------- | -------- | :--------------: |
| `color`          | `string` | `"currentColor"` |
| `initialOpacity` | `number` |      `0.2`       |
| `finialOpacity`  | `number` |      `0.1`       |
| `duration`       | `number` |      `0.4`       |
| `easing`         | `string` |    `ease-out`    |



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


## Advanced

### Changing the directive's name

Pass a new name for the directive using the `directive` option:

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
