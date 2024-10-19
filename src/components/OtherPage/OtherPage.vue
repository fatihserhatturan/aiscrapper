<template>
  <div class="page-viewer">
    <!-- Search Section -->
    <div class="search-section">
      <div class="search-container">
        <input
          type="text"
          v-model="iframeUrlInput"
          placeholder="Enter URL to preview..."
          class="search-input"
        />
        <button @click="loadIframe" class="action-button">
          <span class="button-content">
            <span class="button-icon"><font-awesome-icon :icon="['fas', 'eye']" /></span>
            <span>View</span>
          </span>
        </button>
      </div>
    </div>

    <!-- Preview Card -->
    <div :class="['preview-card', { 'expanded': isExpanded }]">
      <button @click="toggleCard" class="expand-toggle">
        <font-awesome-icon
          :icon="isExpanded ? 'compress' : 'expand'"
          class="toggle-icon"
        />
      </button>

      <div class="preview-content">
        <iframe
          :src="currentIframeUrl"
          title="Page Preview"
          class="preview-frame"
          frameborder="0"
        ></iframe>

        <div class="preview-footer">
          <span class="preview-label">Page View</span>
        </div>
      </div>
    </div>

    <!-- Inspect Button Section -->
    <div class="inspect-section">
      <button @click="InspectURL" class="action-button inspect-button">
        <span class="button-content">
          <span class="button-icon"><font-awesome-icon :icon="['fas', 'magnifying-glass']" beat /></span>
          <span>Inspect</span>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import OtherPage from './OtherPage.ts';
export default OtherPage;
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap');

.page-viewer {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(30, 58, 138, 0.05),
    rgba(29, 78, 216, 0.1)
  );
}

.search-section {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}

.search-container {
  display: flex;
  gap: 1rem;
  align-items: center;
  max-width: 100%;
  width: 100%;
}

.search-input {
  flex: 1;
  height: 3rem;
  padding: 0 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #1e3a8a;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(30, 58, 138, 0.2);
  border-radius: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(8px);
}

.search-input:focus {
  background: #ffffff;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  outline: none;
}

.action-button {
  height: 3rem;
  padding: 0 1.5rem;
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  color: #1e3a8a;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(30, 58, 138, 0.2);
  border-radius: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
}

.action-button:hover {
  background: linear-gradient(
    135deg,
    #1e3a8a,
    #3b82f6
  );
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
  transform: translateY(-1px);
}

.button-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.button-icon {
  font-size: 1.1rem;
}

.preview-card {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  flex: 1;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(30, 58, 138, 0.1);
  display: flex;
  flex-direction: column;
}

.preview-card.expanded {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}

.expand-toggle {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(30, 58, 138, 0.2);
  color: #1e3a8a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.expand-toggle:hover {
  background: #1e3a8a;
  color: white;
  box-shadow: 0 2px 8px rgba(30, 58, 138, 0.2);
}

.preview-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.preview-frame {
  flex: 1;
  width: 100%;
  border-radius: 1rem 1rem 0 0;
  background: white;
}

.preview-footer {
  padding: 1rem;
  text-align: center;
  background: rgba(30, 58, 138, 0.02);
  border-top: 1px solid rgba(30, 58, 138, 0.1);
  border-radius: 0 0 1rem 1rem;
}

.preview-label {
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  color: #1e3a8a;
  font-size: 0.9rem;
}

.inspect-section {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}

.inspect-button {
  background: rgba(30, 58, 138, 0.05);
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
  }

  .action-button {
    width: 100%;
  }
}
</style>
