<template>
  <div class="otherpage-container">
    <div class="searchbar-container">
      <input
        type="text"
        v-model="iframeUrlInput"
        placeholder="Enter a URL"
        class="p-2 pl-4 pr-12 w-96 text-gray-800 placeholder-gray-500 border-2 border-blue-900 rounded-full
               bg-white outline-none ring-0 transition-shadow duration-300 ease-in-out
               focus:shadow-lg focus:border-transparent focus:ring-2 focus:ring-blue-400 font-handjet text-lg font-bold"
      />

      <button
        @click="loadIframe"
        class="ml-7 px-4 py-2 w-32 text-gray-500 border-2 border-blue-900 rounded-full transition duration-300 ease-in-out font-handjet text-lg font-bold
        hover:bg-gradient-to-b hover:from-blue-100 hover:to-blue-900 hover:text-white"
      >
        View
      </button>
    </div>

    <div :class="['card', isExpanded ? 'expanded' : 'collapsed']">
      <button @click="toggleCard" class="expand-button">
        <font-awesome-icon :icon="isExpanded ? 'compress' : 'expand'" />
      </button>

      <div class="content">
        <iframe
          class="iframe-frame"
          :src="currentIframeUrl"
          title="Iframe Example"
          frameborder="0"
        ></iframe>

        <div class="bottom-text-container">
          <p class="bottom-text">Page View</p>
        </div>
      </div>
    </div>

    <div class="inspect-container">
      <button
        @click="InspectURL"
        class="ml-7 px-4 py-2 w-32 text-gray-500 border-2 border-blue-900 rounded-full transition duration-300 ease-in-out font-handjet text-lg font-bold
        hover:bg-gradient-to-b hover:from-blue-100 hover:to-blue-900 hover:text-white"
      >
        Inspect
      </button>
    </div>

  </div>
</template>

<script>
import OtherPage from './OtherPage.ts'; 
import '@/assets/style/OtherPage.css'; 
export default OtherPage;
</script>


