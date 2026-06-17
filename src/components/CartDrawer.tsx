import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import { buildWhatsAppUrl } from '../utils/whatsapp'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    grandTotal,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart()

  const [customerName, setCustomerName] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Pix')
  const [changeFor, setChangeFor] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (!open) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  useEffect(() => {
    if (paymentMethod !== 'Dinheiro') {
      setChangeFor('')
    }
  }, [paymentMethod])

  if (!open) return null

  const changeForValue = parseFloat(changeFor.replace(',', '.'))
  const isCash = paymentMethod === 'Dinheiro'
  const changeValid =
    !isCash || (!Number.isNaN(changeForValue) && changeForValue >= grandTotal)

  const handleSubmit = () => {
    if (!customerName.trim() || !address.trim() || items.length === 0) return
    if (isCash && !changeValid) return

    const url = buildWhatsAppUrl(items, {
      customerName: customerName.trim(),
      address: address.trim(),
      paymentMethod,
      changeFor: isCash ? changeForValue : undefined,
      notes: notes.trim() || undefined,
    })

    window.open(url, '_blank', 'noopener,noreferrer')
    clearCart()
    onClose()
    setCustomerName('')
    setAddress('')
    setPaymentMethod('Pix')
    setChangeFor('')
    setNotes('')
  }

  const canSubmit =
    customerName.trim() && address.trim() && items.length > 0 && changeValid

  return (
    <div className="drawer-overlay" onClick={onClose} role="presentation">
      <aside
        className="drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <div className="drawer__header">
          <h2 id="cart-drawer-title" className="drawer__title">
            Seu pedido
          </h2>
          <button
            type="button"
            className="drawer__close"
            onClick={onClose}
            aria-label="Fechar carrinho"
          >
            ✕
          </button>
        </div>

        {itemCount === 0 ? (
          <p className="drawer__empty">Seu carrinho está vazio.</p>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item__info">
                    <span className="cart-item__name">{item.product.name}</span>
                    <span className="cart-item__price">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                    {item.freeToppings && item.freeToppings.length > 0 && (
                      <span className="cart-item__notes">
                        Grátis: {item.freeToppings.join(', ')}
                      </span>
                    )}
                    {item.paidToppings && item.paidToppings.length > 0 && (
                      <span className="cart-item__notes">
                        Pagos:{' '}
                        {item.paidToppings
                          .map((t) => `${t.name} (+${formatPrice(t.price)})`)
                          .join(', ')}
                      </span>
                    )}
                    {item.notes && (
                      <span className="cart-item__notes">Obs: {item.notes}</span>
                    )}
                  </div>
                  <div className="cart-item__controls">
                    <div className="quantity-control quantity-control--sm">
                      <button
                        type="button"
                        className="quantity-control__btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        aria-label="Diminuir"
                      >
                        −
                      </button>
                      <span className="quantity-control__value">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="quantity-control__btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        aria-label="Aumentar"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="cart-item__remove"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remover item"
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="drawer__summary">
              <div className="drawer__summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="drawer__summary-row">
                <span>Taxa de entrega</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
              <div className="drawer__summary-row drawer__summary-row--total">
                <span>Total</span>
                <strong>{formatPrice(grandTotal)}</strong>
              </div>
            </div>

            <form
              className="checkout-form"
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
            >
              <label className="checkout-form__label">
                Seu nome *
                <input
                  type="text"
                  className="checkout-form__input"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Como podemos te chamar?"
                  required
                />
              </label>

              <label className="checkout-form__label">
                Endereço de entrega *
                <input
                  type="text"
                  className="checkout-form__input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Rua, número, bairro, complemento..."
                  required
                />
              </label>

              <label className="checkout-form__label">
                Forma de pagamento
                <select
                  className="checkout-form__input"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="Pix">Pix</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão na entrega">Cartão na entrega</option>
                </select>
              </label>

              {isCash && (
                <label className="checkout-form__label">
                  Troco para quanto? *
                  <input
                    type="text"
                    inputMode="decimal"
                    className="checkout-form__input"
                    value={changeFor}
                    onChange={(e) => setChangeFor(e.target.value)}
                    placeholder={`Mínimo ${formatPrice(grandTotal)}`}
                    required
                  />
                  {changeFor && !changeValid && (
                    <span className="checkout-form__error">
                      O valor deve ser igual ou maior que {formatPrice(grandTotal)}
                    </span>
                  )}
                </label>
              )}

              <label className="checkout-form__label">
                Observações do pedido
                <textarea
                  className="checkout-form__input checkout-form__textarea"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Alguma observação geral?"
                  rows={2}
                />
              </label>

              <button
                type="submit"
                className="btn btn--whatsapp"
                disabled={!canSubmit}
              >
                Enviar pedido via WhatsApp
              </button>
            </form>
          </>
        )}
      </aside>
    </div>
  )
}
