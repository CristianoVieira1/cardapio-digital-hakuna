import type { Product } from '../types/menu'
import { formatPrice } from '../utils/format'

interface ProductCardProps {
  product: Product
  onClick: (product: Product) => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <button
      type="button"
      className="product-card"
      onClick={() => onClick(product)}
    >
      {product.image && (
        <div className="product-card__image-wrap">
          <img
            src={product.image}
            alt={product.name}
            className="product-card__image"
            loading="lazy"
          />
        </div>
      )}
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <span className="product-card__price">{formatPrice(product.price)}</span>
      </div>
    </button>
  )
}
