<template>
    <div class="scenarioview">
      <div class="frame">
        <div class="component-container left-container">
          <ScenarioInspect />

        </div>
        <div class="component-container right-container">
          <ScenarioDocument />

        </div>
      </div>
    </div>
  </template>

  <script>
   import ScenarioInspect from '../components/ScenarioInspect/ScenarioInspectComponent.vue';
  import ScenarioDocument from '../components/ScenarioDocument/ScenarioDocumentComponent.vue';

  export default {
    name: 'ScenarioView',
    components: {
      ScenarioInspect,
      ScenarioDocument,
    },
  };
  </script>

  <style scoped>
  .scenarioview {
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
    border-image: linear-gradient(135deg, rgb(18, 20, 158), rgb(33, 109, 175)) 1;
    background: transparent;
    display: flex;
    overflow: hidden;
  }

  .component-container {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .left-container {
    border-right: 2px solid rgb(18, 20, 158);
    box-sizing: border-box;
  }

  .right-container {
    box-sizing: border-box;
  }
  </style>
