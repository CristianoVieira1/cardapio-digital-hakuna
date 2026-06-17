import { useMemo, useState } from 'react'
import { categories, products } from './data/menu'
import type { Product } from './types/menu'
import { Header } from './components/Header'
import { CategoryNav } from './components/CategoryNav'
import { ProductList } from './components/ProductList'
import { ProductModal } from './components/ProductModal'
import { CartBar } from './components/CartBar'
import { CartDrawer } from './components/CartDrawer'

function App() {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartOpen, setCartOpen] = useState(false)

  const filteredProducts = useMemo(
    () => products.filter((p) => p.categoryId === activeCategoryId),
    [activeCategoryId],
  )

  const activeCategoryName =
    categories.find((c) => c.id === activeCategoryId)?.name ?? ''

  return (
    <div className="app">
      <Header />
      <CategoryNav
        categories={categories}
        activeId={activeCategoryId}
        onSelect={setActiveCategoryId}
      />
      <main className="app__main">
        <ProductList
          products={filteredProducts}
          categoryName={activeCategoryName}
          categoryId={activeCategoryId}
          onProductClick={setSelectedProduct}
        />
      </main>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartBar onOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}

export default App
