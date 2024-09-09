<template>
  <nav class="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 h-16 flex justify-between items-center px-4 w-full">
    <div class="flex items-center">
      <img src="@/assets/logostalker.png" alt="Logo" class="logo">
      <h1 class="brand-name">STALKER</h1>
    </div>
    <div>
      <button class="neon-button">
        Home
      </button>
      <button class="neon-button">
        About
      </button>
      <button class="neon-button">
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
@import url('https://fonts.googleapis.com/css2?family=Handjet:wght@100..900&display=swap');

nav {
  width: 100%;
  background-size: 400% 400%;
  animation: gradientAnimation 8s ease infinite;
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.neon-button {
  font-family: 'Poppins', sans-serif;
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  clip-path: polygon(15% 0, 85% 0, 100% 100%, 0% 100%);
  background-color: transparent;
  color: white;
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
  outline: none;
  cursor: pointer;
}

.neon-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 0 0 6px 6px;
}

.neon-button:hover::before {
  opacity: 1;
}

.neon-button:hover {
  transform: scale(1.05);
  color: #FFF;
  border-color: #FFF;
}

.logo {
  height: 60px; 
  width: auto;
  filter: brightness(0) invert(1); 
}

.brand-name {
  color: white;
  margin-left: 10px;
  font-family: "Handjet", sans-serif;
  font-size: 2.5rem; 
  font-weight: 400; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>

