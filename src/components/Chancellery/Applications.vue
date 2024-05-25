<script setup>
import {ref, toRaw} from 'vue'
import axios from "axios";
import router from "@/router";
import DatePicker from "@/components/DatePicker.vue";

const page = ref(1)
const itemsNext = Array.from({ length: 15 }, (k, v) => ({
  title: 'Item ' + v + 1,
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
}))
  // const items =Array(15)
// axios.get('http://127.0.0.1:8000/Api/v1/getAppointment',{
//   headers: {
//     'authorization': `Bearer ${localStorage.access_token}`
//   }
// },)
//     .then(response => {
//       // localStorage.access_token = response.data.token
//       // location.href="/"
//       // router.replace('/')
//       console.log(response)
//       // this.userInfo = response["data"]
//       if (Array.isArray(response.data)) {
//         items.map(response.data)
//         // response.data.forEach((item)=>{
//         //   items.(
//         //     item
//         //   )
//         // })
//       }
//     })
//     .catch(function (error) {
//       // localStorage.access_token = ''
//       // router.replace('/')
//       if (error.response) {
//
//       } else if (error.request) {
//         console.log(error.request);
//       } else {
//         console.log('Error', error.message);
//       }
//       console.log(error.config);
//     })
// // console.log(items)
console.log(itemsNext)
</script>

<template>
  <div class="hello__site img__info">
    <v-container class="">
      <div class="text-h4 font-weight-bold pa-2 mb-10 overflow-auto d-sm-none d-none d-lg-flex">Мои заявки</div>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            class="mb-10"
            outlined
            append-icon="mdi-plus"
            @click="addModal = true"
        >Добавить заявку</v-btn>
      </v-row>
      <v-row dense>
        <v-col
              v-for="(item, i) in items"
              :key="i"
              cols="12"
              md="6"
          >

              <v-hover class="">
                <template v-slot:default="{ isHovering, props }">
                  <v-card
                      v-bind="props"
                      class="cursor-pointer"
                      :color="isHovering ? 'grey-lighten-1' : undefined"
                      :title="`Истец: ${toRaw(item)['plaintiff_fio']}`"
                      :subtitle="`Ответчик: ${toRaw(item)['defendant_fio']}`"
                  >
  <!--                  :prepend-icon="`${toRaw(item)['prepend-icon']}`"-->
                    <template v-slot:prepend>
                      <v-icon :color="`${toRaw(item)['color']}`" :icon="`${toRaw(item)['prepend-icon']}`"></v-icon>
                    </template>
  <!--                  <v-card-item>-->
  <!--                    <v-card-title v-text="`Истец: ${toRaw(item)['plaintiff_fio']}`"></v-card-title>-->
  <!--                    <v-card-subtitle v-text="`Ответчик: ${toRaw(item)['defendant_fio']}`"></v-card-subtitle>-->
  <!--                  </v-card-item>-->
                    <v-card-text>
                      <p v-text="`Статус: ${toRaw(item)['status_name']}`"></p>
                      <p v-text="`Дата создания: ${toRaw(item)['created_at']}`"></p>
                    </v-card-text>
                    <v-card-actions class="">
                      <v-spacer></v-spacer>
                      <v-tooltip text="Скачать заявку">
                        <template v-slot:activator="{ props }">
                          <v-btn
                              v-bind="props"
                              color="green"
                              icon="mdi-download-circle"
                              size="x-large"
                              @click="downloadFile(toRaw(item)['appointment_file'])"
                          ></v-btn>
                        </template>
                      </v-tooltip>
                      <v-tooltip text="Редактировать">
                        <template v-slot:activator="{ props }">
                          <v-btn
                              v-bind="props"
                              color="orange"
                              icon="mdi-pencil"
                              size="x-large"
                          ></v-btn>
                        </template>
                      </v-tooltip>
                      <v-tooltip text="Удалить">
                        <template v-slot:activator="{ props }">
                          <v-btn
                              v-bind="props"
                              color="red"
                              icon="mdi-trash-can"
                              size="x-large"
                          ></v-btn>
                        </template>
                      </v-tooltip>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-hover>
        </v-col>
      </v-row>
