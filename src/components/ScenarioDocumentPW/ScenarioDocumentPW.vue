
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
                        <button @click="startCodegen" class="action-button" v-if="testUrlInput.length > 0">
                            <span class="button-content">
                                <span class="button-icon"><font-awesome-icon :icon="['fas', 'eye']" /></span>
                                <span>Test Başlat</span>
                            </span>
                        </button>
                    </div>
                </div>

                <h2 class="code-title">Test Kodları</h2>

                <textarea
                    v-model="largeData"
                    placeholder="Lütfen hazır olan Playwright kodlarını buraya yapıştırınız."
                    class="large-textarea"
                ></textarea>

                <div class="inspect-section" v-if="largeData.length > 0">
                    <button @click="startPrepareCode" class="action-button inspect-button">
                        <span class="button-content">
                        <span class="button-icon"><font-awesome-icon :icon="['fas', 'magnifying-glass']" beat /></span>
                        <span>Kodu İşle</span>
                        </span>
                    </button>
                </div>

                    <div v-if="showModal" class="modal-overlay" @click="closeModal">
                        <div class="modal-content" @click.stop>
                            <img :src="currentImage" alt="Enlarged Screenshot" class="modal-image" />
                            <button class="close-button" @click="closeModal">Kapat</button>
                        </div>
                    </div>

        </div>

        <div class="page-viewer">


            <h2 class="code-title">Ekran Görüntüleri</h2>
                    <p v-if="screenshots.length == 0"> Test sonucunda oluşan ekran görüntüleri burada yer alacaktır.</p>
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


                <div v-if="screenshots.length > 0" class="inspect-section">
                    <button @click="startAntropic" class="action-button inspect-button">
                        <span class="button-content">
                        <span class="button-icon"><font-awesome-icon :icon="['fas', 'magnifying-glass']" beat /></span>
                        <span>Döküman Oluştur</span>
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
                    <button @click="exportToDocx" class="action-button export-button">
                        <span class="button-content">
                            <span class="button-icon"><font-awesome-icon :icon="['fas', 'file-export']" /></span>
                            <span>Dokümanı İndir</span>
                        </span>
                    </button>
                    <button @click="exportToDocx" class="action-button export-button">
                        <span class="button-content">
                            <span class="button-icon"><font-awesome-icon :icon="['fas', 'rotate']" /></span>
                            <span>Azure ile eşitle</span>
                        </span>
                    </button>
                </div>



        </div>
        <div v-if="loadingTestScreen" class="loading-spinner">
        <!-- Simple CSS spinner -->
            <div class="spinner"></div>
            <h2>Test başlatıldı.</h2>
            <h2>Lütfen herhangi bir yere tıklamayınız.</h2>

        </div>

        <div v-if="loadingAws" class="loading-spinner">
        <!-- Simple CSS spinner -->
            <div class="spinner"></div>
            <h2>Doküman oluşturuluyor</h2>
        </div>
      </div>
    </div>
</template>

<script>
import ScenarioDocumentPW from './ScenarioDocumentPW.ts';
export default ScenarioDocumentPW;
import './ScenarioDocumentPW.css';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap');

</style>
