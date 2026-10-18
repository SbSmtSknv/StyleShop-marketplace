import './Header.css'
import Logo from '../Logo/Logo'
import Navigation from '../Navigation/Navigation'
import UserProfile from '../UserProfile/UserProfile'

function Header({ navItems = [], user, favoriteCount = 0, cartCount = 0, onMenuToggle, onNavigate, onCartClick, onAuthClick, onLogout }) {
  return (
    <header className="header">
      <Logo altText="Логотип StyleShop" width={48} height={48} />
      <Navigation navItems={navItems} onNavigate={onNavigate} />
      <div className="header__actions">
        <span>♡ {favoriteCount}</span>
        <button className="header__cart-button" type="button" onClick={onCartClick}>Корзина {cartCount}</button>
        <UserProfile user={user} />
        {user
          ? <button className="header__auth-button" type="button" onClick={onLogout}>Выйти</button>
          : <button className="header__auth-button" type="button" onClick={onAuthClick}>Войти</button>}
        <button className="menu-button" type="button" onClick={onMenuToggle} aria-label="Открыть меню">☰</button>
      </div>
    </header>
  )
}

export default Header
