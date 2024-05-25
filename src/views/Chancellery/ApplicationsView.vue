<template>
  <div class="home">
    <v-card>
      <v-layout>
        <v-app>
          <AppBar />
          <v-main>
            <div style="">
              <Applications></Applications>
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
import AppBar from '@/components/User/AppBar.vue'
import FooterSite from "@/components/FooterSite.vue";
import Applications from "@/components/User/Applications.vue";
export default {
  components: {
    AppBar,
    FooterSite,
    Applications,
  }
}

</script>

