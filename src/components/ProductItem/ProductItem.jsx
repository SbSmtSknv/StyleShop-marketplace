import { memo, useCallback } from 'react'
import Card from '../Card/Card'
import purpleSvitshot from '../../assets/purple_svitshot.jpg'

function ProductItem({ product, isFavorite, onFavoriteToggle, onAddToCart, onQuickView }) {
  console.log('ProductItem render:', product.name)

  const handleFavorite = useCallback(() => {
    onFavoriteToggle(product.id)
  }, [onFavoriteToggle, product.id])

  const handleAdd = useCallback(() => {
    onAddToCart(product)
  }, [onAddToCart, product])

  const handleQuickView = useCallback(() => {
    onQuickView(product)
  }, [onQuickView, product])

  return (
    <Card
      title={product.name}
      description={product.description}
      imageUrl={purpleSvitshot}
      price={product.price * 5}
      rating={product.rating}
      reviewsCount={product.reviewsCount}
      isFavorite={isFavorite}
      onFavoriteToggle={handleFavorite}
      quantity={1}
      onAddToCart={handleAdd}
      onClick={handleQuickView}
    />
  )
}

export default memo(ProductItem)
