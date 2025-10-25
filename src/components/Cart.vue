<template>
  <v-card 
    class="pa-4 cart-card" 
    elevation="4" 
    rounded="lg"
  >
    <h3 class="text-h5 font-weight-bold mb-4">
      <v-icon color="primary" class="mr-2">mdi-cart</v-icon>
      Tu Pedido
    </h3>

    <v-divider class="mb-4"></v-divider>

    <div v-if="cartStore.items.length > 0" class="cart-items-list">
      
      <v-list dense class="pa-0">
        <v-list-item
          v-for="item in cartStore.items"
          :key="item.itemId"
          class="px-0 py-2"
        >
          <div class="d-flex align-center">
            <div class="flex-grow-1">
              <div class="font-weight-medium text-body-1">{{ item.name }}</div>
              <div v-if="item.selectedExtras.length > 0" class="text-caption text-medium-emphasis">
                <v-icon size="12">mdi-plus</v-icon>
                {{ item.selectedExtras.map(e => e.name).join(', ') }}
              </div>
            </div>

            <div class="d-flex align-center ml-4">
              <span class="font-weight-medium mr-3">${{ item.totalPrice.toFixed(2) }}</span>
              <v-btn
                icon
                variant="text"
                size="small"
                color="red"
                @click="cartStore.removeFromCart(item.itemId)"
                :aria-label="`Remover ${item.name}`"
              >
                <v-icon size="18">mdi-delete-outline</v-icon>
              </v-btn>
            </div>
          </div>
        </v-list-item>
      </v-list>

      <v-divider class="my-4"></v-divider>

      <div class="d-flex justify-space-between align-center mt-3">
        <div class="text-h6">Total del Pedido:</div>
        <div class="text-h5 font-weight-black text-primary">
          ${{ cartStore.cartTotal.toFixed(2) }}
        </div>
      </div>
      
      <v-btn
        color="success"
        size="large"
        block
        class="mt-6"
        @click="openConfirmationModal" 
      >
        <v-icon class="mr-2">mdi-check-circle-outline</v-icon>
        Completar Orden
      </v-btn>
    </div>

    <v-alert
      v-else
      type="info"
      variant="tonal"
      icon="mdi-cart-off"
      class="mt-4"
    >
      Tu carrito está vacío. ¡Empieza a ordenar!
    </v-alert>
    
    <v-dialog v-model="isConfirmationModalOpen" max-width="500">
      <v-card>
        <v-toolbar color="primary" flat>
          <v-toolbar-title class="font-weight-bold">
            Confirma tus Datos
          </v-toolbar-title>
        </v-toolbar>
        
        <v-card-text class="pa-6">
          <p class="text-body-1 mb-4">
            Ingresa tus datos para completar la orden. Esto se incluirá en el mensaje de WhatsApp.
          </p>

          <v-text-field
            v-model="clientName"
            label="Tu Nombre Completo"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            required
            hide-details
            class="mb-4"
          ></v-text-field>

          <v-textarea
            v-model="clientAddress"
            label="Dirección de Entrega"
            prepend-inner-icon="mdi-map-marker"
            variant="outlined"
            rows="2"
            required
            hide-details
            class="mb-4"
          ></v-textarea>

          <p class="text-subtitle-1 mt-3 font-weight-bold text-center">
             Total a Pagar: ${{ cartStore.cartTotal.toFixed(2) }}
          </p>
        </v-card-text>

        <v-card-actions class="pa-4 pt-0 justify-end">
          <v-btn text @click="isConfirmationModalOpen = false">Cancelar</v-btn>
          <v-btn
            color="success"
            variant="flat"
            :disabled="!clientName || !clientAddress"
            @click="sendOrderViaWhatsapp"
          >
            Enviar Pedido por WhatsApp
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore();
const WHATSAPP_NUMBER = '584242991552'; 

// 💡 NUEVOS ESTADOS para los datos del cliente
const isConfirmationModalOpen = ref(false);
const clientName = ref('');
const clientAddress = ref('');

// Función para abrir el modal
function openConfirmationModal() {
  if (cartStore.items.length === 0) {
    alert('Tu carrito está vacío. Añade algunos productos antes de finalizar.');
    return;
  }
  isConfirmationModalOpen.value = true;
}

// Función para enviar la orden por WhatsApp (con datos del cliente)
function sendOrderViaWhatsapp() {
  if (!clientName.value || !clientAddress.value) {
    alert('Por favor, completa tu nombre y dirección.');
    return;
  }
  
  // 1. CONSTRUIR EL CUERPO DEL MENSAJE CON DATOS DEL CLIENTE
  let message = "¡Hola! Quisiera realizar un pedido para envío:\n\n";
  message += `👤 *Nombre:* ${clientName.value}\n`;
  message += `📍 *Dirección:* ${clientAddress.value}\n`;
  message += `------------------------\n`;
  
  // Detalle de los ítems
  cartStore.items.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - $${item.totalPrice.toFixed(2)}\n`;
    
    if (item.selectedExtras.length > 0) {
      const extrasList = item.selectedExtras.map(e => e.name).join(', ');
      message += `   Extras: ${extrasList}\n`;
    }
  });

  // Total
  message += `\n------------------------\n`;
  message += `TOTAL A PAGAR: $${cartStore.cartTotal.toFixed(2)}\n`;
  message += `------------------------\n`;
  message += "¡Espero su confirmación!";
  
  // 2. CODIFICAR Y CONSTRUIR EL ENLACE
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  // 3. ABRIR EL ENLACE
  window.open(whatsappUrl, '_blank');
  
  // 4. Cerrar el modal y limpiar los campos (opcional)
  isConfirmationModalOpen.value = false;
  // clientName.value = '';
  // clientAddress.value = '';
}
</script>

<style scoped>
.cart-card {
  position: sticky; 
  top: 80px; 
  max-height: calc(100vh - 100px); 
  overflow-y: auto;
}
</style>