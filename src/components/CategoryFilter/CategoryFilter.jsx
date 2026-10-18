import './CategoryFilter.css'

function CategoryFilter({ categories = [], activeCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          className={category === activeCategory ? 'active' : ''}
          key={category}
          type="button"
          onClick={() => onCategoryChange(category)}
          aria-pressed={category === activeCategory}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
