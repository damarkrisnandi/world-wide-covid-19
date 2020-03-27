<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-toolbar-title>World Wide COVID-19 Info</v-toolbar-title>
      <div class="d-flex align-center">
        
      </div>

      <v-spacer></v-spacer>

      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-content>
      <!-- <HelloWorld/> -->
      <br>
      <MainPage/>
    </v-content>
  </v-app>
</template>

<script>
import MainPage from './components/parent/MainPage';

export default {
  name: 'App',

  components: {
    MainPage
  },

  data: () => ({
    //
  }),
};
</script>
