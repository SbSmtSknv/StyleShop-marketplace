import { memo, useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="performance-counter" aria-label="Отдельный счётчик демонстрации">
      <span>Счётчик: {count}</span>
      <button type="button" onClick={() => setCount((value) => value - 1)} aria-label="Уменьшить счётчик">−</button>
      <button type="button" onClick={() => setCount((value) => value + 1)} aria-label="Увеличить счётчик">+</button>
    </div>
  )
}

export default memo(Counter)
