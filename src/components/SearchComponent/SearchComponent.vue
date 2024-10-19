<template>
  <div class="search-component">
    <div class="galaxy-background"></div>
    <div class="content-wrapper">
      <h1 class="title">AI Analysis</h1>
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
  </div>
</template>

<script>
export default {
  name: 'SearchComponent',
  data() {
    return {
      textAreas: [
        { fullText: 'All elements, events and event components on the page are examined...', displayText: '', isTyping: false, isLoading: false, isCompleted: false },
        { fullText: 'I listen to all network events on the page and perform detailed analysis of network traffic', displayText: '', isTyping: false, isLoading: false, isCompleted: false },
        { fullText: 'Taking a screenshot of the page', displayText: '', isTyping: false, isLoading: false, isCompleted: false },
        { fullText: 'Configuring the request to obtain the Lighthouse performance report', displayText: '', isTyping: false, isLoading: false, isCompleted: false },
        { fullText: 'All data obtained is combined and a report is generated as per your request.', displayText: '', isTyping: false, isLoading: false, isCompleted: false }
      ],
      typingSpeed: 50,
      delayBetweenTexts: 500,
    };
  },
  mounted() {
    this.startAllTypewriters();
  },
  methods: {
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
  },
};
</script>

<style scoped>
.search-component {
  position: relative;
  height: 100%;
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

.content-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;
}

.title {
  text-align: center;
  font-size: 1.8em;
  margin-bottom: 20px;
  color: #61dafb;
  text-shadow: 0 0 10px rgba(97, 218, 251, 0.7);
}

.steps-container {
  flex-grow: 1;
  overflow-y: auto;
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
</style>
