import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vue from "vue";
// import "/node_modules/material-design-icons/iconfont/material-icons.css";

// Vuetify
// import "@mdi/font/css/materialdesignicons.css"
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import "@fortawesome/fontawesome-free/css/all.css";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles"
import { fa } from "vuetify/iconsets/fa";
import { createYmaps } from 'vue-yandex-maps';
// import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import { VCalendar } from 'vuetify/labs/VCalendar'
// import { VueMaskDirective } from "v-mask";
// Vue.directive("mask", VueMaskDirective);

const vuetify = createVuetify({
    components,
    // VCalendar,
    // components: {
        // componentsF,
        // VCalendar,
    // },
    directives,
    // iconfont: 'mdi',
    icons: {
        // defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
            fa,
        },
    },
})

createApp(App)
    .use(vuetify)
    .use(store)
    .use(router)
    .use(createYmaps({
        apikey: 'c0628e8f-8c50-4e23-92db-5c2e7e0ebbe0',
    }))
    // .use(VCalendar,{
    //     locale: 'ru'
    // })
    // .use(BootstrapVue)
    .mount('#app')


//createApp(App).use(vuetify).mount('#app')
