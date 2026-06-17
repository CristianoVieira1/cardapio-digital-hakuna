import type { Category } from '../types/menu'

interface CategoryNavProps {
  categories: Category[]
  activeId: string
  onSelect: (id: string) => void
}

export function CategoryNav({ categories, activeId, onSelect }: CategoryNavProps) {
  return (
    <nav className="category-nav" aria-label="Categorias">
      <div className="category-nav__scroll">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`category-nav__item${activeId === category.id ? ' category-nav__item--active' : ''}`}
            onClick={() => onSelect(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </nav>
  )
}
