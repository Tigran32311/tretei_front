<template>
  <div class="hello__site img__info">
    <!--    <v-img class="img__style" :src="judgeImg">-->
    <v-container class="">
      <div class="text-h2 pa-2 mb-16 overflow-auto d-sm-none d-none d-lg-flex">Третейский суд для разрешения споров</div>

      <!--        <div>-->
      <div class="text-h4 pa-2 tab__block">Документы</div>
      <v-card class="tab__block">
        <v-tabs
            v-model="doc_tab"
            grow
            direction="horizontal"
            class="d-md-none d-sm-none d-none d-lg-flex"
        >
          <v-tab value="one">Регламент третейского судьи</v-tab>
          <v-tab value="two">Документ об образовании арбитра</v-tab>
          <v-tab value="three">Арбитражная оговорка</v-tab>
        </v-tabs>
        <v-tabs
            v-model="doc_tab"
            grow
            direction="vertical"
            class="d-xxl-none d-xl-none d-lg-none d-xxl-flex"
        >
          <v-tab value="one">Регламент третейского судьи</v-tab>
          <v-tab value="two">Документ об образовании арбитра</v-tab>
          <v-tab value="three">Арбитражная оговорка</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="doc_tab">
            <v-window-item value="one">
              One
            </v-window-item>

            <v-window-item value="two">
              Two
            </v-window-item>

            <v-window-item value="three">
              Three
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
      <!--        </div>-->
    </v-container>
    <!--    </v-img>-->
  </div>
</template>

<style scoped>
.hello__site {
  background-image: url("../../assets/judgeImg.jpg") !important;
//background-size: cover !important;
//background-repeat: no-repeat !important;
//height: max-content;
//margin: 0;
  background-size: 100% auto;
  color: white;
  width: 100%;
}

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
export default {
  data: ()=> {
    return {
      judgeImg: require("@/assets/judgeImg.jpg"),
      doc_tab: null,
    }
  }
}
</script>