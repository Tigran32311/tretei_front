<template>
    <v-app-bar scroll-behavior="collapse elevate" :elevation="2" prominent class="bg-indigo-lighten-1">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
<!--      <v-img icon="../assets/icons/CourtIcon.vue"></v-img>-->
      <v-app-bar-title>Третейский суд</v-app-bar-title>
      <v-spacer></v-spacer>
<!--      <v-btn variant="outlined" to="/login" size="small" text="Войти"> </v-btn>-->
      <v-btn variant="outlined" @click="login = true" size="small" text="Войти"> </v-btn>

<!--      <v-menu transition="scale-transition">-->
<!--        <template v-slot:activator="{ props }">-->
<!--          <v-btn icon v-bind="props">-->
<!--            <v-badge content="6" color="red-darken-2" size="x-small">-->
<!--              <v-icon icon="mdi-bell" color="white"></v-icon>-->
<!--            </v-badge>-->
<!--          </v-btn>-->
<!--        </template>-->
<!--        <v-list>-->
<!--          <v-list-item-->
<!--              v-for="(item, index) in notifications"-->
<!--              :key="index"-->
<!--              :value="index"-->
<!--          >-->
<!--            <v-list-item-title>-->
<!--              <v-icon :color="item.color" :icon="item.icon"></v-icon>-->
<!--              {{ item.title }}</v-list-item-title-->
<!--            >-->
<!--          </v-list-item>-->
<!--        </v-list>-->
<!--      </v-menu>-->
    </v-app-bar>

      <v-navigation-drawer
          v-model="drawer"
          location="left"
          temporary
      >
        <v-list>
<!--          <v-list-item-->
<!--              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"-->
<!--              subtitle="sandra_a88@gmailcom"-->
<!--              title="Sandra Adams"-->
<!--          ></v-list-item>-->
        </v-list>
<!--        <v-divider></v-divider>-->
        <v-list density="compact" nav>
          <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :value="index"
          >
            <v-list-item :prepend-icon="item.icon" :title="item.title" :value="item.link"></v-list-item>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item

          >
            <v-list-item prepend-icon="mdi-account" title="Войти" @click="login = true"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="Регистрация" @click="registerModal = true"></v-list-item>
<!--            <v-list-item prepend-icon="mdi-account" title="Выйти" @click="logoutModal = true"></v-list-item>-->
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

    <v-dialog
        v-model="login"
        max-width="500"
        persistent
    >
      <v-card
          prepend-icon="mdi-account"
          title="Войти"
      >
        <v-form
            v-model="sendLoginForm"
          @submit.prevent="loginSend"
        >
          <v-card-text>
            <v-col dense>
              <v-text-field
                  label="Email*"
                  name="email"
                  v-model="email"
                  required
              ></v-text-field>
              <v-text-field
                  label="Пароль*"
                  type="password"
                  v-model="password"
                  name="password"
                  required
              ></v-text-field>
              <div class="mx-4">
                У вас нет аккаунта? <v-btn variant="plain" @click="registerModal = true"> Регистрация </v-btn>
              </div>
            </v-col>
          </v-card-text>

            <v-card-text v-if="errorLoginModal" class="text-red" >
              Проверьте логин и пароль
            </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                text="Отмена"
                variant="plain"
                @click="login = false"
            ></v-btn>
            <v-btn
                color="primary"
                text="Войти"
                variant="tonal"
                type="submit"
            ></v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
