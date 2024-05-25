<script setup>
import router from "@/router";
import axios from "axios";
import {toRaw} from "vue";

let user = ''

if (localStorage.access_token==null || localStorage.access_token==='' || localStorage.access_token==='undefined') {
  router.replace('/')
}
</script>

<template>
    <v-app-bar scroll-behavior="collapse elevate" :elevation="2" prominent class="bg-indigo-lighten-1">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
<!--      <v-img icon="../assets/icons/CourtIcon.vue"></v-img>-->
      <v-app-bar-title>Третейский суд</v-app-bar-title>
      <v-spacer></v-spacer>
<!--      <v-btn variant="outlined" to="/login" size="small" text="Войти"> </v-btn>-->
      <v-btn variant="outlined" @click="logoutModal = true" size="small" text="Выйти"> </v-btn>

      <v-menu transition="scale-transition">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-badge content="3" color="red-darken-2" size="x-small">
              <v-icon icon="mdi-bell" color="white"></v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
              v-for="(item, index) in notifications"
              :key="index"
              :value="index"
          >
            <v-list-item-title>
              <v-icon :color="item.color" :icon="item.icon"></v-icon>
              {{ item.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

      <v-navigation-drawer
          v-model="drawer"
          location="left"
          temporary
      >
        <v-list>
          <v-list-item
              prepend-avatar="./user-alt-svgrepo-com.png"
              :subtitle="toRaw(userInfo)['email']"
              :title="`${toRaw(userInfo['last_name'])} ${toRaw(userInfo['name'])}`"
              @click="router.replace('/user')"
          ></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :value="index"
          >
            <v-list-item
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.link"
                @click="router.replace(item.link)"
            ></v-list-item>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
          >
            <v-list-item prepend-icon="mdi-account" title="Выйти" @click="logoutModal = true"></v-list-item>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

  <v-dialog
      v-model="logoutModal"
      max-width="400"
      persistent
  >
    <v-card
        text=""
        title="Вы действительно хотите выйти?"
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="logoutModal = false">
          Отмена
        </v-btn>

        <v-btn @click="logoutFunc">
          Подтвердить
        </v-btn>
      </template>
    </v-card>
  </v-dialog>

</template>

<script>

import LoginForm from "@/components/LoginForm.vue";
import axios from "axios";
import {tr} from "vuetify/locale";
import router from "@/router";
import {toRaw} from "vue";

export default {
  name: "AppBar",
  components: {LoginForm},
  data: () => ({
    sendLoginForm: {
      email: null,
      password: null,
    },
    notifications: [
      {
        title: 'Заявка от 22.12.2024 принята в производство',
        icon: 'mdi-check-circle',
        color: 'green'
      },
      {
        title: 'Заявка от 16.12.2024 была отклонена',
        icon: 'mdi-close-circle',
        color: 'red'
      },
      {
        title: '16.05.2024 в 13:00 назначено заседание по делу №333',
        icon: 'mdi-information',
        color: 'orange'
      },
    ],
    email: null,
    password: null,
    drawer: false,
    login: false,
    logoutModal: false,
    rail: true,
    group: null,
    errorLoginModal: false,
    userInfo: {
      'email': '',
      'last_name': '',
      'name': '',
    },
    items: [
      {title: 'Мои заявки', link: '/user/applications', icon:'mdi-book-plus'},
      {title: 'Судебные дела', link: '/user/courts', icon:'mdi-bank'},
      {title: 'Судебные заседания', link: '/user/meetings', icon:'mdi-calendar-alert'},
      { title: 'Новости',link: '/news',icon: 'mdi-newspaper' },
      // { title: 'Войти', link: '/logout',icon: 'mdi-account-multiple' },
      // { title: 'Регистрация', link: '/logout',icon: 'mdi-star' },
    ],
  }),
  created() {
    this.getUser()
  },
  watch: {
    group () {
      this.drawer = false
    },
  },
  methods: {
    logoutFunc() {
      // const data = new FormData(this)
      // data.append("email",this)
      const that = this
      axios.post('http://127.0.0.1:8000/Api/auth/logout', {

      },{
        headers: {
          'authorization': `Bearer ${localStorage.access_token}`
        }
      },)
          .then(response => {
            localStorage.access_token = response.data.token
            // location.href="/"
            router.replace('/')
          })
          .catch(function (error) {
            if (error.response) {
              that.errorLoginModal=true
              // Запрос был сделан, и сервер ответил кодом состояния, который
              // выходит за пределы 2xx
              // console.log(error.response.data);
              // console.log(error.response.status);
              // console.log(error.response.headers);

            } else if (error.request) {
              // Запрос был сделан, но ответ не получен
              // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
              // http.ClientRequest в node.js
              console.log(error.request);
            } else {
              // Произошло что-то при настройке запроса, вызвавшее ошибку
              console.log('Error', error.message);
            }
            console.log(error.config);
          })
    },
    getUser() {
      axios.get('http://127.0.0.1:8000/Api/v1/user',{
        headers: {
          'authorization': `Bearer ${localStorage.access_token}`
        }
      },)
          .then(response => {
            // localStorage.access_token = response.data.token
            // location.href="/"
            // router.replace('/')
            console.log(response)
            this.userInfo = response["data"]
            console.log(this.userInfo)
            // console.log(toRaw(this.userInfo)['email'])
          })
          .catch(function (error) {
            localStorage.access_token = ''
            // location.href="/"
            router.replace('/')
            if (error.response) {
              // Запрос был сделан, и сервер ответил кодом состояния, который
              // выходит за пределы 2xx
              // console.log(error.response.data);
              // console.log(error.response.status);
              // console.log(error.response.headers);

            } else if (error.request) {
              // Запрос был сделан, но ответ не получен
              // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
              // http.ClientRequest в node.js
              console.log(error.request);
            } else {
              // Произошло что-то при настройке запроса, вызвавшее ошибку
              console.log('Error', error.message);
            }
            console.log(error.config);
          })
    },
  }
}
</script>

<style scoped>

</style>