<!--            <v-divider></v-divider>-->
<!--            <br>-->
    </v-container>
  </div>
  <v-dialog
      v-model="addModal"
      max-width="500"
      persistent
  >
    <v-card
        prepend-icon="mdi-plus"
        title="Добавление заявки"
    >
      <v-form
          v-model="addAppForm"
          @submit.prevent=""
      >
        <v-card-text>
          <v-col dense>
            <v-select
                clearable
                label="Истец"
                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            ></v-select>
            <v-select
                clearable
                label="Ответчик"
                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            ></v-select>
            <v-select
                clearable
                label="Статус"

                :items="['Заявка', 'Черновик',]"
            ></v-select>
            <v-file-input label="Загрузите файл заявки"></v-file-input>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text="Назад"
              variant="plain"
              @click="addModal = false"
          ></v-btn>
          <v-btn
              color="primary"
              text="Добавить"
              variant="tonal"
              type="submit"
          ></v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped>

.tab__block {
  width: 90%;
}

.title__page {
//text-align: center;
}

.img__info {
  opacity: 1 !important;
  filter: brightness(100%) !important;
}

.img__style {
  opacity: 0.8;
  filter: brightness(40%);
}
</style>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: ()=> {
    return {
      judgeImg: require("@/assets/judgeImg.jpg"),
      doc_tab: null,
      items: [],
      addModal: false,
      addAppForm: '',

    }
  },
  created() {
    axios.get('http://127.0.0.1:8000/Api/v1/getAppointment',{
      headers: {
        'authorization': `Bearer ${localStorage.access_token}`
      }
    },)
        .then(response => {
          // localStorage.access_token = response.data.token
          // location.href="/"
          // router.replace('/')
          console.log(response)
          // this.userInfo = response["data"]
          if (Array.isArray(response.data)) {
            // this.items.map(response.data)
            response.data.forEach((item)=>{
              switch (item['status_id']){
                case 1:
                  item['prepend-icon']='mdi-clock-outline'
                  item['color']='amber'
                  break;
                case 3:
                  item['prepend-icon']='mdi-check-bold'
                  item['color']='green'
                  break;
                case 4:
                  item['prepend-icon']='mdi-pencil'
                  item['color']='orange'
                  break;
                case 7:
                  item['prepend-icon']='mdi-close-circle'
                  item['color']='red'
                  break;
                case 9:
                  item['prepend-icon']='mdi-file'
                  item['color']='black54'
                  break;
                default:
                  item['prepend-icon']='mdi-clock-outline'
                  item['color']='amber'
                  break;
              }
              item['created_at']=moment(String(item['created_at'])).format("DD.MM.YYYY")
              this.items.push(
                item
              )
            })
          }
        })
        .catch(function (error) {
          // localStorage.access_token = ''
          // router.replace('/')
          if (error.response) {

          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
        })
    console.log(this.items)
  },
  methods: {
    downloadFile(file) {
      let url = encodeURIComponent(file).replace(/\./g, '%2E')
      console.log(url)
      axios({
        url: 'http://127.0.0.1:8000/Api/downloadG/%2Fappointments%2F' + url,
        method: "get",
        responseType: 'blob',
        headers: {
          'authorization': `Bearer ${localStorage.access_token}`,
        }
      })
          .then(response => {
            // localStorage.access_token = response.data.token
            // location.href="/"
            // router.replace('/')
            console.log(response)
            // const fileData = Buffer.from(response.data, 'binary');
            // fs.writeFile('./file', fileData);
            const href = window.URL.createObjectURL(response.data);
            const anchorElement = document.createElement('a');
            anchorElement.href = href;
            anchorElement.download = '';
            document.body.appendChild(anchorElement);
            anchorElement.click();
            document.body.removeChild(anchorElement);
            window.URL.revokeObjectURL(href);
          })
          .catch(function (error) {
            // localStorage.access_token = ''
            // router.replace('/')
            if (error.response) {

            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          })
    }
  }
}
</script>