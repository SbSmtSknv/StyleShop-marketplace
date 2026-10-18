import './Card.css'
import Badge from '../Badge/Badge'
import RatingStars from '../RatingStars/RatingStars'

function Card({
  title, description, imageUrl, price, rating = 5, reviewsCount = 0, onClick,
  isFavorite = false, onFavoriteToggle, quantity = 1, onQuantityChange, onAddToCart,
}) {
  return (
    <article className="product-card" onClick={onClick}>
      <button type="button" onClick={(event) => { event.stopPropagation(); onFavoriteToggle?.() }} aria-label="Добавить в избранное" aria-pressed={isFavorite}>
        {isFavorite ? '♥' : '♡'}
      </button>
      <div className="product-card__image">
        {imageUrl ? <img src={imageUrl} alt={title} /> : 'IMG'}
      </div>
      <Badge label="New" colorScheme="green" />
      <h3>{title}</h3>
      <p>{description}</p>
      <RatingStars score={rating} reviewsCount={reviewsCount} />
      <strong>{price.toLocaleString('ru-RU')} ₸</strong>
      <div onClick={(event) => event.stopPropagation()}>
        <div className="quantity-control">
          <button className="quantity-control__button" type="button" onClick={() => onQuantityChange?.(quantity - 1)} disabled={quantity <= 1}>−</button>
          <span>{quantity}</span>
          <button className="quantity-control__button" type="button" onClick={() => onQuantityChange?.(quantity + 1)}>+</button>
        </div>
        <button className="add-to-cart-button" type="button" onClick={onAddToCart}>В корзину</button>
      </div>
    </article>
  )
}

export default Card
