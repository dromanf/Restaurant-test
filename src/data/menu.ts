// src/data/menu.ts

// Tipos de Extras que existen en la carta
export type ExtraType = 'burger_toppings' | 'general' | 'none';

export interface Extra {
  id: number;
  name: string;
  price: number;
  type: ExtraType;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'entradas' | 'principales' | 'bebidas' | 'postres';
  extraType: ExtraType; // Define qué tipo de extra acepta el producto
  image?: string; 
}

// 💡 CORRECCIÓN: Asegurar que TODAS las constantes necesarias estén exportadas
export const menuCategories = [
  { key: 'entradas', name: 'Entradas' },
  { key: 'principales', name: 'Principales' },
  { key: 'bebidas', name: 'Bebidas' },
  { key: 'postres', name: 'Postres' },
];

export const menuProducts: Product[] = [
  // Entradas
  { id: 101, name: 'Sopa del Día', description: 'Una sopa ligera y nutritiva.', price: 5.00, category: 'entradas', extraType: 'general' },
  { id: 102, name: 'Tostones con Guacamole', description: 'Tostones crujientes con guacamole fresco.', price: 8.50, category: 'entradas', extraType: 'none' },

  // Principales
  { id: 201, name: 'Hamburguesa Clásica', description: 'Carne premium, lechuga y tomate.', price: 12.00, category: 'principales', extraType: 'burger_toppings' },
  { id: 202, name: 'Parrillada Mixta', description: 'Selección de carnes a la parrilla.', price: 25.00, category: 'principales', extraType: 'none' },

  // Bebidas
  { id: 301, name: 'Limonada Natural', description: 'Refrescante limonada hecha al momento.', price: 3.50, category: 'bebidas', extraType: 'none' },
  { id: 302, name: 'Cerveza Artesanal', description: 'Cerveza IPA local.', price: 6.00, category: 'bebidas', extraType: 'none' },

  // Postres
  { id: 401, name: 'Tiramisú', description: 'Postre italiano clásico.', price: 7.00, category: 'postres', extraType: 'general' },
  { id: 402, name: 'Cheesecake de Fresa', description: 'Cremoso cheesecake con top de fresa.', price: 6.50, category: 'postres', extraType: 'general' },
];

export const productExtras: Extra[] = [
  { id: 901, name: 'Queso Extra', price: 1.50, type: 'burger_toppings' },
  { id: 902, name: 'Bacon', price: 2.00, type: 'burger_toppings' },
  { id: 903, name: 'Aguacate', price: 1.80, type: 'burger_toppings' },
  { id: 904, name: 'Miel', price: 1.00, type: 'general' },
  { id: 905, name: 'Crema Batida', price: 0.50, type: 'general' },
];