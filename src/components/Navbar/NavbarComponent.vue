<template>
  <nav class="navbar">
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
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.navbar {
  font-family: 'Handjet', sans-serif;
  background: linear-gradient(135deg, rgba(52, 73, 94, 0.7), rgba(30, 0, 255, 0.7));
  border-bottom: 2px solid #ff00aa; /* Match sidebar's punk-style border */
  box-shadow: 0px 0px 15px rgba(255, 0, 150, 0.7); /* Glowing effect */
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  position: relative;
  width: 100%;
  height: 50px;
  font-family: 'Press Start 2P', cursive; /* Retro font */
}

.brand-name {
  margin-left: 10px;
  font-size: 1.5em;
  text-shadow: 2px 2px 0px #ff00aa, -2px -2px 0px #00ffcc; /* Punk-style shadow */
}

/* Button styles */
.neon-button {
  background-color: transparent;
  border: 2px solid #ff00aa;
  color: #fff;
  padding: 10px 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  text-shadow: 2px 2px 0px #ff00aa, -2px -2px 0px #00ffcc; /* Punk-style shadow */
  transition: transform 0.2s ease-in-out, background 0.5s ease-in-out, border 0.5s ease-in-out;
}

.neon-button:hover {
  background: rgba(52, 152, 219, 0.8);
  color: #00ffcc;
  border-color: #1abc9c;
  transform: scale(1.1);
  text-shadow: 3px 3px 5px #000;
}

/* Image logo styling */
.logo {
  width: 40px;
  height: 40px;
}

</style>
