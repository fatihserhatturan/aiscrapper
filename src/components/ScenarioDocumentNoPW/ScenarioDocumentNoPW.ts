import { defineComponent } from 'vue';
import emitter from '../../eventBus';
import { StartLogging } from '@/BaseFunctions/StartLogging';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { StartAnthropicForLogs } from '@/BaseFunctions/StartAnthropicForLogs';


export default defineComponent({
  name: 'ScenarioDocumentNoPW',
  data() {
    return {
      largeData: '' ,
      testUrlInput: '',
      screenshots:  [] as string[],
      showModal: false,
      currentImage: '' ,
      scenarioResultData : '',
      loadingTestScreen: false, 
      loadingAws: false
      
    };
  },
  methods: {
    async startLogging(){
        this.largeData = ''; 
        this.screenshots = [];
        this.scenarioResultData = '';
        const url = this.testUrlInput;
        this.loadingTestScreen = true;
        emitter.emit('loggingStarted', true);
        try{
            const response = await StartLogging(url);
            this.screenshots = response.screenshots;
            this.largeData = response.result;
            emitter.emit('loggingStarted');
            
        }catch(error){
            console.error('Log kayıtları sırasında hata oluştu:', error);
        }finally {
            this.loadingTestScreen = false; // Hide loading spinner
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
      async startAntropic(){
        this.loadingAws = true;
        emitter.emit('awsStarted', true);
        try{
            const antResult = await StartAnthropicForLogs();
            
            if(antResult.success){
                this.scenarioResultData = antResult.data;
            }else{
                this.scenarioResultData = antResult.data;
            }
      
            if (antResult != null) {
              emitter.emit('awsFinished');
            }
        }catch(error){
            console.error('Aws Anthopic model sırasında hata oluştu:', error);
        }finally {
            this.loadingAws = false; // Hide loading spinner
          }
        
      },
      async exportToDocx() {
        // Create a new document with an initial section
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [new TextRun(this.scenarioResultData)]
                        })
                    ]
                }
            ]
        });

        // Create and download the .docx file
        const blob = await Packer.toBlob(doc);
        saveAs(blob, 'Dokuman.docx');
    }
    
  
  },
});
