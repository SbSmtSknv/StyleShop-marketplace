/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const CART_STORAGE_KEY = 'styleshop-cart'

function getInitialItems() {
  const savedItems = localStorage.getItem(CART_STORAGE_KEY)
  if (!savedItems) return []
  const parsedItems = JSON.parse(savedItems)
  return Array.isArray(parsedItems) ? parsedItems : []
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getInitialItems)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const value = useMemo(() => {
    const addToCart = (product, quantity = 1) => {
      setCartItems((items) => {
        const existingItem = items.find((item) => item.id === product.id)
        if (existingItem) {
          return items.map((item) => item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item)
        }
        return [...items, { ...product, quantity }]
      })
    }

    const updateQuantity = (productId, quantity) => {
      setCartItems((items) => items.map((item) => item.id === productId
        ? { ...item, quantity: Math.max(1, quantity) }
        : item))
    }

    return {
      cartItems,
      addToCart,
      removeFromCart: (productId) => setCartItems((items) => items.filter((item) => item.id !== productId)),
      updateQuantity,
      clearCart: () => setCartItems([]),
      totalCount: cartItems.reduce((total, item) => total + item.quantity, 0),
      totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    }
  }, [cartItems])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
