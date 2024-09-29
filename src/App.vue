<template>
  <div id="app">
    <Navbar /> <!-- Navbar component -->
    <Sidebar /> <!-- Sidebar component -->
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar/NavbarComponent.vue';
import Sidebar from './components/Sidebar/SidebarComponent.vue'; // Import Sidebar

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar // Register Sidebar
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

.content {
  margin-left: 15%; /* Adjusted for the new sidebar width */
  padding: 30px;
}
</style>
