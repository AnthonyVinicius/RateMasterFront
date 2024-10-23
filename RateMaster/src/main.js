import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

//Css do boostrap
import 'bootstrap/dist/css/bootstrap.css';
// Importar o JavaScript do Bootstrap e o Popper.js
import 'bootstrap/dist/js/bootstrap.bundle';
