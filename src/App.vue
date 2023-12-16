<template>
  <v-app>
    <v-main>
      <Portfolio/>
    </v-main>
  </v-app>
</template>

<script>
import Portfolio from './components/Portfolio.vue'

export default {
  name: 'App',

  components: {
    Portfolio,
  },

  data: () => ({
    //
  }),
}
</script>
