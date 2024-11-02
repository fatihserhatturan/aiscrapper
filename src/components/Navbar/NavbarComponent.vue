<template>
  <nav class="navbar">
    <div class="logo-container flex items-center gap-3">
      <div class="logo-wrapper">
        <img src="@/assets/logostalker.png" alt="Logo" class="logo">
        <div class="logo-glow"></div>
        <div class="logo-particles">
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap');

.navbar {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(
    to right,
    rgba(29, 78, 216, 0.85),
    rgba(30, 64, 175, 0.85)
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 0.75rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  position: fixed;
  width: 100%;
  height: 64px;
  z-index: 50;
  backdrop-filter: blur(8px);
}

.logo-container {
  position: relative;
  display: flex;
  align-items: center;
}

.logo-wrapper {
  position: relative;
  background: white;
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo {
  width: 140px;
  height: auto;
  mix-blend-mode: multiply;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

/* Logo Hover Efektleri */
.logo-wrapper:hover {
  transform: translateY(-2px) scale(1.02);
}

.logo-wrapper:hover .logo {
  transform: scale(1.05);
  filter: brightness(1.1);
}

/* Glow Efekti */
.logo-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center,
    rgba(96, 165, 250, 0),
    rgba(96, 165, 250, 0)
  );
  transition: all 0.5s ease;
  z-index: 1;
}

.logo-wrapper:hover .logo-glow {
  background: radial-gradient(circle at center,
    rgba(96, 165, 250, 0.3),
    rgba(96, 165, 250, 0)
  );
  transform: scale(1.5);
}

/* Parçacık Animasyonu */
.logo-particles span {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #60a5fa;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  z-index: 1;
}

.logo-wrapper:hover .logo-particles span {
  animation: particle-animation 0.8s ease-out forwards;
}

.logo-particles span:nth-child(1) { top: 20%; left: 20%; }
.logo-particles span:nth-child(2) { top: 20%; right: 20%; animation-delay: 0.1s; }
.logo-particles span:nth-child(3) { bottom: 20%; left: 20%; animation-delay: 0.2s; }
.logo-particles span:nth-child(4) { bottom: 20%; right: 20%; animation-delay: 0.3s; }
.logo-particles span:nth-child(5) { top: 50%; left: 10%; animation-delay: 0.4s; }
.logo-particles span:nth-child(6) { top: 50%; right: 10%; animation-delay: 0.5s; }

@keyframes particle-animation {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(
      calc(var(--direction-x, 1) * 50px),
      calc(var(--direction-y, 1) * 50px)
    ) scale(0);
    opacity: 0;
  }
}

.logo-particles span:nth-child(odd) { --direction-x: 1; --direction-y: 1; }
.logo-particles span:nth-child(even) { --direction-x: -1; --direction-y: -1; }

/* Diğer stiller aynı kalacak */
.brand-name {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-left: 1rem;
}

.nav-button {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;
  background: transparent;
  border: none;
  position: relative;
}

.nav-button::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  background: #60a5fa;
  transition: all 0.3s ease-in-out;
  transform: translateX(-50%);
}

.nav-button:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

.nav-button:hover::after {
  width: 80%;
}

.nav-button:active {
  transform: translateY(1px);
}

@media (max-width: 640px) {
  .navbar {
    padding: 0.75rem 1rem;
  }

  .logo {
    width: 100px;
  }

  .logo-wrapper {
    padding: 0.25rem;
  }

  .nav-button {
    padding: 0.5rem 0.75rem;
    font-size: 0.813rem;
  }

  .brand-name {
    font-size: 1.25rem;
  }
}
</style>
