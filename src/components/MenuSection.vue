<template>
  <v-card flat>
    <v-tabs
      v-if="menuCategories.length > 0"
      v-model="activeCategoryKey"
      align-tabs="start"
      color="primary"
      class="mb-6"
    >
      <v-tab
        v-for="category in menuCategories"
        :key="category.key"
        :value="category.key"
      >
        {{ category.name }}
      </v-tab>
    </v-tabs>

    <v-window v-model="activeCategoryKey">
      <v-window-item
        v-for="category in menuCategories"
        :key="category.key"
        :value="category.key"
      >
        <v-row>
          <v-col 
            v-for="product in filteredProducts"
            :key="product.id"
            cols="12"
            sm="6"
            lg="4"
          >
            <ProductCard :product="product" /> 
          </v-col>
        </v-row>

        <v-alert
          v-if="filteredProducts.length === 0"
          type="info"
          variant="tonal"
          class="mt-4"
        >
          No hay productos disponibles en la categoría "{{ category.name }}".
        </v-alert>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { menuCategories, menuProducts } from '@/data/menu' 
import ProductCard from '@/components/ProductCard.vue' 
import type { Product } from '@/data/menu'

const activeCategoryKey = ref(
  menuCategories[0]?.key ?? ''
) 

// Propiedad computada para filtrar los productos 
const filteredProducts = computed<Product[]>(() => {
  // Filtra la lista global de productos basada en la pestaña activa
  return menuProducts.filter(
    (product) => product.category === activeCategoryKey.value
  )
})
</script>