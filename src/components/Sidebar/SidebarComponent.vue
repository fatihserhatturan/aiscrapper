<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <ul class="sidebar-menu">
        <li
          class="menu-item"
          @click="navigateTo('/')"
          @mousemove="(e) => updateTooltipPosition(e, 'page')"
          @mouseenter="() => showTooltip('page')"
          @mouseleave="() => hideTooltip('page')"
        >
          <div class="menu-item-background"></div>
          <div class="menu-item-glow"></div>
          <router-link to="/" class="menu-link">
            <span class="menu-icon">
              <font-awesome-icon :icon="['fas', 'display']" />
            </span>
          </router-link>
          <div class="tooltip" v-show="tooltips.page">
            <span class="tooltip-content">Page Base Document</span>
          </div>
        </li>
        <div class="divider"></div>
        <li
          class="menu-item"
          @click="navigateTo('/scenario-document-pw')"
          @mousemove="(e) => updateTooltipPosition(e, 'scenariopw')"
          @mouseenter="() => showTooltip('scenariopw')"
          @mouseleave="() => hideTooltip('scenariopw')"
        >
          <div class="menu-item-background"></div>
          <div class="menu-item-glow"></div>
          <router-link to="/scenario-document-pw" class="menu-link">
            <span class="menu-icon">
              <font-awesome-icon :icon="['fas', 'clapperboard']" />
            </span>
          </router-link>
          <div class="tooltip" v-show="tooltips.scenariopw">
            <span class="tooltip-content">Scenario Document With Playwright</span>
          </div>
        </li>
        <div class="divider"></div>
        <li
          class="menu-item"
          @click="navigateTo('/scenario-document-no-pw')"
          @mousemove="(e) => updateTooltipPosition(e, 'scenarionopw')"
          @mouseenter="() => showTooltip('scenarionopw')"
          @mouseleave="() => hideTooltip('scenarionopw')"
        >
          <div class="menu-item-background"></div>
          <div class="menu-item-glow"></div>
          <router-link to="/scenario-document-no-pw" class="menu-link">
            <span class="menu-icon">
              <font-awesome-icon :icon="['fas', 'list']" />
            </span>
          </router-link>
          <div class="tooltip" v-show="tooltips.scenarionopw">
            <span class="tooltip-content">Scenario Document With User Logs</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// Script kısmı aynı kalacak
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

export default {
  name: 'SidebarComponent',
  setup() {
    const router = useRouter()
    const tooltips = reactive({
      page: false,
      scenariopw: false,
      scenarionopw: false
    })

    const navigateTo = (path) => {
      router.push(path)
    }

    const updateTooltipPosition = (event, tooltipId) => {
      if (tooltips[tooltipId]) {
        const tooltip = event.currentTarget.querySelector('.tooltip')
        if (tooltip) {
          tooltip.style.left = `${event.clientX + 15}px`
          tooltip.style.top = `${event.clientY}px`
        }
      }
    }

    const showTooltip = (tooltipId) => {
      Object.keys(tooltips).forEach(key => {
        tooltips[key] = key === tooltipId
      })
    }

    const hideTooltip = (tooltipId) => {
      tooltips[tooltipId] = false
    }

    return {
      navigateTo,
      updateTooltipPosition,
      showTooltip,
      hideTooltip,
      tooltips
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap');

.sidebar {
  width: 80px;
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
  padding: 1rem 0;
  height: 100%;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
}

.menu-item {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  padding: 1.25rem 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  background: transparent;
  position: relative;
  overflow: hidden;
}

.menu-item-background {
  position: absolute;
  inset: 5px;
  border-radius: 8px;
  background: rgba(30, 58, 138, 0.3);
  transform: scale(0.6);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-item-glow {
  position: absolute;
  inset: 0;
  border-radius: 8px;
  background: radial-gradient(
    circle at center,
    rgba(96, 165, 250, 0.4) 0%,
    rgba(96, 165, 250, 0) 70%
  );
  opacity: 0;
  transform: scale(1.5);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-item:hover .menu-item-background {
  transform: scale(1);
  opacity: 1;
}

.menu-item:hover .menu-item-glow {
  opacity: 1;
  transform: scale(1);
}

.menu-icon {
  opacity: 0.8;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
}

.menu-item:hover .menu-icon {
  opacity: 1;
  transform: scale(1.1);
  text-shadow: 0 0 20px rgba(96, 165, 250, 0.8);
  animation: iconPulse 1.5s ease-in-out infinite;
}

.menu-item:active .menu-icon {
  transform: scale(0.95);
}

.menu-item:active .menu-item-background {
  transform: scale(0.95);
  background: rgba(30, 58, 138, 0.5);
}

.menu-item:active .menu-item-glow {
  opacity: 0.8;
  transform: scale(0.95);
}

@keyframes iconPulse {
  0% {
    text-shadow: 0 0 20px rgba(96, 165, 250, 0.8);
  }
  50% {
    text-shadow: 0 0 30px rgba(96, 165, 250, 0.6);
  }
  100% {
    text-shadow: 0 0 20px rgba(96, 165, 250, 0.8);
  }
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0.5rem 1rem;
}

/* Tooltip styles remain the same */
.tooltip {
  --tooltip-bg: rgba(30, 58, 138, 0.95);
  position: fixed;
  background: var(--tooltip-bg);
  color: white;
  padding: 0.1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1000;
  transform: translateY(-50%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(30, 58, 138, 0.3),
              0 0 40px rgba(30, 58, 138, 0.2),
              0 0 60px rgba(30, 58, 138, 0.1);
  animation: tooltipAppear 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.tooltip::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-style: solid;
  border-width: 6px 6px 6px 0;
  border-color: transparent var(--tooltip-bg) transparent transparent;
}

.tooltip-content {
  display: block;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
  border-radius: 0.4rem;
  transform-origin: left;
  animation: contentAppear 0.3s ease forwards;
}

@keyframes tooltipAppear {
  0% {
    opacity: 0;
    transform: translateY(-50%) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
}

@keyframes contentAppear {
  0% {
    opacity: 0;
    transform: scaleX(0);
  }
  100% {
    opacity: 1;
    transform: scaleX(1);
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 60px;
  }

  .menu-item {
    font-size: 1.25rem;
    padding: 1rem 0;
  }
}
</style>
