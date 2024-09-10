import { defineComponent } from 'vue';
import {scrapePage} from '../../BaseFunctions/ScrapStart';

export  default defineComponent({
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
      await scrapePage(url);
    },
  },
});
