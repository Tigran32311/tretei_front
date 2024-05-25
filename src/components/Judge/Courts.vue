<script setup>
import {toRaw} from 'vue'
import axios from "axios";
import router from "@/router";
import DatePicker from "@/components/DatePicker.vue";

// const page = ref(1)

</script>

<template>
  <div class="hello__site img__info">
    <v-container class="">
      <div class="text-h4 font-weight-bold pa-2 mb-10 overflow-auto d-sm-none d-none d-lg-flex">Судебные дела</div>
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
                  :title="`Номер дела: ${toRaw(item)['case_number']}`"
                  :subtitle="`Номер материала дела: ${toRaw(item)['material_num']}`"
                    @click="lookModal = true"
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
                  <p v-text="`Дата создания: ${toRaw(item)['date_start']}`"></p>
                  <p v-text="`Истец: ${toRaw(item)['plaintiff_fio']}`"></p>
                  <p v-text="`Ответчик: ${toRaw(item)['defendant_fio']}`"></p>
                </v-card-text>
                <v-card-actions class="">
                  <v-spacer></v-spacer>
                  <v-tooltip text="Скачать материалы дела">
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
<!--                  <v-tooltip text="Отправить обращение председателю суда">-->
<!--                    <template v-slot:activator="{ props }">-->
<!--                      <v-btn-->
<!--                          v-bind="props"-->
<!--                          color="orange"-->
<!--                          icon="mdi-file-document-edit"-->
<!--                          size="x-large"-->
<!--                      ></v-btn>-->
<!--                    </template>-->
<!--                  </v-tooltip>-->
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
      v-model="lookModal"
      max-width="1000"
      persistent
  >
    <v-card
        title="Просмотр судебного дела"
    >
      <v-col dense class="ml-5">
        <p v-text="`Номер дела: 333`"></p>
        <p v-text="`Номер материала дела: 222`"></p>
        <p v-text="`Статус дела: Исполняется`"></p>
        <p v-text="`Истец: Мелконян Т.Г.`"></p>
        <p v-text="`Ответчик: Петров И.С.`"></p>
        <p v-text="`Дата создания: 21.12.2024`" class="mb-2"></p>
        <v-row class="ga-2 mt-5">
          <v-tooltip text="Скачать материалы дела">
            <template v-slot:activator="{ props }">
              <v-btn
                  v-bind="props"
                  color="green"
                  text="Скачать материалы дела"
                  @click="downloadFile(toRaw(item)['appointment_file'])"
              ></v-btn>
            </template>
          </v-tooltip>
          <v-btn
              text="Назначить заседание по данному делу"
              color="primary"
              @click="addMeeting = true"
          >
          </v-btn>
        </v-row>
      </v-col>
      <v-form
          v-model="addAppForm"
          @submit.prevent=""
      >
        <v-card-text>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text="Назад"
              variant="plain"
              @click="lookModal = false"
          ></v-btn>
          <!--          <v-btn-->
          <!--              color="primary"-->
          <!--              text="Добавить"-->
          <!--              variant="tonal"-->
          <!--              type="submit"-->
          <!--          ></v-btn>-->
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
  <v-dialog
      v-model="addMeeting"
      max-width="1000"
      persistent
  >
    <v-card
        title="Назначение заседания"
    >
      <v-form
          v-model="addAppForm"
          @submit.prevent=""
      >
        <v-card-text>
          <v-form>
            <v-col dense>
              <v-text-field
                  label="Укажите адрес"
                  required
              ></v-text-field>
              <date-picker
                  label="Выберите дату проведения заседания"
                  v-model="date__meetins"
                  color="primary"
              ></date-picker>
              <v-text-field
                  v-model="time"
                  :active="menu2"
                  :focus="menu2"
                  label="Укажите время заседания"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  class="mt-4"
              >
                <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    activator="parent"
                    transition="scale-transition"
                >
                  <v-time-picker
                      v-if="menu2"
                      v-model="time"
                      format="24hr"
                      full-width
                  ></v-time-picker>
                </v-menu>
              </v-text-field>
            </v-col>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text="Назад"
              variant="plain"
              @click="addMeeting = false"
          ></v-btn>
          <v-btn
              text="Добавить"
              color="green"
              variant="flat"
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
import DatePicker from "@/components/DatePicker.vue";
import { VTimePicker } from 'vuetify/labs/VTimePicker'

export default {
  data: ()=> {
    return {
      judgeImg: require("@/assets/judgeImg.jpg"),
      doc_tab: null,
      items: [],
      lookModal: false,
      addAppForm: '',
      addMeeting: false,
      time: null,
      menu2: false,
      date__meetins: null,
    }
  },
  components: {
      DatePicker,VTimePicker
  },
  created() {
    axios.get('http://127.0.0.1:8000/Api/v1/judge/courtCase/list',{
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
                case 2:
                  item['prepend-icon']='mdi-clock-outline'
                  item['color']='amber'
                  break;
                case 1:
                  item['prepend-icon']='mdi-check-bold'
                  item['color']='green'
                  break;
                case 3:
                  item['prepend-icon']='mdi-minus-circle'
                  item['color']='red'
                  break;
                case 5:
                  item['prepend-icon']='mdi-close-circle'
                  item['color']='red'
                  break;
                default:
                  item['prepend-icon']='mdi-clock-outline'
                  item['color']='amber'
                  break;
              }
              item['date_start']=moment(String(item['date_start'])).format("DD.MM.YYYY")
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