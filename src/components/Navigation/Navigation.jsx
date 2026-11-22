import './Navigation.css'
import { Link } from 'react-router-dom'

function Navigation({ navItems = [], onNavigate }) {
  return (
    <nav className="navigation" aria-label="Основная навигация">
      {navItems.map((item) => (
        item.link.startsWith('/')
          ? <Link key={item.id} to={item.link}>{item.label}</Link>
          : <a key={item.id} href={item.link} onClick={(event) => onNavigate?.(event, item.link)}>{item.label}</a>
      ))}
    </nav>
  )
}

export default Navigation
