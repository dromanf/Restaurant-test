<template>
  <v-card 
    class="product-card"
    flat
    border
  >
    <div class="product-image-mock">
      
    </div>

    <v-card-text>
      <h3 class="text-h6 font-weight-bold">{{ product.name }}</h3>
      <p class="text-body-2 text-medium-emphasis mt-1">{{ product.description }}</p>
    </v-card-text>

    <v-card-actions class="d-flex justify-space-between align-center">
      <span class="text-h6 text-primary font-weight-black">${{ product.price.toFixed(2) }}</span>
      
      <v-btn
        color="primary"
        variant="flat"
        @click="isExtraModalOpen = true"
      >
        Seleccionar
      </v-btn>
    </v-card-actions>

    <ExtraModal 
      v-model="isExtraModalOpen" 
      :product="product"
    />

  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ExtraModal from '@/components/ExtraModal.vue'
import type { Product } from '@/data/menu' // Importamos el tipo Product

// 1. Definición de Props
// El componente necesita recibir el objeto de producto para mostrarlo.
const props = defineProps<{
  product: Product
}>()

// 2. Estado para el Modal
// Usamos v-model en el modal, por lo que este ref controla su visibilidad.
const isExtraModalOpen = ref(false)
</script>

<style scoped>
.product-card {
  transition: transform 0.2s;
  height: 100%; /* Asegura que todas las tarjetas tengan la misma altura */
}

/* Mock de la imagen */
.product-image-mock {
  width: 100%;
  aspect-ratio: 16/9; /* Proporción para la imagen */
  background-color: #f0f0f0;
  border-bottom: 1px solid #eee;
}
</style>