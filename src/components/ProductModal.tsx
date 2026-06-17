import { useEffect, useMemo, useState } from 'react'
import type { Product } from '../types/menu'
import {
  FREE_ACAI_TOPPINGS,
  MAX_FREE_ACAI_TOPPINGS,
  PAID_ACAI_TOPPINGS,
  getUnitPrice,
  isAcaiSize,
  type AcaiTopping,
} from '../data/acai-toppings'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')
  const [freeToppings, setFreeToppings] = useState<string[]>([])
  const [paidToppings, setPaidToppings] = useState<AcaiTopping[]>([])

  const isAcai = product ? isAcaiSize(product.id) : false

  useEffect(() => {
    if (product) {
      setQuantity(1)
      setNotes('')
      setFreeToppings([])
      setPaidToppings([])
    }
  }, [product])

  useEffect(() => {
    if (!product) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [product, onClose])

  const unitPrice = useMemo(() => {
    if (!product) return 0
    return isAcai ? getUnitPrice(product.price, paidToppings) : product.price
  }, [product, isAcai, paidToppings])

  if (!product) return null

  const toggleFree = (name: string) => {
    setFreeToppings((prev) => {
      if (prev.includes(name)) return prev.filter((t) => t !== name)
      if (prev.length >= MAX_FREE_ACAI_TOPPINGS) return prev
      return [...prev, name]
    })
  }

  const togglePaid = (topping: AcaiTopping) => {
    setPaidToppings((prev) => {
      const exists = prev.some((t) => t.id === topping.id)
      return exists
        ? prev.filter((t) => t.id !== topping.id)
        : [...prev, topping]
    })
  }

  const handleAdd = () => {
    addItem(product, {
      quantity,
      notes: notes.trim() || undefined,
      freeToppings: isAcai ? freeToppings : undefined,
      paidToppings: isAcai ? paidToppings : undefined,
      unitPrice,
    })
    onClose()
  }

  const lineTotal = unitPrice * quantity

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Fechar"
        >
          ✕
        </button>

        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="modal__image"
          />
        )}

        <div className="modal__content">
          <h2 id="product-modal-title" className="modal__title">
            {product.name}
          </h2>
          <p className="modal__description">{product.description}</p>

          {isAcai ? (
            <>
              <div className="toppings-section">
                <h3 className="toppings-section__title">
                  Grátis — escolha até {MAX_FREE_ACAI_TOPPINGS}
                  <span className="toppings-section__count">
                    {freeToppings.length}/{MAX_FREE_ACAI_TOPPINGS}
                  </span>
                </h3>
                <div className="toppings-grid">
                  {FREE_ACAI_TOPPINGS.map((topping) => {
                    const selected = freeToppings.includes(topping.name)
                    const disabled =
                      !selected && freeToppings.length >= MAX_FREE_ACAI_TOPPINGS
                    return (
                      <button
                        key={topping.id}
                        type="button"
                        className={`topping-chip topping-chip--free${selected ? ' topping-chip--selected' : ''}`}
                        onClick={() => toggleFree(topping.name)}
                        disabled={disabled}
                      >
                        {topping.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="toppings-section">
                <h3 className="toppings-section__title">Adicionais pagos</h3>
                <div className="toppings-grid">
                  {PAID_ACAI_TOPPINGS.map((topping) => {
                    const selected = paidToppings.some((t) => t.id === topping.id)
                    return (
                      <button
                        key={topping.id}
                        type="button"
                        className={`topping-chip topping-chip--paid${selected ? ' topping-chip--selected' : ''}`}
                        onClick={() => togglePaid(topping)}
                      >
                        <span>{topping.name}</span>
                        <span className="topping-chip__price">
                          +{formatPrice(topping.price)}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="modal__price-breakdown">
                <div className="modal__price-row">
                  <span>Base</span>
                  <span>{formatPrice(product.price)}</span>
                </div>
                {paidToppings.map((t) => (
                  <div key={t.id} className="modal__price-row">
                    <span>{t.name}</span>
                    <span>+{formatPrice(t.price)}</span>
                  </div>
                ))}
                <div className="modal__price-row modal__price-row--total">
                  <span>Total unitário</span>
                  <strong>{formatPrice(unitPrice)}</strong>
                </div>
              </div>
            </>
          ) : (
            <p className="modal__price">{formatPrice(product.price)}</p>
          )}

          <label className="modal__label">
            Observações
            <textarea
              className="modal__textarea"
              placeholder={
                isAcai
                  ? 'Alguma observação sobre o seu açaí?'
                  : 'Ex: sem cebola, ponto da carne...'
              }
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </label>

          <div className="modal__actions">
            <div className="quantity-control">
              <button
                type="button"
                className="quantity-control__btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Diminuir quantidade"
              >
                −
              </button>
              <span className="quantity-control__value">{quantity}</span>
              <button
                type="button"
                className="quantity-control__btn"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>

            <button type="button" className="btn btn--primary" onClick={handleAdd}>
              Adicionar — {formatPrice(lineTotal)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
