import { defineComponent } from 'vue';
import emitter from '../../eventBus';
import { StartLogging } from '@/BaseFunctions/StartLogging';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { StartAnthropicForLogs } from '@/BaseFunctions/StartAnthropicForLogs';
import { useToast } from 'vue-toastification';

// TypeScript için interface tanımı
interface ComponentData {
  largeData: string;
  testUrlInput: string;
  screenshots: string[];
  showModal: boolean;
  currentImage: string;
  scenarioResultData: string;
  loadingTestScreen: boolean;
  pageId: string;
  loadingAws: boolean;
}

export default defineComponent({
  name: 'ScenarioDocumentNoPW',

  setup() {
    const toast = useToast();
    return { toast };
  },

  data(): ComponentData {
    return {
      largeData: '',
      testUrlInput: '',
      screenshots: [],
      showModal: false,
      currentImage: '',
      scenarioResultData: '',
      loadingTestScreen: false,
      pageId: '',
      loadingAws: false
    };
  },

  methods: {
    async startLogging() {
      this.largeData = '';
      this.screenshots = [];
      this.scenarioResultData = '';
      const url = this.testUrlInput;
      this.loadingTestScreen = true;
      emitter.emit('loggingStarted', true);

      try {
        const response = await StartLogging(url);
        this.screenshots = response.screenshots;
        this.largeData = response.result;
        emitter.emit('loggingStarted');
        this.toast.success("Logging başarıyla tamamlandı!");
      } catch (error) {
        console.error('Log kayıtları sırasında hata oluştu:', error);
        this.toast.error("Log kayıtları sırasında hata oluştu!");
      } finally {
        this.loadingTestScreen = false;
      }
    },

    openModal(imageUrl: string) {
      this.showModal = true;
      this.currentImage = imageUrl;
    },

    closeModal() {
      this.showModal = false;
      this.currentImage = '';
    },

    async startAntropic() {
      this.loadingAws = true;
      emitter.emit('awsStarted', true);

      try {
        const antResult = await StartAnthropicForLogs();

        if (antResult.success) {
          this.scenarioResultData = antResult.data;
          this.toast.success("Anthropic işlemi başarılı!");
        } else {
          this.scenarioResultData = antResult.data;
          this.toast.warning("Anthropic işlemi tamamlandı ancak bazı sorunlar olabilir.");
        }

        if (antResult != null) {
          emitter.emit('awsFinished');
        }
      } catch (error) {
        console.error('Aws Anthropic model sırasında hata oluştu:', error);
        this.toast.error("Aws Anthropic model sırasında hata oluştu!");
      } finally {
        this.loadingAws = false;
      }
    },

    async exportToDocx() {
      try {
        const doc = new Document({
          sections: [{
            children: [
              new Paragraph({
                children: [new TextRun(this.scenarioResultData)]
              })
            ]
          }]
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, 'Dokuman.docx');
        this.toast.success("Doküman başarıyla indirildi!");
      } catch (error) {
        this.toast.error("Doküman oluşturulurken hata oluştu!");
      }
    },

    async fetchAzure() {
      try {
        const response = await axios.post('http://localhost:3006/api/wiki-id', {
          pageId: this.pageId,
          addedContent: this.scenarioResultData
        });

        this.toast.success("Veriler Azure'a başarıyla gönderildi!");
        console.log('Azure API response:', response.data);
      } catch (error) {
        this.toast.error(`Azure API hatası: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
        console.error('Azure API error:', error);
      }
    }
  },
});
