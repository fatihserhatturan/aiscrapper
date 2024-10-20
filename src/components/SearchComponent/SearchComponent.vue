<template>
  <div class="ai-analysis-component">
    <div class="galaxy-background"></div>
    <transition name="fade" mode="out-in">
      <div v-if="!isVisible" key="intro" class="intro-content">
        <h1 class="intro-title">AI-Powered Document Analysis</h1>
        <p class="intro-text">
          Welcome to our cutting-edge AI Document Analysis tool. Harness the power of advanced artificial intelligence to generate comprehensive, detailed, and business-oriented documentation for any webpage. Our state-of-the-art AI doesn't just scrape the surface; it delves deep into the structure, content, and functionality of web pages to produce unparalleled insights.
        </p>
        <p class="intro-text">
          Whether you're a developer seeking to understand a competitor's site architecture, a UX designer looking for inspiration, or a business analyst requiring in-depth website documentation, our tool delivers results that exceed expectations. Experience the future of web analysis - where accuracy meets efficiency, and depth meets clarity.
        </p>
      </div>
      <div v-else key="analysis" class="analysis-content">
        <h1 class="title">AI Analysis in Progress</h1>
        <div class="steps-container">
          <div v-for="(text, index) in textAreas" :key="index" class="typewriter-container">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="text-content">
              <div class="typewriter-text" :class="{ 'completed': text.isCompleted }">
                {{ text.displayText }}
                <span v-if="text.isTyping" class="cursor">|</span>
              </div>
              <div v-if="text.isLoading" class="loading-animation">
                <div class="spinner"></div>
              </div>
              <div v-if="text.isCompleted" class="completion-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tick-icon">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import emitter from '../../eventBus'; // Ensure this path is correct

export default {
  name: 'AIAnalysisComponent',
  data() {
    return {
      isVisible: false,
      textAreas: [
        { fullText: 'Examining all elements, events, and event components on the page...', displayText: '', isTyping: false, isLoading: false, isCompleted: false },
        { fullText: 'Listening to all network events and performing detailed analysis of network traffic...', displayText: '', isTyping: false, isLoading: false, isCompleted: false },
        { fullText: 'Capturing a high-resolution screenshot of the page...', displayText: '', isTyping: false, isLoading: false, isCompleted: false },
        { fullText: 'Configuring and executing Lighthouse performance report...', displayText: '', isTyping: false, isLoading: false, isCompleted: false },
        { fullText: 'Aggregating all data and generating a comprehensive report as per your specifications...', displayText: '', isTyping: false, isLoading: false, isCompleted: false }
      ],
      typingSpeed: 80,
      delayBetweenTexts: 1000,
    };
  },
  mounted() {
    emitter.on('inspectionStarted', this.toggleVisibility);
  },
  beforeUnmount() {
    emitter.off('inspectionStarted', this.toggleVisibility);
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
      if (this.isVisible) {
        this.$nextTick(() => {
          this.startAllTypewriters();
        });
      } else {
        this.resetTypewriters();
      }
    },
    startAllTypewriters() {
      this.textAreas.forEach((text, index) => {
        setTimeout(() => {
          this.startTypewriter(index);
        }, index * (this.calculateTypingDuration(text.fullText) + this.delayBetweenTexts));
      });
    },
    startTypewriter(index) {
      const text = this.textAreas[index];
      text.isTyping = true;
      text.isLoading = true;
      let i = 0;
      const typeNextLetter = () => {
        if (i < text.fullText.length) {
          text.displayText += text.fullText.charAt(i);
          i++;
          setTimeout(typeNextLetter, this.typingSpeed);
        } else {
          this.finishTyping(index);
        }
      };
      typeNextLetter();
    },
    finishTyping(index) {
      const text = this.textAreas[index];
      text.isTyping = false;
      text.isLoading = false;
      text.isCompleted = true;
    },
    calculateTypingDuration(text) {
      return text.length * this.typingSpeed;
    },
    resetTypewriters() {
      this.textAreas.forEach(text => {
        text.displayText = '';
        text.isTyping = false;
        text.isLoading = false;
        text.isCompleted = false;
      });
    },
  },
};
</script>

<style scoped>
.ai-analysis-component {
  position: relative;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
  color: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.galaxy-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, #1a1a2e, #16213e, #0f3460);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  z-index: -1;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.intro-content, .analysis-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Changed from center to flex-start */
  align-items: center;
  padding: 40px;
  overflow-y: auto;
}

.intro-title, .title {
  font-size: 2.5em;
  margin-top: 20px; /* Added margin-top */
  margin-bottom: 30px;
  color: #61dafb;
  text-shadow: 0 0 10px rgba(97, 218, 251, 0.7);
  text-align: center;
}

.intro-text-container {
  max-width: 800px;
  width: 100%;
}

.intro-text {
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: justify;
}

.steps-container {
  width: 100%;
  max-width: 800px;
}

.typewriter-container {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.typewriter-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.step-number {
  font-size: 1.2em;
  font-weight: bold;
  color: #61dafb;
  margin-right: 12px;
  min-width: 20px;
}

.text-content {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.typewriter-text {
  font-size: 0.9em;
  line-height: 1.4;
  opacity: 0.9;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 0.9em;
  background-color: #ffffff;
  animation: blink 0.7s infinite;
  margin-left: 2px;
}

@keyframes blink {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

.loading-animation {
  margin-left: 8px;
}

.spinner {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #61dafb;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.completion-icon {
  margin-left: 8px;
  animation: popIn 0.5s cubic-bezier(0.26, 0.53, 0.74, 1.48);
}

@keyframes popIn {
  0% { transform: scale(0); }
  80% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.tick-icon {
  width: 16px;
  height: 16px;
  color: #4CAF50;
}

.completed {
  color: #61dafb;
  text-shadow: 0 0 5px rgba(97, 218, 251, 0.5);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
