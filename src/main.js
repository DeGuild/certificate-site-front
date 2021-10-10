import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import '@fontsource/poppins';
import '@fontsource/secular-one';
import VueSocialSharing from 'vue-social-sharing';

import App from './App.vue';
import router from './router';
import store from './store';

library.add(faSpinner);

createApp(App)
  .use(store)
  .use(router)
  .use(VueSocialSharing)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
