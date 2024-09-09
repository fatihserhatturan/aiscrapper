<template>
  <div id="app">
    <Navbar /> <!-- Navbar componentini ekliyoruz -->
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar/NavbarComponent.vue'; // Navbar componentini import ediyoruz

export default {
  name: 'App',
  components: {
    Navbar // Navbar componentini lokal component olarak tanımlıyoruz
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
