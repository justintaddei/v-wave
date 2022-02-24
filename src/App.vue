<script setup lang="ts">
import { ref } from 'vue'

let code = ref(`
<!-- Edit me -->
<div
  class="box"
  v-wave="{
    color: 'currentColor',
    easing: 'ease-out',
    duration: 0.4,
    initialOpacity: 0.2,
    finalOpacity: 0.1,
    cancellationPeriod: 75
  }"
>
  Click here
</div>`)

let updateCode = (_code: string) => (code.value = _code)
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
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
      <VueLiveEditor :code="code" @change="updateCode" />
    </div>
    <div class="previewWrapper">
      <VueLivePreview :code="code" />
    </div>
  </div>
  <div class="otherExamples">
    <h2>Other Examples</h2>
    <div v-wave class="box">Default</div>
    <div style="color: #fff; background: #333" v-wave class="box">default (currentColor demo)</div>
    <div style="border-radius: 50% 10px" v-wave="{ color: '#09f', initialOpacity: 0.7, finalOpacity: 0.5 }" class="box">
      border-radius
    </div>
    <div
      v-wave="{
        duration: 2,
        color: 'radial-gradient(closest-side, #3f87a6, #ebf8e1, #f69d3c)',
        initialOpacity: 0.7,
        finalOpacity: 0.3,
        easing: 'cubic-bezier(0,.57,.89,0)'
      }"
      class="box"
    >
      radial-gradient
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  text-align: center;
  color: #2c3e50;
  margin: 60px 32px 0 32px;
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
</style>
