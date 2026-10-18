import './Cart.css'
import { useCart } from '../../context/CartContext'

const RUB_TO_KZT = 5

function Cart({ isOpen, onClose }) {
  const { cartItems, totalCount, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart()

  if (!isOpen) return null

  return (
    <aside className="cart-panel" aria-label="Корзина">
      <div className="cart-panel__header">
        <h2>Корзина</h2>
        <button className="cart-panel__close" type="button" onClick={onClose} aria-label="Закрыть корзину">×</button>
      </div>
      {cartItems.length === 0 ? (
        <p className="cart-panel__empty">Корзина пока пуста</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li className="cart-item" key={item.id}>
                <div>
                  <strong>{item.title}</strong>
                  <span>{(item.price * RUB_TO_KZT).toLocaleString('ru-RU')} ₸</span>
                </div>
                <div className="quantity-control">
                  <button className="quantity-control__button" type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} aria-label={`Уменьшить количество: ${item.title}`}>−</button>
                  <span>{item.quantity}</span>
                  <button className="quantity-control__button" type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Увеличить количество: ${item.title}`}>+</button>
                </div>
                <button className="cart-item__remove" type="button" onClick={() => removeFromCart(item.id)}>Удалить</button>
              </li>
            ))}
          </ul>
          <div className="cart-panel__footer">
            <strong>Товаров: {totalCount}</strong>
            <strong>Итого: {(totalPrice * RUB_TO_KZT).toLocaleString('ru-RU')} ₸</strong>
            <button className="cart-panel__clear" type="button" onClick={clearCart}>Очистить корзину</button>
          </div>
        </>
      )}
    </aside>
  )
}

export default Cart
