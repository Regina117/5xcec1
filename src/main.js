import 'primeflex/primeflex.css';
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import PrimeVue from 'primevue/config';
import AnimateOnScroll from 'primevue/animateonscroll';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import ConfirmationService from 'primevue/confirmationservice';
import ContextMenu from 'primevue/contextmenu';
import DataTable from 'primevue/datatable';
import DataView from 'primevue/dataview';
import DialogService from 'primevue/dialogservice';
import FocusTrap from 'primevue/focustrap';
import IconField from 'primevue/iconfield';
import Image from 'primevue/image';
import InputText from 'primevue/inputtext';
import StyleClass from 'primevue/styleclass';
import ToastService from 'primevue/toastservice';

const app = createApp(App);

app.use(PrimeVue, { ripple: true });
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);
app.use(router);

app.directive('styleclass', StyleClass);
app.directive('focustrap', FocusTrap);
app.directive('animateonscroll', AnimateOnScroll);
app.component('Button', Button);
app.component('Calendar', Calendar);
app.component('Card', Card);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('ContextMenu', ContextMenu);
app.component('DataTable', DataTable);
app.component('DataView', DataView);
app.component('IconField', IconField);
app.component('Image', Image);
app.component('InputText', InputText);

app.mount('#app');
