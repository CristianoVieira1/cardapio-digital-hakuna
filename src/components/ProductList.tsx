import type { Product } from '../types/menu'
import { ProductCard } from './ProductCard'

interface ProductListProps {
  products: Product[]
  categoryName: string
  categoryId: string
  onProductClick: (product: Product) => void
}

export function ProductList({
  products,
  categoryName,
  categoryId,
  onProductClick,
}: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="product-list__empty">
        <p>Nenhum produto nesta categoria.</p>
      </div>
    )
  }

  return (
    <section className="product-list">
      <div className="product-list__header">
        <h2 className="product-list__title">Exibindo: {categoryName}</h2>
        {categoryId === 'batatas' && (
          <span className="product-list__badge">Preço único R$ 25,90</span>
        )}
        {categoryId === 'acai' && (
          <span className="product-list__badge product-list__badge--acai">
            Até 3 acompanhamentos grátis
          </span>
        )}
      </div>
      <div className="product-list__grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={onProductClick}
          />
        ))}
      </div>
    </section>
  )
}
