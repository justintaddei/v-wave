<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>v-wave</h1>
    <p>The material-ripple directive for Vue that actually works</p>
    <p><a href="https://github.com/justintaddei/v-wave">Back to Github</a></p>

    <div class="demo">
      <div v-wave class="box">Default</div>
      <div style="color: red;" v-wave class="box">Color</div>
      <div style="border-radius: 50% 10px" v-wave="{ color: 'yellow' }" class="box">
        border-radius
      </div>
      <div
        v-wave="{
          duration: 2,
          color: 'radial-gradient(closest-side, #3f87a6, #ebf8e1, #f69d3c)',
          initialOpacity: 0.7,
          finialOpacity: 0.3,
          easing: 'cubic-bezier(0,.57,.89,0)'
        }"
        class="box"
      >
        Custom
      </div>
      <div
        style="border-radius: 50%; color:#fff; position:fixed; bottom: 16px; left: 16px; background: #f90;"
        v-wave
        class="box"
      >
        Fixed position
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
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

  margin-bottom: 1000px;
}

.demo {
  text-align: center;
  padding: 64px 10%;

  .box {
    display: inline-flex;
    margin: 32px;
    width: 200px;
    height: 200px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);

    justify-content: center;
    align-items: center;
  }
}
</style>
