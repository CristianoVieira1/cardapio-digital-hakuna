import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'

interface CartBarProps {
  onOpen: () => void
}

export function CartBar({ onOpen }: CartBarProps) {
  const { itemCount, grandTotal } = useCart()

  if (itemCount === 0) return null

  return (
    <div className="cart-bar">
      <button type="button" className="cart-bar__btn" onClick={onOpen}>
        <span className="cart-bar__badge">{itemCount}</span>
        <span className="cart-bar__label">Ver carrinho</span>
        <span className="cart-bar__total">{formatPrice(grandTotal)}</span>
      </button>
    </div>
  )
}
