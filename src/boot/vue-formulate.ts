import { boot } from 'quasar/wrappers';
import VueFormulate from '@braid/vue-formulate';

export default boot(({ app }) => {
  app.component('vue-formulate', VueFormulate);
  app.use(VueFormulate);
});
