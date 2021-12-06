import Vue from 'vue'
import './ams.config'
import ams from "@ams-team/ams";
import chart from '@ams-team/block-chart';
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN';

Vue.config.productionTip = false

Vue.use(ElementUI, { locale });

Vue.use(ams);
Vue.use(chart);

new Vue({
  render: h => h(App)
}).$mount('#app')
