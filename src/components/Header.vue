<template>
  <v-app-bar app color="white" flat>
    <v-container class="d-flex align-center py-0"> 
      <v-toolbar-title class="font-weight-bold text-h5 text-primary">
        RestaurantApp
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="scrollTo('hero')">Inicio</v-btn>
      <v-btn text @click="scrollTo('menu')">Menú</v-btn>
      <v-btn text @click="scrollTo('howto')">Cómo ordenar</v-btn>
      <v-btn text @click="scrollTo('promos')">Promociones</v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useScroll } from '@/composables/useScroll'

const { scrollTo } = useScroll()
</script>

<style scoped>
/* Estilos específicos si son necesarios */
</style>