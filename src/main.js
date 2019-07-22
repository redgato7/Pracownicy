import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import MultiFiltersPlugin from './plugins/MultiFilters'

Vue.config.productionTip = false

Vue.use(MultiFiltersPlugin);

new Vue({
    render: h => h(App),
}).$mount('#app')