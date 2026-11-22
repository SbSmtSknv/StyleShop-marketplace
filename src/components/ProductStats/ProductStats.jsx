import { memo, useMemo } from 'react'

function ProductStats({ products }) {
  const stats = useMemo(() => {
    console.log('ProductStats useMemo: пересчёт статистики')
    if (products.length === 0) {
      return { count: 0, averagePrice: 0, averageRating: 0 }
    }
    const totalPrice = products.reduce((sum, product) => sum + product.price, 0)
    const totalRating = products.reduce((sum, product) => sum + product.rating, 0)
    return {
      count: products.length,
      averagePrice: totalPrice / products.length,
      averageRating: totalRating / products.length,
    }
  }, [products])

  return (
    <div className="product-stats" aria-label="Статистика найденных товаров">
      <span>Найдено: <strong>{stats.count}</strong></span>
      <span>Средняя цена: <strong>{stats.averagePrice.toLocaleString('ru-RU')} ₽</strong></span>
      <span>Средний рейтинг: <strong>{stats.averageRating.toFixed(1)}</strong></span>
    </div>
  )
}

export default memo(ProductStats)
