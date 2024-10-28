<template>
    <div class="page-viewer">
      <div class="editor-section">
        <div class="editor-container">
          <textarea
            v-model="documentContent"
            placeholder="Enter your text here..."
            class="text-editor"
          />
          <div class="button-group">
            <button @click="exportToWord" class="action-button">
              <span class="button-content">
                <span class="button-icon">
                  <font-awesome-icon :icon="['fas', 'file-word']" />
                </span>
                <span>Export to Word</span>
              </span>
            </button>
            <button @click="generateSummary" class="action-button">
              <span class="button-content">
                <span class="button-icon">
                  <font-awesome-icon :icon="['fas', 'wand-magic-sparkles']" />
                </span>
                <span>Generate Summary</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: 'ScenarioDocumentComponent',
    data() {
      return {
        documentContent: '',
      }
    },
    methods: {
      exportToWord() {
        const blob = new Blob([this.documentContent], { type: 'application/msword' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'document.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      generateSummary() {
        console.log('Generating summary for:', this.documentContent);
        alert('Summary generation feature coming soon!');
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
    padding: 2rem;
    min-height: 100vh;
    background: linear-gradient(
      135deg,
      rgba(30, 58, 138, 0.05),
      rgba(29, 78, 216, 0.1)
    );
  }

  .editor-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
  }

  .editor-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }

  .text-editor {
    width: 100%;
    min-height: 550px; /* Increased from 300px */
    padding: 2rem; /* Increased padding */
    font-family: 'Inter', sans-serif;
    font-size: 1rem; /* Slightly increased font size */
    line-height: 1.6;
    color: #1e3a8a;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(30, 58, 138, 0.2);
    border-radius: 1rem;
    resize: vertical;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(8px);
  }

  .text-editor:focus {
    background: #ffffff;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    outline: none;
  }

  .button-group {
    display: flex;
    gap: 1.5rem;
    justify-content: flex-end;
    padding: 0 1rem;
  }

  .action-button {
    height: 3.5rem;
    padding: 0 2rem;
    font-family: 'Outfit', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    color: #1e3a8a;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(30, 58, 138, 0.2);
    border-radius: 1rem;
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
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
    gap: 0.75rem;
  }

  .button-icon {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    .page-viewer {
      padding: 1rem;
    }

    .editor-section {
      width: 100%;
    }

    .button-group {
      flex-direction: column;
      padding: 0;
    }

    .action-button {
      width: 100%;
      min-width: unset;
    }

    .text-editor {
      min-height: 400px; 
      padding: 1.5rem;
    }
  }
  </style>
