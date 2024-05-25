<template>
    <div class="home">
      <v-card>
        <v-layout>
          <v-app>
            <AppBar />
  <!--          <LeftMenu />-->

            <v-main>
              <div style="">
                <HomeUnauthorize></HomeUnauthorize>
                <v-footer
                    class="bg-indigo-lighten-1"
                >
                  <FooterSite />
                </v-footer>
              </div>
            </v-main>

          </v-app>
        </v-layout>
      </v-card>
    </div>
</template>
<script>
// @ is an alias to /src
import AppBar from '@/components/AppBar.vue'
// import LeftMenu from "@/components/LeftMenu.vue"
import FooterSite from "@/components/FooterSite.vue";
import HomeUnauthorize from "@/components/Unauthorize/HomeUnauthorize.vue";
export default {
  components: {
    AppBar,
    FooterSite,
    HomeUnauthorize,
    // LeftMenu,
  }
}
// export default {
//   name: AppBar,
//   components: {
//     AppBar
//   }
// }

</script>

<!--<style>-->
<!-- .footerStyle {-->
<!--   position: fixed;-->
<!--   left: 0;-->
<!--   bottom: 0;-->
<!--   width: 100%;-->
<!-- }-->
<!--</style>-->

