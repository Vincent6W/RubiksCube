<template>
  <div id="app">
    <!--<three></three>-->
    <cube></cube>
  </div>
</template>

<script>
import three from './components/three.vue'
import cube from './components/rubiksCube.vue'

export default {
  name: 'App',
  components: {
    three,
    cube,
  }
}
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
  }
</style>
