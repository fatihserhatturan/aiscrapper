<template>
    <div class="page-viewer">
      <!-- Search Section -->
      <div class="search-section">
        <div class="search-container">
          <input
            type="text"
            v-model="inspectUrl"
            placeholder="Enter URL to inspect..."
            class="search-input"
          />
          <button @click="startInspect" class="action-button">
            <span class="button-content">
              <span class="button-icon">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
              </span>
              <span>Start Inspect</span>
            </span>
          </button>
        </div>
      </div>

      <!-- Instructions Section -->
      <div class="instructions-card">
        <div class="instructions-header">
          <span class="instructions-icon">
            <font-awesome-icon :icon="['fas', 'book']" />
          </span>
          <h2 class="instructions-title">How to Use URL Inspector</h2>
        </div>
        <div class="instructions-content">
          <div class="instruction-step">
            <span class="step-number">1</span>
            <p>Enter the complete URL of the webpage you want to inspect in the input field above. Make sure to include 'http://' or 'https://'.</p>
          </div>
          <div class="instruction-step">
            <span class="step-number">2</span>
            <p>Click the "Start Inspect" button to begin the inspection process. The system will analyze the provided URL.</p>
          </div>
          <div class="instruction-step">
            <span class="step-number">3</span>
            <p>Wait for the inspection results to appear. The analysis will show various aspects of the webpage including its structure and content.</p>
          </div>
          <div class="instruction-note">
            <span class="note-icon">
              <font-awesome-icon :icon="['fas', 'info-circle']" />
            </span>
            <p>Note: Make sure you have necessary permissions to inspect the target URL. Some websites may have restrictions on automated inspection.</p>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
import axios from 'axios';

export default {
  name: 'ScenarioInspectComponent',
  data() {
    return {
      inspectUrl: '',
      loading: false,
      error: null,
      result: null
    }
  },
  methods: {
    async startInspect() {
      if (!this.inspectUrl) {
        return;
      }

      this.loading = true;
      this.error = null;
      this.result = null;

      try {
        const response = await axios.post('http://localhost:3004/api/record', {
          url: this.inspectUrl
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('Inspection result:', response.data);

      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        console.error('Inspection failed:', error);
      } finally {
        this.loading = false;
      }
    }
  }
}
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

  /* Instructions Card Styles */
  .instructions-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(30, 58, 138, 0.1);
  }

  .instructions-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .instructions-icon {
    font-size: 1.5rem;
    color: #1e3a8a;
  }

  .instructions-title {
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 1.5rem;
    color: #1e3a8a;
    margin: 0;
  }

  .instructions-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .instruction-step {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background: #1e3a8a;
    color: white;
    border-radius: 0.5rem;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    flex-shrink: 0;
  }

  .instruction-step p {
    margin: 0;
    font-family: 'Inter', sans-serif;
    color: #1e293b;
    line-height: 1.6;
  }

  .instruction-note {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: rgba(30, 58, 138, 0.05);
    border-radius: 0.75rem;
    margin-top: 0.5rem;
  }

  .note-icon {
    color: #1e3a8a;
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  .instruction-note p {
    margin: 0;
    font-family: 'Inter', sans-serif;
    color: #1e293b;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    .search-container {
      flex-direction: column;
    }

    .action-button {
      width: 100%;
    }

    .instructions-card {
      padding: 1.5rem;
    }

    .instruction-step {
      align-items: flex-start;
    }
  }
  </style>
