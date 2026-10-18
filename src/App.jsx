import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import purpleSvitshot from './assets/purple_svitshot.jpg'
import { useAuth } from './context/AuthContext'
import { useCart } from './context/CartContext'
import { useTheme } from './context/ThemeContext'
import AuthForm from './components/Auth/AuthForm'
import Card from './components/Card/Card'
import CategoryFilter from './components/CategoryFilter/CategoryFilter'
import Cart from './components/Cart/Cart'
import Container from './components/Container/Container'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import HeroSection from './components/HeroSection/HeroSection'
import Modal from './components/Modal/Modal'
import SectionHeader from './components/SectionHeader/SectionHeader'
import StatCard from './components/StatCard/StatCard'
import TestimonialCard from './components/TestimonialCard/TestimonialCard'
import products from './data/products'

const navItems = [
  { id: 1, label: 'Каталог', link: '#catalog' },
  { id: 2, label: 'О бренде', link: '#about' },
  { id: 3, label: 'Отзывы', link: '#reviews' },
]

const testimonials = [
  { authorName: 'Алина М.', authorRole: 'Покупатель', avatar: 'АМ', text: 'Свитшот оказался очень мягким и отлично сел. Теперь это моя любимая вещь для прогулок.', date: '12.09.2026' },
  { authorName: 'Данияр К.', authorRole: 'Покупатель', avatar: 'ДК', text: 'Понравился минималистичный дизайн и быстрая доставка. Обязательно загляну за новой коллекцией.', date: '28.08.2026' },
  { authorName: 'Мария С.', authorRole: 'Покупатель', avatar: 'МС', text: 'Джинсы выглядят ещё лучше, чем на фото. Ткань плотная, размерная сетка точная.', date: '04.08.2026' },
  { authorName: 'Ерлан Т.', authorRole: 'Покупатель', avatar: 'ЕТ', text: 'Заказ собрали аккуратно, а вещи приятно удивили качеством. Спасибо StyleShop!', date: '19.07.2026' },
  { authorName: 'София Р.', authorRole: 'Покупатель', avatar: 'СР', text: 'Нашла здесь базовые вещи, которые легко сочетать между собой. Очень довольна покупкой.', date: '02.07.2026' },
]

