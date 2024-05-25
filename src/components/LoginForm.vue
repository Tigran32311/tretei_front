<template>
  <v-card
      prepend-icon="mdi-account"
      title="Войти"
  >
    <v-card-text>
      <v-col dense>
        <v-text-field
            label="Email*"
            required
        ></v-text-field>
        <v-text-field
            label="Пароль*"
            type="password"
            required
        ></v-text-field>
        <div class="mx-4">
          У вас нет аккаунта? <v-btn variant="plain" @click="registerModal = true"> Регистрация </v-btn>
        </div>
      </v-col>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          text="Отмена"
          variant="plain"
          @click="closeModal()"
      ></v-btn>

      <v-btn
          color="primary"
          text="Войти"
          variant="tonal"
          @click="closeModal()"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: [
      'login'
    ],
    methods: {
      closeModal() {
          this.$emit('closeModal')
      }
    }
  }
</script>

<style scoped>

</style>