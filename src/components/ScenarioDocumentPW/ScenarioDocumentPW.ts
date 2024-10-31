import { defineComponent } from 'vue';
import emitter from '../../eventBus';
import { StartAnthropic } from '@/BaseFunctions/StartAnthropic';
import { StartCodegen } from '@/BaseFunctions/StartCodegen';
import { PrepareCode } from '@/BaseFunctions/PrepareCode';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export default defineComponent({
  name: 'ScenarioDocumentPW',
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
    async startCodegen(){
        this.largeData = ''; 
        this.screenshots = [];
        this.scenarioResultData = '';
        const url = this.testUrlInput;
        this.loadingTestScreen = true;
        emitter.emit('codegenStarted', true);
        try{
            await StartCodegen(url);
            emitter.emit('codegenFinished');
            
        }catch(error){
            console.error('Codegen sırasında hata oluştu:', error);
        }finally {
            this.loadingTestScreen = false; // Hide loading spinner
        }
        
  
    },
    async startPrepareCode(){
        this.loadingTestScreen = true;
        this.screenshots = [];
        this.scenarioResultData = '';
        emitter.emit('codePreapeStarted', true);
        const code = this.largeData ;
        try{
            const codegenResult = await PrepareCode(code);
            this.screenshots = codegenResult.screenshots ?? []; // Ekran görüntülerini al
      
            if (codegenResult != null) {
              emitter.emit('codePreapeFinished');
            }
        }catch(error){
            console.error('Ekran görüntüsü alma sırasında hata oluştu:', error);
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
            const antResult = await StartAnthropic();
            
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
