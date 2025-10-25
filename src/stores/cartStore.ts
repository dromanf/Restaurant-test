// src/stores/cartStore.ts
import { defineStore } from 'pinia'
import type { Product, Extra } from '@/data/menu' // Importamos los tipos

export interface CartItem {
  itemId: number; // ID único para el item en el carrito (no el ID del producto)
  productId: number;
  name: string;
  basePrice: number;
  selectedExtras: Extra[];
  quantity: number;
  totalPrice: number; // Precio calculado (base + extras)
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    nextItemId: 1,
  }),

  getters: {
    // Calcula el subtotal de todos los ítems en el carrito
    cartTotal(state): number {
      return state.items.reduce((total, item) => total + item.totalPrice, 0)
    },
  },

  actions: {
    /**
     * Añade un producto con extras al carrito
     * @param product Producto seleccionado
     * @param extras Lista de extras seleccionados para ese producto
     */
    addToCart(product: Product, selectedExtras: Extra[]) {
      const extraPrice = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
      const totalPrice = (product.price + extraPrice);

      const newItem: CartItem = {
        itemId: this.nextItemId++, // Asigna y luego incrementa el ID
        productId: product.id,
        name: product.name,
        basePrice: product.price,
        selectedExtras,
        quantity: 1,
        totalPrice,
      }

      this.items.push(newItem)
    },

    // Quita un item específico del carrito
    removeFromCart(itemId: number) {
      this.items = this.items.filter(item => item.itemId !== itemId)
    }
  },
})