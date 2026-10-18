import './Navigation.css'

function Navigation({ navItems = [], onNavigate }) {
  return (
    <nav className="navigation" aria-label="Основная навигация">
      {navItems.map((item) => (
        <a key={item.id} href={item.link} onClick={(event) => onNavigate?.(event, item.link)}>
          {item.label}
        </a>
      ))}
    </nav>
  )
}

export default Navigation
