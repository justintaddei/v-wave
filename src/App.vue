<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>v-wave</h1>
    <img src="https://github.com/justintaddei/v-wave/workflows/Tests/badge.svg" alt="" />
    <img src="https://img.shields.io/github/issues-raw/justintaddei/v-wave.svg?style=flat" alt="" />
    <img src="https://img.shields.io/npm/v/v-wave.svg?style=flat" alt="" />
    <p>The material-ripple directive for Vue that actually works</p>
    <p><a href="https://github.com/justintaddei/v-wave">Back to Github</a></p>
    <br />
    <p>Edit the options on the left, then tap or click the box below</p>
    <div class="example-container">
      <div class="editor-container" ref="container">
        <prism-editor
          readonly
          class="editor readonly"
          v-model="editorCodeReadonly"
          :highlight="highlighterHTML"
        ></prism-editor>
        <prism-editor class="editor edit" v-model="code" :highlight="highlighterJS"></prism-editor>
      </div>
      <div class="example">
        <div class="wave" v-wave="vWaveOptions">Example</div>
      </div>
    </div>
    <div>
      <strong v-show="error" style="color: red">{{ error }}</strong>
    </div>

    <div v-wave class="box">Default</div>
    <div style="color: #fff; background: #333" v-wave class="box">Auto color detection</div>
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

<script>
// import Prism Editor
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles

export default {
  components: {
    PrismEditor
  },
  data() {
    return {
      code: `  color: 'currentColor',
  easing: 'ease-out',
  duration: 0.4,
  initialOpacity: 0.2,
  finalOpacity: 0.1,
  cancellationPeriod: 75`,
      error: '',
      vWaveOptions: {}
    }
  },
  watch: {
    code() {
      this.setContainerHeight()

      const json = this.code.replace(/([\w\d]+)(:.*)/g, '"$1"$2').replace(/['`]/g, '"')
      try {
        this.error = ''
        this.vWaveOptions = JSON.parse(`{${json}}`)
      } catch (e) {
        this.error = e.message
        this.vWaveOptions = {}
      }
    }
  },
  mounted() {
    this.setContainerHeight()
  },
  computed: {
    editorCodeReadonly() {
      const start = `<div v-wave="{`
      const end = `}">
  Example
</div>`

      let numberOfLines = this.code.split('\n').length
      let placeholderLines = '\n'

      while (numberOfLines--) placeholderLines += '\n'

      return `${start}${placeholderLines}${end}`
    }
  },
  methods: {
    highlighterJS(code) {
      return highlight(code, languages.js) // languages.<insert language> to return html with markup
    },
    highlighterHTML(code) {
      return highlight(code, languages.markup) // languages.<insert language> to return html with markup
    },
    setContainerHeight() {
      this.$nextTick(() => {
        const { height } = this.$refs.container
          .querySelector('.editor.readonly .prism-editor__editor')
          .getBoundingClientRect()

        this.$refs.container.style.height = `${height}px`
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  margin-bottom: 1000px;
}

img {
  margin: 0 8px;
}

.example-container {
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  place-items: center;
  padding: 32px;
}

.editor-container {
  position: relative;
  background: #2d2d2d;
  --padding: 15px;
  padding: 20px;
  width: 100%;
}

.editor {
  background: transparent;
  color: #ccc;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 20px;
  line-height: 1.5;

  position: absolute;
}

.example {
  background: #f5f5f5;
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}
.wave {
  background: #fff;
  width: 150px;
  height: 150px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: grid;
  place-items: center;
  cursor: pointer;
}

.editor.edit {
  top: calc(var(--padding) + 1.5em);
}

// optional
.prism-editor__textarea:focus {
  outline: none;
}

.prism-editor__container {
  height: 100%;
}

.box {
  display: inline-flex;
  margin: 32px;
  width: 200px;
  height: 200px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
