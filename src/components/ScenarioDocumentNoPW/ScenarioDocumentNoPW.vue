<template>
    <div class="homeview">
      <div class="frame">
        <div class="page-viewer">
          <!-- Search Section -->
          <div class="search-section">
            <div class="search-container">
              <input
                type="text"
                v-model="testUrlInput"
                placeholder="Test başlatmak istediğiniz sayfanın adresini giriniz."
                class="search-input"
              />
              <button @click="startLogging" class="action-button" v-if="testUrlInput.length > 0">
                <span class="button-content">
                  <span class="button-icon"><font-awesome-icon :icon="['fas', 'eye']" /></span>
                  <span>Test Başlat</span>
                </span>
              </button>
            </div>
          </div>

          <h2 class="code-title">Ekran Görüntüleri</h2>
          <p v-if="screenshots.length == 0">Test sonucunda oluşan ekran görüntüleri burada yer alacaktır.</p>
          <div v-if="screenshots.length > 0" class="screenshots-container">
            <div v-for="(screenshot, index) in screenshots" :key="index">
              <img
                :src="screenshot"
                alt="Screenshot"
                class="screenshot-image"
                @click="openModal(screenshot)"
              />
            </div>
          </div>

          <div v-if="showModal" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
              <img :src="currentImage" alt="Enlarged Screenshot" class="modal-image" />
              <button class="close-button" @click="closeModal">Kapat</button>
            </div>
          </div>
        </div>

        <div class="page-viewer">
          <h2 class="code-title">Tutulan Kullanıcı Etkileşim Logları</h2>
          <textarea
            v-model="largeData"
            placeholder="Buraya log kayıtları gelecektir."
            class="large-textarea"
          ></textarea>

          <div v-if="screenshots.length > 0" class="inspect-section">
            <button @click="startAntropic" class="action-button inspect-button">
              <span class="button-content">
                <span class="button-icon"><font-awesome-icon :icon="['fas', 'magnifying-glass']" beat /></span>
                <span>Doküman Oluştur</span>
              </span>
            </button>
          </div>
        </div>

        <div class="page-viewer">
          <h2 class="code-title">Doküman</h2>
          <textarea
            v-model="scenarioResultData"
            placeholder="Oluşan kullanım senaryosu dökümanı burada yer alacaktır."
            class="large-textarea"
          ></textarea>

          <div v-if="scenarioResultData.length > 0" class="export-button-container">
            <div class="button-group">
              <button @click="exportToDocx" class="action-button export-button">
                <span class="button-content">
                  <span class="button-icon">
                    <font-awesome-icon :icon="['fas', 'file-export']" />
                  </span>
                  <span>Dokümanı İndir</span>
                </span>
              </button>

              <div class="azure-group">
                <input
                type="text"
                class="azure-input"
                placeholder="dosya yolu veya id girin"
                v-model="pageId"
              />
                <button @click="fetchAzure" class="action-button export-button">
                  <span class="button-content">
                    <span class="button-icon">
                      <font-awesome-icon :icon="['fas', 'rotate']" />
                    </span>
                    <span>eşitle</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="loadingTestScreen" class="loading-spinner">
          <div class="spinner"></div>
          <h2>Test başlatıldı.</h2>
          <h2>Lütfen testlerinizi gerçekleştiriniz.</h2>
        </div>

        <div v-if="loadingAws" class="loading-spinner">
          <div class="spinner"></div>
          <h2>Doküman oluşturuluyor</h2>
        </div>
      </div>
    </div>
  </template>

<script>
import ScenarioDocumentNoPW from './ScenarioDocumentNoPW.ts';
export default ScenarioDocumentNoPW;
import './ScenarioDocumentNoPW.css';
</script>

  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap');

  .homeview {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
  }

  .frame {
    position: relative;
    width: 80%;
    height: auto;
    border-radius: 16px;
    border-collapse: separate;
    border: 2px solid transparent;
    border-image: linear-gradient(135deg, rgb(18, 20, 158), rgb(33, 109, 175)) 1;
    background: transparent;
    display: flex;
    overflow: hidden;
  }

  .page-viewer {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
    height: auto;
    width: 100%;
    background: linear-gradient(
      135deg,
      rgba(30, 58, 138, 0.05),
      rgba(29, 78, 216, 0.1)
    );
  }

  .code-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left;
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
    background: linear-gradient(135deg, #1e3a8a, #3b82f6);
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

  .large-textarea {
    width: 100%;
    height: 600px;
    padding: 15px;
    border-radius: 5px;
    border: 2px solid #ccc;
    margin-top: 10px;
    resize: vertical;
  }

  .screenshots-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .screenshot-image {
    width: 200px;
    cursor: pointer;
    z-index: 1;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }

  .screenshot-image:hover {
    transform: scale(1.05);
  }

  .loading-spinner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    flex-direction: column;
    gap: 1rem;
  }

  .spinner {
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #1e3a8a;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
  }

  .export-button-container {
    margin-top: 1rem;
  }

  .button-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .azure-group {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .azure-input {
    flex: 1;
    height: 3rem;
    padding: 0 1.5rem;
    border: 1px solid rgba(30, 58, 138, 0.2);
    border-radius: 1rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .search-container {
      flex-direction: column;
    }

    .action-button {
      width: 100%;
    }

    .azure-group {
      flex-direction: column;
    }

    .frame {
      width: 95%;
      flex-direction: column;
    }
  }
  </style>
