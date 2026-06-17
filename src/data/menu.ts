import type { Category, Product } from '../types/menu'
import { productImage } from './images'

export const categories: Category[] = [
  { id: 'batatas', name: 'Batatas Recheadas' },
  { id: 'acai', name: 'Açaí' },
]

export const products: Product[] = [
  {
    id: 'batata-carne-moida-pumba',
    name: 'Batata de Carne Moída — Pumba',
    description:
      'Carne moída, requeijão, parmesão e batata palha. Preço único especial.',
    price: 25.9,
    categoryId: 'batatas',
    image: productImage(
      'produtos-batatas',
      'WhatsApp Image 2026-06-17 at 13.17.13 (1).jpeg',
    ),
  },
  {
    id: 'batata-calabresa-rafiki',
    name: 'Batata de Calabresa — Rafiki',
    description:
      'Calabresa, requeijão, parmesão e batata palha. Preço único especial.',
    price: 25.9,
    categoryId: 'batatas',
    image: productImage(
      'produtos-batatas',
      'WhatsApp Image 2026-06-17 at 13.17.11 (1).jpeg',
    ),
  },
  {
    id: 'batata-coracao-kovu',
    name: 'Batata de Coração — Kovu',
    description:
      'Coração de frango, requeijão, parmesão e batata palha. Preço único especial.',
    price: 25.9,
    categoryId: 'batatas',
    image: productImage(
      'produtos-batatas',
      'WhatsApp Image 2026-06-17 at 13.17.12.jpeg',
    ),
  },
  {
    id: 'batata-bolonhesa-doritos-scar',
    name: 'Batata Carne Bolonhesa com Doritos — Scar',
    description:
      'Carne moída, requeijão, parmesão e Doritos. Preço único especial.',
    price: 25.9,
    categoryId: 'batatas',
    image: productImage(
      'produtos-batatas',
      'WhatsApp Image 2026-06-17 at 13.17.25.jpeg',
    ),
  },
  {
    id: 'batata-fricasse-nala',
    name: 'Batata de Fricassê — Nala',
    description:
      'Fricassê de frango desfiado, requeijão, parmesão e batata palha. Preço único especial.',
    price: 25.9,
    categoryId: 'batatas',
    image: productImage(
      'produtos-batatas',
      'WhatsApp Image 2026-06-17 at 13.17.10.jpeg',
    ),
  },
  {
    id: 'batata-bacon-milho-timao',
    name: 'Batata de Bacon com Creme de Milho — Timão',
    description:
      'Creme de milho, bacon, parmesão e batata palha. Preço único especial.',
    price: 25.9,
    categoryId: 'batatas',
    image: productImage(
      'produtos-batatas',
      'WhatsApp Image 2026-06-17 at 13.17.24.jpeg',
    ),
  },
  {
    id: 'batata-strogonoff-simba',
    name: 'Batata Strogonoff — Simba',
    description:
      'Strogonoff de carne, requeijão, parmesão e batata palha. Preço único especial.',
    price: 25.9,
    categoryId: 'batatas',
    image: productImage(
      'produtos-batatas',
      'WhatsApp Image 2026-06-17 at 13.17.13.jpeg',
    ),
  },
  {
    id: 'batata-bolonhesa-cheddar-mufasa',
    name: 'Batata com Molho Bolonhesa e Cheddar — Mufasa',
    description:
      'Molho bolonhesa, cheddar, parmesão e batata palha. Preço único especial.',
    price: 25.9,
    categoryId: 'batatas',
    image: productImage(
      'produtos-batatas',
      'WhatsApp Image 2026-06-17 at 13.17.24 (1).jpeg',
    ),
  },
  {
    id: 'acai-200ml',
    name: 'Açaí 200ml',
    description: 'Monte seu açaí! Escolha até 3 acompanhamentos grátis e adicionais pagos.',
    price: 15,
    categoryId: 'acai',
    image: productImage(
      'produtos-acai',
      'WhatsApp Image 2026-06-17 at 13.33.34 (1).jpeg',
    ),
  },
  {
    id: 'acai-300ml',
    name: 'Açaí 300ml',
    description: 'Monte seu açaí! Escolha até 3 acompanhamentos grátis e adicionais pagos.',
    price: 18,
    categoryId: 'acai',
    image: productImage(
      'produtos-acai',
      'WhatsApp Image 2026-06-17 at 13.33.33 (1).jpeg',
    ),
  },
  {
    id: 'acai-500ml',
    name: 'Açaí 500ml',
    description: 'Monte seu açaí! Escolha até 3 acompanhamentos grátis e adicionais pagos.',
    price: 22,
    categoryId: 'acai',
    image: productImage(
      'produtos-acai',
      'WhatsApp Image 2026-06-17 at 13.33.35.jpeg',
    ),
  },
]