function App() {
  const RUB_TO_KZT = 5
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const { totalCount, addToCart } = useCart()
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)
  const [loadedProducts, setLoadedProducts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('styleshop-favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [quantities, setQuantities] = useState({})
  const modalRef = useRef(null)
  const productsPerPage = 4

  useEffect(() => {
    const controller = new AbortController()
    const request = window.setTimeout(() => {
      if (!controller.signal.aborted) setLoadedProducts(products)
    }, 0)
    return () => {
      controller.abort()
      window.clearTimeout(request)
    }
  }, [])

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedSearchQuery(searchQuery), 500)
    return () => window.clearTimeout(timeout)
  }, [searchQuery])

  useEffect(() => {
    localStorage.setItem('styleshop-favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    document.title = `${selectedCategory === 'All' ? 'Каталог' : selectedCategory} — StyleShop`
  }, [selectedCategory])

  useEffect(() => {
    if (!isModalOpen) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsModalOpen(false)
    }
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) setIsModalOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isModalOpen])

  useEffect(() => {
    const handleResize = () => setIsMobileMenuOpen((isOpen) => (window.innerWidth > 760 ? false : isOpen))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  useEffect(() => {
    const interval = window.setInterval(() => {}, 60000)
    return () => window.clearInterval(interval)
  }, [])

  const categories = ['All', ...new Set(loadedProducts.map((product) => product.category))]
  const filteredProducts = useMemo(() => {
    const result = loadedProducts.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      return matchesCategory && product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    })
    return [...result].sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price
      if (sortBy === 'priceDesc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })
  }, [debouncedSearchQuery, loadedProducts, selectedCategory, sortBy])
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage))

  const openQuickView = (product) => { setSelectedProduct(product); setIsModalOpen(true) }
  const changeTestimonial = (direction) => setActiveTestimonial((current) => (current + direction + testimonials.length) % testimonials.length)
  const scrollToCatalog = () => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToSection = (event, link) => {
    event.preventDefault()
    document.getElementById(link.replace('#', ''))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', link)
  }
  const toggleFavorite = (productId) => setFavorites((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId])

  return (
    <div className={`app ${theme}`}>
      <Container>
        <Header navItems={navItems} user={user} favoriteCount={favorites.length} cartCount={totalCount} onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} onNavigate={scrollToSection} onCartClick={() => setIsCartOpen(true)} onAuthClick={() => setIsAuthOpen(true)} onLogout={logout} />
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Переключить тему">
          {theme === 'dark' ? '☀ Светлая тема' : '☾ Тёмная тема'}
        </button>
        {isMobileMenuOpen && <div className="mobile-menu">Меню открыто</div>}
        <main>
          <HeroSection heading="Одежда для твоего ритма" subheading="Собирай удобные образы из базовых вещей StyleShop." buttonText="Смотреть каталог" onButtonClick={scrollToCatalog} />
          <section className="stats" aria-label="Статистика магазина">
            <StatCard title="Продано товаров" value="12 480" change="+12%" isPositive />
            <StatCard title="Клиентов" value="4 820" change="+8%" isPositive />
            <StatCard title="Отзывов" value="1 240" change="+16%" isPositive />
          </section>
          <section id="catalog" className="catalog">
            <SectionHeader title="Новая коллекция" subtitle="Выбери вещь для следующего образа" align="left" />
            <div className="catalog__toolbar">
              <input type="search" placeholder="Поиск товаров" value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setCurrentPage(1) }} />
              <select value={sortBy} onChange={(event) => { setSortBy(event.target.value); setCurrentPage(1) }} aria-label="Сортировка товаров">
                <option value="default">Сортировка</option><option value="priceAsc">Цена: по возрастанию</option><option value="priceDesc">Цена: по убыванию</option><option value="rating">Рейтинг</option>
              </select>
              <CategoryFilter categories={categories} activeCategory={selectedCategory} onCategoryChange={(category) => { setSelectedCategory(category); setCurrentPage(1) }} />
            </div>
            <div className="product-grid">
              {filteredProducts.slice((Math.min(currentPage, pageCount) - 1) * productsPerPage, Math.min(currentPage, pageCount) * productsPerPage).map((product) => {
                const quantity = quantities[product.id] || 1
                return <Card key={product.id} {...product} price={product.price * RUB_TO_KZT} imageUrl={purpleSvitshot} onClick={() => openQuickView(product)} isFavorite={favorites.includes(product.id)} onFavoriteToggle={() => toggleFavorite(product.id)} quantity={quantity} onQuantityChange={(nextQuantity) => setQuantities((current) => ({ ...current, [product.id]: Math.max(1, nextQuantity) }))} onAddToCart={() => addToCart(product, quantity)} />
              })}
            </div>
            <div aria-label="Пагинация">
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => <button key={page} type="button" onClick={() => setCurrentPage(page)} aria-current={page === Math.min(currentPage, pageCount) ? 'page' : undefined}>{page}</button>)}
            </div>
          </section>
          <section id="about" className="about-section"><SectionHeader title="О бренде" subtitle="StyleShop — базовые вещи для твоего ритма" align="center" /><div className="about-section__content"><p>Мы создаём удобную одежду, которая помогает чувствовать себя собой каждый день. Собираем коллекции из универсальных вещей, сочетаем спокойные цвета и качественные материалы.</p><p>StyleShop вдохновлён городским ритмом и простыми образами, которые легко адаптировать под работу, прогулку или встречу с друзьями.</p></div></section>
          <section id="reviews" className="reviews-section"><SectionHeader title="Отзывы покупателей" subtitle="Что говорят те, кто уже выбрал StyleShop" align="center" /><div className="reviews-slider"><button className="reviews-slider__button" type="button" onClick={() => changeTestimonial(-1)} aria-label="Предыдущий отзыв" /><TestimonialCard {...testimonials[activeTestimonial]} /><button className="reviews-slider__button" type="button" onClick={() => changeTestimonial(1)} aria-label="Следующий отзыв" /></div><div className="reviews-slider__pagination" aria-label="Выбор отзыва">{testimonials.map((testimonial, index) => <button className={index === activeTestimonial ? 'active' : ''} key={testimonial.authorName} type="button" onClick={() => setActiveTestimonial(index)} aria-label={`Показать отзыв ${index + 1}`} aria-pressed={index === activeTestimonial} />)}</div></section>
        </main>
        <Footer copyrightText="© 2026 StyleShop" socialLinks={[{ platform: 'Telegram', url: '#', icon: 'TG' }, { platform: 'VK', url: '#', icon: 'VK' }]} />
      </Container>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {isAuthOpen && <AuthForm onClose={() => setIsAuthOpen(false)} />}
      <div ref={modalRef}><Modal isOpen={isModalOpen} title={selectedProduct?.title || 'Товар'} onClose={() => setIsModalOpen(false)}><p>{selectedProduct?.description}</p><strong>{selectedProduct ? `${(selectedProduct.price * RUB_TO_KZT).toLocaleString('ru-RU')} ₸` : ''}</strong></Modal></div>
    </div>
  )
}

export default App
