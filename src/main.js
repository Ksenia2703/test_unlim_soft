import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import PrimeVue from 'primevue/config';
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

import 'primeicons/primeicons.css';
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import './style.css';

const app = createApp(App);
app.use(store)
   .use(router)
   .use(PrimeVue)
   .use(ConfirmDialog)
   .use(Toast)
   .use(Dialog)
   .use(Button)
   .use(ToastService)
   .use(ConfirmationService)

app.component('ConfirmDialog', ConfirmDialog);
app.component('MyDialog', Dialog);
app.component('MyToast', Toast);
app.component('MyButton', Button);

app.mount('#app');

