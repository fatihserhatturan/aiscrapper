import { defineComponent } from 'vue';
import emitter from '../../eventBus';

export default defineComponent({
  name: 'AIAnalysisComponent',
  data() {
    return {
      isVisible: false,
      buttonVisible: false,
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
    emitter.on('inspectionFinished', this.toggleButton);
  },
  beforeUnmount() {
    emitter.off('inspectionStarted', this.toggleVisibility);
    emitter.off('inspectionFinished', this.toggleButton);
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
    toggleButton() {
      this.buttonVisible = true;
      this.textAreas[this.textAreas.length - 1].isCompleted = true;
    },
    startAllTypewriters() {
      this.textAreas.forEach((text, index) => {
        setTimeout(() => {
          this.startTypewriter(index);
        }, index * (this.calculateTypingDuration(text.fullText) + this.delayBetweenTexts));
      });
    },
    startTypewriter(index : number) {
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
    finishTyping(index :number) {
      const text = this.textAreas[index];
      text.isTyping = false;
      text.isLoading = false;
      text.isCompleted = index !== this.textAreas.length - 1 || this.buttonVisible;
    },
    calculateTypingDuration(text : string) {
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
    showDocument() {
      
      console.log('Show document clicked');
    },
  },
});
