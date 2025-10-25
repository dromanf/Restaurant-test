<template>
  <v-dialog 
    :model-value="modelValue" 
    @update:model-value="$emit('update:modelValue', $event)" 
    max-width="600"
    @after-leave="resetSelections"
  >
    <v-card>
      <v-toolbar color="primary" flat>
        <v-toolbar-title class="font-weight-bold">
          Personaliza tu {{ product.name }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('update:modelValue', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-6">
        <div class="mb-4">
          <h3 class="text-h6">{{ product.name }}</h3>
          <p class="text-body-1 text-medium-emphasis">Precio base: ${{ product.price.toFixed(2) }}</p>
        </div>

        <v-divider class="my-4"></v-divider>

        <div v-if="product.extraType !== 'none'">
          <h4 class="text-subtitle-1 font-weight-bold mb-3">
            Elige tus extras (Opcional)
          </h4>
          
          <v-list dense>
            <v-list-item
              v-for="extra in availableExtras"
              :key="extra.id"
              class="pa-0"
            >
              <v-checkbox
                v-model="selectedExtrasIds"
                :label="`${extra.name} (+$${extra.price.toFixed(2)})`"
                :value="extra.id"
                hide-details
                class="ma-0 pa-0"
              ></v-checkbox>
            </v-list-item>
          </v-list>
        </div>
        
        <div v-else>
            <v-alert type="info" variant="tonal" icon="mdi-information-outline" class="mt-4">
                Este producto no tiene opciones de extras adicionales.
            </v-alert>
        </div>
      </v-card-text>

      <v-card-actions class="pa-6 pt-0">
        <div class="text-h5 font-weight-bold">
          Total: ${{ currentTotal.toFixed(2) }}
        </div>
        <v-spacer></v-spacer>
        
        <v-btn
          color="success"
          size="large"
          variant="flat"
          @click="addToOrder"
        >
          Añadir al Pedido
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { productExtras, type Product, type Extra } from '@/data/menu' // Importamos la data y los tipos
import { useCartStore } from '@/stores/cartStore' // Store de Pinia
import type { ExtraType } from '@/data/menu' // Importamos el tipo de extra

const cartStore = useCartStore()

// 1. PROPS
// Se asume que el tipo Product ahora tiene la propiedad extraType
const props = defineProps<{
  modelValue: boolean,
  product: Product,
}>()

// 2. EMITS
const emit = defineEmits(['update:modelValue'])

// 3. ESTADO LOCAL
const selectedExtrasIds = ref<number[]>([])

// 4. LÓGICA COMPUTADA
// 💡 Filtra los extras disponibles basándose en el tipo de extra del producto
const availableExtras = computed<Extra[]>(() => {
  const type: ExtraType = props.product.extraType as ExtraType;
  if (type === 'none') {
    return []; 
  }
  // Filtra los extras globales por el tipo que acepta el producto
  return productExtras.filter(extra => extra.type === type);
});


// Filtra los objetos Extra basados en los IDs seleccionados de la lista filtrada
const selectedExtras = computed<Extra[]>(() => {
  return availableExtras.value.filter(extra => selectedExtrasIds.value.includes(extra.id))
})

// Calcula el precio total: precio base + suma de precios de extras
const currentTotal = computed<number>(() => {
  const extrasCost = selectedExtras.value.reduce((sum, extra) => sum + extra.price, 0)
  return props.product.price + extrasCost
})

// 5. ACCIONES
function addToOrder() {
  // Llama a la acción del store de Pinia
  cartStore.addToCart(props.product, selectedExtras.value)
  
  // Cierra el modal 
  emit('update:modelValue', false)
}

// Resetea el estado de las selecciones al cerrar el modal
function resetSelections() {
    selectedExtrasIds.value = []
}
</script>

<style scoped>
/* Estilos específicos si son necesarios */
</style>