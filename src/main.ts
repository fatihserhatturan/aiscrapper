import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faExpand, faCompress, faClapperboard,faPager, faEye, faMagnifyingGlass, faFileWord, faPrint, faPlus, faMinus, faBold, faItalic, faUnderline, faPalette, faBook, faInfoCircle, faWandMagicSparkles, faMoon, faSun, faFilePdf, faDisplay, faEdit, faFilePen, faCode, faList, faFileExport, } from '@fortawesome/free-solid-svg-icons';

// Kullanacağın ikonları kütüphaneye ekle
library.add(faExpand, faCompress, faClapperboard, faPager, faEye, faMagnifyingGlass, faFileWord, faPrint, faPlus, faMinus,faBold,faItalic,faUnderline,faPalette,faBook,faInfoCircle,faWandMagicSparkles,faMoon,faSun,faFilePdf,faDisplay,faFilePen,faCode,faList,faFileExport);

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.mount('#app')
