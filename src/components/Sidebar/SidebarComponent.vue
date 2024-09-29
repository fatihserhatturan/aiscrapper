<template>
    <div class="sidebar">
      <ul>
        <li>Page Base Document</li>
        <li>Scenario Document</li>
      </ul>
    </div>
  </template>

  <script>
  export default {
    name: 'SidebarComponent'
  };
  </script>

  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Handjet:wght@100..900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'); /* Add a retro font */

  /* Transparent background with a gradient */
  .sidebar {
    font-family: 'Handjet', sans-serif;
    width: 15%;
    height: calc(100vh - 50px);
    background: linear-gradient(135deg, rgba(52, 73, 94, 0.7), rgba(255, 0, 150, 0.7));
    border: 2px solid #ff00aa; /* Bright punk-style border */
    box-shadow: 0px 0px 15px rgba(255, 0, 150, 0.7); /* Retro glowing effect */
    color: #fff;
    position: fixed;
    left: 0;
    top: 50px;
    padding: 40px 20px; /* Extra padding from the top */
    transition: background 0.5s ease-in-out, border 0.5s ease-in-out;
    backdrop-filter: blur(10px); /* Make the background slightly blurry */
    font-family: 'Press Start 2P', cursive; /* Add retro font */
  }

  /* Hover effect for a more interactive feel */
  .sidebar:hover {
    background: linear-gradient(135deg, rgba(52, 152, 219, 0.8), rgba(155, 89, 182, 0.8));
    border-color: #1abc9c;
  }

  /* Styling the list items with retro colors */
  ul {
    list-style: none;
    padding: 0;
    margin-top: 70px; /* Add margin from the top */
  }

  li {
    margin-bottom: 30px; /* Increase space between items */
    font-size: 0.8em;
    letter-spacing: 2px;
    text-shadow: 2px 2px 0px #ff00aa, -2px -2px 0px #00ffcc; /* Punk-style shadow */
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    white-space: pre-wrap; /* Ensure words wrap to the next line */
  }

  /* Add interaction effect when hovered */
  li:hover {
    transform: scale(1.1);
    color: #00ffcc;
    text-shadow: 3px 3px 5px #000;
  }
  </style>
