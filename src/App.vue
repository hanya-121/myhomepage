<template>
  <v-app>
    <Header/>
    <v-main>
      <router-view />
    </v-main>
    <!-- <Footer/> -->
  </v-app>
</template>

<script setup>
import Header from './include/Header.vue'
// import Footer from './include/Footer.vue'
</script>
