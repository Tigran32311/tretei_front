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
              <div
                  class="text-h6 pa-2 font-weight-bold"
              >
                Регламент третейского судьи для разрешения конкретного спора
              </div>
              <p class="ml-2 mr-2 mb-5 text-lg-justify title">
                Регламент арбитра (третейского судьи) Назарову Роману Геннадьевичу (ИНН 332601923237), депонированный у нотариуса и регулирующий порядок рассмотрения дел и вынесения арбитром (третейским судьей) Назаровым Р.Г. арбитражного решения по спору, размер и порядок оплаты арбитражных сборов, исполнение арбитражного решения и другие процедурные вопросы рассмотрения (разрешения) спора и деятельности арбитра (третейского судьи) Назарова Р.Г.
              </p>
              <v-btn
                  class="text-none mb-4"
                  color="indigo-darken-3"
                  size="x-large"
                  variant="flat"
              >Скачать регламент</v-btn>
            </v-window-item>

            <v-window-item value="two">
              <div
                  class="text-h6 pa-2 font-weight-bold"
              >
                Документ об образовании арбитра
              </div>
              <p class="ml-2 mr-2 mb-5 text-lg-justify title">
                В соответствии с п. 6 ст. 11 Федерального закона от 29.12.2015 №382-ФЗ "Об арбитраже (третейском разбирательстве) в Российской Федерации" если стороны не договорились об ином, арбитр, разрешающий спор единолично должен иметь высшее юридическое образование, подтвержденное выданным на территории Российской Федерации дипломом установленного образца.
              </p>
              <v-btn
                  class="text-none mb-4"
                  color="indigo-darken-3"
                  size="x-large"
                  variant="flat"
              >Скачать документ</v-btn>
            </v-window-item>

            <v-window-item value="three">
              <div
                  class="text-h6 pa-2 font-weight-bold"
              >
                Арбитражная оговорка (третейское соглашение)
              </div>
              <p class="ml-2 mr-2 mb-5 text-lg-justify title">
                В данном разделе приведены образцы арбитражного соглашения в виде арбитражной оговорки в договоре или в виде отдельного соглашения в соответствии со ст. 7 Федерального закона от 29.12.2015 № 382-ФЗ "Об арбитраже (третейском разбирательстве) в Российской Федерации".
              </p>
              <v-btn
                  class="text-none mb-4"
                  color="indigo-darken-3"
                  size="x-large"
                  variant="flat"
              >Скачать</v-btn>
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