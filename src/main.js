import Vue from 'vue'
import './ams.config'
import ams from "@ams-team/ams";
import chart from '@ams-team/block-chart';
import App from './App.vue'


//import router from '@router/index'
// 不要忘了引入 element-ui
import ElementUI from 'element-ui';
// 使用 element-ui 默认主题
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'; // lang i18n
// 引入ams

Vue.config.productionTip = false

Vue.use(ElementUI, { locale });

Vue.use(ams);
Vue.use(chart);

new Vue({
  render: h => h(App),
  //router
}).$mount('#app')
