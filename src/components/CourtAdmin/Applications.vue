<script setup>
import {ref, toRaw} from 'vue'
import axios from "axios";
import router from "@/router";
import DatePicker from "@/components/DatePicker.vue";

const page = ref(1)
</script>

<template>
  <div class="hello__site img__info">
    <v-container class="">
      <div class="text-h4 font-weight-bold pa-2 mb-10 overflow-auto d-sm-none d-none d-lg-flex">Список заявок</div>
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
                      @click="lookModal = true"
                  >
                      <template v-slot:prepend>
                        <v-icon :color="`${toRaw(item)['color']}`" :icon="`${toRaw(item)['prepend-icon']}`"></v-icon>
                      </template>
                      <v-card-text>
                        <p v-text="`Статус: ${toRaw(item)['status_name']}`"></p>
                        <p v-text="`Дата создания: ${toRaw(item)['created_at']}`"></p>
                      </v-card-text>
                    <v-card-actions class="">
                      <v-spacer></v-spacer>
<!--                      <v-tooltip text="Скачать заявку">-->
<!--                        <template v-slot:activator="{ props }">-->
<!--                          <v-btn-->
<!--                              v-bind="props"-->
<!--                              color="green"-->
<!--                              icon="mdi-download-circle"-->
<!--                              size="x-large"-->
<!--                              @click="downloadFile(toRaw(item)['appointment_file'])"-->
<!--                          ></v-btn>-->
<!--                        </template>-->
<!--                      </v-tooltip>-->
<!--                      <v-tooltip text="Редактировать">-->
<!--                        <template v-slot:activator="{ props }">-->
<!--                          <v-btn-->
<!--                              v-bind="props"-->
<!--                              color="orange"-->
<!--                              icon="mdi-pencil"-->
<!--                              size="x-large"-->
<!--                          ></v-btn>-->
<!--                        </template>-->
<!--                      </v-tooltip>-->
<!--                      <v-tooltip text="Удалить">-->
<!--                        <template v-slot:activator="{ props }">-->
<!--                          <v-btn-->
<!--                              v-bind="props"-->
<!--                              color="red"-->
<!--                              icon="mdi-trash-can"-->
<!--                              size="x-large"-->
<!--                          ></v-btn>-->
<!--                        </template>-->
<!--                      </v-tooltip>-->
                    </v-card-actions>
                  </v-card>
                </template>
              </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <v-dialog
      v-model="lookModal"
      max-width="1000"
      persistent
  >
    <v-card
        title="Просмотр заявки"
    >
      <v-col dense class="ml-5">
        <p v-text="`Статус заявки: Заявка`"></p>
        <p v-text="`Истец: Мелконян Т.Г.`"></p>
        <p v-text="`Ответчик: Мелконян В.Г.`"></p>
        <p v-text="`Дата создания: 21.12.2023`" class="mb-2"></p>
        <v-tooltip text="Скачать заявку">
          <template v-slot:activator="{ props }">
            <v-btn
                v-bind="props"
                color="green"
                text="Скачать файл заявки"
                @click="downloadFile(toRaw(item)['appointment_file'])"
            ></v-btn>
          </template>
        </v-tooltip>
      </v-col>
      <v-form
          v-model="addAppForm"
          @submit.prevent=""
      >
        <v-card-text>
          <v-col dense>
            <p class="text-h6 mb-2">Модерация заявки</p>
            <v-textarea
                label="Комментарий (необязательно)"
                model-value=""
                name="input-7-1"
                variant="filled"
                auto-grow
            ></v-textarea>
            <v-row
            justify="center"
            class="ga-4"
            >
              <v-btn
                  text="Подтвердить заявку"
                  color="green"
              >
              </v-btn>
              <v-btn
                  text="Отклонить заявку"
                  color="red"
              >
              </v-btn>
              <v-btn
                  text="Отправить на редактирование"
                  color="primary"
              >
              </v-btn>
            </v-row>
          </v-col>
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
      lookModal: false,
      addAppForm: '',

    }
  },
  created() {
    axios.get('http://127.0.0.1:8000/Api/v1/getAppointmentListChancellery',{
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