import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OtherPage',
  data() {
    return {
      isExpanded: false, // Card expansion state
      iframeUrlInput: '', // Input field for the URL
      currentIframeUrl: '', 

    };
  },
  methods: {
    toggleCard() {
      this.isExpanded = !this.isExpanded;
    },
    loadIframe() {
      if (this.iframeUrlInput) {
        this.currentIframeUrl = this.iframeUrlInput;
      }
    },
    InspectURL() {
      const url = this.currentIframeUrl;
      console.log(url);
    },
  },
});