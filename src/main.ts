import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

// Toast Import
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faExpand,
    faCompress,
    faClapperboard,
    faPager,
    faEye,
    faMagnifyingGlass,
    faFileWord,
    faPrint,
    faPlus,
    faMinus,
    faBold,
    faItalic,
    faUnderline,
    faPalette,
    faBook,
    faInfoCircle,
    faWandMagicSparkles,
    faMoon,
    faSun,
    faFilePdf,
    faDisplay,
    faEdit,
    faFilePen,
    faCode,
    faList,
    faFileExport,
    faRotate,
} from '@fortawesome/free-solid-svg-icons'

// Toast Options
const toastOptions = {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
}

// Font Awesome library
library.add(
    faExpand,
    faCompress,
    faClapperboard,
    faPager,
    faEye,
    faMagnifyingGlass,
    faFileWord,
    faPrint,
    faPlus,
    faMinus,
    faBold,
    faItalic,
    faUnderline,
    faPalette,
    faBook,
    faInfoCircle,
    faWandMagicSparkles,
    faMoon,
    faSun,
    faFilePdf,
    faDisplay,
    faFilePen,
    faCode,
    faList,
    faFileExport,
    faRotate
)

const app = createApp(App)

// Register global components and plugins
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(Toast, toastOptions)

app.mount('#app')
