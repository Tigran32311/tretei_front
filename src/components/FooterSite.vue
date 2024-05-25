<template>
  <yandex-map
      :settings="{
                location: {
                  center: [40.393079,56.134054],
                  zoom: 15,
                },
              }"
      width="100%"
      height="400px"
      class="d-md-none d-sm-none d-none d-lg-flex"
  >
    <yandex-map-default-features-layer/>
    <yandex-map-default-scheme-layer/>
    <yandex-map-marker
        v-for="(marker, index) in markers"
        :key="index"
        :settings="marker"
    >
      <div class="marker"/>
    </yandex-map-marker>
  </yandex-map>
  <v-container>
<!--    <div class="d-flex flex-column justify-center align-center">-->
    <div class="d-flex flex-column">
      <div class="d-flex flex-row justify-center align-center mb-5">
        <v-btn
            v-for="icon in icons"
            :key="icon"
            variant="text"
            class="mx-4"
            size="x-large"
            rounded="xl"
        >
          <v-icon :class="icon"></v-icon>
        </v-btn>
      </div>

      <div class="font-weight-bold text-h5 text-left">
        Контакты:
      </div>
      <div class="d-flex flex-column">
        <p>Назаров Роман Геннадьевич</p>
        <p>Телефон: +7 (920) 946-44-71</p>
        <p class="mb-4">E-mail: varme33@ya.ru</p>
        <p>Почтовый адрес</p>
        <p>600000, Владимирская обл. г. Владимир Октябрьский проспект 22а</p>
      </div>

      <v-divider></v-divider>

      <div class="text-center mt-2">
        {{ new Date().getFullYear() }} — <strong>Третейский суд</strong>
      </div>
    </div>
  </v-container>
</template>

<script>
import {YandexMap, YandexMapDefaultFeaturesLayer, YandexMapDefaultSchemeLayer, YandexMapMarker} from "vue-yandex-maps";

  export default {
    name: "FooterSite",
    components: {YandexMapDefaultFeaturesLayer, YandexMapMarker, YandexMapDefaultSchemeLayer, YandexMap},
    // components: {VueYandexMaps},
    data: () => ({
      icons: [
        'fa-brands fa-whatsapp',
        'fa-brands fa-telegram',
        'fa-brands fa-vk',
      ],
      markers: [
        {
          coordinates: [40.393079, 56.134054],
        },
      ]
    }),
  }
</script>

<style scoped>
.marker {
  position: relative;
  width: 20px;
  height: 20px;
  background: #ff0000;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  text-align: center;
  color: #fff;
  font-weight: bold;
  line-height: 20px;
}
</style>