export interface AcaiTopping {
  id: string
  name: string
  price: number
}

export const MAX_FREE_ACAI_TOPPINGS = 3

export const FREE_ACAI_TOPPINGS = [
  { id: 'pacoca', name: 'Paçoca' },
  { id: 'granola', name: 'Granola' },
  { id: 'leite-po', name: 'Leite em pó' },
  { id: 'leite-condensado', name: 'Leite condensado' },
  { id: 'sucrilhos', name: 'Sucrilhos' },
  { id: 'aveia', name: 'Aveia' },
  { id: 'bis', name: 'Bis' },
  { id: 'canudo-wafer', name: 'Canudo wafer' },
] as const

export const PAID_ACAI_TOPPINGS: AcaiTopping[] = [
  { id: 'nutella', name: 'Nutella', price: 7 },
  { id: 'creme-ninho', name: 'Creme Ninho', price: 5 },
  { id: 'creme-avela', name: 'Creme de avelã', price: 5 },
  { id: 'oreo', name: 'Oreo', price: 3 },
  { id: 'ouro-branco', name: 'Ouro Branco', price: 3 },
  { id: 'ovomaltine', name: 'Ovomaltine', price: 3 },
  { id: 'stikadinho', name: 'Stikadinho', price: 4 },
  { id: 'kit-kat', name: 'Kit Kat', price: 4 },
  { id: 'morango', name: 'Morango', price: 3 },
]

export function isAcaiSize(productId: string): boolean {
  return productId.startsWith('acai-') && !productId.includes('adicional')
}

export function getUnitPrice(
  basePrice: number,
  paidToppings: AcaiTopping[],
): number {
  return basePrice + paidToppings.reduce((sum, t) => sum + t.price, 0)
}

export function buildCartLineKey(
  productId: string,
  freeIds: string[],
  paidIds: string[],
): string {
  return `${productId}|f:${[...freeIds].sort().join(',')}|p:${[...paidIds].sort().join(',')}`
}
