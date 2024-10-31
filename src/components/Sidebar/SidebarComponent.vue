<template>
  <div class="toggle-icon" @click="$emit('toggle-sidebar')">
    <font-awesome-icon :icon="['fas', 'bars']" />  
  </div>
  <div class="sidebar"  :class="{ 'sidebar-closed': !isOpen }">
    <div class="sidebar-content" v-if="isOpen">
      <ul class="sidebar-menu">
        <li class="menu-item" @click="navigateTo('/')">
          <router-link to="/" class="menu-link">
            <span class="menu-icon">
              <font-awesome-icon :icon="['fa', 'pager']" />
            </span>
            Page Base Document
          </router-link>
        </li>
        <li class="menu-item" @click="navigateTo('/scenario')">
          <router-link to="/scenario" class="menu-link">
            <span class="menu-icon">
              <font-awesome-icon :icon="['fas', 'clapperboard']" />
            </span>
            Scenario Document
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/scenario-document-pw">
            <span class="menu-icon">
              <font-awesome-icon :icon="['fas', 'clapperboard']" />
            </span>
            Playwrite ile Doküman Oluşturma
          </router-link>
        </li>

        <li class="menu-item">
          <router-link to="/scenario-document-no-pw">
            <span class="menu-icon">
              <font-awesome-icon :icon="['fas', 'file-lines']" />
            </span>
            Kullanıcı Etkileşim Logları ile Doküman Oluşturma
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'SidebarComponent',
  props:{
    isOpen: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const router = useRouter()

    const navigateTo = (path) => {
      router.push(path)
    }

    return {
      navigateTo
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap');

.sidebar {
  width: 280px;
  height: calc(100vh - 64px);
  background: rgba(30, 58, 138, 0.95);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  position: fixed;
  left: 0;
  top: 64px;
  color: #fff;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease-in-out;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 40;
}

.sidebar-closed {
  width: 0;
  overflow: hidden;
}

.toggle-icon {
  color: #1380d3;
  font-size: 1.5rem;
  cursor: pointer;
  position: fixed;
  top: 70px; /* Navbar altında konumlandırır */
  left: 10px; /* Sol tarafta tutar */
  z-index: 50; /* Sidebar'ın önünde gösterir */
}

.toggle-icon:hover {
  color: #2563eb; /* Hover durumunda ikon rengini değiştirir */
}

.sidebar-closed .sidebar-content {
  opacity: 0;
}

.sidebar-content {
  padding: 1.5rem 1rem;
  height: 100%;
  overflow-y: auto;
  transition: opacity 0.3s ease-in-out;
  opacity: 1;
}

.sidebar-closed .sidebar-content {
  opacity: 0;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin-top:20px;
}

.menu-item {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  background: transparent;
  position: relative;
  overflow: hidden;
  height: 80px;
  width: 100%;
}

.menu-icon {
  margin-right: 0.75rem;
  font-size: 1rem;
  opacity: 0.8;
}

.menu-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0.25rem;
  background: #60a5fa;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  border-radius: 0 4px 4px 0;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.menu-item:hover::before {
  opacity: 1;
}

.menu-item:active {
  transform: translateX(2px);
}

/* Custom Scrollbar */
.sidebar-content::-webkit-scrollbar {
  width: 5px;
}

.sidebar-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

.sidebar-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .sidebar {
    width: 240px;
  }

  .menu-item {
    padding: 0.625rem 0.875rem;
    font-size: 0.813rem;
  }
}


</style>
