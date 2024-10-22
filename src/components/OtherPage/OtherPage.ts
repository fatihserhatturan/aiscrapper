import { defineComponent } from 'vue';
import { scrapePage } from '../../BaseFunctions/ScrapStart';
import emitter from '../../eventBus';

export default defineComponent({
  name: 'OtherPage',
  data() {
    return {
      isExpanded: false,
      iframeUrlInput: '',
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
    async InspectURL() {
      const url = this.currentIframeUrl;
      emitter.emit('inspectionStarted', true);
      const scrapedContent = await scrapePage(url);
      console.log('Scraped content:', scrapedContent);
      //const documentId = scrapedContent?.documentId;

      if (scrapedContent != null) {
        emitter.emit('inspectionFinished');
      }

    },
  },
});
