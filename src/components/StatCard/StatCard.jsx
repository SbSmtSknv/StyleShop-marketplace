import './StatCard.css'

function StatCard({ title, value, change, isPositive }) {
  return (
    <article className="stat-card">
      <span>{title}</span>
      <strong>{value}</strong>
      <small className={isPositive ? 'positive' : 'negative'}>{change}</small>
    </article>
  )
}

export default StatCard
