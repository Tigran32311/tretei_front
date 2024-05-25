<script setup>
import {ref, toRaw} from 'vue'
import axios from "axios";
import router from "@/router";
import DatePicker from "@/components/DatePicker.vue";

</script>

<template>
  <div class="hello__site img__info">
    <v-container class="">
      <div class="text-h4 font-weight-bold pa-2 mb-10 overflow-auto d-sm-none d-none d-lg-flex">Судебные заседания</div>
      <div>
        <v-sheet
            class="d-flex"
            height="54"
            tile
        >
          <v-select
              item-text="name"
              item-value="value"
              :items="types"
              v-model="type"
              class="ma-2"
              label="Тип просмотра"
              variant="outlined"
              dense
              hide-details
          ></v-select>
<!--          <v-select-->
<!--              v-model="weekday"-->
<!--              :items="weekdays"-->
<!--              class="ma-2"-->
<!--              label="weekdays"-->
<!--              variant="outlined"-->
<!--              dense-->
<!--              hide-details-->
<!--          ></v-select>-->
        </v-sheet>
        <v-sheet>
          <v-calendar
              ref="calendar"
              v-model="value"
              :events="events"
              :view-mode="type"
              :weekdays="weekday"
          ></v-calendar>
<!--          locale="ru-Ru"-->
        </v-sheet>
      </div>
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
import { useDate } from 'vuetify'
import { VCalendar } from 'vuetify/labs/VCalendar'

export default {
  components: {
      VCalendar,
  },
  data: ()=> {
    return {
      judgeImg: require("@/assets/judgeImg.jpg"),
      doc_tab: null,
      items: [],
      addModal: false,
      addAppForm: '',

      // for calendar
      types: [
        {
          title: 'Месяц',
          value: 'month',
        },
        {
          title: 'Неделя',
          value: 'week',
        } ,
        {
          title: 'День',
          value: 'day',
        }
      ],
      type: 'month',
      weekday: [1, 2, 3, 4, 5, 6, 0],
      // weekday:{
      //   'title': 'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье',
      //   'value': [1, 2, 3, 4, 5, 6, 0]
      // },
      weekdays: [
        { title: 'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье', value: [1, 2, 3, 4, 5, 6, 0] },
        // { title: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        // { title: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        // { title: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        // { title: 'Mon, Wed, Fri', value: [1, 3, 5] },
      ],
      value: [new Date()],
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      titles: ['Заседание по делу №333', 'Заседание по делу №123', ],
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
  mounted() {
    const adapter = useDate()
    this.getEvents({ start: adapter.startOfDay(adapter.startOfMonth(new Date())), end: adapter.endOfDay(adapter.endOfMonth(new Date())) })
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
    },
    getEvents ({ start, end }) {
      const events = []

      const min = start
      const max = end
      const days = (max.getTime() - min.getTime()) / 86400000
      // const eventCount = this.rnd(days, days + 20)
      const eventCount = 5

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          title: this.titles[this.rnd(0, this.titles.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          allDay: !allDay,
        })
      }

      this.events = events
    },
    getEventColor (event) {
      return event.color
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  }
}
</script>