<!--      <LoginForm :login="login" @closeModal=""></LoginForm>-->
    </v-dialog>

    <v-dialog
        v-model="registerModal"
        max-width="500"
        persistent
    >
      <v-card
          prepend-icon="mdi-account"
          title="Регистрация"
      >
        <v-form
            v-model="sendRegisterForm"
            @submit.prevent="registerSend"
        >
          <v-card-text>
            <v-col dense>
              <v-text-field
                  label="Email*"
                  v-model="registerEmail"
                  required
              ></v-text-field>
              <v-text-field
                  label="Пароль*"
                  type="password"
                  v-model="registerPassword"
                  required
              ></v-text-field>
              <v-text-field
                  label="Подтверждение пароля*"
                  type="confirmPassword*"
                  v-model="registerConfirmPassword"
                  required
              ></v-text-field>
              <v-text-field
                  label="Фамилия*"
                  type="surname*"
                  v-model="registerSurname"
                  required
              ></v-text-field>
              <v-text-field
                  label="Имя*"
                  type="name*"
                  v-model="registerName"
                  required
              ></v-text-field>
              <v-text-field
                  label="Отчество"
                  type="fathername"
                  v-model="registerFathername"
                  required
              ></v-text-field>
              <v-text-field
                label="Номер телефона*"
                type="phoneNumber"
                v-model="registerPhone"
                required
              >
              </v-text-field>
              <date-picker
                  label="Дата рождения"
                  v-model="registerBirthday"
                  color="primary"
              ></date-picker>
<!--              <div>-->
<!--                <label for="">Дата рождения</label>-->
<!--                <input-->
<!--                    v-model="registerBirthday"-->
<!--                    required-->
<!--                    type="date"-->
<!--                >-->
<!--              </div>-->

            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                text="Назад"
                variant="plain"
                @click="registerModal = false;login=true"
            ></v-btn>

            <v-btn
                color="primary"
                text="Зарегистрироваться"
                variant="tonal"
                type="submit"
            ></v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
</template>

<script>

import LoginForm from "@/components/LoginForm.vue";
import axios from "axios";
import {tr} from "vuetify/locale";
import router from "@/router";
import {useRoute,useRouter} from "vue-router";
import DatePicker from "@/components/DatePicker.vue";
import moment from 'moment'

// const router = useRouter()
export default {
  name: "AppBar",
  components: {DatePicker, LoginForm},
  data: () => ({
    sendLoginForm: {
      email: null,
      password: null,
    },
    email: null,
    password: null,
    drawer: false,
    login: false,
    logoutModal: false,
    rail: true,
    group: null,
    errorLoginModal: false,
    registerModal: false,
    // register fields
    registerEmail: null,
    registerPassword: null,
    registerPhone: null,
    registerConfirmPassword: null,
    registerSurname: null,
    registerName: null,
    registerBirthday: null,
    registerFathername: null,

    register: null,
    items: [
      { title: 'Новости',link: '/profile',icon: 'mdi-newspaper' },
      // { title: 'Войти', link: '/logout',icon: 'mdi-account-multiple' },
      // { title: 'Регистрация', link: '/logout',icon: 'mdi-star' },
    ],
  }),
  watch: {
    group () {
      this.drawer = false
    },
  },
  methods: {
    loginSend() {
      // const data = new FormData(this)
      // data.append("email",this)
      const that = this
      axios.post('http://127.0.0.1:8000/Api/auth/login', {
        email:this.email,
        password: this.password
      })
          .then(response => {
            localStorage.access_token = response.data.token
            // location.href="./user/"
            // this.$router.push('/user')
            switch (response.data.role) {
              case 'simpleUser':
                router.push('/user')
                break
              case 'judge':
                router.push('/judge')
                break
              case 'chancellery':
                router.push('/chancellery')
                break
              case 'courtAdmin':
                router.push('/court_admin')
                break
              default:
                router.push('/user')
                break
            }
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
    registerSend() {
      // const data = new FormData(this)
      // data.append("email",this)
      const that = this

      axios.post('http://127.0.0.1:8000/Api/auth/register', {
        email:this.registerEmail,
        password: this.registerPassword,
        name: this.registerName,
        phone: this.registerPhone,
        last_name: this.registerPhone,
        second_name: this.registerFathername,
        birthday: moment(String(this.registerBirthday)).format("YYYY-MM-DD"),
      })
          .then(response => {
            localStorage.access_token = response.data.token
            // location.href="./user/"
            // this.$router.push('/user')
            router.push('/user')
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
  }
}
</script>

<style scoped>

</style>