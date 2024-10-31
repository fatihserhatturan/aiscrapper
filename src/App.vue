<template>
  <div id="app">
    <Navbar /> <!-- Navbar component -->
    <Sidebar  :isOpen="isSidebarOpen" @toggle-sidebar="isSidebarOpen = !isSidebarOpen"/> <!-- Sidebar component -->
    <div class="content" :class="{ 'content-shifted': isSidebarOpen }">
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
  },
  data() {
    return {
      isSidebarOpen: true // Sidebar'ın başlangıç durumu açık
    };
  },
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
  transition: margin-left 0.3s ease-in-out;
  padding: 30px;
}

.content-shifted {
  margin-left: 280px; /* Sidebar açıkken içerik kayar */
}
/* Global scrollbar styles */
::-webkit-scrollbar {
  width: 10px;  /* Scrollbar genişliği */
  height: 10px; /* Yatay scrollbar yüksekliği */
}

::-webkit-scrollbar-track {
  background: #f1f1f1;  /* Scrollbar track rengi */
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #3b82f6;  /* Scrollbar thumb rengi */
  border-radius: 10px;
  border: 2px solid #f1f1f1;
}

::-webkit-scrollbar-thumb:hover {
  background: #2563eb;  /* Hover durumunda thumb rengi */
}

</style>
