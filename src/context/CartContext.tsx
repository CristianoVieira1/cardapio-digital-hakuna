import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { buildCartLineKey } from '../data/acai-toppings'
import { restaurant } from '../config/restaurant'
import type { CartItem, Product } from '../types/menu'

export interface AddItemOptions {
  quantity?: number
  notes?: string
  freeToppings?: string[]
  paidToppings?: { id: string; name: string; price: number }[]
  unitPrice?: number
}

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  deliveryFee: number
  grandTotal: number
  addItem: (product: Product, options?: AddItemOptions) => void
  removeItem: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((product: Product, options: AddItemOptions = {}) => {
    const {
      quantity = 1,
      notes,
      freeToppings = [],
      paidToppings = [],
      unitPrice = product.price,
    } = options

    const lineId = buildCartLineKey(
      product.id,
      freeToppings,
      paidToppings.map((t) => t.id),
    )

    setItems((prev) => {
      const existing = prev.find((item) => item.id === lineId)
      if (existing) {
        return prev.map((item) =>
          item.id === lineId
            ? {
                ...item,
                quantity: item.quantity + quantity,
                notes: notes ?? item.notes,
              }
            : item,
        )
      }
      return [
        ...prev,
        {
          id: lineId,
          product,
          quantity,
          unitPrice,
          notes,
          freeToppings: freeToppings.length ? freeToppings : undefined,
          paidToppings: paidToppings.length ? paidToppings : undefined,
        },
      ]
    })
  }, [])

  const removeItem = useCallback((cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId))
  }, [])

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== cartItemId))
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item,
      ),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items],
  )

  const deliveryFee = itemCount > 0 ? restaurant.deliveryFee : 0
  const grandTotal = subtotal + deliveryFee

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      deliveryFee,
      grandTotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      deliveryFee,
      grandTotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
