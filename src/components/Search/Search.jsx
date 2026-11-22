import { memo } from 'react'

function Search({ value, onChange }) {
  return (
    <input
      className="performance-search"
      type="search"
      placeholder="Поиск товаров"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Поиск товаров"
    />
  )
}

export default memo(Search)
