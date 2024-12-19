//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/styles/tailwind.css'
import './assets/styles/fonts.css'
import 'vue-toastification/dist/index.css'; 
import App from './App.vue'
import Toast from 'vue-toastification'; // Убедитесь, что этот импорт правильный
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

// Создаём приложение Vue
const app = createApp(App)

// Используем плагины и библиотеки
app.use(createPinia()) // Pinia
app.use(Toast, { /* options для Toast */ }) // Toastification
app.use(VCalendar, {})

// Монтируем приложение в элемент с id="app"
app.mount('#app')
