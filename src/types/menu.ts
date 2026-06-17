export interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
  categoryId: string
}

export interface Category {
  id: string
  name: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  unitPrice: number
  notes?: string
  freeToppings?: string[]
  paidToppings?: { id: string; name: string; price: number }[]
}
