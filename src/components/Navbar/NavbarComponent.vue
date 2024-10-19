<template>
  <nav class="navbar">
    <div class="flex items-center gap-3">
      <img src="@/assets/logostalker.png" alt="Logo" class="logo">
      <h1 class="brand-name">STALKER</h1>
    </div>
    <div class="flex gap-4">
      <button class="nav-button">
        Home
      </button>
      <button class="nav-button">
        About
      </button>
      <button class="nav-button">
        Contact
      </button>
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
    rgba(29, 78, 216, 0.95),
    rgba(30, 64, 175, 0.95)
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

.brand-name {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, #ffffff 0%, #a5f3fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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

.logo {
  width: 32px;
  height: 32px;
  filter: brightness(0) invert(1);
  opacity: 0.9;
  transition: opacity 0.2s ease-in-out;
}

.logo:hover {
  opacity: 1;
}

@media (max-width: 640px) {
  .navbar {
    padding: 0.75rem 1rem;
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
