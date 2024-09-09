<template>
  <div class="homeview">
    <div class="frame">
      <div class="component-container left-container">
        <OtherPage />
      </div>
      <div class="component-container right-container">
        <SearchComponent />
      </div>
    </div>
  </div>
</template>

<script>
import OtherPage from '../components/OtherPage/OtherPage.vue';
import SearchComponent from '../components/SearchComponent.vue';

export default {
  name: 'HomeView',
  components: {
    OtherPage,
    SearchComponent,
  },
};
</script>

<style scoped>
.homeview {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.frame {
  position: relative;
  width: 80%;
  height: 80%;
  border-radius: 16px;
  border-collapse: separate;
  border: 2px solid transparent;
  border-image: linear-gradient(135deg, rgb(205, 87, 87), rgb(208, 190, 156)) 1;
  background: transparent;
  display: flex;
  overflow: hidden; /* Ensure contents don't overflow the frame */
}

.component-container {
  flex: 1; /* Each container takes up 50% of the frame */
  display: flex;
  justify-content: center;
  align-items: center;
  /* Add these styles to ensure the content inside is centered */
}

.left-container {
  border-right: 2px solid rgb(234, 60, 25); /* Add a right border to separate the two components */;
  box-sizing: border-box; /* Include border in width/height calculations */
}

.right-container {
  box-sizing: border-box; /* Include border in width/height calculations */
}
</style>
