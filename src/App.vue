<template>
  <MainPane/>
</template>

<script>
import MainPane from './components/MainPane.vue'

export default {
  name: 'App',
  components: {
    MainPane
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Pathway+Gothic+One&display=swap');
* {
  box-sizing: border-box;
  font-family: 'Pathway Gothic One', sans-serif;
}
body, html {
  margin: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
}
</style>
