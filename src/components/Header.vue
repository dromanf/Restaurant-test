<template>
  <v-app-bar app color="white" flat>
    <v-container class="d-flex align-center py-0"> 
      <v-toolbar-title class="font-weight-bold text-h5 text-primary">
        RestaurantApp
      </v-toolbar-title>
      
      <v-spacer></v-spacer>

      <div class="d-none d-sm-flex">
        <v-btn text @click="scrollTo('hero')">Inicio</v-btn>
        <v-btn text @click="scrollTo('menu')">Menú</v-btn>
        <v-btn text @click="scrollTo('howto')">Cómo ordenar</v-btn>
        <v-btn text @click="scrollTo('promos')">Promociones</v-btn>
      </div>

      <v-app-bar-nav-icon 
        class="d-flex d-sm-none" 
        @click="emit('toggleDrawer')"
      ></v-app-bar-nav-icon>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
// 💡 Casing Corregido: 'Composables'
import { useScroll } from '@/Composables/useScroll'; 

const { scrollTo } = useScroll();

// Definición de evento para notificar al componente padre (App.vue) que abra el menú móvil
const emit = defineEmits(['toggleDrawer']);
</script>

<style scoped>
/* Estilos si son necesarios */
</style>