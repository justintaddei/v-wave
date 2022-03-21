<script setup lang="ts">
import { ref } from 'vue'

let example1 = ref(`
<!-- Edit me (all options are set to their default) -->
<div
  class="box"
  v-wave="{
    color: 'currentColor',
    easing: 'ease-out',
    duration: 0.4,
    dissolveDuration: 0.15,
    initialOpacity: 0.2,
    finalOpacity: 0.1,
    cancellationPeriod: 75,
    trigger: 'auto',
    tagName: 'div'
  }"
>
  Click here
</div>`)

let example2 = ref(`
<label
  v-wave
  class="text-input"
>
  <input type="text" placeholder="Search" />
  
  <!-- Only show the wave when the trigger is clicked -->
  <img v-wave-trigger src="./imgs/search.svg" />
</label>`)

let updateExample1 = (_code: string) => (example1.value = _code)
let updateExample2 = (_code: string) => (example2.value = _code)

let randomColorValue = () => Math.random() * 255

let randomColor = () => `rgb(${randomColorValue()}, ${randomColorValue()}, ${randomColorValue()})`

let gridDemoWaveOptions = { color: '#09f', duration: 2, initialOpacity: 0.1, finalOpacity: 0.7, trigger: 'gridDemo' }
</script>

<template>
  <main>
    <img v-wave-trigger alt="Vue logo" src="./assets/logo.png" />
    <h1>v-wave</h1>
    <div class="badges">
      <img src="https://github.com/justintaddei/v-wave/workflows/Tests/badge.svg" alt="" />
      <img src="https://img.shields.io/github/issues-raw/justintaddei/v-wave.svg?style=flat" alt="" />
      <img src="https://img.shields.io/npm/v/v-wave.svg?style=flat" alt="" />
    </div>
    <p>The material-ripple directive for Vue that actually works</p>
    <p><a href="https://github.com/justintaddei/v-wave">Back to Github</a></p>
    <br />
    <div class="editor">
      <div class="editorWrapper">
        <VueLiveEditor :code="example1" @change="updateExample1" />
      </div>
      <div class="previewWrapper">
        <VueLivePreview :code="example1" />
      </div>
    </div>
    <div class="otherExamples">
      <h2>Basic Examples</h2>
      <div v-wave class="box">default</div>
      <div style="color: #fff; background: #333" v-wave class="box">default (currentColor demo)</div>
      <div
        style="border-radius: 50% 10px"
        v-wave="{ color: '#09f', initialOpacity: 0.7, finalOpacity: 0.5, dissolveDuration: 0.3 }"
        class="box"
      >
        border-radius
      </div>
      <div
        v-wave="{
          duration: 2,
          color: 'radial-gradient(closest-side, #fff, #1cb884)',
          initialOpacity: 0.7,
          finalOpacity: 0.3,
          easing: 'cubic-bezier(0,.57,.89,0)'
        }"
        class="box"
      >
        radial-gradient
      </div>
    </div>

    <div class="triggerExamples">
      <h2>Examples using triggers</h2>
      <div class="editor">
        <div class="editorWrapper">
          <VueLiveEditor :code="example2" @change="updateExample2" />
        </div>
        <div class="previewWrapper">
          <VueLivePreview :code="example2" />
        </div>
      </div>
      <h4>Just an example of the flexibility that triggers provide (click/tap any box)</h4>
      <div class="waveGrid">
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
        <div v-wave-trigger:gridDemo v-wave="gridDemoWaveOptions" class="box small" />
      </div>
    </div>
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  text-align: center;
  color: #2c3e50;
  padding: 60px 32px 0 32px;
  user-select: none;
}

.badges {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 32px;
}

.editor {
  display: grid;
  grid-template: auto auto / auto auto;
  place-items: stretch;
  grid-template-areas:
    'editor preview'
    'editor preview';
}

.prism-editor-wrapper {
  background-color: #222;
  color: #eee;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 16px;
  font-family: monospace;
  line-height: 1.33em;
  max-width: 500px;
  margin: 0 0 0 auto;
}

@media screen and (max-width: 1000px) {
  .editor {
    grid-template-areas:
      'preview preview'
      'editor editor';
  }

  .prism-editor-wrapper {
    margin: auto;
  }
}

.prism-editor-wrapper * {
  outline: none;
  border: none;
}

.editorWrapper {
  grid-area: editor;
}

.previewWrapper {
  grid-area: preview;
  display: grid;
  place-items: center;
  width: 100%;
  margin: 64px 0;
}

.otherExamples {
  display: grid;
  place-items: center;
  grid-template: auto 1fr / 1fr 1fr 1fr 1fr;
  padding: 10%;
  gap: 64px 32px;
}

@media screen and (max-width: 1140px) {
  .otherExamples {
    grid-template: auto 1fr 1fr / 1fr 1fr;
  }
}

@media screen and (max-width: 560px) {
  .otherExamples {
    grid-template: auto 1fr 1fr 1fr / 1fr;
  }
}

.otherExamples > h2 {
  grid-column: 1/-1;
}

.box {
  display: grid;
  place-items: center;
  width: 200px;
  height: 200px;
  padding: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.triggerExamples {
  display: grid;
  place-items: center;
  gap: 64px;
}

.triggerExamples .editor {
  min-width: 100%;
}

.text-input {
  display: grid;
  grid-template: 1fr / 1fr auto;
  place-items: center;
  padding: 0 16px;
  height: 48px;
  border: 2px solid #aaa;
  border-radius: 8px;
  font-size: 20px;
}

.text-input:focus-within {
  border: 2px solid #333;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}

.text-input > input {
  border: none;
  outline: none;
  background: transparent;
  font-size: inherit;
}

.text-input > img {
  cursor: pointer;
}

.waveGrid {
  display: inline-grid;
  grid-template: repeat(5, auto) / repeat(5, auto);
  place-items: center;
  gap: 32px;
}

.waveGrid .box.small {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
</style>
