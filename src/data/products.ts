import type { Product } from '@/types/product';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    productName: 'Chicken Adobo',
    description: 'Chicken braised in soy sauce, vinegar and garlic, served with rice.',
    price: 500,
  },
  {
    id: 'p2',
    productName: 'Pork Sinigang',
    description: 'Pork simmered in a savory and sour tamarind broth with fresh vegetables.',
    price: 600,
  },
  {
    id: 'p3',
    productName: 'Pancit Canton',
    description: 'Stir-fried egg noodles with vegetables, pork, and savory seasonings.',
    price: 400,
  },
  {
    id: 'p4',
    productName: 'Lumpiang Shanghai',
    description: 'Crispy Filipino spring rolls filled with seasoned ground pork.',
    price: 300,
  },
  {
    id: 'p5',
    productName: 'Halo-Halo',
    description:
      'A refreshing Filipino dessert with shaved ice, sweet beans, fruits, milk, and leche flan.',
    price: 200,
  },
];
