<template>
  <v-app>
    <Header />

    <v-main>
      <v-container class="py-12"> 

        <section id="hero" class="section hero-section">
          <div class="hero-content">
            <h1 class="title">Restaurante</h1>
            <p class="subtitle">El sabor que esperabas</p>
            <v-btn color="primary" class="mt-4" @click="scrollTo('menu')">Ordena ahora</v-btn>
          </div>
        </section>

        <section id="menu" class="section mt-10">
          <h2 class="section-title">Menú</h2>
          
          <v-row>
            <v-col cols="12" md="8">
              <MenuSection />
            </v-col>
            
            <v-col cols="12" md="4">
              <Cart />
            </v-col>
          </v-row>
        </section>

        <section id="howto" class="section mt-10 text-center">
          <h2 class="section-title">Cómo ordenar</h2>
          <v-row justify="center" class="mt-8">
            <v-col cols="12" sm="4">
              <v-icon size="64" color="primary">mdi-silverware-fork-knife</v-icon>
              <h3 class="text-h6 mt-3">Elige tu plato</h3>
              <p class="text-body-2 text-medium-emphasis">Navega por nuestro menú y selecciona tus favoritos.</p>
            </v-col>
            <v-col cols="12" sm="4">
              <v-icon size="64" color="primary">mdi-pencil-plus</v-icon>
              <h3 class="text-h6 mt-3">Personaliza y agrega extras</h3>
              <p class="text-body-2 text-medium-emphasis">Añade extras o modificaciones a tu gusto.</p>
            </v-col>
            <v-col cols="12" sm="4">
              <v-icon size="64" color="primary">mdi-credit-card-outline</v-icon>
              <h3 class="text-h6 mt-3">Confirma y paga</h3>
              <p class="text-body-2 text-medium-emphasis">Finaliza tu pedido y espera tu comida.</p>
            </v-col>
          </v-row>
        </section>

        <section id="promos" class="section mt-10">
          <h2 class="section-title">Promociones</h2>
          <p>Promociones dinámicas más adelante</p>
        </section>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import MenuSection from '@/components/MenuSection.vue' 
import Cart from '@/components/Cart.vue'             
import { useScroll } from '@/composables/useScroll' 

const { scrollTo } = useScroll()
</script>

<style scoped>
/* Elimina max-width de .section y deja que v-container lo maneje */
.section {
  padding: 40px 0; /* Ajusta el padding para v-container */
  /* max-width: 1200px;  <-- ¡Eliminado! */
  /* margin: 0 auto;    <-- ¡Eliminado! */
}
.hero-section {
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* background-color: #f5f5f5; <-- Puedes añadir un fondo si quieres un contraste */
}
.hero-content .title {
  font-size: 3rem;
  font-weight: bold;
}
.hero-content .subtitle {
  font-size: 1.25rem;
  margin-top: 8px;
}
.section-title {
  font-size: 2.5rem; /* Ajuste para que se vea más grande */
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center; /* Centrar títulos de sección */
}
</style>