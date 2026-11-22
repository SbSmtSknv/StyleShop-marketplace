import { useCallback, useMemo, useState } from 'react'
import baseProducts from '../../data/products'
import Counter from '../Counter/Counter'
import ProductItem from '../ProductItem/ProductItem'
import ProductStats from '../ProductStats/ProductStats'
import Search from '../Search/Search'
import './ProductList.css'

const PRODUCTS_PER_PAGE = 4

function createLargeCatalog() {
  const categories = ['Толстовки', 'Футболки', 'Брюки', 'Куртки', 'Свитеры', 'Юбки', 'Рубашки', 'Платья', 'Спорт']
  return Array.from({ length: 1000 }, (_, index) => {
    const number = index + 1
    const category = categories[index % categories.length]
    return {
      id: 10000 + number,
      name: `StyleShop look ${number}`,
      title: `StyleShop look ${number}`,
      description: `${category}: базовая вещь коллекции StyleShop для повседневного образа.`,
      category,
      price: 1490 + (number * 37) % 7000,
      rating: Number((3.5 + (number % 16) / 10).toFixed(1)),
      reviewsCount: 5 + (number % 40),
      sizes: ['S', 'M', 'L', 'XL'],
    }
  })
}

function calculateSomething(products) {
  console.log('calculateSomething useMemo: тяжёлое вычисление запущено')
  let result = 0
  for (let index = 0; index < 50000; index += 1) {
    result += products.length + (index % 7)
  }
  return result
}

function ProductList({ favorites, onFavoriteToggle, onAddToCart, onQuickView }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)
  const [largeMode, setLargeMode] = useState(false)

  const sourceProducts = useMemo(() => (
    largeMode ? createLargeCatalog() : baseProducts
  ), [largeMode])

  const categories = useMemo(() => (
    ['All', ...new Set(sourceProducts.map((product) => product.category))]
  ), [sourceProducts])

  const filteredProducts = useMemo(() => {
    console.log('ProductList useMemo: фильтрация и сортировка')
    const normalizedQuery = searchQuery.toLowerCase()
    const result = sourceProducts.filter((product) => {
      const name = (product.name || product.title || '').toLowerCase()
      const matchesCategory = category === 'All' || product.category === category
      return matchesCategory && name.includes(normalizedQuery)
    })

    return [...result].sort((first, second) => {
      if (sortBy === 'priceAsc') return first.price - second.price
      if (sortBy === 'priceDesc') return second.price - first.price
      if (sortBy === 'rating') return second.rating - first.rating
      return 0
    })
  }, [category, searchQuery, sortBy, sourceProducts])

  const heavyCalculation = useMemo(
    () => calculateSomething(filteredProducts),
    [filteredProducts],
  )

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }, [])

  const handleCategoryChange = useCallback((value) => {
    setCategory(value)
    setCurrentPage(1)
  }, [])

  const handleSortChange = useCallback((event) => {
    setSortBy(event.target.value)
    setCurrentPage(1)
  }, [])

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE))
  const safePage = Math.min(currentPage, pageCount)
  const visibleProducts = filteredProducts.slice(
    (safePage - 1) * PRODUCTS_PER_PAGE,
    safePage * PRODUCTS_PER_PAGE,
  )

  return (
    <div className="product-list">
      <div className="performance-demo">
        <Counter />
        <button
          className="large-catalog-button"
          type="button"
          onClick={() => {
            setLargeMode((value) => !value)
            setCurrentPage(1)
          }}
        >
          {largeMode ? 'Показать 24 товара' : 'Режим 1000 товаров'}
        </button>
        <span className="heavy-result">Оптимизированный расчёт: {heavyCalculation}</span>
      </div>

      <ProductStats products={filteredProducts} />

      <div className="catalog__toolbar performance-toolbar">
        <Search value={searchQuery} onChange={handleSearchChange} />
        <select value={category} onChange={(event) => handleCategoryChange(event.target.value)} aria-label="Категория товаров">
          {categories.map((item) => <option value={item} key={item}>{item === 'All' ? 'Все категории' : item}</option>)}
        </select>
        <select value={sortBy} onChange={handleSortChange} aria-label="Сортировка товаров">
          <option value="default">Сортировка</option>
          <option value="priceAsc">Цена: по возрастанию</option>
          <option value="priceDesc">Цена: по убыванию</option>
          <option value="rating">Рейтинг</option>
        </select>
      </div>

      <div className="product-grid">
        {visibleProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onFavoriteToggle={onFavoriteToggle}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />
        ))}
      </div>

      <div aria-label="Пагинация">
        {Array.from({ length: pageCount }, (_, index) => index + 1).slice(0, 12).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => setCurrentPage(page)}
            aria-current={page === safePage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
        {pageCount > 12 && <span className="pagination-more">+ ещё страниц: {pageCount - 12}</span>}
      </div>
    </div>
  )
}

export default ProductList
