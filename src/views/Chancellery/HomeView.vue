<template>
    <div class="home">
      <v-card>
        <v-layout>
          <v-app>
            <AppBar />
            <v-main>
              <div style="">
                <HomeUser></HomeUser>
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
import AppBar from '@/components/Chancellery/AppBar.vue'
// import LeftMenu from "@/components/LeftMenu.vue"
import FooterSite from "@/components/FooterSite.vue";
import HomeUser from "@/components/Chancellery/Home.vue";
export default {
  components: {
    AppBar,
    FooterSite,
    HomeUser,
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

