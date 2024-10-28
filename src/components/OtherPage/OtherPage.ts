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
      const scrapedContentId = await scrapePage(url);
      console.log('Scraped content:', scrapedContentId);

      if (scrapedContentId != null) {
        console.log('inspectionFinished');
        emitter.emit('inspectionFinished', scrapedContentId);
      }

    },
  },
});
