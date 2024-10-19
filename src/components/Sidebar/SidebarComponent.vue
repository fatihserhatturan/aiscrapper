<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <ul class="sidebar-menu">
        <li class="menu-item">
          <span class="menu-icon"><font-awesome-icon :icon="['fa', 'pager']" /></span>
          Page Base Document
        </li>
        <li class="menu-item">
          <span class="menu-icon"><font-awesome-icon :icon="['fas', 'clapperboard']" /></span>
          Scenario Document
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarComponent'
};
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

.sidebar-content {
  padding: 1.5rem 1rem;
  height: 100%;
  overflow-y: auto;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
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
